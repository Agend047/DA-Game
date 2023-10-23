/** the Enemys Character */
class Enemy extends MovableObject {

    speed;
    playerNear = false;
    attacked = false;
    framesToNextAttack = 0;
    relaxFrames = 9; // Frames, an enemy Model has to wait, until it is allowed to attack again.
    hitCounter = 0; //Variable for knock-back, if enemy gets hit
    dropping; // {Number} like statusID 1 == Health, 2 == ammounition, 3 == Coins
    canStillDrop = true;
    endStarted = false; //Making sure, the end sequence only will start once


    constructor(pos_x, getY, dropID) {

        super(pos_x, getY,)
        this.speed = 0.2 + (Math.random() * 0.25);
        this.dropping = dropID;
    }


    /**
   * The moves of the normal enemy Walker.
   */
    walkerAI() {
        if (this.isDead()) {
            this.loadImageSprite(this.animations.dead)
            if (this.canStillDrop && this.dropping) { this.drop() }
        }
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
    }

    /**
 * Shall build on a nice Knockback- effect for enemys, and the Hurt animation gets played.
 * If it was played a few frames, it should not be called until the enemy gets hit again.
 */
    knockBack() {
        this.isPlayerLeft() ? this.pos_x += 1.5 : this.pos_x -= 1.5
        this.loadImageSprite(this.animations.hurt)
        this.hitCounter++

        if (this.hitCounter >= 8) this.gotHit = false; this.hitCounter = 0;
    }

    /** Enemy single Strike. Plays the Attack animation
     * and sets the 'playerNear' variable on false, so the enemy only attacks once, then walks on.
     */
    strike(attack) {
        this.attacked = true;
        this.framesToNextAttack = this.relaxFrames;
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


    //dropping == {Number} 1 == Health, 2 == ammounition, 3 == Coins 
    drop() {
        if (this.dropping && this.canStillDrop) {
            this.canStillDrop = false;
            if (this.dropping == 1) { world.supplys.push(new HealthPotion(this.pos_x + 40, this.pos_y + 100, false)) }
            if (this.dropping == 2) { world.supplys.push(new Ammounition(this.pos_x + 40, this.pos_y + 100, false)); world.givingRightImage() }
            if (this.dropping == 3) { world.coins.push(new Coin(this.pos_x + 40, this.pos_y + 100, false)) }
        }
    }



    // BOSS AI
    /**
     * Simple check for what the Boss should do
     */
    bossStatusCheck() {
        if (!this.playerEncountered) { this.waitingForPlayer() }
        else if (this.playerEncountered) {
            if (this.encounterJump) { this.bossAI() }
            else { this.playerEncounter() }
        }
    }


    /**Here the Boss just waits for the player. As soon as 'world' is defined, he checks the players position
     * If close enough, a variable will be set on "true", wich will cause the next Phase
    */
    waitingForPlayer() {
        if (world && world.character) {
            if (world.character.pos_x > world.actualLevel.level_end_x - 600) {
                this.playerEncountered = true;
            }
        }
    }


    /** 
     * The Player encounter gets played- the Boss jumps towards the player!
     */
    playerEncounter() {
        this.loadImageSprite(this.animations.jump)
        this.pos_x -= this.speed * 10;
        this.LeP = this.maxLeP;

        if (this.currentFrame == this.frameRate - 1) {
            this.encounterJump = true;

        }
    }

    /**
   * The Orc Bosses shall follow the player arround, so he may can run- but never hide.
   * But he shall first have the encounter with the player, before following him!
   */
    bossAI() {

        if (this.isDead()) {
            if (!this.endStarted) { endGame(1); this.endStarted = true; };
            this.loadImageSprite(this.animations.dead)
        }
        else if (this.gotHit && this.hitCounter < 4) { this.knockBack() }
        else {
            this.isPlayerLeft() ? this.otherdirection = true : this.otherdirection = false;

            if (this.playerNear) {
                this.strike(this.animations.meele1)
            } else {
                if (!world.character.isInRangeOf(this)) {
                    this.otherdirection ? this.move() : this.moveOther()
                } else {
                    this.loadImageSprite(this.animations.idle)
                }
            }
        }
    }





    // UNFINISHED HUNTER IDEAS

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
            frameBuffer: 3,
        },
    }

    constructor(pos_x, pos_y, dropID) {

        super(pos_x, pos_y, dropID)
        this.loadImageSprite(this.animations.walk)
        this.preLoadImages();
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

    constructor(pos_x, pos_y, dropID) {

        super(pos_x, pos_y, dropID)
        this.loadImageSprite(this.animations.walk)
        this.preLoadImages();
    }

}

class WalkerWarrior extends OrcWarrior {

    width = 140;
    height = 220;

    LeP = 16;
    RS = 0;

    //Hitbox Modificators:
    hbmX = 25;
    hbmY = 80;
    hbmW = (-60);
    hbmH = (-80);


    constructor(min_x, dropID) {
        let pos_x = (min_x + Math.random() * 450)
        let getY = 240 + Math.random() * 15

        super(pos_x, getY, dropID)
        this.loadImageSprite(this.animations.idle)
        this.walkerAI();
    }

}

class WalkerBerserker extends OrcBerserker {

    width = 180;
    height = 260;

    LeP = 32;
    RS = 0;

    //Hitbox Modificators:
    hbmX = 25;
    hbmY = 80;
    hbmW = (-60)
    hbmH = (-80)

    constructor(min_x, dropID) {
        let pos_x = (min_x + Math.random() * 450)
        let getY = 200 + Math.random() * 15

        super(pos_x, getY, dropID)
        this.loadImageSprite(this.animations.idle)
        this.walkerAI();
    }
}


class BossWarrior extends OrcWarrior {

    width = 260;
    height = 440;

    LeP = 32;
    maxLeP = 32;
    RS = 1;
    speed = 2;

    //Hitbox Modificators:
    hbmX = 45;
    hbmY = 165;
    hbmW = (-120);
    hbmH = (-160);

    //If true, the Boss will start fighting the player
    playerEncountered = false;
    encounterJump = false; //Did the Boss do the Initial Jump?

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
    maxLeP = 64;
    RS = 2;
    speed = 2;

    //Hitbox Modificators:
    hbmX = 65;
    hbmY = 190;
    hbmW = (-160);
    hbmH = (-190);

    //If true, the Boss will start fighting the player
    playerEncountered = false;
    encounterJump = false; //Did the Boss do the Initial Jump?

    constructor(pos_x) {
        let getY = 460 - 520

        super(pos_x, getY)
        this.otherdirection = true;

        this.loadImageSprite(this.animations.walk)
        this.waitingForPlayer()
    }
}