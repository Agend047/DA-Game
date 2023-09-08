class World {
    character = new Character(100, 100);

    enemys = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Cloud(),
    ];

    backgroundObjects = [
        new Background('img/5_background/layers/1_first_layer/full.png'),
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

        this.addToMap(this.character)

        this.enemys.forEach(enemy => {
            enemy.pos_x = enemy.pos_x - 0.5;
            this.addToMap(enemy)
        })

        this.clouds.forEach(cloud => {
            cloud.pos_x = cloud.pos_x - 0.1;
            this.addToMap(cloud);
        })

        this.backgroundObjects.forEach(background => {
            this.addToMap(background);

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

