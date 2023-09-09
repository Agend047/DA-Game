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

    character = new Character(100, 165);

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

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        console.log('Kommt...')
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.addToMap(this.air)

        this.addArrayToMap(this.clouds) // cloud.pos_x = cloud.pos_x - 0.1;
        this.addArrayToMap(this.backgroundObjects)
        this.addToMap(this.character)
        this.addArrayToMap(this.enemys)  // enemy.pos_x = enemy.pos_x - 0.5;


        let self = this;  //calling draw again
        setTimeout(function () {
            requestAnimationFrame(function () {
                self.draw();
            })
        }, 1000
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

