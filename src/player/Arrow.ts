import { GameObjects } from 'phaser';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';

export default class Arrow extends GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public damage: number;
    public isDeflecting: boolean;
    public enemyState?: any;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.scene = scene;

        this.setName('arrow').setDepth(DEPTH.GROUND_LAYER - 1);

        this.anims.play('arrow', true);

        this.scene.add.existing(this);

        this.scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true).setSize(17, 3).setOffset(1, 0);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            if (!this.body.blocked.none)
            {
                this.anims.pause();
                this.kill();

                return;
            }

            if (this.isDeflecting)
            {
                this.angle += 20;
            }

            if (!this.scene.cameras.main.getBounds().contains(this.body.center.x, this.body.center.y))
            {
                this.kill();
            }
        }
    }

    public kill ()
    {
        this.isDeflecting = false;

        this.body.setVelocity(0, 0).setGravityY(30).setEnable(false);

        this.setAngle(0).setVisible(false).setActive(false);
    }

    public deflect ()
    {
        if (this.isDeflecting) return;

        this.isDeflecting = true;

        this.scene.sound.play('skeletonHit');

        const currentVelocityX = this.body.velocity.x;

        this.body.stop().setVelocity(-currentVelocityX / 2, -250);

        this.scene.time.addEvent({
            delay: 150,
            callback: this.stopdeflect,
            callbackScope: this
        });
    }

    private stopdeflect ()
    {
        const currentVelocityX = this.body.velocity.x;

        this.body.setVelocity(currentVelocityX / 3, 0).setAllowGravity(true).setGravityY(500);
    }
}