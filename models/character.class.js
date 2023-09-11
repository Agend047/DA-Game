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

    jump() { //Gravity may needs to be disabled while jumps
        if (this.gravitySpeed == 0 && !this.isAboveGround()) {
            this.gravitySpeed = -20;
            this.pos_y += this.jumpSpeed;
        }
        else if (this.gravitySpeed < 0) {
            this.gravitySpeed -= 0.55;
        }
    };

    control() {
        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.pos_x -= this.speed;
            }
            if (this.world.keyboard.RIGHT) {
                this.pos_x += this.speed;
            }
            if (this.world.keyboard.UP) {
                this.jump();

                // console.log(this.gravitySpeed)
            }
            if (this.world.keyboard.DOWN) {

            }
            if (this.world.keyboard.SPACE) {

            }
        }, 33)
    }

}