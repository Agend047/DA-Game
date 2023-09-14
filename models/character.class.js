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

    /**Moving Char according to speed, 
     * and checking camera placement to move camera. So hopefully theres no visible black screen on the right side.*/
    charMoveRight() {
        this.moveRight();
        if (this.world.camera_x > - (world.actualLevel.level_end_x - 720) && this.pos_x > 120) {
            this.world.camera_x = -this.pos_x + 120;
        }
    }

    /**Moving Char according to speed, 
     * and checking camera placement to move camera for no visible black Screen on the left side. */
    charMoveLeft() {
        this.moveLeft();
        if (this.world.camera_x < 0 && this.pos_x < (world.actualLevel.level_end_x - 720)) {
            this.world.camera_x = -this.pos_x + 120;
        }
    }

    /**
     * Here the Inputs from Keyboard get used to control the Character
     */
    control() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.pos_x < (world.actualLevel.level_end_x - this.width)) {
                this.charMoveRight();
            }
            if (this.world.keyboard.LEFT && this.pos_x > 10) {
                this.charMoveLeft();
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


class Acco extends Character {
    height = 280;
    width = 120;
    speed = 10;
    jumpSpeed = 8;

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,).loadImage('img/2_character_pepe/1_idle/idle/I-1.png');

    }

}

class Eleria extends Character {
    height = 280;
    width = 120;
    speed = 14;
    jumpSpeed = 10;

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,).loadImage('img/2_character_pepe/1_idle/idle/I-1.png');

    }

}

class Kazim extends Character {
    height = 280;
    width = 120;
    speed = 12;
    jumpSpeed = 9;

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,).loadImage('img/2_character_pepe/1_idle/idle/I-1.png');

    }

}