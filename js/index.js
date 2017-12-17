'use strict';

const game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// const game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


function preload() {
	game.load.image('loading', 'img/splashScreen.png');


	game.load.image('sky', 'img/bgMain.png');
	// game.load.image('ground1', 'img/ground1.png');
	game.load.image('ground2', 'img/ground2.png');
	// game.load.image('ground3', 'img/ground3.png');
	game.load.image('ground4', 'img/ground4.png');
	game.load.image('ground5', 'img/ground5.png');
	game.load.image('ground6', 'img/ground6.png');
	game.load.image('ironBox1', 'img/ironBox1.png');
	game.load.image('ironBox2', 'img/ironBox2.png');
	game.load.image('ironBox3', 'img/ironBox3.png');
	game.load.image('ironBox4', 'img/ironBox4.png');
	game.load.image('box1', 'img/woodenBox.png');
	game.load.image('box2', 'img/woodenBox2.png');
	game.load.image('acid', 'img/acid.png');
	game.load.image('lava', 'img/lava.png');
	game.load.image('acidLava', 'img/acidLava.png');
	game.load.image('frozenFlame', 'img/frozenFlame.png');
	game.load.image('bullet', 'img/bullet.png');
	game.load.image('restartGame', 'img/restart.png');
	game.load.image('pauseGame', 'img/pause.png');
	game.load.image('playGame', 'img/play.png');
	game.load.image('music', 'img/music.png');
	game.load.image('sound', 'img/sound.png');

	game.load.atlas('dude', 'img/dude_sprite.png', 'img/dude_sprite.json');
	game.load.atlas('man', 'img/man_sprite.png', 'img/man_sprite.json');
	game.load.atlas('zombieFemale', 'img/zombieFemale_sprite.png', 'img/zombieFemale_sprite.json');
	game.load.atlas('zombieMale', 'img/zombieMale_sprite.png', 'img/zombieMale_sprite.json');

	game.load.spritesheet('coin1', 'img/belarusianCoin1_sprite.png', 68, 68);
	game.load.spritesheet('coin2', 'img/belarusianCoin2_sprite.png', 68, 68);
	game.load.spritesheet('coin050', 'img/belarusianCoin050_sprite.png', 68, 68);
	game.load.spritesheet('coin020', 'img/belarusianCoin020_sprite.png', 68, 68);
	game.load.spritesheet('coin010', 'img/belarusianCoin010_sprite.png', 68, 68);
	game.load.spritesheet('coin05', 'img/belarusianCoin05_sprite.png', 68, 68);
	game.load.spritesheet('coin02', 'img/belarusianCoin02_sprite.png', 68, 68);
	game.load.spritesheet('coin01', 'img/belarusianCoin01_sprite.png', 68, 68);

	game.load.spritesheet('explosion', 'img/explode.png', 128, 128);

	game.load.audio('coinSound', 'sounds/coin.wav');
	game.load.audio('environment', 'sounds/ambientmain.ogg');
	game.load.audio('zombieDead1', 'sounds/zombieDead1.wav');
	game.load.audio('zombieDead2', 'sounds/zombieDead2.wav');
	game.load.audio('zombieDead3', 'sounds/zombieDead3.wav');
	game.load.audio('zombieDead4', 'sounds/zombieDead4.wav');
	game.load.audio('zombieDead5', 'sounds/zombieDead5.wav');
	game.load.audio('zombieDead6', 'sounds/zombieDead6.wav');
	game.load.audio('zombieDead7', 'sounds/zombieDead7.wav');

	game.load.audio('pistol', 'sounds/pistol.wav');
	game.load.audio('churchBell', 'sounds/churchBell.wav');
	game.load.audio('rockBreak', 'sounds/rockBreak.wav');


}

let pauseGame;
let playGame;
let restartGame;
let music;
let musicPlay = true;
let sound;
let soundPlay = true;

let dude;
let man;

let zombie;

let platforms;
let dangerousObstacles;
let simpleBox;

let cursors;

let coin1;
let coin2;
let coin050;
let coin020;
let coin010;
let coin05;
let coin02;
let coin01;

let environment;

let score = 0;
let scoreText;
let gameOverText;


function create() {
	game.stage.backgroundColor = '#ffffff';

	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

	game.add.tileSprite(0, 0, 11188, 660, 'sky');
	game.world.setBounds(0, 0, 11188, 660);

	environment = game.add.audio('environment');
	environment.loopFull();
	environment.play();

	game.physics.startSystem(Phaser.Physics.ARCADE);
	cursors = game.input.keyboard.createCursorKeys();

//PLATFORMS SETTING----------------------------------------------------------------------------------------------------------------------------------
	platforms = game.add.group();
	platforms.enableBody = true;

	dangerousObstacles = game.add.group();
	dangerousObstacles.enableBody = true;

	simpleBox = game.add.group();
	simpleBox.enableBody = true;

	let platformCoordinateY = game.world.height - 40;

	buildGround(platformCoordinateY);
	buildPlatform();

	let dangerousObstaclesCoordinateY = game.world.height - 33;
	buildDangerousObstacles(dangerousObstaclesCoordinateY);

	buildSimpleBox();

//CONTROLS SETTING----------------------------------------------------------------------------------------------------------------------------------
	playGame = new Controls(game, game.width, 0, 'playGame');
	playGame.events.onInputDown.add(function () {
		game.paused = false;
	}, this);

	pauseGame = new Controls(game, game.width - 50, 0, 'pauseGame');
	pauseGame.events.onInputDown.add(function () {
		game.paused = true;
	}, this);

	restartGame = new Controls(game, game.width - 100, 0, 'restartGame');
	restartGame.events.onInputDown.add(function () {
		location.reload();
	}, this);

	music = new Controls(game, game.width - 150, 0, 'music');
	music.events.onInputDown.add(function () {
		if (musicPlay) {
			environment.pause();
			musicPlay = false;
		} else {
			environment.play();
			musicPlay = true;
		}
	}, this);
	
	sound = new Controls(game, game.width - 200, 0, 'sound');
	sound.events.onInputDown.add(function () {
		if (soundPlay) {
			game.sound.mute = true;
			soundPlay = false;
		} else {
			game.sound.mute = false;
			soundPlay = true;
		}
			
	}, this);
	
//PLAYER SETTING----------------------------------------------------------------------------------------------------------------------------------
	dude = new Player(game, 20, 500);

//MAN SETTING----------------------------------------------------------------------------------------------------------------------------------
	man = new Man(game, 11100, 250);

//ZOMBIES SETTING----------------------------------------------------------------------------------------------------------------------------------
	zombie = new Zombies(game, 60, 250);
	zombie = new Zombies(game, 300, 370);
	zombie = new Zombies(game, 360, 80);
	zombie = new Zombies(game, 480, 80);
	zombie = new Zombies(game, 600, 260);
	zombie = new Zombies(game, 480, 460);
	zombie = new Zombies(game, 600, 460);
	zombie = new Zombies(game, 900, 460);
	zombie = new Zombies(game, 840, 140);
	zombie = new Zombies(game, 1100, 460);
	zombie = new Zombies(game, 1860, 140);
	zombie = new Zombies(game, 1980, 140);
	zombie = new Zombies(game, 2160, 460);
	zombie = new Zombies(game, 2280, 460);
	zombie = new Zombies(game, 2460, 320);
	zombie = new Zombies(game, 2580, 80);
	zombie = new Zombies(game, 2700, 80);
	zombie = new Zombies(game, 2580, 460);
	zombie = new Zombies(game, 2700, 460);
	zombie = new Zombies(game, 2880, 460);
	zombie = new Zombies(game, 3000, 460);
	zombie = new Zombies(game, 3240, 200);
	zombie = new Zombies(game, 3840, 200);
	zombie = new Zombies(game, 3960, 200);
	zombie = new Zombies(game, 3480, 460);
	zombie = new Zombies(game, 3780, 460);
	zombie = new Zombies(game, 4080, 460);
	zombie = new Zombies(game, 4620, 380);
	zombie = new Zombies(game, 4680, 380);
	zombie = new Zombies(game, 5040, 400);
	zombie = new Zombies(game, 5400, 260);
	zombie = new Zombies(game, 5400, 440);
	zombie = new Zombies(game, 5500, 440);
	zombie = new Zombies(game, 5760, 440);
	zombie = new Zombies(game, 5760, 440);
	zombie = new Zombies(game, 6060, 440);
	zombie = new Zombies(game, 6160, 440);
	zombie = new Zombies(game, 6120, 80);
	zombie = new Zombies(game, 6170, 80);
	zombie = new Zombies(game, 6360, 400);
	zombie = new Zombies(game, 6600, 260);
	zombie = new Zombies(game, 6900, 140);
	zombie = new Zombies(game, 6980, 140);
	zombie = new Zombies(game, 6540, 440);
	zombie = new Zombies(game, 6540, 440);
	zombie = new Zombies(game, 6960, 440);
	zombie = new Zombies(game, 6980, 440);
	zombie = new Zombies(game, 7380, 440);
	zombie = new Zombies(game, 7450, 440);
	zombie = new Zombies(game, 7860, 440);
	zombie = new Zombies(game, 7980, 440);
	zombie = new Zombies(game, 7980, 200);
	zombie = new Zombies(game, 8020, 200);
	zombie = new Zombies(game, 8400, 140);
	zombie = new Zombies(game, 8400, 80);
	zombie = new Zombies(game, 8400, 80);
	zombie = new Zombies(game, 9420, 80);
	zombie = new Zombies(game, 9480, 80);
	zombie = new Zombies(game, 9360, 440);
	zombie = new Zombies(game, 9480, 440);
	zombie = new Zombies(game, 10200, 260);
	zombie = new Zombies(game, 10860, 440);
	zombie = new Zombies(game, 10560, 440);
	zombie = new Zombies(game, 10560, 440);
	zombie = new Zombies(game, 11040, 440);

//COINS SETTING----------------------------------------------------------------------------------------------------------------------------------
	let partOfCoins = [game, 840, 380, 'coin01', 1, 4, 3]; // arr = [game, x, y, sprite, type, verticalCount, horizontalCount]
	coin01 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin01.createCoin(partOfCoins);

	partOfCoins = [game, 1920, 320, 'coin02', 2, 5, 3];
	coin02 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin02.createCoin(partOfCoins);

	partOfCoins = [game, 2820, 260, 'coin05', 5, 6, 3];
	coin05 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin05.createCoin(partOfCoins);

	partOfCoins = [game, 3660, 380, 'coin010', 10, 4, 5];
	coin010 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin010.createCoin(partOfCoins);

	partOfCoins = [game, 4500, 380, 'coin020', 20, 2, 2];
	coin020 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin020.createCoin(partOfCoins);

	partOfCoins = [game, 4920, 320, 'coin050', 50, 3, 1];
	coin050 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin050.createCoin(partOfCoins);

	partOfCoins = [game, 5580, 380, 'coin1', 100, 4, 5];
	coin1 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin1.createCoin(partOfCoins);
	
	partOfCoins = [game, 7020, 380, 'coin050', 50, 4, 5];
	coin050 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin050.createCoin(partOfCoins);
	
	partOfCoins = [game, 8220, 380, 'coin050', 50, 4, 5];
	coin050 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin050.createCoin(partOfCoins);
	
	partOfCoins = [game, 9240, 260, 'coin2', 200, 6, 5];
	coin2 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin2.createCoin(partOfCoins);
	
	partOfCoins = [game, 10620, 200, 'coin1', 100, 7, 3];
	coin1 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin1.createCoin(partOfCoins);

//TEXT SETTING-----------------------------------------------------------------------------------------------------------------------------------
	scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'yellow' });
	scoreText.fixedToCamera = true;

//REMOVE CONTEXTMENU (right click on mouse)------------------------------------------------------------------------------------------------------
	game.canvas.oncontextmenu = function (event) {
		event.preventDefault (); 
	}

}

function update() {


}

// // -----------------------------
// function render() {
//     game.debug.cameraInfo(game.camera, 32, 32);
//     game.debug.spriteCoords(dude, 800, 32);
//     dude.weapon.debug(32, 300);
// }
// // -----------------------------