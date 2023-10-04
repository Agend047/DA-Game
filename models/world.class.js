class World {
    actualLevel = level1;
    character = this.setHero(120, 180);
    enemys = this.actualLevel.enemys;
    clouds = this.actualLevel.clouds;
    backgroundObjects = this.actualLevel.backgroundObjects;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar;
    shotableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.canEnemysAttack();
    }

    /**
    * Getting set Hero from local Storage, just used for developing Phase 
    * @param {Number} x X-Position
    * @param {Number} y Y-Position
    * @returns 
    */
    setHero(x, y) {
        let numberFromStorage
        numberFromStorage = localStorage.getItem('heroNumber')
        if (numberFromStorage) {
            let heroNumber = JSON.parse(numberFromStorage)
            return new heroBall[heroNumber](x, y);
        }
        else
            return new heroBall[0](x, y);
    }


    // Handing the World attributes to another class. (for example, to Character)
    setWorld() {
        this.character.world = this;
    }

    /** Drawing all the objets into the Canvas, and calling draw again after a timeout to animate. */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)
        this.addArrayToMap(this.backgroundObjects)
        this.addArrayToMap(this.clouds)

        this.addArrayToMap(this.shotableObjects);

        this.addSpriteArrayToMap(this.enemys)

        this.drawSprite(this.character)

        this.ctx.translate(-this.camera_x, 0)

        let self = this;  //calling draw again
        setTimeout(function () {
            requestAnimationFrame(function () {
                self.draw();
            })
        }, IndexDelay
        )
    }

    /**
     * Used to include an Array of Elements
     * @param {Array} objects the Array of elements, we want to add
     */
    addArrayToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    /** 
     * @param {Object} mo The MovableObject, we want to draw.
     */
    addToMap(mo) {
        this.readyForMirror(mo)

        this.ctx.drawImage(mo.img, mo.pos_x, mo.pos_y, mo.width, mo.height)
        // if (mo instanceof ShotableObject) { mo.drawArrowArea(this.ctx) }


        this.reverseMirroring(mo)
    }

    /**
     * Sprites use theyre own function. Sprite Arrays need to be filled differently from non-Sprite Images.
     * @param {Array} objects the Array of Sprite-Elements, we want to add
     */
    addSpriteArrayToMap(objects) {
        objects.forEach(o => {
            this.drawSprite(o)
        })
    }

    /**
     * For Sprites:
     * Draws the needed Picture of the correct Sprite in the right direction on the screen.
     * 
     * If everything is correct, it will simulate an animation by showing different Pictures after each other.
     * @param {Object} mo The MovableObject, we want to draw.
     */
    drawSprite(mo) {
        if (mo.isDead() && mo.deathAnimationPlayed) { this.currentFrame = this.frameRate - 1 }
        else { mo.updateFrames() }

        this.readyForMirror(mo);

        mo.drawSpritePic(this.ctx);
        // mo.drawHitbox(this.ctx);
        // if (mo instanceof Enemy) { mo.drawAggroArea(this.ctx) }
        if (mo instanceof Character) { mo.drawCharAttackMeeleBox(this.ctx) }
        this.reverseMirroring(mo);
    }

    /**
     * Helper function. If an Object has to be placed facing the left side, this will turn the ctx, so we can draw the image.
     * @param {Object} mo MovableObject, we want to draw. 
     */
    readyForMirror(mo) {
        if (mo.otherdirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.pos_x = mo.pos_x * -1;
        }
    }

    /**
    * Turning the ctx to the right direction, so everything looks fine.
    * @param {Object} mo MovableObject, we want to draw. 
    */
    reverseMirroring(mo) {
        if (mo.otherdirection) {
            mo.pos_x = mo.pos_x * -1;
            this.ctx.restore();
        }
    }

    /**
     * Checks position of Player, and looks if an enemy can attack him. 
     * If so, it sets a variable to 'true', wich causes the enemy model to attack.
     */
    canEnemysAttack() {
        setInterval(() => {
            this.enemys.forEach((enemy) => {
                if (this.character.isInRangeOf(enemy)) {
                    enemy.playerNear = true;
                } else {

                }
            })
        }, 1500);
    }

}



