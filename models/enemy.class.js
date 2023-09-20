/** the Enemys Character */
class Enemy extends MovableObject {

    speed;

    constructor(min_x, getY) {
        let getX = (min_x + Math.random() * 450)

        super(getX, getY,)
        this.speed = 0.2 + (Math.random() * 0.25);
    }

    strike() {
        console.log('ATTACK!!')
    };

    move() {
        setInterval(() => {
            this.moveLeft(); //Shall be able to move left & right! 
            this.loadImageSprite(this.animations.walk)

        }, this.globeDelay);

    }

    /**
   * Defines an area arround enemys, in wich they shall start attacking
   * @param {HTMLElement} ctx The Canvas Element, we draw on.
   */
    drawAggroArea(ctx) {
        ctx.beginPath()
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.pos_x, this.pos_y + this.hbmY, this.width, this.height + this.hbmH,);
        ctx.stroke();
    }
}

class Chicken extends Enemy {
    width = 140;
    height = 100;

    constructor(min_x) {
        super(min_x).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}

class OrcWarrior extends Enemy {
    width = 110;
    height = 220;

    speed = 1;
    jumpSpeed = 8;
    frameRate = 8; //Needed?

    //Hitbox Modificators:
    hbmX = 25;
    hbmY = 80;
    hbmW = (-60)
    hbmH = (-80)

    animations = {
        idle: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Idle.png',
            frameRate: 5,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Run.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Jump.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Attack_1.png',
            frameRate: 4,
            frameBuffer: 2,
        },
        meele2: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Attack_1.png',
            frameRate: 4,
            frameBuffer: 2,
        },

        walk: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Walk.png',
            frameRate: 7,
            frameBuffer: 4,
        },
    }

    constructor(min_x) {
        let getY = 240 + Math.random() * 15

        super(min_x, getY)
        this.loadImageSprite(this.animations.idle)
        //  this.move();
    }
}


class OrcBerserker extends Enemy {
    width = 140;
    height = 260;

    speed = 1;
    jumpSpeed = 8;
    frameRate = 8; //Needed?

    //Hitbox Modificators:
    hbmX = 25;
    hbmY = 80;
    hbmW = (-60)
    hbmH = (-80)

    animations = {
        idle: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Idle.png',
            frameRate: 5,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Run.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Jump.png',
            frameRate: 5,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Attack_1.png',
            frameRate: 4,
            frameBuffer: 2,
        },
        meele2: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Attack_2.png',
            frameRate: 5,
            frameBuffer: 2,
        },

        walk: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Walk.png',
            frameRate: 7,
            frameBuffer: 4,
        },
    }

    constructor(min_x) {
        let getY = (200 + Math.random() * 15)

        super(min_x, getY)
        this.loadImageSprite(this.animations.idle)
        this.hunt()
    }

    /**
     * The Orc will follow the Player arround the Map.
     * The first timeout is technically needed, otherwise the used variables may still be undefined.
     */
    hunt() {
        setTimeout(() => {
            setInterval(() => {
                if (this.isPlayerLeft()) {
                    this.huntLeft()
                } else {
                    this.huntRight()
                }
            }, 16000);
        }, 1000);
    }

    /**
     * Looking for the Player position, so the red Orcs can follow the player.
     * @returns true if player is on the left side, or false, if hes on the right side.
     */
    isPlayerLeft() {
        let playerX = world.character.pos_x
        let orcX = this.pos_x
        return playerX < orcX ? true : false
    }

    /**
     * A function for Enemys, that follow the player. They shall follow for a while, untill he hunted enough,
     * then wait and Idle. Then the next hunt function gets started.
     */
    huntLeft() {
        let i = 0;
        let timer = setInterval(() => {
            i++
            this.moveLeft();
            this.loadImageSprite(this.animations.walk)
            if (i === 200) {
                clearInterval(timer)
                this.loadImageSprite(this.animations.idle)
            }
        }, this.globeDelay);
    }

    /**
     * A function for Enemys, that follow the player. They shall follow for a while, untill he hunted enough,
     * then wait and Idle. Then the next hunt function gets started.
     */
    huntRight() {
        let i = 0;
        let timer = setInterval(() => {
            i++
            this.moveRight();
            this.loadImageSprite(this.animations.walk)
            if (i === 200) {
                clearInterval(timer)
                this.loadImageSprite(this.animations.idle)
            }
        }, this.globeDelay);
    }
}