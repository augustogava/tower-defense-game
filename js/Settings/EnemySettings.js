var EnemyStep = [
	    {
	    	id:0,
	    	stepAttack: 1,
	    	stepDefense: .13,
			stepHP:1.30,
			stepRange:2.4,
			stepAttackSpeed:1,
			stepVelocity:0.14,
			coinValueStep: 1,
			scoreValueStep: 1.2
	    },
		{
	    	id:1,
	    	stepAttack: 1,
	    	stepDefense: .14,
			stepHP:1.6,
			stepRange:2.4,
			stepAttackSpeed:1,
			stepVelocity:0.11,
			coinValueStep: 1,
			scoreValueStep: 1.2
	    },
		{
	    	id:2,
	    	stepAttack: 1,
	    	stepDefense: .163,
			stepHP:1.75,
			stepRange:2.4,
			stepAttackSpeed:1,
			stepVelocity:0.11,
			coinValueStep: 1,
			scoreValueStep: 1.2
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
	        scoreValue: 15,
	        coinValue: 4,
	        
	        HP:1.25,
	        attack:.5,
	        attackSpeed:1,
	        defense: 0.12,
	        velocity: 0.9,
	        range:10,
			
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
			widthImg: 30,
			heightImg: 30,
	        bulletType:"B0.png",
	        scoreValue:15,
	        coinValue:6,
	        
	        HP:4.0,
	        attack:.5,
	        attackSpeed:1,
	        defense:.012,
	        velocity: 0.4,
	        range:10,
			
			dieSound: "die1",
			
			getSprites: function(){ 
				return new SpriteSheet({
					width: 30,
					height: 30,
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
			widthImg: 30,
			heightImg: 30,
	        bulletType:"B0.png",
	        scoreValue:15,
	        coinValue:7,
	        
	        HP:5,
	        attack:.5,
	        attackSpeed:2,
	        defense:.015,
	        velocity: 0.35,
	        range:15,
			
			dieSound: "die1",
			
			getSprites: function(){ 
				return new SpriteSheet({
					width: 30,
					height: 30,
					sprites: [
						{ name: 'walk0', x: 30, y: 0 }
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

