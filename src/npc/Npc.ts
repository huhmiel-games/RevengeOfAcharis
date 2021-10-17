import GameScene from '../scenes/GameScene';
import DialogueService from '../services/DialogueService';

export default class Woman extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public isTalking: boolean = false;
    private msg: string[];
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.scene = scene;

        this.name = config.name;

        // tslint:disable-next-line: no-eval
        this.msg = config.msg.split('#');

        this.setDepth(101);

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
}
