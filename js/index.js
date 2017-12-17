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

	game.load.atlas('dude', 'img/dude_sprite.png', 'img/dude_sprite.json');
	game.load.atlas('zombieFemale', 'img/zombieFemale_sprite.png', 'img/zombieFemale_sprite.json');
	game.load.atlas('zombieMale', 'img/zombieMale_sprite.png', 'img/zombieMale_sprite.json');

	game.load.spritesheet('coin', 'img/belarusianCoin_sprite.png', 68, 68);
	game.load.spritesheet('explosion', 'img/explode.png', 128, 128);

	game.load.audio('coinSound', 'sounds/coin.wav');
	game.load.audio('environment', 'sounds/ambientmain.ogg');


}

let Controls; //class for controls
let pauseGame;
let playGame;
let restartGame;

let Player;  //class for player
let dude;

let Zombies; //class for zombie
let zombie;

let platforms;
let dangerousObstacles;
let simpleBox;

let cursors;

let Coins;  //class for coins
let coin;

let environment;

let score = 0;
let scoreText;
let gameOverText;


function create() {
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// game.scale.refresh();

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
		ironBox = platforms.create(10980, 480, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10980, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(11100, 360, 'ironBox2');
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
	Controls = function (game, x, y, sprite) {
		Phaser.Sprite.call(this, game, x, y, sprite);

		this.scale.setTo(0.5, 0.5);
		this.anchor.x = 1.2;
		this.anchor.y = -0.2;
		this.fixedToCamera = true;
		this.inputEnabled = true;

		game.add.existing(this);
	}

	Controls.prototype = Object.create(Phaser.Sprite.prototype);
	Controls.prototype.constructor = Controls;
	
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
	

//PLAYER SETTING----------------------------------------------------------------------------------------------------------------------------------
	Player = function (game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'dude');
		game.physics.enable(this, Phaser.Physics.ARCADE);
		game.camera.follow(this);

		this.collideWorldBounds = true;
	    this.enableBody = true;
		this.animations.add('runLeft', Phaser.Animation.generateFrameNames('runL_', 1, 8), 10, true);
		this.animations.add('runRight', Phaser.Animation.generateFrameNames('runR_', 1, 8), 10, true);
		this.animations.add('idleRight', Phaser.Animation.generateFrameNames('idleR_', 1, 10), 15, true);
		this.animations.add('idleLeft', Phaser.Animation.generateFrameNames('idleL_', 1, 10), 15, true);
		this.animations.add('jumpRight', Phaser.Animation.generateFrameNames('jumpR_', 1, 10), 5, true);
		this.animations.add('jumpLeft', Phaser.Animation.generateFrameNames('jumpL_', 1, 10), 5, true);
		this.animations.add('meleeRight', Phaser.Animation.generateFrameNames('meleeR_', 1, 7), 5, true);
		this.animations.add('meleeLeft', Phaser.Animation.generateFrameNames('meleeL_', 1, 7), 5, true);
		this.animations.add('shootRight', Phaser.Animation.generateFrameNames('shootR_', 1, 3), 5, true);
		this.animations.add('shootLeft', Phaser.Animation.generateFrameNames('shootL_', 1, 3), 5, true);
		this.animations.add('deadRight', Phaser.Animation.generateFrameNames('deadR_', 1, 10), 5, true);
		this.animations.add('deadLeft', Phaser.Animation.generateFrameNames('deadL_', 1, 10), 5, true);

		this.body.gravity.y = 500;
	    this.body.collideWorldBounds = true;

	    this.scale.setTo(0.15, 0.15);
	    this.hitPlatform;
	    this.hitSimpleBox;
	    this.playerWay = false; //false == right, true == left
		this.playerLife = 1;

		this.weapon = game.add.weapon(30, 'bullet');
	    this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
	    this.weapon.bulletSpeed = 500;
	    this.weapon.fireRate = 390;
	    this.weapon.trackSprite(this, 65, 37, true);
	    this.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

	    this.weapon.bulletHit = function bulletExplosion(bullet) {
	    	let explosion = game.add.sprite(bullet.x, bullet.y, 'explosion');

			explosion.anchor.x = 0.5;
		    explosion.anchor.y = 0.5;
			explosion.animations.add('explosion');
			explosion.animations.play('explosion', 25, false, true);
	    }

	    this.gameOver = function gameOver() {

	    	gameOverText = game.add.text(game.width * 0.5, game.height * 0.5, 'game over', { fontSize: '100px', fill: '#FA7E4D' });
	    	gameOverText.anchor.set(0.5, 0.5);
	    	gameOverText.fixedToCamera = true;

	    	game.paused = true;

	    	restartGame = new Controls(game, game.width * 0.5, game.height * 0.5, 'restartGame');
			restartGame.events.onInputDown.add(function () {
				location.reload();
			}, this);

			restartGame.anchor.set(0.5, 1.5);
			restartGame.scale.setTo(2, 2);
	    }

	    game.add.existing(this);
	};

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	Player.prototype.update = function() {
		if (this.playerLife === 0) {
			this.gameOver();
		}

		game.physics.arcade.overlap(this.weapon.bullets, simpleBox, bulletHitPlatform, null, this);
		game.physics.arcade.overlap(this.weapon.bullets, platforms, bulletHitPlatform, null, this);
		game.physics.arcade.overlap(this, dangerousObstacles, hitDangerousObstacles, null, this);

	    function bulletHitPlatform (bullet, platform) {
	    	bullet.kill();
	    	this.weapon.bulletHit(bullet);
	    }

	    function hitDangerousObstacles (player, dangerousObstacles) {
	    	this.playerLife = 0;
	    }

		this.hitPlatform = game.physics.arcade.collide(this, platforms);
		this.hitSimpleBox = game.physics.arcade.collide(this, simpleBox);

		this.body.velocity.x = 0;

		if (cursors.left.isDown) {
			this.body.velocity.x = -200;
			this.playerWay = true;

			if (cursors.up.isDown) {
				this.animations.play('jumpLeft');
			} else {
				this.animations.play('runLeft');
			}

		} else if (cursors.right.isDown) {
			this.body.velocity.x = 200;
			this.playerWay = false;

			if (cursors.up.isDown) {
				this.animations.play('jumpRight');
			} else {
				this.animations.play('runRight');
			}

		} else if (cursors.up.isDown) {

			if (this.playerWay) {
				this.animations.play('jumpLeft');
			} else {
				this.animations.play('jumpRight');
			}

		} else if (cursors.down.isDown) {

		} else if (this.fireButton.isDown) {
			if (this.playerWay) {
				this.animations.play('shootLeft');
				this.weapon.bulletSpeed = -500;
				this.weapon.fire();
			} else {
				this.animations.play('shootRight');
				this.weapon.bulletSpeed = 500;
				this.weapon.fire();
			}

		} else {

			if (!this.body.touching.down && !this.hitPlatform && !this.hitSimpleBox) {

				if (this.playerWay) {
					this.animations.play('jumpLeft');
				} else {
					this.animations.play('jumpRight');
				}
			} else {

				if (this.playerWay) {
					this.animations.play('idleLeft');
				} else {
					this.animations.play('idleRight');
				}
			}
		}

		if (cursors.up.isDown && this.body.touching.down && this.hitPlatform) {
			this.body.velocity.y = -400;
		}

		if (cursors.up.isDown && this.body.touching.down && this.hitSimpleBox) {
			this.body.velocity.y = -400;
		}

	};

	dude = new Player(game, 15, 500);

//ZOMBIES SETTING----------------------------------------------------------------------------------------------------------------------------------
	Zombies = function (game, x, y) {

		if (randomInteger(2, 12) % 2 === 0) {
			Phaser.Sprite.call(this, game, x, y, 'zombieFemale');
		} else {
			Phaser.Sprite.call(this, game, x, y, 'zombieMale');
		}

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.collideWorldBounds = true;
	    this.enableBody = true;
	    this.animations.add('walkLeft', Phaser.Animation.generateFrameNames('walkL_', 1, 10), 10, true);
		this.animations.add('walkRight', Phaser.Animation.generateFrameNames('walkR_', 1, 10), 10, true);
		this.animations.add('attackRight', Phaser.Animation.generateFrameNames('attackR_', 1, 8), 15, true);
		this.animations.add('attackLeft', Phaser.Animation.generateFrameNames('attackL_', 1, 8), 15, true);
		this.animations.add('deadRight', Phaser.Animation.generateFrameNames('deadR_', 1, 12), 5, true);
		this.animations.add('deadLeft', Phaser.Animation.generateFrameNames('deadL_', 1, 12), 5, true);
	    this.body.gravity.y = 500;
	    // this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
	    // this.body.bounce.x = 1;
	    this.body.collideWorldBounds = true;
	    this.body.velocity.x = 80;
	    this.zombieWay = false; //false == right, true == left

	    this.scale.setTo(0.15, 0.15);
	    game.add.existing(this);

	};

	Zombies.prototype = Object.create(Phaser.Sprite.prototype);
	Zombies.prototype.constructor = Zombies;

	Zombies.prototype.update = function() {

		game.physics.arcade.collide(this, platforms, function (zombie, platform) {
	        if (zombie.body.velocity.x > 0 && zombie.x > platform.x + (platform.width - zombie.width) || zombie.body.velocity.x < 0 && zombie.x < platform.x) {
	            zombie.body.velocity.x *= -1; 
	        }

	        if (zombie.body.velocity.x > 0) {
	        	zombie.zombieWay = false;
	            zombie.animations.play('walkRight');
	        } else {
	        	zombie.zombieWay = true;
	            zombie.animations.play('walkLeft');
	        }
	    });

		game.physics.arcade.collide(this, dude, attackZombies, null, this);

	 	function attackZombies(zombie, player) {

			if (this.zombieWay) {
				zombie.animations.stop();
				zombie.animations.play('attackLeft');
			} else {
				zombie.animations.stop();
				zombie.animations.play('attackRight');
			}
			
			if (dude.playerLife !== 0) {
				dude.playerLife -= 1;
			}

		}

		game.physics.arcade.overlap(this, dude.weapon.bullets, bulletHitZombie, null, this);
    
	    function bulletHitZombie (zombie, bullet) {
	    	bullet.kill();
    		dude.weapon.bulletHit(bullet);
	    	zombie.kill();
	    }
	};

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
	Coins = function createCoins(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'coin');
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.collideWorldBounds = true;
	    this.enableBody = true;
	    this.animations.add('coin');
		// this.body.gravity.y = 300;
		// this.body.bounce.y = 0.7 + Math.random() * 0.2;
	    this.scale.setTo(0.7, 0.7);

	   	this.coinSound = game.add.audio("coinSound");
		// this.anchor.x = 0.5;
		// this.anchor.y = 0.5;

		this.createCoin = function (array) {
			this.game = array[0];
			this.coordinateX = array[1];
			this.coordinateY = array[2];
			this.countArray = [array[3], array[4]];
			this.coinBoolean = true;

			for (var i = 0; i < this.countArray[0]; i++) {
				let belarusianCoin;
				for (var j = 0; j <= this.countArray[1]; j++) {
					if (j === (this.countArray[1])) {
						if (this.coinBoolean == true) {
							this.coinBoolean = false;
							this.coordinateX -= 60;
						} else {
							this.coinBoolean = true;
							this.coordinateX += 60;
						}
					} else if (this.coinBoolean == true) {
						belarusianCoin = new Coins(game, this.coordinateX, this.coordinateY);
						this.coordinateX += 60;
					} else if (this.coinBoolean == false) {
						belarusianCoin = new Coins(game, this.coordinateX, this.coordinateY);
						this.coordinateX -= 60;
					}
				}
				this.coordinateY += 60;
			}
		}
		
		game.add.existing(this);
	}

	Coins.prototype = Object.create(Phaser.Sprite.prototype);
	Coins.prototype.constructor = Coins;

	Coins.prototype.update = function() {
		this.animations.play('coin', 10, true, false);
		game.physics.arcade.collide(this, platforms);
		game.physics.arcade.overlap(this, dude, collectCoins, null, this);

		function collectCoins(coin, player) {
			this.coinSound.play();
			coin.kill();
			score += 1;
			scoreText.text = 'Score: ' + score + ' rubles';
		}
	};

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
	scoreText = game.add.text(16, 16, 'Score: 0 rubles', { fontSize: '32px', fill: '#FFF' });
	scoreText.fixedToCamera = true;



//REMOVE CONTEXTMENU (right click on mouse)------------------------------------------------------------------------------------------------------
	game.canvas.oncontextmenu = function (event) {
		event.preventDefault (); 
	}

}

function update() {



}



function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



// // -----------------------------
// function render() {

//     game.debug.cameraInfo(game.camera, 32, 32);
//     game.debug.spriteCoords(player, 800, 32);
//     weapon.debug(32, 300);
// }
// // -----------------------------