class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image('bg1', 'assets/bg1.png');
        this.load.image('bg2', 'assets/bg2.png');
        this.load.image('bg3', 'assets/bg3.png');
        this.load.image('bg4', 'assets/bg4.png');
        this.load.image('bg5', 'assets/bg5.png');
        this.load.image('bg7', 'assets/bg7.png');
        this.load.image('private', 'assets/private.png');
        this.load.image('sergeant', 'assets/sergeant.png');
        this.load.audio('sfx_start', './assets/startshot.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_shot', './assets/shot.wav');
        this.load.audio('bgm', './assets/bgm.wav');
    }

    create() {
        this.music = this.sound.add('bgm', {
          loop:true
        });
        this.music.play();
        this.bg7 = this.add.tileSprite(0, 0, 640, 480, 'bg7').setOrigin(0, 0);
        this.bg5 = this.add.tileSprite(0, 0, 640, 480, 'bg5').setOrigin(0, 0);
        this.bg4 = this.add.tileSprite(0, 0, 640, 275, 'bg4').setOrigin(0, -0.9);
        this.bg3 = this.add.tileSprite(0, 0, 640, 189, 'bg3').setOrigin(0, -1.6);
        this.bg2 = this.add.tileSprite(0, 0, 640, 132, 'bg2').setOrigin(0, -0.5);
        this.bg1 = this.add.tileSprite(0, 0, 640, 72, 'bg1').setOrigin(0, -5.7);
        this.private = this.add.tileSprite(0, 0, 71, 70, 'private').setOrigin(-1.7, -3);
        this.sergeant = this.add.tileSprite(0, 0, 64, 84, 'sergeant').setOrigin(-7.2, -2.42);
        let menuConfig = {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            //backgroundColor: '#F3B141',
            color: '#FFFFFF',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/4.9-borderUISize - borderPadding, 'LONE IRON', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '13px';
        this.add.text(game.config.width/2, game.config.height/4-borderUISize - borderPadding, 'by Timothy Tai', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        this.add.text(game.config.width/2, game.config.height/3.8, 'Controls: Use <--> arrows to move and (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/4, game.config.height/3.5 + borderUISize + borderPadding, 'Difficulty: Private', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.3, game.config.height/3.5 + borderUISize + borderPadding, 'Difficulty: Sergeant', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/4, game.config.height/1.8 + borderUISize + borderPadding, 'Press [<-]', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.3, game.config.height/1.8 + borderUISize + borderPadding, 'Press [->]', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.bg1.tilePositionX -= 1.1;
        this.bg2.tilePositionX -= 0.2;
        this.bg3.tilePositionX -= 0.4;
        this.bg4.tilePositionX -=0.05;
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.music.pause();
          this.sound.play('sfx_start', {volume: 0.5});
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.music.pause();
          this.sound.play('sfx_start', {volume: 0.5});
          this.scene.start('playScene');    
        }
      }
}