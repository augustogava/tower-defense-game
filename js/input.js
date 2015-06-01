var key=[0,0,0,0,0]; // left, right, up, down
var mx = 0;
var my = 0;

var IE = document.all?true:false

function Input(){

}

Input.prototype.addKeyListener = function( ) {
	document.onkeydown=function(e){ changeKey((e||window.event).keyCode, 1);}
	document.onkeyup=function(e){  changeKey((e||window.event).keyCode, 0);}
}

function changeKey( which, to ) {
	 
	switch (which){
		case 65: case 37: key[0]=to; break; // left
		case 87: case 38: key[2]=to; break; // up
		case 68: case 39: key[1]=to; break; // right
		case 83: case 40: key[3]=to; break;// down
	}
	
}
