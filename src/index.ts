import Phaser from 'phaser';
import rexNinePatchPlugin from './plugins/rexninepatchplugin.min.js';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
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
            },
            {
                key: 'rexVirtualJoystickPlugin',
                plugin: VirtualJoystickPlugin,
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

// export const ENTER_KEY = 'Enter';
// export const SPACE_KEY = 'Space';
// export const ESCAPE_KEY = 'Escape';
// export const ARROW_LEFT_KEY = 'ArrowLeft';
// export const ARROW_UP_KEY = 'ArrowUp';
// export const ARROW_RIGHT_KEY = 'ArrowRight';
// export const ARROW_DOWN_KEY = 'ArrowDown';
// export const simulateKeyEvent = (code, type = 'down') => {
//     const keysMap = {
//         [ENTER_KEY]: 13,
//         [SPACE_KEY]: 32,
//         [ARROW_LEFT_KEY]: 37,
//         [ARROW_UP_KEY]: 38,
//         [ARROW_RIGHT_KEY]: 39,
//         [ARROW_DOWN_KEY]: 40,
//     };

//     const event = document.createEvent('HTMLEvents');
//     event.initEvent(`key${type}`, true, false);
//     // @ts-ignore
//     event.code = code;
//     // @ts-ignore
//     event.keyCode = keysMap[code];

//     document.dispatchEvent(event);
// };
