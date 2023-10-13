let level1;
function initLvl1() {
    level1 = new Level(
        // Enemys
        [
            new WalkerWarrior(200, 1),
            new WalkerBerserker(300, 2),
            new WalkerWarrior(800, 2),
            new WalkerWarrior(1600, 3),
            new WalkerBerserker(2000, 3),
            // new BossWarrior(719 * 4.8),
            new BossBerserker(719 * 4.7)
        ],

        //clouds
        [],

        //coins
        [
            new Coin(200, 100, true),
            new Coin(300, 100, true),
            new Coin(100, 100, true),
            new Coin(400, 100, true),
            new Coin(500, 100, true),
            new Coin(300, 100, true),
            new Coin(200, 100, true),
            new Coin(200, 100, true),
            // new Coin(100, 100, true),
            // new Coin(300, 100, true),
            new Coin(300, 100, true),
            new Coin(300, 100, true),
            new Coin(3250, 100, false),
            new Coin(3250, 200, false),
            new Coin(3300, 150, false),
        ],

        //Supplys
        [
            new Ammounition(300, 300),
            new Ammounition(1500, 150),
            // new HealthPotion(1000, 200),
            new HealthPotion(2400, 100),
        ],

        //backgrounds
        [
            new Background(0, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),
            new Background(719, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),
            new Background(719 * 2, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),
            new Background(719 * 3, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),
            new Background(719 * 4, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),

            new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),
            new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),
            new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),
            new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),
            new Background(719 * 4, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),

            new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),
            new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),
            new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),
            new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),
            new Background(719 * 4, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),

            new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
            new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
            new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
            new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
            new Background(719 * 4, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
        ],

        //level End
        level_end_x = (719 * 4.8)
    )
}