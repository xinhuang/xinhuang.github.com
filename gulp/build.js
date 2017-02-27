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

gulp.task('build', ['post', 'homepage'], () => {
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

function loadIndex(type) {
    const indexPath = path.join(conf.paths.tmp, type, 'index.json');
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

function buildIndex(type) {
    const index = loadIndex(type);
    const dir = path.join(conf.paths.data, type);
    return rxfs.walk(dir)
      .filter(p => p.endsWith('.md'))
      .map(f => {
          var data = fs.readFileSync(f).toString().split('\n');
          data.unshift(`"file": "${f}"`);
          const header = parse.parse(data).header;
          header.url = `/posts/${path.basename(header.file, '.md')}.html`;
          return header;
      })
      .toArray()
      .first()
      .doOnError(e => { gutil.log(e); conf.errorHandler(err) })
      .map(headers => {
          index.posts = headers;
          index.posts.reverse();
          fs.mkdirsSync(path.join(conf.paths.tmp, type))
          fs.writeFileSync(path.join(conf.paths.tmp, type, 'index.json'), JSON.stringify(index));
          return index;
      });
}

gulp.task('post', ['post:index', 'post:render'], () => {});

gulp.task('post:index', cb => {
    buildIndex('posts').subscribe(
        index => {},
        () => cb(),
        () => cb()
    );
});

gulp.task('post:render', ['post:index'], cb => {
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
    const index = loadIndex('posts');
    fs.mkdirsSync(path.join(conf.paths.dist, 'posts'));
    Observable.fromArray(index.posts)
        .subscribe(
            post => {
                const text = fs.readFileSync(post.file).toString();

                const layout = post.layout;
                const templateFile = path.join(conf.paths.src, 'templates', `${layout}.template.html`);
                const template = fs.readFileSync(templateFile).toString();
                const rendered = mustache.render(template, {
                    title: post.title,
                    date: post.date,
                    content: marked(parse.body(text)),
                });

                fs.writeFileSync(path.join(conf.paths.dist, 'posts', `${path.basename(post.file, '.md')}.html`), rendered);
            },
            e => { gutil.log(e); conf.errorHandler(e); cb(); },
            () => cb()
        );
});

gulp.task('homepage', ['post'], cb => {
    const index = loadIndex('posts');
    const template = fs.readFileSync(path.join(conf.paths.src, 'templates', 'index.template.html')).toString();
    const rendered = mustache.render(template, {
        posts: index.posts
    });
    fs.writeFileSync(path.join(conf.paths.dist, 'index.html'), rendered);
});
