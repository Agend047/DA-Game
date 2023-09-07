let canvas;
let ctx

let world;;


function init() {
    canvas = document.getElementById('mainCanvas');
    world = new World(canvas);

    console.log('My Char is: ', world.character)
}




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