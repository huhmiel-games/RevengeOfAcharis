import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import DialogueService from '../services/DialogueService';

export default class Woman extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    private showMsg: Phaser.GameObjects.BitmapText;
    public isTalking: boolean = false;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.scene = scene;

        this.name = config.name;

        this.setDepth(DEPTH.ENEMY);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body
            .setAllowGravity(false)
            .setSize(20, 40);
        
        this.flipX = true;

        this.anims.play(config.key, true);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            // flip to face the player
            if (this.x > this.scene.player.x)
            {
                this.flipX = true;
            }
            else
            {
                this.flipX = false;
            }

            if (Math.abs(this.x - this.scene.player.x) < 20 && this.scene.player.keys.fire.isDown)
            {
                this.talkToPlayer();
            }

            if (Math.abs(this.x - this.scene.player.x) > 40 && this.isTalking)
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

        const msg = [
            'Be careful Acharis',
            'Our town has been regularly attacked by monsters',
            'it\'s a nightmare...',
            'I fear for my children every day.'
        ];

        DialogueService.npcTalk(this.scene, msg);
    }
}
