/******/!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}// webpackBootstrap
/******/
var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){n(1),n(14),n(15),t.exports=n(56)},function(t,e,n){"use strict";var r=n(2),o=n(3),i=n(4),a=n(5),s=n(6),u=n(13);angular.module("xinhuangGithubCom",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr","hc.marked"]).constant("malarkey",malarkey).constant("moment",moment).config(r.config).config(o.routerConfig).run(i.runBlock).controller("MainController",a.MainController).controller("BlogController",s.BlogController).directive("acmeMalarkey",u.MalarkeyDirective)},function(t,e){"use strict";function n(t,e){"ngInject";t.debugEnabled(!0),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0}n.$inject=["$logProvider","toastrConfig"],Object.defineProperty(e,"__esModule",{value:!0}),e.config=n},function(t,e){"use strict";function n(t,e){"ngInject";t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("blog",{url:"/blogs/:blogFile",templateUrl:"app/blog/blog.html",controller:"BlogController",controllerAs:"blog"}),e.otherwise("/")}n.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.routerConfig=n},function(t,e){"use strict";function n(t){"ngInject";t.debug("runBlock end")}n.$inject=["$log"],Object.defineProperty(e,"__esModule",{value:!0}),e.runBlock=n},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.MainController=["$rootScope","$http",function r(t,e){"ngInject";var o=this;n(this,r),t.header="Life is short,",this.title="Life is short, ",e.get("assets/posts/list.json").success(function(t){o.blogs=t.blogs,o.blogs.sort(function(t,e){return t.date==e.date?0:t.date>e.date?-1:1})}),this.taglines=["eat more.","sleep more.","play more.","code more."]}]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BlogController=void 0;var i=n(7),a=r(i),s=n(12),u=r(s);e.BlogController=["$rootScope","$stateParams","$http","$location","$anchorScroll",function c(t,e,n,r,i){"ngInject";var s=this;o(this,c),t.header="Loading...";var f=e.blogFile,h=a["default"].join("/assets/posts/",f);n.get(h).success(function(e){var n=e.split("\n"),r=u["default"].parse(h,n);t.header=r.header.title;var o="# "+r.header.title+"\n"+r.content.join("\n");s.content=o}),this.scrollToTop=function(){"top"!=r.hash()?r.hash("top"):i()}}]},function(t,e,n){(function(e){// Copyright Joyent, Inc. and other Node contributors.
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
"use strict";function r(t,e){for(var n=[],r=0;r<t.length;r++){var o=t[r];o&&"."!==o&&(".."===o?n.length&&".."!==n[n.length-1]?n.pop():e&&n.push(".."):n.push(o))}return n}function o(t){for(var e=t.length-1,n=0;e>=n&&!t[n];n++);for(var r=e;r>=0&&!t[r];r--);return 0===n&&r===e?t:n>r?[]:t.slice(n,r+1)}function i(t){var e=h.exec(t),n=(e[1]||"")+(e[2]||""),r=e[3]||"",o=l.exec(r),i=o[1],a=o[2],s=o[3];return[n,i,a,s]}function a(t){var e=h.exec(t),n=e[1]||"",r=!!n&&":"!==n[1];return{device:n,isUnc:r,isAbsolute:r||!!e[2],tail:e[3]}}function s(t){return"\\\\"+t.replace(/^[\\\/]+/,"").replace(/[\\\/]+/g,"\\")}function u(t){return d.exec(t).slice(1)}var c="win32"===e.platform,f=n(9),h=/^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/,l=/^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/,p={};p.resolve=function(){for(var t="",n="",o=!1,i=arguments.length-1;i>=-1;i--){var u;if(i>=0?u=arguments[i]:t?(u=e.env["="+t],u&&u.substr(0,3).toLowerCase()===t.toLowerCase()+"\\"||(u=t+"\\")):u=e.cwd(),!f.isString(u))throw new TypeError("Arguments to path.resolve must be strings");if(u){var c=a(u),h=c.device,l=c.isUnc,p=c.isAbsolute,d=c.tail;if((!h||!t||h.toLowerCase()===t.toLowerCase())&&(t||(t=h),o||(n=d+"\\"+n,o=p),t&&o))break}}return l&&(t=s(t)),n=r(n.split(/[\\\/]+/),!o).join("\\"),t+(o?"\\":"")+n||"."},p.normalize=function(t){var e=a(t),n=e.device,o=e.isUnc,i=e.isAbsolute,u=e.tail,c=/[\\\/]$/.test(u);return u=r(u.split(/[\\\/]+/),!i).join("\\"),u||i||(u="."),u&&c&&(u+="\\"),o&&(n=s(n)),n+(i?"\\":"")+u},p.isAbsolute=function(t){return a(t).isAbsolute},p.join=function(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(!f.isString(n))throw new TypeError("Arguments to path.join must be strings");n&&t.push(n)}var r=t.join("\\");return/^[\\\/]{2}[^\\\/]/.test(t[0])||(r=r.replace(/^[\\\/]{2,}/,"\\")),p.normalize(r)},p.relative=function(t,e){t=p.resolve(t),e=p.resolve(e);for(var n=t.toLowerCase(),r=e.toLowerCase(),i=o(e.split("\\")),a=o(n.split("\\")),s=o(r.split("\\")),u=Math.min(a.length,s.length),c=u,f=0;u>f;f++)if(a[f]!==s[f]){c=f;break}if(0==c)return e;for(var h=[],f=c;f<a.length;f++)h.push("..");return h=h.concat(i.slice(c)),h.join("\\")},p._makeLong=function(t){if(!f.isString(t))return t;if(!t)return"";var e=p.resolve(t);return/^[a-zA-Z]\:\\/.test(e)?"\\\\?\\"+e:/^\\\\[^?.]/.test(e)?"\\\\?\\UNC\\"+e.substring(2):t},p.dirname=function(t){var e=i(t),n=e[0],r=e[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},p.basename=function(t,e){var n=i(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},p.extname=function(t){return i(t)[3]},p.format=function(t){if(!f.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof t);var e=t.root||"";if(!f.isString(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof t.root);var n=t.dir,r=t.base||"";return n?n[n.length-1]===p.sep?n+r:n+p.sep+r:r},p.parse=function(t){if(!f.isString(t))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof t);var e=i(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return{root:e[0],dir:e[0]+e[1].slice(0,-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},p.sep="\\",p.delimiter=";";var d=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,g={};g.resolve=function(){for(var t="",n=!1,o=arguments.length-1;o>=-1&&!n;o--){var i=o>=0?arguments[o]:e.cwd();if(!f.isString(i))throw new TypeError("Arguments to path.resolve must be strings");i&&(t=i+"/"+t,n="/"===i[0])}return t=r(t.split("/"),!n).join("/"),(n?"/":"")+t||"."},g.normalize=function(t){var e=g.isAbsolute(t),n=t&&"/"===t[t.length-1];return t=r(t.split("/"),!e).join("/"),t||e||(t="."),t&&n&&(t+="/"),(e?"/":"")+t},g.isAbsolute=function(t){return"/"===t.charAt(0)},g.join=function(){for(var t="",e=0;e<arguments.length;e++){var n=arguments[e];if(!f.isString(n))throw new TypeError("Arguments to path.join must be strings");n&&(t+=t?"/"+n:n)}return g.normalize(t)},g.relative=function(t,e){t=g.resolve(t).substr(1),e=g.resolve(e).substr(1);for(var n=o(t.split("/")),r=o(e.split("/")),i=Math.min(n.length,r.length),a=i,s=0;i>s;s++)if(n[s]!==r[s]){a=s;break}for(var u=[],s=a;s<n.length;s++)u.push("..");return u=u.concat(r.slice(a)),u.join("/")},g._makeLong=function(t){return t},g.dirname=function(t){var e=u(t),n=e[0],r=e[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},g.basename=function(t,e){var n=u(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},g.extname=function(t){return u(t)[3]},g.format=function(t){if(!f.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof t);var e=t.root||"";if(!f.isString(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof t.root);var n=t.dir?t.dir+g.sep:"",r=t.base||"";return n+r},g.parse=function(t){if(!f.isString(t))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof t);var e=u(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return e[1]=e[1]||"",e[2]=e[2]||"",e[3]=e[3]||"",{root:e[0],dir:e[0]+e[1].slice(0,-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},g.sep="/",g.delimiter=":",c?t.exports=p:t.exports=g,t.exports.posix=g,t.exports.win32=p}).call(e,n(8))},function(t,e){function n(){c&&a&&(c=!1,a.length?u=a.concat(u):f=-1,u.length&&r())}function r(){if(!c){var t=setTimeout(n);c=!0;for(var e=u.length;e;){for(a=u,u=[];++f<e;)a&&a[f].run();f=-1,e=u.length}a=null,c=!1,clearTimeout(t)}}function o(t,e){this.fun=t,this.array=e}function i(){}var a,s=t.exports={},u=[],c=!1,f=-1;s.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new o(t,e)),1!==u.length||c||setTimeout(r,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=i,s.addListener=i,s.once=i,s.off=i,s.removeListener=i,s.removeAllListeners=i,s.emit=i,s.binding=function(t){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(t){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(t,e,n){(function(t,r){function o(t,n){var r={seen:[],stylize:a};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),g(n)?r.showHidden=n:n&&e._extend(r,n),x(r.showHidden)&&(r.showHidden=!1),x(r.depth)&&(r.depth=2),x(r.colors)&&(r.colors=!1),x(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=i),u(r,t,r.depth)}function i(t,e){var n=o.styles[e];return n?"["+o.colors[n][0]+"m"+t+"["+o.colors[n][1]+"m":t}function a(t,e){return t}function s(t){var e={};return t.forEach(function(t,n){e[t]=!0}),e}function u(t,n,r){if(t.customInspect&&n&&S(n.inspect)&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var o=n.inspect(r,t);return w(o)||(o=u(t,o,r)),o}var i=c(t,n);if(i)return i;var a=Object.keys(n),g=s(a);if(t.showHidden&&(a=Object.getOwnPropertyNames(n)),O(n)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return f(n);if(0===a.length){if(S(n)){var v=n.name?": "+n.name:"";return t.stylize("[Function"+v+"]","special")}if(E(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(A(n))return t.stylize(Date.prototype.toString.call(n),"date");if(O(n))return f(n)}var y="",b=!1,m=["{","}"];if(d(n)&&(b=!0,m=["[","]"]),S(n)){var x=n.name?": "+n.name:"";y=" [Function"+x+"]"}if(E(n)&&(y=" "+RegExp.prototype.toString.call(n)),A(n)&&(y=" "+Date.prototype.toUTCString.call(n)),O(n)&&(y=" "+f(n)),0===a.length&&(!b||0==n.length))return m[0]+y+m[1];if(0>r)return E(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special");t.seen.push(n);var j;return j=b?h(t,n,r,g,a):a.map(function(e){return l(t,n,r,g,e,b)}),t.seen.pop(),p(j,y,m)}function c(t,e){if(x(e))return t.stylize("undefined","undefined");if(w(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}return b(e)?t.stylize(""+e,"number"):g(e)?t.stylize(""+e,"boolean"):v(e)?t.stylize("null","null"):void 0}function f(t){return"["+Error.prototype.toString.call(t)+"]"}function h(t,e,n,r,o){for(var i=[],a=0,s=e.length;s>a;++a)k(e,String(a))?i.push(l(t,e,n,r,String(a),!0)):i.push("");return o.forEach(function(o){o.match(/^\d+$/)||i.push(l(t,e,n,r,o,!0))}),i}function l(t,e,n,r,o,i){var a,s,c;if(c=Object.getOwnPropertyDescriptor(e,o)||{value:e[o]},c.get?s=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(s=t.stylize("[Setter]","special")),k(r,o)||(a="["+o+"]"),s||(t.seen.indexOf(c.value)<0?(s=v(n)?u(t,c.value,null):u(t,c.value,n-1),s.indexOf("\n")>-1&&(s=i?s.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+s.split("\n").map(function(t){return"   "+t}).join("\n"))):s=t.stylize("[Circular]","special")),x(a)){if(i&&o.match(/^\d+$/))return s;a=JSON.stringify(""+o),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=t.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=t.stylize(a,"string"))}return a+": "+s}function p(t,e,n){var r=0,o=t.reduce(function(t,e){return r++,e.indexOf("\n")>=0&&r++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);return o>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function d(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function v(t){return null===t}function y(t){return null==t}function b(t){return"number"==typeof t}function w(t){return"string"==typeof t}function m(t){return"symbol"==typeof t}function x(t){return void 0===t}function E(t){return j(t)&&"[object RegExp]"===P(t)}function j(t){return"object"==typeof t&&null!==t}function A(t){return j(t)&&"[object Date]"===P(t)}function O(t){return j(t)&&("[object Error]"===P(t)||t instanceof Error)}function S(t){return"function"==typeof t}function _(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function P(t){return Object.prototype.toString.call(t)}function M(t){return 10>t?"0"+t.toString(10):t.toString(10)}function T(){var t=new Date,e=[M(t.getHours()),M(t.getMinutes()),M(t.getSeconds())].join(":");return[t.getDate(),U[t.getMonth()],e].join(" ")}function k(t,e){return Object.prototype.hasOwnProperty.call(t,e)}// Copyright Joyent, Inc. and other Node contributors.
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
var B=/%[sdj%]/g;e.format=function(t){if(!w(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(o(arguments[n]));return e.join(" ")}for(var n=1,r=arguments,i=r.length,a=String(t).replace(B,function(t){if("%%"===t)return"%";if(n>=i)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return t}}),s=r[n];i>n;s=r[++n])a+=v(s)||!j(s)?" "+s:" "+o(s);return a},e.deprecate=function(n,o){function i(){if(!a){if(r.throwDeprecation)throw new Error(o);r.traceDeprecation?console.trace(o):console.error(o),a=!0}return n.apply(this,arguments)}if(x(t.process))return function(){return e.deprecate(n,o).apply(this,arguments)};if(r.noDeprecation===!0)return n;var a=!1;return i};var I,R={};e.debuglog=function(t){if(x(I)&&(I=r.env.NODE_DEBUG||""),t=t.toUpperCase(),!R[t])if(new RegExp("\\b"+t+"\\b","i").test(I)){var n=r.pid;R[t]=function(){var r=e.format.apply(e,arguments);console.error("%s %d: %s",t,n,r)}}else R[t]=function(){};return R[t]},e.inspect=o,o.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},o.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=d,e.isBoolean=g,e.isNull=v,e.isNullOrUndefined=y,e.isNumber=b,e.isString=w,e.isSymbol=m,e.isUndefined=x,e.isRegExp=E,e.isObject=j,e.isDate=A,e.isError=O,e.isFunction=S,e.isPrimitive=_,e.isBuffer=n(10);var U=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];e.log=function(){console.log("%s - %s",T(),e.format.apply(e,arguments))},e.inherits=n(11),e._extend=function(t,e){if(!e||!j(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t}}).call(e,function(){return this}(),n(8))},function(t,e){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e){"use strict";function n(t){for(var e=[],n=0;n<t.length;++n){var r=t[n].trim();if("---"===r)return e;e.push(r)}return t}function r(t){try{if(0===t.length)return{};for(var e={},n=0;n<t.length;++n){var r=JSON.parse("{"+t[n]+"}");for(var o in r)e[o]=r[o]}return e.date=e.file.substring(0,10),e}catch(i){throw new Error(t+"\n("+i+")")}}function o(t,e){e.unshift('"file": "'+t+'"');var o=n(e);return e.splice(0,o.length+1),{header:r(o),content:e}}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={extractHeader:n,parseHeader:r,parse:o}},function(t,e){"use strict";function n(t){"ngInject";function e(e,n){var r=t(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(e.values,function(t){r.type(t).pause()["delete"]()})}var n={restrict:"E",scope:{values:"="},template:"&nbsp;",link:e};return n}n.$inject=["malarkey"],Object.defineProperty(e,"__esModule",{value:!0}),e.MalarkeyDirective=n},function(t,e){"use strict";describe("controllers",function(){var t=void 0;beforeEach(angular.mock.module("xinhuangGithubCom")),beforeEach(inject(function(e){t=e("MainController")})),it("should have a title",function(){expect(t.title).toEqual(jasmine.any(String))}),it("should have taglines",function(){expect(t.taglines).toEqual(jasmine.any(Array))})})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(12),i=r(o),a=n(16);describe("blog-parser",function(){describe("extractHeader",function(){it("should return lines before 1st separator when only 1 separator",function(){var t=["key0: value0","key1: value1"],e=i["default"].extractHeader(["key0: value0","key1: value1","---"]);(0,a.expect)(e).to.be.deep.equal(t)}),it("should return lines before 1st separator when only 1 separator and trim line breaks",function(){var t=["key0: value0","key1: value1"],e=i["default"].extractHeader(["key0: value0\n","key1: value1\n","---\n"]);(0,a.expect)(e).to.be.deep.equal(t)}),it("should return all lines if no separator",function(){var t=["key0: value0","key1: value1"],e=i["default"].extractHeader(["key0: value0","key1: value1","---"]);(0,a.expect)(e).to.be.deep.equal(t)}),it("should return lines before 1st separator when 2 separators",function(){var t=["key0: value0","key1: value1"],e=i["default"].extractHeader(["key0: value0","key1: value1","---","key2: value2","---"]);(0,a.expect)(e).to.be.deep.equal(t)})}),describe("parseHeader",function(){it("should return {} for 0 lines",function(){var t=i["default"].parseHeader([]);(0,a.expect)(t).to.be.deep.equal({})}),it("should parse file name pair and get date",function(){var t=i["default"].parseHeader(['"file": "2016-01-01-a-post"']);(0,a.expect)(t).to.be.deep.equal({file:"2016-01-01-a-post",date:"2016-01-01"})}),it("should parse 2 key-value pairs",function(){var t=i["default"].parseHeader(['"file": "2016-01-01-a-post"','"key0": "value0"','"key1": "value1"']);(0,a.expect)(t).to.be.deep.equal({file:"2016-01-01-a-post",date:"2016-01-01",key0:"value0",key1:"value1"})})}),describe("parse",function(){it("should parse a blog into header & data",function(){var t=["---","post content","remaining post content"],e=i["default"].parse("2016-01-01-a-post",t);(0,a.expect)(e).to.be.deep.equal({header:{file:"2016-01-01-a-post",date:"2016-01-01"},content:["post content","remaining post content"]})})})})},function(t,e,n){t.exports=n(17)},function(t,e,n){/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
var r=[],e=t.exports={};/*!
	 * Chai version
	 */
e.version="3.5.0",/*!
	 * Assertion Error
	 */
e.AssertionError=n(18);/*!
	 * Utils for plugins (not exported)
	 */
var o=n(19);e.use=function(t){return~r.indexOf(t)||(t(this,o),r.push(t)),this},/*!
	 * Utility Functions
	 */
e.util=o;/*!
	 * Configuration
	 */
var i=n(32);e.config=i;/*!
	 * Primary `Assertion` prototype
	 */
var a=n(51);e.use(a);/*!
	 * Core Assertions
	 */
var s=n(52);e.use(s);/*!
	 * Expect interface
	 */
var u=n(53);e.use(u);/*!
	 * Should interface
	 */
var c=n(54);e.use(c);/*!
	 * Assert interface
	 */
var f=n(55);e.use(f)},function(t,e){/*!
	 * assertion-error
	 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
	 * MIT Licensed
	 */
/*!
	 * Return a function that will copy properties from
	 * one object to another excluding any originally
	 * listed. Returned function will create a new `{}`.
	 *
	 * @param {String} excluded properties ...
	 * @return {Function}
	 */
function n(){function t(t,n){Object.keys(n).forEach(function(r){~e.indexOf(r)||(t[r]=n[r])})}var e=[].slice.call(arguments);return function(){for(var e=[].slice.call(arguments),n=0,r={};n<e.length;n++)t(r,e[n]);return r}}function r(t,e,r){var o=n("name","message","stack","constructor","toJSON"),i=o(e||{});this.message=t||"Unspecified AssertionError",this.showDiff=!1;for(var a in i)this[a]=i[a];r=r||arguments.callee,r&&Error.captureStackTrace?Error.captureStackTrace(this,r):this.stack=(new Error).stack}/*!
	 * Primary Exports
	 */
t.exports=r,/*!
	 * Inherit from Error.prototype
	 */
r.prototype=Object.create(Error.prototype),/*!
	 * Statically set name
	 */
r.prototype.name="AssertionError",/*!
	 * Ensure correct constructor
	 */
r.prototype.constructor=r,r.prototype.toJSON=function(t){var e=n("constructor","toJSON","stack"),r=e({name:this.name},this);return!1!==t&&this.stack&&(r.stack=this.stack),r}},function(t,e,n){/*!
	 * chai
	 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
/*!
	 * Main exports
	 */
var e=t.exports={};/*!
	 * test utility
	 */
e.test=n(20),/*!
	 * type utility
	 */
e.type=n(22),/*!
	 * expectTypes utility
	 */
e.expectTypes=n(24),/*!
	 * message utility
	 */
e.getMessage=n(25),/*!
	 * actual utility
	 */
e.getActual=n(26),/*!
	 * Inspect util
	 */
e.inspect=n(27),/*!
	 * Object Display util
	 */
e.objDisplay=n(31),/*!
	 * Flag utility
	 */
e.flag=n(21),/*!
	 * Flag transferring utility
	 */
e.transferFlags=n(33),/*!
	 * Deep equal utility
	 */
e.eql=n(34),/*!
	 * Deep path value
	 */
e.getPathValue=n(42),/*!
	 * Deep path info
	 */
e.getPathInfo=n(43),/*!
	 * Check if a property exists
	 */
e.hasProperty=n(44),/*!
	 * Function name
	 */
e.getName=n(28),/*!
	 * add Property
	 */
e.addProperty=n(45),/*!
	 * add Method
	 */
e.addMethod=n(46),/*!
	 * overwrite Property
	 */
e.overwriteProperty=n(47),/*!
	 * overwrite Method
	 */
e.overwriteMethod=n(48),/*!
	 * Add a chainable method
	 */
e.addChainableMethod=n(49),/*!
	 * Overwrite chainable method
	 */
e.overwriteChainableMethod=n(50)},function(t,e,n){/*!
	 * Chai - test utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
/*!
	 * Module dependancies
	 */
var r=n(21);t.exports=function(t,e){var n=r(t,"negate"),o=e[0];return n?!o:o}},function(t,e){/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e,n){var r=t.__flags||(t.__flags=Object.create(null));return 3!==arguments.length?r[e]:void(r[e]=n)}},function(t,e,n){t.exports=n(23)},function(t,e){function n(t){var e=Object.prototype.toString.call(t).match(o)[1].toLowerCase();return"function"==typeof Promise&&t instanceof Promise?"promise":null===t?"null":void 0===t?"undefined":e}function r(){return this instanceof r?void(this.tests={}):new r}/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
/*!
	 * Primary Exports
	 */
var e=t.exports=n,o=/^\[object (.*)\]$/;e.Library=r,r.prototype.of=n,r.prototype.define=function(t,e){return 1===arguments.length?this.tests[t]:(this.tests[t]=e,this)},r.prototype.test=function(t,e){if(e===n(t))return!0;var r=this.tests[e];if(r&&"regexp"===n(r))return r.test(t);if(r&&"function"===n(r))return r(t);throw new ReferenceError('Type test "'+e+'" not defined or invalid.')}},function(t,e,n){/*!
	 * Chai - expectTypes utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
var r=n(18),o=n(21),i=n(22);t.exports=function(t,e){var t=o(t,"object");e=e.map(function(t){return t.toLowerCase()}),e.sort();var n=e.map(function(t,n){var r=~["a","e","i","o","u"].indexOf(t.charAt(0))?"an":"a",o=e.length>1&&n===e.length-1?"or ":"";return o+r+" "+t}).join(", ");if(!e.some(function(e){return i(t)===e}))throw new r("object tested must be "+n+", but "+i(t)+" given")}},function(t,e,n){/*!
	 * Chai - message composition utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
/*!
	 * Module dependancies
	 */
var r=n(21),o=n(26),i=(n(27),n(31));t.exports=function(t,e){var n=r(t,"negate"),a=r(t,"object"),s=e[3],u=o(t,e),c=n?e[2]:e[1],f=r(t,"message");return"function"==typeof c&&(c=c()),c=c||"",c=c.replace(/#\{this\}/g,function(){return i(a)}).replace(/#\{act\}/g,function(){return i(u)}).replace(/#\{exp\}/g,function(){return i(s)}),f?f+": "+c:c}},function(t,e){/*!
	 * Chai - getActual utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e){return e.length>4?e[4]:t._obj}},function(t,e,n){function r(t,e,n,r){var i={showHidden:e,seen:[],stylize:function(t){return t}};return o(i,t,"undefined"==typeof n?2:n)}function o(t,n,r){if(n&&"function"==typeof n.inspect&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var d=n.inspect(r);return"string"!=typeof d&&(d=o(t,d,r)),d}var w=i(t,n);if(w)return w;if(b(n)){if("outerHTML"in n)return n.outerHTML;try{if(document.xmlVersion){var m=new XMLSerializer;return m.serializeToString(n)}var x="http://www.w3.org/1999/xhtml",E=document.createElementNS(x,"_");return E.appendChild(n.cloneNode(!1)),html=E.innerHTML.replace("><",">"+n.innerHTML+"<"),E.innerHTML="",html}catch(j){}}var A=y(n),O=t.showHidden?v(n):A;if(0===O.length||p(n)&&(1===O.length&&"stack"===O[0]||2===O.length&&"description"===O[0]&&"stack"===O[1])){if("function"==typeof n){var S=g(n),_=S?": "+S:"";return t.stylize("[Function"+_+"]","special")}if(h(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(l(n))return t.stylize(Date.prototype.toUTCString.call(n),"date");if(p(n))return a(n)}var P="",M=!1,T=["{","}"];if(f(n)&&(M=!0,T=["[","]"]),"function"==typeof n){var S=g(n),_=S?": "+S:"";P=" [Function"+_+"]"}if(h(n)&&(P=" "+RegExp.prototype.toString.call(n)),l(n)&&(P=" "+Date.prototype.toUTCString.call(n)),p(n))return a(n);if(0===O.length&&(!M||0==n.length))return T[0]+P+T[1];if(0>r)return h(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special");t.seen.push(n);var k;return k=M?s(t,n,r,A,O):O.map(function(e){return u(t,n,r,A,e,M)}),t.seen.pop(),c(k,P,T)}function i(t,e){switch(typeof e){case"undefined":return t.stylize("undefined","undefined");case"string":var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string");case"number":return 0===e&&1/e===-(1/0)?t.stylize("-0","number"):t.stylize(""+e,"number");case"boolean":return t.stylize(""+e,"boolean")}return null===e?t.stylize("null","null"):void 0}function a(t){return"["+Error.prototype.toString.call(t)+"]"}function s(t,e,n,r,o){for(var i=[],a=0,s=e.length;s>a;++a)Object.prototype.hasOwnProperty.call(e,String(a))?i.push(u(t,e,n,r,String(a),!0)):i.push("");return o.forEach(function(o){o.match(/^\d+$/)||i.push(u(t,e,n,r,o,!0))}),i}function u(t,e,n,r,i,a){var s,u;if(e.__lookupGetter__&&(e.__lookupGetter__(i)?u=e.__lookupSetter__(i)?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):e.__lookupSetter__(i)&&(u=t.stylize("[Setter]","special"))),r.indexOf(i)<0&&(s="["+i+"]"),u||(t.seen.indexOf(e[i])<0?(u=null===n?o(t,e[i],null):o(t,e[i],n-1),u.indexOf("\n")>-1&&(u=a?u.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+u.split("\n").map(function(t){return"   "+t}).join("\n"))):u=t.stylize("[Circular]","special")),"undefined"==typeof s){if(a&&i.match(/^\d+$/))return u;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+u}function c(t,e,n){var r=0,o=t.reduce(function(t,e){return r++,e.indexOf("\n")>=0&&r++,t+e.length+1},0);return o>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function f(t){return Array.isArray(t)||"object"==typeof t&&"[object Array]"===d(t)}function h(t){return"object"==typeof t&&"[object RegExp]"===d(t)}function l(t){return"object"==typeof t&&"[object Date]"===d(t)}function p(t){return"object"==typeof t&&"[object Error]"===d(t)}function d(t){return Object.prototype.toString.call(t)}var g=n(28),v=n(29),y=n(30);t.exports=r;var b=function(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName}},function(t,e){/*!
	 * Chai - getName utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t){if(t.name)return t.name;var e=/^\s?function ([^(]*)\(/.exec(t);return e&&e[1]?e[1]:""}},function(t,e){/*!
	 * Chai - getProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t){function e(t){-1===n.indexOf(t)&&n.push(t)}for(var n=Object.getOwnPropertyNames(t),r=Object.getPrototypeOf(t);null!==r;)Object.getOwnPropertyNames(r).forEach(e),r=Object.getPrototypeOf(r);return n}},function(t,e){/*!
	 * Chai - getEnumerableProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t){var e=[];for(var n in t)e.push(n);return e}},function(t,e,n){/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
/*!
	 * Module dependancies
	 */
var r=n(27),o=n(32);t.exports=function(t){var e=r(t),n=Object.prototype.toString.call(t);if(o.truncateThreshold&&e.length>=o.truncateThreshold){if("[object Function]"===n)return t.name&&""!==t.name?"[Function: "+t.name+"]":"[Function]";if("[object Array]"===n)return"[ Array("+t.length+") ]";if("[object Object]"===n){var i=Object.keys(t),a=i.length>2?i.splice(0,2).join(", ")+", ...":i.join(", ");return"{ Object ("+a+") }"}return e}return e}},function(t,e){t.exports={includeStack:!1,showDiff:!0,truncateThreshold:40}},function(t,e){/*!
	 * Chai - transferFlags utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e,n){var r=t.__flags||(t.__flags=Object.create(null));e.__flags||(e.__flags=Object.create(null)),n=3===arguments.length?n:!0;for(var o in r)(n||"object"!==o&&"ssfi"!==o&&"message"!=o)&&(e.__flags[o]=r[o])}},function(t,e,n){t.exports=n(35)},function(t,e,n){function r(t,e,n){return o(t,e)?!0:"date"===g(t)?a(t,e):"regexp"===g(t)?s(t,e):d.isBuffer(t)?h(t,e):"arguments"===g(t)?u(t,e,n):i(t,e)?"object"!==g(t)&&"object"!==g(e)&&"array"!==g(t)&&"array"!==g(e)?o(t,e):p(t,e,n):!1}/*!
	 * Strict (egal) equality test. Ensures that NaN always
	 * equals NaN and `-0` does not equal `+0`.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} equal match
	 */
function o(t,e){return t===e?0!==t||1/t===1/e:t!==t&&e!==e}/*!
	 * Compare the types of two given objects and
	 * return if they are equal. Note that an Array
	 * has a type of `array` (not `object`) and arguments
	 * have a type of `arguments` (not `array`/`object`).
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
function i(t,e){return g(t)===g(e)}/*!
	 * Compare two Date objects by asserting that
	 * the time values are equal using `saveValue`.
	 *
	 * @param {Date} a
	 * @param {Date} b
	 * @return {Boolean} result
	 */
function a(t,e){return"date"!==g(e)?!1:o(t.getTime(),e.getTime())}/*!
	 * Compare two regular expressions by converting them
	 * to string and checking for `sameValue`.
	 *
	 * @param {RegExp} a
	 * @param {RegExp} b
	 * @return {Boolean} result
	 */
function s(t,e){return"regexp"!==g(e)?!1:o(t.toString(),e.toString())}/*!
	 * Assert deep equality of two `arguments` objects.
	 * Unfortunately, these must be sliced to arrays
	 * prior to test to ensure no bad behavior.
	 *
	 * @param {Arguments} a
	 * @param {Arguments} b
	 * @param {Array} memoize (optional)
	 * @return {Boolean} result
	 */
function u(t,e,n){return"arguments"!==g(e)?!1:(t=[].slice.call(t),e=[].slice.call(e),r(t,e,n))}/*!
	 * Get enumerable properties of a given object.
	 *
	 * @param {Object} a
	 * @return {Array} property names
	 */
function c(t){var e=[];for(var n in t)e.push(n);return e}/*!
	 * Simple equality for flat iterable objects
	 * such as Arrays or Node.js buffers.
	 *
	 * @param {Iterable} a
	 * @param {Iterable} b
	 * @return {Boolean} result
	 */
function f(t,e){if(t.length!==e.length)return!1;for(var n=0,r=!0;n<t.length;n++)if(t[n]!==e[n]){r=!1;break}return r}/*!
	 * Extension to `iterableEqual` specifically
	 * for Node.js Buffers.
	 *
	 * @param {Buffer} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
function h(t,e){return d.isBuffer(e)?f(t,e):!1}/*!
	 * Block for `objectEqual` ensuring non-existing
	 * values don't get in.
	 *
	 * @param {Mixed} object
	 * @return {Boolean} result
	 */
function l(t){return null!==t&&void 0!==t}/*!
	 * Recursively check the equality of two objects.
	 * Once basic sameness has been established it will
	 * defer to `deepEqual` for each enumerable key
	 * in the object.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
function p(t,e,n){if(!l(t)||!l(e))return!1;if(t.prototype!==e.prototype)return!1;var o;if(n){for(o=0;o<n.length;o++)if(n[o][0]===t&&n[o][1]===e||n[o][0]===e&&n[o][1]===t)return!0}else n=[];try{var i=c(t),a=c(e)}catch(s){return!1}if(i.sort(),a.sort(),!f(i,a))return!1;n.push([t,e]);var u;for(o=i.length-1;o>=0;o--)if(u=i[o],!r(t[u],e[u],n))return!1;return!0}/*!
	 * deep-eql
	 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
/*!
	 * Module dependencies
	 */
var d,g=n(36);try{d=n(38).Buffer}catch(v){d={},d.isBuffer=function(){return!1}}/*!
	 * Primary Export
	 */
t.exports=r},function(t,e,n){t.exports=n(37)},function(t,e){function n(t){var e=Object.prototype.toString.call(t);return o[e]?o[e]:null===t?"null":void 0===t?"undefined":t===Object(t)?"object":typeof t}function r(){this.tests={}}/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
/*!
	 * Primary Exports
	 */
var e=t.exports=n,o={"[object Array]":"array","[object RegExp]":"regexp","[object Function]":"function","[object Arguments]":"arguments","[object Date]":"date"};e.Library=r,r.prototype.of=n,r.prototype.define=function(t,e){return 1===arguments.length?this.tests[t]:(this.tests[t]=e,this)},r.prototype.test=function(t,e){if(e===n(t))return!0;var r=this.tests[e];if(r&&"regexp"===n(r))return r.test(t);if(r&&"function"===n(r))return r(t);throw new ReferenceError('Type test "'+e+'" not defined or invalid.')}},function(t,e,n){(function(t,r){/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
"use strict";function o(){function t(){}try{var e=new Uint8Array(1);return e.foo=function(){return 42},e.constructor=t,42===e.foo()&&e.constructor===t&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(n){return!1}}function i(){return t.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function t(e){return this instanceof t?(t.TYPED_ARRAY_SUPPORT||(this.length=0,this.parent=void 0),"number"==typeof e?a(this,e):"string"==typeof e?s(this,e,arguments.length>1?arguments[1]:"utf8"):u(this,e)):arguments.length>1?new t(e,arguments[1]):new t(e)}function a(e,n){if(e=g(e,0>n?0:0|v(n)),!t.TYPED_ARRAY_SUPPORT)for(var r=0;n>r;r++)e[r]=0;return e}function s(t,e,n){("string"!=typeof n||""===n)&&(n="utf8");var r=0|b(e,n);return t=g(t,r),t.write(e,n),t}function u(e,n){if(t.isBuffer(n))return c(e,n);if(X(n))return f(e,n);if(null==n)throw new TypeError("must start with number, buffer, array or string");if("undefined"!=typeof ArrayBuffer){if(n.buffer instanceof ArrayBuffer)return h(e,n);if(n instanceof ArrayBuffer)return l(e,n)}return n.length?p(e,n):d(e,n)}function c(t,e){var n=0|v(e.length);return t=g(t,n),e.copy(t,0,0,n),t}function f(t,e){var n=0|v(e.length);t=g(t,n);for(var r=0;n>r;r+=1)t[r]=255&e[r];return t}function h(t,e){var n=0|v(e.length);t=g(t,n);for(var r=0;n>r;r+=1)t[r]=255&e[r];return t}function l(e,n){return t.TYPED_ARRAY_SUPPORT?(n.byteLength,e=t._augment(new Uint8Array(n))):e=h(e,new Uint8Array(n)),e}function p(t,e){var n=0|v(e.length);t=g(t,n);for(var r=0;n>r;r+=1)t[r]=255&e[r];return t}function d(t,e){var n,r=0;"Buffer"===e.type&&X(e.data)&&(n=e.data,r=0|v(n.length)),t=g(t,r);for(var o=0;r>o;o+=1)t[o]=255&n[o];return t}function g(e,n){t.TYPED_ARRAY_SUPPORT?(e=t._augment(new Uint8Array(n)),e.__proto__=t.prototype):(e.length=n,e._isBuffer=!0);var r=0!==n&&n<=t.poolSize>>>1;return r&&(e.parent=K),e}function v(t){if(t>=i())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i().toString(16)+" bytes");return 0|t}function y(e,n){if(!(this instanceof y))return new y(e,n);var r=new t(e,n);return delete r.parent,r}function b(t,e){"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var r=!1;;)switch(e){case"ascii":case"binary":case"raw":case"raws":return n;case"utf8":case"utf-8":return F(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return J(t).length;default:if(r)return F(t).length;e=(""+e).toLowerCase(),r=!0}}function w(t,e,n){var r=!1;if(e=0|e,n=void 0===n||n===1/0?this.length:0|n,t||(t="utf8"),0>e&&(e=0),n>this.length&&(n=this.length),e>=n)return"";for(;;)switch(t){case"hex":return k(this,e,n);case"utf8":case"utf-8":return _(this,e,n);case"ascii":return M(this,e,n);case"binary":return T(this,e,n);case"base64":return S(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return B(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}function m(t,e,n,r){n=Number(n)||0;var o=t.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;var i=e.length;if(i%2!==0)throw new Error("Invalid hex string");r>i/2&&(r=i/2);for(var a=0;r>a;a++){var s=parseInt(e.substr(2*a,2),16);if(isNaN(s))throw new Error("Invalid hex string");t[n+a]=s}return a}function x(t,e,n,r){return G(F(e,t.length-n),t,n,r)}function E(t,e,n,r){return G($(e),t,n,r)}function j(t,e,n,r){return E(t,e,n,r)}function A(t,e,n,r){return G(J(e),t,n,r)}function O(t,e,n,r){return G(H(e,t.length-n),t,n,r)}function S(t,e,n){return 0===e&&n===t.length?Z.fromByteArray(t):Z.fromByteArray(t.slice(e,n))}function _(t,e,n){n=Math.min(t.length,n);for(var r=[],o=e;n>o;){var i=t[o],a=null,s=i>239?4:i>223?3:i>191?2:1;if(n>=o+s){var u,c,f,h;switch(s){case 1:128>i&&(a=i);break;case 2:u=t[o+1],128===(192&u)&&(h=(31&i)<<6|63&u,h>127&&(a=h));break;case 3:u=t[o+1],c=t[o+2],128===(192&u)&&128===(192&c)&&(h=(15&i)<<12|(63&u)<<6|63&c,h>2047&&(55296>h||h>57343)&&(a=h));break;case 4:u=t[o+1],c=t[o+2],f=t[o+3],128===(192&u)&&128===(192&c)&&128===(192&f)&&(h=(15&i)<<18|(63&u)<<12|(63&c)<<6|63&f,h>65535&&1114112>h&&(a=h))}}null===a?(a=65533,s=1):a>65535&&(a-=65536,r.push(a>>>10&1023|55296),a=56320|1023&a),r.push(a),o+=s}return P(r)}function P(t){var e=t.length;if(Q>=e)return String.fromCharCode.apply(String,t);for(var n="",r=0;e>r;)n+=String.fromCharCode.apply(String,t.slice(r,r+=Q));return n}function M(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;n>o;o++)r+=String.fromCharCode(127&t[o]);return r}function T(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;n>o;o++)r+=String.fromCharCode(t[o]);return r}function k(t,e,n){var r=t.length;(!e||0>e)&&(e=0),(!n||0>n||n>r)&&(n=r);for(var o="",i=e;n>i;i++)o+=Y(t[i]);return o}function B(t,e,n){for(var r=t.slice(e,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(t,e,n){if(t%1!==0||0>t)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function R(e,n,r,o,i,a){if(!t.isBuffer(e))throw new TypeError("buffer must be a Buffer instance");if(n>i||a>n)throw new RangeError("value is out of bounds");if(r+o>e.length)throw new RangeError("index out of range")}function U(t,e,n,r){0>e&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-n,2);i>o;o++)t[n+o]=(e&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function L(t,e,n,r){0>e&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-n,4);i>o;o++)t[n+o]=e>>>8*(r?o:3-o)&255}function C(t,e,n,r,o,i){if(e>o||i>e)throw new RangeError("value is out of bounds");if(n+r>t.length)throw new RangeError("index out of range");if(0>n)throw new RangeError("index out of range")}function N(t,e,n,r,o){return o||C(t,e,n,4,3.4028234663852886e38,-3.4028234663852886e38),V.write(t,e,n,r,23,4),n+4}function D(t,e,n,r,o){return o||C(t,e,n,8,1.7976931348623157e308,-1.7976931348623157e308),V.write(t,e,n,r,52,8),n+8}function z(t){if(t=q(t).replace(tt,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function q(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function Y(t){return 16>t?"0"+t.toString(16):t.toString(16)}function F(t,e){e=e||1/0;for(var n,r=t.length,o=null,i=[],a=0;r>a;a++){if(n=t.charCodeAt(a),n>55295&&57344>n){if(!o){if(n>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(a+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(56320>n){(e-=3)>-1&&i.push(239,191,189),o=n;continue}n=(o-55296<<10|n-56320)+65536}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,128>n){if((e-=1)<0)break;i.push(n)}else if(2048>n){if((e-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(65536>n){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(1114112>n))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function $(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e}function H(t,e){for(var n,r,o,i=[],a=0;a<t.length&&!((e-=2)<0);a++)n=t.charCodeAt(a),r=n>>8,o=n%256,i.push(o),i.push(r);return i}function J(t){return Z.toByteArray(z(t))}function G(t,e,n,r){for(var o=0;r>o&&!(o+n>=e.length||o>=t.length);o++)e[o+n]=t[o];return o}var Z=n(39),V=n(40),X=n(41);e.Buffer=t,e.SlowBuffer=y,e.INSPECT_MAX_BYTES=50,t.poolSize=8192;var K={};t.TYPED_ARRAY_SUPPORT=void 0!==r.TYPED_ARRAY_SUPPORT?r.TYPED_ARRAY_SUPPORT:o(),t.TYPED_ARRAY_SUPPORT?(t.prototype.__proto__=Uint8Array.prototype,t.__proto__=Uint8Array):(t.prototype.length=void 0,t.prototype.parent=void 0),t.isBuffer=function(t){return!(null==t||!t._isBuffer)},t.compare=function(e,n){if(!t.isBuffer(e)||!t.isBuffer(n))throw new TypeError("Arguments must be Buffers");if(e===n)return 0;for(var r=e.length,o=n.length,i=0,a=Math.min(r,o);a>i&&e[i]===n[i];)++i;return i!==a&&(r=e[i],o=n[i]),o>r?-1:r>o?1:0},t.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},t.concat=function(e,n){if(!X(e))throw new TypeError("list argument must be an Array of Buffers.");if(0===e.length)return new t(0);var r;if(void 0===n)for(n=0,r=0;r<e.length;r++)n+=e[r].length;var o=new t(n),i=0;for(r=0;r<e.length;r++){var a=e[r];a.copy(o,i),i+=a.length}return o},t.byteLength=b,t.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?_(this,0,t):w.apply(this,arguments)},t.prototype.equals=function(e){if(!t.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:0===t.compare(this,e)},t.prototype.inspect=function(){var t="",n=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(t+=" ... ")),"<Buffer "+t+">"},t.prototype.compare=function(e){if(!t.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?0:t.compare(this,e)},t.prototype.indexOf=function(e,n){function r(t,e,n){for(var r=-1,o=0;n+o<t.length;o++)if(t[n+o]===e[-1===r?0:o-r]){if(-1===r&&(r=o),o-r+1===e.length)return n+r}else r=-1;return-1}if(n>2147483647?n=2147483647:-2147483648>n&&(n=-2147483648),n>>=0,0===this.length)return-1;if(n>=this.length)return-1;if(0>n&&(n=Math.max(this.length+n,0)),"string"==typeof e)return 0===e.length?-1:String.prototype.indexOf.call(this,e,n);if(t.isBuffer(e))return r(this,e,n);if("number"==typeof e)return t.TYPED_ARRAY_SUPPORT&&"function"===Uint8Array.prototype.indexOf?Uint8Array.prototype.indexOf.call(this,e,n):r(this,[e],n);throw new TypeError("val must be string, number or Buffer")},t.prototype.get=function(t){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(t)},t.prototype.set=function(t,e){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(t,e)},t.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else if(isFinite(e))e=0|e,isFinite(n)?(n=0|n,void 0===r&&(r="utf8")):(r=n,n=void 0);else{var o=r;r=e,e=0|n,n=o}var i=this.length-e;if((void 0===n||n>i)&&(n=i),t.length>0&&(0>n||0>e)||e>this.length)throw new RangeError("attempt to write outside buffer bounds");r||(r="utf8");for(var a=!1;;)switch(r){case"hex":return m(this,t,e,n);case"utf8":case"utf-8":return x(this,t,e,n);case"ascii":return E(this,t,e,n);case"binary":return j(this,t,e,n);case"base64":return A(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return O(this,t,e,n);default:if(a)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),a=!0}},t.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var Q=4096;t.prototype.slice=function(e,n){var r=this.length;e=~~e,n=void 0===n?r:~~n,0>e?(e+=r,0>e&&(e=0)):e>r&&(e=r),0>n?(n+=r,0>n&&(n=0)):n>r&&(n=r),e>n&&(n=e);var o;if(t.TYPED_ARRAY_SUPPORT)o=t._augment(this.subarray(e,n));else{var i=n-e;o=new t(i,void 0);for(var a=0;i>a;a++)o[a]=this[a+e]}return o.length&&(o.parent=this.parent||this),o},t.prototype.readUIntLE=function(t,e,n){t=0|t,e=0|e,n||I(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return r},t.prototype.readUIntBE=function(t,e,n){t=0|t,e=0|e,n||I(t,e,this.length);for(var r=this[t+--e],o=1;e>0&&(o*=256);)r+=this[t+--e]*o;return r},t.prototype.readUInt8=function(t,e){return e||I(t,1,this.length),this[t]},t.prototype.readUInt16LE=function(t,e){return e||I(t,2,this.length),this[t]|this[t+1]<<8},t.prototype.readUInt16BE=function(t,e){return e||I(t,2,this.length),this[t]<<8|this[t+1]},t.prototype.readUInt32LE=function(t,e){return e||I(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},t.prototype.readUInt32BE=function(t,e){return e||I(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},t.prototype.readIntLE=function(t,e,n){t=0|t,e=0|e,n||I(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return o*=128,r>=o&&(r-=Math.pow(2,8*e)),r},t.prototype.readIntBE=function(t,e,n){t=0|t,e=0|e,n||I(t,e,this.length);for(var r=e,o=1,i=this[t+--r];r>0&&(o*=256);)i+=this[t+--r]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i},t.prototype.readInt8=function(t,e){return e||I(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},t.prototype.readInt16LE=function(t,e){e||I(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},t.prototype.readInt16BE=function(t,e){e||I(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},t.prototype.readInt32LE=function(t,e){return e||I(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},t.prototype.readInt32BE=function(t,e){return e||I(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},t.prototype.readFloatLE=function(t,e){return e||I(t,4,this.length),V.read(this,t,!0,23,4)},t.prototype.readFloatBE=function(t,e){return e||I(t,4,this.length),V.read(this,t,!1,23,4)},t.prototype.readDoubleLE=function(t,e){return e||I(t,8,this.length),V.read(this,t,!0,52,8)},t.prototype.readDoubleBE=function(t,e){return e||I(t,8,this.length),V.read(this,t,!1,52,8)},t.prototype.writeUIntLE=function(t,e,n,r){t=+t,e=0|e,n=0|n,r||R(this,t,e,n,Math.pow(2,8*n),0);var o=1,i=0;for(this[e]=255&t;++i<n&&(o*=256);)this[e+i]=t/o&255;return e+n},t.prototype.writeUIntBE=function(t,e,n,r){t=+t,e=0|e,n=0|n,r||R(this,t,e,n,Math.pow(2,8*n),0);var o=n-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i&255;return e+n},t.prototype.writeUInt8=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,1,255,0),t.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[n]=255&e,n+1},t.prototype.writeUInt16LE=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,2,65535,0),t.TYPED_ARRAY_SUPPORT?(this[n]=255&e,this[n+1]=e>>>8):U(this,e,n,!0),n+2},t.prototype.writeUInt16BE=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,2,65535,0),t.TYPED_ARRAY_SUPPORT?(this[n]=e>>>8,this[n+1]=255&e):U(this,e,n,!1),n+2},t.prototype.writeUInt32LE=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,4,4294967295,0),t.TYPED_ARRAY_SUPPORT?(this[n+3]=e>>>24,this[n+2]=e>>>16,this[n+1]=e>>>8,this[n]=255&e):L(this,e,n,!0),n+4},t.prototype.writeUInt32BE=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,4,4294967295,0),t.TYPED_ARRAY_SUPPORT?(this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=255&e):L(this,e,n,!1),n+4},t.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e=0|e,!r){var o=Math.pow(2,8*n-1);R(this,t,e,n,o-1,-o)}var i=0,a=1,s=0>t?1:0;for(this[e]=255&t;++i<n&&(a*=256);)this[e+i]=(t/a>>0)-s&255;return e+n},t.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e=0|e,!r){var o=Math.pow(2,8*n-1);R(this,t,e,n,o-1,-o)}var i=n-1,a=1,s=0>t?1:0;for(this[e+i]=255&t;--i>=0&&(a*=256);)this[e+i]=(t/a>>0)-s&255;return e+n},t.prototype.writeInt8=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,1,127,-128),t.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),0>e&&(e=255+e+1),this[n]=255&e,n+1},t.prototype.writeInt16LE=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,2,32767,-32768),t.TYPED_ARRAY_SUPPORT?(this[n]=255&e,this[n+1]=e>>>8):U(this,e,n,!0),n+2},t.prototype.writeInt16BE=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,2,32767,-32768),t.TYPED_ARRAY_SUPPORT?(this[n]=e>>>8,this[n+1]=255&e):U(this,e,n,!1),n+2},t.prototype.writeInt32LE=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,4,2147483647,-2147483648),t.TYPED_ARRAY_SUPPORT?(this[n]=255&e,this[n+1]=e>>>8,this[n+2]=e>>>16,this[n+3]=e>>>24):L(this,e,n,!0),n+4},t.prototype.writeInt32BE=function(e,n,r){return e=+e,n=0|n,r||R(this,e,n,4,2147483647,-2147483648),0>e&&(e=4294967295+e+1),t.TYPED_ARRAY_SUPPORT?(this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=255&e):L(this,e,n,!1),n+4},t.prototype.writeFloatLE=function(t,e,n){return N(this,t,e,!0,n)},t.prototype.writeFloatBE=function(t,e,n){return N(this,t,e,!1,n)},t.prototype.writeDoubleLE=function(t,e,n){return D(this,t,e,!0,n)},t.prototype.writeDoubleBE=function(t,e,n){return D(this,t,e,!1,n)},t.prototype.copy=function(e,n,r,o){if(r||(r=0),o||0===o||(o=this.length),n>=e.length&&(n=e.length),n||(n=0),o>0&&r>o&&(o=r),o===r)return 0;if(0===e.length||0===this.length)return 0;if(0>n)throw new RangeError("targetStart out of bounds");if(0>r||r>=this.length)throw new RangeError("sourceStart out of bounds");if(0>o)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),e.length-n<o-r&&(o=e.length-n+r);var i,a=o-r;if(this===e&&n>r&&o>n)for(i=a-1;i>=0;i--)e[i+n]=this[i+r];else if(1e3>a||!t.TYPED_ARRAY_SUPPORT)for(i=0;a>i;i++)e[i+n]=this[i+r];else e._set(this.subarray(r,r+a),n);return a},t.prototype.fill=function(t,e,n){if(t||(t=0),e||(e=0),n||(n=this.length),e>n)throw new RangeError("end < start");if(n!==e&&0!==this.length){if(0>e||e>=this.length)throw new RangeError("start out of bounds");if(0>n||n>this.length)throw new RangeError("end out of bounds");var r;if("number"==typeof t)for(r=e;n>r;r++)this[r]=t;else{var o=F(t.toString()),i=o.length;for(r=e;n>r;r++)this[r]=o[r%i]}return this}},t.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(t.TYPED_ARRAY_SUPPORT)return new t(this).buffer;for(var e=new Uint8Array(this.length),n=0,r=e.length;r>n;n+=1)e[n]=this[n];return e.buffer}throw new TypeError("Buffer.toArrayBuffer not supported in this browser")};var W=t.prototype;t._augment=function(e){return e.constructor=t,e._isBuffer=!0,e._set=e.set,e.get=W.get,e.set=W.set,e.write=W.write,e.toString=W.toString,e.toLocaleString=W.toString,e.toJSON=W.toJSON,e.equals=W.equals,e.compare=W.compare,e.indexOf=W.indexOf,e.copy=W.copy,e.slice=W.slice,e.readUIntLE=W.readUIntLE,e.readUIntBE=W.readUIntBE,e.readUInt8=W.readUInt8,e.readUInt16LE=W.readUInt16LE,e.readUInt16BE=W.readUInt16BE,e.readUInt32LE=W.readUInt32LE,e.readUInt32BE=W.readUInt32BE,e.readIntLE=W.readIntLE,e.readIntBE=W.readIntBE,e.readInt8=W.readInt8,e.readInt16LE=W.readInt16LE,e.readInt16BE=W.readInt16BE,e.readInt32LE=W.readInt32LE,e.readInt32BE=W.readInt32BE,e.readFloatLE=W.readFloatLE,e.readFloatBE=W.readFloatBE,e.readDoubleLE=W.readDoubleLE,e.readDoubleBE=W.readDoubleBE,e.writeUInt8=W.writeUInt8,e.writeUIntLE=W.writeUIntLE,e.writeUIntBE=W.writeUIntBE,e.writeUInt16LE=W.writeUInt16LE,e.writeUInt16BE=W.writeUInt16BE,e.writeUInt32LE=W.writeUInt32LE,e.writeUInt32BE=W.writeUInt32BE,e.writeIntLE=W.writeIntLE,e.writeIntBE=W.writeIntBE,e.writeInt8=W.writeInt8,e.writeInt16LE=W.writeInt16LE,e.writeInt16BE=W.writeInt16BE,e.writeInt32LE=W.writeInt32LE,e.writeInt32BE=W.writeInt32BE,e.writeFloatLE=W.writeFloatLE,e.writeFloatBE=W.writeFloatBE,e.writeDoubleLE=W.writeDoubleLE,e.writeDoubleBE=W.writeDoubleBE,e.fill=W.fill,e.inspect=W.inspect,e.toArrayBuffer=W.toArrayBuffer,e};var tt=/[^+\/0-9A-Za-z-_]/g}).call(e,n(38).Buffer,function(){return this}())},function(t,e,n){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(t){"use strict";function e(t){var e=t.charCodeAt(0);return e===a||e===h?62:e===s||e===l?63:u>e?-1:u+10>e?e-u+26+26:f+26>e?e-f:c+26>e?e-c+26:void 0}function n(t){function n(t){c[h++]=t}var r,o,a,s,u,c;if(t.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var f=t.length;u="="===t.charAt(f-2)?2:"="===t.charAt(f-1)?1:0,c=new i(3*t.length/4-u),a=u>0?t.length-4:t.length;var h=0;for(r=0,o=0;a>r;r+=4,o+=3)s=e(t.charAt(r))<<18|e(t.charAt(r+1))<<12|e(t.charAt(r+2))<<6|e(t.charAt(r+3)),n((16711680&s)>>16),n((65280&s)>>8),n(255&s);return 2===u?(s=e(t.charAt(r))<<2|e(t.charAt(r+1))>>4,n(255&s)):1===u&&(s=e(t.charAt(r))<<10|e(t.charAt(r+1))<<4|e(t.charAt(r+2))>>2,n(s>>8&255),n(255&s)),c}function o(t){function e(t){return r.charAt(t)}function n(t){return e(t>>18&63)+e(t>>12&63)+e(t>>6&63)+e(63&t)}var o,i,a,s=t.length%3,u="";for(o=0,a=t.length-s;a>o;o+=3)i=(t[o]<<16)+(t[o+1]<<8)+t[o+2],u+=n(i);switch(s){case 1:i=t[t.length-1],u+=e(i>>2),u+=e(i<<4&63),u+="==";break;case 2:i=(t[t.length-2]<<8)+t[t.length-1],u+=e(i>>10),u+=e(i>>4&63),u+=e(i<<2&63),u+="="}return u}var i="undefined"!=typeof Uint8Array?Uint8Array:Array,a="+".charCodeAt(0),s="/".charCodeAt(0),u="0".charCodeAt(0),c="a".charCodeAt(0),f="A".charCodeAt(0),h="-".charCodeAt(0),l="_".charCodeAt(0);t.toByteArray=n,t.fromByteArray=o}(e)},function(t,e){e.read=function(t,e,n,r,o){var i,a,s=8*o-r-1,u=(1<<s)-1,c=u>>1,f=-7,h=n?o-1:0,l=n?-1:1,p=t[e+h];for(h+=l,i=p&(1<<-f)-1,p>>=-f,f+=s;f>0;i=256*i+t[e+h],h+=l,f-=8);for(a=i&(1<<-f)-1,i>>=-f,f+=r;f>0;a=256*a+t[e+h],h+=l,f-=8);if(0===i)i=1-c;else{if(i===u)return a?NaN:(p?-1:1)*(1/0);a+=Math.pow(2,r),i-=c}return(p?-1:1)*a*Math.pow(2,i-r)},e.write=function(t,e,n,r,o,i){var a,s,u,c=8*i-o-1,f=(1<<c)-1,h=f>>1,l=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:i-1,d=r?1:-1,g=0>e||0===e&&0>1/e?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,a=f):(a=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-a))<1&&(a--,u*=2),e+=a+h>=1?l/u:l*Math.pow(2,1-h),e*u>=2&&(a++,u/=2),a+h>=f?(s=0,a=f):a+h>=1?(s=(e*u-1)*Math.pow(2,o),a+=h):(s=e*Math.pow(2,h-1)*Math.pow(2,o),a=0));o>=8;t[n+p]=255&s,p+=d,s/=256,o-=8);for(a=a<<o|s,c+=o;c>0;t[n+p]=255&a,p+=d,a/=256,c-=8);t[n+p-d]|=128*g}},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e,n){/*!
	 * Chai - getPathValue utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * @see https://github.com/logicalparadox/filtr
	 * MIT Licensed
	 */
var r=n(43);t.exports=function(t,e){var n=r(t,e);return n.value}},function(t,e,n){/*!
	 * ## parsePath(path)
	 *
	 * Helper function used to parse string object
	 * paths. Use in conjunction with `_getPathValue`.
	 *
	 *      var parsed = parsePath('myobject.property.subprop');
	 *
	 * ### Paths:
	 *
	 * * Can be as near infinitely deep and nested
	 * * Arrays are also valid using the formal `myobject.document[3].property`.
	 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
	 *
	 * @param {String} path
	 * @returns {Object} parsed
	 * @api private
	 */
function r(t){var e=t.replace(/([^\\])\[/g,"$1.["),n=e.match(/(\\\.|[^.]+?)+/g);return n.map(function(t){var e=/^\[(\d+)\]$/,n=e.exec(t);return n?{i:parseFloat(n[1])}:{p:t.replace(/\\([.\[\]])/g,"$1")}})}/*!
	 * ## _getPathValue(parsed, obj)
	 *
	 * Helper companion function for `.parsePath` that returns
	 * the value located at the parsed address.
	 *
	 *      var value = getPathValue(parsed, obj);
	 *
	 * @param {Object} parsed definition from `parsePath`.
	 * @param {Object} object to search against
	 * @param {Number} object to search against
	 * @returns {Object|Undefined} value
	 * @api private
	 */
function o(t,e,n){var r,o=e;n=void 0===n?t.length:n;for(var i=0,a=n;a>i;i++){var s=t[i];o?("undefined"!=typeof s.p?o=o[s.p]:"undefined"!=typeof s.i&&(o=o[s.i]),i==a-1&&(r=o)):r=void 0}return r}/*!
	 * Chai - getPathInfo utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
var i=n(44);t.exports=function(t,e){var n=r(t),a=n[n.length-1],s={parent:n.length>1?o(n,e,n.length-1):e,name:a.p||a.i,value:o(n,e)};return s.exists=i(s.name,s.parent),s}},function(t,e,n){/*!
	 * Chai - hasProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
var r=n(22),o={number:Number,string:String};t.exports=function(t,e){var n=r(e);return"null"===n||"undefined"===n?!1:(o[n]&&"object"!=typeof e&&(e=new o[n](e)),t in e)}},function(t,e,n){/*!
	 * Chai - addProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
var r=n(32),o=n(21);t.exports=function(t,e,n){Object.defineProperty(t,e,{get:function i(){var t=o(this,"ssfi");t&&r.includeStack===!1&&o(this,"ssfi",i);var e=n.call(this);return void 0===e?this:e},configurable:!0})}},function(t,e,n){/*!
	 * Chai - addMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
var r=n(32),o=n(21);t.exports=function(t,e,n){t[e]=function(){var i=o(this,"ssfi");i&&r.includeStack===!1&&o(this,"ssfi",t[e]);var a=n.apply(this,arguments);return void 0===a?this:a}}},function(t,e){/*!
	 * Chai - overwriteProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e,n){var r=Object.getOwnPropertyDescriptor(t,e),o=function(){};r&&"function"==typeof r.get&&(o=r.get),Object.defineProperty(t,e,{get:function(){var t=n(o).call(this);return void 0===t?this:t},configurable:!0})}},function(t,e){/*!
	 * Chai - overwriteMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e,n){var r=t[e],o=function(){return this};r&&"function"==typeof r&&(o=r),t[e]=function(){var t=n(o).apply(this,arguments);return void 0===t?this:t}}},function(t,e,n){/*!
	 * Chai - addChainingMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
/*!
	 * Module dependencies
	 */
var r=n(33),o=n(21),i=n(32),a="__proto__"in Object,s=/^(?:length|name|arguments|caller)$/,u=Function.prototype.call,c=Function.prototype.apply;t.exports=function(t,e,n,f){"function"!=typeof f&&(f=function(){});var h={method:n,chainingBehavior:f};t.__methods||(t.__methods={}),t.__methods[e]=h,Object.defineProperty(t,e,{get:function(){h.chainingBehavior.call(this);var e=function l(){var t=o(this,"ssfi");t&&i.includeStack===!1&&o(this,"ssfi",l);var e=h.method.apply(this,arguments);return void 0===e?this:e};if(a){var n=e.__proto__=Object.create(this);n.call=u,n.apply=c}else{var f=Object.getOwnPropertyNames(t);f.forEach(function(n){if(!s.test(n)){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r)}})}return r(this,e),e},configurable:!0})}},function(t,e){/*!
	 * Chai - overwriteChainableMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e,n,r){var o=t.__methods[e],i=o.chainingBehavior;o.chainingBehavior=function(){var t=r(i).call(this);return void 0===t?this:t};var a=o.method;o.method=function(){var t=n(a).apply(this,arguments);return void 0===t?this:t}}},function(t,e,n){/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
var r=n(32);t.exports=function(t,e){/*!
	   * Assertion Constructor
	   *
	   * Creates object for chaining.
	   *
	   * @api private
	   */
function n(t,e,n){i(this,"ssfi",n||arguments.callee),i(this,"object",t),i(this,"message",e)}/*!
	   * Module dependencies.
	   */
var o=t.AssertionError,i=e.flag;/*!
	   * Module export.
	   */
t.Assertion=n,Object.defineProperty(n,"includeStack",{get:function(){return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),r.includeStack},set:function(t){console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),r.includeStack=t}}),Object.defineProperty(n,"showDiff",{get:function(){return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),r.showDiff},set:function(t){console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),r.showDiff=t}}),n.addProperty=function(t,n){e.addProperty(this.prototype,t,n)},n.addMethod=function(t,n){e.addMethod(this.prototype,t,n)},n.addChainableMethod=function(t,n,r){e.addChainableMethod(this.prototype,t,n,r)},n.overwriteProperty=function(t,n){e.overwriteProperty(this.prototype,t,n)},n.overwriteMethod=function(t,n){e.overwriteMethod(this.prototype,t,n)},n.overwriteChainableMethod=function(t,n,r){e.overwriteChainableMethod(this.prototype,t,n,r)},n.prototype.assert=function(t,n,a,s,u,c){var f=e.test(this,arguments);if(!0!==c&&(c=!1),!0!==r.showDiff&&(c=!1),!f){var n=e.getMessage(this,arguments),h=e.getActual(this,arguments);throw new o(n,{actual:h,expected:s,showDiff:c},r.includeStack?this.assert:i(this,"ssfi"))}},/*!
	   * ### ._obj
	   *
	   * Quick reference to stored `actual` value for plugin developers.
	   *
	   * @api private
	   */
Object.defineProperty(n.prototype,"_obj",{get:function(){return i(this,"object")},set:function(t){i(this,"object",t)}})}},function(t,e){/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e){function n(t,n){n&&M(this,"message",n),t=t.toLowerCase();var r=M(this,"object"),o=~["a","e","i","o","u"].indexOf(t.charAt(0))?"an ":"a ";this.assert(t===e.type(r),"expected #{this} to be "+o+t,"expected #{this} not to be "+o+t)}function r(){M(this,"contains",!0)}function o(t,n){e.expectTypes(this,["array","object","string"]),n&&M(this,"message",n);var r=M(this,"object"),o=!1;if("array"===e.type(r)&&"object"===e.type(t)){for(var i in r)if(e.eql(r[i],t)){o=!0;break}}else if("object"===e.type(t)){if(!M(this,"negate")){for(var a in t)new P(r).property(a,t[a]);return}var s={};for(var a in t)s[a]=r[a];o=e.eql(s,t)}else o=void 0!=r&&~r.indexOf(t);this.assert(o,"expected #{this} to include "+e.inspect(t),"expected #{this} to not include "+e.inspect(t))}function i(){var t=M(this,"object"),e=Object.prototype.toString.call(t);this.assert("[object Arguments]"===e,"expected #{this} to be arguments but got "+e,"expected #{this} to not be arguments")}function a(t,e){e&&M(this,"message",e);var n=M(this,"object");return M(this,"deep")?this.eql(t):void this.assert(t===n,"expected #{this} to equal #{exp}","expected #{this} to not equal #{exp}",t,this._obj,!0)}function s(t,n){n&&M(this,"message",n),this.assert(e.eql(t,M(this,"object")),"expected #{this} to deeply equal #{exp}","expected #{this} to not deeply equal #{exp}",t,this._obj,!0)}function u(t,e){e&&M(this,"message",e);var n=M(this,"object");if(M(this,"doLength")){new P(n,e).to.have.property("length");var r=n.length;this.assert(r>t,"expected #{this} to have a length above #{exp} but got #{act}","expected #{this} to not have a length above #{exp}",t,r)}else this.assert(n>t,"expected #{this} to be above "+t,"expected #{this} to be at most "+t)}function c(t,e){e&&M(this,"message",e);var n=M(this,"object");if(M(this,"doLength")){new P(n,e).to.have.property("length");var r=n.length;this.assert(r>=t,"expected #{this} to have a length at least #{exp} but got #{act}","expected #{this} to have a length below #{exp}",t,r)}else this.assert(n>=t,"expected #{this} to be at least "+t,"expected #{this} to be below "+t)}function f(t,e){e&&M(this,"message",e);var n=M(this,"object");if(M(this,"doLength")){new P(n,e).to.have.property("length");var r=n.length;this.assert(t>r,"expected #{this} to have a length below #{exp} but got #{act}","expected #{this} to not have a length below #{exp}",t,r)}else this.assert(t>n,"expected #{this} to be below "+t,"expected #{this} to be at least "+t)}function h(t,e){e&&M(this,"message",e);var n=M(this,"object");if(M(this,"doLength")){new P(n,e).to.have.property("length");var r=n.length;this.assert(t>=r,"expected #{this} to have a length at most #{exp} but got #{act}","expected #{this} to have a length above #{exp}",t,r)}else this.assert(t>=n,"expected #{this} to be at most "+t,"expected #{this} to be above "+t)}function l(t,n){n&&M(this,"message",n);var r=e.getName(t);this.assert(M(this,"object")instanceof t,"expected #{this} to be an instance of "+r,"expected #{this} to not be an instance of "+r)}function p(t,n){n&&M(this,"message",n);var r=M(this,"object");this.assert(r.hasOwnProperty(t),"expected #{this} to have own property "+e.inspect(t),"expected #{this} to not have own property "+e.inspect(t))}function d(t,n,r){"string"==typeof n&&(r=n,n=null),r&&M(this,"message",r);var o=M(this,"object"),i=Object.getOwnPropertyDescriptor(Object(o),t);i&&n?this.assert(e.eql(n,i),"expected the own property descriptor for "+e.inspect(t)+" on #{this} to match "+e.inspect(n)+", got "+e.inspect(i),"expected the own property descriptor for "+e.inspect(t)+" on #{this} to not match "+e.inspect(n),n,i,!0):this.assert(i,"expected #{this} to have an own property descriptor for "+e.inspect(t),"expected #{this} to not have an own property descriptor for "+e.inspect(t)),M(this,"object",i)}function g(){M(this,"doLength",!0)}function v(t,e){e&&M(this,"message",e);var n=M(this,"object");new P(n,e).to.have.property("length");var r=n.length;this.assert(r==t,"expected #{this} to have a length of #{exp} but got #{act}","expected #{this} to not have a length of #{act}",t,r)}function y(t,e){e&&M(this,"message",e);var n=M(this,"object");this.assert(t.exec(n),"expected #{this} to match "+t,"expected #{this} not to match "+t)}function b(t){var n,r=M(this,"object"),o=!0,i="keys must be given single argument of Array|Object|String, or multiple String arguments";switch(e.type(t)){case"array":if(arguments.length>1)throw new Error(i);break;case"object":if(arguments.length>1)throw new Error(i);t=Object.keys(t);break;default:t=Array.prototype.slice.call(arguments)}if(!t.length)throw new Error("keys required");var a=Object.keys(r),s=t,u=t.length,c=M(this,"any"),f=M(this,"all");if(c||f||(f=!0),c){var h=s.filter(function(t){return~a.indexOf(t)});o=h.length>0}if(f&&(o=t.every(function(t){return~a.indexOf(t)}),M(this,"negate")||M(this,"contains")||(o=o&&t.length==a.length)),u>1){t=t.map(function(t){return e.inspect(t)});var l=t.pop();f&&(n=t.join(", ")+", and "+l),c&&(n=t.join(", ")+", or "+l)}else n=e.inspect(t[0]);n=(u>1?"keys ":"key ")+n,n=(M(this,"contains")?"contain ":"have ")+n,this.assert(o,"expected #{this} to "+n,"expected #{this} to not "+n,s.slice(0).sort(),a.sort(),!0)}function w(t,n,r){r&&M(this,"message",r);var o=M(this,"object");new P(o,r).is.a("function");var i=!1,a=null,s=null,u=null;0===arguments.length?(n=null,t=null):t&&(t instanceof RegExp||"string"==typeof t)?(n=t,t=null):t&&t instanceof Error?(a=t,t=null,n=null):"function"==typeof t?(s=t.prototype.name,(!s||"Error"===s&&t!==Error)&&(s=t.name||(new t).name)):t=null;try{o()}catch(c){if(a)return this.assert(c===a,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}",a instanceof Error?a.toString():a,c instanceof Error?c.toString():c),M(this,"object",c),this;if(t&&(this.assert(c instanceof t,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp} but #{act} was thrown",s,c instanceof Error?c.toString():c),!n))return M(this,"object",c),this;var f="error"===e.type(c)&&"message"in c?c.message:""+c;if(null!=f&&n&&n instanceof RegExp)return this.assert(n.exec(f),"expected #{this} to throw error matching #{exp} but got #{act}","expected #{this} to throw error not matching #{exp}",n,f),M(this,"object",c),this;if(null!=f&&n&&"string"==typeof n)return this.assert(~f.indexOf(n),"expected #{this} to throw error including #{exp} but got #{act}","expected #{this} to throw error not including #{act}",n,f),M(this,"object",c),this;i=!0,u=c}var h="",l=null!==s?s:a?"#{exp}":"an error";i&&(h=" but #{act} was thrown"),this.assert(i===!0,"expected #{this} to throw "+l+h,"expected #{this} to not throw "+l+h,a instanceof Error?a.toString():a,u instanceof Error?u.toString():u),M(this,"object",u)}function m(t,n){n&&M(this,"message",n);var r=M(this,"object"),o=M(this,"itself"),i="function"!==e.type(r)||o?r[t]:r.prototype[t];this.assert("function"==typeof i,"expected #{this} to respond to "+e.inspect(t),"expected #{this} to not respond to "+e.inspect(t))}function x(t,n){n&&M(this,"message",n);var r=M(this,"object"),o=t(r);this.assert(o,"expected #{this} to satisfy "+e.objDisplay(t),"expected #{this} to not satisfy"+e.objDisplay(t),this.negate?!1:!0,o)}function E(t,n,r){r&&M(this,"message",r);var o=M(this,"object");if(new P(o,r).is.a("number"),"number"!==e.type(t)||"number"!==e.type(n))throw new Error("the arguments to closeTo or approximately must be numbers");this.assert(Math.abs(o-t)<=n,"expected #{this} to be close to "+t+" +/- "+n,"expected #{this} not to be close to "+t+" +/- "+n)}function j(t,e,n){return t.every(function(t){return n?e.some(function(e){return n(t,e)}):-1!==e.indexOf(t)})}function A(t,e){e&&M(this,"message",e);var n=M(this,"object");new P(t).to.be.an("array"),this.assert(t.indexOf(n)>-1,"expected #{this} to be one of #{exp}","expected #{this} to not be one of #{exp}",t,n)}function O(t,e,n){n&&M(this,"message",n);var r=M(this,"object");new P(t,n).to.have.property(e),new P(r).is.a("function");var o=t[e];r(),this.assert(o!==t[e],"expected ."+e+" to change","expected ."+e+" to not change")}function S(t,e,n){n&&M(this,"message",n);var r=M(this,"object");new P(t,n).to.have.property(e),new P(r).is.a("function");var o=t[e];r(),this.assert(t[e]-o>0,"expected ."+e+" to increase","expected ."+e+" to not increase")}function _(t,e,n){n&&M(this,"message",n);var r=M(this,"object");new P(t,n).to.have.property(e),new P(r).is.a("function");var o=t[e];r(),this.assert(t[e]-o<0,"expected ."+e+" to decrease","expected ."+e+" to not decrease")}var P=t.Assertion,M=(Object.prototype.toString,e.flag);["to","be","been","is","and","has","have","with","that","which","at","of","same"].forEach(function(t){P.addProperty(t,function(){return this})}),P.addProperty("not",function(){M(this,"negate",!0)}),P.addProperty("deep",function(){M(this,"deep",!0)}),P.addProperty("any",function(){M(this,"any",!0),M(this,"all",!1)}),P.addProperty("all",function(){M(this,"all",!0),M(this,"any",!1)}),P.addChainableMethod("an",n),P.addChainableMethod("a",n),P.addChainableMethod("include",o,r),P.addChainableMethod("contain",o,r),P.addChainableMethod("contains",o,r),P.addChainableMethod("includes",o,r),P.addProperty("ok",function(){this.assert(M(this,"object"),"expected #{this} to be truthy","expected #{this} to be falsy")}),P.addProperty("true",function(){this.assert(!0===M(this,"object"),"expected #{this} to be true","expected #{this} to be false",this.negate?!1:!0)}),P.addProperty("false",function(){this.assert(!1===M(this,"object"),"expected #{this} to be false","expected #{this} to be true",this.negate?!0:!1)}),P.addProperty("null",function(){this.assert(null===M(this,"object"),"expected #{this} to be null","expected #{this} not to be null")}),P.addProperty("undefined",function(){this.assert(void 0===M(this,"object"),"expected #{this} to be undefined","expected #{this} not to be undefined")}),P.addProperty("NaN",function(){this.assert(isNaN(M(this,"object")),"expected #{this} to be NaN","expected #{this} not to be NaN")}),P.addProperty("exist",function(){this.assert(null!=M(this,"object"),"expected #{this} to exist","expected #{this} to not exist")}),P.addProperty("empty",function(){var t=M(this,"object"),e=t;Array.isArray(t)||"string"==typeof object?e=t.length:"object"==typeof t&&(e=Object.keys(t).length),this.assert(!e,"expected #{this} to be empty","expected #{this} not to be empty")}),P.addProperty("arguments",i),P.addProperty("Arguments",i),P.addMethod("equal",a),P.addMethod("equals",a),P.addMethod("eq",a),P.addMethod("eql",s),P.addMethod("eqls",s),P.addMethod("above",u),P.addMethod("gt",u),P.addMethod("greaterThan",u),P.addMethod("least",c),P.addMethod("gte",c),P.addMethod("below",f),P.addMethod("lt",f),P.addMethod("lessThan",f),P.addMethod("most",h),P.addMethod("lte",h),P.addMethod("within",function(t,e,n){n&&M(this,"message",n);var r=M(this,"object"),o=t+".."+e;if(M(this,"doLength")){new P(r,n).to.have.property("length");var i=r.length;this.assert(i>=t&&e>=i,"expected #{this} to have a length within "+o,"expected #{this} to not have a length within "+o)}else this.assert(r>=t&&e>=r,"expected #{this} to be within "+o,"expected #{this} to not be within "+o)}),P.addMethod("instanceof",l),P.addMethod("instanceOf",l),P.addMethod("property",function(t,n,r){r&&M(this,"message",r);var o=!!M(this,"deep"),i=o?"deep property ":"property ",a=M(this,"negate"),s=M(this,"object"),u=o?e.getPathInfo(t,s):null,c=o?u.exists:e.hasProperty(t,s),f=o?u.value:s[t];if(a&&arguments.length>1){if(void 0===f)throw r=null!=r?r+": ":"",new Error(r+e.inspect(s)+" has no "+i+e.inspect(t))}else this.assert(c,"expected #{this} to have a "+i+e.inspect(t),"expected #{this} to not have "+i+e.inspect(t));arguments.length>1&&this.assert(n===f,"expected #{this} to have a "+i+e.inspect(t)+" of #{exp}, but got #{act}","expected #{this} to not have a "+i+e.inspect(t)+" of #{act}",n,f),M(this,"object",f)}),P.addMethod("ownProperty",p),P.addMethod("haveOwnProperty",p),P.addMethod("ownPropertyDescriptor",d),P.addMethod("haveOwnPropertyDescriptor",d),P.addChainableMethod("length",v,g),P.addMethod("lengthOf",v),P.addMethod("match",y),P.addMethod("matches",y),P.addMethod("string",function(t,n){n&&M(this,"message",n);var r=M(this,"object");new P(r,n).is.a("string"),this.assert(~r.indexOf(t),"expected #{this} to contain "+e.inspect(t),"expected #{this} to not contain "+e.inspect(t))}),P.addMethod("keys",b),P.addMethod("key",b),P.addMethod("throw",w),P.addMethod("throws",w),P.addMethod("Throw",w),P.addMethod("respondTo",m),P.addMethod("respondsTo",m),P.addProperty("itself",function(){M(this,"itself",!0)}),P.addMethod("satisfy",x),P.addMethod("satisfies",x),P.addMethod("closeTo",E),P.addMethod("approximately",E),P.addMethod("members",function(t,n){n&&M(this,"message",n);var r=M(this,"object");new P(r).to.be.an("array"),new P(t).to.be.an("array");var o=M(this,"deep")?e.eql:void 0;return M(this,"contains")?this.assert(j(t,r,o),"expected #{this} to be a superset of #{act}","expected #{this} to not be a superset of #{act}",r,t):void this.assert(j(r,t,o)&&j(t,r,o),"expected #{this} to have the same members as #{act}","expected #{this} to not have the same members as #{act}",r,t)}),P.addMethod("oneOf",A),P.addChainableMethod("change",O),P.addChainableMethod("changes",O),P.addChainableMethod("increase",S),P.addChainableMethod("increases",S),P.addChainableMethod("decrease",_),P.addChainableMethod("decreases",_),P.addProperty("extensible",function(){var t,e=M(this,"object");try{t=Object.isExtensible(e)}catch(n){if(!(n instanceof TypeError))throw n;t=!1}this.assert(t,"expected #{this} to be extensible","expected #{this} to not be extensible")}),P.addProperty("sealed",function(){var t,e=M(this,"object");try{t=Object.isSealed(e)}catch(n){if(!(n instanceof TypeError))throw n;t=!0}this.assert(t,"expected #{this} to be sealed","expected #{this} to not be sealed")}),P.addProperty("frozen",function(){var t,e=M(this,"object");try{t=Object.isFrozen(e)}catch(n){if(!(n instanceof TypeError))throw n;t=!0}this.assert(t,"expected #{this} to be frozen","expected #{this} to not be frozen")})}},function(t,e){/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e){t.expect=function(e,n){return new t.Assertion(e,n)},t.expect.fail=function(e,n,r,o){throw r=r||"expect.fail()",new t.AssertionError(r,{actual:e,expected:n,operator:o},t.expect.fail)}}},function(t,e){/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e){function n(){function e(){return this instanceof String||this instanceof Number||this instanceof Boolean?new r(this.valueOf(),null,e):new r(this,null,e)}function n(t){Object.defineProperty(this,"should",{value:t,enumerable:!0,configurable:!0,writable:!0})}Object.defineProperty(Object.prototype,"should",{set:n,get:e,configurable:!0});var o={};return o.fail=function(e,n,r,i){throw r=r||"should.fail()",new t.AssertionError(r,{actual:e,expected:n,operator:i},o.fail)},o.equal=function(t,e,n){new r(t,n).to.equal(e)},o.Throw=function(t,e,n,o){new r(t,o).to.Throw(e,n)},o.exist=function(t,e){new r(t,e).to.exist},o.not={},o.not.equal=function(t,e,n){new r(t,n).to.not.equal(e)},o.not.Throw=function(t,e,n,o){new r(t,o).to.not.Throw(e,n)},o.not.exist=function(t,e){new r(t,e).to.not.exist},o["throw"]=o.Throw,o.not["throw"]=o.not.Throw,o}var r=t.Assertion;t.should=n,t.Should=n}},function(t,e){/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
t.exports=function(t,e){/*!
	   * Chai dependencies.
	   */
var n=t.Assertion,r=e.flag,o=t.assert=function(e,r){var o=new n(null,null,t.assert);o.assert(e,r,"[ negation message unavailable ]")};o.fail=function(e,n,r,i){throw r=r||"assert.fail()",new t.AssertionError(r,{actual:e,expected:n,operator:i},o.fail)},o.isOk=function(t,e){new n(t,e).is.ok},o.isNotOk=function(t,e){new n(t,e).is.not.ok},o.equal=function(t,e,i){var a=new n(t,i,o.equal);a.assert(e==r(a,"object"),"expected #{this} to equal #{exp}","expected #{this} to not equal #{act}",e,t)},o.notEqual=function(t,e,i){var a=new n(t,i,o.notEqual);a.assert(e!=r(a,"object"),"expected #{this} to not equal #{exp}","expected #{this} to equal #{act}",e,t)},o.strictEqual=function(t,e,r){new n(t,r).to.equal(e)},o.notStrictEqual=function(t,e,r){new n(t,r).to.not.equal(e)},o.deepEqual=function(t,e,r){new n(t,r).to.eql(e)},o.notDeepEqual=function(t,e,r){new n(t,r).to.not.eql(e)},o.isAbove=function(t,e,r){new n(t,r).to.be.above(e)},o.isAtLeast=function(t,e,r){new n(t,r).to.be.least(e)},o.isBelow=function(t,e,r){new n(t,r).to.be.below(e)},o.isAtMost=function(t,e,r){new n(t,r).to.be.most(e)},o.isTrue=function(t,e){new n(t,e).is["true"]},o.isNotTrue=function(t,e){new n(t,e).to.not.equal(!0)},o.isFalse=function(t,e){new n(t,e).is["false"]},o.isNotFalse=function(t,e){new n(t,e).to.not.equal(!1)},o.isNull=function(t,e){new n(t,e).to.equal(null)},o.isNotNull=function(t,e){new n(t,e).to.not.equal(null)},o.isNaN=function(t,e){new n(t,e).to.be.NaN},o.isNotNaN=function(t,e){new n(t,e).not.to.be.NaN},o.isUndefined=function(t,e){new n(t,e).to.equal(void 0)},o.isDefined=function(t,e){new n(t,e).to.not.equal(void 0)},o.isFunction=function(t,e){new n(t,e).to.be.a("function")},o.isNotFunction=function(t,e){new n(t,e).to.not.be.a("function")},o.isObject=function(t,e){new n(t,e).to.be.a("object")},o.isNotObject=function(t,e){new n(t,e).to.not.be.a("object")},o.isArray=function(t,e){new n(t,e).to.be.an("array")},o.isNotArray=function(t,e){new n(t,e).to.not.be.an("array")},o.isString=function(t,e){new n(t,e).to.be.a("string")},o.isNotString=function(t,e){new n(t,e).to.not.be.a("string")},o.isNumber=function(t,e){new n(t,e).to.be.a("number")},o.isNotNumber=function(t,e){new n(t,e).to.not.be.a("number")},o.isBoolean=function(t,e){new n(t,e).to.be.a("boolean")},o.isNotBoolean=function(t,e){new n(t,e).to.not.be.a("boolean")},o.typeOf=function(t,e,r){new n(t,r).to.be.a(e)},o.notTypeOf=function(t,e,r){new n(t,r).to.not.be.a(e)},o.instanceOf=function(t,e,r){new n(t,r).to.be.instanceOf(e)},o.notInstanceOf=function(t,e,r){new n(t,r).to.not.be.instanceOf(e)},o.include=function(t,e,r){new n(t,r,o.include).include(e)},o.notInclude=function(t,e,r){new n(t,r,o.notInclude).not.include(e)},o.match=function(t,e,r){new n(t,r).to.match(e)},o.notMatch=function(t,e,r){new n(t,r).to.not.match(e)},o.property=function(t,e,r){new n(t,r).to.have.property(e)},o.notProperty=function(t,e,r){new n(t,r).to.not.have.property(e)},o.deepProperty=function(t,e,r){new n(t,r).to.have.deep.property(e)},o.notDeepProperty=function(t,e,r){new n(t,r).to.not.have.deep.property(e)},o.propertyVal=function(t,e,r,o){new n(t,o).to.have.property(e,r)},o.propertyNotVal=function(t,e,r,o){new n(t,o).to.not.have.property(e,r)},o.deepPropertyVal=function(t,e,r,o){new n(t,o).to.have.deep.property(e,r)},o.deepPropertyNotVal=function(t,e,r,o){new n(t,o).to.not.have.deep.property(e,r)},o.lengthOf=function(t,e,r){new n(t,r).to.have.length(e)},o["throws"]=function(t,e,o,i){("string"==typeof e||e instanceof RegExp)&&(o=e,e=null);var a=new n(t,i).to["throw"](e,o);return r(a,"object")},o.doesNotThrow=function(t,e,r){"string"==typeof e&&(r=e,e=null),new n(t,r).to.not.Throw(e)},o.operator=function(t,o,i,a){var s;switch(o){case"==":s=t==i;break;case"===":s=t===i;break;case">":s=t>i;break;case">=":s=t>=i;break;case"<":s=i>t;break;case"<=":s=i>=t;break;case"!=":s=t!=i;break;case"!==":s=t!==i;break;default:throw new Error('Invalid operator "'+o+'"')}var u=new n(s,a);u.assert(!0===r(u,"object"),"expected "+e.inspect(t)+" to be "+o+" "+e.inspect(i),"expected "+e.inspect(t)+" to not be "+o+" "+e.inspect(i))},o.closeTo=function(t,e,r,o){new n(t,o).to.be.closeTo(e,r)},o.approximately=function(t,e,r,o){new n(t,o).to.be.approximately(e,r)},o.sameMembers=function(t,e,r){new n(t,r).to.have.same.members(e)},o.sameDeepMembers=function(t,e,r){new n(t,r).to.have.same.deep.members(e)},o.includeMembers=function(t,e,r){new n(t,r).to.include.members(e)},o.includeDeepMembers=function(t,e,r){new n(t,r).to.include.deep.members(e)},o.oneOf=function(t,e,r){new n(t,r).to.be.oneOf(e)},o.changes=function(t,e,r){new n(t).to.change(e,r)},o.doesNotChange=function(t,e,r){new n(t).to.not.change(e,r)},o.increases=function(t,e,r){new n(t).to.increase(e,r)},o.doesNotIncrease=function(t,e,r){new n(t).to.not.increase(e,r)},o.decreases=function(t,e,r){new n(t).to.decrease(e,r)},o.doesNotDecrease=function(t,e,r){new n(t).to.not.decrease(e,r)},/*!
	   * ### .ifError(object)
	   *
	   * Asserts if value is not a false value, and throws if it is a true value.
	   * This is added to allow for chai to be a drop-in replacement for Node's
	   * assert class.
	   *
	   *     var err = new Error('I am a custom error');
	   *     assert.ifError(err); // Rethrows err!
	   *
	   * @name ifError
	   * @param {Object} object
	   * @namespace Assert
	   * @api public
	   */
o.ifError=function(t){if(t)throw t},o.isExtensible=function(t,e){new n(t,e).to.be.extensible},o.isNotExtensible=function(t,e){new n(t,e).to.not.be.extensible},o.isSealed=function(t,e){new n(t,e).to.be.sealed},o.isNotSealed=function(t,e){new n(t,e).to.not.be.sealed},o.isFrozen=function(t,e){new n(t,e).to.be.frozen},o.isNotFrozen=function(t,e){new n(t,e).to.not.be.frozen},/*!
	   * Aliases.
	   */
function i(t,e){return o[e]=o[t],i}("isOk","ok")("isNotOk","notOk")("throws","throw")("throws","Throw")("isExtensible","extensible")("isNotExtensible","notExtensible")("isSealed","sealed")("isNotSealed","notSealed")("isFrozen","frozen")("isNotFrozen","notFrozen")}},function(t,e){"use strict";describe("directive malarkey",function(){var t=void 0,e=void 0;beforeEach(angular.mock.module("xinhuangGithubCom")),beforeEach(inject(function(n,r){var o=angular.element("\n      <acme-malarkey values=\"['eat more.', 'play more', 'code more', 'sleep more']\"></acme-malarkey>\n    ");e=r.$new(),t=n(o)(e),e.$digest()})),it("should be compiled",function(){expect(t.html()).not.toEqual(null)}),it("should have isolate scope object with instanciate members",function(){var e=t.isolateScope();expect(e.values).toEqual(jasmine.any(Array)),expect(e.values.length).toEqual(4)}),it("should have span element",function(){var e=t.find("acme-malarkey");expect(e).toBeDefined()})})}]),angular.module("xinhuangGithubCom").run(["$templateCache",function(t){t.put("app/blog/blog.html",'<div layout=row id=top class=anchor><div flex=30 flex-xs=0 flex-sm=15></div><div flex=40 flex-xs=100 flex-sm=70><div marked=blog.content><div></div><div flex></div></div><div id=footer><md-divider><div layout=row><a href=/ >Home</a><div flex></div><a href="" ng-click=blog.scrollToTop()>Top</a></div></div></div></div>'),t.put("app/main/main.html",'<div layout=row layout-fill><div flex=30 flex-xs=0 flex-sm=15></div><div layout=column><div id=title layout=row><div id=title>{{main.title}}</div><acme-malarkey id=tagline values=main.taglines></acme-malarkey></div><div id=blog-list><md-list><md-list-item class=md-2-line ng-repeat="blog in main.blogs"><div class=md-list-item-text layout=column><a href=#/blogs/{{blog.file}}><h3>{{blog.title}}</h3></a><p>{{blog.date}}</p></div></md-list-item></md-list></div><div id=footer><md-divider><div layout=row><a href=https://github.com/xinhuang>GitHub</a><div flex=5></div><a href=/#/about>About</a></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-b8015f8f66.js.map
