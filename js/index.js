let canvas;
let ctx;
let keyboard = new Keyboard();
let IndexDelay = 33;
let world;
let heroBall = [Acco, Eleria, Kazim]
let heroNumber = getHeroNumber();


function init() {
    canvas = document.getElementById('mainCanvas');
    world = new World(canvas, keyboard);

    console.log('My Char is: ', world.character)

    setStatusBars()
}

function createHero(heroNumber) {
    localStorage.setItem('heroNumber', JSON.stringify(heroNumber));

    window.location.reload();
}


function setStatusBars() {
    // if (heroNumber == 0) { //Acco

    //     let ammoBar = document.getElementById('ammo_property');
    //     ammoBar.style.display = 'none';

    //     let healthBar = document.getElementById('health_bg_max');
    //     healthBar.style.width = (48 * 4) + "px";

    // } else if (heroNumber == 1) { //Eleria

    //     let healthBar = document.getElementById('health_bg_max');
    //     healthBar.style.width = (30 * 4) + "px";

    //     let ammoBar = document.getElementById('ammo_bg_max');
    //     ammoBar.style.width = (20 * 4) + "px";

    // } else if (heroNumber == 2) { //Kazim

    //     let healthBar = document.getElementById('health_bg_max');
    //     healthBar.style.width = (32 * 4) + "px";



    //     let ammoBar = document.getElementById('ammo_bg_max');
    //     ammoBar.style.width = (40 * 4) + "px";
    // }
}

/**
 * Loads set hero Number of local Storage, for world-class and more.
 * @returns the set Number of the hero, or 0, if none was set before-
 */
function getHeroNumber() {
    let numberFromStorage
    numberFromStorage = localStorage.getItem('heroNumber')
    if (numberFromStorage) {
        let heroNumber = JSON.parse(numberFromStorage)
        return heroNumber;
    }
    else
        return 0;
}



/**
 * Helper function, that allows me to use intervalls for an amount of uses.
 * @param {Function} callback the function, i want to delay
 * @param {Number} delay Interval delay in MS
 * @param {Number} repetitions max number of Intervalls
 */
function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = setInterval(function () {
        callback
        if (++x === repetitions) {
            clearInterval(intervalID);
        }
    }, delay);
}


window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {

        case 37: //ArrowLeft
            keyboard.LEFT = true;
            break;
        case 65: //A
            keyboard.LEFT = true;
            break;
        case 97: //a
            keyboard.LEFT = true;
            break;

        case 38: //ArrowUp
            keyboard.UP = true;
            break;
        case 87: //W
            keyboard.UP = true;
            break;
        case 119: //w
            keyboard.UP = true;
            break;

        case 39: //ArrowRight
            keyboard.RIGHT = true;
            break;
        case 68: //D
            keyboard.RIGHT = true;
            break;
        case 100: //d
            keyboard.RIGHT = true;
            break;

        case 40: //ArrowDown
            keyboard.DOWN = true;
            break;
        case 83: //S
            keyboard.DOWN = true;
            break;
        case 115: //s
            keyboard.DOWN = true;
            break;

        case 32: //Space
            keyboard.SPACE = true;
            break

        case 71: //g
            keyboard.G = true;
            break

    }
})

window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37: //ArrowLeft
            keyboard.LEFT = false;
            break;
        case 65: //A
            keyboard.LEFT = false;
            break;
        case 97: //a
            keyboard.LEFT = false;
            break;

        case 38: //ArrowUp
            keyboard.UP = false;
            break;
        case 87: //W
            keyboard.UP = false;
            break;
        case 119: //w
            keyboard.UP = false;
            break;

        case 39: //ArrowRight
            keyboard.RIGHT = false;
            break;
        case 68: //D
            keyboard.RIGHT = false;
            break;
        case 100: //d
            keyboard.RIGHT = false;
            break;

        case 40: //ArrowDown
            keyboard.DOWN = false;
            break;
        case 83: //S
            keyboard.DOWN = false;
            break;
        case 115: //s
            keyboard.DOWN = false;
            break;

        case 32: //Space
            keyboard.SPACE = false;

        case 71: //g
            keyboard.G = false;
            break

    }
})


/**
 * IDEEN FÜR CHARAKTERE
 * 
 * //Harald, Phexgeweihter
 * Sammelt und wirft: Messer
 * Sprunghöhe: Normal
 * Attacke: Mittlerer Schaden
 * Fähigkeit: Schleichen (Immung gegen Angriffe)
 * 
 * //Eleria, Elfische Bewahrerin
 * Sammelt und Schießt: Pfeile
 * Sprunghöhe: Hoch
 * Attacke: Niedriger Schaden
 * Fähigkeit: Heilung
 * 
 * //Oldor, Zwergischer Krieger
 * Sammelt und Wirft: Äxte
 * Sprunghöhe: Niedrig
 * Attacke: Hoher Schaden 
 * Fähigkeit: Rage (Mehr Schaden)
 */