/** SuperClass for Charakter and Enemys, he can interact with */
class MovableObject extends GameObject {

    gravitySpeed = 0;
    gravityAcceleration = 1.5;

    constructor(pos_x, pos_y, width, height,) {
        super(pos_x, pos_y, width, height,)
    }

    moveLeft() {
        setInterval(() => {
            this.pos_x -= this.speed;
        }, 33)
    };

    moveRight() {
        setInterval(() => {
            this.pos_x += this.speed;
        }, 33)
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.gravitySpeed < 0) {
                this.pos_y += this.gravitySpeed;
                this.gravitySpeed += this.gravityAcceleration;
            } else {
                this.gravitySpeed = 0;
            }
        }, 33)
    }

    isAboveGround() {
        return this.pos_y < 180;
    }
}