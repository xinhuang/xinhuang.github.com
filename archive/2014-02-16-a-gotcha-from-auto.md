title = "A Gotcha From auto"
category = "C++"
tags = ["C++", "gotcha"]
layout = "post"
---

Recently, I found my random generator doesn't work. Which is:

```C++
auto engine = mt19937{ random_device()() };
auto rand = [=](int range) mutable {
    auto idist = uniform_int_distribution<int>(0, range);
    return idist(engine);
};
f(rand);
```

Inside function `f`, it will call `rand` many times and save output to one file. But, generated files are all identical.

Observe closer, I found the declaration of `f` is:

```C++
void f(function<int(int)> f);
```

Oh, `f` is passed by value. Change to pass by reference:

```C++
void f(const function<int(int)>& f);
```

Still doesn't work.

After thought for a while, I found the `lambda object` is implicit converted to `std::function`. Aha! Another copy!

Give a specific type to `rand`:

```C++
function<int(int)> rand = ...;
```

Problem solved!
