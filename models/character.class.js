/** the Playable Character */
class Character extends MovableObject {

    height = 280;
    width = 120;
    speed = 12;
    jumpSpeed = 8;
    world;

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,).loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.applyGravity();
        this.control();
    }

    /**
     * If Char stands on ground, gravity gets reversed, and he jumps.
     * While holding the UP-button, the lower part will make gravity speed rise slower- Resulting in higher jumps, when key keeps pressed.
     */
    jump() {
        if (this.gravitySpeed == 0 && !this.isAboveGround()) {
            this.gravitySpeed = -20;
            this.pos_y += this.jumpSpeed;
        }
        else if (this.gravitySpeed < 0) {
            this.gravitySpeed -= 0.55;
        }
    };

    /**
     * Here the Inputs from Keyboard get used to control the Character
     */
    control() {
        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.pos_x -= this.speed;
                this.world.camera_x = -this.pos_x + 100;
            }
            if (this.world.keyboard.RIGHT) {
                this.pos_x += this.speed;
                this.world.camera_x = -this.pos_x + 100;
            }
            if (this.world.keyboard.UP) {
                this.jump();
            }
            if (this.world.keyboard.DOWN) {

            }
            if (this.world.keyboard.SPACE) {

            }
        }, 33)
    }

}