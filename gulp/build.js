import conf from './conf';
import blog from '../src/lib/blog-parse/blog-parse';
import rxfs from '../src/lib/rx-fs-extra';

import gulp from 'gulp';
import path from 'path';
import print from 'gulp-print';
import fs from 'fs-extra';
import { Observable } from 'rx';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';

var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')({
  pattern: ['del']
});

gulp.task('clean', () => {
    return $.del([conf.paths.dist, conf.paths.tmp]);
});

gulp.task('build', ['blog:index'], () => {
    // build page: for each page: create a template copy, then inject content
    // build post: for each post: create a template copy, then inject content
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
    const layoutType = post.header.layout;
    const blogTemplate = path.join(conf.paths.src, 'templates', `${layoutType}.template.html`);
    let templateContent = fs.readFileSync(blogTemplate).toString();

    var map = {
        '$$title$$': post.header.title,
        '$$date$$': post.header.date,
        '$$data$$': escapeHtml(post.content.join('\n')),
    };
    const content = templateContent.replace(/\$\$.*?\$\$/g, function(m) { return map[m]; });

    fs.writeFileSync(dest, content);
    gutil.log(`${dest} generated.`);
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

function loadIndex(path) {
    if (!fs.existsSync(path)) {
        return {};
    } else {
        const data = fs.readFileSync(path).toString();
        try {
            return JSON.parse(data);
        } catch (e) {
            gutil.log(e);
            return {};
        }
    }
}

function buildIndex(dir) {
    const indexPath = path.join(conf.paths.tmp, 'index.json');
    const index = loadIndex(indexPath);
    return rxfs.walk(dir)
      .filter(p => p.endsWith('.md'))
      .map(f => {
          var data = fs.readFileSync(f).toString().split('\n');
          data.unshift(`"file": "${f}"`);
          return blog.parse(data).header;
      })
      .toArray()
      .first()
      .doOnError(e => { gutil.log(e); conf.errorHandler(err) })
      .map(headers => {
          index.blogs = headers;
          fs.writeFileSync(path.join(conf.paths.tmp, 'index.json'), JSON.stringify(index));
      });
}

gulp.task('blog:index', cb => {
    buildIndex(path.join(conf.paths.data, 'posts')).subscribe(
        e => {},
        () => cb(),
        () => cb()
    );
});
