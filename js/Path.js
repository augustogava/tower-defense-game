var Path = function(){
	this.load();
}

Path.prototype = {
	/**
	 * Variaveis
	 */
	_images: [],
	_rota: [],
	_ignoredPoints: [],
	c: 0,
	diagonals: false,
	
	/**
	 * Métodos
	 */
	load: function( ){
		
	},
	
	addIgnoredPoint: function( data ){
		this._ignoredPoints[this._ignoredPoints.length] = data;
	},

	addIgnoredPointArray: function( data ){
		for(var i=0; i<data.length; i++){
			this._ignoredPoints[this._ignoredPoints.length] = data[i];
		}
	},
	
	findPath: function( start, goal ) {
		var openListA = Array();
		var closeListA = Array();
		var from = Array();
		
		start.f = 0;
		openListA[openListA.length] = start;

		while( openListA.length > 0 ){
			
			var current = this.getLowestF( openListA );

			if( current.x == goal.x && current.y == goal.y ){
				//return from;
				return this.getPath( from, goal );
				//return this.invertPath();
			}
			
			openListA = this.removeFromList( openListA, current);	
			closeListA[closeListA.length] = current;
			
			var neighbors = Array();
			neighbors[0] = { x: current.x+1, y: current.y, g:10, h: 0, f:0, parent: null };
			neighbors[1] = { x: current.x-1, y: current.y, g:10, h: 0, f:0, parent: null };

			neighbors[2] = { x: current.x, y: current.y+1, g:10, h: 0, f:0, parent: null };
			neighbors[3] = { x: current.x, y: current.y-1, g:10, h: 0, f:0, parent: null };
			
			if( this.diagonals == true ){
				neighbors[4] = { x: current.x+1, y: current.y+1, g:14, h: 0, f:0, parent: null };
				neighbors[5] = { x: current.x+1, y: current.y-1, g:14, h: 0, f:0, parent: null };
				
				neighbors[6] = { x: current.x-1, y: current.y+1, g:14, h: 0, f:0, parent: null };
				neighbors[7] = { x: current.x-1, y: current.y-1, g:14, h: 0, f:0, parent: null };
			}
			
			for(var i=0; i<neighbors.length; i++){
				var neighbor = neighbors[i];
				var tentativeG = current.g + ( Math.abs(current.x - neighbor.x) + Math.abs(current.y - neighbor.y) );
				var valorG = neighbor.g;
				
				
				if( this.existsIn( closeListA, neighbor )){
					if( tentativeG > valorG ){
						continue;
					}
				}
				
				if( !this.freeBlock( neighbor ) && this.verifyBounds( neighbor ) ){
					if( !this.existsIn( closeListA, neighbor ) ){
						closeListA[closeListA.length] = neighbor;
					}
					continue;
				}
				
				
				
				if( !this.existsIn( openListA, neighbor )  ){
					
					neighbor.parent = current;
					neighbor.g = tentativeG;
					neighbor.f = neighbor.g + this.costHeuristic( neighbor, goal );
					
					from[from.length] = neighbor;

					if( !this.existsIn( openListA, neighbor ) ){
						openListA[openListA.length] = neighbor;
					}
				}
			}
		}
	},

	render: function( canvas ){
		var context = canvas.getContext("2d");
		var t = 60;

		for( var i=0; i<this._rota.length; i++){

			var x=this._rota[i].x
			var y=this._rota[i].y
			context.beginPath();
		     context.arc( (x*t), (y*t), 5, 0, 2 * Math.PI, true);
		     context.fillStyle = 'green';
		     context.fill();
		     context.lineWidth = 1;
		     context.strokeStyle = '#003300';
		     context.stroke();
		}

		for( var i=0; i<this._ignoredPoints.length; i++){

			var x=this._ignoredPoints[i].x
			var y=this._ignoredPoints[i].y
			context.beginPath();
		     context.arc( (x*t)+3, (y*t), 5, 0, 2 * Math.PI, true);
		     context.fillStyle = 'red';
		     context.fill();
		     context.lineWidth = 1;
		     context.strokeStyle = '#003300';
		     context.stroke();
		}
	},
		
	getLowestF: function ( lista ){
		var v = 10000;
		var retorno = undefined;
		for(var i=0; i<lista.length; i++){
			if( v > lista[i].f  ){
				v = lista[i].f;
				retorno = lista[i];
			}
		}
		
		return retorno;
	},
	invertPath: function(){
		var novo = []
		for(var i=this._rota.length-1; i>=0; i--){
			novo[novo.length] = this._rota[i];
		}
		
		this._rota = novo;
	},
	/*getPath: function(came_from, current_node, start){

		var c = this.find( came_from, current_node, start );
	
		if( c != undefined ){
			if( c.x == start.x && c.y == start.y){
				console.info("ACHOO")
				return ;
			}

			var p = this.getPath(came_from, c.parent, start);
			this._rota[this._rota.length] = c;
		    return p;
		}else{
			this._rota[this._rota.length] = current_node;
			
			return current_node;
		}
	},*/
	getPath: function(came_from, current_node){
		
		var c = this.find( came_from, current_node );
		
		if( c != undefined ){
			var p = this.getPath(came_from, c.parent);
			this._rota[this._rota.length] = current_node;
		    return p;
		}else{
			this._rota[this._rota.length] = current_node;
			
			return current_node;
		}
	},
	
	find: function( search, value ) {
		
		for(var i=0; i<search.length; i++){
			if( value.x == search[i].x && value.y == search[i].y ){
				return search[i];
		    }
	    }
		
		return undefined;
	},
	
	costHeuristic: function( start, goal ) {
		return ( Math.abs( goal.x-start.x) ) + ( Math.abs( goal.y-start.y ) );	
	},
	
	removeFromList: function( search, value ) {
		var ret = Array();
		
		for(var i=0; i<search.length; i++){
			if( value.x != search[i].x || value.y != search[i].y ){
				ret[ret.length] = search[i];
		    }
	    }
		
		return ret;
	},
	
	existsIn: function( search, value ) {
		
		for(var i=0; i<search.length; i++){
			if( value.x == search[i].x && value.y == search[i].y ){
				return true
		    }
	    }
		
		return false;
	},
	
	freeBlock: function( lista ){
		for(var i=0; i < this._ignoredPoints.length; i++){
			//console.info( lista.x + " ==  " + this._ignoredPoints[i].x + " && " + lista.y + " == " + this._ignoredPoints[i].y )	
			if( lista.x == this._ignoredPoints[i].x && lista.y == this._ignoredPoints[i].y ){
				//console.info("		Not Free" )					
				return false;
			}
		}
		
		return true;
	},
	
	verifyBounds: function( ent  ) {
		if( ent.x > 0 &&
			ent.y > 0  ){
			return true;
		}
		
		return false;
	},

	findIgnored: function(){

	}
}
