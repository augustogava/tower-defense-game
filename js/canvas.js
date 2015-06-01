function Canvas( ){
	this.winW = 630;
	this.winH = 460;
	
	this.viewW = 630;
	this.viewH = 460;
}

Canvas.prototype.getCanvas = function( c ) {
	return  document.getElementById("myCanvas");
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
