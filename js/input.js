var key=[0,0,0,0,0];

var IE = document.all?true:false

function Input(){

}

Input.prototype.addKeyListener = function( ) {
	document.onkeydown=function(e){ changeKey((e||window.event).keyCode, 1);}
	document.onkeyup=function(e){  changeKey((e||window.event).keyCode, 0);}
}

function changeKey( which, to ) {
	 
	switch (which){
		case 65: case 37: key[0]=to; break;
		case 87: case 38: key[2]=to; break;
		case 68: case 39: key[1]=to; break;
		case 83: case 40: key[3]=to; break;
	}
	
}

Input.prototype.getMouseCoordinates = function(event, canvas) {
	if (!canvas || typeof canvas.getScaledCoordinates !== 'function') {
		return {
			x: event.clientX,
			y: event.clientY
		};
	}
	
	return canvas.getScaledCoordinates(event.clientX, event.clientY);
}

Input.prototype.addTouchSupport = function(canvas) {
	var mainCanvas = canvas.getCanvas();
	var effectsCanvas = canvas.getEffectsCanvas();
	
	if (!mainCanvas || !effectsCanvas) return;
	
	var handleTouch = function(e) {
		if (e.touches && e.touches.length > 0) {
			var touch = e.touches[0];
			var coords = canvas.getScaledCoordinates(touch.clientX, touch.clientY);
			mouseXpos = coords.x;
			mouseYpos = coords.y;
		}
	};
	
	var handleTouchEnd = function(e) {
		if (e.changedTouches && e.changedTouches.length > 0) {
			var touch = e.changedTouches[0];
			var coords = canvas.getScaledCoordinates(touch.clientX, touch.clientY);
			mouseXpos = coords.x;
			mouseYpos = coords.y;
		}
	};
	
	mainCanvas.addEventListener('touchstart', handleTouch, { passive: true });
	mainCanvas.addEventListener('touchmove', handleTouch, { passive: true });
	mainCanvas.addEventListener('touchend', handleTouchEnd, { passive: true });
	effectsCanvas.addEventListener('touchstart', handleTouch, { passive: true });
	effectsCanvas.addEventListener('touchmove', handleTouch, { passive: true });
	effectsCanvas.addEventListener('touchend', handleTouchEnd, { passive: true });
	
	console.log('Touch support enabled');
}
