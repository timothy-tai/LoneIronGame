class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y, texture, frame) {
        super(scene, x,y,texture, frame);
        this.movementSpeed = 5;
        this.fired = false;
    }
    fire(x,y) {
        this.x = x;
        this.y = y;
        this.fired = true;
    }

    update() {
        if (this.fired == true) {
            this.y -= this.movementSpeed;
        }
        if(this.y <=0) {
            this.reset();
        }
    }
    reset() {
        this.fired= false;
        this.y = game.config.height-borderUISize*1.1-borderPadding;
    }
}
