function Entities( canvas ){
	this.canvas = canvas;
	this.obj =  [];
	this.clicked = false;

}

Entities.prototype.getObjetos = function(  ) {
	return this.obj;
}

Entities.prototype.getObjetosByType = function( type  ) {
	var ret = []
	for(var i=0; i < this.obj.length; i++){
		if(  this.obj[i].type == type ){	
			ret[ret.length] = this.obj[i];
		}	
	}
	
	return ret;
}

Entities.prototype.getObjetosById = function( id  ) {
	var ret = []
	for(var i=0; i < this.obj.length; i++){
		if(  this.obj[i].idUnique == id ){	
			ret[ret.length] = this.obj[i];
		}	
	}
	
	return ret;
}

Entities.prototype.add = function( obj ) {
	this.obj.push( obj );
}

Entities.prototype.update = function() {
	for(var i=0; i< this.obj.length; i++){
		this.obj[i].update( timer.getSeconds() );
	}
};

Entities.prototype.verifyTowerClick = function() {
	for(var i=0; i< this.obj.length; i++){
		if( this.obj[i].type == "tower" ){
			if( mouseXpos > this.obj[i].xPath*grid._spaceWidth && mouseXpos < ( this.obj[i].xPath*grid._spaceWidth + grid._spaceWidth ) &&
    			mouseYpos > this.obj[i].yPath*grid._spaceHeight && mouseYpos < ( this.obj[i].yPath*grid._spaceHeight + grid._spaceHeight )	){
				grid._clicked = undefined;
				this.obj[i].focus = true;
    		}else{
				this.obj[i].focus = false;
			}
		}
	}
};

Entities.prototype.existsTowerSelected = function() {
	for(var i=0; i< this.obj.length; i++){
		if( this.obj[i].type == "tower" ){
			if( this.obj[i].focus == true){
				return this.obj[i];
    		}
		}
	}
	
	return false;
};

Entities.prototype.upgradeTower = function( type ) {
	var objSelect = enti.existsTowerSelected();
	objSelect.upgrade( type );
};

Entities.prototype.sellTower = function( type ) {
	var objSelect = enti.existsTowerSelected();
	objSelect.sell( );
};

Entities.prototype.verifyTowerUpgradeClick = function() {
	/*if( ui._clicks != undefined )
		for( var i=0; i<ui._clicks.length; i++){
			if( mouseXpos > ui._clicks[i].x && mouseXpos < ( ui._clicks[i].x+ui._clicks[i].width ) &&
				mouseYpos > ui._clicks[i].y && mouseYpos < ( ui._clicks[i].y+ui._clicks[i].height ) ){
				
				var objA = this.getObjetosById( ui._clicks[i].id );
				
				if( ui._clicks[i].type == "upgrade")
					objA[0].upgrade();
				else
					objA[0].sell();
				return ;
			}
		}
		*/
	//enti.verifyTowerClick();
};

Entities.prototype.render = function( ) {

	for(var i=0; i < this.obj.length; i++){
		if(  this.obj[i] != "undefined" ){		//&& this.obj[i].type != "efx"  
			this.obj[i].draw(  );
		}
	}

};

var xInicial = 0;
var yInicial = 0;

Entities.prototype.findClick = function( evt ) {
	xInicial = mx;
	yInicial = my;
	
	var a = new Block().add(1, 2, 2 );
	enti.add( a ); 	
	
//	var that = enti;
	/*if( evt.button == 2 ) { 
		if( obsSelecionados.length > 0){
			for(var i=0; i < obsSelecionados.length; i++){
				var objeto = obsSelecionados[i];
				
				if( objeto.walk != 'undefined'){
					objeto.walk( xInicial, yInicial);
				}
			}
		}
	}*/
	
//	for(var i=0; i < that.obj.length; i++){
//		if( xInicial >= (objeto.x) && xInicial <= ( (objeto.x) + objeto.width ) ){
//			var objeto = that.obj[i];
//			console.info(objeto)
//			objsAchados.push( objeto );
//		}
//	}
//	that.clicked = true;

}

Entities.prototype.removeObjetct = function( a ) {
	var nObj = [];
	for(var i=0; i< this.obj.length; i++){
		var b = this.obj[i];
		if( a == b.idUnique){
			//nObj[nObj.length] = b;
			this.obj.remove(i);
		}
	}
	//this.obj = nObj;
}

Entities.prototype.removeObjetctByType = function( type ) {
	for(var i=0; i< this.obj.length; i++){
		var b = this.obj[i];
		if( type == b.type){
			if( b.active == false){
				this.obj.remove(i);
			}
		}
	}
}
