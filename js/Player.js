var Player = function(){
	this.init()
}

Player.prototype = {
	coins: 170,
	points: 0,
	life: 0,
	
	init: function(){
		this.coins = 170;
		this.points = 0;
		this.life = level.lifeTotal;
		console.info("entro")

	},
	
	tm: function(){
		if( level.playing == true ){
			$.ajax({
			  type: "POST",
			  data: { acao: "PHPSC", scre: player.points },
			  url: "getD.php",
			}).done(function( msg ) {

			});
		}
	}
}
