var Level = function() {
};

Level.prototype = {
	stepEnemy: 3,
	enemyType: -1,
	level: 0,
	lifeTotal: 30,
	intervalWaves: 4000,
	
	startGame: false,
	playing: false,
	initFlag: false,
	
	startGameMethod: function(){
		this.startGame = true;

		player.init();
		this.enemyType = -1;
		this.level = 0;
		enti.obj = [];
		this.playing = true;
		
		this.verifyInitLevel();
		this.addEffects();

		$.ajax({
		  type: "POST",
		  data: { acao: "invo" },
		  url: "getD.php",
		}).done(function( msg ) {

		});
		
	},
	
	init: function(){
		console.info( "en" + this.enemyType)
		player.coins += 30;
		
		if( EnemyType.length == (this.enemyType+1) ){
			this.enemyType = 0;
		}else{
			this.enemyType++;
		}
		this.initFlag = false;

		var qtdEne = ( (9+this.level*this.stepEnemy) > 20 )? 20 : (9+this.level*this.stepEnemy);
		//var qtdEne = 1;
		for(var i=0; i<qtdEne; i++){
			setTimeout(this.addEnemy, (700*i));
		}
		
	},
	
	addEffects: function(){
		var effects = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
		var effectsNovo = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
		effects.setDefault(0);
		effectsNovo.setDefault(1);
		effects.position = Vector.create( 560, 430 );
		effectsNovo.position = Vector.create( 556, 420 );
		
		//var efx3 = new Effects( { context: document.getElementById( "effects" ).getContext( "2d" ) } );
		//efx3.setDefault(3); efx3.position = Vector.create( 222, 222 ); enti.add( efx3 );
		
		enti.add( effects )
		enti.add( effectsNovo )
	},
	
	addEnemy: function ( ){
		var enemy = new Enemy(EnemyType[ level.enemyType ]);
		enemy.x -= 5
		enti.add( enemy )
	},
	
	addTower: function( tipo ){
		if( grid._clicked != undefined && grid._clicked.x != undefined && this.playing == true  ){
			var tower = new Tower( TowerType[ tipo ], grid._clicked);
			player.coins -= TowerType[tipo].coinCost
			player.points += TowerType[tipo].scoreValue
			enti.add( tower )
		}else{
			info.add({message: "Selecione onde deseja contruir a nova torre.", type:"alert"});
		}
	},
	
	update: function(){
		this.verifyEndGame();
	},

	verifyEndGame: function(){
		if( player.life <= 0){
			this.playing = false;
			if( $('#endgame').css("display") == "none"){
				$('#endgame').show(); 
				$('#scoreText').html(player.points); 
				
				$('#playAgain').click(function() {
					ui.startGameMethod();
				});
				
				$('#intro').hide(); 
				
				$.ajax({
					  type: "GET",
					  data: { acao: "getScore"},
					  url: "getD.php",
					}).done(function( msg ) {
						$("#highscore").html( msg );
					});
					
				this.startGame = false;
				enti.obj = [];
			}
			return ;
		}
		
		
	},

	verifyInitLevel: function(){
		var enemys = enti.getObjetosByType("enemy");
		if( enemys.length == 0 && this.initFlag == false && this.startGame == true ){
			this.initFlag = true;
			this.level += 1;
			setTimeout("level.init()", this.intervalWaves);
			info.add({message: "SE PREPARE, VINDO PROXIMA WAVE", type:"info"});
	
		}
	},
	
	saveScore: function(){
	
		if( $("#nomeText").val() != "") {
			$.ajax({
				  type: "POST",
				  data: { acao: "sve", nameTxt: $("#nomeText").val(), score: player.points, wave: this.level },
				  url: "getD.php",
				}).done(function( msg ) {
					$("#nomeText").val("SALVO COM SUCESSO!");
					$("#saveBnt").hide();
					
					$.ajax({
						  type: "GET",
						  data: { acao: "getScore"},
						  url: "getD.php",
						}).done(function( msg ) {
							$("#highscore").html( msg );
						});
				});
		}
	}
}
