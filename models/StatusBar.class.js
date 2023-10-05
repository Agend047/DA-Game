class StatusBar extends GameObject {



    constructor() {
        super()
    }


    /** CSS AND HTML
   * Initial Drawing of the Player Status Bars. 
   */
    // setStatusBars() {

    //     let healthBar = document.getElementById('health_bg_max');
    //     healthBar.style.width = (this.maxLeP * 4) + "px";

    //     let coinBar = document.getElementById('playerCoins_bar');
    //     // coinBar.style.width = this.world.collectableCoins * 4;

    //     console.log(this.world)

    //     if (this.maxAmmunition) {
    //         let ammoBar = document.getElementById('ammo_bg_max');
    //         ammoBar.style.width = (this.maxAmmunition * 4) + "px";

    //         let ammoPic = document.getElementById('ammo_pic');
    //         ammoPic.src = this.ammoPicture
    //     } else { //Acco
    //         let ammoBar = document.getElementById('ammo_property');
    //         ammoBar.style.display = 'none';
    //     }

    //     let playerBars = document.getElementById('PlayerBars');
    //     playerBars.style.display = 'block';
    // }


    setStatusBars(ctx) {
        let healthBar = document.getElementById('health_bg_max');
        healthBar.style.width = (this.maxLeP * 4) + "px";

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(120, 20, 20, 20);

        // ctx.beginPath()
        // ctx.lineWidth = '5';
        // ctx.strokeStyle = 'red';
        // ctx.rect(this.pos_x + this.abmX, this.pos_y + this.abmY, this.width + this.abmW, this.height + this.abmH,);
        // ctx.stroke();


        let coinBar = document.getElementById('playerCoins_bar');
        // coinBar.style.width = this.world.collectableCoins * 4;

        console.log(this.world)

        if (this.maxAmmunition) {
            let ammoBar = document.getElementById('ammo_bg_max');
            ammoBar.style.width = (this.maxAmmunition * 4) + "px";

            let ammoPic = document.getElementById('ammo_pic');
            ammoPic.src = this.ammoPicture
        } else { //Acco
            let ammoBar = document.getElementById('ammo_property');
            ammoBar.style.display = 'none';
        }

        let playerBars = document.getElementById('PlayerBars');
        playerBars.style.display = 'block';
    }

    /**CSS AND HTML
     * Changes the Characters Status bars, so the Bars are correct.
     * @param {Number} which 1 == Health, 2 == ammounition, 3 == Coins
     */
    // updateStatusBar(which) {

    //     let barsArray = ['playerHealth_bar', 'playerAmmo_bar', 'playerCoins_bar'];
    //     let variables = [this.LeP, this.ammunition, this.collectedCoins]
    //     let maxVariables = [this.maxLeP, this.maxAmmunition, this.world.collectableCoins]

    //     let bar = document.getElementById(barsArray[which - 1])
    //     let usedVariavle = variables[which - 1]
    //     let usedMaxVariavle = maxVariables[which - 1]

    //     let percentage = this.getPercentage(usedVariavle, usedMaxVariavle)
    //     bar.style.width = percentage + '%';
    // }

    /**
     * Gets the Percentage of the Bar, we want to draw.
     * 
     * @param {*} curr current Amount of used Status
     * @param {*} max Max amount of used Status
     * @returns Percentage of current amount to max amount
     */
    getPercentage(curr, max) {
        return (100 / max) * curr
    }
}