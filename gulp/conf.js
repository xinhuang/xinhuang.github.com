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
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  directory: 'bower_components'
};

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
