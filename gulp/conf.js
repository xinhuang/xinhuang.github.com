/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

import gutil from 'gulp-util';
import fs from 'fs-extra';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  data: 'data',
  dist: 'dist',
  tmp: '.tmp',
};

for (const key of Object.keys(exports.paths)) {
    if (!fs.existsSync(exports.paths[key])) {
        fs.mkdirsSync(exports.paths[key]);
    }
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};

exports.onError = err => {
    gutil.log(gutil.colors.red('[ERROR]'), `${err.toString()}\n${err.stack}`);
}
