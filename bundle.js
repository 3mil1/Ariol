// // Utility function
// function Util () {};

// /* 
// 	class manipulation functions
// */
// Util.hasClass = function(el, className) {
// 	if (el.classList) return el.classList.contains(className);
// 	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
// };

// Util.addClass = function(el, className) {
// 	var classList = className.split(' ');
//  	if (el.classList) el.classList.add(classList[0]);
//  	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
//  	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
// };

// Util.removeClass = function(el, className) {
// 	var classList = className.split(' ');
// 	if (el.classList) el.classList.remove(classList[0]);	
// 	else if(Util.hasClass(el, classList[0])) {
// 		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
// 		el.className=el.className.replace(reg, ' ');
// 	}
// 	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
// };

// Util.toggleClass = function(el, className, bool) {
// 	if(bool) Util.addClass(el, className);
// 	else Util.removeClass(el, className);
// };

// Util.setAttributes = function(el, attrs) {
//   for(var key in attrs) {
//     el.setAttribute(key, attrs[key]);
//   }
// };

// /* 
//   DOM manipulation
// */
// Util.getChildrenByClassName = function(el, className) {
//   var children = el.children,
//     childrenByClass = [];
//   for (var i = 0; i < el.children.length; i++) {
//     if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
//   }
//   return childrenByClass;
// };

// Util.is = function(elem, selector) {
//   if(selector.nodeType){
//     return elem === selector;
//   }

//   var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
//     length = qa.length,
//     returnArr = [];

//   while(length--){
//     if(qa[length] === elem){
//       return true;
//     }
//   }

//   return false;
// };

// /* 
// 	Animate height of an element
// */
// Util.setHeight = function(start, to, element, duration, cb) {
// 	var change = to - start,
// 	    currentTime = null;

//   var animateHeight = function(timestamp){  
//     if (!currentTime) currentTime = timestamp;         
//     var progress = timestamp - currentTime;
//     var val = parseInt((progress/duration)*change + start);
//     element.style.height = val+"px";
//     if(progress < duration) {
//         window.requestAnimationFrame(animateHeight);
//     } else {
//     	cb();
//     }
//   };
  
//   //set the height of the element before starting animation -> fix bug on Safari
//   element.style.height = start+"px";
//   window.requestAnimationFrame(animateHeight);
// };

// /* 
// 	Smooth Scroll
// */

// Util.scrollTo = function(final, duration, cb, scrollEl) {
//   var element = scrollEl || window;
//   var start = element.scrollTop || document.documentElement.scrollTop,
//     currentTime = null;

//   if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;
      
//   var animateScroll = function(timestamp){
//   	if (!currentTime) currentTime = timestamp;        
//     var progress = timestamp - currentTime;
//     if(progress > duration) progress = duration;
//     var val = Math.easeInOutQuad(progress, start, final-start, duration);
//     element.scrollTo(0, val);
//     if(progress < duration) {
//         window.requestAnimationFrame(animateScroll);
//     } else {
//       cb && cb();
//     }
//   };

//   window.requestAnimationFrame(animateScroll);
// };

// /* 
//   Focus utility classes
// */

// //Move focus to an element
// Util.moveFocus = function (element) {
//   if( !element ) element = document.getElementsByTagName("body")[0];
//   element.focus();
//   if (document.activeElement !== element) {
//     element.setAttribute('tabindex','-1');
//     element.focus();
//   }
// };

// /* 
//   Misc
// */

// Util.getIndexInArray = function(array, el) {
//   return Array.prototype.indexOf.call(array, el);
// };

// Util.cssSupports = function(property, value) {
//   if('CSS' in window) {
//     return CSS.supports(property, value);
//   } else {
//     var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
//     return jsProperty in document.body.style;
//   }
// };

// // merge a set of user options into plugin defaults
// // https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
// Util.extend = function() {
//   // Variables
//   var extended = {};
//   var deep = false;
//   var i = 0;
//   var length = arguments.length;

//   // Check if a deep merge
//   if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
//     deep = arguments[0];
//     i++;
//   }

//   // Merge the object into the extended object
//   var merge = function (obj) {
//     for ( var prop in obj ) {
//       if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
//         // If deep merge and property is an object, merge properties
//         if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
//           extended[prop] = extend( true, extended[prop], obj[prop] );
//         } else {
//           extended[prop] = obj[prop];
//         }
//       }
//     }
//   };

//   // Loop through each object and conduct a merge
//   for ( ; i < length; i++ ) {
//     var obj = arguments[i];
//     merge(obj);
//   }

//   return extended;
// };

// // Check if Reduced Motion is enabled
// Util.osHasReducedMotion = function() {
//   if(!window.matchMedia) return false;
//   var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
//   if(matchMediaObj) return matchMediaObj.matches;
//   return false; // return false if not supported
// }; 

// /* 
// 	Polyfills
// */
// //Closest() method
// if (!Element.prototype.matches) {
// 	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
// }

// if (!Element.prototype.closest) {
// 	Element.prototype.closest = function(s) {
// 		var el = this;
// 		if (!document.documentElement.contains(el)) return null;
// 		do {
// 			if (el.matches(s)) return el;
// 			el = el.parentElement || el.parentNode;
// 		} while (el !== null && el.nodeType === 1); 
// 		return null;
// 	};
// }

// //Custom Event() constructor
// if ( typeof window.CustomEvent !== "function" ) {

//   function CustomEvent ( event, params ) {
//     params = params || { bubbles: false, cancelable: false, detail: undefined };
//     var evt = document.createEvent( 'CustomEvent' );
//     evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
//     return evt;
//    }

//   CustomEvent.prototype = window.Event.prototype;

//   window.CustomEvent = CustomEvent;
// }

// /* 
// 	Animation curves
// */
// Math.easeInOutQuad = function (t, b, c, d) {
// 	t /= d/2;
// 	if (t < 1) return c/2*t*t + b;
// 	t--;
// 	return -c/2 * (t*(t-2) - 1) + b;
// };

// Math.easeInQuart = function (t, b, c, d) {
// 	t /= d;
// 	return c*t*t*t*t + b;
// };

// Math.easeOutQuart = function (t, b, c, d) { 
//   t /= d;
// 	t--;
// 	return -c * (t*t*t*t - 1) + b;
// };

// Math.easeInOutQuart = function (t, b, c, d) {
// 	t /= d/2;
// 	if (t < 1) return c/2*t*t*t*t + b;
// 	t -= 2;
// 	return -c/2 * (t*t*t*t - 2) + b;
// };

// Math.easeOutElastic = function (t, b, c, d) {
//   var s=1.70158;var p=d*0.7;var a=c;
//   if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
//   if (a < Math.abs(c)) { a=c; var s=p/4; }
//   else var s = p/(2*Math.PI) * Math.asin (c/a);
//   return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
// };


// /* JS Utility Classes */
// (function() {
//   // make focus ring visible only for keyboard navigation (i.e., tab key) 
//   var focusTab = document.getElementsByClassName('js-tab-focus');
//   function detectClick() {
//     if(focusTab.length > 0) {
//       resetFocusTabs(false);
//       window.addEventListener('keydown', detectTab);
//     }
//     window.removeEventListener('mousedown', detectClick);
//   };

//   function detectTab(event) {
//     if(event.keyCode !== 9) return;
//     resetFocusTabs(true);
//     window.removeEventListener('keydown', detectTab);
//     window.addEventListener('mousedown', detectClick);
//   };

//   function resetFocusTabs(bool) {
//     var outlineStyle = bool ? '' : 'none';
//     for(var i = 0; i < focusTab.length; i++) {
//       focusTab[i].style.setProperty('outline', outlineStyle);
//     }
//   };
//   window.addEventListener('mousedown', detectClick);
// }());




// // File#: _1_parallax-image
// // Usage: codyhouse.co/license
// (function() {
//   var ParallaxImg = function(element, rotationLevel) {
//     this.element = element;
//     this.figure = this.element.getElementsByClassName('js-parallax-img__assets')[0];
//     this.imgs = this.element.getElementsByTagName('img');
//     this.maxRotation = rotationLevel || 2; // rotate level
//     if(this.maxRotation > 5) this.maxRotation = 5;
//     this.scale = 1;
//     this.animating = false;
//     initParallax(this);
//     initParallaxEvents(this);
//   };

//   function initParallax(element) {
//     element.count = 0;
//     window.requestAnimationFrame(checkImageLoaded.bind(element));
//     for(var i = 0; i < element.imgs.length; i++) {(function(i){
//       var loaded = false;
//       element.imgs[i].addEventListener('load', function(){
//         if(loaded) return;
//         element.count = element.count + 1;
//       });
//       if(element.imgs[i].complete && !loaded) {
//         loaded = true;
//         element.count = element.count + 1;
//       }
//     })(i);}
//   };

//   function checkImageLoaded() {
//     if(this.count >= this.imgs.length) {
//       initScale(this);
//       if(this.loaded) {
//         window.cancelAnimationFrame(this.loaded);
//         this.loaded = false;
//       }
//     } else {
//       this.loaded = window.requestAnimationFrame(checkImageLoaded.bind(this));
//     }
//   };

//   function initScale(element) {
//     var maxImgResize = getMaxScale(element);
//     element.scale = maxImgResize/(Math.sin(Math.PI / 2 - element.maxRotation*Math.PI/180));
//     element.figure.style.transform = 'scale('+element.scale+')';  
//     Util.addClass(element.element, 'parallax-img--loaded');  
//   };

//   function getMaxScale(element) {
//     var minWidth = 0;
//     var maxWidth = 0;
//     for(var i = 0; i < element.imgs.length; i++) {
//       var width = element.imgs[i].getBoundingClientRect().width;
//       if(width < minWidth || i == 0 ) minWidth = width;
//       if(width > maxWidth || i == 0 ) maxWidth = width;
//     }
//     var scale = Math.ceil(10*maxWidth/minWidth)/10;
//     if(scale < 1.1) scale = 1.1;
//     return scale;
//   }

//   function initParallaxEvents(element) {
//     element.element.addEventListener('mousemove', function(event){
//       if(element.animating) return;
//       element.animating = true;
//       window.requestAnimationFrame(moveImage.bind(element, event));
//     });
//   };

//   function moveImage(event, timestamp) {
//     var wrapperPosition = this.element.getBoundingClientRect();
//     var rotateY = 2*(this.maxRotation/wrapperPosition.width)*(wrapperPosition.left - event.clientX + wrapperPosition.width/2);
//     var rotateX = 2*(this.maxRotation/wrapperPosition.height)*(event.clientY - wrapperPosition.top - wrapperPosition.height/2);

//     if(rotateY > this.maxRotation) rotateY = this.maxRotation;
//     if(rotateY < -1*this.maxRotation) rotateY = -this.maxRotation;
//     if(rotateX > this.maxRotation) rotateX = this.maxRotation;
//     if(rotateX < -1*this.maxRotation) rotateX = -this.maxRotation;
//     this.figure.style.transform = 'scale('+this.scale+') rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';
//     this.animating = false;
//   };

//   window.ParallaxImg = ParallaxImg;

//   //initialize the ParallaxImg objects
//   var parallaxImgs = document.getElementsByClassName('js-parallax-img');
//   if( parallaxImgs.length > 0 && Util.cssSupports('transform', 'translateZ(0px)')) {
//     for( var i = 0; i < parallaxImgs.length; i++) {
//       (function(i){
//         var rotationLevel = parallaxImgs[i].getAttribute('data-perspective');
//         new ParallaxImg(parallaxImgs[i], rotationLevel);
//       })(i);
//     }
//   };
// }());


/* Disable minification (remove `.min` from URL path) for more info */

(function(self, undefined) {!function(t){"use strict";function e(t){switch(typeof t){case"undefined":return"undefined";case"boolean":return"boolean";case"number":return"number";case"string":return"string";default:return null===t?"null":"object"}}function r(t){return Object.prototype.toString.call(t).replace(/^\[object *|\]$/g,"")}function n(t){return"function"==typeof t}function o(t){if(null===t||t===B)throw TypeError();return Object(t)}function i(t){return t>>0}function f(t){return t>>>0}function u(e){if(!("TYPED_ARRAY_POLYFILL_NO_ARRAY_ACCESSORS"in t)){if(e.length>N)throw RangeError("Array too large for polyfill");var r;for(r=0;r<e.length;r+=1)!function n(t){Object.defineProperty(e,t,{get:function(){return e._getter(t)},set:function(r){e._setter(t,r)},enumerable:!0,configurable:!1})}(r)}}function a(t,e){var r=32-e;return t<<r>>r}function h(t,e){var r=32-e;return t<<r>>>r}function y(t){return[255&t]}function s(t){return a(t[0],8)}function l(t){return[255&t]}function p(t){return h(t[0],8)}function c(t){return t=x(Number(t)),[t<0?0:t>255?255:255&t]}function b(t){return[255&t,t>>8&255]}function g(t){return a(t[1]<<8|t[0],16)}function E(t){return[255&t,t>>8&255]}function v(t){return h(t[1]<<8|t[0],16)}function _(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function O(t){return a(t[3]<<24|t[2]<<16|t[1]<<8|t[0],32)}function d(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function j(t){return h(t[3]<<24|t[2]<<16|t[1]<<8|t[0],32)}function P(t,e,r){function n(t){var e=m(t),r=t-e;return r<.5?e:r>.5?e+1:e%2?e+1:e}var o,i,f,u=(1<<e-1)-1;if(t!==t)i=(1<<e)-1,f=F(2,r-1),o=0;else if(t===Infinity||t===-Infinity)i=(1<<e)-1,f=0,o=t<0?1:0;else if(0===t)i=0,f=0,o=1/t==-Infinity?1:0;else if(o=t<0,(t=M(t))>=F(2,1-u)){i=Y(m(I(t)/S),1023);var a=t/F(2,i);a<1&&(i-=1,a*=2),a>=2&&(i+=1,a/=2);var h=F(2,r);f=n(a*h)-h,i+=u,f/h>=1&&(i+=1,f=0),i>2*u&&(i=(1<<e)-1,f=0)}else i=0,f=n(t/F(2,1-u-r));var y,s=[];for(y=r;y;y-=1)s.push(f%2?1:0),f=m(f/2);for(y=e;y;y-=1)s.push(i%2?1:0),i=m(i/2);s.push(o?1:0),s.reverse();for(var l=s.join(""),p=[];l.length;)p.unshift(parseInt(l.substring(0,8),2)),l=l.substring(8);return p}function T(t,e,r){var n,o,i,f,u,a,h,y,s=[];for(n=0;n<t.length;++n)for(i=t[n],o=8;o;o-=1)s.push(i%2?1:0),i>>=1;return s.reverse(),f=s.join(""),u=(1<<e-1)-1,a=parseInt(f.substring(0,1),2)?-1:1,h=parseInt(f.substring(1,1+e),2),y=parseInt(f.substring(1+e),2),h===(1<<e)-1?0!==y?NaN:a*Infinity:h>0?a*F(2,h-u)*(1+y/F(2,r)):0!==y?a*F(2,-(u-1))*(y/F(2,r)):a<0?-0:0}function w(t){return T(t,11,52)}function A(t){return P(t,11,52)}function L(t){return T(t,8,23)}function R(t){return P(t,8,23)}var B=void 0,N=1e5,S=Math.LN2,M=Math.abs,m=Math.floor,I=Math.log,U=Math.max,Y=Math.min,F=Math.pow,x=Math.round;!function(){var t=Object.defineProperty,e=!function(){try{return Object.defineProperty({},"x",{})}catch(t){return!1}}();t&&!e||(Object.defineProperty=function(e,r,n){if(t)try{return t(e,r,n)}catch(o){}if(e!==Object(e))throw TypeError("Object.defineProperty called on non-object");return Object.prototype.__defineGetter__&&"get"in n&&Object.prototype.__defineGetter__.call(e,r,n.get),Object.prototype.__defineSetter__&&"set"in n&&Object.prototype.__defineSetter__.call(e,r,n.set),"value"in n&&(e[r]=n.value),e})}(),function(){function a(t){if((t=i(t))<0)throw RangeError("ArrayBuffer size is not a small enough positive integer.");Object.defineProperty(this,"byteLength",{value:t}),Object.defineProperty(this,"_bytes",{value:Array(t)});for(var e=0;e<t;e+=1)this._bytes[e]=0}function h(){if(!arguments.length||"object"!=typeof arguments[0])return function(t){if((t=i(t))<0)throw RangeError("length is not a small enough positive integer.");Object.defineProperty(this,"length",{value:t}),Object.defineProperty(this,"byteLength",{value:t*this.BYTES_PER_ELEMENT}),Object.defineProperty(this,"buffer",{value:new a(this.byteLength)}),Object.defineProperty(this,"byteOffset",{value:0})}.apply(this,arguments);if(arguments.length>=1&&"object"===e(arguments[0])&&arguments[0]instanceof h)return function(t){if(this.constructor!==t.constructor)throw TypeError();var e=t.length*this.BYTES_PER_ELEMENT;Object.defineProperty(this,"buffer",{value:new a(e)}),Object.defineProperty(this,"byteLength",{value:e}),Object.defineProperty(this,"byteOffset",{value:0}),Object.defineProperty(this,"length",{value:t.length});for(var r=0;r<this.length;r+=1)this._setter(r,t._getter(r))}.apply(this,arguments);if(arguments.length>=1&&"object"===e(arguments[0])&&!(arguments[0]instanceof h)&&!(arguments[0]instanceof a||"ArrayBuffer"===r(arguments[0])))return function(t){var e=t.length*this.BYTES_PER_ELEMENT;Object.defineProperty(this,"buffer",{value:new a(e)}),Object.defineProperty(this,"byteLength",{value:e}),Object.defineProperty(this,"byteOffset",{value:0}),Object.defineProperty(this,"length",{value:t.length});for(var r=0;r<this.length;r+=1){var n=t[r];this._setter(r,Number(n))}}.apply(this,arguments);if(arguments.length>=1&&"object"===e(arguments[0])&&(arguments[0]instanceof a||"ArrayBuffer"===r(arguments[0])))return function(t,e,r){if((e=f(e))>t.byteLength)throw RangeError("byteOffset out of range");if(e%this.BYTES_PER_ELEMENT)throw RangeError("buffer length minus the byteOffset is not a multiple of the element size.");if(r===B){var n=t.byteLength-e;if(n%this.BYTES_PER_ELEMENT)throw RangeError("length of buffer minus byteOffset not a multiple of the element size");r=n/this.BYTES_PER_ELEMENT}else r=f(r),n=r*this.BYTES_PER_ELEMENT;if(e+n>t.byteLength)throw RangeError("byteOffset and length reference an area beyond the end of the buffer");Object.defineProperty(this,"buffer",{value:t}),Object.defineProperty(this,"byteLength",{value:n}),Object.defineProperty(this,"byteOffset",{value:e}),Object.defineProperty(this,"length",{value:r})}.apply(this,arguments);throw TypeError()}function P(t,e,r){var n=function(){Object.defineProperty(this,"constructor",{value:n}),h.apply(this,arguments),u(this)};"__proto__"in n?n.__proto__=h:(n.from=h.from,n.of=h.of),n.BYTES_PER_ELEMENT=t;var o=function(){};return o.prototype=T,n.prototype=new o,Object.defineProperty(n.prototype,"BYTES_PER_ELEMENT",{value:t}),Object.defineProperty(n.prototype,"_pack",{value:e}),Object.defineProperty(n.prototype,"_unpack",{value:r}),n}t.ArrayBuffer=t.ArrayBuffer||a,Object.defineProperty(h,"from",{value:function(t){return new this(t)}}),Object.defineProperty(h,"of",{value:function(){return new this(arguments)}});var T={};h.prototype=T,Object.defineProperty(h.prototype,"_getter",{value:function(t){if(arguments.length<1)throw SyntaxError("Not enough arguments");if((t=f(t))>=this.length)return B;var e,r,n=[];for(e=0,r=this.byteOffset+t*this.BYTES_PER_ELEMENT;e<this.BYTES_PER_ELEMENT;e+=1,r+=1)n.push(this.buffer._bytes[r]);return this._unpack(n)}}),Object.defineProperty(h.prototype,"get",{value:h.prototype._getter}),Object.defineProperty(h.prototype,"_setter",{value:function(t,e){if(arguments.length<2)throw SyntaxError("Not enough arguments");if(!((t=f(t))>=this.length)){var r,n,o=this._pack(e);for(r=0,n=this.byteOffset+t*this.BYTES_PER_ELEMENT;r<this.BYTES_PER_ELEMENT;r+=1,n+=1)this.buffer._bytes[n]=o[r]}}}),Object.defineProperty(h.prototype,"constructor",{value:h}),Object.defineProperty(h.prototype,"copyWithin",{value:function(t,e){var r=arguments[2],n=o(this),u=n.length,a=f(u);a=U(a,0);var h,y=i(t);h=y<0?U(a+y,0):Y(y,a);var s,l=i(e);s=l<0?U(a+l,0):Y(l,a);var p;p=r===B?a:i(r);var c;c=p<0?U(a+p,0):Y(p,a);var b,g=Y(c-s,a-h);for(s<h&&h<s+g?(b=-1,s=s+g-1,h=h+g-1):b=1;g>0;)n._setter(h,n._getter(s)),s+=b,h+=b,g-=1;return n}}),Object.defineProperty(h.prototype,"every",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(!n(t))throw TypeError();for(var o=arguments[1],i=0;i<r;i++)if(!t.call(o,e._getter(i),i,e))return!1;return!0}}),Object.defineProperty(h.prototype,"fill",{value:function(t){var e=arguments[1],r=arguments[2],n=o(this),u=n.length,a=f(u);a=U(a,0);var h,y=i(e);h=y<0?U(a+y,0):Y(y,a);var s;s=r===B?a:i(r);var l;for(l=s<0?U(a+s,0):Y(s,a);h<l;)n._setter(h,t),h+=1;return n}}),Object.defineProperty(h.prototype,"filter",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(!n(t))throw TypeError();for(var o=[],i=arguments[1],u=0;u<r;u++){var a=e._getter(u);t.call(i,a,u,e)&&o.push(a)}return new this.constructor(o)}}),Object.defineProperty(h.prototype,"find",{value:function(t){var e=o(this),r=e.length,i=f(r);if(!n(t))throw TypeError();for(var u=arguments.length>1?arguments[1]:B,a=0;a<i;){var h=e._getter(a),y=t.call(u,h,a,e);if(Boolean(y))return h;++a}return B}}),Object.defineProperty(h.prototype,"findIndex",{value:function(t){var e=o(this),r=e.length,i=f(r);if(!n(t))throw TypeError();for(var u=arguments.length>1?arguments[1]:B,a=0;a<i;){var h=e._getter(a),y=t.call(u,h,a,e);if(Boolean(y))return a;++a}return-1}}),Object.defineProperty(h.prototype,"forEach",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(!n(t))throw TypeError();for(var o=arguments[1],i=0;i<r;i++)t.call(o,e._getter(i),i,e)}}),Object.defineProperty(h.prototype,"indexOf",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(0===r)return-1;var n=0;if(arguments.length>0&&(n=Number(arguments[1]),n!==n?n=0:0!==n&&n!==1/0&&n!==-1/0&&(n=(n>0||-1)*m(M(n)))),n>=r)return-1;for(var o=n>=0?n:U(r-M(n),0);o<r;o++)if(e._getter(o)===t)return o;return-1}}),Object.defineProperty(h.prototype,"join",{value:function(t){if(this===B||null===this)throw TypeError();for(var e=Object(this),r=f(e.length),n=Array(r),o=0;o<r;++o)n[o]=e._getter(o);return n.join(t===B?",":t)}}),Object.defineProperty(h.prototype,"lastIndexOf",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(0===r)return-1;var n=r;arguments.length>1&&(n=Number(arguments[1]),n!==n?n=0:0!==n&&n!==1/0&&n!==-1/0&&(n=(n>0||-1)*m(M(n))));for(var o=n>=0?Y(n,r-1):r-M(n);o>=0;o--)if(e._getter(o)===t)return o;return-1}}),Object.defineProperty(h.prototype,"map",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(!n(t))throw TypeError();var o=[];o.length=r;for(var i=arguments[1],u=0;u<r;u++)o[u]=t.call(i,e._getter(u),u,e);return new this.constructor(o)}}),Object.defineProperty(h.prototype,"reduce",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(!n(t))throw TypeError();if(0===r&&1===arguments.length)throw TypeError();var o,i=0;for(o=arguments.length>=2?arguments[1]:e._getter(i++);i<r;)o=t.call(B,o,e._getter(i),i,e),i++;return o}}),Object.defineProperty(h.prototype,"reduceRight",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(!n(t))throw TypeError();if(0===r&&1===arguments.length)throw TypeError();var o,i=r-1;for(o=arguments.length>=2?arguments[1]:e._getter(i--);i>=0;)o=t.call(B,o,e._getter(i),i,e),i--;return o}}),Object.defineProperty(h.prototype,"reverse",{value:function(){if(this===B||null===this)throw TypeError();for(var t=Object(this),e=f(t.length),r=m(e/2),n=0,o=e-1;n<r;++n,--o){var i=t._getter(n);t._setter(n,t._getter(o)),t._setter(o,i)}return t}}),Object.defineProperty(h.prototype,"set",{value:function(t,e){if(arguments.length<1)throw SyntaxError("Not enough arguments");var r,n,o,i,u,a,h,y,s,l;if("object"==typeof arguments[0]&&arguments[0].constructor===this.constructor){if(r=arguments[0],(o=f(arguments[1]))+r.length>this.length)throw RangeError("Offset plus length of array is out of range");if(y=this.byteOffset+o*this.BYTES_PER_ELEMENT,s=r.length*this.BYTES_PER_ELEMENT,r.buffer===this.buffer){for(l=[],u=0,a=r.byteOffset;u<s;u+=1,a+=1)l[u]=r.buffer._bytes[a];for(u=0,h=y;u<s;u+=1,h+=1)this.buffer._bytes[h]=l[u]}else for(u=0,a=r.byteOffset,h=y;u<s;u+=1,a+=1,h+=1)this.buffer._bytes[h]=r.buffer._bytes[a]}else{if("object"!=typeof arguments[0]||"undefined"==typeof arguments[0].length)throw TypeError("Unexpected argument type(s)");if(n=arguments[0],i=f(n.length),(o=f(arguments[1]))+i>this.length)throw RangeError("Offset plus length of array is out of range");for(u=0;u<i;u+=1)a=n[u],this._setter(o+u,Number(a))}}}),Object.defineProperty(h.prototype,"slice",{value:function(t,e){for(var r=o(this),n=r.length,u=f(n),a=i(t),h=a<0?U(u+a,0):Y(a,u),y=e===B?u:i(e),s=y<0?U(u+y,0):Y(y,u),l=s-h,p=r.constructor,c=new p(l),b=0;h<s;){var g=r._getter(h);c._setter(b,g),++h,++b}return c}}),Object.defineProperty(h.prototype,"some",{value:function(t){if(this===B||null===this)throw TypeError();var e=Object(this),r=f(e.length);if(!n(t))throw TypeError();for(var o=arguments[1],i=0;i<r;i++)if(t.call(o,e._getter(i),i,e))return!0;return!1}}),Object.defineProperty(h.prototype,"sort",{value:function(t){function e(e,r){return e!==e&&r!==r?0:e!==e?1:r!==r?-1:t!==B?t(e,r):e<r?-1:e>r?1:0}if(this===B||null===this)throw TypeError();for(var r=Object(this),n=f(r.length),o=Array(n),i=0;i<n;++i)o[i]=r._getter(i);for(o.sort(e),i=0;i<n;++i)r._setter(i,o[i]);return r}}),Object.defineProperty(h.prototype,"subarray",{value:function(t,e){function r(t,e,r){return t<e?e:t>r?r:t}t=i(t),e=i(e),arguments.length<1&&(t=0),arguments.length<2&&(e=this.length),t<0&&(t=this.length+t),e<0&&(e=this.length+e),t=r(t,0,this.length),e=r(e,0,this.length);var n=e-t;return n<0&&(n=0),new this.constructor(this.buffer,this.byteOffset+t*this.BYTES_PER_ELEMENT,n)}});var N=P(1,y,s),S=P(1,l,p),I=P(1,c,p),F=P(2,b,g),x=P(2,E,v),k=P(4,_,O),C=P(4,d,j),z=P(4,R,L),D=P(8,A,w);t.Int8Array=t.Int8Array||N,t.Uint8Array=t.Uint8Array||S,t.Uint8ClampedArray=t.Uint8ClampedArray||I,t.Int16Array=t.Int16Array||F,t.Uint16Array=t.Uint16Array||x,t.Int32Array=t.Int32Array||k,t.Uint32Array=t.Uint32Array||C,t.Float32Array=t.Float32Array||z,t.Float64Array=t.Float64Array||D}(),function(){function e(t,e){return n(t.get)?t.get(e):t[e]}function o(t,e,n){if(!(t instanceof ArrayBuffer||"ArrayBuffer"===r(t)))throw TypeError();if((e=f(e))>t.byteLength)throw RangeError("byteOffset out of range");if(n=n===B?t.byteLength-e:f(n),e+n>t.byteLength)throw RangeError("byteOffset and length reference an area beyond the end of the buffer");Object.defineProperty(this,"buffer",{value:t}),Object.defineProperty(this,"byteLength",{value:n}),Object.defineProperty(this,"byteOffset",{value:e})}function i(t){return function r(n,o){if((n=f(n))+t.BYTES_PER_ELEMENT>this.byteLength)throw RangeError("Array index out of range");n+=this.byteOffset;for(var i=new Uint8Array(this.buffer,n,t.BYTES_PER_ELEMENT),u=[],h=0;h<t.BYTES_PER_ELEMENT;h+=1)u.push(e(i,h));return Boolean(o)===Boolean(a)&&u.reverse(),e(new t(new Uint8Array(u).buffer),0)}}function u(t){return function r(n,o,i){if((n=f(n))+t.BYTES_PER_ELEMENT>this.byteLength)throw RangeError("Array index out of range");var u,h,y=new t([o]),s=new Uint8Array(y.buffer),l=[];for(u=0;u<t.BYTES_PER_ELEMENT;u+=1)l.push(e(s,u));Boolean(i)===Boolean(a)&&l.reverse(),h=new Uint8Array(this.buffer,n,t.BYTES_PER_ELEMENT),h.set(l)}}var a=function(){var t=new Uint16Array([4660]);return 18===e(new Uint8Array(t.buffer),0)}();Object.defineProperty(o.prototype,"getUint8",{value:i(Uint8Array)}),Object.defineProperty(o.prototype,"getInt8",{value:i(Int8Array)}),Object.defineProperty(o.prototype,"getUint16",{value:i(Uint16Array)}),Object.defineProperty(o.prototype,"getInt16",{value:i(Int16Array)}),Object.defineProperty(o.prototype,"getUint32",{value:i(Uint32Array)}),Object.defineProperty(o.prototype,"getInt32",{value:i(Int32Array)}),Object.defineProperty(o.prototype,"getFloat32",{value:i(Float32Array)}),Object.defineProperty(o.prototype,"getFloat64",{value:i(Float64Array)}),Object.defineProperty(o.prototype,"setUint8",{value:u(Uint8Array)}),Object.defineProperty(o.prototype,"setInt8",{value:u(Int8Array)}),Object.defineProperty(o.prototype,"setUint16",{value:u(Uint16Array)}),Object.defineProperty(o.prototype,"setInt16",{value:u(Int16Array)}),Object.defineProperty(o.prototype,"setUint32",{value:u(Uint32Array)}),Object.defineProperty(o.prototype,"setInt32",{value:u(Int32Array)}),Object.defineProperty(o.prototype,"setFloat32",{value:u(Float32Array)}),Object.defineProperty(o.prototype,"setFloat64",{value:u(Float64Array)}),t.DataView=t.DataView||o}()}(self);})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});