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
    private label: Phaser.GameObjects.BitmapText;
    private ui: any;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.scene = scene;

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

            if (Math.abs(this.x - player.x) < 20 && player.keys.fire.isDown && player.body.blocked.down)
            {
                this.talkToPlayer();
            }

            if (Math.abs(this.x - player.x) < 20 && player.body.blocked.down)
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

        this.isTalking = true;

        this.scene.sound.play(`${this.name}Sfx`);

        DialogueService.npcTalk(this.scene, this.msg);
    }

    private showAction ()
    {
        if (this.isTalking || this.isAskToTalk) return;

        this.isAskToTalk = true;

        // @ts-ignore
        this.ui = this.scene.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 16, WIDTH / 2, HEIGHT / 8, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0)
            .setVisible(true);

        this.label = this.scene.add.bitmapText(WIDTH / 2, HEIGHT - 24, FONTS.ULTIMA_BOLD, `Press ${this.keysOptions[4]} to talk`, FONTS_SIZES.ULTIMA, 1)
            .setOrigin(0.5, 0).setLetterSpacing(1).setAlpha(1).setDepth(DEPTH.UI_TEXT).setScrollFactor(0, 0);
    }

    private hideAction ()
    {
        this.label?.destroy();

        this.ui?.destroy();

        this.isAskToTalk = false;
    }
}
