import { Scene } from 'phaser';
import { WIDTH, HEIGHT, FONTS, SCENES_NAMES } from '../constant/config';

import minimalPixelFont from '../assets/fonts/dungeon.png';
import minimalPixelXml from '../assets/fonts/dungeon.xml';

import galaxy from '../assets/fonts/galaxy8.png';
import galaxyXml from '../assets/fonts/galaxy8.xml';

import ultima from '../assets/fonts/PixelUltima.png';
import ultimaXml from '../assets/fonts/PixelUltima.xml';

import ultimaBold from '../assets/fonts/PixelUltimaBold.png';
import ultimaBoldXml from '../assets/fonts/PixelUltimaBold.xml';

import alagard from '../assets/fonts/alagard.png';
import alagardXML from '../assets/fonts/alagard.xml';

import progressBar from '../assets/progress-bar.png';
import whitePixel from '../assets/whitePixel.png';

import background from '../assets/menuBackgound5.png';
import menuTheme from '../assets/music/Title_theme.ogg';

/**
 * @author © Philippe Pereira 2021
 * @export
 * @class LogoScene
 * @extends {Scene}
 */
export default class LogoScene extends Scene
{
    private huhmiel: Phaser.GameObjects.BitmapText;
    private tween: Phaser.Tweens.Tween;
    constructor ()
    {
        super(SCENES_NAMES.LOGO);
    }

    public init ()
    {
        // --> FULLSCREEN MODE
        // const startBtn = document.getElementById('fullscreen');
        // startBtn.addEventListener('click', () => {
        //   if (!this.scale.isFullscreen) {
        //     this.scale.startFullscreen();
        //   }
        // });
        document.onfullscreenchange = () =>
        {
            if (document.fullscreenElement === null)
            {
                this.scale.stopFullscreen();
            }
        };
    }

    public preload ()
    {
        this.load.bitmapFont('DungeonFont', minimalPixelFont, minimalPixelXml);
        this.load.bitmapFont('galaxy8', galaxy, galaxyXml);
        this.load.bitmapFont('PixelUltima', ultima, ultimaXml);
        this.load.bitmapFont('PixelUltimaBold', ultimaBold, ultimaBoldXml);
        this.load.bitmapFont('alagard', alagard, alagardXML);

        this.load.image('progressBar', progressBar);
        this.load.image('whitePixel', whitePixel);
        this.load.image('background', background);

        this.load.audio('menuTheme', menuTheme);

        this.cameras.main.setRoundPixels(true);
    }

    public create ()
    {
        this.huhmiel = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.GALAXY, 'huhmiel games', 8, 1)
            .setOrigin(0.5, 0.5)
            .setLetterSpacing(2)
            .setAlpha(0);

        this.tween = this.tweens.add({
            targets: this.huhmiel,
            ease: 'Sine.easeInOut',
            duration: 2000,
            delay: 1000,
            repeat: 0,
            yoyo: true,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1,
            },
            onComplete: () =>
            {
                this.scene.start(SCENES_NAMES.LOADING);
            },
        });

        this.input.keyboard.once(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, () =>
        {
            this.tween.stop();
            this.scene.start(SCENES_NAMES.LOADING);
        });
    }
}
