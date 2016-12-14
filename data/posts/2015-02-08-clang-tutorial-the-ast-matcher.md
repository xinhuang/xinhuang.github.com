"title": "Clang Tutorial: The AST Matcher"
"category" : "Clang"
"tagline": "using AST matcher to find pass-by-value std::vector parameters"
"tags" : ["C++", "HowTo"]
"layout": "post"
---

In [previous post] we have learned about Clang abstract syntax tree (AST) and made a simple Clang tool that will print all the
declarations in a given source file. Now Let's play with Clang AST matchers and make another tool to
detect when a _std::vector_ is passed by value - which usually causes a
performance hit.

## The Pass-by-Value std::vector Finding Program

The example.cpp:

```
#include <vector>

using namespace std;

void foo(vector<int> is);
void bar(const vector<int> is);
void foobar(const vector<int>& cis);
void fooboo(vector<int>& cis);
```

Let's feed it to our _find-vec_ program:

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

To use the AST matchers, we need to do is to call a bunch of matcher creation
function, chain them together to compose the matcher we need, and/or bind the target
node with a name so we can extract it later.

To match a function declaration:

```
DeclarationMatcher Matcher = functionDecl();
```

Then let's match its parameter:

```
DeclarationMatcher Matcher = functionDecl(hasAnyParameter(...));
```

To matcher a parameter, we can use _hasParameter(N, ParamMatcher)_, which will match
 the N'th of parameter with given parameter matcher. Here we will need to match any
 parameter that of type _std::vector_, so we will use _hasAnyParameter_.

Next match the parameter type:

```
DeclarationMatcher Matcher = functionDecl(
  hasAnyParameter(hasType(recordDecl(matchesName("std::vector"))));
```

## The MatchCallback

When the AST matcher find the right node, the corresponding
`clang::ast_matchers::MatchFinder::MatchCallback` will be invoked with matched result. By providing a `MatchCallback`, we can print the function declarations/definitions that accept any parameter of type `std::vector` that is passed by value.

```
class VecCallback : public clang::ast_matchers::MatchFinder::MatchCallback {
public:
  virtual void
  run(const clang::ast_matchers::MatchFinder::MatchResult &Result) final {
    llvm::outs() << ".";
    if (const auto *F =
            Result.Nodes.getDeclAs<clang::FunctionDecl>(FunctionID)) {
      const auto& SM = *Result.SourceManager;
      const auto& Loc = F->getLocation();
      llvm::outs() << SM.getFilename(Loc) << ":"
                   << SM.getSpellingLineNumber(Loc) << ":"
                   << SM.getSpellingColumnNumber(Loc) << "\n";
    }
  }
};
```

## References

Clang also provides a simple document of AST matchers: [Matching the Clang AST].
For a complete reference of AST matchers, you can find it in [AST Matcher Reference].

_All the source code in this post can be found at [clang-playground]._

[previous post]: http://xinhuang.github.io/clang/2014/10/19/clang-tutorial-finding-declarations
[AST Matcher Reference]:http://clang.llvm.org/docs/LibASTMatchersReference.html
[clang-playground]:https://github.com/xinhuang/clang-playground.git
[Matching the Clang AST]: http://clang.llvm.org/docs/LibASTMatchers.html
