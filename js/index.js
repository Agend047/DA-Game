let canvas;
let ctx;
let keyboard = new Keyboard();
let IndexDelay = 33;
let world;
let heroBall = [Acco, Eleria, Kazim]
let level;
const renderPool = [initLvl1, initLvl2, initLvl3, initLvl4,]
let heroNumber = getHeroNumber();

let fullscreen = false;
let playing = false;
let playMusic = false;

const escapeEvent = new KeyboardEvent("keydown", { key: "Escape", keyCode: 27 });


function init() {
    canvas = document.getElementById('mainCanvas');

    addResizeEvList()
    // start(1)
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

/**
 * Starting specific level out of levelPool.
 * @param {Array} levelPool  Collection of the Levels as Variables
 * @param {Number} levelID The Number of the Choosen level
 */
function start(levelID) {

    renderPool[levelID - 1]();
    let levelPool = [level1, level2, level3, level4]
    level = levelPool[levelID - 1];

    world = new World(canvas, keyboard);
    playing = true;
    console.log('My Char is: ', world.character)

    document.getElementById('startGame_btn').style.display = 'none';
    // document.getElementById('pause_btn').style.display = 'block';

    document.getElementById('start_overlay').style.display = 'none'
}

//Clears the 'world' Variable, and ends the 'play()' function inside of the world.
function endLevel() {
    playing = false;
    world = {};
}

/**
 * Pausing game (if it runs) and shows controls
 */
function showControls() {
    if (world) pauseGame();
    let instructionDiv = document.getElementById('instruction_scroll');
    instructionDiv.classList.toggle('d-none');
}

/**
 * Either pauses or continues the loaded level at the paused point,
 * depending on the status of 'playing'
 */
function pauseGame() {
    if (playing) {
        playing = false;
        // document.getElementById('pause_btn').innerHTML = 'Continue'
    } else {
        playing = true;
        world.play();
        // document.getElementById('pause_btn').innerHTML = 'Pause Game'
    }
}

/**
 * Simple restart function to clear the world-Variable and start the current Level again from the start
 */
function restart() {
    endLevel();
    start(level);
}

/**
 * The function ends the Game
 * @param {Number} status 0 == Player died; 1 == Endboss died;
 */
async function endGame(status) {
    await lastTicks();
    playing = false;
    // let screenPic;
    if (status) { loadVictory(); };
    if (!status) { loadDefeat(); };
}


function loadVictory() {
    let screenPic = document.getElementById('victory_overlay');
    screenPic.style.display = 'block';
}

function loadDefeat() {
    let screenPic = document.getElementById('lost_overlay');
    document.getElementById('restartGame_btn').classList.remove('d-none')
    screenPic.style.display = 'block';
}

/**
 * Making 30 last, far slower Intervals, so the player sees that the game ends.
 * @returns the resolved promise, as soon, as it was resolved (after 30 frames)
 */
function lastTicks() {
    IndexDelay = 66;
    return new Promise((resolve, reject) => {
        let count = 0
        let counter = setInterval(() => {
            count++
            if (count == 30) {
                clearInterval(counter)
                resolve();
            }
        }, IndexDelay);
    })
}


// FULLSCREEN FUNCTIONS

/**
 * Small, but important. Adding an Eventlistener, wich will trigger on every
 * rezising of the window
 */
function addResizeEvList() {
    let mainDiv = document.getElementById('mainDiv');
    mainDiv.addEventListener('fullscreenchange', () => {
        resizeCanvas(mainDiv);
    });
}


/**
 * Controling the functions, wich makes the Picture goes Fullscreen.
 * Because the normal FUllscreen-request doesnt work for the whole <maim>,
 * i calculate the zoom i need and save it in the scaleFactor - variable.
 * 
 */
function setFullScreen() {
    let main = document.getElementById('mainDiv')

    if (!fullscreen) {
        enterFullscreen(main)
        modifyStatusBar(1)
        toggleFullSreenPic(1)
        let scaleFactor = calculateScaleFactor(720 * 0.86, 480 * 0.86)
        canvas.style.transform = 'scale(' + scaleFactor + ')'
        fullscreen = true;

    } else {
        exitFullscreen(main)
        toggleFullSreenPic(0)
        fullscreen = false;
    }
}


function enterFullscreen(main) {
    try {
        if (canvas.requestFullscreen) {
            main.requestFullscreen();
        } else if (main.mozRequestFullScreen) { // Firefox
            main.mozRequestFullScreen();
        } else if (main.webkitRequestFullscreen) { // Chrome, Safari und Opera
            main.webkitRequestFullscreen();
        } else if (main.msRequestFullscreen) { // IE/Edge
            main.msRequestFullscreen();
        }
    } catch (err) { alert(err) }
    toggleOverlayFullscreen();
}


function exitFullscreen(main) {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari und Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    } catch (err) { alert(err) }
    toggleOverlayFullscreen()
}


function calculateScaleFactor(maxWidth, maxHeight) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Berechnen Sie den horizontalen und vertikalen Skalierungsfaktor basierend auf der maximalen Breite und Höhe
    const scaleX = viewportWidth / maxWidth;
    const scaleY = viewportHeight / maxHeight;

    // Verwenden Sie den kleineren der beiden Skalierungsfaktoren, um sicherzustellen, dass das Canvas auf den Bildschirm passt
    return Math.min(scaleX, scaleY);
}


/**
 * Bringing everything back to normal size
 */
function resizeCanvas() {
    if (!fullscreen) {
        canvas.style.transform = 'scale(1)'

        modifyStatusBar(0)
        toggleOverlayFullscreen();

        if (world) { world.character.setStatusBars() }
    } //else { fullscreen = false; }
}

function toggleOverlayFullscreen() {
    let overlays = document.getElementsByClassName('Canvas_overlay_pic')
    for (let overlay of overlays) {
        overlay.classList.toggle('fullSize')
    }
}


/**
 * Upscaling - Downscaling of Status Bars for FullScreen or normal screen
 * @param {Number} key 0 == Downscaling, 1 == Upscaling
 */
function modifyStatusBar(key) {

    let PlayerBars = document.getElementById('PlayerBars');
    key ? PlayerBars.style.paddingLeft = '10%' : PlayerBars.style.paddingLeft = '0px';
    key ? PlayerBars.style.paddingTop = '4%' : PlayerBars.style.paddingTop = '0px';

    let marginArray = ['6px', '12px']
    let heightArray = ['32px', '64px']
    let bars = document.getElementsByClassName('PlayerProperty');
    for (let bar of bars) {
        bar.style.margin = marginArray[key]
        bar.style.height = heightArray[key]
    }

    let picWidthArray = ['32px', '64px']
    let pics = document.getElementsByClassName('Bar_Image');
    for (let pic of pics) {
        pic.style.width = picWidthArray[key]
    }

    if (world) {
        key ? world.character.screenMod = 8 : world.character.screenMod = 4;
        world.character.setStatusBars()
    }
}

/**
 * Sets the Fullscreen Picture to what we need right now- in one function. The DA loves that.
 * @param {Number} indicator 0 == Leaving fullscreen, 1 == entering Fullscreen
 */
function toggleFullSreenPic(indicator) {
    let img = document.getElementById('fullScreen_img')


    if (indicator) img.src = 'img/icons/exit-fullscreen.png';
    if (!indicator) img.src = 'img/icons/fullscreen.png';
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