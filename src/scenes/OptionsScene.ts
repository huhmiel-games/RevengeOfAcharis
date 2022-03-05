import { Scene } from 'phaser';
import { COLORS } from '../constant/colors';
import { WIDTH, HEIGHT, FONTS, FONTS_SIZES, SCENES_NAMES, GAMENAME } from '../constant/config';
import SaveLoadService from '../services/SaveLoadService';

export default class OptionsScene extends Scene
{
    private position: number[];
    private lastPosition: number;
    private keysOptions: any[];
    private title: Phaser.GameObjects.BitmapText;
    private info: Phaser.GameObjects.BitmapText;
    private keyLeft: Phaser.GameObjects.BitmapText;
    private keyRight: Phaser.GameObjects.BitmapText;
    private keyUp: Phaser.GameObjects.BitmapText;
    private keyDown: Phaser.GameObjects.BitmapText;
    private keyFire: Phaser.GameObjects.BitmapText;
    private keyJump: Phaser.GameObjects.BitmapText;
    private keyRun: Phaser.GameObjects.BitmapText;
    private keySelect: Phaser.GameObjects.BitmapText;
    private keyPause: Phaser.GameObjects.BitmapText;
    private selectedKey0: Phaser.GameObjects.BitmapText;
    private selectedKey1: Phaser.GameObjects.BitmapText;
    private selectedKey2: Phaser.GameObjects.BitmapText;
    private selectedKey3: Phaser.GameObjects.BitmapText;
    private selectedKey4: Phaser.GameObjects.BitmapText;
    private selectedKey5: Phaser.GameObjects.BitmapText;
    private selectedKey6: Phaser.GameObjects.BitmapText;
    private selectedKey7: Phaser.GameObjects.BitmapText;
    private selectedKey8: Phaser.GameObjects.BitmapText;
    private saveOptions: Phaser.GameObjects.BitmapText;
    private resetOptions: Phaser.GameObjects.BitmapText;
    private quitOptions: Phaser.GameObjects.BitmapText;
    private head: Phaser.GameObjects.Image;
    constructor ()
    {
        super(SCENES_NAMES.OPTIONS);
    }

    public create ()
    {
        this.position = []; // [16, 24, 36, 48, 64, 80, 96, 112, 128, 144, 160, 176];

        for (let i = 1; i < 13; i++)
        {
            this.position.push((i * 16) + 48);
        }

        this.lastPosition = 0;

        this.sound.play('titleMenu', { loop: true });

        this.keysOptions = [];
        // keysOptions index
        // left: 0,
        // right: 1,
        // up: 2,
        // down: 3,
        // fire: 4,
        // jump: 5,
        // run: 6,
        // select: 7,
        // pause: 8,

        this.title = this.add.bitmapText(WIDTH / 2, 15, FONTS.MINIMAL, 'Options', FONTS_SIZES.MINIMAL, 1)
            .setOrigin(0.5, 0.5)
            .setTintFill(COLORS.RED);

        this.info = this.add.bitmapText(WIDTH / 2, 38, FONTS.GALAXY, 'available keys: a to z, cursors, space, ctrl, shift', FONTS_SIZES.GALAXY, 1)
            .setOrigin(0.5, 0.5)
            .setTintFill(COLORS.RED);

        this.keyLeft = this.add.bitmapText(WIDTH / 4 - 80, this.position[0], FONTS.GALAXY, 'left', FONTS_SIZES.GALAXY, 1);
        this.keyRight = this.add.bitmapText(WIDTH / 4 - 80, this.position[1], FONTS.GALAXY, 'right', FONTS_SIZES.GALAXY, 1);
        this.keyUp = this.add.bitmapText(WIDTH / 4 - 80, this.position[2], FONTS.GALAXY, 'up', FONTS_SIZES.GALAXY, 1);
        this.keyDown = this.add.bitmapText(WIDTH / 4 - 80, this.position[3], FONTS.GALAXY, 'down', FONTS_SIZES.GALAXY, 1);
        this.keyFire = this.add.bitmapText(WIDTH / 4 - 80, this.position[4], FONTS.GALAXY, 'sword attack', FONTS_SIZES.GALAXY, 1);
        this.keyJump = this.add.bitmapText(WIDTH / 4 - 80, this.position[5], FONTS.GALAXY, 'jump', FONTS_SIZES.GALAXY, 1);
        this.keyRun = this.add.bitmapText(WIDTH / 4 - 80, this.position[6], FONTS.GALAXY, 'bow attack', FONTS_SIZES.GALAXY, 1);
        this.keySelect = this.add.bitmapText(WIDTH / 4 - 80, this.position[7], FONTS.GALAXY, 'inventory', FONTS_SIZES.GALAXY, 1);
        this.keyPause = this.add.bitmapText(WIDTH / 4 - 80, this.position[8], FONTS.GALAXY, 'pause', FONTS_SIZES.GALAXY, 1);

        this.selectedKey0 = this.add.bitmapText(WIDTH / 3 * 2, this.position[0], FONTS.GALAXY, 'left, press enter to change', FONTS_SIZES.GALAXY, 1);
        this.selectedKey1 = this.add.bitmapText(WIDTH / 3 * 2, this.position[1], FONTS.GALAXY, 'RIGHT, press enter to change', FONTS_SIZES.GALAXY, 1);
        this.selectedKey2 = this.add.bitmapText(WIDTH / 3 * 2, this.position[2], FONTS.GALAXY, 'UP, press enter to change', FONTS_SIZES.GALAXY, 1);
        this.selectedKey3 = this.add.bitmapText(WIDTH / 3 * 2, this.position[3], FONTS.GALAXY, 'DOWN, press enter to change', FONTS_SIZES.GALAXY, 1);
        this.selectedKey4 = this.add.bitmapText(WIDTH / 3 * 2, this.position[4], FONTS.GALAXY, 'ENTER, press enter to change', FONTS_SIZES.GALAXY, 1);
        this.selectedKey5 = this.add.bitmapText(WIDTH / 3 * 2, this.position[5], FONTS.GALAXY, 'SPACE, press enter to change', FONTS_SIZES.GALAXY, 1);
        this.selectedKey6 = this.add.bitmapText(WIDTH / 3 * 2, this.position[6], FONTS.GALAXY, 'SHIFT, press enter to change', FONTS_SIZES.GALAXY, 1);
        this.selectedKey7 = this.add.bitmapText(WIDTH / 3 * 2, this.position[7], FONTS.GALAXY, 'S, press enter to change', FONTS_SIZES.GALAXY, 1);
        this.selectedKey8 = this.add.bitmapText(WIDTH / 3 * 2, this.position[8], FONTS.GALAXY, 'P, press enter to change', FONTS_SIZES.GALAXY, 1);

        this.saveOptions = this.add.bitmapText(WIDTH / 4 - 80, this.position[9], FONTS.GALAXY, 'save options (press enter)', FONTS_SIZES.GALAXY, 1);
        this.resetOptions = this.add.bitmapText(WIDTH / 4 - 80, this.position[10], FONTS.GALAXY, 'reset to default (press enter)', FONTS_SIZES.GALAXY, 1);
        this.quitOptions = this.add.bitmapText(WIDTH / 4 - 80, this.position[11], FONTS.GALAXY, 'quit options (press enter)', FONTS_SIZES.GALAXY, 1);

        this.head = this.add.image(WIDTH / 4 - 100, this.position[0], 'head')
            .setOrigin(0, 0.3)
            .setDisplaySize(12, 12);

        this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event: { code: string; }) =>
        {
            if (event.code === 'ArrowDown')
            {
                this.choose(1);
            }

            if (event.code === 'ArrowUp')
            {
                this.choose(-1);
            }

            if (event.code === 'Enter')
            {
                this.assignKey(this.lastPosition);
            }
        });

        this.keysOptions = SaveLoadService.getConfigKeys();
        this.keysOptions.forEach((elm: string, i: number) =>
        {
            this[`selectedKey${i}`].text = elm.toLowerCase();
        });

        // fading the scene from black
        this.cameras.main.setBackgroundColor(COLORS.STEEL_GRAY)
            .fadeIn(500);
    }

    private choose (count: number)
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

    private assignKey (pos: number)
    {
        // save
        if (pos === 9)
        {
            const optionToSave = JSON.stringify(this.keysOptions);

            localStorage.setItem(`${GAMENAME}_Options`, optionToSave);

            this.sound.play('melo');

            return;
        }
        // reset to default
        if (pos === 10)
        {
            localStorage.removeItem(`${GAMENAME}_Options`);

            this.sound.play('melo');

            return;
        }
        // quit
        if (pos === 11)
        {
            this.sound.stopAll();

            this.scene.start(SCENES_NAMES.MENU);

            return;
        }
        // assign a key
        const keyRegex = /Key/gm;
        const arrowRegex = /Arrow/gm;
        const shiftLeftRegex = /ShiftLeft/gm;
        const shiftRightRegex = /ShiftRight/gm;
        const constrolLeftRegex = /ControlLeft/gm;
        const controlRightRegex = /ControlRight/gm;

        this[`selectedKey${pos}`].text = 'press a key';

        this.input.keyboard.once(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (e: { key: string; }) =>
        {
            let str = e.key.replace(keyRegex, '');
            str = str.replace(arrowRegex, '');
            str = str.replace(shiftLeftRegex, 'SHIFT');
            str = str.replace(shiftRightRegex, 'SHIFT');
            str = str.replace(constrolLeftRegex, 'CTRL');
            str = str.replace(controlRightRegex, 'CTRL');

            if (str === ' ')
            {
                str = 'SPACE';
            }

            this.keysOptions[pos] = str.toUpperCase();

            this[`selectedKey${pos}`].text = str.toLowerCase();

            this.choose(1);
        });


    }
}
