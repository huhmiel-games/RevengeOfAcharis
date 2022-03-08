import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class Thing extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 10;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 3),
        };

        this.body
            .setAllowGravity()
            .setGravityY(500)
            .setSize(16, 32)
            .setOffset(8, 12)
            .setVelocityX(-this.speed)
            .setMaxVelocityX(this.speed);

        this.anims.play('thing');

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.playSound, this);
    }

    private playSound ()
    {
        this.anims.play('thing');

        if (this.scene.cameras.main.worldView.contains(this.x, this.y))
        {
            this.scene.playSfx('thingStep', { volume: 0.5 });
        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && this.body.blocked.down)
        {
            const { blocked, velocity } = this.body;
            const { x, y } = this.scene.player;

            const distance = Phaser.Math.Distance.Between(x, y, this.x, this.y);

            if (velocity.x < 0)
            {
                const thingPositionInTileX = Math.floor(this.body.x / 16);
                const thingPositionInTileY = Math.floor(this.body.y / 16);

                const tileThingLeftBottom = this.scene.colliderLayer.getTileAt(thingPositionInTileX, thingPositionInTileY + 2);

                if (tileThingLeftBottom === null)
                {
                    this.isAttacking = false;

                    this.body.setVelocityX(this.speed);
                }
            }
            else if (velocity.x > 0)
            {
                const thingPositionInTileX = Math.floor(this.body.x / 16);
                const thingPositionInTileY = Math.floor(this.body.y / 16);

                const tileThingRightBottom = this.scene.colliderLayer.getTileAt(thingPositionInTileX + 1, thingPositionInTileY + 2);

                if (tileThingRightBottom === null)
                {
                    this.isAttacking = false;

                    this.body.setVelocityX(-this.speed);
                }
            }

            if (this.isAttacking)
            {
                const dx = this.scene.player.x - this.x;

                this.body.setVelocityX(dx);
            }
            
            if (blocked.left)
            {
                this.isAttacking = false;

                this.body.setVelocityX(this.speed);
            }

            if (blocked.right)
            {
                this.isAttacking = false;

                this.body.setVelocityX(-this.speed);
            }

            if (velocity.x < 0 && this.flipX)
            {
                this.setFlipX(false);
            }
            else if (velocity.x > 0 && !this.flipX)
            {
                this.setFlipX(true);
            }
        }
    }
}
