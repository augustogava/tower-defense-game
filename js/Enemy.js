var Enemy = function(tipoEne) {
	this.add(tipoEne);
};

Enemy.prototype = {
    enemyType: EnemyType[0],
	idUnique: (Math.random()*Math.random()),
	
    //Movements
    x:30,
    y:0,
    vx:0,
    vy:0,
    r:0,
    colisao: "square",
	type: "enemy",
	
    //ControlesInternos
	lastHitSlow: 0,
	lastHitDuration: 1,
	pathAtual: 0,
	xTo:0,
	yTo:0,
	animateSpr: Object,
	
	//Pontos		
    scoreValue:15,
    coinValue:15,
    
    //Hp,AttackEtc
    HPAtual:1,
    HP:1,
    attack:1,
    attackSpeed:1,
    defense:1,
    velocity:1,
    velocityOri:1,
    slow: 0,
    range:10,
    
	width: 0,
	height: 0,
	
    add: function(tipoEne){
    	this.enemyType =  tipoEne;
	this.idUnique = Math.random()*Math.random();
		
	this.HP = this.enemyType.HP + ( this.enemyType.enemyStep.stepHP * level.level );
    	this.HPAtual = this.HP;
    	this.attack = this.enemyType.attack + ( this.enemyType.enemyStep.stepAttack * level.level );
    	this.attackSpeed = this.enemyType.attackSpeed + ( this.enemyType.enemyStep.stepAttackSpeed * level.level );
    	this.defense = this.enemyType.defense + ( this.enemyType.enemyStep.stepDefense * level.level );
    	this.velocity = this.enemyType.velocity + ( this.enemyType.enemyStep.stepVelocity * level.level );
    	this.velocityOri = this.enemyType.velocity + ( this.enemyType.enemyStep.stepVelocity * level.level );
    	this.coinValue = this.enemyType.coinValue;
    	this.scoreValue = Math.ceil( this.enemyType.scoreValue + ( this.enemyType.enemyStep.scoreValueStep * level.level ) );
		
		if( this.velocity > 2.5 ){
			this.velocity = 2.5
			this.velocityOri = 2.5;
		}
			
    	this.range = this.enemyType.range + ( this.enemyType.enemyStep.stepRange * level.level );
		
		var xPath = path._rota[this.pathAtual]
		var xD = ( xPath.x * tileWidth);
		var xY = ( xPath.y * tileHeight + ( tileHeight / 2 ) + 2);
		
		this.y = xY;
		this.width = this.enemyType.widthImg
		this.height = this.enemyType.heightImg
		
		this.loadImgs();
    },
	loadImgs: function(){
		var  sprites = this.enemyType.getSprites();
		this.animateSpr = this.enemyType.animateSpr( sprites, 0.2);	
	},
	remove: function(){
		player.life -= 1;
		enti.removeObjetct( this.idUnique );
		level.verifyInitLevel();
	},
	getNextPath: function(){

		if( ++this.pathAtual >= path._rota.length){
			return this.remove();
		}

		var xPath = path._rota[this.pathAtual]

		this.xTo = ( xPath.x * tileWidth  + ( tileWidth / 2 ) ); 
		this.yTo = ( xPath.y * tileHeight  + ( tileHeight / 2 ) + 2 );


		var angulo = mathI.anguloVector( this.xTo-(this.x),this.yTo-(this.y) );
		this.r = mathI.convertToDegrees(angulo);
		
		this.updateSpeed();
		
	},
	updateCollision: function( tipo, a , b){ 
		
	},
	update: function(){
		this.x += this.vx;
		this.y += this.vy;

		if( (this.x) > this.xTo && this.vx > 0){
			this.vx = 0;
		}
		
		if( (this.x) < this.xTo &&  this.vx < 0){
			this.vx = 0;
		}
		
		if( (this.y) > this.yTo && this.vy > 0){
			this.vy = 0;
		}
		
		if( (this.y) < this.yTo &&  this.vy < 0){
			this.vy = 0;
		}
		
		if( this.vx == 0 && this.vy == 0){
			console.info("GetNExt")			
			this.getNextPath();
		}
		
		if( this.vx != 0 || this.vy != 0){
			this.updateSpeed();
		}
		
		var atual = new Date().getTime();
		if( (atual-this.lastHitSlow) > ( this.lastHitDuration*1000) || this.lastHitSlow == 0){
			this.velocity = this.velocityOri;
			this.slow = 0;

		}
	},
	updateSpeed: function(){
		var xPath = path._rota[this.pathAtual]

		this.xTo = ( xPath.x * tileWidth  + ( tileWidth / 2 ) ); 
		this.yTo = ( xPath.y * tileHeight  + ( tileHeight / 2 ) + 2 );
		
		var angulo = mathI.anguloVector( this.xTo-(this.x),this.yTo-(this.y) );

		if( angulo > -0.2 && angulo < 0.2){
			this.vx = this.velocity;
		}
		
		if( angulo < -2.8 && angulo > -3.2 || angulo > 3.1){
			this.vx = -this.velocity;
		}
		
		if( angulo > 1.5 && angulo < 1.8  ){
			this.vy = this.velocity;
			this.vx = 0
		}
		
		if( angulo < -1.5 && angulo > -1.8){
			this.vy = -this.velocity;
			this.vx = 0;
		}

	},
	walk: function( xm, ym ){
		//AnimarSPrite
	},
	attack: function( inimigo ){

	},
	takeShoot:  function( a ){
		if( this.enemyType.type == 0)
			this.addEffects(4, this.x, this.y); //sangue
		else
			this.addEffects(2, this.x, this.y); //sparks
		
		if( this.slow < 1)
			this.slow += a.shooter.slow
			
		this.lastHitSlow = new Date().getTime();
		this.HPAtual -=  a.shooter.attack - ( a.shooter.attack * this.enemyType.defense );
		
		if( this.velocity > .5 ){
			this.velocity = this.velocityOri - this.slow
		}
			
		if( this.HPAtual <= 0 )
			this.die()
		
	},
	die: function( ){
		if( this.enemyType.type != 0){
			this.addEffects(5, this.x-10, this.y-10); //explosio
			this.addEffects(6, this.x-11, this.y-11); //smoke
		}
		
		this.sound();
		player.coins += this.coinValue
		player.points += this.scoreValue
		enti.removeObjetct( this.idUnique );
		level.verifyInitLevel();
	},
	sound: function(){
		if( this.enemyType.dieSound != ""){
			sound.play( this.enemyType.dieSound, 0.3);
		}
	},
	draw:  function( ){
		//drawHP
		//drawEnemy
		var imagem = loader.findImage( "ene"+this.enemyType.type );
		
		var xO = ( this.enemyType.widthImg ) / 2;
		var yO = ( this.enemyType.heightImg) / 2;
		
		canvasW = canvas.getCanvas();
		context = canvasW.getContext("2d");
	
		var walk = this.animateSpr.animate( timer.getSeconds() );
		var frame = this.animateSpr.getSprite();
		
		context.save();
		context.translate( this.x , this.y );
		this.drawLife( context )
		context.rotate( mathI.convertToRadians( this.r ));
		//context.drawImage( imagem.img, -xO, -yO, ( 50 ), ( 35 ) );
		//console.info(imagem)
		context.drawImage( imagem.img , frame.x, frame.y, this.enemyType.widthImg, this.enemyType.heightImg, -xO, -yO, this.enemyType.widthImg, this.enemyType.heightImg);
		
		context.restore();
	},
	drawLife: function( context){
		var tl = ( 40 * this.HPAtual) /  this.HP

		context.fillStyle = "rgba(124, 252, 0, 1)";
		context.fillRect( - ( ( 40 ) / 2 ), -(( 35  ) / 2 ) - 10, tl, 2);
		
	},
	findEnemy: function(){
		
	},
	addEffects: function( type, x, y ){

		var smoke = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
		smoke.setDefault( type );
		smoke.position = Vector.create( x, y);

		enti.add( smoke )
	}
	
}
