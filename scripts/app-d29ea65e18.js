/******/!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}// webpackBootstrap
/******/
var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";var n=r(1),o=r(2),i=r(3),a=r(4),s=r(5),l=r(12),u=r(13);angular.module("xinhuangGithubCom",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr","hc.marked"]).constant("malarkey",malarkey).constant("moment",moment).config(n.config).config(o.routerConfig).run(i.runBlock).controller("MainController",a.MainController).controller("BlogController",s.BlogController).controller("PageController",l.PageController).directive("acmeMalarkey",u.MalarkeyDirective)},function(e,t){"use strict";function r(e,t){"ngInject";e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}r.$inject=["$logProvider","toastrConfig"],Object.defineProperty(t,"__esModule",{value:!0}),t.config=r},function(e,t){"use strict";function r(e,t){"ngInject";e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("blog",{url:"/blogs/:blogFile",templateUrl:"app/blog/blog.html",controller:"BlogController",controllerAs:"blog"}).state("page",{url:"/:pageFile",templateUrl:"app/page/page.html",controller:"PageController",controllerAs:"page"}),t.otherwise("/")}r.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=r},function(e,t){"use strict";function r(e){"ngInject";e.debug("runBlock end")}r.$inject=["$log"],Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=r},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.MainController=["$rootScope","$http",function n(e,t){"ngInject";var o=this;r(this,n),e.header="Life is short",this.title="Life is short, ",t.get("assets/posts/list.json").success(function(e){o.blogs=e.blogs,o.blogs.sort(function(e,t){return e.date==t.date?0:e.date>t.date?-1:1})}),this.taglines=["eat more.","sleep more.","play more.","code more."]}]},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.BlogController=void 0;var i=r(6),a=n(i),s=r(11),l=n(s);t.BlogController=["$rootScope","$stateParams","$http","$location","$anchorScroll",function u(e,t,r,n,i){"ngInject";var s=this;o(this,u),e.header="Loading...";var c=t.blogFile,f=a["default"].join("/assets/posts/",c);r.get(f).success(function(t){var r=t.split("\n"),n=l["default"].parse(f,r);e.header=n.header.title;var o="# "+n.header.title+"\n"+n.content.join("\n");s.content=o}),this.scrollToTop=function(){"top"!=n.hash()?n.hash("top"):i()}}]},function(e,t,r){(function(t){// Copyright Joyent, Inc. and other Node contributors.
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
"use strict";function n(e,t){for(var r=[],n=0;n<e.length;n++){var o=e[n];o&&"."!==o&&(".."===o?r.length&&".."!==r[r.length-1]?r.pop():t&&r.push(".."):r.push(o))}return r}function o(e){for(var t=e.length-1,r=0;t>=r&&!e[r];r++);for(var n=t;n>=0&&!e[n];n--);return 0===r&&n===t?e:r>n?[]:e.slice(r,n+1)}function i(e){var t=f.exec(e),r=(t[1]||"")+(t[2]||""),n=t[3]||"",o=p.exec(n),i=o[1],a=o[2],s=o[3];return[r,i,a,s]}function a(e){var t=f.exec(e),r=t[1]||"",n=!!r&&":"!==r[1];return{device:r,isUnc:n,isAbsolute:n||!!t[2],tail:t[3]}}function s(e){return"\\\\"+e.replace(/^[\\\/]+/,"").replace(/[\\\/]+/g,"\\")}function l(e){return d.exec(e).slice(1)}var u="win32"===t.platform,c=r(8),f=/^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/,p=/^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/,g={};g.resolve=function(){for(var e="",r="",o=!1,i=arguments.length-1;i>=-1;i--){var l;if(i>=0?l=arguments[i]:e?(l=t.env["="+e],l&&l.substr(0,3).toLowerCase()===e.toLowerCase()+"\\"||(l=e+"\\")):l=t.cwd(),!c.isString(l))throw new TypeError("Arguments to path.resolve must be strings");if(l){var u=a(l),f=u.device,p=u.isUnc,g=u.isAbsolute,d=u.tail;if((!f||!e||f.toLowerCase()===e.toLowerCase())&&(e||(e=f),o||(r=d+"\\"+r,o=g),e&&o))break}}return p&&(e=s(e)),r=n(r.split(/[\\\/]+/),!o).join("\\"),e+(o?"\\":"")+r||"."},g.normalize=function(e){var t=a(e),r=t.device,o=t.isUnc,i=t.isAbsolute,l=t.tail,u=/[\\\/]$/.test(l);return l=n(l.split(/[\\\/]+/),!i).join("\\"),l||i||(l="."),l&&u&&(l+="\\"),o&&(r=s(r)),r+(i?"\\":"")+l},g.isAbsolute=function(e){return a(e).isAbsolute},g.join=function(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(!c.isString(r))throw new TypeError("Arguments to path.join must be strings");r&&e.push(r)}var n=e.join("\\");return/^[\\\/]{2}[^\\\/]/.test(e[0])||(n=n.replace(/^[\\\/]{2,}/,"\\")),g.normalize(n)},g.relative=function(e,t){e=g.resolve(e),t=g.resolve(t);for(var r=e.toLowerCase(),n=t.toLowerCase(),i=o(t.split("\\")),a=o(r.split("\\")),s=o(n.split("\\")),l=Math.min(a.length,s.length),u=l,c=0;l>c;c++)if(a[c]!==s[c]){u=c;break}if(0==u)return t;for(var f=[],c=u;c<a.length;c++)f.push("..");return f=f.concat(i.slice(u)),f.join("\\")},g._makeLong=function(e){if(!c.isString(e))return e;if(!e)return"";var t=g.resolve(e);return/^[a-zA-Z]\:\\/.test(t)?"\\\\?\\"+t:/^\\\\[^?.]/.test(t)?"\\\\?\\UNC\\"+t.substring(2):e},g.dirname=function(e){var t=i(e),r=t[0],n=t[1];return r||n?(n&&(n=n.substr(0,n.length-1)),r+n):"."},g.basename=function(e,t){var r=i(e)[2];return t&&r.substr(-1*t.length)===t&&(r=r.substr(0,r.length-t.length)),r},g.extname=function(e){return i(e)[3]},g.format=function(e){if(!c.isObject(e))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof e);var t=e.root||"";if(!c.isString(t))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof e.root);var r=e.dir,n=e.base||"";return r?r[r.length-1]===g.sep?r+n:r+g.sep+n:n},g.parse=function(e){if(!c.isString(e))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof e);var t=i(e);if(!t||4!==t.length)throw new TypeError("Invalid path '"+e+"'");return{root:t[0],dir:t[0]+t[1].slice(0,-1),base:t[2],ext:t[3],name:t[2].slice(0,t[2].length-t[3].length)}},g.sep="\\",g.delimiter=";";var d=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,v={};v.resolve=function(){for(var e="",r=!1,o=arguments.length-1;o>=-1&&!r;o--){var i=o>=0?arguments[o]:t.cwd();if(!c.isString(i))throw new TypeError("Arguments to path.resolve must be strings");i&&(e=i+"/"+e,r="/"===i[0])}return e=n(e.split("/"),!r).join("/"),(r?"/":"")+e||"."},v.normalize=function(e){var t=v.isAbsolute(e),r=e&&"/"===e[e.length-1];return e=n(e.split("/"),!t).join("/"),e||t||(e="."),e&&r&&(e+="/"),(t?"/":"")+e},v.isAbsolute=function(e){return"/"===e.charAt(0)},v.join=function(){for(var e="",t=0;t<arguments.length;t++){var r=arguments[t];if(!c.isString(r))throw new TypeError("Arguments to path.join must be strings");r&&(e+=e?"/"+r:r)}return v.normalize(e)},v.relative=function(e,t){e=v.resolve(e).substr(1),t=v.resolve(t).substr(1);for(var r=o(e.split("/")),n=o(t.split("/")),i=Math.min(r.length,n.length),a=i,s=0;i>s;s++)if(r[s]!==n[s]){a=s;break}for(var l=[],s=a;s<r.length;s++)l.push("..");return l=l.concat(n.slice(a)),l.join("/")},v._makeLong=function(e){return e},v.dirname=function(e){var t=l(e),r=t[0],n=t[1];return r||n?(n&&(n=n.substr(0,n.length-1)),r+n):"."},v.basename=function(e,t){var r=l(e)[2];return t&&r.substr(-1*t.length)===t&&(r=r.substr(0,r.length-t.length)),r},v.extname=function(e){return l(e)[3]},v.format=function(e){if(!c.isObject(e))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof e);var t=e.root||"";if(!c.isString(t))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof e.root);var r=e.dir?e.dir+v.sep:"",n=e.base||"";return r+n},v.parse=function(e){if(!c.isString(e))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof e);var t=l(e);if(!t||4!==t.length)throw new TypeError("Invalid path '"+e+"'");return t[1]=t[1]||"",t[2]=t[2]||"",t[3]=t[3]||"",{root:t[0],dir:t[0]+t[1].slice(0,-1),base:t[2],ext:t[3],name:t[2].slice(0,t[2].length-t[3].length)}},v.sep="/",v.delimiter=":",u?e.exports=g:e.exports=v,e.exports.posix=v,e.exports.win32=g}).call(t,r(7))},function(e,t){function r(){u&&a&&(u=!1,a.length?l=a.concat(l):c=-1,l.length&&n())}function n(){if(!u){var e=setTimeout(r);u=!0;for(var t=l.length;t;){for(a=l,l=[];++c<t;)a&&a[c].run();c=-1,t=l.length}a=null,u=!1,clearTimeout(e)}}function o(e,t){this.fun=e,this.array=t}function i(){}var a,s=e.exports={},l=[],u=!1,c=-1;s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new o(e,t)),1!==l.length||u||setTimeout(n,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=i,s.addListener=i,s.once=i,s.off=i,s.removeListener=i,s.removeAllListeners=i,s.emit=i,s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(e,t,r){(function(e,n){function o(e,r){var n={seen:[],stylize:a};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),v(r)?n.showHidden=r:r&&t._extend(n,r),w(n.showHidden)&&(n.showHidden=!1),w(n.depth)&&(n.depth=2),w(n.colors)&&(n.colors=!1),w(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=i),l(n,e,n.depth)}function i(e,t){var r=o.styles[t];return r?"["+o.colors[r][0]+"m"+e+"["+o.colors[r][1]+"m":e}function a(e,t){return e}function s(e){var t={};return e.forEach(function(e,r){t[e]=!0}),t}function l(e,r,n){if(e.customInspect&&r&&E(r.inspect)&&r.inspect!==t.inspect&&(!r.constructor||r.constructor.prototype!==r)){var o=r.inspect(n,e);return b(o)||(o=l(e,o,n)),o}var i=u(e,r);if(i)return i;var a=Object.keys(r),v=s(a);if(e.showHidden&&(a=Object.getOwnPropertyNames(r)),C(r)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return c(r);if(0===a.length){if(E(r)){var h=r.name?": "+r.name:"";return e.stylize("[Function"+h+"]","special")}if(j(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(O(r))return e.stylize(Date.prototype.toString.call(r),"date");if(C(r))return c(r)}var m="",y=!1,x=["{","}"];if(d(r)&&(y=!0,x=["[","]"]),E(r)){var w=r.name?": "+r.name:"";m=" [Function"+w+"]"}if(j(r)&&(m=" "+RegExp.prototype.toString.call(r)),O(r)&&(m=" "+Date.prototype.toUTCString.call(r)),C(r)&&(m=" "+c(r)),0===a.length&&(!y||0==r.length))return x[0]+m+x[1];if(0>n)return j(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special");e.seen.push(r);var S;return S=y?f(e,r,n,v,a):a.map(function(t){return p(e,r,n,v,t,y)}),e.seen.pop(),g(S,m,x)}function u(e,t){if(w(t))return e.stylize("undefined","undefined");if(b(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}return y(t)?e.stylize(""+t,"number"):v(t)?e.stylize(""+t,"boolean"):h(t)?e.stylize("null","null"):void 0}function c(e){return"["+Error.prototype.toString.call(e)+"]"}function f(e,t,r,n,o){for(var i=[],a=0,s=t.length;s>a;++a)_(t,String(a))?i.push(p(e,t,r,n,String(a),!0)):i.push("");return o.forEach(function(o){o.match(/^\d+$/)||i.push(p(e,t,r,n,o,!0))}),i}function p(e,t,r,n,o,i){var a,s,u;if(u=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]},u.get?s=u.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):u.set&&(s=e.stylize("[Setter]","special")),_(n,o)||(a="["+o+"]"),s||(e.seen.indexOf(u.value)<0?(s=h(r)?l(e,u.value,null):l(e,u.value,r-1),s.indexOf("\n")>-1&&(s=i?s.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+s.split("\n").map(function(e){return"   "+e}).join("\n"))):s=e.stylize("[Circular]","special")),w(a)){if(i&&o.match(/^\d+$/))return s;a=JSON.stringify(""+o),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=e.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=e.stylize(a,"string"))}return a+": "+s}function g(e,t,r){var n=0,o=e.reduce(function(e,t){return n++,t.indexOf("\n")>=0&&n++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);return o>60?r[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+r[1]:r[0]+t+" "+e.join(", ")+" "+r[1]}function d(e){return Array.isArray(e)}function v(e){return"boolean"==typeof e}function h(e){return null===e}function m(e){return null==e}function y(e){return"number"==typeof e}function b(e){return"string"==typeof e}function x(e){return"symbol"==typeof e}function w(e){return void 0===e}function j(e){return S(e)&&"[object RegExp]"===k(e)}function S(e){return"object"==typeof e&&null!==e}function O(e){return S(e)&&"[object Date]"===k(e)}function C(e){return S(e)&&("[object Error]"===k(e)||e instanceof Error)}function E(e){return"function"==typeof e}function T(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function k(e){return Object.prototype.toString.call(e)}function $(e){return 10>e?"0"+e.toString(10):e.toString(10)}function A(){var e=new Date,t=[$(e.getHours()),$(e.getMinutes()),$(e.getSeconds())].join(":");return[e.getDate(),D[e.getMonth()],t].join(" ")}function _(e,t){return Object.prototype.hasOwnProperty.call(e,t)}// Copyright Joyent, Inc. and other Node contributors.
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
var z=/%[sdj%]/g;t.format=function(e){if(!b(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(o(arguments[r]));return t.join(" ")}for(var r=1,n=arguments,i=n.length,a=String(e).replace(z,function(e){if("%%"===e)return"%";if(r>=i)return e;switch(e){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return e}}),s=n[r];i>r;s=n[++r])a+=h(s)||!S(s)?" "+s:" "+o(s);return a},t.deprecate=function(r,o){function i(){if(!a){if(n.throwDeprecation)throw new Error(o);n.traceDeprecation?console.trace(o):console.error(o),a=!0}return r.apply(this,arguments)}if(w(e.process))return function(){return t.deprecate(r,o).apply(this,arguments)};if(n.noDeprecation===!0)return r;var a=!1;return i};var P,M={};t.debuglog=function(e){if(w(P)&&(P=n.env.NODE_DEBUG||""),e=e.toUpperCase(),!M[e])if(new RegExp("\\b"+e+"\\b","i").test(P)){var r=n.pid;M[e]=function(){var n=t.format.apply(t,arguments);console.error("%s %d: %s",e,r,n)}}else M[e]=function(){};return M[e]},t.inspect=o,o.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},o.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=d,t.isBoolean=v,t.isNull=h,t.isNullOrUndefined=m,t.isNumber=y,t.isString=b,t.isSymbol=x,t.isUndefined=w,t.isRegExp=j,t.isObject=S,t.isDate=O,t.isError=C,t.isFunction=E,t.isPrimitive=T,t.isBuffer=r(9);var D=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];t.log=function(){console.log("%s - %s",A(),t.format.apply(t,arguments))},t.inherits=r(10),t._extend=function(e,t){if(!t||!S(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e}}).call(t,function(){return this}(),r(7))},function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}},function(e,t){"use strict";function r(e){for(var t=[],r=0;r<e.length;++r){var n=e[r].trim();if("---"===n)return t;t.push(n)}return e}function n(e){try{if(0===e.length)return{};for(var t={},r=0;r<e.length;++r){var n=JSON.parse("{"+e[r]+"}");for(var o in n)t[o]=n[o]}return t.date=t.file.substring(0,10),t}catch(i){throw new Error(e+"\n("+i+")")}}function o(e,t){t.unshift('"file": "'+e+'"');var o=r(t);return t.splice(0,o.length+1),{header:n(o),content:t}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={extractHeader:r,parseHeader:n,parse:o}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.PageController=void 0;var i=r(6),a=n(i);t.PageController=["$rootScope","$stateParams","$http","$location","$anchorScroll",function s(e,t,r,n,i){"ngInject";var l=this;o(this,s),e.header="Resume - Xin Huang";var u=t.pageFile,c=a["default"].join("/assets/pages/",u);r.get(c).success(function(e){l.content=e}),this.scrollToTop=function(){"top"!=n.hash()?n.hash("top"):i()}}]},function(e,t){"use strict";function r(e){"ngInject";function t(t,r){var n=e(r[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});r.addClass("acme-malarkey"),angular.forEach(t.values,function(e){n.type(e).pause()["delete"]()})}var r={restrict:"E",scope:{values:"="},template:"&nbsp;",link:t};return r}r.$inject=["malarkey"],Object.defineProperty(t,"__esModule",{value:!0}),t.MalarkeyDirective=r}]),angular.module("xinhuangGithubCom").run(["$templateCache",function(e){e.put("app/blog/blog.html",'<article id=top class=anchor><div layout=row><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70><h1 class=md-h1>{{blog.title}}</h1><div class=entry-meta>{{blog.date}}</div><div marked=blog.content></div></div></div><md-divider></md-divider><div class=footer layout=row><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70 layout=row><a href=/ >Home</a><div flex></div><a href="" ng-click=blog.scrollToTop()>Top</a></div></div></article>'),e.put("app/main/main.html",'<article><div layout=row layout-fill><div flex=30 flex-xs=0 flex-sm=15></div><div layout=column><div id=title layout=row class=header><div id=title>{{main.title}}</div><acme-malarkey id=tagline values=main.taglines></acme-malarkey></div><md-divider><div id=blog-list><md-list><md-list-item class=md-2-line ng-repeat="blog in main.blogs"><div class=md-list-item-text layout=row><p id=blog-date>{{blog.date}}</p><a href=#/blogs/{{blog.file}} id=blog-link><h3>{{blog.title}}</h3></a></div></md-list-item></md-list></div><md-divider><div class=footer><div layout=row><a href=https://github.com/xinhuang>GitHub</a><div flex=5></div><a href=/#/about>About</a></div></div></div></div></article>'),e.put("app/page/page.html",'<article id=top class=anchor><div layout=row><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70><div marked=page.content></div></div></div><md-divider></md-divider><div class=footer layout=row><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70 layout=row><a href=/ >Home</a><div flex></div><a href="" ng-click=blog.scrollToTop()>Top</a></div></div></article>')}]);
//# sourceMappingURL=../maps/scripts/app-d29ea65e18.js.map
