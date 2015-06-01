var Sound = function(data){
	this.init(data)
}

Sound.prototype = {
	context: Object,
	bufferLoader: Object,
	bufferList : new Array(),
	loadCount : 0,
	loadTo : 0,
	ignore: "",
	
    init: function(data){
    	if( !isSafari && testCSS('WebkitTransform') )
			this.context = new AudioContext();
		else if( testCSS('MozBoxSizing') )
			this.context = undefined
		else if( /*@cc_on!@*/false || testCSS('msTransform') )
			this.context = undefined
		
			
		//verificaExist
		if( this.context != undefined)
			this.loadTo = data.length;
			
		for (var i = 0; i < data.length; ++i){
			this.loadBuffer(data[i], i);
		}
    	
    },
	
	verificaExist: function( nome ){
		/*for( var i=0; i<this.bufferList.length; i++){
			if( nome == this.bufferList[i].nome){
				return true
			}
		}*/
	},
    
    loadBuffer : function(dados, index) {
		var request = new XMLHttpRequest();
	  	request.open("GET", dados.url, true);

	  	request.responseType = "arraybuffer";
	
	  	var loader = this;
		
		if( this.context != undefined){
			request.onload = function() {
				loader.context.decodeAudioData(
						request.response,
						function(buffer) {
							if (!buffer) {
								alert('error decoding file data: ' + dados.url);
								return;
							}
							
							loader.bufferList[index] = { nome: dados.nome, type: "webkit", typesound: dados.type,  bufferL: buffer};
							loader.loadCount++;
						  },
						function(error) {
							  console.error('decodeAudioData error', error);
						}
					);
				
			  }
		
			  request.onerror = function() {
				  alert('BufferLoader: XHR error');
			  }
				
			request.send();
		}else{
			var snd = new Audio("file.wav"); // buffers automatically when created
			snd.play();
		}
	  	  
	},
    
    createSource: function(buffer) {
	   if( this.context != undefined){
			var source = this.context.createBufferSource();
			var gainNode = this.context.createGain();
			source.buffer = buffer;
			// Connect source to gain.
			source.connect(gainNode);
			// Connect gain to destination.
			gainNode.connect( this.context.destination);
		
			return {
			  source: source,
			  gainNode: gainNode
			};
		}else{
			return {
			  source: "",
			  gainNode: ""
			};
		}
    },
	findSound: function( nome ) {
		for( var i=0; i<this.bufferList.length; i++){
			if( nome == this.bufferList[i].nome){
				return this.bufferList[i];
			}
		}
		
		return { nome: "" , bufferL: ""};
	},
	
	play: function( nome, volume ) {
		for( var i=0; i<this.bufferList.length; i++){
			if( nome == this.bufferList[i].nome){
				//console.info( this.ignore + " != " + this.bufferList[i].typesound)
				if( this.bufferList[i].type == "webkit" && this.ignore != this.bufferList[i].typesound ){
					var sourceThemeSound = this.createSource( this.bufferList[i].bufferL );
					sourceThemeSound.gainNode.gain.value = volume;
					sourceThemeSound.source.start();
				}
			}
		}
		
		return sourceThemeSound;
	},
	addignore: function( n ){
		this.ignore = n;
	}
};

//function finishedLoading(bufferList) {
//  // Create two sources and play them both together.
//  var source1 = context.createBufferSource();
//  var source2 = context.createBufferSource();
//  source1.buffer = bufferList[0];
//  source2.buffer = bufferList[1];
//
//
//	gainnode = context.createGainNode();
//	source1.connect(gainNode);
//	source2.connect(gainNode);
//	
//	gainNode.connect(context.destination);
//	
//  source1.noteOn(0);
//  source2.noteOn(0);

//gainNode.gain.value = fraction * fraction;

//this.source.noteOff(0);//STOP
	

//}

//for (var i = 0; i < rounds; i++) {
//	  var source = this.makeSource(this.buffers[M4A1]);
//	  source.noteOn(time + i * interval);
//	}


//FEITO
//function BufferLoader(context, urlList, callback) {
//	  this.context = context;
//	  this.urlList = urlList;
//	  this.onload = callback;
//	  this.bufferList = new Array();
//	  this.loadCount = 0;
//}
//
//BufferLoader.prototype.loadBuffer = function(url, index) {
//	  // Load buffer asynchronously
//	  var request = new XMLHttpRequest();
//	  request.open("GET", url, true);
//	  request.responseType = "arraybuffer";
//
//	  var loader = this;
//
//	  request.onload = function() {
//
//		  loader.context.decodeAudioData(
//	     	request.response,
//	     	function(buffer) {
//	        if (!buffer) {
//	        	alert('error decoding file data: ' + url);
//	        	return;
//	        }
//	        
//	        loader.bufferList[index] = buffer;
//	        
//	        if (++loader.loadCount == loader.urlList.length)
//	        	loader.onload(loader.bufferList);
//	      },
//	      
//	      function(error) {
//	      	console.error('decodeAudioData error', error);
//	      }
//	    );
//	  }
//
//	  request.onerror = function() {
//		  alert('BufferLoader: XHR error');
//	  }
//
//	  request.send();
//	  
//}
//
//BufferLoader.prototype.load = function() {
//	for (var i = 0; i < this.urlList.length; ++i)
//	this.loadBuffer(this.urlList[i], i);
//}
