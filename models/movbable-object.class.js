/** SuperClass for Charakter and Enemys, he can interact with */
class MovableObject extends GameObject {

    gravitySpeed = 0;
    gravityAcceleration = 1.5;
    frameRate = 1; //Number of frames on the Sprite
    currentFrame; //Frame on the Sprite
    frameBuffer = 3; //delay on frames
    elapsedFrames = 0; //sum of all frames, since we move over this sprite
    img; //gets filled with the Image
    otherdirection = false; //Used, if something moves to the right
    lastloaded; // The Stripe that was loaded before. Important for attack-Stripes.
    newAnimation; // Is a new Stripe shown? 
    showFull; //Used for attack animations, wich have to be shown completly without interruption

    constructor(pos_x, pos_y, frameRate, imageSrc) {
        super(pos_x, pos_y,)
        this.frameRate = frameRate;
    }


    /**
     * Creates a new Image we want to draw later, and sets needed propertys of that image for the Object
     * @param {Object} key The Animation that shall be played
     */
    loadImageSprite(key) {
        this.checkNewAnimation(key)

        this.img = new Image;
        this.img.src = key.imageSrc;

        this.frameRate = key.frameRate;
        this.frameBuffer = key.frameBuffer;
        this.lastloaded = key;

        if (key.showFull) { this.showFull = key.showFull } else { this.showFull = false }
    }

    /**
     * To play animations from the start, this sets a variable to true or false.
     * @param {Object} key The Animation that shall be played
    */
    checkNewAnimation(key) {
        if (key.showFull && this.lastloaded !== key) {
            this.newAnimation = true;
        }
        else this.newAnimation = false
    }

    //Constant moving for enemys to right side.
    moveRight() {
        this.pos_x += this.speed;
        this.otherdirection = false;
    };

    //constant moving for enemys to the left side
    moveLeft() {
        this.pos_x -= this.speed;
        this.otherdirection = true;
    };

    /** 
     * To simulate gravity, everything above the ground will change position towards ground.
     * Speed is increasing by 'gravityAcceleration'
     * Else will make sure that Character wont be positioned to far from moving-area.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.gravitySpeed < 0) {
                this.pos_y += this.gravitySpeed;
                this.gravitySpeed += this.gravityAcceleration;
            } else {
                this.gravitySpeed = 0;
                if (this.pos_y > 180) {
                    this.pos_y = 180
                }
            }
        }, this.globeDelay)
    }

    /**
     * If Char stands on ground, gravity gets reversed, and he jumps.
     * While holding the UP-button, the lower part will make gravity speed rise slower- Resulting in higher jumps, when user keeps the up-key pressed.
     */
    jump() {
        if (this.gravitySpeed == 0 && !this.isAboveGround()) {
            this.gravitySpeed -= this.jumpSpeed * 2.2;
            this.pos_y += this.jumpSpeed;
        }
        else if (this.gravitySpeed < 0) {
            this.gravitySpeed -= 0.55;
        }
    };

    /**
     * Simple check, if something is still above the ground
     * @returns true or false
     */
    isAboveGround() {
        return this.pos_y < 180;
    }


    /**
     * Support function for Sprotes:
     * On the one Hand, takes care that the animated Sprites wont move to quickly by counting 'elapsedFrames'
     * Secoundly and mainly, sets currentFrame back to 0, when last frame is played.
     */
    updateFrames() {
        if (this.newAnimation) { this.elapsedFrames = 0; this.currentFrame = 0 }
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++
            } else { this.currentFrame = 0 }
        }
    }


    /**
     * Using a Cropbox, we get the Image we want to draw it from the Sprite.
     * @param {HTMLElement} ctx The Canvas Element, we draw on.
     */
    drawSpritePic(ctx) {

        const cropbox = this.createCropbox();

        ctx.drawImage(
            this.img,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.pos_x,
            this.pos_y,
            this.width,
            this.height,
        );
    }

    /**
     * A Cropbox gets generated and moves over the Sprite. 
     * @returns the Cropboxes Position on the Sprite and the weize of it. 
     */
    createCropbox() {
        return {
            position: {
                x: (this.currentFrame * (this.img.width / this.frameRate)),
                y: 0,
            },
            width: this.img.width / this.frameRate,
            height: this.img.height,
        };
    }

    /**
     * Draws a Box arround the movable Element.
     * @param {HTMLElement} ctx The Canvas Element, we draw on.
     */
    drawHitbox(ctx) {
        ctx.beginPath()
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.pos_x + this.hbmX, this.pos_y + this.hbmY, this.width + this.hbmW, this.height + this.hbmH,);
        ctx.stroke();
    }


    /** Checks, if player is in attack range of an enemy. 
     *     
     * @param {this} this Player character 
     * @param {Object} mo Enemy object
     * @returns true, if an enemy Unit can hit the player, or false, if not.
     */
    isInRangeOf(mo) {
        return (this.pos_x + this.hbmX + this.width + this.hbmW) >= mo.pos_x + mo.abmX && this.pos_x + this.hbmX <= (mo.pos_x + mo.width + mo.abmW) &&
            (this.pos_y + + this.hbmY + this.height + this.hbmH) >= mo.pos_y + mo.hbmY &&
            (this.pos_y + this.hbmY) <= (mo.pos_y + mo.hbmY + mo.height + mo.hbmH)
    }

    applyDMG(dmg) {
        this.LeP = this.LeP - dmg;
        console.log(this.LeP)
    }
}