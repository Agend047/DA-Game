class Level {
    enemys;
    clouds;
    coins;
    freeAmmo;
    backgroundObjects;
    level_end_x;


    constructor(enemys, clouds, coins, freeAmmo, backgroundObjects, level_end_x) {
        this.enemys = enemys;
        this.clouds = clouds;
        this.coins = coins;
        this.freeAmmo = freeAmmo;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
    }
}