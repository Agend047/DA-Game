class ShotableObject extends MovableObject {

    speed = 14;
    constructor() {
        super()

        this.pos_x = 100;
        this.pos_y = 100;
        this.width = 100;
        this.height = 50;
        this.shooting(100, 100);
    }

    shooting(x, y) {
        this.pos_x = x;
        this.pos_y = y;
        let counter = 0;

        const shot = setInterval(() => {
            counter++
            this.moveRight()
            if (counter == 30) {
                // clearInterval(shot)
                this.runOut()
            }
        }, 33);

    }
}

class Arrow extends ShotableObject {
    constructor() {
        super()
        this.loadImage('img/heroes/Eleria_new/Arrow.png')

    }

    runOut() {
        this.applyGravity()
        this.speed = 7;
    }

}

class Ignifaxius extends ShotableObject {
    constructor() {
        super()
        this.loadImage('img/heroes/Kazim/Ignifaxius.png')

    }

    runOut() {
        this.speed = 7;
        this.loadImage('img/heroes/Kazim/Ignifaxius_2.png')
        this.loadImage('img/heroes/Kazim/Ignifaxius_3.png')
    }
}