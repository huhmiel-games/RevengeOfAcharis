import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import DialogueService from '../services/DialogueService';
import Npc from './Npc';

export default class Oldman extends Phaser.GameObjects.Sprite
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

        this.scene.add.existing(this);

        this.flipX = false;

        this.anims.play('oldman-idle', true);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            const { player } = this.scene;
            // flip to face the player
            if (Math.abs(this.x - player.x) < 30 && !this.isTalking && player.keys.fire.isDown && player.body.blocked.down)
            {
                this.anims.play('oldman-idle', true);

                this.talkToPlayer();

                if (this.x > player.x)
                {
                    this.flipX = true;
                }
                else
                {
                    this.flipX = false;
                }
            }

            if (Math.abs(this.x - player.x) > 40 && this.isTalking)
            {
                this.isTalking = false;
            }

            if (this.x > player.x)
            {
                this.flipX = true;
            }
            else
            {
                this.flipX = false;
            }
        }
    }

    private talkToPlayer ()
    {
        if (this.isTalking)
        {
            return;
        }

        const othersNpcAreTalking = this.scene.children.list.filter(npc =>
        {
            if (npc instanceof Npc && npc.isTalking)
            {
                return npc;
            }
        });

        if (othersNpcAreTalking.length) return;

        this.isTalking = true;

        let msg: string[];

        // if (!this.scene.player.inventory.thunderDoorReached)
        // {
        //     this.scene.sound.play('oldmanHeySfx', { volume: 2 });
            msg = [
                'Hey Acharis !!',
                'You are back.',
                'I will try to help you.',
                'Come back to me if you have questions,',
                'I\'ll try to answer them!!'
            ];
        // }
        // else
        // {
        //     this.scene.sound.play('oldmanDoubtSfx', { volume: 2 });
        //     msg = [
        //         'Hey Acharis !!',
        //         'A lightning blocking you?? Never heard about that.',
        //         'But someone is waiting for you in the forest',
        //         'She is waiting you near a strange tree,',
        //         'perhaps she knows...'
        //     ];
        // }

        // if (this.scene.player.inventory.townInFire)
        // {
        //     this.scene.sound.play('oldmanSadSfx', { volume: 2 });
        //     msg = [
        //         'Hey Acharis !!',
        //         'Everybody is gone...sadly...',
        //         'Go to the castle now, your quest isn\'t over!!'
        //     ];
        // }

        DialogueService.npcTalk(this.scene, msg);
    }

    private stopTalking ()
    {
        this.isTalking = false;
        this.showMsg?.setAlpha(0);
    }
}
