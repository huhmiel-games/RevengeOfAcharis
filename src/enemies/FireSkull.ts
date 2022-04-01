import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class FireSkull
 * @extends {Enemy}
 */
export default class FireSkull extends Enemy
{
    public enemyState: { life: any; damage: any; directionX: number; directionY: number; hited: boolean; giveLife: number; };
    public skullFX: Phaser.Sound.BaseSound;
    public speed: number = 10;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            directionX: -10,
            directionY: 0,
            hited: false,
            giveLife: Math.round(config.life / 10),
        };

        this.body.setCollideWorldBounds(true)
            .setAllowGravity(false)
            .setCircle(16, 10, 20)
            .setVelocity(this.speed, this.speed)
            .velocity.normalize().scale(15);

        this.skullFX = this.scene.sound.add('skeletonStep', { volume: 1, rate: 2 });

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.playSound, this);

        this.anims.play('fire-skull', true);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && !this.scene.physics.world.isPaused)
        {
            const { blocked, velocity } = this.body;

            if (!this.isAttacking)
            {
                // turn back if blocked
                if (blocked.left)
                {
                    this.body.setVelocityX(this.speed);
                }

                if (blocked.right)
                {
                    this.body.setVelocityX(-this.speed);
                }

                if (blocked.down)
                {
                    this.body.setVelocityY(-this.speed);
                }

                if (blocked.up)
                {
                    this.body.setVelocityY(this.speed);
                }
            }
            else
            {
                const dx = this.scene.player.body.center.x - this.body.center.x;
                const dy = this.scene.player.body.center.y - this.body.center.y;

                this.anims.timeScale = 2;

                this.body.setVelocity(dx * 2, dy * 2);
            }

            if (!blocked.none)
            {
                this.anims.timeScale = 1;
                this.isAttacking = false;
                this.body.velocity.normalize().scale(15);
            }


            // flip the sprite
            if (velocity.x > 0)
            {
                this.flipX = true;
            }
            else
            {
                this.flipX = false;
            }
        }
    }

    public playSound ()
    {
        const frame = this.anims.getFrameName();

        if (frame !== 'fire-skull1' && frame !== 'fire-skull5')
        {
            return;
        }

        if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) <= 150)
        {
            if (!this.skullFX.isPlaying)
            {
                this.skullFX.play();
            }
        }
    }

    public playSfxDeath ()
    {
        this.scene.playSfx(`skeletonDeath`, { volume: 0.6, rate: 0.6 });
    }
}
