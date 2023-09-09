class Background extends MovableObject {

    constructor(pos_x, height, imagePath) {
        super(pos_x, 0, 720, height).loadImage(imagePath);
        this.pos_y = 480 - this.height;
    }
}
