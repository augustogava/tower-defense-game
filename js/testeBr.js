var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

function testCSS(prop) {
    return prop in document.documentElement.style;
}
document.write('isFirefox: ' + isFirefox + '<br>');
document.write('isChrome: ' + isChrome + '<br>');
document.write('isSafari: ' + isSafari + '<br>');
document.write('isOpera: ' + isOpera + '<br>');
document.write('isIE: ' + isIE + '<br>');