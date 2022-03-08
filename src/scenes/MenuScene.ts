import { Scene } from 'phaser';
import { COLORS } from '../constant/colors';
import { WIDTH, HEIGHT, SCENES_NAMES, FONTS, FONTS_SIZES } from '../constant/config';
import SaveLoadService from '../services/SaveLoadService';

export default class LoadSavedGame extends Scene
{
    private position: number[];
    private lastPosition: number;
    private titleTheme: Phaser.Sound.BaseSound;
    private keys: any;
    private head: Phaser.GameObjects.Image;
    constructor ()
    {
        super({ key: SCENES_NAMES.MENU });
    }

    public create ()
    {
        this.position = [];

        this.lastPosition = 0;

        const totalTime = SaveLoadService.getSavedGameTimeToString() || 0;

        this.titleTheme = this.sound.add('titleMenu');
        this.titleTheme.play({ loop: true });

        this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);

        if (SaveLoadService.loadGameData())
        {
            // this.position = [74, 114, 154];
            this.position = [HEIGHT / 8 * 5, HEIGHT / 8 * 6, HEIGHT / 8 * 7];

            this.add.bitmapText(WIDTH / 6, this.position[0], FONTS.ULTIMA_BOLD, 'Load Game', FONTS_SIZES.ULTIMA_BOLD, 1)
                .setTintFill(COLORS.RED)
                .setDropShadow(0, 1, COLORS.ORANGE, 1);

            this.add.bitmapText(WIDTH / 6 * 2, this.position[0] + 7, FONTS.GALAXY, ` ${totalTime} `, FONTS_SIZES.GALAXY, 2)
                .setTintFill(COLORS.RED);

            this.add.bitmapText(WIDTH / 6, this.position[2], FONTS.ULTIMA_BOLD, 'Delete Game', FONTS_SIZES.ULTIMA_BOLD, 1)
                .setTintFill(COLORS.RED)
                .setDropShadow(0, 1, COLORS.ORANGE, 1);
        }
        else
        {
            this.position = [HEIGHT / 8 * 5, HEIGHT / 8 * 6];

            this.add.bitmapText(WIDTH / 6, this.position[0], FONTS.ULTIMA_BOLD, 'New Game', FONTS_SIZES.ULTIMA_BOLD, 1)
                .setTintFill(COLORS.RED)
                .setDropShadow(0, 1, COLORS.ORANGE, 1);
        }

        const keysOptions = SaveLoadService.getConfigKeys();

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
            down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
            fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
        });

        this.add.bitmapText(WIDTH / 6, this.position[1], FONTS.ULTIMA_BOLD, 'Options', FONTS_SIZES.ULTIMA_BOLD, 1)
            .setTintFill(COLORS.RED)
            .setDropShadow(0, 1, COLORS.ORANGE, 1);

        this.head = this.add.image(WIDTH / 6 - 16, this.position[0] + 8, 'head')
            .setDisplaySize(16, 16);

        const menu = this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event: { key: string; }) =>
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
                this.titleTheme.stop();
                menu.removeAllListeners();
                this.launch();
            }
        });
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

        this.head.y = this.position[this.lastPosition] + 8;
    }

    public launch ()
    {
        if (this.lastPosition === 0)
        {
            this.titleTheme.stop();

            if (this.position.length === 2)
            {
                this.scene.start(SCENES_NAMES.INTRO);

                return;
            }

            this.scene.start(SCENES_NAMES.GAME);
        }

        if (this.lastPosition === 1)
        {
            this.scene.start(SCENES_NAMES.OPTIONS);
        }

        if (this.lastPosition === 2)
        {
            this.sound.play('playerDead', { volume: 1 });

            SaveLoadService.deleteGameData();

            this.scene.restart();
        }
    }
}
