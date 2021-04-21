class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y, texture, frame) {
        super(scene, x,y,texture, frame);
        this.movementSpeed = 6;
        //this.movementSpeedX = 0;
        this.fired = false;
        this.burst = false;
    }
    fire(x,y) {
        this.x = x;
        this.y = y;
        this.fired = true;
    }
    fireburst(x,y) {
        this.x = x;
        this.y = y+(Phaser.Math.Between(0, 3));
        this.burst = true;
        this.movementSpeed += Phaser.Math.Between(0.1,1);
        //this.movementSpeedX += Phaser.Math.Between(-0.1,0.1);
    }

    update() {
        if (this.fired == true) {
            this.y -= this.movementSpeed;
        }
        if(this.y <=0) {
            this.reset();
        }
        if(this.burst == true) {
            this.y -= this.movementSpeed;
            //this.x += this.movementSpeed;
        }

    }
    reset() {
        this.fired= false;
        this.burst = false;
        this.y = game.config.height-borderUISize*1.1-borderPadding;
        this.x = game.config.width/2;
        this.movementSpeed = 6;
        //this.movementSpeedX = 0;
    }
}
