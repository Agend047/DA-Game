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
    width = 130;
    height = 80;

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}