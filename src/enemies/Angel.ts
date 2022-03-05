import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class Angel extends Enemy
{
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 10),
            directionX: -10,
            directionY: 0,
        };

        this.name = config.name;

        this.body
            .setAllowGravity(false)
            .setSize(8, 45).setOffset(58, 48);

        this.flipX = true;

        this.anims.play('angel-idle', true);

        this.on(Phaser.Animations.Events.ANIMATION_REPEAT, () =>
        {
            const { center } = this.body;

            if (this.scene.cameras.main.worldView.contains(center.x, center.y))
            {
                this.scene.playSfx('angelWing', { volume: 0.3 });
                // this.scene.sound.play('angelWing', { volume: 0.3 });
            }
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && !this.scene.physics.world.isPaused)
        {
            if (!this.isAttacking)
            {
                this.body.setVelocityY(this.enemyState.directionY);

                if (this.enemyState.directionY > 0)
                {
                    this.enemyState.directionY += 0.2;
                }
                else
                {
                    this.enemyState.directionY -= 0.2;
                }

                if (this.body.blocked.down || this.enemyState.directionY > 32)
                {
                    this.enemyState.directionY = -0.1;
                }
                else if (this.body.blocked.up || this.enemyState.directionY < -32)
                {
                    this.enemyState.directionY = 0.2;
                }
            }
            else
            {
                const { center } = this.scene.player.body;

                const dx = center.x - this.body.center.x;
                const dy = center.y - this.body.center.y;

                this.body.setVelocity(dx * 2, dy * 2);
            }

            // flip the sprite
            if (this.body.velocity.x > 0)
            {
                this.flipX = false;
            }
            else
            {
                this.flipX = true;
            }
        }
    }
}
