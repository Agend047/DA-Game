const level1 = new Level(
    // Enemys
    [
        new OrcWarrior(200),
        new OrcBerserker(300),
        new OrcWarrior(800),
        new OrcWarrior(1600),
        new OrcBerserker(2000),
    ],

    //clouds
    [],

    //coins
    [],

    //collectables
    [],

    //backgrounds
    [
        new Background(0, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),
        new Background(719, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),
        new Background(719 * 2, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),
        new Background(719 * 3, 480, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Sky.png'),

        new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),
        new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),
        new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),
        new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),

        new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),
        new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),
        new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),
        new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),

        new Background(0, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
        new Background(720, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
        new Background(719 * 2, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
        new Background(719 * 3, 500, 'img/5_background/forest/Cartoon_Forest_BG_01/Layers/Foreground.png'),
    ],

    //level End
    level_end_x = (719 * 4)
)