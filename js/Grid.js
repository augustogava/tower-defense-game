var Grid = function() {

};

Grid.prototype = {
    _tiles: [],
    __availableGrid: [],
    _spaceWidth: 40,
    _spaceHeight: 40,
    _show: false,

    _tileOver: {},
    _clicked: {},
	
    update: function( ) {
    	if( this._show == true){
    		this._tileOver = this.getTileMouseOver();
    	}
    },
    findClick: function(){
		grid._clicked = grid._tileOver
		enti.verifyTowerClick();
	},
    getTileMouseOver: function(){
    	for(var i = 0; i < this._availableGrid.length; i++) {	
    		var back = this._availableGrid[i];
    	
    		if( mouseXpos > back.x*this._spaceWidth && mouseXpos < ( back.x*this._spaceWidth + this._spaceWidth ) &&
    			mouseYpos > back.y*this._spaceHeight && mouseYpos < ( back.y*this._spaceHeight + this._spaceHeight )	){
    			return back;
    		}
    	}
    },
    
    drawOverTile: function( canvas ){
    	var context = canvas.getContext("2d");
    	if( this._tileOver != undefined){
    		context.fillStyle = 'rgba(0,0,0,0.2)';
    		context.fillRect( this._tileOver.x*this._spaceWidth, this._tileOver.y*this._spaceWidth, ( this._spaceWidth), ( this._spaceHeight) );
    	}
		
		if( this._clicked != undefined){
    		context.fillStyle = 'rgba(0,0,0,0.2)';
    		context.fillRect( this._clicked.x*this._spaceWidth, this._clicked.y*this._spaceWidth, ( this._spaceWidth), ( this._spaceHeight) );
			
			
    	}
    },
    
    render: function( canvas ) {
    	var context = canvas.getContext("2d");
		if( this._show == true){
			for(var i = 0; i < this._tiles.length; i++) {	
				var back = this._tiles[i];
				context.beginPath();
				
				context.strokeStyle = 'rgba(150,150,150, .07)';
				
				context.moveTo( back.x, back.y);
				context.lineTo( ( back.x + this._spaceWidth), ( back.y ) );
				
				context.moveTo( back.x,back.y );
				context.lineTo( ( back.x ), ( back.y + this._spaceHeight ) );
	
			 	context.stroke();
			}
			
			this.drawOverTile( canvas )
		}
    }
}
