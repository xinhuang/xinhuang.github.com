import conf from './conf';
import gulp from 'gulp';
import path from 'path';
import print from 'gulp-print';

var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')({
  pattern: ['del']
});

gulp.task('clean', () => {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', () => {

});

gulp.task('inject', () => {
    return gulp.src([path.join(conf.paths.src, '**/*.html')])
        .pipe(print())
        .pipe(wiredep(conf.wiredep))
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'serve')));
});
