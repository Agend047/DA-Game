class World {

    air = new GameObject(0, 0, 720, 480, 'img/5_background/layers/air.png')

    backgroundObjects = [
        new Background(0, 'img/5_background/layers/3_third_layer/1.png'),
        new Background(720, 'img/5_background/layers/3_third_layer/2.png'),

        new Background(0, 'img/5_background/layers/2_second_layer/1.png'),
        new Background(720, 'img/5_background/layers/2_second_layer/2.png'),

        new Background(0, 'img/5_background/layers/1_first_layer/1.png'),
        new Background(720, 'img/5_background/layers/1_first_layer/2.png'),
    ];

    character = new Character(100, 280);

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

        this.clouds.forEach(cloud => {
            cloud.pos_x = cloud.pos_x - 0.1;
            this.addToMap(cloud);
        })

        this.backgroundObjects.forEach(background => {
            this.addToMap(background);
        })

        this.addToMap(this.character)

        this.enemys.forEach(enemy => {
            enemy.pos_x = enemy.pos_x - 0.5;
            this.addToMap(enemy)
        })



        //calling draw again
        let self = this;
        setTimeout(function () {
            requestAnimationFrame(function () {
                self.draw();
            })
        }, 1000
        )
    }

    /** 
     * @param {Object} mo The MovableObject, we want to draw.
     */
    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.pos_x, mo.pos_y, mo.width, mo.height)
    }
}

