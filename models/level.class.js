class Level {
    enemys;
    clouds;
    coins;
    supplys; //health potions and ammounition
    backgroundObjects;
    level_end_x;


    constructor(enemys, clouds, coins, supplys, backgroundObjects, level_end_x) {
        this.enemys = enemys;
        this.clouds = clouds;
        this.coins = coins;
        this.supplys = supplys;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
    }
}