/** the Playable Character */
class Character extends MovableObject {

    height = 280;
    width = 120;
    speed = 4;
    jumpSpeed = 8;
    world;

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,).loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.applyGravity();
        this.control();
    }

    jump() { //Gravity may needs to be disabled while jumps
        if (!this.isAboveGround()) {
            setIntervalX(() => {
                this.pos_y -= this.jumpSpeed;
            }, 33, 10)
        }
    };

    control() {
        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.moveLeft();
            }
            if (this.world.keyboard.RIGHT) {
                this.moveRight();
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