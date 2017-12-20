'use strict';

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.load.image('loading', 'img/splashScreen.png');
	game.load.image('sky', 'img/bgMain.png');
	game.load.image('ground2', 'img/ground2.png');
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
	game.load.image('menuButton', 'img/menuButton.png');
	game.load.image('restartGame', 'img/restart.png');
	game.load.image('pauseGame', 'img/pause.png');
	game.load.image('playGame', 'img/play.png');
	game.load.image('music', 'img/music.png');
	game.load.image('sound', 'img/sound.png');
	game.load.image('scoreBoard', 'img/scoreBoard.png');
	game.load.image('man', 'img/man.png');
	game.load.image('bgForTableScore', 'img/bgForTableScore.png');
	game.load.atlas('dude', 'img/dude_sprite.png', 'img/dude_sprite.json');
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

let menuGroup;
let menuGroupOpen = false;
let menuButton;
let pauseGame;
let playGame;
let restartGame;

let scoreBoard;
let scoreBoardCreate = false;
let scoreBoardOpen = false;
let bgForScoreBoard;
let textScore0;
let textScore1;
let textScore2;
let textScore3;
let textScore4;
let textScore5;
let textScore6;
let textScore7;
let textScore8;
let textScore9;
let textScore10;
let textScore11;
let textScore12;
let textScore13;
let textScore14;
let textScore15;

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

let playerName;
let bestScores = [];
let best15Scores = '';
let scoreStorage = new tAJAXStorage();
let score = 0;
let scoreText;
let gameOverText1;
let gameOverText2;
let levelComplete1;
let levelComplete2;


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

	buildGround(platformCoordinateY);
	buildPlatform();

	let dangerousObstaclesCoordinateY = game.world.height - 33;
	buildDangerousObstacles(dangerousObstaclesCoordinateY);

	buildSimpleBox();

//CONTROLS SETTING----------------------------------------------------------------------------------------------------------------------------------
	menuGroup = game.add.group();

	menuButton = game.add.button(game.width - 25, 25, "menuButton");
	menuButton.scale.setTo(0.5, 0.5);
	menuButton.anchor.set(0.5, -0.1);

	menuButton.events.onInputDown.add(function () {
		if (game.camera.x > 0) {
			menuGroup.fixedToCamera = !menuGroup.fixedToCamera;	
		}

		if (!menuGroup.fixedToCamera) {
			if(menuGroup.y == 0){
				let menuTween = game.add.tween(menuGroup).to({
					y: 375     
				}, 500, Phaser.Easing.Bounce.Out, true);
			}
		}
	}, this);

	menuGroup.add(menuButton);

	playGame = game.add.button(game.width - 25, - 25, "playGame");
	playGame.anchor.set(0.5);
	playGame.scale.setTo(0.5, 0.5);

	playGame.events.onInputDown.add(function () {
		game.paused = false;
	}, this);

	menuGroup.add(playGame);

	pauseGame = game.add.button(game.width - 25, - 75, "pauseGame");
	pauseGame.anchor.set(0.5);
	pauseGame.scale.setTo(0.5, 0.5);

	pauseGame.events.onInputDown.add(function () {
		game.paused = true;
	}, this);

	menuGroup.add(pauseGame);

	restartGame = game.add.button(game.width - 25, - 125, "restartGame");
	restartGame.anchor.set(0.5);
	restartGame.scale.setTo(0.5, 0.5);

	restartGame.events.onInputDown.add(function () {
		location.reload();
	}, this);

	menuGroup.add(restartGame);

	music = game.add.button(game.width - 25, - 175, "music");
	music.anchor.set(0.5);
	music.scale.setTo(0.5, 0.5);

	music.events.onInputDown.add(function () {
		if (musicPlay) {
			environment.pause();
			musicPlay = false;
		} else {
			environment.play();
			musicPlay = true;
		}
	}, this);

	menuGroup.add(music);

	sound = game.add.button(game.width - 25, - 225, "sound");
	sound.anchor.set(0.5);
	sound.scale.setTo(0.5, 0.5);

	sound.events.onInputDown.add(function () {
		if (soundPlay) {
			game.sound.mute = true;
			soundPlay = false;
		} else {
			game.sound.mute = false;
			soundPlay = true;
		}
			
	}, this);

	menuGroup.add(sound);

	scoreBoard = game.add.button(game.width - 25, - 275, "scoreBoard");
	scoreBoard.anchor.set(0.5);
	scoreBoard.scale.setTo(0.5, 0.5);

	let createScoreMenu = function createScoreMenu() {
		for (var key in scoreStorage.hashStorage) {
			bestScores.push([key, scoreStorage.hashStorage[key]]);
		}

		bestScores.sort(function (a, b) {
			return a[1] - b[1];
		})

		bestScores.reverse();
		
		bgForScoreBoard = game.add.sprite(game.camera.view.width/2 -200, game.camera.view.height/2 - 250, 'bgForTableScore');
		bgForScoreBoard.inputEnabled = true;
		bgForScoreBoard.fixedToCamera = true;

		textScore0 = game.add.text(bgForScoreBoard.x + 60, bgForScoreBoard.y + 10, 'Highscore Table', { fontSize: '32px', fill: 'red' });
		textScore0.fixedToCamera = true;
		textScore1 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 50, '1) ' + bestScores[0][0] + ' - ' + bestScores[0][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore1.fixedToCamera = true;
		textScore2 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 74, '2) ' + bestScores[1][0] + ' - ' + bestScores[1][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore2.fixedToCamera = true;
		textScore3 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 98, '3) ' + bestScores[2][0] + ' - ' + bestScores[2][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore3.fixedToCamera = true;
		textScore4 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 122, '4) ' + bestScores[3][0] + ' - ' + bestScores[3][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore4.fixedToCamera = true;
		textScore5 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 146, '5) ' + bestScores[4][0] + ' - ' + bestScores[4][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore5.fixedToCamera = true;
		textScore6 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 170, '6) ' + bestScores[5][0] + ' - ' + bestScores[5][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore6.fixedToCamera = true;
		textScore7 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 194, '7) ' + bestScores[6][0] + ' - ' + bestScores[6][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore7.fixedToCamera = true;
		textScore8 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 218, '8) ' + bestScores[7][0] + ' - ' + bestScores[7][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore8.fixedToCamera = true;
		textScore9 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 242, '9) ' + bestScores[8][0] + ' - ' + bestScores[8][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore9.fixedToCamera = true;
		textScore10 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 266, '10) ' + bestScores[9][0] + ' - ' + bestScores[9][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore10.fixedToCamera = true;
		textScore11 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 290, '11) ' + bestScores[10][0] + ' - ' + bestScores[10][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore11.fixedToCamera = true;
		textScore12 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 314, '12) ' + bestScores[11][0] + ' - ' + bestScores[11][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore12.fixedToCamera = true;
		textScore13 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 338, '13) ' + bestScores[12][0] + ' - ' + bestScores[12][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore13.fixedToCamera = true;
		textScore14 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 362, '14) ' + bestScores[13][0] + ' - ' + bestScores[13][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore14.fixedToCamera = true;
		textScore15 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 382, '15) ' + bestScores[14][0] + ' - ' + bestScores[14][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore15.fixedToCamera = true;
	};

	scoreBoard.events.onInputDown.add(function () {
		if (!scoreBoardCreate) {
			createScoreMenu();
			scoreBoardCreate = true;
		}

		if (scoreBoardOpen) {
			bgForScoreBoard.visible = false;
			textScore0.visible = false;
			textScore1.visible = false;
			textScore2.visible = false;
			textScore3.visible = false;
			textScore4.visible = false;
			textScore5.visible = false;
			textScore6.visible = false;
			textScore7.visible = false;
			textScore8.visible = false;
			textScore9.visible = false;
			textScore10.visible = false;
			textScore11.visible = false;
			textScore12.visible = false;
			textScore13.visible = false;
			textScore14.visible = false;
			textScore15.visible = false;
			game.paused = false;

		} else {
			bgForScoreBoard.visible = true;
			textScore0.visible = true;
			textScore1.visible = true;
			textScore2.visible = true;
			textScore3.visible = true;
			textScore4.visible = true;
			textScore5.visible = true;
			textScore6.visible = true;
			textScore7.visible = true;
			textScore8.visible = true;
			textScore9.visible = true;
			textScore10.visible = true;
			textScore11.visible = true;
			textScore12.visible = true;
			textScore13.visible = true;
			textScore14.visible = true;
			textScore15.visible = true;
			game.paused = true;
		}

		scoreBoardOpen = !scoreBoardOpen;
	}, this);

	menuGroup.add(scoreBoard);
	
//PLAYER SETTING----------------------------------------------------------------------------------------------------------------------------------
	dude = new Player(game, 20, 500);

//MAN SETTING-------------------------------------------------------------------------------------------------------------------------------------
	man = game.add.sprite(11100, 290, 'man');
	game.physics.enable(man, Phaser.Physics.ARCADE);
	man.collideWorldBounds = true;
	man.enableBody = true;
	man.scale.setTo(0.15, 0.15);

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

	levelComplete1 = game.add.text(20, 50, 'Level complete!', { font: "85px Arial Black", fill: "#c51b7d" });
	levelComplete1.stroke = "#de77ae";
	levelComplete1.strokeThickness = 16;
	levelComplete1.setShadow(5, 5, "#black", 2, false, true);
	levelComplete2 = game.add.text(200, 300, "Your score is " + score, { font: "85px Arial Black", fill: "#c51b7d" });
	levelComplete2.stroke = "#de77ae";
	levelComplete2.strokeThickness = 16;
	levelComplete2.setShadow(5, 5, "#black", 2, false, true);
	game.physics.arcade.enable([ levelComplete1, levelComplete2 ]);
	levelComplete1.body.velocity.setTo(0, 200);
	levelComplete1.body.collideWorldBounds = true;
	levelComplete1.body.bounce.set(1);
	levelComplete1.alpha = 0;
	levelComplete1.fixedToCamera = true;
	levelComplete2.body.velocity.setTo(0, -100);
	levelComplete2.body.collideWorldBounds = true;
	levelComplete2.body.bounce.set(1);
	levelComplete2.alpha = 0;
	levelComplete2.fixedToCamera = true;

//REMOVE CONTEXTMENU (right click on mouse)------------------------------------------------------------------------------------------------------
	game.canvas.oncontextmenu = function (event) {
		event.preventDefault (); 
	}

//ASK PLAYERS NAME-------------------------------------------------------------------------------------------------------------------------------
	playerName = prompt('What is your name?', "Borodach");

}



function update() {
	if (game.camera.x > 0 && !menuGroupOpen) {
		menuGroup.fixedToCamera = !menuGroup.fixedToCamera;
		menuButton.anchor.set(0.5);
		menuGroupOpen = !menuGroupOpen;
	}

	game.physics.arcade.collide(levelComplete1, levelComplete2);

	game.physics.arcade.overlap(dude, man, levelComplete, null, this);

	function levelComplete (girl, man) {
		scoreStorage.addValue(playerName, score);

		levelComplete1.fixedToCamera = false;
		levelComplete2.fixedToCamera = false;
		levelComplete1.alpha = 1;
		levelComplete2.alpha = 1;
		levelComplete2.setText("Your score is " + score);

		restartGame = new Controls(game, game.width * 0.5, game.height * 0.5, 'restartGame');
		restartGame.events.onInputDown.add(function () {
			location.reload();
		}, this);

		restartGame.anchor.set(-1.5, 2.5);
		restartGame.scale.setTo(1.5, 1.5);
	}

}

// function render() {
//     game.debug.cameraInfo(game.camera, 32, 32);
//     game.debug.spriteCoords(dude, 800, 32);
//     // dude.weapon.debug(32, 3100);
// }