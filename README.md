Hey. This is my website source code.

It is written in ES6. Pages are generated from HTML & [Mustache] templates and Markdown documents (with some tweaks).

The code is simple, and highly customized _(if not highly customizable)_.

Feel free to take a look.

# usage

So if you want to re-use it, the simplest command would be:

_First time only_

1. Fork this repository to your github account.

2. `git clone <the-cloned-repository> && cd $_ && npm install`

3. Delete everything in the `data/` folder. (That's where the posts and assets live) Keep `resources/{*.css|copyright}`.

4. Change the google track code to yours in the templates.

_When you have a mood for blogging_

1. Write your posts. Don't forget to commit.

2. `gulp build` to render markdown files into HTML.

3. `gulp serve` to review; `gulp deploy` to publish. Auto-reload in review is a bit buggy, so you might want to re-launch sometimes.

## post format

- The file name matters: Post date are extracted from the first 9 chars. (YYYY-MM-DD)

- The metadata of each posts is separated by `---` from the content.

- The metadata is consisted of multiple lines in [TOML]. (And are processed line by line!)

- Only title and layout are used currently. Post layout is determined by `layout`; and title is from `title`. Tags and categories? Not yet :P

## templates

- Templates are written in [Mustache].

- Nothing is reused between templates.

- Template file name should be `<name>.template.html`.

_Everything in `resources/` will be put to `/`._


[TOML]: https://github.com/uiri/toml
[Mustache]: https://github.com/janl/mustache.js
