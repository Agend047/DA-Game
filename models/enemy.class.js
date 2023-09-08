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
    width = 100;
    height = 80;

    constructor() {
        let getX = (200 + Math.random() * 450)
        let getY = (370 + Math.random() * 20)
        super(getX, getY).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}