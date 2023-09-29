class ShotableObject extends MovableObject {

    speed = 14;
    constructor() {
        super()
        // this.loadImage('img/heroes/Eleria_new/Arrow.png')
        this.loadImage('img/heroes/Kazim/Ignifaxius.png')
        this.pos_x = 100;
        this.pos_y = 100;
        this.width = 100;
        this.height = 50;
        this.shot(100, 100);
    }

    shot(x, y) {
        this.pos_x = x;
        this.pos_y = y;

        setInterval(() => {


            this.applyGravity()

            this.moveRight()

        }, 33);

    }


}