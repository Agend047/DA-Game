/** the Enemys Character */
class Enemy extends MovableObject {

    constructor(min_x) {
        let getX = (min_x + Math.random() * 450)
        let getY = (320 + Math.random() * 20)

        super(getX, getY,)
        this.speed = 0.2 + (Math.random() * 0.25);
        this.move();
    }

    strike() {
        console.log('ATTACK!!')
    };

    move() {
        setInterval(() => {
            this.moveLeft(); //Shall be able to move left & right! 
        }, 33);

    }
}

class Chicken extends Enemy {
    width = 140;
    height = 100;
    speed;

    constructor(min_x) {
        super(min_x).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        console.log(this.pos_x)

    }
}

class Orc extends Enemy {
    width = 100;
    height = 200;
    speed;

    constructor(min_x) {
        super(min_x).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}