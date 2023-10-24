class Acco extends Character {
    LeP = 48;
    maxLeP = 48;
    RS = 3; //Armour 'Rüstungsschutz, incoming dmg will be reduced by this

    ammunition = 0;
    maxAmmunition = 0;
    ammoPicture = '';

    speed = 10;
    jumpSpeed = 8;

    //Hitbox Modificators:
    hbmX = 50;
    hbmY = 125;
    hbmW = (-90)
    hbmH = (-140)

    animations = {
        idle: {
            imageSrc: 'img/heroes/Acco/Idle.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        idle2: {
            imageSrc: 'img/heroes/Acco/Idle_2.png',
            frameRate: 3,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/heroes/Acco/Run.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/heroes/Acco/Jump.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/heroes/Acco/Attack_1.png',
            frameRate: 6,
            frameBuffer: 2,
            dmgFrame: 5,
            dmg: 8,
            showFull: true,
        },
        meele2: {
            imageSrc: 'img/heroes/Acco/Attack_2.png',
            frameRate: 3,
            frameBuffer: 2,
            dmgFrame: 2,
            dmg: 8,
            showFull: true,
        },
        meele3: {
            imageSrc: 'img/heroes/Acco/Attack_3.png',
            frameRate: 4,
            frameBuffer: 2,
            dmgFrame: 3,
            dmg: 14,
            showFull: true,
        },
        // range: { //Acco does not have a ranged attack!
        //     imageSrc: 'img/heroes/Acco/Idle.png',
        //     frameRate: 8,
        //     frameBuffer: 3,
        //     showFull: false
        // },
        hurt: {
            imageSrc: 'img/heroes/Acco/Hurt.png',
            frameRate: 3,
            frameBuffer: 2,
            showFull: true,
        },
        dead: {
            imageSrc: 'img/heroes/Acco/Dead.png',
            frameRate: 3,
            frameBuffer: 5,
        },
    }

    constructor(pos_x, pos_y,) {

        super(pos_x, pos_y,)
        this.loadImageSprite(this.animations.idle)
        this.setStatusBars();
        this.preLoadImages();
    }

}