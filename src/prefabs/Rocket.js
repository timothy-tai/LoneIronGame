class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 1.5;
        //this.isFiring = false;
        this.sfxshot = scene.sound.add('sfx_shot', {volume: 0.5});
        this.isFiring = false;
    }

    update() {
        //if(this.isFiring) {
            //this.shootBullet();
            //this.y -= this.movementSpeed;
            //if(this.y < 0.1) {
            //    this.y = game.config.height-borderUISize*1.7-borderPadding;
            //    this.isFiring = false;
            //}
        //} else {
        if(keyLEFT.isDown) {
            this.x -= this.movementSpeed;
        }
        if(keyRIGHT.isDown) {
            this.x += this.movementSpeed;
        }
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            //this.isFiring = true;
            this.sfxshot.play();
            //for the first non true bullet, fire that bullet
            
            //this.bullet.fire(this.x, this.y);
            this.isFiring = true;
            //    this.isFiring = false;
        }
        this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, game.config.width-borderUISize-borderPadding);
        //}
    }

    firetest() {
        if (this.isFiring == true) {
            this.isFiring = false;
            return([this.x+game.config.width/70, this.y]);
        } else {
            return(false);
        } 
    }
    

    reset() {
        this.y = game.config.height-borderUISize*1.7-borderPadding;
        this.isFiring = false;
    }
}