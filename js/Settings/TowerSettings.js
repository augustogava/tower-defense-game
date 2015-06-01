var ShootType = [
	    {
	        type:0,
			textureName:"images/plasma.png",
			widthImg: 50,
			heightImg: 67,
			velocity: 30,
			sound: "shoo1",
			soundVolume: 0.4,
			area: false,

			getSprites: function(){ 
				return new SpriteSheet({
					width: 50,
					height: 67,
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
	    },
		{
	        type:1,
			textureName:"images/plasma.png",
			widthImg: 50,
			heightImg: 67,
			velocity: 30,
			sound: "shoot2",
			soundVolume: 0.5,
			area: true,

			getSprites: function(){ 
				return new SpriteSheet({
					width: 50,
					height: 67,
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
	    },
		{
	        type:2,
			textureName:"images/plasmaTras.png",
			widthImg: 50,
			heightImg: 67,
			velocity: 30,
			sound: "ff",
			soundVolume: 0.08,
			area: true,

			getSprites: function(){ 
				return new SpriteSheet({
					width: 50,
					height: 67,
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
	    },
		{
	        type:3,
			textureName:"images/plasmaTras.png",
			widthImg: 50,
			heightImg: 67,
			velocity: 30,
			sound: "ff",
			soundVolume: 0.08,
			area: true,

			getSprites: function(){ 
				return new SpriteSheet({
					width: 50,
					height: 67,
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
	    }
    ];

var TowerUpgrade = [
	    {
	    	id:0,
	    	stepAttack: 0.12,
	    	stepDefense: 0.1,
			stepHP: 0.1,
			stepRange: 20,
			stepAttackSpeed: .01,
	        stepSlow: 0.05,
			maxUpgrade: 5,
			texture: "images/upgrade.png",
			cost: .4,
			sell: .7,
			
			widthImg: 25,
			heightImg: 50,
			
			getSprites: function(){ 
				return new SpriteSheet({
					width: 25,
					height: 50,
					sprites: [
						{ name: 'upgrade0', x: 0, y: 0 },
						{ name: 'upgrade1', x: 0, y: 0 },
						{ name: 'upgrade2', x: 0, y: 0 },
						{ name: 'upgrade3', x: 0, y: 0 },
						{ name: 'upgrade4', x: 0, y: 0 }
					]
				});
			},
			
			animateSpr:function( sprites, timeP, index ){
				return new Animation([
								{ sprite: 'upgrade' + index, time: timeP }
				   ], sprites );
			}
			
	    },
		{
	    	id:1,
	    	stepAttack: 0,
	    	stepDefense: 0.1,
			stepHP: 0.1,
			stepRange: 2,
			stepAttackSpeed: 0,
			stepSlow: 0.1,
			maxUpgrade: 5,
			texture: "images/upgrade.png",
			cost: .4,
			sell: .7,
			
			widthImg: 25,
			heightImg: 50,
			
			getSprites: function(){ 
				return new SpriteSheet({
					width: 25,
					height: 50,
					sprites: [
						{ name: 'upgrade0', x: 0, y: 0 },
						{ name: 'upgrade1', x: 0, y: 0 },
						{ name: 'upgrade2', x: 0, y: 0 },
						{ name: 'upgrade3', x: 0, y: 0 },
						{ name: 'upgrade4', x: 0, y: 0 }
					]
				});
			},
			
			animateSpr:function( sprites, timeP, index ){
				return new Animation([
								{ sprite: 'upgrade' + index, time: timeP }
				   ], sprites );
			}
			
	    },
		
		{
	    	id:2,
	    	stepAttack: 0,
	    	stepDefense: 0.1,
			stepHP: 0.1,
			stepRange: 2,
			stepAttackSpeed: 0,
			stepSlow: 0.07,
			maxUpgrade: 5,
			texture: "images/upgrade.png",
			cost: .4,
			sell: .7,
			
			widthImg: 25,
			heightImg: 50,
			
			getSprites: function(){ 
				return new SpriteSheet({
					width: 25,
					height: 50,
					sprites: [
						{ name: 'upgrade0', x: 0, y: 0 },
						{ name: 'upgrade1', x: 0, y: 0 },
						{ name: 'upgrade2', x: 0, y: 0 },
						{ name: 'upgrade3', x: 0, y: 0 },
						{ name: 'upgrade4', x: 0, y: 0 }
					]
				});
			},
			
			animateSpr:function( sprites, timeP, index ){
				return new Animation([
								{ sprite: 'upgrade' + index, time: timeP }
				   ], sprites );
			}
			
	    }
	   ];

var TowerType = [
	    {
	        type:0,
	        towerUpgrade: TowerUpgrade[0],
			shootType: ShootType[0],
	        textureName:"images/torre_1.png",
			textureBaseName:"images/base_torre_1.png",
			textureSell:"images/sell.png",
	        scoreValue:15,
	        coinCost:60,
			
			sound: "cocking",
			
			widthImg: 33,
			heightImg: 50,
	        widthAjuste: 8,
			heightAjuste: 0,
			
	        HP:5,
	        attack:.2,
	        attackSpeed:.8,
	        defense:1,
	        range:80,
	        slow: 0
	    },
		{
	        type:1,
	        towerUpgrade: TowerUpgrade[0],
			shootType: ShootType[1],
	        textureName:"images/torre_2.png",
			textureBaseName:"images/base_torre_2.png",
			textureSell:"images/sell.png",
	        scoreValue:15,
	        coinCost:100,

			sound: "cocking",
			
			widthImg: 49,
			heightImg: 50,
			
			widthAjuste: 8,
			heightAjuste: -2,
			
	        HP:5,
	        attack:1.5,
	        attackSpeed:.2,
	        defense:1,
	        range:110,
	        slow: 0
	    },
		{
	        type:2,
	        towerUpgrade: TowerUpgrade[1],
			shootType: ShootType[2],
	        textureName:"images/torre_3.png",
			textureBaseName:"images/base_torre_2.png",
			textureSell:"images/sell.png",
	        scoreValue:15,
	        coinCost:110,
			
			sound: "cocking",
			
			widthImg: 44,
			heightImg: 64,
			
			widthAjuste: 10,
			heightAjuste: 0,
			
	        HP:5,
	        attack:.28,
	        attackSpeed:.83	,
	        defense:1,
	        range:80,
	        slow: 0
	    },{
	        type:3,
	        towerUpgrade: TowerUpgrade[2],
			shootType: ShootType[3],
	        textureName:"images/torre_3.png",
			textureBaseName:"images/base_torre_2.png",
			textureSell:"images/sell.png",
	        scoreValue:15,
	        coinCost:80,
			
			sound: "cocking",
			
			widthImg: 44,
			heightImg: 64,
			
			widthAjuste: 10,
			heightAjuste: 0,
			
	        HP:5,
	        attack:0,
	        attackSpeed:.86	,
	        defense:1,
	        range:90,
	        slow: 0.018
	    }
    ];

