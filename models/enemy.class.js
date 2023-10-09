/** the Enemys Character */
class Enemy extends MovableObject {

    speed;
    playerNear = false;
    hitCounter = 0;

    constructor(pos_x, getY) {

        super(pos_x, getY,)
        this.speed = 0.2 + (Math.random() * 0.25);
    }


    /**
   * The moves of the normal enemy Walker.
   */
    walkerAI() {
        setInterval(() => {
            if (this.isDead()) { this.loadImageSprite(this.animations.dead) }
            else if (this.gotHit && this.hitCounter < 9) { this.knockBack() }
            else {
                if (this.playerNear) {
                    this.isPlayerLeft ? this.otherdirection = true : false;
                    this.strike(this.animations.meele1)
                } else {
                    this.otherdirection = true;
                    this.move()
                }
            }
        }, this.globeDelay);
    }

    /**
 * Shall build on a nice Knockback- effect for enemys, and the Hurt animation gets played.
 * If it was played a few frames, it should not be called until the enemy gets hit again.
 */
    knockBack() {
        this.isPlayerLeft() ? this.pos_x += 1.5 : this.pos_x -= 1.5
        this.loadImageSprite(this.animations.hurt)
        this.hitCounter++

        if (this.hitCounter == 8) this.gotHit = false;
    }

    /** Enemy single Strike. Plays the Attack animation
     * and sets the 'playerNear' variable on false, so the enemy only attacks once, then walks on.
     */
    strike(attack) {
        this.loadImageSprite(attack)
        if (this.currentFrame == attack.dmgFrame - 1 && world.character.isInRangeOf(this)) {
            (world.character.applyDMG(attack.dmg))
        }
        if (this.currentFrame == this.frameRate - 1) {
            this.playerNear = false;
        }
    };

    /**Enemy simple move with animation*/
    move() {
        this.moveLeft();
        this.loadImageSprite(this.animations.walk)
    }

    moveOther() {
        this.moveRight();
        this.loadImageSprite(this.animations.walk)
    }

    /**
    * Defines an area arround enemys, in wich they shall start attacking
    * @param {HTMLElement} ctx The Canvas Element, we draw on.
    */
    drawAggroArea(ctx) {
        ctx.beginPath()
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.pos_x + this.abmX, this.pos_y + this.hbmY, this.width + this.abmW, this.height + this.hbmH,);
        ctx.stroke();
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
     * The Orc Bosses shall follow the player arround, so he may can run- but never hide.
     * But he shall first have the encounter with the player, before hunting him!
     */
    bossAI() {
        if (this.playerEncountered) {
            setInterval(() => {
                if (this.isDead()) { this.loadImageSprite(this.animations.dead) }
                else if (this.gotHit && this.hitCounter < 9) { this.knockBack() }
                else {
                    if (this.playerNear) {
                        this.isPlayerLeft ? this.otherdirection = true : false;
                        this.strike(this.animations.meele1)
                    } else {
                        this.otherdirection = true;
                        this.isPlayerLeft() ? this.move() : this.moveOther()
                    }
                }
            }, this.globeDelay);
        }
    }


    waitingForPlayer() {
        setTimeout(() => {
            let waitIntervall = setInterval(() => {
                if (world.character.pos_x > world.actualLevel.level_end_x - 600) {

                    clearInterval(waitIntervall)

                    this.playerEncountered = true;
                    this.playerEncounter()
                }
            }, this.globeDelay);
        }, 3000);
    }


    playerEncounter() {
        // this.currentFrame = 4;
        let jumping = setInterval(() => {
            this.loadImageSprite(this.animations.jump)
            this.pos_x -= this.speed * 10;


            if (this.currentFrame == this.frameRate - 1) {
                clearInterval(jumping)
                this.bossAI()
            }
        }, this.globeDelay);
    }



    /**
    * The Orc will follow the Player arround the Map.
    * The first timeout is technically needed, otherwise the used variables may still be undefined.
    */
    hunt() {
        // setTimeout(() => {
        setInterval(() => {
            if (this.isPlayerLeft()) {
                this.huntLeft()
            } else {
                this.huntRight()
            }
        }, 16000);
        // }, 1000);
    }


    /**
     * A function for Enemys, that follow the player. They shall follow for a while, untill he hunted enough,
     * then wait and Idle. Then the next hunt function gets started.
     */
    huntLeft() {
        let i = 0;
        let timer = setInterval(() => {
            i++
            if (this.playerNear) {
                this.strike();
            } else {
                this.moveLeft();
                this.loadImageSprite(this.animations.walk)

                if (i >= 300) {
                    clearInterval(timer)
                    this.loadImageSprite(this.animations.idle)
                }
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
            if (this.playerNear) {
                this.strike();
            }
            if (i >= 300) {
                clearInterval(timer)
                this.loadImageSprite(this.animations.idle)
            }
        }, this.globeDelay);
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

    speed = 1;
    jumpSpeed = 8;
    frameRate = 8; //Needed?


    //aggroBox Modificator
    abmX = 15;
    abmW = (-10);

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
            frameBuffer: 3,
            dmgFrame: 4,
            dmg: 6,
            showFull: true,
        },
        meele2: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Attack_1.png',
            frameRate: 4,
            frameBuffer: 2,
            dmgFrame: 3,
            dmg: 2,
            showFull: true,
        },
        walk: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Walk.png',
            frameRate: 7,
            frameBuffer: 4,
        },
        hurt: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Hurt.png',
            frameRate: 2,
            frameBuffer: 3,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Dead2.png',
            frameRate: 4,
            frameBuffer: 4,
        },
    }

    constructor(pos_x, pos_y) {

        super(pos_x, pos_y)
        this.loadImageSprite(this.animations.walk)
    }
}


class OrcBerserker extends Enemy {

    speed = 1;
    jumpSpeed = 8;
    frameRate = 8; //Needed?

    //aggroBox Modificator
    abmX = 25;
    abmW = (-25);

    animations = {
        idle: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Idle.png',
            frameRate: 5,
            frameBuffer: 5,
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
            dmgFrame: 4,
            dmg: 8,
            showFull: true,
        },
        meele2: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Attack_2.png',
            frameRate: 5,
            frameBuffer: 4,
            dmgFrame: 4,
            dmg: 2,
            showFull: true,
        },
        walk: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Walk.png',
            frameRate: 7,
            frameBuffer: 4,
        },
        hurt: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Hurt.png',
            frameRate: 2,
            frameBuffer: 3,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Dead.png',
            frameRate: 4,
            frameBuffer: 4,
        },
    }

    constructor(pos_x, pos_y) {

        super(pos_x, pos_y)
        this.loadImageSprite(this.animations.walk)
    }

}

class WalkerWarrior extends OrcWarrior {

    width = 110;
    height = 220;

    LeP = 16;

    //Hitbox Modificators:
    hbmX = 25;
    hbmY = 80;
    hbmW = (-60);
    hbmH = (-80);


    constructor(min_x) {
        let pos_x = (min_x + Math.random() * 450)
        let getY = 240 + Math.random() * 15

        super(pos_x, getY)
        this.loadImageSprite(this.animations.idle)
        this.walkerAI();
    }

}

class WalkerBerserker extends OrcBerserker {

    width = 140;
    height = 260;

    LeP = 32;

    //Hitbox Modificators:
    hbmX = 25;
    hbmY = 80;
    hbmW = (-60)
    hbmH = (-80)

    constructor(min_x) {
        let pos_x = (min_x + Math.random() * 450)
        let getY = 200 + Math.random() * 15

        super(pos_x, getY)
        this.loadImageSprite(this.animations.idle)
        this.walkerAI();
    }
}


class BossWarrior extends OrcWarrior {

    width = 220;
    height = 440;

    LeP = 32;
    speed = 2;

    //Hitbox Modificators:
    hbmX = 45;
    hbmY = 165;
    hbmW = (-120);
    hbmH = (-160);

    //If true, the Boss will start fighting the player
    playerEncountered = false;

    constructor(pos_x) {
        let getY = 460 - 440

        super(pos_x, getY)
        this.otherdirection = true;
        this.loadImageSprite(this.animations.meele1)
        this.waitingForPlayer()
    }
}

class BossBerserker extends OrcBerserker {

    width = 280;
    height = 520;

    LeP = 64;
    speed = 2;

    //Hitbox Modificators:
    hbmX = 65;
    hbmY = 190;
    hbmW = (-160);
    hbmH = (-190);

    //If true, the Boss will start fighting the player
    playerEncountered = false;

    constructor(pos_x) {
        let getY = 460 - 520

        super(pos_x, getY)
        this.otherdirection = true;

        this.loadImageSprite(this.animations.walk)
        this.waitingForPlayer()
    }
}