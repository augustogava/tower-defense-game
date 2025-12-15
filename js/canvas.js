function Canvas( ){
	this.winW = 630;
	this.winH = 460;
	
	this.viewW = 630;
	this.viewH = 460;
	
	this.scaleRatio = 1;
	this.offsetX = 0;
	this.offsetY = 0;
}

Canvas.prototype.getCanvas = function( c ) {
	return  document.getElementById("myCanvas");
}

Canvas.prototype.getEffectsCanvas = function() {
	return document.getElementById("effects");
}

Canvas.prototype.fullSize = function( c ) {
	
	if (document.body && document.body.offsetWidth) {
		this.winW = document.body.offsetWidth;
		this.winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
		this.winW = document.documentElement.offsetWidth;
		this.winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		this.winW = window.innerWidth;
		this.winH = window.innerHeight;
	}
	
	this.winW -= 10
	this.winH -= 17
	
	viewW = this.winW
	viewH = this.winH
	
	c.width = this.winW;
	c.height = this.winH;

}

Canvas.prototype.resizeCanvas = function() {
	var mainCanvas = this.getCanvas();
	var effectsCanvas = this.getEffectsCanvas();
	var intro = document.getElementById('intro');
	var ui = document.getElementById('ui');
	var endgame = document.getElementById('endgame');
	var about = document.getElementById('about');
	var sorry = document.getElementById('sorry');
	
	if (!mainCanvas || !effectsCanvas) return;
	
	var baseWidth = ResponsiveConfig.BASE_WIDTH;
	var baseHeight = ResponsiveConfig.BASE_HEIGHT;
	var uiHeight = ResponsiveConfig.UI_HEIGHT;
	var totalHeight = baseHeight + uiHeight;
	
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	
	var scaleX = windowWidth / baseWidth;
	var scaleY = windowHeight / totalHeight;
	
	this.scaleRatio = Math.min(scaleX, scaleY);
	
	var scaledWidth = baseWidth * this.scaleRatio;
	var scaledHeight = baseHeight * this.scaleRatio;
	
	this.offsetX = (windowWidth - scaledWidth) / 2;
	this.offsetY = 0;
	
	var cssScale = 'scale(' + this.scaleRatio + ')';
	var leftPos = this.offsetX + 'px';
	
	mainCanvas.style.transform = cssScale;
	mainCanvas.style.transformOrigin = 'top left';
	mainCanvas.style.left = leftPos;
	mainCanvas.style.top = '0';
	
	effectsCanvas.style.transform = cssScale;
	effectsCanvas.style.transformOrigin = 'top left';
	effectsCanvas.style.left = leftPos;
	effectsCanvas.style.top = '0';
	
	if (intro) {
		intro.style.transform = cssScale;
		intro.style.transformOrigin = 'top left';
		intro.style.left = leftPos;
		intro.style.top = '0';
	}
	
	if (ui) {
		ui.style.top = (scaledHeight) + 'px';
		ui.style.left = leftPos;
		ui.style.transform = cssScale;
		ui.style.transformOrigin = 'top left';
	}
	
	if (endgame) {
		endgame.style.transform = cssScale;
		endgame.style.transformOrigin = 'top left';
		endgame.style.left = leftPos;
		endgame.style.top = '0';
	}
	
	if (about) {
		about.style.transform = cssScale;
		about.style.transformOrigin = 'top left';
		about.style.left = leftPos;
		about.style.top = '0';
	}
	
	if (sorry) {
		sorry.style.transform = cssScale;
		sorry.style.transformOrigin = 'top left';
		sorry.style.left = leftPos;
		sorry.style.top = '0';
	}
	
	console.log('Canvas resized - Scale:', this.scaleRatio.toFixed(2), 'Offset:', this.offsetX.toFixed(0));
}

Canvas.prototype.getScaledCoordinates = function(clientX, clientY) {
	var x = (clientX - this.offsetX) / this.scaleRatio;
	var y = (clientY - this.offsetY) / this.scaleRatio;
	
	return { x: x, y: y };
}
