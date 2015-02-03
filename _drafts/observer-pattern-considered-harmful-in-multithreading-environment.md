---
title: "Observer Pattern Considered Harmful In Multithreading Environment"
layout: post
category : Multithreading, 
tagline: ""
tags : [harmful]
---
{% include JB/setup %}

## A Typical [GoF Observer Pattern]

```
class IObserable {
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

## A Typical Usage

## An Abstract Observer/Observable

## What Will Happen If Multi-Threading?

### Broken AbstractObserver/AbstractObservable Classes

### Be Care of Destruction Order

## Is There A Better Way?

[GoF Observer Pattern]: http://en.wikipedia.org/wiki/Observer_pattern
