'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var fs = require('fs');
var gutil = require('gulp-util');
import { Observable } from 'rx';
import blog from '../src/app/components/blog-parser/blog-parser';

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'xinhuangGithubCom',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    // .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/material-design-iconfont/iconfont/', '../fonts/'))
    .pipe($.cssnano())
    .pipe($.rev())
    // .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles().concat('bower_components/material-design-iconfont/iconfont/*'))
    .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

function getStaticPagePath(postPath, filename) {
    return path.join(postPath, `${filename}.html`);
}

function generateStaticPage(post, dest) {
    const blogTemplate = path.join(conf.paths.src, 'assets/templates', 'blog.template.html');
    let templateContent = fs.readFileSync(blogTemplate).toString();
    const content = templateContent
        .replace('$$blog.title$$', post.header.title)
        .replace('$$blog.date$$', post.header.date)
        .replace('$$blog.content$$', `# ${post.header.title}\n${post.content.join('\n')}`)

    fs.writeFileSync(dest, content);
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
                gutil.log(post.header);
                list.blogs.push(post.header);
                generateStaticPage(post, getStaticPagePath(postPath, `${post.header.file}`))
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

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'fonts', 'blog', 'other']);
