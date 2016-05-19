---
layout: post
title: "Hello, world!"
description: ""
category:
tags: [HowTo, Jekyll]
---

This is the first post. Struggling with it for hours, even cloned somebody's
repository, finally realize it is not what the *appearence* that matters, it's
how much you **value** it, it's the **content** that matters.

#### How to fix error "invalid byte sequence" in Jekyll?

You might be enthusiastic wrote a new post, but when start Jekyll, following
error strikes you:

```
	D:\Documents\blog\xinhuang.github.com>jekyll serve
	Configuration file: D:/Documents/blog/xinhuang.github.com/_config.yml
	[33m       Deprecation: Auto-regeneration can no longer be set from your config
	uration file(s). Use the --watch/-w command-line option instead.[0m
	            Source: D:/Documents/blog/xinhuang.github.com
	       Destination: D:/Documents/blog/xinhuang.github.com/_site
	      Generating... Error reading file D:/Documents/blog/xinhuang.github.com/_po
	sts/2013-07-07-how-to-type-chinese-in-miktex.md: invalid byte sequence in GBK
	error: invalid byte sequence in GBK. Use --trace to view backtrace
```

To temprorily fix this error, just modify the Jekyll source.

Open `gems\1.9.1\gems\jekyll-1.0.3\lib\jekyll\convertible.rb`, and change the
`read_yaml` function:

    def read_yaml(base, name)
      begin
        self.content = File.read(File.join(base, name),
                                :encoding => 'utf-8'            # <------Add this
                                )

This should fix the problem.

[Reference](http://liufeiyu.cn/github/2012/12/04/how-to-use-git-to-post-articles.html)

we are the way we hack
