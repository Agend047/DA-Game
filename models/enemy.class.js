/** the Enemys Character */
class Enemy extends MovableObject {

    speed;

    constructor(min_x) {
        let getX = (min_x + Math.random() * 450)
        let getY = (210 + Math.random() * 20)

        super(getX, getY,)
        this.speed = 0.2 + (Math.random() * 0.25);
        this.move();
    }

    strike() {
        console.log('ATTACK!!')
    };

    move() {
        setInterval(() => {
            this.moveLeft(); //Shall be able to move left & right! 
        }, 33);

    }
}

class Chicken extends Enemy {
    width = 140;
    height = 100;

    constructor(min_x) {
        super(min_x).loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}

class OrcWarrior extends Enemy {
    width = 100;
    height = 200;

    speed = 1;
    jumpSpeed = 8;
    frameRate = 8;

    animations = {
        idle: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Idle.png',
            frameRate: 5,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Run.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Jump.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Attack_1.png',
            frameRate: 4,
            frameBuffer: 2,
        },
        meele2: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Attack_1.png',
            frameRate: 4,
            frameBuffer: 2,
        },

        walk: {
            imageSrc: 'img/enemys_orcs/orc_warrior/Walk.png',
            frameRate: 7,
            frameBuffer: 2,
        },
    }

    constructor(min_x) {
        super(min_x)
        this.loadImageSprite(this.animations.idle)
    }
}


class OrcBerserker extends Enemy {
    width = 100;
    height = 200;

    speed = 0.1;
    jumpSpeed = 8;
    frameRate = 8;

    animations = {
        idle: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Idle.png',
            frameRate: 5,
            frameBuffer: 3,
        },
        run: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Run.png',
            frameRate: 6,
            frameBuffer: 3,
        },
        jump: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Jump.png',
            frameRate: 5,
            frameBuffer: 3,
        },
        meele1: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Attack_1.png',
            frameRate: 4,
            frameBuffer: 2,
        },
        meele2: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Attack_2.png',
            frameRate: 5,
            frameBuffer: 2,
        },

        walk: {
            imageSrc: 'img/enemys_orcs/orc_berserker/Walk.png',
            frameRate: 7,
            frameBuffer: 2,
        },
    }

    constructor(min_x) {
        super(min_x)
        this.loadImageSprite(this.animations.idle)
    }
}