/** SuperClass for Charakter and Enemys, he can interact with */
class MovableObject extends GameObject {

    gravitySpeed = 0;
    gravityAcceleration = 1.5;
    frameRate = 1; //Number of frames on the Sprite
    currentFrame = 0; //Frame on the Sprite
    frameBuffer = 3; //delay on frames
    elapsedFrames = 0; //sum of all frames, since we move over this sprite
    img; //gets filled with the Image
    otherdirection = false; //Used, if something moves to the left
    lastloaded; // 
    newAnimation; /** NOT SURE IF STILL NEEDED */
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
            this.newAnimation = true
        } else { this.newAnimation = false }
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
                if (this.pos_y > 165) {
                    this.pos_y = 165
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
        return this.pos_y < 140;
    }

    /**
     * Support function for Sprotes:
     * On the one Hand, takes care that the animated Sprites wont move to quickly by counting 'elapsedFrames' (and resetting, on a to high value)
     * Secoundly and mainly, sets currentFrame back to 0, when last frame is played.
     */
    updateFrames() {
        this.newAnimation ? this.elapsedFrames = 0 : 0;
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++
            } else { this.currentFrame = 0 }
        }
    }
}