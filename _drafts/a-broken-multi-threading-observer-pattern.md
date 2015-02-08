---
title: "A Broken Multi-Threading Observer Pattern"
layout: post
category : Multi-Threading,
tagline: "Revisit Design Pattern In A Concurrent View"
tags : [harmful, design pattern]
---
{% include JB/setup %}

## TL;DR

For Observer Pattern, when automatic de-registering is needed if observer goes
 out of life span, there are 2 options:  
1. De-register in destructor  
2. Use `std::weak_ptr` in `Observable`  

If de-register observer in destructor, then inheritance will cause race
 condition because observer base class is destructed later than concrete observer
 class. If event is triggered after the invocation of derived destructor but
 before the observer has the chance to remove itself from observable, the
 observer will be in a partial destructed state.

This misbehavior cannot be fixed when concrete class is inherited from
 `AbstractObserver` class, because `AbstractObserver` is always constructed
 first, and destructed last.

To avoid such problem, either use a combination of `std::shared_ptr` and
 `std::weak_ptr`, or don't re-create the wheels, use [Boost.Signal] instead.

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

## What If Observers Runs Out of Life Span

When an observer is running out of life span, it has to remove it from the observers list. But sometimes the observers are managed using "reference counting", or explicit removing observer before each destruction is too much work, having an automatic un-registered observer is very convenient.

Here comes our new `AbstractObservable`/`AbstractObserver`:

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

## What Will Happen in Multi-Threading Environment?

The race condition happens when the
 observer list gets updated. Simple problem! Just need a lock:

```C++
void AbstractObservable::remove(AbstractObserver* observer) {
	std::lock_guard lock(mutex);
	observers.erase(observer);
}
```

But take a second thought on the runtime behavior, is the program really thread
 safe now?

Below is a normal destruction order of an observer:

1. ConcreteObserver::~ConcreteObserver()  
2. AbstractObserver::~AbstractObserver()  

What if during the destruction of an observer, an event is fired? With the following invocation sequence:

1. ConcreteObserver::~ConcreteObserver()  
2. ConcreteObservable::notify()  
3. _ConcreteObserver::onNotify()_  
4. _AbstractObserver::~AbstractObserver_ (Probably won't happen)  

During the 3rd invocation to `ConcreteObserver::onNotify()`, the `ConcreteObserver` has
 been partially destructed. And this is when race condition happens.

## Is There A Better Way?

To avoid such problem, there are several ways:

1. Explicit remove observer in destructor. But this is error prone, and
doesn't avoid the problem if you have inheritance in the future.

2. Explicit un-register observer before its destructor gets called. This requires
an customized deleter to call un-register function.

3. Use the combination of `std::shared_ptr` and `std::weak_ptr`. This way is
much better and the race condition can be avoid completely. Remember to inherit
from `std::enable_shared_from_this` for your concrete observer class.

4. Don't re-create the wheels, use [Boost.Signal] instead.
[Boost.Signals: When can disconnections occur?]

## But What Is The Real Problem?

Inheritance isn't always harmless as it might seems, with the great benefit of
 code re-usability. In a multi-threading environment, inheritance can easily
 break the constraints but give the user an illusion original constraints are
 naturally "_inherited_". Code and feature can be inherited, but concurrent
 constraints cannot be inherited.

[GoF Observer Pattern]: http://en.wikipedia.org/wiki/Observer_pattern
[Boost.Signals: When can disconnections occur?]: http://www.boost.org/doc/libs/1_39_0/doc/html/signals/tutorial.html#id3343704
[Boost.Signals]:http://www.boost.org/doc/libs/1_57_0/doc/html/signals.html
