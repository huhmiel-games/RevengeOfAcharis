import { Scene } from 'phaser';
import { COLORS } from '../constant/colors';
import { WIDTH, HEIGHT, SCENES_NAMES } from '../constant/config';
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
        super({ key: 'menuScene' });
    }

    public create ()
    {
        this.position = [];

        this.lastPosition = 0;

        const totalTime = SaveLoadService.getSavedGameTimeToString() || 0;

        this.titleTheme = this.sound.add('titleMenu');
        this.titleTheme.play({ loop: true });

        this.add.image(0, 0, 'backgroundWithoutTitles')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);

        if (SaveLoadService.loadGameData())
        {
            this.position = [74, 114, 154];
            this.position = [HEIGHT / 4, HEIGHT / 2, HEIGHT / 4 * 3];

            this.add.bitmapText(WIDTH / 4, this.position[0], 'alagard', ' Load Game ', 18, 1).setDropShadow(0, 1, COLORS.ORANGE);

            this.add.bitmapText(WIDTH / 4 * 3 - 24, this.position[0] + 5, 'alagard', ` ${totalTime} `, 9, 2).setLetterSpacing(2).setDropShadow(0, 1, COLORS.RED);

            this.add.bitmapText(WIDTH / 4, this.position[2], 'alagard', ' Delete Game ', 18, 1).setDropShadow(0, 1, COLORS.ORANGE);
        }
        else
        {
            this.position = [74, 114];

            this.add.bitmapText(WIDTH / 4, this.position[0], 'alagard', ' New Game ', 18, 1).setDropShadow(0, 1, COLORS.ORANGE);
        }

        const keysOptions = SaveLoadService.getConfigKeys();

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
            down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
            fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
        });

        this.add.bitmapText(WIDTH / 4, this.position[1], 'alagard', ' Options ', 18, 1).setDropShadow(0, 1, COLORS.ORANGE);

        this.head = this.add.image(WIDTH / 4 - 16, this.position[0] + 11, 'head')
            .setDisplaySize(16, 16);

        const menu = this.input.keyboard.on('keydown', (event: { key: string; }) =>
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

        // fading the scene from black
        this.cameras.main.setBackgroundColor('#0C1D1C');
        this.cameras.main.fadeIn(500);
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

        this.head.y = this.position[this.lastPosition] + 11;
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
