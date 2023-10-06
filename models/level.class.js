class Level {
    enemys;
    clouds;
    coins;
    collectables;
    backgroundObjects;
    level_end_x;


    constructor(enemys, clouds, coins, collectables, backgroundObjects, level_end_x) {
        this.enemys = enemys;
        this.clouds = clouds;
        this.coins = coins;
        this.collectables = collectables;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
    }
}