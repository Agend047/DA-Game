class GameObject {
    globeDelay = 33;
    pos_x;
    pos_y;
    width;
    height;


    constructor(pos_x, pos_y, width, height, path) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.loadImage(path)
    }

    loadImage(path) {
        if (typeof (path) != 'undefined') {
            this.img = new Image();
            this.img.src = path
        }
    }

}