---
layout: post
title: "Detect Race Condition Using Clang Thread Sanitizer"
description: ""
category: C++
tags: [HowTo, Clang]
---
{% include JB/setup %}

To find out where a race condition happens is a big headache, usually it requires good understanding of the program and days of debugging.
[ThreadSanitizer], one of the many sanitizers shipped with Clang, can be a useful tool to help us find out where the race condition is happening.

Here is a very simple program:

```
#include <thread>

using namespace std;

int flag = 0;

int main() {

  auto t1 = thread([&]() {
    flag = 1;
  });
  auto t2 = thread([&]() {
    flag = 2;
  });

  t1.join();
  t2.join();

  return 0;
}

```

In above code example, we created 2 threads: thread `t1` will set global variable `flag` to `1`; thread `t2` will set `flag` to `2`.

Let's compile and run it.

```
$ clang++ -std=c++11 -pthread -g write_race.cpp $ ./a.out
t2 finished
t1 finished
```

It runs without an error. But there is a potential race condition because the `flag` is not guarded by any synchronization method. Let's run it using ThreadSanitizer again:

```
$ clang++ -std=c++11 -pthread -g write_race.cpp -fsanitize=thread $ ./a.out ==================
WARNING: ThreadSanitizer: data race (pid=3631)
  Write of size 4 at 0x7fdc8845f2f4 by thread T2:
    #0 operator() .../write_race.cpp:13 (a.out+0x0000000a66e6)
    #1 void std::_Bind_simple<main::$_1
()>::_M_invoke<>(std::_Index_tuple<>)
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/functional:1731
(a.out+0x0000000a6630)
    #2 std::_Bind_simple<main::$_1 ()>::operator()()
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/functional:1720
(a.out+0x0000000a65d0)
    #3 std::thread::_Impl<std::_Bind_simple<main::$_1 ()> >::_M_run()
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/thread:115
(a.out+0x0000000a6579)
    #4 std::this_thread::__sleep_for(std::chrono::duration<long,
std::ratio<1l, 1l> >, std::chrono::duration<long, std::ratio<1l,
1000000000l> >) <null>:0 (libstdc++.so.6+0x0000000b176f)

  Previous write of size 4 at 0x7fdc8845f2f4 by thread T1:
    #0 operator() write_race.cpp:10 (a.out+0x0000000a9156)
    #1 void std::_Bind_simple<main::$_0
()>::_M_invoke<>(std::_Index_tuple<>)
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/functional:1731
(a.out+0x0000000a90a0)
    #2 std::_Bind_simple<main::$_0 ()>::operator()()
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/functional:1720
(a.out+0x0000000a9040)
    #3 std::thread::_Impl<std::_Bind_simple<main::$_0 ()> >::_M_run()
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/thread:115
(a.out+0x0000000a8fe9)
    #4 std::this_thread::__sleep_for(std::chrono::duration<long,
std::ratio<1l, 1l> >, std::chrono::duration<long, std::ratio<1l,
1000000000l> >) <null>:0 (libstdc++.so.6+0x0000000b176f)

  Location is global '<null>' of size 0 at 0x000000000000 (a.out+0x0000011092f4)

...

SUMMARY: ThreadSanitizer: data race write_race.cpp:13 operator() ==================
ThreadSanitizer: reported 1 warnings

```

Data race on global `flag` is caught by thread sanitizer, and it happens at `write_race.cpp:13` and `write_race.cpp:10`.

This is a quite dumb program. Let's have take another example:

```
#include <thread>
#include <iostream>

using namespace std;

struct A {
  virtual void foo() {}
};

int main(int argc, char const *argv[])
{
  auto *a = new A();
  cout << "a = "a << endl;
  auto t1 = thread([=](){ a->foo(); });
  auto t2 = thread([=](){ delete a; });
  t1.join();
  t2.join();
  return 0;
}
```

Compile and run:

```
$ clang++ -std=c++11 -pthread -g race_2.cpp 
$ ./a.out 
$ ./a.out Segmentation fault (core dumped) 
```

The first execution is ok, but the second execution yields an segmentation fault, because we called the virtual function `A::foo()` after the instance has been destructed in thread `t2`. 

Seems this is a pretty random data race. Let's run it using ThreadSanitizer see if it can be caught:

```
$ clang++ -std=c++11 -pthread -g race_2.cpp -fsanitize=thread $ ./a.out a = 0x7d040000f7f0 ==================
WARNING: ThreadSanitizer: data race (pid=4106)
  Write of size 8 at 0x7d040000f7f0 by thread T2:
    #0 operator delete(void*) <null>:0 (a.out+0x0000000488eb)
    #1 operator() race_2.cpp:15 (a.out+0x0000000a6cbb)
    #2 void std::_Bind_simple<main::$_1
()>::_M_invoke<>(std::_Index_tuple<>)
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/functional:1731
(a.out+0x0000000a6be0)
    #3 std::_Bind_simple<main::$_1 ()>::operator()()
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/functional:1720
(a.out+0x0000000a6b80)
    #4 std::thread::_Impl<std::_Bind_simple<main::$_1 ()> >::_M_run()
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/thread:115
(a.out+0x0000000a6b29)
    #5 std::this_thread::__sleep_for(std::chrono::duration<long,
std::ratio<1l, 1l> >, std::chrono::duration<long, std::ratio<1l,
1000000000l> >) <null>:0 (libstdc++.so.6+0x0000000b176f)

  Previous read of size 8 at 0x7d040000f7f0 by thread T1:
    #0 operator() race_2.cpp:14 (a.out+0x0000000a977d)
    #1 void std::_Bind_simple<main::$_0
()>::_M_invoke<>(std::_Index_tuple<>)
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/functional:1731
(a.out+0x0000000a96b0)
    #2 std::_Bind_simple<main::$_0 ()>::operator()()
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/functional:1720
(a.out+0x0000000a9650)
    #3 std::thread::_Impl<std::_Bind_simple<main::$_0 ()> >::_M_run()
/usr/bin/../lib/gcc/x86_64-linux-gnu/4.8/../../../../include/c++/4.8/thread:115
(a.out+0x0000000a95f9)
    #4 std::this_thread::__sleep_for(std::chrono::duration<long,
std::ratio<1l, 1l> >, std::chrono::duration<long, std::ratio<1l,
1000000000l> >) <null>:0 (libstdc++.so.6+0x0000000b176f)

  Location is heap block of size 8 at 0x7d040000f7f0 allocated by main thread:
    #0 operator new(unsigned long) <null>:0 (a.out+0x00000004837d)
    #1 main race_2.cpp:12 (a.out+0x0000000a3e50)

  Thread T2 (tid=4110, running) created by main thread at:
    #0 pthread_create <null>:0 (a.out+0x00000004b831)
    #1 std::thread::_M_start_thread(std::shared_ptr<std::thread::_Impl_base>)
<null>:0 (libstdc++.so.6+0x0000000b19be)
    #2 main race_2.cpp:15 (a.out+0x0000000a3f4e)

  Thread T1 (tid=4109, running) created by main thread at:
    #0 pthread_create <null>:0 (a.out+0x00000004b831)
    #1 std::thread::_M_start_thread(std::shared_ptr<std::thread::_Impl_base>)
<null>:0 (libstdc++.so.6+0x0000000b19be)
    #2 main race_2.cpp:14 (a.out+0x0000000a3f0c)

SUMMARY: ThreadSanitizer: data race ??:0 operator delete(void*) ==================
ThreadSanitizer: reported 1 warnings
```

The report shows that we are contention at `0x7d040000f7f0` of size 8 by thread T1 & T2. And the source line is `race_2.cpp:12` and `race_2.cpp:13`. Pretty smart! That's where we invoke the virtual function `A::foo()` and delete the pointer of A.

One of the good things is the Sanitizer doesn't require runing the program many times to find the bug.

Another good thing is the Sanitizer can tell us exactly where the race condition happens. But how can we find out the reason?

From the program output, we know `0x7d040000f7f0` is the address of the memory block `new A()` returned, and contention happens at first 8 bytes. On a x64 machine, that is the location of vptr. In the destruction of class A, vptr will be overwritten to some other value, which probably gives a message "pure virtual function call" when invoke, to prevent the virtual function to be called after destruction; but during the invocation of `A::foo()`, we need to read the value of vptr to find the function address. When the write and read happens at the same time, there is the race condition.

The [ThreadSanitizer] is a very powerful tool to help detect race condition. The [ThreadSanitizer manual] contains all of the information necessary to start. It is easy to use and can be integrated with any build system using GCC or LLVM: one extra compile-time option and run the program after to see the errors. Unlike other tools, it understands compiler-builtin atomics and synchronization, therefore provides very accurate results. More information on how [ThreadSanitizer] works can be found on [the ThreadSanitizer wiki].

*Reference*

2nd program example comes from GoingNative 2013 [The Care and Feeding of C++'s Dragons](https://urldefense.proofpoint.com/v1/url?u=http://channel9.msdn.com/Events/GoingNative/2013/The-Care-and-Feeding-of-C-s-Dragons&k=Bmn%2BpBF6%2FxX%2F6xeXViRpFg%3D%3D%0A&r=XKHKqvEQZPfF56uL%2BOZCgw%3D%3D%0A&m=3U5%2BNCJxni%2FCWwoCYzx0v5Pk0RDV8dSjM7rlg2QbtHg%3D%0A&s=ff921eae48afb6b89d67803853eb508c06e9726ab41c5c8c8d4cbaf731429a6e)

_This article is for Sep. 2014 newsletter of SWDEV Sig Schlumberger._

[ThreadSanitizer]: https://urldefense.proofpoint.com/v1/url?u=https://code.google.com/p/thread-sanitizer/&k=Bmn%2BpBF6%2FxX%2F6xeXViRpFg%3D%3D%0A&r=XKHKqvEQZPfF56uL%2BOZCgw%3D%3D%0A&m=3U5%2BNCJxni%2FCWwoCYzx0v5Pk0RDV8dSjM7rlg2QbtHg%3D%0A&s=0dc51daf68f724ca5ebe3a77b42dcce4bcb1742018cf258627b113c92d3aa113

[ThreadSanitizer manual]: https://code.google.com/p/thread-sanitizer/wiki/CppManual

[the ThreadSanitizer wiki]: https://code.google.com/p/thread-sanitizer/wiki/Algorithm
