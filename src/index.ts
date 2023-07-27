import Phaser from 'phaser';
import rexNinePatchPlugin from './plugins/rexninepatchplugin.min.js';
import { WIDTH, HEIGHT } from './constant/config';
import LOGO_SCENE from './scenes/LogoScene';
import MENU_SCENE from './scenes/MenuScene';
import GAME_SCENE from './scenes/GameScene';
import GAMEOVER_SCENE from './scenes/GameOverScene';
import OPTIONS_SCENE from './scenes/OptionsScene';
import INTRO_SCENE from './scenes/IntroScene';
import ENDGAME_SCENE from './scenes/EndGameScene';
import LOADING_SCENE from './scenes/LoadingScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    pixelArt: true,
    plugins: {
        global: [
            {
                key: 'rexNinePatchPlugin',
                plugin: rexNinePatchPlugin,
                start: true
            }
        ]
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoRound: true,
        autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
    },
    physics: {
        default: 'arcade',
        arcade: {
            tileBias: 20,
            gravity: { y: 1 },
            debug: false,
            debugShowBody: true,
            debugShowStaticBody: true,
        },
    },
    scene: [LOGO_SCENE, LOADING_SCENE, INTRO_SCENE, OPTIONS_SCENE, MENU_SCENE, GAME_SCENE, ENDGAME_SCENE, GAMEOVER_SCENE],
};

const game = new Phaser.Game(config);


window.addEventListener('resize', (evt) =>
{
    const canva = document.querySelector('canvas');
    // @ts-ignore
    const width = evt.currentTarget?.innerWidth;

    const correctWidth = width - width % 16;

    const correctHeight = Math.round(correctWidth / 1.7777778);

    if (canva && correctWidth % 2 === 0 && correctHeight % 2 === 0)
    {
        game.scale.setParentSize(correctWidth, correctHeight);
    }
});

// Leave fullscreen with escape key in desktop app
// @ts-ignore
try
{
    // @ts-ignore
    nw.App.registerGlobalHotKey(new nw.Shortcut({
        key: 'Escape',
        active: () =>
        {
            // @ts-ignore
            nw.Window.get().toggleFullscreen();
        }
    }));
}
catch (error)
{
    // just ignore
}
