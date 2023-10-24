class Eleria extends Character {
    LeP = 30;
    maxLeP = 30;
    RS = 0; //Armour 'Rüstungsschutz, incoming dmg will be reduced by this

    ammunition = 40;
    maxAmmunition = 40;
    ammoPicture = 'img/collectables/Arrows_diagonal.png';
    ammoSound = 'audio/take_arrows.mp3';

    speed = 14;
    jumpSpeed = 10;

    //Hitbox Modificators:
    hbmX = 40;
    hbmY = 125;
    hbmW = (-90);
    hbmH = (-140);


    animations = {
        idle: {
            imageSrc: 'img/heroes/Eleria_new/Idle.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        idle2: {
            imageSrc: 'img/heroes/Eleria_new/Idle_2.png',
            frameRate: 4,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Eleria_new/Run.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/heroes/Eleria_new/Jump.png',
            frameRate: 9,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/heroes/Eleria_new/Attack_1.png',
            frameRate: 4,
            frameBuffer: 3,
            dmgFrame: 3,
            dmg: 4,
            showFull: true,
        },
        range: {
            imageSrc: 'img/heroes/Eleria_new/Shot_1.png',
            frameRate: 14,
            frameBuffer: 1,
            shotFrame: 12,
            dmg: 9,
            showFull: true,
        },
        hurt: {
            imageSrc: 'img/heroes/Eleria_new/Hurt.png',
            frameRate: 3,
            frameBuffer: 2,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/heroes/Eleria_new/Dead.png',
            frameRate: 3,
            frameBuffer: 5,
        },
    }

    constructor(pos_x, pos_y,) {
        super(pos_x, pos_y,);
        this.loadImageSprite(this.animations.idle)
        this.setStatusBars();
        this.preLoadImages();
    }

    /** @returns true, if Eleria got enough Arrows left. */
    enoughAmmo() {
        return (this.ammunition >= 2)

    }

    /** An arrow gets shot away, and is gone for good. */
    subtractAmmo() {
        this.ammunition -= 2;
    }
}