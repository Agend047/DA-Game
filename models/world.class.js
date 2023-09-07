class World {
    character = new Character(100, 100);
    enemys = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ]

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

        this.ctx.drawImage(this.character.img, this.character.pos_x, this.character.pos_y, this.character.width, this.character.height)

        this.enemys.forEach(enemy => {
            enemy.pos_x = enemy.pos_x - 0.5;
            this.ctx.drawImage(enemy.img, enemy.pos_x, enemy.pos_y, enemy.width, enemy.height)
        })

        this.clouds.forEach(cloud => {
            cloud.pos_x = cloud.pos_x - 0.1;
            this.ctx.drawImage(cloud.img, cloud.pos_x, cloud.pos_y, cloud.width, cloud.height)
        })

        //calling draw again
        let self = this;
        setTimeout(function () {
            requestAnimationFrame(function () {
                //   self.draw();
            })
        }, 33
        )

        // for (chick of this.enemys) {
        //     this.ctx.drawImage(this.chick.img, this.chick.pos_x, this.chick.pos_y, this.chick.width, this.chick.height)
        // }
    }
}