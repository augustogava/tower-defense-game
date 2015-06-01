/**
todo:
 - particles adicionar mais parameots, como img e etc.
 - Class canvas
 - class game padrao que define loop novo do html, process e render, algo dinamico
 -  Entities verificar se da pra ser generico...

*/

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(callback, element){	
	       		window.setTimeout(callback, 1000/90);
            };
  })();
 
function loadJs(filename){

	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", filename + "?t=" + new Date().getTime());

	if (typeof fileref!="undefined"){
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}

loadJs("js/Settings/EnemySettings.js");		
loadJs("js/Settings/TowerSettings.js");		

loadJs("js/math.js");
loadJs("js/utils.js");
loadJs("js/input.js");

loadJs("js/debug.js");
loadJs("js/collision.js");
loadJs("js/canvas.js");
loadJs("js/FrameTimer.js");
loadJs("js/SpriteSheet.js");
loadJs("js/Animation.js");
loadJs("js/Loader.js");
loadJs("js/Map.js");
loadJs("js/Path.js");
loadJs("js/Grid.js");
loadJs("js/Shoot.js");			
loadJs("js/jq.js");		
loadJs("js/Effects.js");		

loadJs("js/Info.js");		
loadJs("js/Level.js");		
loadJs("js/Enemy.js");				
loadJs("js/Tower.js");		
loadJs("js/Level.js");		
loadJs("js/UI.js");		
loadJs("js/Player.js");		
loadJs("js/Sound.js");		
loadJs("js/entities.js");	
loadJs("js/particles.js");	
		
		
var loopAtivo = true; 
var mouseXpos = 0;
var mouseYpos = 0;
var mouseXposClick = 0;
var mouseYposClick = 0;

var particles;

var mathI;
var utils;
var input;

var debug;
var canvas;
var timer;
var map;
var path;

var loader;
var grid;
var level;
var ui;
var player;
var info;
var sound;
var enti;
var collision;
var imgFundo;

var frames = 0, framesAtual = 0;
var framesUpdate = 0;

var obsSelecionados = [];
var requestId = 0;
var tileWidth = 60;
var tileHeight = 60;

var sourceThemeSound;
var effectsSounds;

var paused = false, stopEffects = false, stopMusic = false;

function testCSS(prop) {
    return prop in document.documentElement.style;
}
var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6


function Game(){

	if( !isSafari && testCSS('WebkitTransform') ){
		//$("#sorry").show(); $("#loading").hide(); return;
	}else if( testCSS('MozBoxSizing') ){
		$("#sorry").show(); $("#loading").hide(); return;
	}else if( /*@cc_on!@*/false || testCSS('msTransform') ){
		$("#sorry").show(); $("#loading").hide(); return;
	}else if( isIE ){
		//$("#sorry").show(); $("#loading").hide(); return;
	}
	
	mathI = new MathI();
	utils = new Utils();
	input = new Input();
	debug = new Debug();
	canvas = new Canvas();
	timer = new FrameTimer();
		timer.tick()
	path= new Path();
	loader= new Loader();
	grid= new Grid();
	particles 	= new Particles();
	enti 		= new Entities( $("#myCanvas") );
	collision 	= new Collision( $("#myCanvas") );
	level		= new Level();
	ui			= new UI();
	player		= new Player();
	info 		= new Info();
	
	map = new Map(
					{ 
						map: [	
						      	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
						      	[98,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,8],
						      	[1,1,1,3,1,6,0,2,1,8,1,1,6,0,2,1,1],
						      	[1,1,1,3,1,3,1,3,1,1,1,1,3,1,3,1,1],
						      	[1,8,1,5,0,4,1,5,0,0,0,0,4,1,3,1,9],
						      	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1],
						      	[1,1,6,0,0,0,0,0,0,0,0,0,0,0,4,1,1],
						      	[1,1,3,1,1,1,1,1,1,9,1,1,1,1,1,1,1],
						      	[1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,99, 1],
						      	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
								
								/*[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
						      	[98,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
						      	[1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
						      	[1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
						      	[1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
						      	[1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
						      	[1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
						      	[1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
						      	[1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,99,1],
						      	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]*/
						      ],
						width: tileWidth,
						height: tileHeight,
						imgs: [ { id: 0, nome: "path", value: "images/path_0.png"}, 
								{ id: 1, nome: "wall", value: ""}, 
								{ id: 11, nome: "free", value: ""}, 
								
								{ id: 2, nome: "path1", value: "images/path_1.png"}, 
								{ id: 3, nome: "path2", value: "images/path_2.png"}, 
								{ id: 4, nome: "path3", value: "images/path_3.png"}, 
								{ id: 5, nome: "path4", value: "images/path_4.png"}, 
								{ id: 6, nome: "path5", value: "images/path_5.png"}, 
								
								{ id: 7, nome: "grama", value: "images/grama.png"}, 
								
								{ id: 8, nome: "block", value: "images/block.png"}, 
								{ id: 9, nome: "casa", value: "images/casa.png"}, 
								
								{ id: 98, nome: "path", value: "images/path_0.png"}, 
								{ id: 99, nome: "path", value: "images/path_0.png"} ]
					}
				)

	map.process();
	
	var block = map.findIndex(1);
	var block1 = map.findIndex(9);
	var block2 = map.findIndex(8);
	
	var inicioPath = map.findIndex(98);
	var fimPath = map.findIndex(99);

	grid._show = true;
	grid._tiles = map.tiles;
	grid._spaceWidth = map._spaceHeight;
	grid._spaceHeight = map._spaceHeight;
	grid._availableGrid = block;

	var inicio = { x: inicioPath[0].x, y: inicioPath[0].y, g:10, h: 0, f:0, visited: false };
	var goal = { x: fimPath[0].x, y:fimPath[0].y, g:10, h: 0, f:0, visited: false };
	
	path.addIgnoredPointArray(block); path.addIgnoredPointArray(block1); path.addIgnoredPointArray(block2);
	path.diagonals = false;
	path.findPath(inicio, goal);
	//console.info(path._rota)

	sound	= new Sound( [{ nome: "die1", type:"efx", url:"sounds/die1.mp3"}, { nome: "cocking", type:"efx", url:"sounds/cocking.mp3"}, { nome: "shoo1",type:"efx", url:"sounds/shoo1.mp3"},{ nome: "theme",type:"music", url:"sounds/medal.mp3"},{ nome: "ff",type:"efx", url:"sounds/ff.mp3"},{ nome: "shoot2",type:"efx", url:"sounds/shoot2.mp3"} ] );
	
	//console.info( ( $("#myCanvas").position().left- ($("#myCanvas").width()/2) ) )
	$('#effects').click(function() {
		 grid.findClick();
	});

	$('#credits, #about').click(function() {
		 ui.aboutUI();
	});

	loader.add( { nome:"bg", url: "images/bg.jpg"} );
	loader.add( { nome:"coins", url: "images/coins.png"} );
	loader.add( { nome:"life", url: "images/heart.png"} );
	loader.add( { nome: "font1", url: "images/text/aba.png" } );
	
	//shoots
	for( var i=0; i<ShootType.length; i++ ){
		loader.add( { nome: "tiro" + ShootType[i].type, url: ShootType[i].textureName } );
	}

	//towers	
	for( var i=0; i<TowerType.length; i++ ){
		loader.add( { nome: "tower"+TowerType[i].type, url: TowerType[i].textureName } );
		loader.add( { nome: "towerBase"+TowerType[i].type, url: TowerType[i].textureBaseName } );
		loader.add( { nome: "sell", url: TowerType[i].textureSell } );
		loader.add( { nome: "up"+TowerType[i].towerUpgrade.id, url: TowerType[i].towerUpgrade.texture } );
	}
	
	//enemy
	for( var i=0; i<EnemyType.length; i++ ){
		loader.add( { nome: "ene"+EnemyType[i].type, url: EnemyType[i].textureName } );
	}
	
	setTimeout("game.verifyLoaded()", 1);

	$("#upAttack").click( function (){ enti.upgradeTower("1") });
	$("#upAttackS").click( function (){ enti.upgradeTower("2") });
	$("#upRange").click( function (){ enti.upgradeTower("3") });	
	$("#sell").click( function (){ enti.sellTower() });	
			
	ui.startSplash();
	
	
	
}

Game.prototype.loading = function() {
	var total = loader._cTotal + sound.loadTo;
	var wid = ( 358 * (loader._cAtual + sound.loadCount ) ) / total
	$('.loadingP').css("width", wid);
}

Game.prototype.verifyLoaded = function() {
	this.loading();
	
	if(  loader._cAtual >=( loader._cTotal-2) && sound.loadCount >= sound.loadTo ){
		$('#loading').hide();
		sourceThemeSound = sound.play("theme", 0.3);
		
		$('#intro').click(function() {
			//sound.play("theme", 0.2);
			setInterval(player.tm, 10000);
			ui.startGameMethod();
		});
		
		game.init()
	}else{
		return setTimeout("game.verifyLoaded()", 300);
	}	
}

Game.prototype.init = function() {
	//setInterval("enti.removeObjetctByType( 'efx' )", 700);
	mainLoop(); 
	
}

function mainLoop() {
	if( loopAtivo )

		requestId = requestAnimFrame( mainLoop );
		
	if( this.paused == false )
		game.gameLoop();
}

Game.prototype.gameLoop = function() {
	timer.tick();
	
	this.process();
	this.render();

	this.calculateFrame();
	
	debug.put( framesAtual + " e " + enti.getObjetos().length );
};

Game.prototype.process = function() {
	collision.verificaColisoes( enti.getObjetos() );
	
	level.update();
	ui.update();
	grid.update();
	particles.update();
	enti.update();
	info.update();
};

Game.prototype.render = function() {
	var canv = canvas.getCanvas();
	var context = canvas.getCanvas().getContext("2d");
	context.clearRect( 0, 0, $("#myCanvas").width(), $("#myCanvas").height());
		
	var canvasEffects = document.getElementById( "effects" );
	var ctxEffects = canvasEffects.getContext( "2d" );
	ctxEffects.clearRect( 0, 0, $("#effects").width(), $("#effects").height());
	ctxEffects.globalCompositeOperation = "lighter";
	
	this.drawBG( canv );
	
	map.render( canv );
	grid.render( canv );
	enti.render( );
	info.render( canv );
	ui.render( canv );
	//path.render( canv );
};

Game.prototype.drawBG = function( canvas ) {
	var img = loader.findImage( "bg" );
	var context = canvas.getContext("2d");
	
	context.drawImage( img.img, 0, 0);	
}

Game.prototype.calculateFrame = function() {
	var atual = new Date().getTime();
	if( (atual-framesUpdate) > 1000 || framesUpdate == 0){
		framesUpdate = new Date().getTime();
		framesAtual = frames;
		frames = 0;
	}
	frames++;
}

window.onload = function(){

	ajusteLayout();
	game = new Game();
	
	document.getElementById("effects").addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(document.getElementById("myCanvas"), evt);
		mouseXpos = mousePos.x;
		mouseYpos = mousePos.y;
	}, false);
	
 }
 
 function ajusteLayout(){
	$("#myCanvas, #intro, #endgame").css("margin-left", -( $("#myCanvas").width() / 2 ));
	$("#effects").css("margin-left", -( $("#myCanvas").width() / 2 ));
	$("#ui").css("margin-left", -( $("#myCanvas").width() / 2 ));
	$("#sorry").css("margin-left", -( $("#myCanvas").width() / 2 ));
	$("#about").css("margin-left", -( $("#myCanvas").width() / 2 ));
 }
 
 function getMousePos(canvas, evt) {
	var obj = canvas;
	var top = 0;
	var left = 0;
	while (obj && obj.tagName != 'BODY') {
		top += obj.offsetTop;
		left += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	
	var mouseX = evt.clientX - left + window.pageXOffset;
	var mouseY = evt.clientY - top + window.pageYOffset;
	return {
		x : mouseX,
		y : mouseY
	};
}


