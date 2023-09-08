/** SuperClass for Charakter and Enemys, he can interact with */
class MovableObject extends GameObject {

    constructor(pos_x, pos_y, width, height,) {
        super(pos_x, pos_y, width, height,)
    }

    moveRight() {
        console.log('Move right')
    };

    moveLeft() {
        console.log('Move right')
    };
}