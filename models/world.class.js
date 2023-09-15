class World {

    actualLevel = level1;
    character = new Acco(120, 100);
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
        this.addArrayToMap(this.enemys)

        this.drawSprite(this.character)

        this.ctx.translate(-this.camera_x, 0)



        let self = this;  //calling draw again
        setTimeout(function () {
            requestAnimationFrame(function () {
                self.draw();
            })
        }, 33
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
        this.ctx.drawImage(mo.img, mo.pos_x, mo.pos_y, mo.width, mo.height)
    }

    /**
     * For Sprites:
     * A Cropbox gets generated and jumps over the Sprite, to simulate an animation.
     * @param {Object} mo The MovableObject, we want to draw.
     */
    drawSprite(mo) {
        mo.updateFrames()
        const cropbox = {
            position: {
                x: (mo.currentFrame * (mo.img.width / mo.frameRate)),
                y: 0,
            },
            width: mo.img.width / mo.frameRate, //mo.frameRate
            height: mo.img.height,
        }

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
        )
    }
}

