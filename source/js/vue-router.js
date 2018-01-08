!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueRouter=e()}(this,function(){"use strict";function t(t,e){if(!t)throw new Error("[vue-router] "+e)}function e(t,e){t||"undefined"!=typeof console&&console.warn("[vue-router] "+e)}function n(t,n){switch(typeof n){case"undefined":return;case"object":return n;case"function":return n(t);case"boolean":return n?t.params:void 0;default:e(!1,'props in "'+t.path+'" is a '+typeof n+", expecting an object, function or boolean.")}}function r(t,n,r){void 0===n&&(n={});var i,a=r||o;try{i=a(t||"")}catch(u){e(!1,u.message),i={}}for(var c in n){var s=n[c];i[c]=Array.isArray(s)?s.slice():s}return i}function o(t){var e={};return(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach(function(t){var n=t.replace(/\+/g," ").split("="),r=qt(n.shift()),o=n.length>0?qt(n.join("=")):null;void 0===e[r]?e[r]=o:Array.isArray(e[r])?e[r].push(o):e[r]=[e[r],o]}),e):e}function i(t){var e=t?Object.keys(t).map(function(e){var n=t[e];if(void 0===n)return"";if(null===n)return St(e);if(Array.isArray(n)){var r=[];return n.forEach(function(t){void 0!==t&&(null===t?r.push(St(e)):r.push(St(e)+"="+St(t)))}),r.join("&")}return St(e)+"="+St(n)}).filter(function(t){return t.length>0}).join("&"):null;return e?"?"+e:""}function a(t,e,n,r){var o=r&&r.options.stringifyQuery,i={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:e.query||{},params:e.params||{},fullPath:c(e,o),matched:t?u(t):[]};return n&&(i.redirectedFrom=c(n,o)),Object.freeze(i)}function u(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function c(t,e){var n=t.path,r=t.query;void 0===r&&(r={});var o=t.hash;void 0===o&&(o="");var a=e||i;return(n||"/")+a(r)+o}function s(t,e){return e===Pt?t===e:!!e&&(t.path&&e.path?t.path.replace(Lt,"")===e.path.replace(Lt,"")&&t.hash===e.hash&&p(t.query,e.query):!(!t.name||!e.name)&&(t.name===e.name&&t.hash===e.hash&&p(t.query,e.query)&&p(t.params,e.params)))}function p(t,e){void 0===t&&(t={}),void 0===e&&(e={});var n=Object.keys(t),r=Object.keys(e);return n.length===r.length&&n.every(function(n){var r=t[n],o=e[n];return"object"==typeof r&&"object"==typeof o?p(r,o):String(r)===String(o)})}function f(t,e){return 0===t.path.replace(Lt,"/").indexOf(e.path.replace(Lt,"/"))&&(!e.hash||t.hash===e.hash)&&h(t.query,e.query)}function h(t,e){for(var n in e)if(!(n in t))return!1;return!0}function l(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function d(t){if(t)for(var e,n=0;n<t.length;n++){if(e=t[n],"a"===e.tag)return e;if(e.children&&(e=d(e.children)))return e}}function y(t){if(!y.installed){y.installed=!0,jt=t;var e=function(t){return void 0!==t},n=function(t,n){var r=t.$options._parentVnode;e(r)&&e(r=r.data)&&e(r=r.registerRouteInstance)&&r(t,n)};t.mixin({beforeCreate:function(){e(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,n(this,this)},destroyed:function(){n(this)}}),Object.defineProperty(t.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this._routerRoot._route}}),t.component("router-view",At),t.component("router-link",Ht);var r=t.config.optionMergeStrategies;r.beforeRouteEnter=r.beforeRouteLeave=r.created}}function v(t,e,n){var r=t.charAt(0);if("/"===r)return t;if("?"===r||"#"===r)return e+t;var o=e.split("/");n&&o[o.length-1]||o.pop();for(var i=t.replace(/^\//,"").split("/"),a=0;a<i.length;a++){var u=i[a];".."===u?o.pop():"."!==u&&o.push(u)}return""!==o[0]&&o.unshift(""),o.join("/")}function m(t){var e="",n="",r=t.indexOf("#");r>=0&&(e=t.slice(r),t=t.slice(0,r));var o=t.indexOf("?");return o>=0&&(n=t.slice(o+1),t=t.slice(0,o)),{path:t,query:n,hash:e}}function g(t){return t.replace(/\/\//g,"/")}function b(t,e){for(var n,r=[],o=0,i=0,a="",u=e&&e.delimiter||"/";null!=(n=Jt.exec(t));){var c=n[0],s=n[1],p=n.index;if(a+=t.slice(i,p),i=p+c.length,s)a+=s[1];else{var f=t[i],h=n[2],l=n[3],d=n[4],y=n[5],v=n[6],m=n[7];a&&(r.push(a),a="");var g=null!=h&&null!=f&&f!==h,b="+"===v||"*"===v,w="?"===v||"*"===v,x=n[2]||u,k=d||y;r.push({name:l||o++,prefix:h||"",delimiter:x,optional:w,repeat:b,partial:g,asterisk:!!m,pattern:k?O(k):m?".*":"[^"+E(x)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&r.push(a),r}function w(t,e){return R(b(t,e))}function x(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function k(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function R(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(n,r){for(var o="",i=n||{},a=r||{},u=a.pretty?x:encodeURIComponent,c=0;c<t.length;c++){var s=t[c];if("string"!=typeof s){var p,f=i[s.name];if(null==f){if(s.optional){s.partial&&(o+=s.prefix);continue}throw new TypeError('Expected "'+s.name+'" to be defined')}if(Mt(f)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but received `'+JSON.stringify(f)+"`");if(0===f.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var h=0;h<f.length;h++){if(p=u(f[h]),!e[c].test(p))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===h?s.prefix:s.delimiter)+p}}else{if(p=s.asterisk?k(f):u(f),!e[c].test(p))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but received "'+p+'"');o+=s.prefix+p}}else o+=s}return o}}function E(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function O(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function C(t,e){return t.keys=e,t}function j(t){return t.sensitive?"":"i"}function A(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return C(t,e)}function _(t,e,n){for(var r=[],o=0;o<t.length;o++)r.push(S(t[o],e,n).source);var i=new RegExp("(?:"+r.join("|")+")",j(n));return C(i,e)}function T(t,e,n){return $(b(t,n),e,n)}function $(t,e,n){Mt(e)||(n=e||n,e=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",a=0;a<t.length;a++){var u=t[a];if("string"==typeof u)i+=E(u);else{var c=E(u.prefix),s="(?:"+u.pattern+")";e.push(u),u.repeat&&(s+="(?:"+c+s+")*"),s=u.optional?u.partial?c+"("+s+")?":"(?:"+c+"("+s+"))?":c+"("+s+")",i+=s}}var p=E(n.delimiter||"/"),f=i.slice(-p.length)===p;return r||(i=(f?i.slice(0,-p.length):i)+"(?:"+p+"(?=$))?"),i+=o?"$":r&&f?"":"(?="+p+"|$)",C(new RegExp("^"+i,j(n)),e)}function S(t,e,n){return Mt(e)||(n=e||n,e=[]),n=n||{},t instanceof RegExp?A(t,e):Mt(t)?_(t,e,n):T(t,e,n)}function q(t,n,r){try{var o=Kt[t]||(Kt[t]=zt.compile(t));return o(n||{},{pretty:!0})}catch(i){return e(!1,"missing param for "+r+": "+i.message),""}}function L(t,e,n,r){var o=e||[],i=n||Object.create(null),a=r||Object.create(null);t.forEach(function(t){P(o,i,a,t)});for(var u=0,c=o.length;u<c;u++)"*"===o[u]&&(o.push(o.splice(u,1)[0]),c--,u--);return{pathList:o,pathMap:i,nameMap:a}}function P(n,r,o,i,a,u){var c=i.path,s=i.name;t(null!=c,'"path" is required in a route configuration.'),t("string"!=typeof i.component,'route config "component" for path: '+String(c||s)+" cannot be a string id. Use an actual component instead.");var p=V(c,a),f=i.pathToRegexpOptions||{};"boolean"==typeof i.caseSensitive&&(f.sensitive=i.caseSensitive);var h={path:p,regex:U(p,f),components:i.components||{"default":i.component},instances:{},name:s,parent:a,matchAs:u,redirect:i.redirect,beforeEnter:i.beforeEnter,meta:i.meta||{},props:null==i.props?{}:i.components?i.props:{"default":i.props}};if(i.children&&(i.name&&!i.redirect&&i.children.some(function(t){return/^\/?$/.test(t.path)})&&e(!1,"Named Route '"+i.name+"' has a default child route. When navigating to this named route (:to=\"{name: '"+i.name+"'\"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead."),i.children.forEach(function(t){var e=u?g(u+"/"+t.path):void 0;P(n,r,o,t,h,e)})),void 0!==i.alias){var l=Array.isArray(i.alias)?i.alias:[i.alias];l.forEach(function(t){var e={path:t,children:i.children};P(n,r,o,e,a,h.path||"/")})}r[h.path]||(n.push(h.path),r[h.path]=h),s&&(o[s]?u||e(!1,'Duplicate named routes definition: { name: "'+s+'", path: "'+h.path+'" }'):o[s]=h)}function U(t,n){var r=zt(t,[],n),o={};return r.keys.forEach(function(n){e(!o[n.name],'Duplicate param keys in route with path: "'+t+'"'),o[n.name]=!0}),r}function V(t,e){return t=t.replace(/\/$/,""),"/"===t[0]?t:null==e?t:g(e.path+"/"+t)}function H(t,n,o,i){var a="string"==typeof t?{path:t}:t;if(a.name||a._normalized)return a;if(!a.path&&a.params&&n){a=I({},a),a._normalized=!0;var u=I(I({},n.params),a.params);if(n.name)a.name=n.name,a.params=u;else if(n.matched.length){var c=n.matched[n.matched.length-1].path;a.path=q(c,u,"path "+n.path)}else e(!1,"relative params navigation requires a current route.");return a}var s=m(a.path||""),p=n&&n.path||"/",f=s.path?v(s.path,p,o||a.append):p,h=r(s.query,a.query,i&&i.options.parseQuery),l=a.hash||s.hash;return l&&"#"!==l.charAt(0)&&(l="#"+l),{_normalized:!0,path:f,query:h,hash:l}}function I(t,e){for(var n in e)t[n]=e[n];return t}function M(n,r){function o(t){L(t,f,h,l)}function i(t,n,o){var i=H(t,n,!1,r),a=i.name;if(a){var u=l[a];if(e(u,"Route with name '"+a+"' does not exist"),!u)return s(null,i);var c=u.regex.keys.filter(function(t){return!t.optional}).map(function(t){return t.name});if("object"!=typeof i.params&&(i.params={}),n&&"object"==typeof n.params)for(var p in n.params)!(p in i.params)&&c.indexOf(p)>-1&&(i.params[p]=n.params[p]);if(u)return i.path=q(u.path,i.params,'named route "'+a+'"'),s(u,i,o)}else if(i.path){i.params={};for(var d=0;d<f.length;d++){var y=f[d],v=h[y];if(z(v.regex,i.path,i.params))return s(v,i,o)}}return s(null,i)}function u(n,o){var u=n.redirect,c="function"==typeof u?u(a(n,o,null,r)):u;if("string"==typeof c&&(c={path:c}),!c||"object"!=typeof c)return e(!1,"invalid redirect option: "+JSON.stringify(c)),s(null,o);var p=c,f=p.name,h=p.path,d=o.query,y=o.hash,v=o.params;if(d=p.hasOwnProperty("query")?p.query:d,y=p.hasOwnProperty("hash")?p.hash:y,v=p.hasOwnProperty("params")?p.params:v,f){var m=l[f];return t(m,'redirect failed: named route "'+f+'" not found.'),i({_normalized:!0,name:f,query:d,hash:y,params:v},void 0,o)}if(h){var g=B(h,n),b=q(g,v,'redirect route with path "'+g+'"');return i({_normalized:!0,path:b,query:d,hash:y},void 0,o)}return e(!1,"invalid redirect option: "+JSON.stringify(c)),s(null,o)}function c(t,e,n){var r=q(n,e.params,'aliased route with path "'+n+'"'),o=i({_normalized:!0,path:r});if(o){var a=o.matched,u=a[a.length-1];return e.params=o.params,s(u,e)}return s(null,e)}function s(t,e,n){return t&&t.redirect?u(t,n||e):t&&t.matchAs?c(t,e,t.matchAs):a(t,e,n,r)}var p=L(n),f=p.pathList,h=p.pathMap,l=p.nameMap;return{match:i,addRoutes:o}}function z(t,e,n){var r=e.match(t);if(!r)return!1;if(!n)return!0;for(var o=1,i=r.length;o<i;++o){var a=t.keys[o-1],u="string"==typeof r[o]?decodeURIComponent(r[o]):r[o];a&&(n[a.name]=u)}return!0}function B(t,e){return v(t,e.parent?e.parent.path:"/",!0)}function D(){window.addEventListener("popstate",function(t){N(),t.state&&t.state.key&&tt(t.state.key)})}function F(e,n,r,o){if(e.app){var i=e.options.scrollBehavior;i&&(t("function"==typeof i,"scrollBehavior must be a function"),e.app.$nextTick(function(){var t=J(),e=i(n,r,o?t:null);if(e){var a="object"==typeof e;if(a&&"string"==typeof e.selector){var u=document.querySelector(e.selector);if(u){var c=e.offset&&"object"==typeof e.offset?e.offset:{};c=X(c),t=K(u,c)}else Q(e)&&(t=W(e))}else a&&Q(e)&&(t=W(e));t&&window.scrollTo(t.x,t.y)}}))}}function N(){var t=Z();t&&(Qt[t]={x:window.pageXOffset,y:window.pageYOffset})}function J(){var t=Z();if(t)return Qt[t]}function K(t,e){var n=document.documentElement,r=n.getBoundingClientRect(),o=t.getBoundingClientRect();return{x:o.left-r.left-e.x,y:o.top-r.top-e.y}}function Q(t){return Y(t.x)||Y(t.y)}function W(t){return{x:Y(t.x)?t.x:window.pageXOffset,y:Y(t.y)?t.y:window.pageYOffset}}function X(t){return{x:Y(t.x)?t.x:0,y:Y(t.y)?t.y:0}}function Y(t){return"number"==typeof t}function G(){return Xt.now().toFixed(3)}function Z(){return Yt}function tt(t){Yt=t}function et(t,e){N();var n=window.history;try{e?n.replaceState({key:Yt},"",t):(Yt=G(),n.pushState({key:Yt},"",t))}catch(r){window.location[e?"replace":"assign"](t)}}function nt(t){et(t,!0)}function rt(t,e,n){var r=function(o){o>=t.length?n():t[o]?e(t[o],function(){r(o+1)}):r(o+1)};r(0)}function ot(t){if(!t)if(It){var e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^https?:\/\/[^\/]+/,"")}else t="/";return"/"!==t.charAt(0)&&(t="/"+t),t.replace(/\/$/,"")}function it(t,e){var n,r=Math.max(t.length,e.length);for(n=0;n<r&&t[n]===e[n];n++);return{updated:e.slice(0,n),activated:e.slice(n),deactivated:t.slice(n)}}function at(t,e,n,r){var o=yt(t,function(t,r,o,i){var a=ut(t,e);if(a)return Array.isArray(a)?a.map(function(t){return n(t,r,o,i)}):n(a,r,o,i)});return vt(r?o.reverse():o)}function ut(t,e){return"function"!=typeof t&&(t=jt.extend(t)),t.options[e]}function ct(t){return at(t,"beforeRouteLeave",pt,!0)}function st(t){return at(t,"beforeRouteUpdate",pt)}function pt(t,e){if(e)return function(){return t.apply(e,arguments)}}function ft(t,e,n){return at(t,"beforeRouteEnter",function(t,r,o,i){return ht(t,o,i,e,n)})}function ht(t,e,n,r,o){return function(i,a,u){return t(i,a,function(t){u(t),"function"==typeof t&&r.push(function(){lt(t,e.instances,n,o)})})}}function lt(t,e,n,r){e[n]?t(e[n]):r()&&setTimeout(function(){lt(t,e,n,r)},16)}function dt(t){return function(n,r,o){var i=!1,a=0,u=null;yt(t,function(t,n,r,c){if("function"==typeof t&&void 0===t.cid){i=!0,a++;var s,p=mt(function(e){t.resolved="function"==typeof e?e:jt.extend(e),r.components[c]=e,a--,a<=0&&o()}),f=mt(function(t){var n="Failed to resolve async component "+c+": "+t;e(!1,n),u||(u=gt(t)?t:new Error(n),o(u))});try{s=t(p,f)}catch(h){f(h)}if(s)if("function"==typeof s.then)s.then(p,f);else{var l=s.component;l&&"function"==typeof l.then&&l.then(p,f)}}}),i||o()}}function yt(t,e){return vt(t.map(function(t){return Object.keys(t.components).map(function(n){return e(t.components[n],t.instances[n],t,n)})}))}function vt(t){return Array.prototype.concat.apply([],t)}function mt(t){var e=!1;return function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];if(!e)return e=!0,t.apply(this,n)}}function gt(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function bt(t){var e=window.location.pathname;return t&&0===e.indexOf(t)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}function wt(t){var e=bt(t);if(!/^\/#/.test(e))return window.location.replace(g(t+"/#"+e)),!0}function xt(){var t=kt();return"/"===t.charAt(0)||(Et("/"+t),!1)}function kt(){var t=window.location.href,e=t.indexOf("#");return e===-1?"":t.slice(e+1)}function Rt(t){window.location.hash=t}function Et(t){var e=window.location.href,n=e.indexOf("#"),r=n>=0?e.slice(0,n):e;window.location.replace(r+"#"+t)}function Ot(t,e){return t.push(e),function(){var n=t.indexOf(e);n>-1&&t.splice(n,1)}}function Ct(t,e,n){var r="hash"===n?"#"+e:e;return t?g(t+"/"+r):r}var jt,At={name:"router-view",functional:!0,props:{name:{type:String,"default":"default"}},render:function(t,e){var r=e.props,o=e.children,i=e.parent,a=e.data;a.routerView=!0;for(var u=i.$createElement,c=r.name,s=i.$route,p=i._routerViewCache||(i._routerViewCache={}),f=0,h=!1;i&&i._routerRoot!==i;)i.$vnode&&i.$vnode.data.routerView&&f++,i._inactive&&(h=!0),i=i.$parent;if(a.routerViewDepth=f,h)return u(p[c],a,o);var l=s.matched[f];if(!l)return p[c]=null,u();var d=p[c]=l.components[c];return a.registerRouteInstance=function(t,e){var n=l.instances[c];(e&&n!==t||!e&&n===t)&&(l.instances[c]=e)},(a.hook||(a.hook={})).prepatch=function(t,e){l.instances[c]=e.componentInstance},a.props=n(s,l.props&&l.props[c]),u(d,a,o)}},_t=/[!'()*]/g,Tt=function(t){return"%"+t.charCodeAt(0).toString(16)},$t=/%2C/g,St=function(t){return encodeURIComponent(t).replace(_t,Tt).replace($t,",")},qt=decodeURIComponent,Lt=/\/?$/,Pt=a(null,{path:"/"}),Ut=[String,Object],Vt=[String,Array],Ht={name:"router-link",props:{to:{type:Ut,required:!0},tag:{type:String,"default":"a"},exact:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,event:{type:Vt,"default":"click"}},render:function(t){var e=this,n=this.$router,r=this.$route,o=n.resolve(this.to,r,this.append),i=o.location,u=o.route,c=o.href,p={},h=n.options.linkActiveClass,y=n.options.linkExactActiveClass,v=null==h?"router-link-active":h,m=null==y?"router-link-exact-active":y,g=null==this.activeClass?v:this.activeClass,b=null==this.exactActiveClass?m:this.exactActiveClass,w=i.path?a(null,i,null,n):u;p[b]=s(r,w),p[g]=this.exact?p[b]:f(r,w);var x=function(t){l(t)&&(e.replace?n.replace(i):n.push(i))},k={click:l};Array.isArray(this.event)?this.event.forEach(function(t){k[t]=x}):k[this.event]=x;var R={"class":p};if("a"===this.tag)R.on=k,R.attrs={href:c};else{var E=d(this.$slots["default"]);if(E){E.isStatic=!1;var O=jt.util.extend,C=E.data=O({},E.data);C.on=k;var j=E.data.attrs=O({},E.data.attrs);j.href=c}else R.on=k}return t(this.tag,R,this.$slots["default"])}},It="undefined"!=typeof window,Mt=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},zt=S,Bt=b,Dt=w,Ft=R,Nt=$,Jt=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");zt.parse=Bt,zt.compile=Dt,zt.tokensToFunction=Ft,zt.tokensToRegExp=Nt;var Kt=Object.create(null),Qt=Object.create(null),Wt=It&&function(){var t=window.navigator.userAgent;return(t.indexOf("Android 2.")===-1&&t.indexOf("Android 4.0")===-1||t.indexOf("Mobile Safari")===-1||t.indexOf("Chrome")!==-1||t.indexOf("Windows Phone")!==-1)&&(window.history&&"pushState"in window.history)}(),Xt=It&&window.performance&&window.performance.now?window.performance:Date,Yt=G(),Gt=function(t,e){this.router=t,this.base=ot(e),this.current=Pt,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[]};Gt.prototype.listen=function(t){this.cb=t},Gt.prototype.onReady=function(t,e){this.ready?t():(this.readyCbs.push(t),e&&this.readyErrorCbs.push(e))},Gt.prototype.onError=function(t){this.errorCbs.push(t)},Gt.prototype.transitionTo=function(t,e,n){var r=this,o=this.router.match(t,this.current);this.confirmTransition(o,function(){r.updateRoute(o),e&&e(o),r.ensureURL(),r.ready||(r.ready=!0,r.readyCbs.forEach(function(t){t(o)}))},function(t){n&&n(t),t&&!r.ready&&(r.ready=!0,r.readyErrorCbs.forEach(function(e){e(t)}))})},Gt.prototype.confirmTransition=function(t,n,r){var o=this,i=this.current,a=function(t){gt(t)&&(o.errorCbs.length?o.errorCbs.forEach(function(e){e(t)}):(e(!1,"uncaught error during route navigation:"),console.error(t))),r&&r(t)};if(s(t,i)&&t.matched.length===i.matched.length)return this.ensureURL(),a();var u=it(this.current.matched,t.matched),c=u.updated,p=u.deactivated,f=u.activated,h=[].concat(ct(p),this.router.beforeHooks,st(c),f.map(function(t){return t.beforeEnter}),dt(f));this.pending=t;var l=function(e,n){if(o.pending!==t)return a();try{e(t,i,function(t){t===!1||gt(t)?(o.ensureURL(!0),a(t)):"string"==typeof t||"object"==typeof t&&("string"==typeof t.path||"string"==typeof t.name)?(a(),"object"==typeof t&&t.replace?o.replace(t):o.push(t)):n(t)})}catch(r){a(r)}};rt(h,l,function(){var e=[],r=function(){return o.current===t},i=ft(f,e,r),u=i.concat(o.router.resolveHooks);rt(u,l,function(){return o.pending!==t?a():(o.pending=null,n(t),void(o.router.app&&o.router.app.$nextTick(function(){e.forEach(function(t){t()})})))})})},Gt.prototype.updateRoute=function(t){var e=this.current;this.current=t,this.cb&&this.cb(t),this.router.afterHooks.forEach(function(n){n&&n(t,e)})};var Zt=function(t){function e(e,n){var r=this;t.call(this,e,n);var o=e.options.scrollBehavior;o&&D(),window.addEventListener("popstate",function(t){var n=r.current;r.transitionTo(bt(r.base),function(t){o&&F(e,t,n,!0)})})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.go=function(t){window.history.go(t)},e.prototype.push=function(t,e,n){var r=this,o=this,i=o.current;this.transitionTo(t,function(t){et(g(r.base+t.fullPath)),F(r.router,t,i,!1),e&&e(t)},n)},e.prototype.replace=function(t,e,n){var r=this,o=this,i=o.current;this.transitionTo(t,function(t){nt(g(r.base+t.fullPath)),F(r.router,t,i,!1),e&&e(t)},n)},e.prototype.ensureURL=function(t){if(bt(this.base)!==this.current.fullPath){var e=g(this.base+this.current.fullPath);t?et(e):nt(e)}},e.prototype.getCurrentLocation=function(){return bt(this.base)},e}(Gt),te=function(t){function e(e,n,r){t.call(this,e,n),r&&wt(this.base)||xt()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;window.addEventListener("hashchange",function(){xt()&&t.transitionTo(kt(),function(t){Et(t.fullPath)})})},e.prototype.push=function(t,e,n){this.transitionTo(t,function(t){Rt(t.fullPath),e&&e(t)},n)},e.prototype.replace=function(t,e,n){this.transitionTo(t,function(t){Et(t.fullPath),e&&e(t)},n)},e.prototype.go=function(t){window.history.go(t)},e.prototype.ensureURL=function(t){var e=this.current.fullPath;kt()!==e&&(t?Rt(e):Et(e))},e.prototype.getCurrentLocation=function(){return kt()},e}(Gt),ee=function(t){function e(e,n){t.call(this,e,n),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(t,e,n){var r=this;this.transitionTo(t,function(t){r.stack=r.stack.slice(0,r.index+1).concat(t),r.index++,e&&e(t)},n)},e.prototype.replace=function(t,e,n){var r=this;this.transitionTo(t,function(t){r.stack=r.stack.slice(0,r.index).concat(t),e&&e(t)},n)},e.prototype.go=function(t){var e=this,n=this.index+t;if(!(n<0||n>=this.stack.length)){var r=this.stack[n];this.confirmTransition(r,function(){e.index=n,e.updateRoute(r)})}},e.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},e.prototype.ensureURL=function(){},e}(Gt),ne=function(e){void 0===e&&(e={}),this.app=null,this.apps=[],this.options=e,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=M(e.routes||[],this);var n=e.mode||"hash";switch(this.fallback="history"===n&&!Wt&&e.fallback!==!1,this.fallback&&(n="hash"),It||(n="abstract"),this.mode=n,n){case"history":this.history=new Zt(this,e.base);break;case"hash":this.history=new te(this,e.base,this.fallback);break;case"abstract":this.history=new ee(this,e.base);break;default:t(!1,"invalid mode: "+n)}},re={currentRoute:{}};return ne.prototype.match=function(t,e,n){return this.matcher.match(t,e,n)},re.currentRoute.get=function(){return this.history&&this.history.current},ne.prototype.init=function(e){var n=this;if(t(y.installed,"not installed. Make sure to call `Vue.use(VueRouter)` before creating root instance."),this.apps.push(e),!this.app){this.app=e;var r=this.history;if(r instanceof Zt)r.transitionTo(r.getCurrentLocation());else if(r instanceof te){var o=function(){r.setupListeners()};r.transitionTo(r.getCurrentLocation(),o,o)}r.listen(function(t){n.apps.forEach(function(e){e._route=t})})}},ne.prototype.beforeEach=function(t){return Ot(this.beforeHooks,t)},ne.prototype.beforeResolve=function(t){return Ot(this.resolveHooks,t)},ne.prototype.afterEach=function(t){return Ot(this.afterHooks,t)},ne.prototype.onReady=function(t,e){this.history.onReady(t,e)},ne.prototype.onError=function(t){this.history.onError(t)},ne.prototype.push=function(t,e,n){this.history.push(t,e,n)},ne.prototype.replace=function(t,e,n){this.history.replace(t,e,n)},ne.prototype.go=function(t){this.history.go(t)},ne.prototype.back=function(){this.go(-1)},ne.prototype.forward=function(){this.go(1)},ne.prototype.getMatchedComponents=function(t){var e=t?t.matched?t:this.resolve(t).route:this.currentRoute;return e?[].concat.apply([],e.matched.map(function(t){return Object.keys(t.components).map(function(e){return t.components[e]})})):[]},ne.prototype.resolve=function(t,e,n){var r=H(t,e||this.history.current,n,this),o=this.match(r,e),i=o.redirectedFrom||o.fullPath,a=this.history.base,u=Ct(a,i,this.mode);return{location:r,route:o,href:u,normalizedTo:r,resolved:o}},ne.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==Pt&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(ne.prototype,re),ne.install=y,ne.version="2.6.0",It&&window.Vue&&window.Vue.use(ne),ne});