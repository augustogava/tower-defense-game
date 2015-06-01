function Entities( canvas ){
	this.friction = .97;
	this.canvas = canvas;
	this.obj =  [];

}

Entities.prototype.getObjetos = function(  ) {
	return this.obj;
}

Entities.prototype.addEntities = function( vx, vy ) {

	var newObj = {
			x: vx ,
			y: vy ,
			vx: ( Math.random()/ 2),
			vy: 1 + ( Math.random() * 3 ),
			r: 15,
			elasticity: .6,
			elasticityX: 0.3,
			tipo: "esfera",
			updateCollision: function ( tipo, a, b ){
				var angu = mathI.angulo( a, b )  ;
				var as2 = angu + 180;
				
				//a.x = a.x - a.r;
				//a.y = a.y - a.r;
				var acex = ( b.vx > 1.5) ?	acex = b.vx/2 : 1;
				var acey = ( b.vy > 1.5) ?	acey = b.vy/2 : 1;
				
				b.vx = ( acex *  Math.sin( mathI.convertToRadians( as2 ) ));
				b.vy = ( acey *  Math.cos( mathI.convertToRadians( as2 ) ) *-1);
			},
			update: function ( canvas ){
				this.x += this.vx;
				this.y += this.vy;
	
				this.vy *= .99;
				
				if (this.y > (canvas.height - this.r)) {
					this.y = canvas.height - this.r;
					this.vy = -Math.abs(this.vy);

					this.vy *= this.elasticity;	

				}
			
				if (this.y < this.r) {
					this.y = this.r;
					this.vy =  -Math.abs(this.vy);
					this.vy *= this.elasticity;
				}

				if (this.x > (canvas.width-this.r)) {
					this.x =  canvas.width - this.r;
					this.vx = -Math.abs(this.vx);
					this.vx *= this.elasticity;
				}

				if (this.x < this.r) {
					this.x = this.r;
					this.vx = Math.abs( this.vx );
					this.vx *= this.elasticity;
				}

				if (this.y == canvas.height - this.r) {
							
					if (this.vx > 0.1) {
						this.vx *= this.elasticityX;
					} else if (this.vx < -0.1) {
						this.vx *= this.elasticityX;
					}else {
						this.vx = 0;
					}
				}
				
				this.vy += .5;


			},
			draw: function( canvas ){
				
				var ctx = canvas.getContext("2d");
				//ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.save();
				ctx.translate( this.x + viewPointx, this.y + viewPointy);
				ctx.fillStyle = "#000";
				ctx.beginPath();
				ctx.arc(0, 0, this.r, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				ctx.restore();
				
			}
		};
			
		//newPart.img.src = newPart.url;
		
		this.obj.push( newObj );
	
}

Entities.prototype.update = function() {
	
	for(var i=0; i< this.obj.length; i++){
		this.obj[i].update( this.canvas );
	}

};

Entities.prototype.render = function( ) {
	
	var context = this.canvas.getContext("2d");
	
	for(var i=0; i < this.obj.length; i++){
		if(  this.obj[i] != "undefined" ){		
			this.obj[i].draw( this.canvas);
		}
	}

};