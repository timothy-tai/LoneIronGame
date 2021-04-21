class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y , texture, frame);
        this.movementSpeed = 5;
    }
    fire(x,y) {
        this.y = game.config.height-borderUISize*1.7-borderPadding;
        this.setActive(true);
        this.setVisible(true);
        this.y -= this.movementSpeed;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if(this.y <=0) {
            this.setActive(false);
            this.setVisible(false);
            this.y = game.config.height-borderUISize*1.7-borderPadding;
        }
    }
}


class BulletGroup extends Phaser.GameObjects.Group {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.createMultiple({
            classType: Bullet,
            frameQuantity: 10,
            active: false,
            visible: false,
            key: this.texture
        })
    }

    fireBullet(x,y) {
        const bullet = this.getFirstDead();
        if (bullet) {
            bullet.fire(x,y);
        }
    }
}