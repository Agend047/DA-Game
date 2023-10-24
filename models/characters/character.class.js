/** the Playable Character */
class Character extends MovableObject {

    world;
    attacking = false; //Will be true, if char is attacking, so the animation wont get called twice.
    collectedCoins = 0;
    endStarted = false;

    height = 280;
    width = 180;

    meeleAtkCounter = 20; //For Chars with multiple meele attacks. After a meele can a different, stronger meele attack be used for some frames

    // AttackBox Meele Modificators:
    abmX = 70
    abmY = 155
    abmW = (-100)
    abmH = (-190)

    dmgDealed = false;

    screenMod = 4; //Screen Modificator. On Fullscreen, it will be 8!


    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,)
        this.applyGravity();
    }

    /**
     * Moving Char according to speed, 
     * and checking camera placement to move camera. So hopefully theres no visible black screen on the right side.
     * */
    charMoveRight() {
        this.moveRight();
        if (this.world.camera_x > - (world.actualLevel.level_end_x - 720) && this.pos_x > 120) {
            this.world.camera_x = -this.pos_x + 120;
        }
    }

    /**
     * Moving Char according to speed, 
     * and checking camera placement to move camera for no visible black Screen on the left side. 
     * */
    charMoveLeft() {
        this.moveLeft();
        if (this.world.camera_x < 0 && this.pos_x < (world.actualLevel.level_end_x - 600)) {
            this.world.camera_x = -this.pos_x + 120;
        }
    }

    /** Here the Inputs from Keyboard get used to control the Character */
    async control() {
        this.updateStatusBar(1);
        this.meeleAtkCounter++
        if (this.isDead()) {
            if (!this.endStarted) { endGame(0); this.endStarted = true; }
            this.loadImageSprite(this.animations.dead);
        } else if (this.gotHit) {
            this.loadImageSprite(this.animations.hurt)
        } else {
            if (this.world.keyboard.SPACE || this.attacking) {
                this.meeleAttack();
            } else if (this.world.keyboard.G) {
                this.rangedAttack();
            } else {
                this.basicMoves()
            }
        }
    }

    /**
     * Overlooking the Meele attack of the Character. 
     * If an Character has multiple Meele Attacks, attacks with basic first, and continues with a Combo. 
     */
    async meeleAttack() {
        if (!this.attacking) {
            this.attacking = true;
            if (this.meeleAtkCounter <= 20 && this.animations.meele2) {
                await this.meeleAttackIntervall(this.animations.meele2)
                this.meeleAtkCounter = 19;
            } else {
                await this.meeleAttackIntervall(this.animations.meele1)
                this.meeleAtkCounter = 10;
            }
            this.resetAttackBlocker();
        }
    }

    /** Overlooking the Ranged attack of the Character. */
    async rangedAttack() {
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
    }

    /** Overlooking Basic Movement of Character. From Moving left to jumping, or standing still. Will all be handled here. */
    basicMoves() {
        if (this.world.keyboard.RIGHT && this.pos_x < (world.actualLevel.level_end_x - this.width)) {
            this.charMoveRight();
            if (!this.isAboveGround()) { this.loadImageSprite(this.animations.run) }
        }
        if (this.world.keyboard.LEFT && this.pos_x > 10) {
            this.charMoveLeft();
            if (!this.isAboveGround()) { this.loadImageSprite(this.animations.run) }
        }
        if (this.world.keyboard.LEFT && this.world.keyboard.RIGHT) { this.loadImageSprite(this.animations.idle) }
        if (this.world.keyboard.UP) {
            this.jump();
            this.loadImageSprite(this.animations.jump)
        }
        //Idle Animation, if nothing is pressed
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE && !this.world.keyboard.G) {
            if (this.isAboveGround()) {
                this.loadImageSprite(this.animations.jump); //while falling
            } else { this.loadImageSprite(this.animations.idle) }; //while standing
        }
    }

    /**
     * Helper function, plays the needed attack animation.
     * After animation was played completly, will resolve the Promise
     */
    meeleAttackIntervall(attack) {
        return new Promise((resolve, reject) => {

            const interval = setInterval(() => {
                if (this.gotHit) this.gotHit = false; //Needed to prevent a bug wich keept player in a state of starting an attack, and start the hurt-Animation.
                this.loadImageSprite(attack)
                if (this.currentFrame == attack.dmgFrame && !this.dmgDealed) {
                    this.hitEnemys(attack);
                }

                if (this.currentFrame >= this.frameRate - 1 || this.isDead()) {
                    this.dmgDealed = false;
                    clearInterval(interval)
                    resolve()
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
            if (!this.otherdirection && enemy.hitRight(this) || this.otherdirection && enemy.hitLeft(this)) {
                enemy.applyDMG(attack.dmg)
            }
        });
        this.dmgDealed = true;
    }

    /** Resetting the 'attacked' Variable, to make new attacks possible.*/
    resetAttackBlocker() {
        this.attacking = false;
    }

    /** Char makes a ranged attack     
     * @param {Object} attack The used attack, with all parameters
     * @returns a Promise, wich gets resolved at the end, so the rest of the code will wait
     */
    rangeAttackIntervall(attack) {
        return new Promise((resolve, reject) => {

            const interval = setInterval(() => {
                if (this.gotHit) this.gotHit = false; //Needed to prevent a bug wich keept player in a state of starting an attack, and start the hurt-Animation.
                this.loadImageSprite(attack)

                if (this.currentFrame == attack.shotFrame && !this.dmgDealed) { this.fire(attack) }

                if (this.currentFrame == this.frameRate - 1 || this.isDead()) {
                    this.dmgDealed = false;
                    clearInterval(interval)
                    resolve()
                }
            }, this.globeDelay);
        })
    }

    /**
     * The projectile gets created as shootable object, 
     * and will be added to the 'ShootableObjects' Array at the World-Class
     */
    async fire(attack) {
        let projectile;
        if (this instanceof Eleria) { projectile = new Arrow(this.pos_x + 100, this.pos_y + 180, this.otherdirection, attack.dmg) }
        else if (this instanceof Kazim) { projectile = new Ignifaxius(this.pos_x + 100, this.pos_y + 190, this.otherdirection, attack.dmg) }
        this.world.ShootableObjects.push(projectile)

        this.dmgDealed = true;
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


    /** Initial Drawing of the Player Status Bars. */
    setStatusBars() {
        fullscreen ? this.screenMod = 8 : this.screenMod = 4;

        let healthBar = document.getElementById('health_bg_max');
        healthBar.style.width = (this.maxLeP * this.screenMod) + "px";
        let coinBar = document.getElementById('coin_bg_max');
        coinBar.style.width = (15 * (this.screenMod * 2)) + "px"

        if (this.maxAmmunition) {
            let ammoBar = document.getElementById('ammo_bg_max');
            ammoBar.style.width = (this.maxAmmunition * this.screenMod) + "px";
            let ammoPic = document.getElementById('ammo_pic');
            ammoPic.src = this.ammoPicture

        } else { document.getElementById('ammo_property').style.display = 'none'; }

        let playerBars = document.getElementById('PlayerBars');
        playerBars.style.display = 'block';
    }

    /**
     * Changes the Characters Status bars, so the Bars are correct.
     * @param {Number} statusID 1 == Health, 2 == ammounition, 3 == Coins
     */
    updateStatusBar(statusID) {

        let barsArray = ['playerHealth_bar', 'playerAmmo_bar', 'playerCoins_bar'];
        let plStats = [this.LeP, this.ammunition, this.collectedCoins]
        let MAXplStats = [this.maxLeP, this.maxAmmunition, 15]

        let bar = document.getElementById(barsArray[statusID - 1])
        let usedVariavle = plStats[statusID - 1]
        let usedMaxVariavle = MAXplStats[statusID - 1]

        let percentage = this.getPercentage(usedVariavle, usedMaxVariavle)
        bar.style.width = percentage + '%';
    }

    /** Will make sure, that health and ammo wont raise upon maximal value */
    checkStatusMax() {
        if (this.LeP > this.maxLeP) { this.LeP = this.maxLeP; }
        if (this.ammunition > this.maxAmmunition) { this.ammunition = this.maxAmmunition }
    }

    /**
     * Gets the Percentage of the Bar, we want to draw.
     * @param {Number} curr current Amount of used Status (health, ammounition or coins)
     * @param {Number} max Max amount of used Status (health, ammounition or coins)
     * @returns Percentage of current amount to max amount
     */
    getPercentage(curr, max) {
        return (100 / max) * curr
    }
}
