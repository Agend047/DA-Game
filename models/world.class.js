class World {
    character = new Character(100, 100, 100, 150);
    enemys = [
        new Enemy(200, 100, 150, 100),
        new Enemy(350, 100, 150, 100),
        new Enemy(450, 100, 150, 100),
    ];

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {

        this.ctx.drawImage(this.character.img, this.character.pos_x, this.character.pos_y, this.character.width, this.character.height)


        //calling draw again
        let self = this;
        requestAnimationFrame(function () {
            self.draw;
        });

        // for (chick of this.enemys) {
        //     this.ctx.drawImage(this.chick.img, this.chick.pos_x, this.chick.pos_y, this.chick.width, this.chick.height)
        // }
    }
}