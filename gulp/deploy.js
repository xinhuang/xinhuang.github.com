var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['build', 'test'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({ branch: 'master' }));
});
