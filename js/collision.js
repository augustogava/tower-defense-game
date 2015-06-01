
function Collision( canvas ){
	this.canvas = canvas;
}


Collision.prototype.pegaObjetosPorArea = function( a ) {
	var bolasDentroQ1 = [];
	var bolasDentroQ2 = [];
	var bolasDentroQ3 = [];
	var bolasDentroQ4 = [];

	for(var i=0; i< a.length; i++){
		
		/*bolasDentroQ1.push( a[i] ); 
		continue;*/

		if( a[i].colisao == "")
			continue;
			
		if( a[i].x <= ( $("#myCanvas").width()/2 ) && a[i].y <= ( $("#myCanvas").height()/2 ) ){
			bolasDentroQ1.push( a[i] );
			//document.getElementById("dados").innerHTML =  ' add ' + (canvas.width/2 ) + ' ' + (canvas.height/2 );
		}else if( a[i].x >= ($("#myCanvas").width()/2 ) && a[i].y <= (  $("#myCanvas").height()/2 ) ){
			bolasDentroQ2.push( a[i] );
			//document.getElementById("dados").innerHTML =  ' add2 ' + (canvas.width/2 ) + ' ' + (canvas.height/2 );
		}else if( a[i].x <= ($("#myCanvas").width()/2 ) && a[i].y >= (  $("#myCanvas").height()/2 ) ){
			bolasDentroQ3.push( a[i] );
			//document.getElementById("dados").innerHTML =  ' add3 ' + (canvas.width/2 ) + ' ' + (canvas.height/2 );
		}else if( a[i].x >= ($("#myCanvas").width()/2 ) && a[i].y >= (  $("#myCanvas").height()/2 ) ){
			bolasDentroQ2.push( a[i] );
			//document.getElementById("dados").innerHTML =  ' add4 ' + (canvas.width/2 ) + ' ' + (canvas.height/2 );
		}
	}
	
	var r = [ bolasDentroQ1, bolasDentroQ2, bolasDentroQ3, bolasDentroQ4 ];
	
	return r;
}

Collision.prototype.verificaColisoes = function( a ) {
	
	var areas = this.pegaObjetosPorArea( a );
	
	for(var c=0; c < areas.length; c++){
		//console.info( areas[c].length )
		for(var i=0; i < areas[c].length; i++){
			for(var e=0; e<areas[c].length; e++){
				if( e != i){	
					if( areas[c][i].colisao == "esfera" && areas[c][e].colisao == "esfera"){
						if( this.colisaoEsfera( areas[c][i], areas[c][e]) ){
							areas[c][e].updateCollision( "esfera", areas[c][i], areas[c][e] )
						}
					}else if( areas[c][i].colisao == "esfera" && areas[c][e].colisao == "plano"){
						if( this.colisaoPlanoEsfera( areas[c][i], areas[c][e]) ){
							areas[c][e].updateCollision( "plano", areas[c][i], areas[c][e] )
						}
					}else if( areas[c][i].colisao == "square" && areas[c][e].colisao == "square"){
						
						if( this.colisaoSquare( areas[c][i], areas[c][e]) ){
							if( areas[c][i].type=="enemy" && areas[c][e].type=="tiro"  ){
								areas[c][e].updateCollision( "plano", areas[c][i], areas[c][e] );							
								if(areas[c][e].shooter.shootType.area == false)
									return;
							}
						}
					}
				}
			}
		}
	}
}

Collision.prototype.verificaColisoes2 = function( a ) {

	for(var c=0; c < a.length; c++){
		for(var i=0; i < a.length; i++){

				if( c != i){	
					if( a[c].colisao == "esfera" && a[i].colisao == "esfera"){
						if( this.colisaoEsfera( a[c], a[i]) ){
							a[c].updateCollision( "esfera", a[c], a[i] )
						}
					}else if( a[c].colisao == "esfera" && a[i].colisao == "plano"){
						if( this.colisaoPlanoEsfera( a[c], a[i]) ){
							a[c].updateCollision( "plano", a[c], a[i] )
						}
					}else if( a[c].colisao == "square" && a[i].colisao == "square"){
						
						if( this.colisaoSquare( a[c], a[i]) ){
							//console.info("a")
							a[c].updateCollision( "plano", a[c], a[i] )
						}
					}
				}
				
		}
	}
}
Collision.prototype.colisaoSquare = function( a, b ) {
	/*if( a.x > b.x && a.x < (b.x+b.width) && a.x > b.y && a.y < (b.y+b.height)){
		return true;
	}*/
	if( (a.x+a.width) > b.x && a.x < (b.x + b.width) && (a.y+a.height) > b.y && a.y < (b.y + b.height) ){
		return true;
	}
}

Collision.prototype.colisaoEsfera = function( a, b ) {
	if( ((a.x - b.x) * (a.x - b.x)) + ( (a.y - b.y) * ( a.y - b.y) ) <= ( (a.r + b.r) * (a.r + b.r))){
		return true;
	}
}

/*
a: plano
p: esfera
*/
Collision.prototype.colisaoPlanoEsfera = function( a, p ) {

	if( ( b.x >= p.x1 && b.y >= p.y1 ) && ( b.x <= p.x2 && b.y<= p.y2 ) ){

		var vx = p.x2-p.x1;
		var vy = p.y2-p.y1;
		
		var nx = b.x - p.x1
		var ny = b.y - p.y1
		
		var V = MathI.magnitude( vx, vy);
		
		var angLinha = Math.atan2( vy, vx ); 
		var angBola = angLinha - Math.atan2( ny, nx ); 
		
		//var catetoAdjaBola = V / 2;
		var cateOposto = MathI.getCatetoOposto( Math.sin(angBola), MathI.magnitude( nx, ny ) );
		
		var distancia = (cateOposto-b.r)
		
		if( distancia <= 0){
			return true;
		}
		
	}else if( ( b.x <= p.x1 && b.y >= p.y1 ) && ( b.x >= p.x2 && b.y<= p.y2 ) ){
		var vx = p.x1-p.x2;
		var vy = p.y1-p.y2;
		
		var nx = b.x - p.x2;
		var ny = b.y - p.y2;
		
		var V = MathI.magnitude( vx, vy);
		
		var angLinha = Math.atan2( vy, vx ); 
		var angBola = angLinha - Math.atan2( ny, nx ); 
		
		var hipotenusaBola = MathI.magnitude( nx, ny )
		//var catetoAdjaBola = V / 2;
		var cateOposto = MathI.getCatetoOposto( Math.sin(angBola), hipotenusaBola );
		
		var distancia = (cateOposto-b.r)
		
		if( distancia <= 0){
			return true;
		}
	}
	

	return false;
	
}
