let playMusic = true;

let ambiente;
let drums;

let runningSound;
let runningSound2;

let acco_strike1;
let acco_strike2;
let eleria_meele;
let eleria_ranged;
let kazim_meele
let kazim_igni;

let meele_kill_1;
let meele_kill_2;
let meele_kill_3;
let range_kill_1;
let range_kill_2;

let bow_kill;
let bow_kill2;

let burning_kill;
let burning;

let acco_death;
let acco_hurt;
let kazim_hurt;
let kazim_death;
let eleria_hurt;
let eleria_death;

let defeat;
let victory;
let axe_swing;


/** Defining the Sounds for the Game */
function defineSounds() {
    ambiente = document.getElementById('ambiente');
    drums = document.getElementById('drums');
    runningSound = document.getElementById('walk_sound');
    runningSound2 = document.getElementById('walk_sound2');

    acco_strike1 = document.getElementById('acco_strike1');
    acco_strike2 = document.getElementById('acco_strike2');

    eleria_ranged = document.getElementById('eleria_ranged');
    eleria_meele = document.getElementById('eleria_meele');

    kazim_meele = document.getElementById('kazim_meele');
    kazim_igni = document.getElementById('kazim_igni');

    meele_kill_1 = document.getElementById('meele_kill_1');
    meele_kill_2 = document.getElementById('meele_kill_2');
    meele_kill_3 = document.getElementById('meele_kill_3');
    range_kill_1 = document.getElementById('range_kill_1');
    range_kill_2 = document.getElementById('range_kill_2');

    bow_kill = document.getElementById('bow_kill');
    bow_kill2 = document.getElementById('bow_kill2');

    burning_kill = document.getElementById('burning_kill');
    burning = document.getElementById('burning');

    acco_death = document.getElementById('acco_death');
    acco_hurt = document.getElementById('acco_hurt');
    kazim_hurt = document.getElementById('kazim_hurt');
    kazim_death = document.getElementById('kazim_death');
    eleria_hurt = document.getElementById('eleria_hurt');
    eleria_death = document.getElementById('eleria_death');

    defeat = document.getElementById('defeat');
    victory = document.getElementById('victory');
    axe_swing = document.getElementById('axe_swing');
}

/** Simple changing a variable and the image of it. */
function playOrMute() {
    let soundImg = document.getElementById('sound_img');

    if (playMusic) {
        playMusic = false;
        soundImg.src = 'img/icons/sound_off.png'
    } else {
        playMusic = true;
        soundImg.src = 'img/icons/sound_on.png';
    }
    basicMusic();
}

/** Start or pause background sounds */
function basicMusic() {
    if (playMusic) {
        ambiente.play();
        ambiente.loop = true;
        drums.play();
        drums.loop = true;
    }
    else {
        ambiente.pause();
        drums.pause();
        runningSound.pause();
        victory.pause();
        defeat.pause();
    }
}