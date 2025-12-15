var Shoot = function(data) {
	this.add(data);
}

Shoot.prototype = {
	idUnique: Math.random()*Math.random(),
	type: "tiro",
	colisao: "square",
	
	//movement
	velocity: 0.2,
	shooter: {},
	
	//posicao Prog
	viewPointx: 0,
	viewPointy: 0,
	x: 0 ,
	y: 0 ,
	vx: 0,
	vy: 0,
	r: 0,
	width: 0,
	height: 0,
	Object: {}, 
	animateSpr: Object,
	
	add: function (data){
		this.idUnique = Math.random()*Math.random();
		
		this.shooter = data.shooter;
		this.x = data.x;
		this.y = data.y;
		this.r = data.angulo+270;
		this.width = this.shooter.shootType.widthImg;
		this.height = this.shooter.shootType.heightImg;
		this.loadImgs();
		//this.addEffects()
	},
	
	
	
	loadImgs: function(){
		var  sprites = this.shooter.shootType.getSprites();
		this.animateSpr = this.shooter.shootType.animateSpr( sprites, 0.2);	
	},
	updateCollision: function( tipo, a, b ){ 
		if( a.type == "enemy" && b.type == "tiro" && a.idUnique != this.shooter.idUnique ){
			enti.removeObjetct( this.idUnique );
			a.takeShoot( b )
		}
	},
	update: function(){
		this.x += this.vx * deltaTime;
		this.y += this.vy * deltaTime;

		if( ( this.x > $("#myCanvas").width() || this.y > $("#myCanvas").height() ) || ( this.x < 0 || this.y < 0 ) ){
			console.info("REMOVE TIRO SAIU tela")	
			enti.removeObjetct( this.idUnique );
		}
	},
	draw:  function( ){
		canvasW = canvas.getCanvas();
		context = canvasW.getContext("2d");
		
		var imagem = loader.findImage( "tiro"+this.shooter.shootType.type );
		
		var xO = ( this.shooter.shootType.widthImg ) / 2;
		var yO = ( this.shooter.shootType.heightImg  ) / 2;

		var walk = this.animateSpr.animate( timer.getSeconds() );
		var frame = this.animateSpr.getSprite();
		
		context.save(); 
		context.translate( this.x, this.y );
		
		context.rotate( mathI.convertToRadians( this.r ));
		//context.globalAlpha = this.alpha;
			
		//context.drawImage( this.img, -xO, -yO, ( this.img.width ), ( this.img.height ) );
		context.drawImage( imagem.img , frame.x, frame.y, this.shooter.shootType.widthImg, this.shooter.shootType.heightImg, -xO, -yO+10, this.shooter.shootType.widthImg, this.shooter.shootType.heightImg);
		context.restore();
	}
	
}
