import GameScene from '../scenes/GameScene';

export default class Hatman extends Phaser.GameObjects.Sprite
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

        this.setDepth(101);

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
            if (Math.abs(this.x - this.scene.player.x) < 20 && !this.scene.oldman.isTalking)
            {
                this.talkToPlayer();
            }
            else
            {
                this.stopTalking();
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
        this.scene.sound.play('hatmanSfx', { volume: 4 });
        const msg = `I must leave this town...
    I must leave this town...
    I must leave this town...quickly`;
        this.showMsg = this.scene.add.bitmapText(this.x, this.y - 42, 'atomic', msg, 8, 1)
            .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);
    }

    private stopTalking ()
    {
        this.isTalking = false;
        this.showMsg?.setAlpha(0);
    }
}
