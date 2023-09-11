class Cloud extends MovableObject {
    width = 600;
    height = 400;
    speed = 0.05;

    constructor(min_x, path) {
        let getX = min_x + (Math.random() * 80)
        super(getX, 1).loadImage(path);


        this.moveLeft()
    }
}