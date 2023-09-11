class World {

    air = new GameObject(0, 0, 720, 480, 'img/5_background/layers/air.png')

    backgroundObjects = [
        new Background(0, 400, 'img/5_background/layers/3_third_layer/1.png'),
        new Background(720, 400, 'img/5_background/layers/3_third_layer/2.png'),

        new Background(0, 400, 'img/5_background/layers/2_second_layer/1.png'),
        new Background(720, 400, 'img/5_background/layers/2_second_layer/2.png'),

        new Background(0, 400, 'img/5_background/layers/1_first_layer/1.png'),
        new Background(720, 400, 'img/5_background/layers/1_first_layer/2.png'),
    ];

    character = new Character(100, 0);

    enemys = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Cloud(),
    ];

    ctx;
    canvas;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this.world;
    }

    /**
     * Drawing all the objets into the Canvas, and calling draw again after a timeout to animate.
     */
    draw() {
        // console.log('Kommt...')
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.addToMap(this.air)

        this.addArrayToMap(this.clouds)
        this.addArrayToMap(this.backgroundObjects)
        this.addToMap(this.character)
        this.addArrayToMap(this.enemys)


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

