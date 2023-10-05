let canvas;
let ctx;
let keyboard = new Keyboard();
let IndexDelay = 33;
let world;
let heroBall = [Acco, Eleria, Kazim]
let heroNumber = getHeroNumber();

let fullscreen = false;


function init() {
    canvas = document.getElementById('mainCanvas');
    world = new World(canvas, keyboard);

    console.log('My Char is: ', world.character)

    mustDo()
}

/**
 * Sets the HeroID in Storage
 * @param {Number} heroNumber Index of Choosen Hero in the Array, who has to be set
 */
function createHero(heroNumber) {
    localStorage.setItem('heroNumber', JSON.stringify(heroNumber));

    window.location.reload();
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


function setFullScreen() {
    let main = document.getElementById('mainDiv')
    main.requestFullscreen()

    modifyStatusBar(1)
    canvas.style.transform = 'scale(1.8)'
    fullscreen = true;

}

function mustDo() {
    let mainDiv = document.getElementById('mainDiv');
    mainDiv.addEventListener('fullscreenchange', () => {
        resizeCanvas(mainDiv)
    });
}


function resizeCanvas() {
    console.log(fullscreen)
    if (!fullscreen) {
        canvas.style.transform = 'scale(1)'

        modifyStatusBar(0)

        world.character.setStatusBars()
    } else { fullscreen = false; }
}

/**
 * Upscaling - Downscaling of Status Bars
 * @param {Number} key 0 == Downscaling, 1 == Upscaling
 */
function modifyStatusBar(key) {

    let marginArray = ['6px', '12px']
    let heightArray = ['32px', '64px']
    let picWidthArray = ['32px', '64px']

    let bars = document.getElementsByClassName('PlayerProperty');
    for (let bar of bars) {
        bar.style.margin = marginArray[key]
        bar.style.height = heightArray[key]
    }

    let pics = document.getElementsByClassName('Bar_Image');
    for (let pic of pics) {
        pic.style.width = picWidthArray[key]
    }




    key ? world.character.screenMod = 8 : world.character.screenMod = 4;
    world.character.setStatusBars()
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