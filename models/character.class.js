/** the Playable Character */
class Character extends MovableObject {

    height = 180;
    width = 100;

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,).loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    }

    jump() {
        console.log('Jump!')

    };
}