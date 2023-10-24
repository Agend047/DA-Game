class Coin extends collectableObject {

    height = 50;
    width = 50;
    statusID = 3;

    constructor(min_x, min_y, mixablePlace) {

        let pos_x;
        let pos_y;

        if (mixablePlace) {
            pos_x = min_x + Math.random() * 2400;
            pos_y = min_y + Math.random() * 300;
        }
        else {
            pos_x = min_x
            pos_y = min_y
        }
        super(pos_x, pos_y).loadImage('img/collectables/Dukate.png')
    }
}