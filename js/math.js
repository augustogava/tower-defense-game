function MathI(){

}

MathI.prototype.convertToRadians = function(degree) {
	return degree*(Math.PI/180);
}

MathI.prototype.convertToDegrees = function(radians) {
	return radians*(180/Math.PI);
}

MathI.prototype.getCatetoOposto = function( ang, hipo) {
	return Math.sin(ang) * hipo;
}

MathI.prototype.getCatetoAdj = function( ang, hipo) {
	return Math.cos(ang) * hipo;
}

MathI.prototype.magnitude = function( x, y) {
	return Math.sqrt( (x*x) + (y*y) )
}

/**
produto escalar
*/
MathI.prototype.dot = function( x1, y1, x2, y2) {
	return x1 * x2 + y1 * y2;
}

MathI.prototype.normalize = function( x, y) {
	return { x: x/x, y: y/y, z: 0};
}

MathI.prototype.toVetor = function( x1, y1, x2, y2 ) {
	return { x: x2-x1, y: y2-y1};
}

MathI.prototype.angulo = function( a, b ) {
	var t = Math.atan2( b.y - a.y, b.x - a.x ); 
	var d = this.convertToDegrees(t);
	
	if( d < 0){
		d = ( 180 - Math.abs( d ) )+ 180;
	}
	
	return d ;
}

MathI.prototype.anguloVector = function( a, b ) {
	var t = Math.atan2( b,a ); 
	//var d = this.convertToDegrees(t);

	return t;
}
