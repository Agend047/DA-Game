
class collectableObject extends GameObject {

    constructor(pos_x, pos_y) {
        super(pos_x, pos_y)
    }


    /**
     * 
     * @param {Object} pl The Player character
     * @returns true, if character touches a collectable object
     */
    isInCollectRange(pl) {

        return (this.pos_x + this.width) >= pl.pos_x + pl.hbmX &&
            this.pos_x <= (pl.pos_x + pl.hbmX + pl.width + pl.hbmW) &&
            (this.pos_y + this.height) >= pl.pos_y + pl.hbmY &&
            (this.pos_y) <= (pl.pos_y + pl.hbmY + pl.height + pl.hbmH)
    }


    /**
     * Here, the Items get removed from the level, and added to the players Status.
     * @param {Number} index Index inside the array
     * @param {Object} pl Player object
     * @param {Object} world World Object
     * @param {Number} statusID 1 == Health, 2 == ammounition, 3 == Coins
     */
    collect(index, pl, world, statusID) {

        let plStats = [pl.LeP, pl.ammunition, pl.collectedCoins]
        let MAXplStats = [pl.maxLeP, pl.maxAmmunition, 15]

        if (!(plStats[statusID - 1] >= MAXplStats[statusID - 1])) {

            let worldArrays = [world.healthPotions, world.freeAmmo, world.coins]

            worldArrays[statusID - 1].splice(index, 1)

            if (statusID === 1) pl.LeP += 8;
            if (statusID === 2) pl.ammunition += 6;
            if (statusID === 3) pl.collectedCoins++;


            //VERY WEARD


            pl.checkStatusMax();
            pl.updateStatusBar(statusID);

        } else { }
    }
}




class Coin extends collectableObject {

    height = 50;
    width = 50;

    constructor(min_x, min_y) {
        let pos_x = min_x + Math.random() * 2100;
        let pos_y = min_y + Math.random() * 300;
        super(pos_x, pos_y).loadImage('img/collectables/Dukate.png')
    }
}

class AstralPotion extends collectableObject {
    height = 50;
    width = 50;

    constructor(min_x, min_y) {
        let pos_x = min_x //+ Math.random() * 2100;
        let pos_y = min_y //+ Math.random() * 300;
        super(pos_x, pos_y).loadImage('img/collectables/mana_potion.png')
    }
}

class Arrows extends collectableObject {
    height = 50;
    width = 50;

    constructor(min_x, min_y) {
        let pos_x = min_x //+ Math.random() * 2100;
        let pos_y = min_y //+ Math.random() * 300;
        super(pos_x, pos_y).loadImage('img/collectables/Arrows_diagonal.png')
    }
}

class HealthPotion extends collectableObject {
    height = 50;
    width = 50;

    constructor(min_x, min_y) {
        let pos_x = min_x //+ Math.random() * 2100;
        let pos_y = min_y //+ Math.random() * 300;
        super(pos_x, pos_y).loadImage('img/collectables/health_potion.png')
    }
}