class World {

    actualLevel = level1;
    character = new Character(120, 140);
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
        this.addToMap(this.character)

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


}

