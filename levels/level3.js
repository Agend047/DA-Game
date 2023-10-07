const level3 = new Level(
    [
        new OrcWarrior(200),
        new OrcWarrior(200),
        new OrcWarrior(200),
        new OrcBerserker(300),
    ],

    //clouds
    [],

    //coins
    [
        new Coin(100, 100),
        new Coin(200, 100),
        new Coin(300, 100),
        new Coin(400, 100),
        new Coin(500, 100),
        new Coin(600, 100),
        new Coin(200, 100),
        new Coin(200, 100),
        new Coin(100, 100),
        new Coin(100, 100),
        new Coin(300, 100),
        new Coin(300, 100),
        new Coin(300, 100),
        new Coin(300, 100),
        new Coin(300, 100),
    ],

    //collectables
    [],

    //backgrounds

    [
        new Background(0, 480, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Sky.png'),
        new Background(719, 480, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Sky.png'),
        new Background(719 * 2, 480, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Sky.png'),
        new Background(719 * 3, 480, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Sky.png'),

        new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/BG_Decor.png'),
        new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/BG_Decor.png'),
        new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/BG_Decor.png'),
        new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/BG_Decor.png'),

        new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Middle_Decor.png'),
        new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Middle_Decor.png'),
        new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Middle_Decor.png'),
        new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Middle_Decor.png'),

        new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Foreground.png'),
        new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Foreground.png'),
        new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Foreground.png'),
        new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_03/Layers/Foreground.png'),
    ],

    level_end_x = (719 * 4)
)