---
title: "Clang Playground: Finding Declarations"
layout: post
category : Clang
tagline: "traverse AST using RecursiveASTVisitor"
tags : [c++, howto]
---
{% include JB/setup %}

Clang is a very good C/C++ compiler, and it provides great extensible APIs for
us to take advantage of it's syntax parsing, AST construction, semantics
analysis, optimization, assembly generation and JIT compilation. Here let's have
some fun playing with Clang and see what can we make out of it.

## Building clang

To build clang is very simple:

1. Get the source code from svn or git repository:

```bash
git clone http://llvm.org/git/llvm.git src
git clone http://llvm.org/git/clang.git src/tools/clang
```

2. Configure and build:

```bash
mkdir debug && cd debug
../configure           # add --enable-optimized --disable-assertions for release build
make
```

Building LLVM and Clang will take quite some time... You can also use
`make install` to install your built version to the system. (Just don't install
debug version, it would be very very slow.)

## LibTooling

LibTooling is the C++ interface Clang provided. It is very useful when you want
to have full control over AST (like static analysis), or to implement a
refactoring tool. Of course there are other interfaces like LibClang and Clang
Plugins. For detailed information you can refer to [Clang Tooling document].

For today's task - finding all declarations, using LibTooling is the most
suitable way.

## The Entry of Everything

Let's start with the main function first:

```
// TODO:
```

## Frontend Action

Like most compilers, LLVM is a three-phase compiler. Clang is its C, C++,
Objective C and Objective C++ frontend.

![LLVM three-phase structure]

The frontend will parse the source code, check for syntax error and build the
abstract syntax tree (AST). This is where we need to create our own [FrontendAction]:

```
// TODO:
```

Because our frontend action will only consume AST and find all declarations, it
is inherited from [ASTFrontendAction], and create our own AST consumer via
`CreateASTConsumer`.

## AST: Abstract Syntax Tree

In Clang, there are two basic types of AST classes: `Decl` and `Stmt`, which
have many subclasses that covers all the AST nodes we will meet in a source
file:

* FriendDecl
* FunctionDecl
* TypeDecl
* CompoundStmt
* CallExpr

## The AST Consumer & Visitor

[LLVM three-phase structure]:/assets/posts/clang-playground-finding-declarations/llvm-three-phase-structure.gif
[Clang Tooling document]:http://clang.llvm.org/docs/Tooling.html
[FrontendAction]:http://clang.llvm.org/doxygen/classclang_1_1FrontendAction.html

