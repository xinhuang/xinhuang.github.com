---
title: "A Broken Observer Pattern"
layout: post
category : Multi-Threading,
tagline: "Revisit Design Pattern In A Concurrent View"
tags : [harmful, design pattern]
---
{% include JB/setup %}

## TL;DR

For Observer Pattern, when automatic de-registering is needed if observer goes out of life span, there are 2 options:
	a. De-register in destructor
	b. Use std::weak_ptr in `Observable`

If de-register observer in destructor, then inheritance will cause race condition because observer base class is destructed later than
 concrete observer class. If event is triggered after the invocation of derived destructor but before the observer has the chance to
 remove itself from observable, the observer will be in a partial destructed state.

This misbehavior cannot be fixed when concrete class is inherited from `AbstractObserver` class, because `AbstractObserver` is always
 constructed first, and destructed last.

To avoid such problem, there are two ways:
1. Explicit remove observer in destructor. But this way is error prone, and doesn't avoid the problem if you have inheritance in the future.
2. Use the combination of `std::shared_ptr` and `std::weak_ptr`. This way is much better and the race condition can be avoid completely.
 Remember to inherit from `std::enable_shared_from_this` for your concrete observer class.

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

## An Abstract Observer/Observable

```C++
class AbstractObservable {
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

class AbstractObserver {
public:
	virtual ~AbstractObserver() { observable.remove(this); }
	virtual void notify() = 0;
	void setObservable(AbstractObservable* observable) { this->observable = observable; }

private:
	AbstractObservable* observable;
};
```

## What Will Happen If Multi-Threading?

```C++
void AbstractObservable::remove(AbstractObserver* observer) {
	std::lock_guard lock(mutex);
	observers.erase(observer);
}
```

### Broken AbstractObserver/AbstractObservable Classes

The construction order:

1. AbstractObserver::AbstractObserver()
2. ConcreteObserver::ConcreteObserver()

The destruction order:

1. ConcreteObserver::~ConcreteObserver()
2. AbstractObserver::~AbstractObserver() -> calls to AbstractObservable::remove(this)

## Is There A Better Way?

[GoF Observer Pattern]: http://en.wikipedia.org/wiki/Observer_pattern
