class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('bg1', 'assets/bg1.png');
        this.load.image('bg2', 'assets/bg2.png');
        this.load.image('bg3', 'assets/bg3.png');
        this.load.image('bg4', 'assets/bg4.png');
        this.load.image('bg5', 'assets/bg5.png');
        this.load.image('bg7', 'assets/bg7.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('gun', 'assets/gun.png');
        this.load.image('apache', 'assets/apache.png');
        this.load.image('chinook', 'assets/chinook.png');
        this.load.image('jet', 'assets/jet.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 11});
    }

    create() {
        this.music = this.sound.add('bgm2', {
            loop:true
        });
        this.musicOver = this.sound.add('bgm3', {
            loop:true
        });
        this.music.play();
        this.bg7 = this.add.tileSprite(0, 0, 640, 480, 'bg7').setOrigin(0, 0);
        this.bg5 = this.add.tileSprite(0, 0, 640, 480, 'bg5').setOrigin(0, 0);
        this.bg4 = this.add.tileSprite(0, 0, 640, 275, 'bg4').setOrigin(0, -0.9);
        this.bg3 = this.add.tileSprite(0, 0, 640, 189, 'bg3').setOrigin(0, -1.6);
        this.bg2 = this.add.tileSprite(0, 0, 640, 132, 'bg2').setOrigin(0, -0.5);
        this.bg1 = this.add.tileSprite(0, 0, 640, 72, 'bg1').setOrigin(0, -5.7);

        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize*1.7 - borderPadding, 'gun');
        this.add.existing(this.p1Rocket);

        this.bullets = [];
        for(var i = 0; i < 30; i++) {
            this.bullets.push(new Bullet(this,game.config.width / 1.2, game.config.height - borderUISize*2.5, 'bullet'));
        }
        for(var i = 0; i < 30; i++) {
            this.add.existing(this.bullets[i]);
        }
        
        this.ship1 = new Ship(this, game.config.width + borderUISize*6, borderUISize*4, 'apache', 0, 1).setOrigin(0,0);
        this.ship2 = new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'apache', 0, 1).setOrigin(0,0);
        this.ship3 = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'apache', 0, 1).setOrigin(0,0);
        this.ship4 = new Ship(this, game.config.width, borderUISize*2 + borderPadding*1, 'chinook', 0, 3).setOrigin(0,0);
        this.ship5 = new Ship(this, game.config.width, borderUISize + borderPadding*1, 'jet', 0, 5, true).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'CustomFont',
            fontSize: '26px',
            //backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }
        scoreConfig.fontFamily = 'Courier';
        this.scoreLeft = this.add.text(borderUISize - borderPadding*1.1, borderUISize/3 + borderPadding*2, this.p1Score, scoreConfig);
        scoreConfig.fontSize = '25px';
        scoreConfig.fontFamily = 'CustomFont';
        this.kia = this.add.text(borderUISize - borderPadding*4, borderUISize/2.9 + borderPadding*2, "KIA:", scoreConfig);
        
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.music.pause();
            this.musicOver.play();
            scoreConfig.fontFamily = 'CustomFont';
            this.add.text(game.config.width/2, game.config.height/4, 'GAME OVER', scoreConfig).setOrigin(0.5);
            scoreConfig.fontSize = '20px';
            this.add.text(game.config.width/2, game.config.height/3 + 64, 'Press [up] to Restart or [down] for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        scoreConfig.fontSize = '18px';
        this.loadText = this.add.text(borderUISize*15 + borderPadding, borderUISize + borderPadding*6, "[R] to Reload", scoreConfig);
        this.loadText2 = this.add.text(borderUISize*15 + borderPadding, borderUISize + borderPadding*6, "Reloading...", scoreConfig);
        this.loadText.alpha = 0;
        this.loadText2.alpha = 0;
        this.check2 = 0;
        this.whentoready = 0;
        scoreConfig.fontSize = '22px';
        this.add.text(borderUISize*5.5 - borderPadding*1.5, borderUISize/3 + borderPadding*2.1, "Blood Loss: ", scoreConfig);
        scoreConfig.fontFamily = 'Courier';
        scoreConfig.fontSize = '26px';
        this.timedisplay= 0;
        this.timecount = this.add.text(borderUISize*9.5 + borderPadding, borderUISize/3 + borderPadding*2, this.timedisplay, scoreConfig);
        scoreConfig.fontFamily = 'CustomFont';
        scoreConfig.fontSize = '22px';
        this.add.text(borderUISize*11.5 + borderPadding*1.5, borderUISize/3 + borderPadding*2.1, "Air[W]:", scoreConfig);
        this.add.text(borderUISize*15 + borderPadding*1.5, borderUISize/3 + borderPadding*2.1, "Burst[E]:", scoreConfig);
        this.add.text(borderUISize*15 + borderPadding*1.45, borderUISize + borderPadding*2.9, "Single[F]:", scoreConfig);
        scoreConfig.fontFamily = 'Courier';
        scoreConfig.fontSize = '26px';
        this.single = 6;
        this.singlesleft = this.add.text(borderUISize*18.4 + borderPadding*1.5, borderUISize + borderPadding*2.9, this.single, scoreConfig);
        this.airstrikes = 1;
        this.strikesleft = this.add.text(borderUISize*13.8 + borderPadding*1.5, borderUISize/3 + borderPadding*2, this.airstrikes, scoreConfig);
        this.bursts = 3;
        this.burstsleft = this.add.text(borderUISize*18.4 + borderPadding*1.5, borderUISize/3 + borderPadding*2, this.bursts, scoreConfig);
        this.flyby = false;
        this.secondpass = false;
    }
    update() {
        this.timedisplay = (Math.round(this.clock.getElapsed()/600));
        this.timecount.text = this.timedisplay;
        var check = this.p1Rocket.firetest();
        if(this.check2 == 6) {
            this.p1Rocket.mutetrue();
            this.loadText.alpha = 1;
        }
        if(Phaser.Input.Keyboard.JustDown(keyR) && this.single == 0) {
            this.whentoready = this.clock.getElapsed() + 3500;
            this.sound.play('reload');
            this.single = 6;
            this.singlesleft.text = this.single;
            this.loadText.alpha = 0;
            this.loadText2.alpha = 1;
            this.check2 = 0;
        }
        if(this.whentoready < this.clock.getElapsed()) {
            this.loadText2.alpha = 0;
        }
        if(this.whentoready < this.clock.getElapsed() && this.check2 !=6) {
            this.p1Rocket.mutefalse();
        }
        // Burst
        var coords = this.p1Rocket.getCoords();
        if(Phaser.Input.Keyboard.JustDown(keyE) && this.bursts != 0) {
            this.bursts -= 1;
            this.burstsleft.text = this.bursts;
            var threebullets = 0;
            for(var i = 0; i < 30; i++) {
                this.bullets[i].fireburst(coords[0], coords[1]);
                threebullets++;
                if(threebullets == 3) {
                    i = 30;
                }
            }
            this.sound.play('burst');
        }
        if(Phaser.Input.Keyboard.JustDown(keyW) && this.airstrikes != 0) {
            this.airstrikes -= 1;
            this.strikesleft.text = this.airstrikes;
            var fifteen = 0;
            for(var i = 0; i < 30; i++) {
                this.bullets[i].fireair();
                fifteen++;
                if(fifteen == 20) {
                    i = 30;
                }
            }
            this.sound.play('airstrike');
        }
        if (check != false && this.check2 !=6) {
            for(var i = 0; i < 30; i++) {
                if(this.bullets[i].fired == false) {
                    this.check2 += 1;
                    this.single -= 1;
                    this.singlesleft.text = this.single;
                    //this.p1Rocket.mutefalse();
                    this.bullets[i].fire(check[0], check[1]);
                    i = 30; 
                }
            }
        }
        
        this.bg1.tilePositionX -= 0.5;
        this.bg2.tilePositionX -= 0.08;
        this.bg3.tilePositionX -= 0.1;
        this.bg4.tilePositionX -=0.02;
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.musicOver.pause();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.musicOver.pause();
            this.scene.start("menuScene");
        }
        if(this.clock.getElapsed() > 40000 && this.secondpass == false) {
            this.flyby = false;
            this.ship5.refire();
            this.secondpass = true;
        }
        if(this.clock.getElapsed() > 40000 && this.flyby == false && this.secondpass == true) {
            this.flyby = true;
            this.sound.play('sfx_jet');
        }
        if (this.clock.getElapsed() > 20000 && this.clock.getElapsed() < 40000 && this.flyby == false) {
            this.flyby = true;
            this.sound.play('sfx_jet');
        }
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            for (var i = 0;i<30; i++) {
                this.bullets[i].update();
            }
            this.ship1.update();           // update spaceships (x4)
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
            if (this.flyby == true && this.ship5.jetstatus() == false) {
                this.ship5.update();
            }
        } 
        //for bullet in bullet group reset that on bullet
        for (var i = 0;i < 30; i++) {
            if(this.checkCollision(this.bullets[i], this.ship3)) {
                this.bullets[i].reset();
                this.shipExplode(this.ship3);
            }
            if (this.checkCollision(this.bullets[i], this.ship2)) {
                this.bullets[i].reset();
                this.shipExplode(this.ship2);
            }
            if (this.checkCollision(this.bullets[i], this.ship1)) {
                this.bullets[i].reset();
                this.shipExplode(this.ship1);
            }
            if(this.checkCollision(this.bullets[i], this.ship4)) {
                this.bullets[i].reset();
                this.shipExplode(this.ship4);
            }
            if(this.checkCollision(this.bullets[i], this.ship5)) {
                this.bullets[i].reset();
                this.flyby = false;
                this.shipExplode(this.ship5);
            }
        }
    }

    checkCollision(bullet, ship) {
        // simple AABB checking
        if (bullet.x < ship.x + ship.width && 
            bullet.x + bullet.width > ship.x && 
            bullet.y < ship.y + ship.height &&
            bullet.height + bullet.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        ship.reset();
        ship.alpha = 1;
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          boom.destroy();                       // remove explosion sprite
        });
        
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
      }
}