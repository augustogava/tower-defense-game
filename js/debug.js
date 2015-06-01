function Debug( ){
	var s = document.createElement('div');
	s.innerHTML = "";
	s.id = 'debug';
	s.style.position = 'absolute';
	s.style.top = '0px';
	s.style.left = '0px';
	s.style.width = '100%';
	s.style.height = '100px';
	s.style.color = '#000';
	s.style.fontSize = '16px';
	document.documentElement.appendChild(s);
}


Debug.prototype.put = function( d ) {
	$('#debug').html("");
	$('#debug').html( d );
}

Debug.prototype.add = function( d ) {
	$('#debug').html( $('#debug').html() + "<br>"+ d );
}
