---
title: "How A Multi-Threaded Implementation of The Observer Pattern Can Fail"
layout: post
category : Multi-Threading,
tagline: "Revisit Design Pattern In A Concurrent View"
tags : [design pattern]
---
{% include JB/setup %}

## Overview

In an implementation of the Observer Pattern, usually there are two ways for an
 observer to de-register itself during:

1. De-register in `Observer` destructor
2. Use `std::weak_ptr` in `Observable`

For option 1, there will be a race condition if de-registering happens in the
 destructor of the base observer class, because the destructor of
 `AbstractObserver` is called after `ConcreteObserver`. If an event is triggered
 between the invocation of concrete destructor and abstract destructor, the
 observer will be in a partial state.

This misbehavior cannot be fixed as long as the concrete class inherits from
 `AbstractObserver` class, because `AbstractObserver` is always constructed
 first, and destroyed last.

To avoid such a problem, either use a combination of `std::shared_ptr` and
 `std::weak_ptr`, or use [Boost.Signals2] instead of reinventing the wheel.

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

## What happens when an observer is going to be destroyed?

Before an observer is destroyed, it has to be removed from the observers list.
 Sometimes observers are managed using "reference counting". Alternatively,
 explicit removal of the observer before each destruction is of too much work
 and duplication code, it is therefore convenient to automate observer
 un-registration.

Here is our new `AbstractObservable`/`AbstractObserver` with automatic
 un-registration in destructor:

```
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

## But what will happen in a multi-threaded environment?

In a multi-threaded environment a race condition can happen when the
 observer list is updated. Simple problem! Only need a lock:

```
// same for add and notify
void AbstractObservable::remove(AbstractObserver* observer) {
	std::lock_guard lock(mutex);
	observers.erase(observer);
}
```

But think again about the runtime behavior. Is it really thread-safe?

Here is the normal destruction order of an observer:

1. `ConcreteObserver::~ConcreteObserver()`

2. `AbstractObserver::~AbstractObserver()`

What if during the destruction of an observer, an event is fired?
 Now the following invocation sequence can occur:

1. `ConcreteObserver::~ConcreteObserver()`

2. `ConcreteObservable::notify()`

3. `ConcreteObserver::onNotify()`

4. `AbstractObserver::~AbstractObserver()`

Previously to ensure the exclusive call to `add`, `remove` and `notify` function
 of `AbstractObservable`, we use a lock. But the destructor of `ConcreteObserver`
 and `notify` function of `AbstractObservable` are not exclusive. Hence when
 an event is triggered while the destructor `ConcreteObserver` is executing, the
 `onNotify` of the `ConcreteObserver` will be called on a (partially) destroyed
 object. This is why the race condition can happen.

## Is there a better way?

To avoid this problem, there are several alternatives:

1. Explicit observer removal in the most derived destructor. This could be error
 prone, and the problem can still occur because you can always inherit from
 `ConcreteObserver`.

2. Explicit un-registration observer before its destructor is called. This requires
 a customized deleter to call un-register function if you use `std::shared_ptr`,
 or having to be careful if the observer's life span is managed manually - with a
 lot of repeated code to remove observers to boot.

    For example:

        // manually un-register observer from observable
        {
          ConcreteObserver scopedObserver;
          observable.add(scopedObserver);
          // ...
          observable.remove(scopedObserver);
        } // scopredObserver is destroyed here

        // manually un-register observer from observable using std::shared_ptr
        std::shared_ptr<Observer> observer(new ConcreteObserver(), Observer* o) {
          observable.remove(o);
        });
        observable.add(observer);

3. Use a combination of `std::shared_ptr` and `std::weak_ptr`. In this way the
 race condition can be avoided completely.

    For example:

        class IObserver {
        public:
          virtual ~IObserver() {}
          virtual void onNotify() = 0;
        };

        class Observable {
          std::mutex mutex;
          // of course the std::vector can be replace by a concurrent container
          std::vector<std::weak_ptr<IObserver>> observers;  

        public:
          virtual ~Observable() {}
          void add(const std::shared_ptr<IObserver>& o) {
            std::lock_guard<std::mutex> lock(mutex);
            observers.emplace_back(o);
          }
          void remove(const std::shared_ptr<IObserver>& o) {
            /* here we do nothing, invalid observers will be removed in notify */
          }
          void notify() {
            std::lock_guard<std::mutex> lock(mutex);
            for (auto& o : observers) {
              if (auto p = o.lock())
                p->onNotify();
            }
            purge_invalid_observer();
          }

        private:
          void purge_invalid_observer() {
            auto first_invalid = std::remove_if(std::begin(observers),
                                                std::end(observers),
                                                [](const std::weak_ptr<IObserver>& o) {
                                                  return o.expired();
                                                });
            observers.erase(last_valid, std::end(observers));
          }
        };

4. Don't reinvent the wheel, use [Boost.Signals2] instead.
 ["It can be used safely in a multi-threaded environment."]

## So what is the real problem?

The moral of this tale is that inheritance isn't always as harmless as it might
 seems, notwithstanding the great benefit of code re-usability. In a
 multi-threaded environment, inheritance can easily break the constraints while
 giving the user an illusion that the original constraints are naturally
 "inherited". **Code and functions can be inherited, but the situation is not
 the same for concurrent constraints.**

 ---

 _Many thanks to David Wales who helped review this post._

[GoF Observer Pattern]: http://en.wikipedia.org/wiki/Observer_pattern
[Boost.Signals2]:http://www.boost.org/doc/libs/1_57_0/doc/html/signals2.html
["It can be used safely in a multi-threaded environment."]:http://www.boost.org/doc/libs/1_57_0/doc/html/signals2/thread-safety.html#idp430084640
