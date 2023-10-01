class ShotableObject extends MovableObject {

    speed = 18;
    constructor(pos_x, pos_y, otherDirection) {
        super()

        this.pos_x = pos_x;
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
    shooting(x, y) {
        this.pos_x = x;
        this.pos_y = y;
        let counter = 0;

        if (this.otherDirection) this.pos_x -= 140;


        const shot = setInterval(() => {
            counter++

            this.otherDirection ? this.moveLeft() : this.moveRight();

            if (this.pos_y > 400) {
                clearInterval(shot)
            }

            if (counter == 30) {
                this.runOut(shot)
            }
        }, this.globeDelay);

    }
}

class Arrow extends ShotableObject {
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
    constructor(pos_x, pos_y, otherDirection) {
        super(pos_x, pos_y, otherDirection)
        this.loadImage('img/heroes/Kazim/Ignifaxius.png')
    }

    // Changes the pics, so the Ignifaxius will visibly fade out
    runOut(shot) {
        this.speed = 7;
        this.loadImage('img/heroes/Kazim/Ignifaxius_2.png')
        this.loadImage('img/heroes/Kazim/Ignifaxius_3.png')
    }
}