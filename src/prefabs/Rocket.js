class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 1.5;
        //this.isFiring = false;
        this.sfxshot = scene.sound.add('sfx_shot', {volume: 0.5});
        //this.sfxload = scene.sound.add('gunload');
        this.isFiring = false;
        //this.isLoaded = true;
        this.mute = false;
    }

    update() {
        if(keyLEFT.isDown) {
            this.x -= this.movementSpeed;
        }
        if(keyRIGHT.isDown) {
            this.x += this.movementSpeed;
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && this.mute == false) {
            this.sfxshot.play();
            this.isFiring = true;
        }
        this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, game.config.width-borderUISize-borderPadding);
    }

    firetest() {
        if (this.isFiring == true) {
            this.isFiring = false;
            return([this.x+game.config.width/70, this.y]);
        } else {
            return(false);
        } 
    }

    mutetrue() {
        this.mute = true;
    }
    mutefalse() {
        this.mute = false;
    }

    reset() {
        this.y = game.config.height-borderUISize*1.7-borderPadding;
        this.isFiring = false;
    }
}