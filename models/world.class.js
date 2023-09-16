class World {
    actualLevel = level1;
    character = new Eleria(120, 100);
    enemys = this.actualLevel.enemys;
    clouds = this.actualLevel.clouds;
    backgroundObjects = this.actualLevel.backgroundObjects;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    // Handing the World attributes to another class. (for example, to Character)
    setWorld() {
        this.character.world = this;
    }

    /**
     * Drawing all the objets into the Canvas, and calling draw again after a timeout to animate.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)
        this.addArrayToMap(this.backgroundObjects)
        this.addArrayToMap(this.clouds)

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
     * A Cropbox gets generated and jumps over the Sprite, to simulate an animation.
     * @param {Object} mo The MovableObject, we want to draw.
     */
    drawSprite(mo) {
        mo.updateFrames();
        const cropbox = {
            position: {
                x: (mo.currentFrame * (mo.img.width / mo.frameRate)),
                y: 0,
            },
            width: mo.img.width / mo.frameRate, //mo.frameRate
            height: mo.img.height,
        };

        this.readyForMirror(mo);

        this.ctx.drawImage(
            mo.img,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            mo.pos_x,
            mo.pos_y,
            mo.width,
            mo.height,
        );

        this.reverseMirroring(mo);
    }

    /**
     * Helper function. If an Object has to be placed facing the left side, this will turn the ctx, so we can draw the image.
     * @param {O} mo MovableObject, we want to draw. 
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
    * @param {O} mo MovableObject, we want to draw. 
    */
    reverseMirroring(mo) {
        if (mo.otherdirection) {
            mo.pos_x = mo.pos_x * -1;
            this.ctx.restore();
        }
    }

}



