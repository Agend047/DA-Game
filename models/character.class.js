/** the Playable Character */
class Character extends MovableObject {


    constructor(pos_x, pos_y, width, height,) {
        super(pos_x, pos_y, width, height,).loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    }

    jump() {
        console.log('Jump!')

    };
}