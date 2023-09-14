/** SuperClass for Charakter and Enemys, he can interact with */
class MovableObject extends GameObject {

    gravitySpeed = 0;
    gravityAcceleration = 1.5;

    constructor(pos_x, pos_y, width, height,) {
        super(pos_x, pos_y, width, height,)
    }

    //Constant moving for enemys to right side.
    moveRight() {
        this.pos_x += this.speed;
    };

    //constant moving for enemys to the left side
    moveLeft() {
        this.pos_x -= this.speed;
    };

    /** 
     * To simulate gravity, everything above the ground will change position towards ground.
     * Speed is increasing by 'gravityAcceleration'
     * Else will make sure that Character wont be positioned to far from moving-area.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.gravitySpeed < 0) {
                this.pos_y += this.gravitySpeed;
                this.gravitySpeed += this.gravityAcceleration;
            } else {
                this.gravitySpeed = 0;
                if (this.pos_y > 165) {
                    this.pos_y = 165
                }
            }
        }, 33)
    }

    /**
     * If Char stands on ground, gravity gets reversed, and he jumps.
     * While holding the UP-button, the lower part will make gravity speed rise slower- Resulting in higher jumps, when user keeps the up-key pressed.
     */
    jump() {
        if (this.gravitySpeed == 0 && !this.isAboveGround()) {
            this.gravitySpeed -= this.jumpSpeed * 2.2;
            this.pos_y += this.jumpSpeed;
        }
        else if (this.gravitySpeed < 0) {
            this.gravitySpeed -= 0.55;
        }
    };

    isAboveGround() {
        return this.pos_y < 140;
    }
}