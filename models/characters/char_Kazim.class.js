class Kazim extends Character {

    LeP = 34;
    maxLeP = 34;
    RS = 1; //Armour 'Rüstungsschutz, incoming dmg will be reduced by this

    ammunition = 42; //AsP 42
    maxAmmunition = 42; //AsP
    ammoPicture = 'img/statusBars/mana_potion.png'


    speed = 12;
    jumpSpeed = 9;

    //Hitbox Modificators:
    hbmX = 50;
    hbmY = 125;
    hbmW = (-95)
    hbmH = (-140)

    animations = {
        idle: {
            imageSrc: 'img/heroes/Kazim_new/Idle.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        idle2: {
            imageSrc: 'img/heroes/Kazim_new/Idle_2.png',
            frameRate: 5,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Kazim_new/Run.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/heroes/Kazim_new/Jump.png',
            frameRate: 11,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/heroes/Kazim_new/Attack_1.png',
            frameRate: 10, //CHANGE PLS (11 or 8)
            frameBuffer: 2,
            dmgFrame: 8,
            dmg: 8,
            showFull: true,
        },
        range: {
            imageSrc: 'img/heroes/Kazim_new/Attack_3no_igni.png',
            frameRate: 7, //CHANGE PLS (8)
            frameBuffer: 3,
            shotFrame: 5,
            dmg: 16,
            showFull: true,
        },
        hurt: {
            imageSrc: 'img/heroes/Kazim_new/Hurt.png',
            frameRate: 4,
            frameBuffer: 2,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/heroes/Kazim_new/Dead.png',
            frameRate: 4,
            frameBuffer: 5,
        },
    }

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,);

        this.loadImageSprite(this.animations.idle);
        this.setStatusBars();
        this.preLoadImages();
    }

    /**
     * Checks, if Kazim has enough AsP left, to cast.
     * @returns true, if Kazim can cast 'Ignifaxius'
     */
    enoughAmmo() {
        return (this.ammunition >= 3)
    }

    /** Subtracts the AsP cost of 'Ignifaxius' from Kazim's AsP */
    subtractAmmo() {
        this.ammunition -= 3;
    }
}