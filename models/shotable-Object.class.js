class ShotableObject extends MovableObject {

    // hitableEnemys = [];
    speed = 18;

    hbmX = 0;
    hbmY = 0;
    hbmW = (0)
    hbmH = (0)


    constructor(pos_x, pos_y, otherDirection, dmg) {
        super()

        this.pos_x = pos_x - 40;
        this.pos_y = pos_y;
        this.otherDirection = otherDirection;
        this.width = 100;
        this.height = 50;
        this.dmg = dmg;
        this.shooting();
        // hitableEnemys = this.getHitableEnemys();
    }


    /**
   * Defines an area arround enemys, in wich they shall start attacking
   * @param {HTMLElement} ctx The Canvas Element, we draw on.
   */
    drawArrowArea(ctx) {
        ctx.beginPath()
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.pos_x, this.pos_y, this.width, this.height,);
        ctx.stroke();
    }



    // getHitableEnemys() {
    //     let allEnemys = world.enemys
    //     for (enemy in allEnemys) {
    //         if (enemy.pos_y > this.pos_y) {

    //         }

    //     }
    //     return hitableEnemys
    // }

    /** This function controls the projectiles, fired by ranged heroes.
     * Sets a counter and basically does a delayed loop over the function.
     * Sets the direction for the projectile, and calls the end functions
     * Will delete the projectiles out of the 'shotableObjects' array.
     */
    async shooting() {
        let counter = 0;
        if (this.otherDirection) this.pos_x -= 100;

        const shot = setInterval(() => {
            counter++

            this.otherDirection ? this.moveLeft() : this.moveRight();


            if (counter <= 30) {
                if (this.checkForCollision()) {
                    counter = 38;
                }
            }

            if (counter == 30) { this.runOut(shot) }

            if (this.pos_y > 400 || counter >= 38) {
                clearInterval(shot)
                world.shotableObjects.splice(0, 1)
            }
        }, this.globeDelay);
    }


    checkForCollision() {
        let result = false;
        world.enemys.forEach(enemy => {
            if (enemy.hitFromLeft(this)) {
                result = true;
                enemy.applyDMG()
            }
        })
        return result;
    }
}

class Arrow extends ShotableObject {
    removeCounter = 0;


    constructor(pos_x, pos_y, otherDirection, dmg) {
        super(pos_x, pos_y, otherDirection, dmg)
        this.loadImage('img/heroes/Eleria_new/Arrow.png')
    }

    // Applys Gravity, so the arrow will fall to the ground
    runOut(shot) {
        this.applyGravity()
        this.speed = 7;
    }
}


class Ignifaxius extends ShotableObject {
    removeCounter = 0;


    constructor(pos_x, pos_y, otherDirection, dmg) {
        super(pos_x, pos_y, otherDirection, dmg)
        this.loadImage('img/heroes/Kazim/Ignifaxius.png')
    }

    // Changes the pics, so the Ignifaxius will visibly fade out
    runOut(shot) {
        this.speed = 1;
        this.loadImage('img/heroes/Kazim/Ignifaxius_2.png')

        setTimeout(() => {
            this.loadImage('img/heroes/Kazim/Ignifaxius_3.png')
        }, 180);
    }
}