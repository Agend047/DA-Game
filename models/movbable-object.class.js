/** SuperClass for Charakter and Enemys, he can interact with */
class MovableObject extends GameObject {

    gravitySpeed = 0;
    gravityAcceleration = 1.5;

    constructor(pos_x, pos_y, width, height,) {
        super(pos_x, pos_y, width, height,)
    }

    moveRight() {
        console.log('Move right')
    };

    moveLeft() {
        setInterval(() => {
            this.pos_x -= this.speed;
        }, 33)
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.pos_y += this.gravitySpeed;
                this.gravitySpeed += this.gravityAcceleration;
            }
        }, 33)
    }

    isAboveGround() {
        return this.pos_y < 165;
    }
}