/** the Enemys Character */
class Enemy extends MovableObject {

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,)
    }

    strike() {
        console.log('ATTACK!!')
    };
}

class Chicken extends Enemy {
    width = 140;
    height = 100;

    constructor() {
        let getX = (200 + Math.random() * 450)
        let getY = (330 + Math.random() * 10)
        super(getX, getY).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}