/** the Playable Character */
class Character extends MovableObject {

    // height = 280;
    // width = 120;
    // speed = 12;
    // jumpSpeed = 8;
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
                this.loadImageSprite(this.animations.jump)
            }
            if (this.world.keyboard.DOWN) {
            }
            if (this.world.keyboard.SPACE) {
                this.loadImageSprite(this.animations.meele1)
            }
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE) {
                this.loadImageSprite(this.animations.idle)
            }
        }, 33)
    }

}


class Acco extends Character {
    height = 280;
    width = 120;
    speed = 10;
    jumpSpeed = 8;
    frameRate = 8;

    animations = {
        idle: {
            imageSrc: 'img/heroes/Acco/Idle.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Acco/Run.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/heroes/Acco/Jump.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/heroes/Acco/Attack_1.png',
            frameRate: 4,
            frameBuffer: 2,
        },
        meele2: {
            imageSrc: 'img/heroes/Acco/Attack_2.png',
            frameRate: 4,
            frameBuffer: 2,
        },
    }

    constructor(pos_x, pos_y,) {

        super(pos_x, pos_y,)
        this.loadImageSprite(this.animations.idle)
    }

}

class Eleria extends Character {
    height = 280;
    width = 120;
    speed = 14;
    jumpSpeed = 10;
    frameRate = 6;

    animations = {
        idle: {
            imageSrc: 'img/heroes/Eleria/Idle.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Eleria/Run.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/heroes/Eleria/Jump.png',
            frameRate: 9,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/heroes/Eleria/Attack_1.png',
            frameRate: 4,
            frameBuffer: 3,
        },
    }

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,);
        this.loadImageSprite(this.animations.idle)
    }

}

class Kazim extends Character {
    height = 280;
    width = 120;
    speed = 12;
    jumpSpeed = 9;
    frameRate = 6;

    animations = {
        idle: {
            imageSrc: 'img/heroes/Kazim/Idle.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Kazim/Run.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/heroes/Kazim/Jump.png',
            frameRate: 11,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/heroes/Kazim/Attack_1.png',
            frameRate: 10,
            frameBuffer: 2,
        },
    }


    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,);

        this.loadImageSprite(this.animations.idle)

    }

}