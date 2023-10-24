class HealthPotion extends collectableObject {
    height = 50;
    width = 50;
    statusID = 1;


    constructor(min_x, min_y) {
        let pos_x = min_x //+ Math.random() * 2400;
        let pos_y = min_y //+ Math.random() * 300;
        super(pos_x, pos_y).loadImage('img/collectables/health_potion.png')
    }
}