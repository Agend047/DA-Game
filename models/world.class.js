class World {
    character = new Character(100, 100, 100, 150);
    enemys = [
        new Enemy(200, 100, 150, 100),
        new Enemy(300, 200, 150, 100),
        new Enemy(400, 300, 150, 100),
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

        this.ctx.drawImage(this.character.img, this.character.pos_x, this.character.pos_y, this.character.width, this.character.height)

        this.enemys.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.pos_x, enemy.pos_y, enemy.width, enemy.height)
        })

        //calling draw again
        let self = this;
        setTimeout(function () {
            requestAnimationFrame(function () {
                self.draw();
            })
        }, 10000
        )

        // for (chick of this.enemys) {
        //     this.ctx.drawImage(this.chick.img, this.chick.pos_x, this.chick.pos_y, this.chick.width, this.chick.height)
        // }
    }
}