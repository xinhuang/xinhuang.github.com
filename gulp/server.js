import conf from './conf';
import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';

gulp.task('server', ['serve']);

gulp.task('serve', () => {
    browserSync.instance = browserSync.init({
      startPath: '/',
      server: { baseDir: conf.paths.dist },
    });
});
