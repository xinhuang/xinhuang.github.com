title = "AngularJS For GitHub Pages"
tags = ["HowTo", "AngularJS"]
---

My blog hosted on GitHub page has migrated from Jekyll to AngularJS recently. Because Jekyll is designed for GitHub page generation, and AngularJS is only a front-end framework, we need some scaffold code to generate website content
from markdown files. I will brief you about the work needed to host static website on GitHub Pages.

*The reader of this tutorial should knows the basic concepts of an AngularJS, e.g. layout, `md-list`, modules, directives and routing. If you don't know what the meaning of these terms is, you probably should take a look at this [AngularJS tutor]. Just the first half, it takes 30 min at most.*

## Use Yoeman to Generate Boilerplate Code

Everyone know Javascript is evil. (If you haven't, probably you should watch this: [WAT]) There are lots of choices that we can make to avoid write Javascript by hand. The most popular way is using ES6 (ECMAScript 6) with transpilation help from Babel.

When talking "transpilation", there will be a tool will transpile the code from one language to another. Here I use Babel to transpile ES6 to Javascript.

If we need transpilation, it's better to do it using a build system. Gulp & Grunt is now among the most popular choices. <TODO>

There is a NPM package called [Yeoman] will generate the boilerplate code for many types of projects. You can find community-provided generator on [Yeoman] website.

I use Gulp-Angular, and select ES6, SCSS, HTML and UI-Router.

This generator also gives you ESLint, e2e, mocha, and already support a rich set of tasks as build, test and serve. It will meet our needs in this case without much modification.

*You might wondering why use Gulp instead of Grunt. It's just a personal flavor. I perfer the way Gulp chaining operations using streams, which is easier to read and maintain. You can also use [Angular-App] generator which uses Grunt. (Another thing is they don't have Babel availible yet.)*

Okay. Now we are almost half-way done. Type command `gulp serve`, and browser
should pop up giving you the default website of Gulp-Angular.

## Generate & Show The Index

Now we have a website, ready to be feed into our own content. First Let's generate the content of main page.

### Generate The Index

First, re-structure the website. In Jekyll, all the posts are placed in `/_posts` with names like `<date>-<name.md`. To match the AngularJS project structure, move all posts into `/src/assets/posts`.

Next, re-format post headers. In Jekyll, every post start with a header:

```
---
title: My First Post
layout: post
tags: [tagA, tagB]
...
---
```

With this header and file name convention `<date>-<title>`, it won't take to much to recreate an index file. But in order to avoid parsing such header by hand, I re-format the header into following: (and removed some unused values like `layout`)

```
"title" : "My First post"
"tags" : ["tagA", "tagB"]
---
```

Everything before the first divider `---` is the metadata. Every line is a well-formed JSON expression. The parsing will simply take every line in metadata to `JSON.parse(line)`, then merge the JSON object. (Don't forget to parse post date from file name.)

Voila! The index file is generated.

Last, automate the index generation. The index generation is simple, but it would be better if it's re-generated every time we build our website. To achieve this, create a Gulp task and make `build` task depends on it:

```
gulp.task('blog', function(cb) {
	var assetPath = path.join(conf.paths.src, 'assets/posts');
	fs.readdir(assetPath, function(err, files) {
    // parsing each file and generate the index file
    cb();   // since it's an async task, notify Gulp we are done.
  })
});

// make build task depends on blog task
gulp.task('build', ['html', 'fonts', 'blog', 'other']);
```

Now when you run `gulp build` or any task depends on `build`, the index file will be regenerated.

The index file is placed at `/src/assets/posts/index.json`. So later it can be downloaded by accessing `/index.json`.

The format of my `index.json` is:

```
{
  "blogs":[{
    "file":"2013-07-06-hello-world.md",
    "title":"Hello, world!",
    "tags":["HowTo","Jekyll"],
    "date":"2013-07-06"
  }]
}
```

### Display The Index

First of all, let's make some change to the example website. Delete all the components/directives in `index.module.js`; clear `main.html`, `main.controller.js`, `main.controller.spec.js` and `main.css`. Then by `gulp serve` there should be an empty website without any content or error messages in the browser console.

Since the `index.json` can be downloaded using related URL `/index.json`, displaying the index only requires load the index object and put each item in a `<li>`. If you don't know how to download a JSON file and parse it, please refer to [AngularJS tutor: download a JSON file].

Below is how my `main.html` looks like:

```
<div id="blog-list">
  <md-list>
    <md-list-item class="md-2-line" ng-repeat="blog in main.blogs">
      <div class="md-list-item-text" layout="row">
        <p id="blog-date">{{blog.date}}</p>
        <a href="#/blogs/{{blog.file}}" id="blog-link">
          <h3>{{blog.title}}</h3>
        </a>
      </div>
    </md-list-item>
  </md-list>
</div>
```

## Render Your Markdown

To render a markdown file, I use [Angular-Marked]. [Angular Markdown Directive] is also an alternative.

* Markdown rendering  
  - Customized renderer  
  - CSS your markdown  

## Display A Post

The route setting is configured as below:

```
export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('blog', {
      url: '/blogs/:blogFile',
      templateUrl: 'app/blog/blog.html',
      controller: 'BlogController',
      controllerAs: 'blog'
    });

  $urlRouterProvider.otherwise('/');
}
```

To display a post, it has to be downloaded first. When a post is visited, the file name will be passed in as `$stateParams['blogFile']` to `BlogController`. Then parse out the blog content and feed to [Angular-Marked] to display:

```
<h1>{{blog.title}}</h1>
<div>{{blog.date}}</div>
<div marked="blog.content"></div>
```

The parsing code is omitted and can be found here: [parsing blog content].

## Possible Mistakes

There are some mistakes that make me stuck for quite a while.

1. Don't deploy right after running tests.

It's a good habit to run all tests before deploying, but for e2e tests they will modify build-out artifacts to inject testing code. If pages with testing code are deployed, web browser will start complain `describe is not defined`.

# Pitfalls

1.  Dynamic web page is bad for blog
    1.  dynamic only when necessary
        *   not in title, never
        *   not in index
        *   dynamic image loading, could be

## Future Improvements

This is only a simply implementation, and there are lots of places for further improvements.

1. To speed up index page visiting time, the index can be injected into `index.html` rather than downloading on the fly.  
2. To speed up post visiting time, parsing the post every time it's downloaded can be avoided by deploying parsed document rather than re-parsing at runtime.  
3. In Jekyll, you can display drafts by `jekyll serve --draft`. This option is very convenient and should be added.  
4. Should support commands for creating new posts/drafts and publishing drafts.  

## Additional References

* AngularJS Directive  
* Responsive Web Design
- Padding is important  

[AngularJS tutor]: https://docs.angularjs.org/tutorial
[AngularJS tutor: download a JSON file]: https://docs.angularjs.org/tutorial/step_07
[AngularMarked]: https://github.com/Hypercubed/angular-marked
[Angular Markdown Directive]: https://github.com/btford/angular-markdown-directive
[parsing blog content]: https://github.com/xinhuang/xinhuang.github.com/blob/src/src/app/components/blog-parser/blog-parser.js
