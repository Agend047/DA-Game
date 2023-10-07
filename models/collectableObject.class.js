
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



    collect(index, pl, world, statusIdentifyer) {
        world.coins.splice(index, 1)

        if (statusIdentifyer === 1) pl.LeP += 8;
        if (statusIdentifyer === 2) pl.ammunition += 6;
        if (statusIdentifyer === 3) pl.collectedCoins++


        pl.updateStatusBar(statusIdentifyer)
    }

}




class Coin extends collectableObject {

    height = 50;
    width = 50;

    constructor(pos_x, pos_y) {
        super(pos_x, pos_y).loadImage('img/collectables/Dukate.png')
    }


}