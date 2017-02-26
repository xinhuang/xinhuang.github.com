import conf from './conf';
import parse from '../src/lib/blog-parse/blog-parse';
import rxfs from '../src/lib/rx-fs-extra';

import gulp from 'gulp';
import path from 'path';
import print from 'gulp-print';
import fs from 'fs-extra';
import { Observable } from 'rx';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import marked from 'marked';
import mustache from 'mustache';

var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')({
  pattern: ['del']
});

gulp.task('clean', () => {
    return $.del([conf.paths.dist, conf.paths.tmp]);
});

gulp.task('build', ['blog'], () => {
    // build page: for each page: create a template copy, then inject content
});

gulp.task('inject', () => {
    return gulp.src([path.join(conf.paths.src, '**/*.html')])
        .pipe(print())
        .pipe(wiredep(conf.wiredep))
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'serve')));
});

gulp.task('test', () => {
    return gulp.src([path.join(conf.paths.src, '**/*.spec.js')], {read: false})
        .pipe(print())
        .pipe(mocha());
});

function getStaticPagePath(filename) {
    const postPartialPath = path.join(conf.paths.tmp);
    if (!fs.existsSync(postPartialPath)) {
        fs.mkdirsSync(postPartialPath);
    }
    return path.join(postPartialPath, `${filename.slice(0, -3)}.html`);
}

function generateStaticPage(post, dest) {
    const layout = post.layout;
    const blogTemplate = path.join(conf.paths.src, 'templates', `${layout}.template.html`);
    const targetFile = path.join(dest, layout, `${path.basename(post.file)}.html`);
    fs.copy(blogTemplate, targetFile);
    gutil.log(`Empty template for ${targetFile} generated.`);
}

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function loadIndex() {
    const indexPath = path.join(conf.paths.tmp, 'index.json');
    if (!fs.existsSync(indexPath)) {
        return {};
    } else {
        const data = fs.readFileSync(indexPath).toString();
        try {
            return JSON.parse(data);
        } catch (e) {
            gutil.log(e);
            return {};
        }
    }
}

function buildIndex(dir) {
    const index = loadIndex();
    return rxfs.walk(dir)
      .filter(p => p.endsWith('.md'))
      .map(f => {
          var data = fs.readFileSync(f).toString().split('\n');
          data.unshift(`"file": "${f}"`);
          return parse.parse(data).header;
      })
      .toArray()
      .first()
      .doOnError(e => { gutil.log(e); conf.errorHandler(err) })
      .map(headers => {
          index.blogs = headers;
          fs.writeFileSync(path.join(conf.paths.tmp, 'index.json'), JSON.stringify(index));
          return index;
      });
}

gulp.task('blog', ['blog:index', 'blog:render'], () => {});

gulp.task('blog:index', cb => {
    buildIndex(path.join(conf.paths.data, 'posts')).subscribe(
        index => {
        },
        () => cb(),
        () => cb()
    );
});

gulp.task('blog:render', ['blog:index'], cb => {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
    const index = loadIndex();
    Observable.fromArray(index.blogs)
        .subscribe(
            blog => {
                const text = fs.readFileSync(blog.file).toString();

                const layout = blog.layout;
                const templateFile = path.join(conf.paths.src, 'templates', `${layout}.template.html`);
                const template = fs.readFileSync(templateFile).toString();
                const rendered = mustache.render(template, {
                    title: blog.title,
                    date: blog.date,
                    content: marked(parse.body(text)),
                });

                fs.writeFileSync(path.join(conf.paths.dist, `${path.basename(blog.file, '.md')}.html`), rendered);
            },
            e => { gutil.log(e); conf.errorHandler(e); cb(); },
            () => cb()
        );
});
