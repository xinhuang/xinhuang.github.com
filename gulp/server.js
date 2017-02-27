import conf from './conf';
import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';

gulp.task('server', ['serve']);

gulp.task('serve', () => {
    browserSync.init({
      startPath: '/',
      server: { baseDir: conf.paths.dist },
    });

    gulp.watch([path.join(conf.paths.src, '/**/*'),
                path.join(conf.paths.data, '/**/*')], ['serve:reload'])
});

gulp.task('serve:reload', ['build'], () => {
    browserSync.reload();
});
