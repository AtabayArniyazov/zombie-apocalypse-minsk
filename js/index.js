'use strict';

const game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// const game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


function preload() {
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

	game.load.spritesheet('coin', 'img/belarusianCoin_sprite.png', 68, 68);
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

let coin;

let environment;

let score = 0;
let scoreText;
let gameOverText;


function create() {
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

	let ground = platforms.create(0, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(480, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(900, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(1860, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(2160, platformCoordinateY, 'ground5');
		ground.body.immovable = true;
		ground = platforms.create(2580, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(2880, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(3480, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(3780, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(4080, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(5340, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(5760, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(6060, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(6540, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(6960, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(7380, platformCoordinateY, 'ground5');
		ground.body.immovable = true;
		ground = platforms.create(7800, platformCoordinateY, 'ground2');
		ground.body.immovable = true;
		ground = platforms.create(7980, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(8400, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(9180, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(9480, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(10560, platformCoordinateY, 'ground5');
		ground.body.immovable = true;
		ground = platforms.create(10920, platformCoordinateY, 'ground4');
		ground.body.immovable = true;

	
	let dangerousObstaclesCoordinateY = game.world.height - 33;
	let acid = dangerousObstacles.create(240, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(4320, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(4560, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(4800, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(5040, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(8760, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;

	let lava = dangerousObstacles.create(1320, dangerousObstaclesCoordinateY, 'lava');
		lava.body.immovable = true;
		lava = dangerousObstacles.create(1560, dangerousObstaclesCoordinateY, 'lava');
		lava.body.immovable = true;
		lava = dangerousObstacles.create(6300, dangerousObstaclesCoordinateY, 'lava');
		lava.body.immovable = true;

	let frozenFlame = dangerousObstacles.create(2460, dangerousObstaclesCoordinateY, 'frozenFlame');
		frozenFlame.body.immovable = true;
		frozenFlame = dangerousObstacles.create(7680, dangerousObstaclesCoordinateY, 'frozenFlame');
		frozenFlame.body.immovable = true;

	let acidLava = dangerousObstacles.create(3240, dangerousObstaclesCoordinateY, 'acidLava');
		acidLava.body.immovable = true;
		acidLava = dangerousObstacles.create(9720, dangerousObstaclesCoordinateY, 'acidLava');
		acidLava.body.immovable = true;
		acidLava = dangerousObstacles.create(9960, dangerousObstaclesCoordinateY, 'acidLava');
		acidLava.body.immovable = true;
		acidLava = dangerousObstacles.create(10200, dangerousObstaclesCoordinateY, 'acidLava');
		acidLava.body.immovable = true;

	let ironBox = platforms.create(60, 360, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(300, 480, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(360, 180, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(600, 360, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(840, 240, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1200, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1440, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1620, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1620, 420, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1800, 500, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1860, 240, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(2280, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(2460, 420, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(2580, 180, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(3000, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(3240, 300, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(3600, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(3840, 300, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4260, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4440, 480, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4500, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4620, 480, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4740, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4980, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5040, 500, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5220, 260, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5400, 420, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5460, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5640, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5880, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(6120, 180, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(6360, 500, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(6600, 360, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(6900, 240, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7320, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7560, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7740, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7860, 420, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7980, 300, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(8400, 240, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(8640, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(8820, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(8820, 500, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(9000, 380, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(9180, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(9420, 180, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(9840, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10080, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10200, 360, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10560, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10920, 450, 'ironBox1');
		ironBox.body.immovable = true;
		// ironBox = platforms.create(10980, 300, 'ironBox1');
		// ironBox.body.immovable = true;
		ironBox = platforms.create(11040, 360, 'ironBox3');
		ironBox.body.immovable = true;

	let woodenBox1 = simpleBox.create(840, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1260, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1260, 440, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1260, 500, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1260, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1620, 360, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1800, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1800, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(2100, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(2820, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(3720, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(4020, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(5220, 500, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(5280, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(5280, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(5700, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(6000, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(6900, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(7320, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(7920, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(7920, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(8340, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9060, 500, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9060, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9060, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9120, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9120, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9420, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(10500, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(10500, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(10860, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(11160, 620, 'box1');
		woodenBox1.body.immovable = true;

	let woodenBox2 = simpleBox.create(5220, 320, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(5220, 380, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(5220, 440, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(7740, 0, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(7740, 60, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(7740, 120, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(9000, 440, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(9000, 500, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(9000, 560, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(9000, 620, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(10440, 440, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(10440, 500, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(10440, 560, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(10440, 620, 'box2');
		woodenBox2.body.immovable = true;

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
	let partOfCoins = [game, 840, 380, 4, 3]; // arr = [game, x, y, verticalCount, horizontalCount]
	coin = new Coins(game, partOfCoins[1], partOfCoins[2]);
	coin.createCoin(partOfCoins);

	partOfCoins = [game, 1920, 320, 5, 3];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 2820, 260, 6, 3];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 3660, 380, 4, 5];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 4500, 380, 2, 2];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 4920, 320, 3, 1];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 5580, 380, 4, 5];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 7020, 380, 4, 5];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 8220, 380, 4, 5];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 9240, 260, 6, 5];
	coin.createCoin(partOfCoins);
	partOfCoins = [game, 10620, 200, 7, 3];
	coin.createCoin(partOfCoins);

//TEXT SETTING-----------------------------------------------------------------------------------------------------------------------------------
	scoreText = game.add.text(16, 16, 'Score: 0 rubles', { fontSize: '32px', fill: 'yellow' });
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