/** the Enemys Character */
class Enemy extends MovableObject {

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,)
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

    constructor(mayX) {
        let getX = (mayX + Math.random() * 450)
        let getY = (320 + Math.random() * 20)
        super(getX, getY).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.speed = 0.2 + (Math.random() * 0.25);
    }
}

class Orc extends Enemy {

}