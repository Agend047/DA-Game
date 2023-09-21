/** the Playable Character */
class Character extends MovableObject {

    // height = 280;
    // width = 120;
    // speed = 12;
    // jumpSpeed = 8;
    world;


    // AttackBox Meele Modificators:
    abmX = 80
    abmY = 155
    abmW = (-80)
    abmH = (-190)

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

    drawCharAttackMeeleBox(ctx) {
        ctx.beginPath()
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.pos_x + this.abmX, this.pos_y + this.abmY, this.width + this.abmW, this.height + this.abmH,);
        ctx.stroke();
    }

    /**
     * Here the Inputs from Keyboard get used to control the Character
     */
    counter = 0
    control() {
        setInterval(() => {

            if (this.isDead()) {

                this.loadImageSprite(this.animations.dead);
            } else if (this.gotHit) {
                this.loadImageSprite(this.animations.hurt)
            } else {

                if (this.showFull && this.currentFrame < this.frameRate) {
                    return
                }
                else {
                    if (this.world.keyboard.SPACE) {
                        // this.currentFrame = 0;
                        // this.elapsedFrames = 0;
                        this.attackIntervall(this.animations.meele1)

                    } else if (this.world.keyboard.G) {
                        if (this.animations.range) {
                            // this.currentFrame = 0;
                            // this.elapsedFrames = 0;
                            if (this.enoughAmmo()) this.attackIntervall(this.animations.range)
                        }

                    } else {

                        if (this.world.keyboard.RIGHT && this.pos_x < (world.actualLevel.level_end_x - this.width)) {
                            this.charMoveRight();
                            if (!this.isAboveGround()) {
                                this.loadImageSprite(this.animations.run)
                            }
                        }
                        if (this.world.keyboard.LEFT && this.pos_x > 10) {
                            this.charMoveLeft();
                            if (!this.isAboveGround()) {
                                this.loadImageSprite(this.animations.run)
                            }
                        }
                        if (this.world.keyboard.UP) {
                            this.jump();
                            this.loadImageSprite(this.animations.jump)
                        }
                        if (this.world.keyboard.DOWN) {

                        }
                        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE && !this.world.keyboard.G) {

                            if (!this.isAboveGround()) {
                                this.loadImageSprite(this.animations.idle)
                            }
                        }
                    }
                }
            }
        }, this.globeDelay)
    }


    /**
     * Helper function, plays the needed attack animation.
     * After animation was played completly, will end the intervall..
     */
    attackIntervall(attack) {
        let interval = setInterval(() => {
            this.loadImageSprite(attack)
            if (this.currentFrame == this.frameRate - 1) {
                clearInterval(interval)
                this.loadImageSprite(this.animations.idle)
            }
        }, this.globeDelay);
    }
}


class Acco extends Character {
    height = 280;
    width = 140;
    LeP = 48;

    speed = 10;
    jumpSpeed = 8;

    //Hitbox Modificators:
    hbmX = 50;
    hbmY = 125;
    hbmW = (-90)
    hbmH = (-140)

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
            frameRate: 6,
            frameBuffer: 2,
            dmgFrame: 5,
            dmg: 8,
            showFull: true,
        },
        meele2: {
            imageSrc: 'img/heroes/Acco/Attack_2.png',
            frameRate: 3,
            frameBuffer: 2,
            dmgFrame: 2,
            dmg: 8,
            showFull: true,
        },
        meele3: {
            imageSrc: 'img/heroes/Acco/Attack_3.png',
            frameRate: 4,
            frameBuffer: 2,
            dmgFrame: 3,
            dmg: 14,
            showFull: true,
        },
        // range: { //Acco does not have a ranged attack!
        //     imageSrc: 'img/heroes/Acco/Idle.png',
        //     frameRate: 8,
        //     frameBuffer: 3,
        //     showFull: false
        // },
        hurt: {
            imageSrc: 'img/heroes/Acco/Hurt.png',
            frameRate: 3,
            frameBuffer: 2,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/heroes/Acco/Dead.png',
            frameRate: 3,
            frameBuffer: 5,
        },
    }

    constructor(pos_x, pos_y,) {

        super(pos_x, pos_y,)
        this.loadImageSprite(this.animations.idle)
    }

}

class Eleria extends Character {
    height = 280;
    width = 140;
    LeP = 30;
    ammunition = 20;

    speed = 14;
    jumpSpeed = 10;

    //Hitbox Modificators:
    hbmX = 40;
    hbmY = 125;
    hbmW = (-90);
    hbmH = (-140);


    animations = {
        idle: {
            imageSrc: 'img/heroes/Eleria/Idle.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Eleria_new/Walk.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/heroes/Eleria_new/Jump.png',
            frameRate: 9,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/heroes/Eleria_new/Attack_1.png',
            frameRate: 4,
            frameBuffer: 3,
            dmgFrame: 3,
            dmg: 4,
            showFull: true,

        },
        range: {
            imageSrc: 'img/heroes/Eleria_new/Shot_1.png',
            frameRate: 14,
            frameBuffer: 1,
            dmgFrame: 12,
            dmg: 9,
            showFull: true,
        },
        hurt: {
            imageSrc: 'img/heroes/Eleria_new/Hurt.png',
            frameRate: 3,
            frameBuffer: 2,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/heroes/Eleria_new/Dead.png',
            frameRate: 3,
            frameBuffer: 5,
        },
    }

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,);
        this.loadImageSprite(this.animations.idle)
    }


    enoughAmmo() {
        if (this.ammunition >= 1) {
            this.ammunition -= 0.5;
            console.log(this.ammunition)
            return true
        } else return false
    }
}

class Kazim extends Character {
    height = 280;
    width = 140;
    LeP = 34;
    AsP = 42;


    speed = 12;
    jumpSpeed = 9;

    //Hitbox Modificators:
    hbmX = 50;
    hbmY = 125;
    hbmW = (-95)
    hbmH = (-140)

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
            dmgFrame: 8,
            dmg: 8,
            showFull: true,

        },
        range: {
            imageSrc: 'img/heroes/Kazim/Attack_3FULL.png',
            frameRate: 7,
            frameBuffer: 3,
            dmgFrame: 5,
            dmg: 16,
            showFull: true,
        },
        hurt: {
            imageSrc: 'img/heroes/Kazim/Hurt.png',
            frameRate: 4,
            frameBuffer: 2,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/heroes/Kazim/Dead.png',
            frameRate: 4,
            frameBuffer: 5,
        },
    }


    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,);

        this.loadImageSprite(this.animations.idle)
    }

    enoughAmmo() {
        if (this.AsP >= 6) {
            this.AsP -= 3;
            console.log(this.AsP)
            return true
        } else return false
    }
}