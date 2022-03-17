import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';
import Projectile from './Projectile';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class DragonHead
 * @extends {Enemy}
 */
export default class DragonHead extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public distance: number;
    private isFiring: boolean = false;
    private flipTimestamp: number = 0;
    private attackTimestamp: number = 0;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 10),
        };

        this.flipX = config.flipX;

        this.setTexture('atlas')
            .setFrame('dragon-head_0')
            .setOrigin(0, 0)
            .setDepth(DEPTH.ENEMY - 1);

        this.body
            .setAllowGravity(true)
            .setGravityY(100)
            .setSize(31, 17)
            .setOffset(1, 0)
            .reset(x, y);

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'dragon-head_4')
            {
                this.fire();
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            if (this.isDead) return;

            const anim = this.anims.getName();

            if (anim === 'dragon-head')
            {
                this.anims.stop();
                this.setFrame('dragon-head_0');

                this.isAttacking = false;

                return;
            }
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.active && !this.isDead)
        {
            const { x, y } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(x, y, this.body.center.x, this.body.center.y);

            if (distance <= 150 && this.attackTimestamp > 1000)
            {
                this.attackTimestamp = 0;

                this.anims.play('dragon-head', true);

                this.isAttacking = true;
            }

            this.flipTimestamp += delta;

            this.attackTimestamp += delta;

            if (this.flipTimestamp > 5000 && !this.anims.isPlaying)
            {
                this.flipTimestamp = 0;

                this.flipX = !this.flipX;
            }
        }
    }

    private fire ()
    {
        if (this.isFiring)
        {
            return;
        }

        const ball: Projectile = this.scene.dragonHeadBalls.getFirstDead(true, this.body.center.x, this.body.center.y + 4, 'fireBall', undefined, true);

        if (ball)
        {
            ball.setScale(0.3).setActive(true).setVisible(true).setDepth(DEPTH.ENEMY - 1).setName('fireball').setAlpha(1);
            ball.anims.play('fireball', true);

            ball.enemyState = { damage: 5 };
            ball.body.setEnable(true).setCircle(6);

            this.scene.tweens.add({
                targets: ball,
                scale: 1,
                duration: 300
            });

            if (this.flipX)
            {
                ball.body.setVelocity(100, 0);

                ball.setAngle(90);
            }
            else
            {
                ball.body.setVelocity(-100, 0);

                ball.setAngle(-90);
            }

            this.scene.playSfx('wizardFire', { volume: 1, rate: 1.5 });

            this.scene.time.addEvent({
                delay: 3500,
                callback: () =>
                {
                    ball.body.setEnable(false);
                    ball.setActive(false).setVisible(false);
                },
            });
        }
    }
}

