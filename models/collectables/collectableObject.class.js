
class collectableObject extends GameObject {


    constructor(pos_x, pos_y) {
        super(pos_x, pos_y)
    }

    /**
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
     * Here, the Items get removed from the level, and added to the players Status- 
     * IF the Stats are lower than maximal possible.
     * @param {Number} index Index of collectable Object inside the array
     * @param {Object} pl Player object
     * @param {Object} world World Object
     */
    collect(index, pl, world, statusID) {
        statusID = this.statusID; //@param {Number} statusID 1 == Health, 2 == ammounition, 3 == Coins

        if (!(this.getPlayerStats(pl, statusID) >= this.getMaxPlayerStats(pl, statusID))) {

            let worldArrays = [world.supplys, world.supplys, world.coins]
            worldArrays[statusID - 1].splice(index, 1)

            if (statusID === 1) pl.LeP += 8;
            if (statusID === 2) pl.ammunition += 6;
            if (statusID === 3) pl.collectedCoins++;

            if (playMusic) { this.collectSound.play() };
            pl.checkStatusMax();
            pl.updateStatusBar(statusID);
        }
    }

    /**
     * @param {Object} pl Player object
     * @param {Number} statusID 1 == Health, 2 == ammounition, 3 == Coins
     * @returns One of the Players Stats currently
     */
    getPlayerStats(pl, statusID) {
        let plStats = [pl.LeP, pl.ammunition, pl.collectedCoins]
        return plStats[statusID - 1]
    }

    /**
     * @param {Object} pl Player object
     * @param {Number} statusID 1 == Health, 2 == ammounition, 3 == Coins
     * @returns One of the Players Stats Maximum
     */
    getMaxPlayerStats(pl, statusID) {
        let MAXplStats = [pl.maxLeP, pl.maxAmmunition, 15]
        return MAXplStats[statusID - 1]
    }

}
