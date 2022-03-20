import { Scene } from 'phaser';
import { COLORS } from '../constant/colors';
import { WIDTH, HEIGHT, SCENES_NAMES, FONTS, FONTS_SIZES } from '../constant/config';
import SaveLoadService from '../services/SaveLoadService';
import { checkIsMobileDevice } from '../utils/handleMobileDevices';

/**
 * @author © Philippe Pereira 2021
 * @export
 * @class GameOverScene
 * @extends {Scene}
 */
export default class GameOverScene extends Scene
{
    private position: number[];
    private lastPosition: number;
    private background: Phaser.GameObjects.Image;
    private title: Phaser.GameObjects.BitmapText;
    private retry: Phaser.GameObjects.BitmapText;
    private quit: Phaser.GameObjects.BitmapText;
    private head: Phaser.GameObjects.Image;
    private keys: any;
    private isMobile: boolean;
    constructor ()
    {
        super(SCENES_NAMES.GAMEOVER);
    }

    public create ()
    {
        this.isMobile = checkIsMobileDevice(this);

        this.position = [HEIGHT / 8 * 5, HEIGHT / 8 * 6];
        this.lastPosition = 0;

        this.scene.stop('dashBoard');

        this.background = this.add.image(0, 0, 'backgroundWithoutTitles')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);

        this.title = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.ALAGARD, 'G A M E  O V E R', 20, 1)
            .setOrigin(0.5, 0.5)
            .setLetterSpacing(8)
            .setTint(COLORS.RED, COLORS.RED, COLORS.ORANGE, COLORS.ORANGE)
            .setDropShadow(0, 1, COLORS.ORANGE, 1);

        this.retry = this.add.bitmapText(WIDTH / 6, this.position[0], FONTS.ULTIMA_BOLD, 'Try again', FONTS_SIZES.ULTIMA_BOLD, 0)
            .setLetterSpacing(1)
            .setTint(COLORS.RED, COLORS.RED, COLORS.ORANGE, COLORS.ORANGE)
            .setDropShadow(0, 1, COLORS.ORANGE, 1);

        if (this.isMobile)
        {
            this.retry.setInteractive().once('pointerup', () =>
            {
                this.input.keyboard.enabled = true;

                this.scene.start(SCENES_NAMES.GAME);
            });
        }

        this.quit = this.add.bitmapText(WIDTH / 6, this.position[1], FONTS.ULTIMA_BOLD, 'Quit', FONTS_SIZES.ULTIMA_BOLD, 0)
            .setLetterSpacing(1)
            .setTint(COLORS.RED, COLORS.RED, COLORS.ORANGE, COLORS.ORANGE)
            .setDropShadow(0, 1, COLORS.ORANGE, 1);

        if (this.isMobile)
        {
            this.quit.setInteractive().once('pointerup', () =>
            {
                this.scene.start(SCENES_NAMES.MENU);
            });

            return;
        }

        this.head = this.add.image(WIDTH / 6 - 24, this.position[0], 'head')
            .setOrigin(0, 0)
            .setDisplaySize(16, 16);

        const keysOptions = SaveLoadService.getConfigKeys();

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
            down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
            fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
        });

        this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (this.keys.down.isDown && event.key === this.keys.down.originalEvent.key)
            {
                this.sound.play('bullet', { volume: 0.8 });
                this.choose(1);
            }
            else if (this.keys.up.isDown && event.key === this.keys.up.originalEvent.key)
            {
                this.sound.play('bullet', { volume: 0.8 });
                this.choose(-1);
            }
            else if (this.keys.fire.isDown && event.key === this.keys.fire.originalEvent.key)
            {
                this.sound.play('swell', { volume: 0.8 });
                this.launch();
            }
        });

        // fading the scene from black
        this.cameras.main.setBackgroundColor('#0C1D1C').fadeIn(100);
    }

    public choose (count: number)
    {
        if (this.lastPosition === this.position.length - 1 && count > 0)
        {
            this.lastPosition = 0;
        }
        else if (this.lastPosition === 0 && count < 0)
        {
            this.lastPosition = this.position.length - 1;
        }
        else
        {
            this.lastPosition += count;
        }

        this.head.y = this.position[this.lastPosition];
    }

    public launch ()
    {
        if (this.lastPosition === 0)
        {
            this.input.keyboard.enabled = true;

            this.scene.start(SCENES_NAMES.GAME);
        }

        if (this.lastPosition === 1)
        {
            this.scene.start(SCENES_NAMES.MENU);
        }
    }
}
