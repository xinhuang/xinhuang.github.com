/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { BlogController } from './blog/blog.controller';
import { MalarkeyDirective } from './components/malarkey/malarkey.directive';

angular.module('xinhuangGithubCom',
    ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource',
     'ui.router', 'ngMaterial', 'toastr', 'hc.marked'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('BlogController', BlogController)
  .directive('acmeMalarkey', MalarkeyDirective);
