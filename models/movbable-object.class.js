/** SuperClass for Charakter and Enemys, he can interact with */
class MovableObject {
    pos_x;
    pos_y;
    width;
    height;
    // img;

    constructor(pos_x, pos_y, width, height,) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    moveRight() {
        console.log('Move right')
    };

    moveLeft() {
        console.log('Move right')
    };
}