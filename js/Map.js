var Map = function(data) {
    this.load(data);
};

Map.prototype = {
    _map: [],
    _spaceWidth: 40,
    _spaceHeight: 40,
    imgs: [],
    
    tiles: [],
    
    load: function(data) {
    	this._map = data.map;
    	this._spaceWidth = data.width;
    	this._spaceHeight = data.height;
    	this.imgs = data.imgs;
    },

    addImg: function ( data ){
    	for(var i = 0; i < data.length; i++) {		
		this.imgs[ this.imgs.length ] = data[i];
    	}
    },
    
    process: function( ) {
    	for(var i = 0; i < this._map.length; i++) {
		        for(var e = 0; e < this._map[i].length; e++) {
				var p = this._map[i][e];
				var newDraw = { img: "", x: 0, y:0, tipo:"-" };
				
				newDraw.tipo = p;
				newDraw.x = this._spaceWidth * e;
				newDraw.y = this._spaceHeight * i;

				newDraw.img = this.findImageP( p );
				if( newDraw.img != ""){
					loader.add( { nome:newDraw.img.nome, url: newDraw.img.value } );
				}
				
				this.tiles[this.tiles.length] =  newDraw;
	
			}
        }
        
    },
    
    findImageP: function(p){
		for(var i = 0; i < this.imgs.length; i++) {
			if( this.imgs[i].id == p ){
				return this.imgs[i];
			}
		}

		return "";
    },

    render: function( canvas ) {
		var context = canvas.getContext("2d");
		var imagem = loader.findImage( "piso" );

    	for(var i = 0; i < this.tiles.length; i++) {	
			var back = this.tiles[i];

			var imagem = loader.findImage( back.img.nome );
			
			if( imagem.url != ""){
				context.drawImage( imagem.img, 0, 0, imagem.img.width, imagem.img.height, back.x, back.y, this._spaceWidth, this._spaceHeight);	
			}
//			this.drawGrid( context, back.x, back.y )
		}
    },

    drawGrid: function( context, x, y){
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo( ( x + this._spaceWidth), ( y ) );
	
		context.moveTo( x,y );
		context.lineTo( ( x ), ( y + this._spaceHeight ) );
	
	 	context.stroke();
    },

    findIndex: function(f){
	var retorno = [];
	for(var i = 0; i < this._map.length; i++) {
		for(var e = 0; e < this._map[i].length; e++) {
			var p = this._map[i][e];
			if( p == f)
				retorno[retorno.length] = { x: e, y: i};
		}
	}
	return retorno;
   }
}
