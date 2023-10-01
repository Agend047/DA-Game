class ShotableObject extends MovableObject {

    speed = 18;
    constructor(pos_x, pos_y, otherDirection) {
        super()

        this.pos_x = pos_x - 40;
        this.pos_y = pos_y;
        this.otherDirection = otherDirection;
        this.width = 100;
        this.height = 50;
        this.shooting(this.pos_x, this.pos_y, otherDirection);
    }

    /**
     * 
     * @param {Number} x Koordinate
     * @param {Number} y Koordinate
     */
    async shooting(x, y) {

        this.pos_x = x;
        this.pos_y = y;
        let counter = 0;


        if (this.otherDirection) this.pos_x -= 100;

        const shot = setInterval(() => {
            counter++

            this.otherDirection ? this.moveLeft() : this.moveRight();

            if (counter == 30) {
                this.runOut(shot)

                if (this.pos_y > 400 || counter >= 33) {
                    clearInterval(shot)
                }
            }
        }, this.globeDelay);

    }
}

class Arrow extends ShotableObject {
    removeCounter = 0;

    constructor(pos_x, pos_y, otherDirection) {
        super(pos_x, pos_y, otherDirection)
        this.loadImage('img/heroes/Eleria_new/Arrow.png')
    }

    // Applys Gravity, so the arrow will fall to the ground
    runOut(shot) {
        this.applyGravity()
        this.speed = 7;
    }
}


class Ignifaxius extends ShotableObject {
    removeCounter = 0;

    constructor(pos_x, pos_y, otherDirection) {
        super(pos_x, pos_y, otherDirection)
        this.loadImage('img/heroes/Kazim/Ignifaxius.png')
    }

    // Changes the pics, so the Ignifaxius will visibly fade out
    runOut(shot) {
        this.speed = 1;
        this.loadImage('img/heroes/Kazim/Ignifaxius_2.png')

        setTimeout(() => {
            this.loadImage('img/heroes/Kazim/Ignifaxius_3.png')
        }, 200);
    }
}