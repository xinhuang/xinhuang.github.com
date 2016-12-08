'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var fs = require('fs');
var mkdirp = require('mkdirp');
var gutil = require('gulp-util');
import { Observable } from 'rx';
import blog from '../src/app/components/blog-parser/blog-parser';

function getStaticPagePath(filename) {
    const postPartialPath = path.join(conf.paths.tmp);
    if (!fs.existsSync(postPartialPath)) {
        mkdirp.sync(postPartialPath);
    }
    return path.join(postPartialPath, `${filename.slice(0, -3)}.html`);
}

function generateStaticPage(post, dest) {
    const layoutType = post.header.layout;
    const blogTemplate = path.join(conf.paths.src, 'assets/templates', `${layoutType}.template.html`);
    let templateContent = fs.readFileSync(blogTemplate).toString();

    var map = {
        '$$blog.title$$': post.header.title,
        '$$blog.date$$': post.header.date,
        '$$blog.content$$': escapeHtml(post.content.join('\n')),
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

gulp.task('blog', function(cb) {
    var postPath = path.join(conf.paths.src, 'assets/posts');
	fs.readdir(postPath, function(err, files) {
	  if (err) {
        gutil.log(err);
		conf.errorHandler(err);
        cb();
	  } else {
        const list = {};
        list.blogs = [];
        Observable.from(files).filter(path => path.endsWith('.md'))
          .map(f => blog.parse(f, fs.readFileSync(path.join(postPath, f)).toString().split('\n')))
          .subscribe(
            post => {
                list.blogs.push(post.header);
                generateStaticPage(post, getStaticPagePath(`${post.header.file}`))
            },
            error => { gutil.log(error, error.stack); conf.errorHandler(error); },
            () => {
              fs.writeFileSync(path.join(postPath, 'list.json'), JSON.stringify(list));
              cb();
            }
          );
	  };
    });
});
