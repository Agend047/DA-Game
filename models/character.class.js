/** the Playable Character */
class Character extends MovableObject {

    world;
    attacking = false; //Will be true, if char is attacking, so the animation wont get called twice.
    collectedCoins = 0;



    height = 280;
    width = 140;

    // AttackBox Meele Modificators:
    abmX = 80
    abmY = 155
    abmW = (-80)
    abmH = (-190)

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,)
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
        setInterval(async () => {
            this.updateStatusBar(1);

            if (this.isDead()) {
                this.loadImageSprite(this.animations.dead);

            } else if (this.gotHit) {
                this.loadImageSprite(this.animations.hurt)

            } else {
                //Making sure, that important animations cannot get cancelled
                // if (this.showFull && this.currentFrame < this.frameRate - 1) {
                // }

                //Attack animations and processes
                if (this.world.keyboard.SPACE || this.attacking) {
                    //Meele attack
                    if (!this.attacking) {
                        this.attacking = true;
                        await this.meeleAttackIntervall(this.animations.meele1)
                        this.resetAttackBlocker()
                    }
                } else if (this.world.keyboard.G) {
                    //Range attack, if one is there
                    this.world.keyboard.G = false;
                    if (this.animations.range) {
                        if (this.enoughAmmo() && this.attacking == false) {
                            this.attacking = true;
                            this.subtractAmmo();
                            await this.rangeAttackIntervall(this.animations.range)
                            this.updateStatusBar(2)
                            this.resetAttackBlocker()
                        }
                    }
                } else {
                    //Basic Move & Jump Commands
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
                    //Idle Animation, if nothing is pressed
                    if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE && !this.world.keyboard.G) {
                        if (!this.isAboveGround()) {
                            this.loadImageSprite(this.animations.idle)
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
    meeleAttackIntervall(attack) {

        return new Promise((resolve, reject) => {

            const interval = setInterval(() => {
                if (this.gotHit) this.gotHit = false; //Needed to prevent a bug wich keept player in a state of starting an attack, and start the hurt-Animation.
                this.loadImageSprite(attack)

                if (this.currentFrame == attack.dmgFrame) { this.hitEnemys(attack); }

                if (this.currentFrame == this.frameRate - 1) {
                    clearInterval(interval)
                    resolve()
                    // this.loadImageSprite(this.animations.idle2)
                }
            }, this.globeDelay);
        })
    }

    /**
     * Checking on a specific frame, if enemys are in range, wich may be hitted.
     * @param {Object} attack The used animation, with its propertys.
     */
    hitEnemys(attack) {
        let enemys = this.world.enemys
        enemys.forEach(enemy => {
            if (!this.otherdirection) {
                if (enemy.hitRight(this)) {
                    enemy.applyDMG(attack.dmg)
                    enemy.loadImageSprite(enemy.animations.hurt)
                    console.log(enemy.LeP) //CONSOLE
                }
            } else {
                if (enemy.hitLeft(this)) {
                    enemy.applyDMG(attack.dmg)
                    enemy.loadImageSprite(enemy.animations.hurt)
                    console.log(enemy.LeP) //CONSOLE
                }
            }
        });
    }


    /** Resetting the 'attacked' Variable, to make new attacks possible.*/
    resetAttackBlocker() {
        this.attacking = false;
    }

    /** Char makes a ranged attack, and fires a shot.
     * 
     * @param {Object} attack The used attack, with all parameters
     * @returns a Promise, wich gets resolved at the end, so the rest of the code will wait
     */
    rangeAttackIntervall(attack) {
        return new Promise((resolve, reject) => {

            const interval = setInterval(() => {
                if (this.gotHit) this.gotHit = false; //Needed to prevent a bug wich keept player in a state of starting an attack, and start the hurt-Animation.
                this.loadImageSprite(attack)

                if (this.currentFrame == attack.shotFrame) {
                    this.fire(attack)
                    this.currentFrame++
                }

                if (this.currentFrame == this.frameRate - 1) {
                    clearInterval(interval)
                    resolve()
                    //this.loadImageSprite(this.animations.idle2)
                }
            }, this.globeDelay);
        })
    }

    /**
     * The projectile gets created as shootable object, 
     * and will be added to the 'shotableObjects' Array at the World-Class
     */
    async fire(attack) {
        let projectile;
        if (this instanceof Eleria) { projectile = new Arrow(this.pos_x + 100, this.pos_y + 180, this.otherdirection, attack.dmg) }
        else if (this instanceof Kazim) { projectile = new Ignifaxius(this.pos_x + 100, this.pos_y + 190, this.otherdirection, attack.dmg) }
        this.world.shotableObjects.push(projectile)
    }

    /**
     * This draws the Box in front of a char, in wich he deals meele Dmg
     * @param {The context, we draw on} ctx 
     */
    drawCharAttackMeeleBox(ctx) {
        ctx.beginPath()
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.pos_x + this.abmX, this.pos_y + this.abmY, this.width + this.abmW, this.height + this.abmH,);
        ctx.stroke();
    }


    /**
     * Initial Drawing of the Player Status Bars.
     */
    setStatusBars() {

        let healthBar = document.getElementById('health_bg_max');
        healthBar.style.width = (this.maxLeP * 4) + "px";

        let coinBar = document.getElementById('playerCoins_bar');
        // coinBar.style.width = this.world.collectableCoins * 4;

        console.log(this.world)

        if (this.maxAmmunition) {
            let ammoBar = document.getElementById('ammo_bg_max');
            ammoBar.style.width = (this.maxAmmunition * 4) + "px";
        } else { //Acco
            let ammoBar = document.getElementById('ammo_property');
            ammoBar.style.display = 'none';
        }

        let playerBars = document.getElementById('PlayerBars');
        playerBars.style.display = 'block';
    }

    /**
     * Changes the Characters Status bars, so the Bars are correct.
     * 
     * @param {Number} which 1 == Health, 2 == ammounition, 3 == Coins
     */
    updateStatusBar(which) {

        let barsArray = ['playerHealth_bar', 'playerAmmo_bar', 'playerCoins_bar'];
        let variables = [this.LeP, this.ammunition, this.collectedCoins]
        let maxVariables = [this.maxLeP, this.maxAmmunition, this.world.collectableCoins]

        let bar = document.getElementById(barsArray[which - 1])
        let usedVariavle = variables[which - 1]
        let usedMaxVariavle = maxVariables[which - 1]

        let percentage = this.getPercentage(usedVariavle, usedMaxVariavle)
        bar.style.width = percentage + '%';
        if (percentage < 20) {
            bar.style.height = 80 + '%';

        }
    }

    /**
     * Gets the Percentage of the Bar, we want to draw.
     * 
     * @param {*} curr current Amount of used Status
     * @param {*} max Max amount of used Status
     * @returns Percentage of current amount to max amount
     */
    getPercentage(curr, max) {
        return (100 / max) * curr
    }
}

class Acco extends Character {
    LeP = 48;
    maxLeP = 48;

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
        idle2: {
            imageSrc: 'img/heroes/Acco/Idle_2.png',
            frameRate: 3,
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
        this.setStatusBars();
    }

}

class Eleria extends Character {
    LeP = 30;
    maxLeP = 30;
    ammunition = 40;
    maxAmmunition = 40;

    speed = 14;
    jumpSpeed = 10;

    //Hitbox Modificators:
    hbmX = 40;
    hbmY = 125;
    hbmW = (-90);
    hbmH = (-140);


    animations = {
        idle: {
            imageSrc: 'img/heroes/Eleria_new/Idle.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        idle2: {
            imageSrc: 'img/heroes/Eleria_new/Idle_2.png',
            frameRate: 4,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Eleria_new/Run.png',
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
            shotFrame: 12,
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
        this.setStatusBars();

    }

    /**
     * 
     * @returns true, if Eleria got enough Arrows left.
     */
    enoughAmmo() {
        return (this.ammunition >= 2)

    }

    /**
     * An arrow gets shot away, and is gone for good.
     */
    subtractAmmo() {
        this.ammunition -= 2;
    }
}

class Kazim extends Character {

    LeP = 34;
    maxLeP = 34;

    ammunition = 42; //AsP
    maxAmmunition = 42; //AsP

    speed = 12;
    jumpSpeed = 9;

    //Hitbox Modificators:
    hbmX = 50;
    hbmY = 125;
    hbmW = (-95)
    hbmH = (-140)

    animations = {
        idle: {
            imageSrc: 'img/heroes/Kazim_new/Idle.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        idle2: {
            imageSrc: 'img/heroes/Kazim_new/Idle_2.png',
            frameRate: 5,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Kazim_new/Run.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/heroes/Kazim_new/Jump.png',
            frameRate: 11,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/heroes/Kazim_new/Attack_1.png',
            frameRate: 10, //CHANGE PLS (11 or 8)
            frameBuffer: 2,
            dmgFrame: 8,
            dmg: 4, // wanted, but will always be doubled
            showFull: true,
        },
        range: {
            imageSrc: 'img/heroes/Kazim_new/Attack_3no_igni.png',
            frameRate: 7, //CHANGE PLS (8)
            frameBuffer: 3,
            shotFrame: 5,
            dmg: 16,
            showFull: true,
        },
        hurt: {
            imageSrc: 'img/heroes/Kazim_new/Hurt.png',
            frameRate: 4,
            frameBuffer: 2,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/heroes/Kazim_new/Dead.png',
            frameRate: 4,
            frameBuffer: 5,
        },
    }

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,);

        this.loadImageSprite(this.animations.idle);
        this.setStatusBars();
    }

    /**
     * Checks, if Kazim has enough AsP left, to cast.
     * @returns true, if Kazim can cast 'Ignifaxius'
     */
    enoughAmmo() {
        return (this.ammunition >= 3)
    }

    /**
     * Subtracts the AsP cost of 'Ignifaxius' from Kazim's AsP
     */
    subtractAmmo() {
        this.ammunition -= 3;
    }
}