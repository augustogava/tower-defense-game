var Info = function(){
	
}

Info.prototype = {
	messages: [],
	messagesAtual: undefined,
	showTime: 1500,
	sprites: [
				{ name: 'A', x: 330, y: 148, width: 44, height: 61 },
				{ name: 'B', x: 46, y: 210, width: 44, height: 61 },
				{ name: 'C', x: 449, y: 84, width: 44, height: 61 },
				{ name: 'D', x: 90, y: 210, width: 44, height: 61 },
				{ name: 'E', x: 468, y: 210, width: 42, height: 61 },
				{ name: 'F', x: 40, y: 271, width: 40, height: 61 },
				{ name: 'G', x: 211, y: 84, width: 44, height: 61 },
				{ name: 'H', x: 220, y: 210, width: 44, height: 61 },
				{ name: 'I', x: 115, y: 271, width: 21, height: 61 },
				{ name: 'J', x: 153, y: 148, width: 24, height: 61 }, //w24
				{ name: 'K', x: 134, y: 210, width: 44, height: 61 },
				{ name: 'L', x: 78, y: 271, width: 36, height: 61 }, //w36
				{ name: 'M', x: 280, y: 148, width: 44, height: 61 },
				{ name: 'N', x: 177, y: 210, width: 44, height: 61 },
				{ name: 'O', x: 118, y: 84, width: 44, height: 61 },
				{ name: 'P', x: 305, y: 210, width: 44, height: 70 },
				{ name: 'Q', x: 279, y: 2, width: 44, height: 61 },
				{ name: 'R', x: 263, y: 210, width: 44, height: 61 },
				{ name: 'S', x: 371, y: 84, width: 42, height: 61 },
				{ name: 'T', x: 350, y: 210, width: 40, height: 61 },
				{ name: 'U', x: 2, y: 148, width: 44, height: 61 },
				{ name: 'V', x: 379, y: 148, width: 44, height: 61 },
				{ name: 'X', x: 426, y: 148, width: 44, height: 61 },
				{ name: 'W', x: 221, y: 148, width: 55, height: 61 },
				{ name: 'Y', x: 2, y: 210, width: 44, height: 61 },
				{ name: 'Z', x: 389, y: 210, width: 44, height: 61 },
				{ name: ' ', x: 191, y: 440, width: 44, height: 61 }
			],

	
	findLetter: function( letra ){
		for(var i=0; i<this.sprites.length; i++){
			var l = this.sprites[i];
			
			if( letra.toUpperCase() == l.name ){
				return l;
			}
		}
	},

	add: function( data ){
			
		var adi = {
			text: data.message,
			type: data.type,
			tempo: undefined
		};
		
		this.messages[ this.messages.length ] = adi;
	},
	
	update: function(){
		for(var i=0; i<this.messages.length; i++){
			var m = this.messages[i];
			
			var atual = new Date().getTime();
			if( (atual-m.tempo) > this.showTime ){
				this.messagesAtual = undefined;
				this.remove( m );
			}else{
				if( m.tempo == undefined ){
					m.tempo = new Date().getTime();
				}
				this.messagesAtual = m;
				
				return ;
			}
		}
	},
	
	remove: function( messageRemove ){
		var newMessages = [];
		for(var i=0; i<this.messages.length; i++){
			var m = this.messages[i];
			if( m.text != messageRemove.text ){
				newMessages[ newMessages.length ] = m;	
			}
		}

		this.messages= newMessages;
	},
	
	render: function( canvas ){
		context = canvas.getContext("2d");
		
		if( this.messagesAtual != undefined ){
			var imagem = loader.findImage( "font1" );

			if( this.messagesAtual.type == "alert" )
				context.fillStyle = '#f00';
			else
				context.fillStyle = '#FFF';
			
			var word = this.messagesAtual.text;
			var palavra = []
			for (var i = 0; i < word.length; i++){
				palavra[palavra.length] = this.findLetter( word.charAt(i) );
			}

			var xDif = 0;
			var yDif = 200; var mul = 0.5, multLe=6.5;
			multLe = ( palavra.length > 30 )  ? 10 : 10;
			console.info( multLe )
			for (var i = 0; i < palavra.length; i++){
				var p = palavra[i];
				if( p != undefined ){
					context.drawImage( imagem.img , p.x, p.y, p.width, p.height, ( canvas.width/2 + xDif ) - (palavra.length*multLe) , 100, p.width*mul, p.height*mul);
					xDif += p.width*mul;
				}
			}
		}
	}
}
