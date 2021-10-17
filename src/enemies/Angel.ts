import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class Angel extends Enemy
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.scene = scene;

        this.name = config.name;
        
        this.setDepth(101);
        
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        
        this.body
            .setAllowGravity(false)
            .setSize(20, 40).setOffset(50, 40);
        
        this.flipX = true;
        
        this.anims.play('angel-idle', true);

        this.on('animationrepeat', () =>
        {
            const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
            
            if (distance < 350)
            {
                this.scene.sound.play('angelWing', { volume: 0.5 });
            }
        });
    }

    public preUpdate (time, delta)
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
        }
    }
}
