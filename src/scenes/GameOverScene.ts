import { Scene } from 'phaser';
import { WIDTH, HEIGHT, SCENES_NAMES } from '../constant/config';
import SaveLoadService from '../services/SaveLoadService';

export default class GameOver extends Scene
{
    private position: number[];
    private lastPosition: number;
    private background: Phaser.GameObjects.Image;
    private title: Phaser.GameObjects.BitmapText;
    private retry: Phaser.GameObjects.BitmapText;
    private quit: Phaser.GameObjects.BitmapText;
    private head: Phaser.GameObjects.Image;
    private keys: any;
    constructor ()
    {
        super('gameOverScene');
    }

    public create ()
    {
        this.position = [128, 158];
        this.lastPosition = 0;

        this.scene.stop('dashBoard');

        this.background = this.add.image(0, 0, 'backgroundWithoutTitles')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);

        this.title = this.add.bitmapText(WIDTH / 2, HEIGHT / 2 - 40, 'alagard', ' No revenge today... ')
            .setFontSize(20)
            .setOrigin(0.5, 0.5)
            .setTintFill(0xA20000);

        this.retry = this.add.bitmapText(WIDTH / 4, this.position[0], 'alagard', ' Try again ')
            .setFontSize(18)
            .setTintFill(0xA20000);

        this.quit = this.add.bitmapText(WIDTH / 4, this.position[1], 'alagard', ' Quit ')
            .setFontSize(18)
            .setTintFill(0xA20000);

        this.head = this.add.image(WIDTH / 4 - 16, this.position[0], 'head')
            .setOrigin(0, 0)
            .setDisplaySize(16, 16);

        const keysOptions = SaveLoadService.getConfigKeys();

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
            down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
            fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
        });

        this.input.keyboard.on('keydown', (event) =>
        {
            if (this.keys.down.isDown && event.key === this.keys.down.originalEvent.key)
            {
                this.sound.play('bullet', { volume: 0.8 });
                this.choose(1);
            } else if (this.keys.up.isDown && event.key === this.keys.up.originalEvent.key)
            {
                this.sound.play('bullet', { volume: 0.8 });
                this.choose(-1);
            } else if (this.keys.fire.isDown && event.key === this.keys.fire.originalEvent.key)
            {
                this.sound.play('swell', { volume: 0.8 });
                this.launch();
            }
        });

        // fading the scene from black

        this.cameras.main.setBackgroundColor('#0C1D1C');
        this.cameras.main.fadeIn(100);
    }

    public choose (count)
    {
        if (this.lastPosition === this.position.length - 1 && count > 0)
        {
            this.lastPosition = 0;
        } else if (this.lastPosition === 0 && count < 0)
        {
            this.lastPosition = this.position.length - 1;
        } else
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
            this.scene.start(SCENES_NAMES.GAME, { loadSavedGame: true });
            // this.scene.start('dashBoard');
        }
        if (this.lastPosition === 1)
        {
            this.scene.start(SCENES_NAMES.MENU);
        }
    }
}
