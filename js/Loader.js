var Loader = function(){
	this._cTotal = 0;
	this._cAtual = 0;
}

Loader.prototype = {
	_images: [],
	_cTotal: 0,
	_cAtual: 0,
	
	add: function( data ) {

		if( this.verificaExist( data.nome ) ){
			return "";
		}
		this._cTotal++;
		
		var that = this;

		var obj = new Object();
		obj.nome = data.nome;
		obj.url = data.url;
		obj.img = new Image();
		obj.load = false;
		
		obj.img.onload = function( a ){
			loader._cAtual++;
		};

		obj.img.src = obj.url + "?t=" + new Date().getTime();

		this._images[this._images.length] = obj;
	},
	verificaExist: function( nome ){
		for( var i=0; i<this._images.length; i++){
			if( nome == this._images[i].nome){
				return true
			}
		}
	},
	findImage: function( nome ) {
		for( var i=0; i<this._images.length; i++){
			if( nome == this._images[i].nome){
				return this._images[i];
				
			}
		}
	}
}
