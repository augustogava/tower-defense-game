var Tower = function( tipo, pos ) {
	this.add(tipo, pos);
};

Tower.prototype = {
    towerType: TowerType[0],
	shootType: null,
	idUnique: (Math.random()*Math.random()),
   
    //Movements
	xPath:0,
    yPath:0,
	
    x:0,
    y:0,
    vx:0,
    vy:0,
    r:0,
    colisao: "square",
	type: "tower",
	
    //ControlesInternos
	lastAttack: 0,
	towerUpgradeLevel: 0,
	
	towerUpgradeAttackLevel: 0,
	towerUpgradeAttackSLevel: 0,
	towerUpgradeAttackRLevel: 0,
	
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
    range:10,
	slow: 0,
	
	focus: true,
	
    width: 0,
	height: 0,
	
    add: function(tipo, pos){
    	this.towerType =  tipo;
		this.shootType = this.towerType.shootType
		this.idUnique = Math.random()*Math.random();
		this.HP = this.towerType.HP;
    	this.HPAtual = this.HP;
    	this.attack = this.towerType.attack ;
    	this.attackSpeed = this.towerType.attackSpeed;
    	this.defense = this.towerType.defense;
    	this.range = this.towerType.range;
    	this.slow = this.towerType.slow;
		
		this.xPath =  pos.x;
		this.yPath =  pos.y;
		this.x = pos.x*tileWidth + ( this.towerType.widthImg / 2);
		this.y = pos.y*tileHeight + ( this.towerType.heightImg / 2);
		
		this.width = this.towerType.widthImg
		this.height = this.towerType.heightImg
		
		this.loadImgs();
		
		sound.play( "cocking", 0.5);
    },
    loadImgs: function(){
		var  sprites = this.towerType.towerUpgrade.getSprites();
		this.animateSpr = this.towerType.towerUpgrade.animateSpr( sprites, 0.2, this.towerUpgradeLevel);	
	},
    upgrade: function( type ){ 
		//1 attack
		//2 attackS
		//3 Rag
		
		/*if( this.towerUpgradeLevel < this.towerType.towerUpgrade.maxUpgrade-1  ){
			if( player.coins >= Math.ceil( this.towerType.coinCost * this.towerType.towerUpgrade.cost)  ){	
				++this.towerUpgradeLevel
				
				this.range = this.towerType.range + ( this.towerType.towerUpgrade.stepRange * this.towerUpgradeLevel );
				this.attack = this.towerType.attack + ( this.towerType.towerUpgrade.stepAttack * this.towerUpgradeLevel );
				this.defense = this.towerType.defense + ( this.towerType.towerUpgrade.stepDefense * this.towerUpgradeLevel );
				this.HP = this.towerType.HP + ( this.towerType.towerUpgrade.stepHP * this.towerUpgradeLevel );
				this.attackSpeed = this.towerType.attackSpeed + ( this.towerType.towerUpgrade.stepAttackSpeed * this.towerUpgradeLevel );
				

				var  sprites = this.towerType.towerUpgrade.getSprites();
				this.animateSpr = this.towerType.towerUpgrade.animateSpr( sprites, 0.2, this.towerUpgradeLevel);
				
				player.coins -= Math.ceil( this.towerType.coinCost * this.towerType.towerUpgrade.cost)
				player.points += this.towerType.scoreValue
			}else{
				info.add({message: "Dinheiro insuficiente", type:"alert"});
			}
		}*/

		sound.play("cocking", 0.3);
		
		if( type == 1){
			if( this.towerUpgradeAttackLevel < this.towerType.towerUpgrade.maxUpgrade  ){
				if( player.coins >= Math.ceil( this.towerType.coinCost * this.towerType.towerUpgrade.cost)  ){	
					
					++this.towerUpgradeAttackLevel
					
					this.attack = this.towerType.attack + ( this.towerType.towerUpgrade.stepAttack * this.towerUpgradeAttackLevel );
					
					if( this.slow > 0)
						this.slow = this.towerType.slow + ( this.towerType.towerUpgrade.stepSlow * this.towerUpgradeAttackLevel );
					
					player.coins -= Math.ceil( this.towerType.coinCost * this.towerType.towerUpgrade.cost)
					player.points += this.towerType.scoreValue
				
				}else{
					info.add({message: "Dinheiro insuficiente", type:"alert"});
				}
			}
			
		}	
		
		if( type == 2){
			
			if( this.towerUpgradeAttackSLevel < this.towerType.towerUpgrade.maxUpgrade  ){
				if( player.coins >= Math.ceil( this.towerType.coinCost * this.towerType.towerUpgrade.cost)  ){	
					++this.towerUpgradeAttackSLevel
					this.attackSpeed = this.towerType.attackSpeed + ( this.towerType.towerUpgrade.stepAttackSpeed * this.towerUpgradeAttackSLevel );
					
					player.coins -= Math.ceil( this.towerType.coinCost * this.towerType.towerUpgrade.cost)
					player.points += this.towerType.scoreValue
				}else{
					info.add({message: "Dinheiro insuficiente", type:"alert"});
				}
			}
			
		}
		
		if( type == 3){
			
			if( this.towerUpgradeAttackRLevel < this.towerType.towerUpgrade.maxUpgrade  ){
				if( player.coins >= Math.ceil( this.towerType.coinCost * this.towerType.towerUpgrade.cost)  ){	
					++this.towerUpgradeAttackRLevel
					this.range = this.towerType.range + ( this.towerType.towerUpgrade.stepRange * this.towerUpgradeAttackRLevel );
					
					player.coins -= Math.ceil( this.towerType.coinCost * this.towerType.towerUpgrade.cost)
					player.points += this.towerType.scoreValue
				}else{
					info.add({message: "Dinheiro insuficiente", type:"alert"});
				}
			}
			
		}
		
	},
	sell: function(){ 
		player.coins += Math.ceil( ( this.towerType.coinCost * this.towerType.towerUpgrade.sell ) + ( (this.towerUpgradeAttackLevel + this.towerUpgradeAttackSLevel + this.towerUpgradeAttackRLevel) * ( (this.towerType.towerUpgrade.cost*this.towerType.coinCost) / 2 ) ) );
		ui.removeClicks( this.idUnique );
		enti.removeObjetct( this.idUnique );
	},
	updateCollision: function( tipo, a , b){ 
		
	},
	update: function(){
		this.findEnemy();
	},
	takeShoot:  function( a ){
		//-HP, verifica se morreu
	},
	die: function( a ){
		//-Dardinheiro player.addCoins()
		//-DarPontos player.addPoints()
		//- remover LEVEL.EnemyAtualList player.removeEnemy()
	},
	draw:  function( ){
		var imagem = loader.findImage( "tower"+this.towerType.type );
		var imagemBase = loader.findImage( "towerBase"+this.towerType.type );
		
		var xO = imagem.img.width / 2;
		var yO = imagem.img.height /2;
		
		canvasW = canvas.getCanvas();
		context = canvasW.getContext("2d");
			
		context.save();
		context.drawImage( imagemBase.img, this.x-(imagemBase.img.width/3) , this.y-(imagemBase.img.height/2) , ( imagemBase.img.width ), (  imagemBase.img.height ) );
		context.translate( this.x+this.towerType.widthAjuste , this.y+this.towerType.heightAjuste );
		
		this.drawUpgradeImg(context);		
//		this.drawLife( context )
		this.drawRange(context);
		context.rotate( mathI.convertToRadians( this.r-180 ));
		context.drawImage( imagem.img, -xO, -yO, ( imagem.img.width ), ( imagem.img.height ) );
		
		context.restore();
	},
	
	radgradAnima: 0,
	radgradAnimaEa: .0001,
	
	drawRange:function(context){
		if( this.focus ){
			this.radgradAnima += this.radgradAnimaEa;
			this.radgradAnimaEa += .0009;
			if( this.radgradAnima >= 0.9){
				this.radgradAnima = 0;
				this.radgradAnimaEa = .0001
			}
			
			var imagem = loader.findImage( "tower"+this.towerType.type );
			
			var xO = imagem.img.width / 2;
			var yO = imagem.img.height /2;
			
			var size = this.range;
			var halfSize = size >> 1;
			var x = ~~this.x;
			var y = ~~this.y;
			
			var radgrad = context.createRadialGradient( 0, 0, 0, 0,0, 200);
			radgrad.addColorStop( this.radgradAnima, 'rgba(0,120,0,0.13)' );   
			radgrad.addColorStop( (this.radgradAnima+0.05), 'rgba(200,200,200, 0.5)' );   
			radgrad.addColorStop( (this.radgradAnima+0.05), 'rgba(0,120,0,0.18)' );   
			
			//radgrad.addColorStop( 1, 'rgba(0,100,0,1)' );
			
			context.beginPath();
			context.fillStyle = radgrad
			context.arc( (-xO+imagem.img.width/2), (-yO+imagem.img.height/2), this.range, 0, Math.PI*2, true); 
			context.closePath();
			context.fill();
			
			
			
		}
	},
	
	drawUpgradeImg:function(context){
		if( this.focus ){
			/*var imagem = loader.findImage( "up"+this.towerType.towerUpgrade.id );
			var imagemSell = loader.findImage( "sell" );
			
			ui.addClick( { id: this.idUnique, 
							x: ( ( this.x+this.towerType.widthAjuste ) - (this.towerType.towerUpgrade.widthImg / 2) ),
							y: ( ( this.y+this.towerType.heightAjuste ) - ( this.towerType.towerUpgrade.heightImg / 2 ) ) - 60,
							width: this.towerType.towerUpgrade.widthImg,
							height:  this.towerType.towerUpgrade.heightImg,
							type:  "upgrade"
							} );
							
			ui.addClick( { id: this.idUnique, 
							x: ( ( this.x+this.towerType.widthAjuste ) - (this.towerType.towerUpgrade.widthImg / 2) ) + 3,
							y: ( ( this.y+this.towerType.heightAjuste ) - ( this.towerType.towerUpgrade.heightImg / 2 ) ) + 65,
							width: imagemSell.img.width,
							height:  imagemSell.img.height,
							type:  "sell"
							} );
		
		
			var walk = this.animateSpr.animate( timer.getSeconds() );
			var frame = this.animateSpr.getSprite();
			
			var xO = this.towerType.towerUpgrade.widthImg / 2;
			var yO = this.towerType.towerUpgrade.heightImg /2;
			context.drawImage( imagem.img , frame.x, frame.y, this.towerType.towerUpgrade.widthImg, this.towerType.towerUpgrade.heightImg, -xO, -yO-60, this.towerType.towerUpgrade.widthImg, this.towerType.towerUpgrade.heightImg);
			context.drawImage( imagemSell.img , 0, 0, imagemSell.img.width, imagemSell.img.height, -xO+3, -yO+65, imagemSell.img.width, imagemSell.img.height);*/
			var that = this;
			$("#upgradeBox").show();
			var scaledX = canvas.offsetX + (this.x * canvas.scaleRatio) + (50 * canvas.scaleRatio);
			var scaledY = (this.y * canvas.scaleRatio) - (80 * canvas.scaleRatio);
			$("#upgradeBox").css("left", scaledX);
			$("#upgradeBox").css("top", scaledY);
			$("#upgradeBox").css("transform", "scale(" + canvas.scaleRatio + ")");
			$("#upgradeBox").css("transform-origin", "top left");

			$("#imgboxAttack").attr("src", "images/up_box_" + this.towerUpgradeAttackLevel + ".png" ); 
			$("#imgboxAttackS").attr("src", "images/up_box_" + this.towerUpgradeAttackSLevel + ".png"); 
			$("#imgboxRange").attr("src", "images/up_box_" + this.towerUpgradeAttackRLevel + ".png"); 
			$("#sell").html("$" + Math.ceil( ( this.towerType.coinCost * this.towerType.towerUpgrade.sell ) + ( (this.towerUpgradeAttackLevel + this.towerUpgradeAttackSLevel + this.towerUpgradeAttackRLevel) * ( (this.towerType.towerUpgrade.cost*this.towerType.coinCost) / 2.2 ) ) ));
	
			//$("#upgradeBox").css("top", 50);
			//context.drawImage( imagemSell.img , 0, 0, imagemSell.img.width, imagemSell.img.height, -xO+3, -yO+65, imagemSell.img.width, imagemSell.img.height);
		}
	},
	
	drawLife: function( context){
		var tl = ( 50 * this.HPAtual) /  this.HP
		
		context.fillStyle = "rgba(124, 252, 0, 1)";
		context.fillRect( - ( ( 50 ) / 2 ), -(( 35  ) / 2 ) - 10, tl, 3);

	},

	findEnemy: function(){

			for(var i=0; i< enti.obj.length; i++){
				var b = enti.obj[i];
				if( this.idUnique != b.idUnique && b.type == "enemy" ){
					var c1 = ((this.x - b.x) * (this.x - b.x)) + ( (this.y - b.y) * ( this.y - b.y) );
					var c2 = (this.range * this.range);

					if( c1 <= c2 ){
						this.attackTar( b );
						return ;
					}
				}
			}

	},
	attackTar: function( inimigo ){
		var imagem = loader.findImage( "tower"+this.towerType.type );
		
		var dif = -11;
		//var anguloAttack2 = mathI.convertToDegrees( mathI.anguloVector( ( inimigo.x-(this.x-25)) ,  ( inimigo.y-(this.y-25) ) ) );
		var anguloAttack = mathI.angulo(inimigo, this  ) + 25 ;

		this.r = anguloAttack;
		var atual = new Date().getTime();
		if( (atual-this.lastAttack) > ( (1-this.attackSpeed)*1000) || this.lastAttack == 0){
			
			this.sound();
			var anguloAttack = mathI.convertToDegrees( mathI.anguloVector( ( this.x-inimigo.x ),  (this.y-inimigo.y ) ) );
			
			var tiroNovo = new Shoot(
				{ 
					shooter:this,
					x: (this.x ) + ( 45 * Math.cos( mathI.convertToRadians( anguloAttack ) ) * -1 ),
					y: (this.y ) +( 45 * Math.sin( mathI.convertToRadians( anguloAttack ) ) * -1 ),
					angulo: anguloAttack
				});
			
			this.addEffects( anguloAttack );
			tiroNovo.vx = this.shootType.velocity * Math.cos( mathI.convertToRadians( anguloAttack ) ) * -1;
			tiroNovo.vy = this.shootType.velocity * Math.sin( mathI.convertToRadians( anguloAttack ) ) * -1 ;
			enti.add( tiroNovo );
			
			this.lastAttack = new Date().getTime();
			
		}
		
		//console.info(inimigo)
	},
	
	sound: function(){
		sound.play( this.towerType.shootType.sound, this.towerType.shootType.soundVolume);
	},
	
	addEffects: function( ang ){

		if( ang > 90 || ang < -140)
				ang -= 15;
		
		if( this.towerType.type == 0){
			ang += 7;
			var firSm = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
			firSm.setDefault(7);
			firSm.position = Vector.create( this.x  + ( (this.towerType.widthImg-5) * Math.cos( mathI.convertToRadians( ang ) ) * -1 ), this.y +( ( this.towerType.widthImg-5) * Math.sin( mathI.convertToRadians( ang ) ) * -1 ) );
			enti.add( firSm )
			
			ang += 22;
			var firSm = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
			firSm.setDefault(7);
			firSm.position = Vector.create( this.x  + ( (this.towerType.widthImg-5) * Math.cos( mathI.convertToRadians( ang ) ) * -1 ), this.y +( (this.towerType.widthImg-5) * Math.sin( mathI.convertToRadians( ang ) ) * -1 ) );
			enti.add( firSm )

			var smoke = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
			smoke.setDefault(3);
			smoke.position = Vector.create( this.x  + ( this.towerType.widthImg * Math.cos( mathI.convertToRadians( ang ) ) * -1 ), this.y +( this.towerType.widthImg * Math.sin( mathI.convertToRadians( ang ) ) * -1 ) );
			enti.add( smoke )
		}else if( this.towerType.type == 1){
			var firSm = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
			firSm.setDefault(8);
			firSm.position = Vector.create( this.x  + ( (this.towerType.widthImg-5) * Math.cos( mathI.convertToRadians( ang ) ) * -1 ), this.y +( ( this.towerType.widthImg-5) * Math.sin( mathI.convertToRadians( ang ) ) * -1 ) );
			enti.add( firSm )
			
			var smoke = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
			smoke.setDefault(3);
			smoke.position = Vector.create( this.x  + ( this.towerType.widthImg * Math.cos( mathI.convertToRadians( ang ) ) * -1 ), this.y +( this.towerType.widthImg * Math.sin( mathI.convertToRadians( ang ) ) * -1 ) );
			enti.add( smoke )
		}else if( this.towerType.type == 2){ // FOGO
			if( ang > 140 || ang < -160){
				//vari = 35;
				//ang -= 25;
			}else vari=0;
			
			//vari=0;
			var firSm = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
			firSm.setDefault(9);
			firSm.position = Vector.create( this.x  + ( 45 * Math.cos( mathI.convertToRadians( ang ) ) * -1 ), this.y +( 45 * Math.sin( mathI.convertToRadians( ang ) ) * -1 ) );
			firSm.angle = ang+180;
			enti.add( firSm )
			
			var smoke = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
			smoke.setDefault(10);
			firSm.angle = ang+180;
			smoke.position = Vector.create( this.x  + ( this.towerType.widthImg * Math.cos( mathI.convertToRadians( ang ) ) * -1 ), this.y +( this.towerType.widthImg * Math.sin( mathI.convertToRadians( ang ) ) * -1 ) );
			enti.add( smoke )
		}else if( this.towerType.type == 3){ // NEVE
			if( ang > 140 || ang < -160){
				//vari = 35;
				//ang -= 25;
			}else vari=0;
			
			//vari=0;
			var firSm = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
			firSm.setDefault(11);
			firSm.position = Vector.create( this.x  + ( 45 * Math.cos( mathI.convertToRadians( ang ) ) * -1 ), this.y +( 45 * Math.sin( mathI.convertToRadians( ang ) ) * -1 ) );
			firSm.angle = ang+180;
			enti.add( firSm )
			
		}
		
		
	}
}
