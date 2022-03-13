import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES, HEIGHT, WIDTH } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import DialogueService from '../services/DialogueService';
import SaveLoadService from '../services/SaveLoadService';

export default class Woman extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public isTalking: boolean = false;
    private msg: string[];
    private keysOptions: string[] = SaveLoadService.getConfigKeys();
    private isAskToTalk: boolean = false;
    public label: Phaser.GameObjects.BitmapText;
    public ui: any;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.name = config.name;

        this.msg = typeof(config.msg) === 'string' ? config.msg.split('#') : config.msg;

        this.setDepth(DEPTH.ENEMY);

        this.scene.add.existing(this);

        this.flipX = true;

        this.anims.play(config.key, true);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            const { player } = this.scene;
            // flip to face the player
            if (this.x > player.x)
            {
                this.flipX = true;
            }
            else
            {
                this.flipX = false;
            }

            if (Math.abs(this.x - player.x) < 15 && player.keys.fire.isDown && player.body.top > this.y)
            {
                this.talkToPlayer();
            }

            if (Math.abs(this.x - player.x) < 15 && player.body.top > this.y)
            {
                this.showAction();
            }
            else
            {
                this.hideAction();
            }

            if (Math.abs(this.x - player.x) > 40 && this.isTalking)
            {
                this.isTalking = false;
            }
        }
    }

    private talkToPlayer ()
    {
        if (this.isTalking)
        {
            return;
        }

        if (this.ui?.getData('name') === this.name)
        {
            this.ui?.setActive(false).setVisible(false);
        }

        this.isTalking = true;

        this.scene.sound.play(`${this.name}Sfx`);

        DialogueService.npcTalk(this.scene, this.msg);

        if (this.label?.getData('name') === this.name)
        {
            this.label?.setActive(false).setVisible(false);
        }
    }

    private showAction ()
    {
        if (this.isTalking || this.isAskToTalk) return;

        this.isAskToTalk = true;

        // @ts-ignore
        this.ui = this.scene.children.getByName('smallDialogBox') || this.scene.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 16, WIDTH / 2, HEIGHT / 8, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setName('smallDialogBox')
            .setDataEnabled()
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0);
        this.ui.setActive(true).setData({ name: this.name }).setVisible(true);

        this.label = this.scene.children.getByName('actionText') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, HEIGHT - 24, FONTS.ULTIMA_BOLD, `Press ${this.keysOptions[4].toLowerCase()} to talk`, FONTS_SIZES.ULTIMA, 1)
            .setOrigin(0.5, 0)
            .setName('actionText')
            .setLetterSpacing(1)
            .setDataEnabled()
            .setTintFill(COLORS.STEEL_GRAY)
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0);
        this.label.setActive(true).setData({ name: this.name }).setText(`Press ${this.keysOptions[4].toLowerCase()} to talk`).setVisible(true);
    }

    private hideAction ()
    {
        if (this.label?.getData('name') === this.name)
        {
            this.label?.setActive(false).setVisible(false);
        }

        if (this.ui?.getData('name') === this.name)
        {
            this.ui?.setActive(false).setVisible(false);
        }

        this.isAskToTalk = false;
    }
}
