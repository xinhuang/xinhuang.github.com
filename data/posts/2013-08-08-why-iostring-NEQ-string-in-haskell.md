title = "Why IOString != String In Haskell"
tags = ["Haskell", "Design"]
layout = "post"
---

In GHCi, I want to test my `headRev` function, while loading Mercurial log from a file and pass the content to headRev function:

```haskell
log = readFile "hg.log"
headRev log
```

I get a error message complaining `IO String is not [Char]`:

> Couldn't match expected type `[Char]` with actual type `IO String` In
> the first argument of `headRev`, namely `log` In the expression:
> headRev log In an equation for `it`: `it = headRev log`

Why `IO String` is not compatible with `String`? Why is it designed like this?
After googled the error, here is a insightful reason to this question.

> There is a very good reason why there is no such function.
>
> Haskell has the notion of functional purity. This means that a
> function will always return the same result when called with the same
> parameters. The only place where IO is allowed is inside the IO Monad.

[The Answer @StackOverflow][1]

And BTW how to "walk" around it while you want to test in GHCi? I'm doing this way:

Define `interactWith` function in source code, compile, and load via `:l *hgrev`

```haskell
interactWith function [inputFile] = do
    input <- readFile inputFile
    putStrLn (function input)
```

Then in GHCi:

```haskell
let f log = headRev (lines log)
interactWith f "hg.log"
```

[1]: http://stackoverflow.com/a/1676052/2190129
