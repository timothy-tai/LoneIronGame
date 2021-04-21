class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        this.movementSpeed = 5;
        this.fired = false;
    }
    fire(x,y) {
        this.x = x;
        this.y = y;
        this.fired = true;
        this.y -= this.movementSpeed;
    }

    update() {
        if(this.y <=0) {
            this.fired = false;
            this.y = game.config.height-borderUISize*1.7-borderPadding;
        }
    }
    reset() {
        this.y = game.config.height-borderUISize*1.7-borderPadding;
    }
}

/*
class BulletGroup extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
        this.createMultiple({
            classType: Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullet',
        })
    }

    fireBullet(x,y) {
        const bullet = this.getFirstDead();
        bullet.fire(x,y);
    }
}
*/