class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.movementSpeed = 3;
        this.isFiring = false;
        this.sfxshot = scene.sound.add('sfx_shot');
    }

    update() {
        if(this.isFiring) {
            this.y -= this.movementSpeed;
            if(this.y < borderUISize*3) {
                this.y = game.config.height-borderUISize-borderPadding;
                this.isFiring = false;
            }
        } else {
            if(keyLEFT.isDown) {
                this.x -= 2;
            }
            if(keyRIGHT.isDown) {
                this.x += 2;
            }
            if(Phaser.Input.Keyboard.JustDown(keyF)) {
                this.isFiring = true;
                this.sfxshot.play();
            }
            this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, game.config.width-borderUISize-borderPadding);
        }
    }

    reset() {
        this.y = game.config.height-borderUISize-borderPadding;
        this.isFiring = false;
    }
}