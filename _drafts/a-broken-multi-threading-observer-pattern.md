---
title: "A Broken Multi-Threading Observer Pattern"
layout: post
category : Multi-Threading,
tagline: "Revisit Design Pattern In A Concurrent View"
tags : [harmful, design pattern]
---
{% include JB/setup %}

## TL; DR

In the implementation of Observer Pattern, if the observer is going to de-register itself during
 destruction, usually there are two ways:

1. De-register in destructor
2. Use `std::weak_ptr` in `Observable`

For option 1, there will be race condition if de-registering happens in the destructor of the base observer class, because the destructor of AbstractObserver is called after ConcreteObserver. If an event is triggered between the invocation of concrete destructor and abstract destructor, the observer will be in a partial state.

This misbehavior cannot be fixed as long as concrete class is inherited from
 `AbstractObserver` class, because `AbstractObserver` is always constructed
 first, and destructed last.

To avoid such problem, either use a combination of `std::shared_ptr` and
 `std::weak_ptr`, or use [Boost.Signals] instead of recreating the wheel.

## The [GoF Observer Pattern]

```
class IObservable {
public:
	virtual ~IObservable() {}
	virtual void add(IObserver* observer) = 0;
	virtual void remove(IObserver* observer) = 0;
	virtual void notify() = 0;
};

class IObserver {
public:
	virtual ~IObserver() {}
	virtual void onNotify() = 0;
};
```

## What If An Observer Runs Out of Life Span

When an observer runs out of life span, it has to remove it from the observers list. But sometimes observers are managed using "reference counting", or explicit removing observer before each destruction is of too much work and duplication code, it is very convenient to have an automatic un-registered observer.

Here is our new `AbstractObservable`/`AbstractObserver`:

```C++
class AbstractObservable : public IObservable {
public:
	virtual ~AbstractObservable() {}
	void add(AbstractObserver* observer) {
		observers.insert(observer);
		observer.setObservable(this);
	}
	void remove(AbstractObserver* observer) {
		observers.erase(observer);
	}
	void notify() {
		for (auto& o : observers) {
			o->notify();
		}
	}

private:
  std::unordered_set<AbstractObserver*> observers;
};

class AbstractObserver : public IObserver {
public:
	virtual ~AbstractObserver() { observable.remove(this); }
	virtual void notify() = 0;
	void setObservable(AbstractObservable* observable) { this->observable = observable; }

private:
	AbstractObservable* observable;
};
```

## What Will Happen In A Multi-Threading Environment?

The race condition happens when the
 observer list gets updated. Simple problem! Only need a lock:

```C++
void AbstractObservable::remove(AbstractObserver* observer) {
	std::lock_guard lock(mutex);
	observers.erase(observer);
}
```

But take a second thought on the runtime behavior, is this program really thread-safe?

Here is a normal destruction order of an observer:

1. ConcreteObserver::~ConcreteObserver()
2. AbstractObserver::~AbstractObserver()

What if during the destruction of an observer, an event is fired? Let's see the following invocation sequence:

1. ConcreteObserver::~ConcreteObserver()
2. ConcreteObservable::notify()
3. _ConcreteObserver::onNotify()_
4. _AbstractObserver::~AbstractObserver_

During the 3rd invocation of `ConcreteObserver::onNotify()`, the `ConcreteObserver` is partially destructed. This is where the _race condition_ happens.

## Is There A Better Way?

To avoid this problem, there are several ways:

1. Explicit remove observer in destructor. This could be error prone, and
the problem will still occur because you can always inherit from `ConcreteObserver`.
2. Explicit un-registering observer before its destructor gets called. This requires
an customized deleter to call un-register function if you use `std::shared_ptr`, or being careful if observer's life span are managed manually. (With a lot of repeated code to remove observers.)
3. Use a combination of `std::shared_ptr` and `std::weak_ptr`. In this way the race condition can be avoid completely. Remember to inherit
from `std::enable_shared_from_this` for your concrete observer class.
4. Don't re-create the wheels, use [Boost.Signals] instead.
[Boost.Signals: When can disconnections occur?]

## But What Is The Real Problem?

Inheritance isn't always harmless as it might seems, with the great benefit of
 code re-usability. In a multi-threading environment, inheritance can easily
 break the constraints but give the user an illusion that original constraints are
 naturally "inherited". **Code and functions can be inherited, but not the same for
 concurrent constraints.**

[GoF Observer Pattern]: http://en.wikipedia.org/wiki/Observer_pattern
[Boost.Signals: When can disconnections occur?]: http://www.boost.org/doc/libs/1_39_0/doc/html/signals/tutorial.html#id3343704
[Boost.Signals]:http://www.boost.org/doc/libs/1_57_0/doc/html/signals.html
