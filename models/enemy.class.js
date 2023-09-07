/** the Enemys Character */
class Enemy extends MovableObject {


    constructor(pos_x, pos_y, width, height,) {
        super(pos_x, pos_y, width, height,).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

    }

    strike() {
        console.log('ATTACK!!')

    };
}

