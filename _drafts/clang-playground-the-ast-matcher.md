# Clang Playground: The AST Matcher

In [previous post] we have made a simple Clang tool that will print all the declarations
in a given source file. Now Let's try to make another tool to detect when a _std::vector_
is passed by value - which usually causes a performance hit.

## The Pass-By-Value std::vector Finding Program

The example.cpp:

```
#include <vector>

int sum(std::vector<int> Vs) {
    int R = 0;
    for (auto V : Vs) {
        R += V;
    }
    return R;
}
```

Given above source file, let's feed it to our _find-vec_ program:

> $ ./find-vec example.cpp -- -std=c++11
> Found std::vector pass-by-value of function `sum' at example.cpp:3:1

You might want to use a _RecursiveASTVisitor_ to examine the declarations of every function,
but that could be a tedious and repetative work. Clang provides a very handy utility to help
us find an AST node that match our specification: the [AST matcher].

## The AST Matcher

## Match Function

## Match Argument

## Match Pass-By-Value std::vector

## Put It All Together
