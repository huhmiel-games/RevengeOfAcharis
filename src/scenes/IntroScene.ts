import { Scene } from 'phaser';
import { COLORS } from '../constant/colors';
import { WIDTH, HEIGHT, SCENES_NAMES, FONTS, FONTS_SIZES } from '../constant/config';
import { checkIsMobileDevice } from '../utils/handleMobileDevices';

/**
 * @author © Philippe Pereira 2021
 * @export
 * @class IntroScene
 * @extends {Scene}
 */
export default class IntroScene extends Scene
{
    private text: string;
    private count: number;
    private storyText: Phaser.GameObjects.BitmapText;
    private skiptext: Phaser.GameObjects.BitmapText;
    private revengeTheme: Phaser.Sound.BaseSound;
    private isMobile: boolean = false;
    constructor ()
    {
        super(SCENES_NAMES.INTRO);
    }

    public create ()
    {
        this.isMobile = checkIsMobileDevice(this);

        const bg = this.add.image(0, 0, 'backgroundWithoutTitles')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);

        if (this.isMobile)
        {
            bg.setInteractive().once('pointerup', () =>
            {
                this.sound.play('swell', { volume: 0.8 });

                this.revengeTheme.stop();

                this.scene.start(SCENES_NAMES.GAME);
            });
        }

        this.text = 'My name is Acharis.-And i came here to free up the -castle from monsters.-But for this I need help, -are you the one who will -take this challenge ??';

        this.count = 0;

        this.storyText = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.ALAGARD, '', 12, 1)
            .setOrigin(0.5, 0.5)
            .setTintFill(COLORS.RED)
            .setDropShadow(0, 1, COLORS.ORANGE, 1);

        this.time.addEvent({
            delay: 100,
            repeat: this.text.length - 1,
            callback: () =>
            {
                if (this.text[this.count] === '-')
                {
                    this.storyText.text += '\n';
                    this.count += 1;
                }
                else
                {
                    this.storyText.text += this.text[this.count];
                    this.count += 1;
                }
            },
        });

        const skipText = this.isMobile ? 'press anywhere to skip' : 'press any key to skip';

        this.skiptext = this.add.bitmapText(WIDTH / 2, HEIGHT - 48, FONTS.GALAXY, skipText, FONTS_SIZES.GALAXY, 1)
            .setOrigin(0.5, 0.5);

        if (this.isMobile === false)
        {
            this.input.keyboard.once(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, () =>
            {
                this.sound.play('swell', { volume: 0.8 });

                this.revengeTheme.stop();

                this.scene.start(SCENES_NAMES.GAME);
            });
        }

        this.tweens.add({
            targets: this.skiptext,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 0,
            repeat: -1,
            yoyo: true,
            alpha: {
                getStart: () => 0.05,
                getEnd: () => 1,
            },
        });

        this.revengeTheme = this.sound.add('revengeTheme');
        this.revengeTheme.play({ loop: true });

        this.cameras.main.setBackgroundColor('#0C1D1C');
        this.cameras.main.fadeIn(2000);
    }
}
