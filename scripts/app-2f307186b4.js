/******/!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}// webpackBootstrap
/******/
var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";var n=r(1),o=r(2),i=r(3),l=r(4),a=r(5),s=r(9),u=r(10);angular.module("xinhuangGithubCom",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr","hc.marked"]).constant("malarkey",malarkey).constant("moment",moment).config(n.config).config(o.routerConfig).run(i.runBlock).controller("MainController",l.MainController).controller("BlogController",a.BlogController).controller("PageController",s.PageController).directive("acmeMalarkey",u.MalarkeyDirective)},function(e,t){"use strict";function r(e,t){"ngInject";e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}r.$inject=["$logProvider","toastrConfig"],Object.defineProperty(t,"__esModule",{value:!0}),t.config=r},function(e,t){"use strict";function r(e,t){"ngInject";e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("blog",{url:"/blogs/:blogFile",templateUrl:"app/blog/blog.html",controller:"BlogController",controllerAs:"blog"}).state("page",{url:"/:pageFile",templateUrl:"app/page/page.html",controller:"PageController",controllerAs:"page"}),t.otherwise("/")}r.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=r},function(e,t){"use strict";function r(e){"ngInject";e.debug("runBlock end")}r.$inject=["$log"],Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=r},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.MainController=["$rootScope","$http",function n(e,t){"ngInject";var o=this;r(this,n),t.get("assets/posts/list.json").success(function(e){o.blogs=e.blogs,o.blogs.sort(function(e,t){return e.date==t.date?0:e.date>t.date?-1:1}),o.blogs.forEach(function(e,t){o.blogs[t].file=o.blogs[t].file.slice(0,-3)})}),this.taglines=["eat more.","sleep more.","play more.","code more."]}]},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.BlogController=void 0;var i=r(6),l=n(i),a=r(8),s=n(a);t.BlogController=["$rootScope","$stateParams","$http","$location","$anchorScroll",function u(e,t,r,n,i){"ngInject";var a=this;o(this,u),e.header="Loading...";var c=t.blogFile,f=l["default"].join("/assets/posts/",c);r.get(f).success(function(t){var r=t.split("\n"),n=s["default"].parse(f,r);e.header=n.header.title;var o="# "+n.header.title+"\n"+n.content.join("\n");a.content=o}),this.scrollToTop=function(){"top"!=n.hash()?n.hash("top"):i()}}]},function(e,t,r){(function(e){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
function r(e,t){for(var r=0,n=e.length-1;n>=0;n--){var o=e[n];"."===o?e.splice(n,1):".."===o?(e.splice(n,1),r++):r&&(e.splice(n,1),r--)}if(t)for(;r--;r)e.unshift("..");return e}function n(e,t){if(e.filter)return e.filter(t);for(var r=[],n=0;n<e.length;n++)t(e[n],n,e)&&r.push(e[n]);return r}var o=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,i=function(e){return o.exec(e).slice(1)};t.resolve=function(){for(var t="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var l=i>=0?arguments[i]:e.cwd();if("string"!=typeof l)throw new TypeError("Arguments to path.resolve must be strings");l&&(t=l+"/"+t,o="/"===l.charAt(0))}return t=r(n(t.split("/"),function(e){return!!e}),!o).join("/"),(o?"/":"")+t||"."},t.normalize=function(e){var o=t.isAbsolute(e),i="/"===l(e,-1);return e=r(n(e.split("/"),function(e){return!!e}),!o).join("/"),e||o||(e="."),e&&i&&(e+="/"),(o?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(n(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},t.relative=function(e,r){function n(e){for(var t=0;t<e.length&&""===e[t];t++);for(var r=e.length-1;r>=0&&""===e[r];r--);return t>r?[]:e.slice(t,r-t+1)}e=t.resolve(e).substr(1),r=t.resolve(r).substr(1);for(var o=n(e.split("/")),i=n(r.split("/")),l=Math.min(o.length,i.length),a=l,s=0;l>s;s++)if(o[s]!==i[s]){a=s;break}for(var u=[],s=a;s<o.length;s++)u.push("..");return u=u.concat(i.slice(a)),u.join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){var t=i(e),r=t[0],n=t[1];return r||n?(n&&(n=n.substr(0,n.length-1)),r+n):"."},t.basename=function(e,t){var r=i(e)[2];return t&&r.substr(-1*t.length)===t&&(r=r.substr(0,r.length-t.length)),r},t.extname=function(e){return i(e)[3]};var l="b"==="ab".substr(-1)?function(e,t,r){return e.substr(t,r)}:function(e,t,r){return 0>t&&(t=e.length+t),e.substr(t,r)}}).call(t,r(7))},function(e,t){function r(){u&&l&&(u=!1,l.length?s=l.concat(s):c=-1,s.length&&n())}function n(){if(!u){var e=setTimeout(r);u=!0;for(var t=s.length;t;){for(l=s,s=[];++c<t;)l&&l[c].run();c=-1,t=s.length}l=null,u=!1,clearTimeout(e)}}function o(e,t){this.fun=e,this.array=t}function i(){}var l,a=e.exports={},s=[],u=!1,c=-1;a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];s.push(new o(e,t)),1!==s.length||u||setTimeout(n,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=i,a.addListener=i,a.once=i,a.off=i,a.removeListener=i,a.removeAllListeners=i,a.emit=i,a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},function(e,t){"use strict";function r(e){for(var t=[],r=0;r<e.length;++r){var n=e[r].trim();if("---"===n)return t;t.push(n)}throw new Error("Seems there is no header in the lines")}function n(e){try{if(0===e.length)return{};for(var t={},r=0;r<e.length;++r){var n=JSON.parse("{"+e[r]+"}");for(var o in n)t[o]=n[o]}return t.date=t.file.substring(0,10),t}catch(i){throw new Error("parseHeader: Error at line '"+e+"'\n("+i+")")}}function o(e,t){t.unshift('"file": "'+e+'"');var o=r(t);return t.splice(0,o.length+1),{header:n(o),content:t}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={extractHeader:r,parseHeader:n,parse:o}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.PageController=void 0;var i=r(6),l=n(i);t.PageController=["$rootScope","$stateParams","$http","$location","$anchorScroll",function a(e,t,r,n,i){"ngInject";var s=this;o(this,a),e.header="Resume - Xin Huang";var u=t.pageFile,c=l["default"].join("/assets/pages/",u);r.get(c).success(function(e){s.content=e}),this.scrollToTop=function(){"top"!=n.hash()?n.hash("top"):i()}}]},function(e,t){"use strict";function r(e){"ngInject";function t(t,r){var n=e(r[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});r.addClass("acme-malarkey"),angular.forEach(t.values,function(e){n.type(e).pause()["delete"]()})}var r={restrict:"E",scope:{values:"="},template:"&nbsp;",link:t};return r}r.$inject=["malarkey"],Object.defineProperty(t,"__esModule",{value:!0}),t.MalarkeyDirective=r}]),angular.module("xinhuangGithubCom").run(["$templateCache",function(e){e.put("app/blog/blog.html",'<article id=top class=anchor><div layout=row><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70><h1 class=md-h1>{{blog.title}}</h1><div class=entry-meta>{{blog.date}}</div><div marked=blog.content></div></div></div><md-divider></md-divider><div class=footer layout=row><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70 layout=row><a href=/ >Home</a><div flex></div><a href="" ng-click=blog.scrollToTop()>Top</a></div></div></article>'),e.put("app/main/main.html",'<article><div layout=row layout-fill><div flex=30 flex-xs=0 flex-sm=15></div><div layout=column><div id=title layout=row class=header><div id=title>Life is short,</div><acme-malarkey id=tagline values=main.taglines></acme-malarkey></div><md-divider><div id=blog-list><md-list><md-list-item class=md-2-line ng-repeat="blog in main.blogs"><div class=md-list-item-text layout=row><p id=blog-date>{{blog.date}}</p><a href=/{{blog.file}}.html id=blog-link><h3>{{blog.title}}</h3></a></div></md-list-item></md-list></div><md-divider><div class=footer><div layout=row><a href=https://github.com/xinhuang>GitHub</a><div flex=5></div><a href=/#/about>About</a></div></div></div></div></article>'),e.put("app/page/page.html",'<article id=top class=anchor><div layout=row><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70><div marked=page.content></div></div></div><md-divider></md-divider><div class=footer layout=row><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70 layout=row><a href=/ >Home</a><div flex></div><a href="" ng-click=blog.scrollToTop()>Top</a></div></div></article>')}]);
//# sourceMappingURL=../maps/scripts/app-2f307186b4.js.map
