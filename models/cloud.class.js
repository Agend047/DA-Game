class Cloud extends MovableObject {
    width = 600;
    height = 400;

    constructor() {
        let getX = (Math.random() * 420)
        super(getX, 1).loadImage('img/5_background/layers/4_clouds/1.png');
    }
}
