var EnemyStep = [
	    {
	    	id:0,
	    	stepAttack: 0.3,
	    	stepDefense: 0.01,
			stepHP: 1.0,
			stepRange: 1,
			stepAttackSpeed: 0.3,
			stepVelocity: 0.03,
			coinValueStep: 1,
			scoreValueStep: 2
	    },
		{
	    	id:1,
	    	stepAttack: 0.4,
	    	stepDefense: 0.015,
			stepHP: 1.5,
			stepRange: 1,
			stepAttackSpeed: 0.3,
			stepVelocity: 0.025,
			coinValueStep: 1.5,
			scoreValueStep: 3
	    },
		{
	    	id:2,
	    	stepAttack: 0.5,
	    	stepDefense: 0.02,
			stepHP: 2.0,
			stepRange: 1,
			stepAttackSpeed: 0.3,
			stepVelocity: 0.02,
			coinValueStep: 2,
			scoreValueStep: 4
	    }
	   ];

var EnemyType = [
	   {
	        type:0,
	        enemyStep: EnemyStep[0],
	        textureName:"images/soldiers.png",
			widthImg: 25,
			heightImg: 20,
	        bulletType:"B0.png",
	        scoreValue: 12,
	        coinValue: 6,
	        
	        HP: 3,
	        attack: 0.5,
	        attackSpeed: 1,
	        defense: 0.08,
	        velocity: 0.7,
	        range: 10,
			
			dieSound: "",
			
			getSprites: function(){ 
				return new SpriteSheet({
					height: 20,
					width: 25,
					sprites: [
						{ name: 'walk0', x: 0, y: 0 },
						{ name: 'walk1', x: 0, y: 0 },
						//{ name: 'walk2', x: 0, y: 0 }
					]
				});
			},
			
			animateSpr:function( sprites, timeP ){
				return new Animation([
	                            { sprite: 'walk0', time: timeP },
								{ sprite: 'walk1', time: timeP },
								//{ sprite: 'walk2', time: timeP }
				   ], sprites );
			}
	    },{
	        type:1,
	        enemyStep: EnemyStep[1],
	        textureName:"images/tanks.png",
			widthImg: 45,
			heightImg: 45,
			spriteWidth: 736,
			spriteHeight: 704,
	        bulletType:"B0.png",
	        scoreValue: 25,
	        coinValue: 10,
	        
	        HP: 8,
	        attack: 0.5,
	        attackSpeed: 1,
	        defense: 0.1,
	        velocity: 0.6,
	        range: 10,
			
			dieSound: "die1",
			
			getSprites: function(){ 
				return new SpriteSheet({
					width: 736,
					height: 704,
					sprites: [
						{ name: 'walk0', x: 0, y: 0 }
					]
				});
			},
			
			animateSpr:function( sprites, timeP ){
				return new Animation([
	                            { sprite: 'walk0', time: timeP }
				   ], sprites );
			}
	    },{
	        type:2,
	        enemyStep: EnemyStep[2],
	        textureName:"images/tanks.png",
			widthImg: 45,
			heightImg: 45,
			spriteWidth: 736,
			spriteHeight: 704,
	        bulletType:"B0.png",
	        scoreValue: 35,
	        coinValue: 14,
	        
	        HP: 14,
	        attack: 0.5,
	        attackSpeed: 2,
	        defense: 0.15,
	        velocity: 0.65,
	        range: 15,
			
			dieSound: "die1",
			
			getSprites: function(){ 
				return new SpriteSheet({
					width: 736,
					height: 704,
					sprites: [
						{ name: 'walk0', x: 736, y: 0 }
					]
				});
			},
			
			animateSpr:function( sprites, timeP ){
				return new Animation([
	                            { sprite: 'walk0', time: timeP }
				   ], sprites );
			}
	    }
    ];

