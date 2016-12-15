import conf from './conf';
import blog from '../src/lib/blog-parser/blog-parser';

import gulp from 'gulp';
import path from 'path';
import print from 'gulp-print';
import fs from 'fs-extra';
import { Observable } from 'rx';
import gutil from 'gulp-util';

var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')({
  pattern: ['del']
});

gulp.task('clean', () => {
    return $.del([conf.paths.dist, conf.paths.tmp]);
});

gulp.task('build', () => {

});

gulp.task('inject', () => {
    return gulp.src([path.join(conf.paths.src, '**/*.html')])
        .pipe(print())
        .pipe(wiredep(conf.wiredep))
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'serve')));
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

function walkDir(dir) {
    return Observable.create(o => {
        fs.walk(dir)
            .on('data', item => o.onNext(item.path))
            .on('end', item => o.onCompleted());
    });
}

function makeIndex(dir) {
    return walkDir(dir).filter(p => p.slice(-3) === '.md')
        .map(f => `"filename": "${f}"` + fs.readFileSync(f).toString().split('\n'))
        .map(lines => blog.parse(lines))
        .toList();
}

gulp.task('blog:index', cb => {
    var postPath = path.join(conf.paths.data, 'posts');
    fs.readdir(postPath, function(err, files) {
	  if (err) {
        gutil.log(err);
		conf.errorHandler(err);
        cb();
	  } else {
        const index = {};
        index.blogs = [];
        Observable.from(files).filter(path => path.endsWith('.md'))
          .map(f => blog.parse(f, fs.readFileSync(path.join(postPath, f)).toString().split('\n')))
          .subscribe(
            post => {
                index.blogs.push(post.header);
                generateStaticPage(post, getStaticPagePath(`${post.header.file}`))
            },
            error => { gutil.log(error, error.stack); conf.errorHandler(error); },
            () => {
              fs.writeFileSync(path.join(postPath, 'index.json'), JSON.stringify(index));
              cb();
            }
          );
	  };
    });
});
