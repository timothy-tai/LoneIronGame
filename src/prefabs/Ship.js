class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, isjet) {
        super(scene, x, y, texture, frame, isjet);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.pause = false;
        this.isjet = isjet;
    }

    update() {
        if(this.isjet == true) {
            this.x -= 11
        } else {
            this.x -= this.moveSpeed;
        }
        if(this.x< -this.width) {
            this.x = game.config.width;
            if(this.isjet == true) {
                this.pause = true;
            }
        }
    }

    reset() {
        this.x = game.config.width + 50+(10*Phaser.Math.Between(1,10));
        if (this.isjet == true) {
            this.pause = true;
        }
    }

    jetstatus() {
        return this.pause;
    }

    refire() {
        this.pause = false;
    }
}