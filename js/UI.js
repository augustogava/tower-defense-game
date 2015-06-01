var UI = function(){
	
}

UI.prototype = {
	_availableClicks: 1,
	_clicks: [],
	
	addClick: function( data ) {

		if( this.verificaExist( data ) ){
			return "";
		}

		var obj = new Object();
		obj.id = data.id;
		obj.x = data.x;
		obj.y = data.y;
		obj.width = data.width;
		obj.height = data.height
		obj.type = data.type

		this._clicks[this._clicks.length] = obj;
	},
	removeClicks: function( id ){
		var n = [];
		
		for( var i=0; i<this._clicks.length; i++){
			if( id != this._clicks[i].id){
				n[n.length] =  this._clicks[i];
			}
		}
		
		this._clicks = n;
	},
	verificaExist: function( data ){
		for( var i=0; i<this._clicks.length; i++){
			if( data.id == this._clicks[i].id && data.type == this._clicks[i].type ){
				return true
			}
		}
	},
	
	findClick: function(){
    	//var tile = grid._tileOver;

		for(var i = 0; i < ui._availableClicks.length; i++) {	
    		var back = ui._availableClicks[i];
    	
    		/*if( mouseXpos > back.x*this._spaceWidth && mouseXpos < ( back.x*this._spaceWidth + this._spaceWidth ) &&
    			mouseYpos > back.y*this._spaceHeight && mouseYpos < ( back.y*this._spaceHeight + this._spaceHeight )	){
    			return back;
    		}*/
    	}
    },
	
	buyTower: function( tower){
		if( player.coins >= TowerType[tower].coinCost ){
			level.addTower( tower )
		}else{
			info.add({message: "Dinheiro insuficiente", type:"alert"});
		}
		
		grid._clicked = undefined;
	},
	
	update: function(){
		this.veriryTowersAvailabletoBuy();
		if( !enti.existsTowerSelected() ){
			$("#upgradeBox").hide();
		}
		
	},
	
	render:  function( canvas ){
		this.drawTop( canvas );
	},
	
	drawTop:  function( canvas ){
		context = canvas.getContext("2d");
		
		if( level.playing == true){
			var life = loader.findImage( "life");
			var coins = loader.findImage( "coins" );
			
			context.font = 'italic bold 23px sans-serif';
			
			 context.fillStyle = "rgba(46, 58, 74, 0.75)";
			 context.beginPath();
			 context.moveTo(0, 0);
			 context.lineTo(170, 0);
			 context.lineTo(210, 50);
			 context.lineTo(0, 50);
			 context.fill();
			 context.closePath();

			 context.beginPath();
			 context.moveTo(240, 0);
			 context.lineTo(760, 0);
			 context.lineTo(720, 50);
			 context.lineTo(280, 50);
			 context.fill();
			 context.closePath();
			 
			 context.beginPath();
			 context.moveTo(830, 0);
			 context.lineTo(1020, 0);
			 context.lineTo(1020, 50);
			 context.lineTo(790, 50);
			 context.fill();
			 context.closePath();
			 
			 context.fillStyle = '#FFF';
			 context.fillText( "WAVE: " + level.level, 20, 32);
			 context.fillText( player.coins, 350, 32);
			 context.fillText( "SCORE: " + player.points, 540, 32);
			 context.fillText( player.life + " / " + level.lifeTotal , 900, 30);
			 
			 context.drawImage( life.img, 840 , 2 , ( life.img.width ), (  life.img.height ) );
			 context.drawImage( coins.img, 290 , 15 , ( coins.img.width ), (  coins.img.height ) );
		}

	},
	
	startGameMethod: function(){
		$("#saveBnt").show();
		$('#intro').hide();
		$('#endgame').hide();
		$('#textosMain').hide();
		$('#textosMainDesc').hide();
		
		level.startGameMethod();
	},
	
	startSplash: function(){
		$("#tank").show(); $('#tank').css("marginLeft","40%");
		$('#tankImg').css("width","100px");
		$("#tankImg").animate({width:'+=470px'}, { duration: 311 } );
		$("#tank").animate({marginLeft:'-=20%'}, { duration: 311 } );
		
		$("#anima").show(); 
		$("#logo").show(); 

		/*$('#anima').animate({  textIndent: 0 }, {
			step: function(now,fx) {
			  $(this).css('-webkit-transform','rotate('+now+'deg)'); 
			},
			duration:'slow'
		},'linear');*/
		
	},
	veriryTowersAvailabletoBuy: function(){
	
		for(var i=0; i<TowerType.length; i++){
			var t = TowerType[i];
			if( t.coinCost > player.coins ){
				$('#imgTower' + (i+1)).removeClass('ativado').addClass('desativado');
			}else{
				$('#imgTower' + (i+1)).removeClass('desativado').addClass('ativado');
			}
		}
	},
	stopGame: function(){
		paused=true;
	},
	playGame: function(){
		paused=false;
	},
	stopMusic: function(){
		stopMusic = (stopMusic == true) ? false : true;
		
		if( stopMusic ){
			sourceThemeSound.gainNode.gain.value = 0;
			$("#musciImg").attr("src", "images/bnt_music_stop.png" ); 
		}else{
			sourceThemeSound.gainNode.gain.value = 0.4;
			$("#musciImg").attr("src", "images/bnt_music.png" ); 
		}
	},
	stopEffects: function(){
		stopEffects = (stopEffects == true) ? false : true;
		if( stopEffects ){
			sound.addignore("efx");
			$("#soundImg").attr("src", "images/bnt_sound_stop.png" ); 
		}else{
			sound.addignore("");
			$("#soundImg").attr("src", "images/bnt_sound.png" ); 
		}
	},
	aboutUI: function(){
		if( $('#about').css("display") == "none" ){
			this.stopGame();
			$('#about').show();
		}else{
			this.playGame();
			$('#about').hide();
		}
	}
}
