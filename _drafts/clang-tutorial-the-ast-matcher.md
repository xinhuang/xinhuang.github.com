---
title: "Clang Tutorial: The AST Matcher"
layout: post
category : Clang
tagline: "using AST matcher to find pass-by-value std::vector parameters"
tags : [c++, howto]
---
{% include JB/setup %}

In [previous post] we have made a simple Clang tool that will print all the
declarations in a given source file. Now Let's try to make another tool to
detect when a _std::vector_ is passed by value - which usually causes a
performance hit.

## The Pass-By-Value std::vector Finding Program

The example.cpp:

```
#include <vector>

using namespace std;

void foo(vector<int> is);
void bar(const vector<int> is);
void foobar(const vector<int>& cis);
void fooboo(vector<int>& cis);
```

Given above source file, let's feed it to our _find-vec_ program:

> $ ./find-vec example.cpp -- -std=c++11  
> example.cpp:5:6  
> example.cpp:6:6  

_Here we told Clang parser to use C++ 11 syntax by passing `-std=c++11` after `--`._

## The Clang AST

If you still remember the _Decl_ and _Stmt_, these are the AST nodes that we will come
across when processing a source file. With different _Decl_, _Stmt_ and their derived
classes like _NamedDecl_ and _CallExpr_, we can obtain lots of information like 
variable type, name, definition information, etc.

To examine all the function declarations with any parameter of type _std::vector_,
we will need to match specific AST node that is:

* Function declaration or definition
* Has at least one parameter of type _std::vector_

Clang provides us a domain specific language (DSL) to create predicates on Clang's AST.
It is written in and can be used from C++, allowing us to match AST nodes and
extract its attributes.

## The AST Matcher

To use the AST matchers, all we need to do is to call a bunch of matcher creation
function, chain them together to compose the matcher we need, and/or bind the target
node with a name so we can extract it later.

Here is a very simple example:

```
```

This matcher would 

## Match Function

To match a function, use the following:

```
DeclarationMatcher Matcher = functionDecl();
```

## Match Parameter

```
DeclarationMatcher Matcher = functionDecl(hasAnyParameter(...));
```

To matcher a parameter, we can use _hasParameter(N, ParamMatcher)_, which will match
the N'th of parameter with given parameter matcher. Here we will need to match any
parameter that of type _std::vector_, so we will use _hasAnyParameter_.

## Match Pass-By-Value std::vector

Next let's match the parameter type:

```
DeclarationMatcher Matcher = functionDecl(
  hasAnyParameter(hasType(recordDecl(matchesName("std::vector"))));
```

## Put It All Together

## To Dump The AST Nodes

For a complete document of AST matchers, you can refer to the [AST Matcher Reference].
<<TODO: Return Type and Parameter explaination>>

_All the source code in this post can be found at [clang-playground]._

[AST Matcher Reference]:http://clang.llvm.org/docs/LibASTMatchersReference.html
[clang-playground]:https://github.com/xinhuang/clang-playground.git

