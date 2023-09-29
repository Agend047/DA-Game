class ShotableObject extends MovableObject {

    speed = 14;
    constructor(pos_x, pos_y) {
        super()

        this.pos_x = this.pos_x;
        this.pos_y = this.pos_y;
        this.width = 100;
        this.height = 50;
        this.shooting(this.pos_x, this.pos_y);
    }

    shooting(x, y) {
        this.pos_x = x;
        this.pos_y = y;
        let counter = 0;

        const shot = setInterval(() => {
            counter++
            // console.log(this.pos_y)

            this.moveRight()
            if (this.pos_y > 400) {
                console.log('Schließen!')
                clearInterval(shot)
            }

            if (counter == 30) {
                this.runOut(shot)
            }
        }, 33);

    }
}

class Arrow extends ShotableObject {
    constructor() {
        super()
        this.loadImage('img/heroes/Eleria_new/Arrow.png')

    }

    runOut(shot) {
        this.applyGravity()
        this.speed = 7;
    }

}

class Ignifaxius extends ShotableObject {
    constructor() {
        super()
        this.loadImage('img/heroes/Kazim/Ignifaxius.png')

    }

    runOut(shot) {
        this.speed = 7;
        this.loadImage('img/heroes/Kazim/Ignifaxius_2.png')
        this.loadImage('img/heroes/Kazim/Ignifaxius_3.png')
    }
}