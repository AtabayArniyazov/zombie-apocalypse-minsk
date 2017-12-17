'use strict';


let Coins;  //class for coins

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