import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import Arrow from '../player/items/Arrow';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class Worm extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 20;
    private lastSpeed: number = 20;
    public hitbox: Projectile[] = [];
    private isFiring: boolean = false;


    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 10),
        };

        this.setOrigin(0, 0);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(21, 28)
            .setOffset(43, 30)
            .setVelocityX(this.speed)
            .setMaxVelocityX(this.speed);

        this.anims.play('worm-walk');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'worm-walk_4' || frame === 'worm-walk_8') this.playSound();

            if (frame.startsWith('worm-attack_'))
            {
                this.isAttacking = true;
            }

            if (frame === 'worm-attack_10') this.fire();

        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            if (this.isDead) return;

            const anim = this.anims.getName();

            if (anim === 'worm-hurt')
            {
                this.setLastSpeed();

                this.body.setVelocityX(0);

                this.anims.play('worm-attack', true);

                return;
            }

            if (anim === 'worm-walk')
            {
                this.setLastSpeed();

                this.body.setVelocityX(0);

                this.anims.play('worm-attack', true);

                return;
            }

            this.isAttacking = false;

            const tileLeftBottom = this.scene.colliderLayer.getTileAtWorldXY(this.body.left - 16, this.body.bottom);

            const tileRightBottom = this.scene.colliderLayer.getTileAtWorldXY(this.body.right + 16, this.body.bottom);

            if (tileLeftBottom === null)
            {
                this.body.setVelocityX(this.speed);
            }
            else if (tileRightBottom === null)
            {
                this.body.setVelocityX(-this.speed);
            }
            else
            {
                this.body.setVelocityX(this.lastSpeed);
            }

            this.anims.play('worm-walk', true);
        });
    }

    private setLastSpeed ()
    {
        if (this.body.velocity.x !== 0)
        {
            this.lastSpeed = this.body.velocity.x;
        }
    }

    private playSound ()
    {
        const { x, y } = this.body.center;

        const volume = 1 / Phaser.Math.Distance.Between(this.scene.player.body.center.x, this.scene.player.body.center.y, this.body.center.x, this.body.center.y) * 30;

        if (this.scene.cameras.main.worldView.contains(x, y))
        {
            this.scene.playSfx('thingStep', { volume: 0.8, rate: 0.6 });
        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.active && this.body.blocked.down && !this.isDead)
        {
            const { blocked, velocity } = this.body;

            if (this.isAttacking)
            {
                this.setLastSpeed();

                this.body.setVelocityX(0);
            }
            else if (!this.isAttacking && velocity.x === 0)
            {
                this.body.setVelocityX(this.lastSpeed);
            }

            if (blocked.left && !this.isAttacking)
            {
                this.body.setVelocityX(this.speed);

                this.setLastSpeed();
            }

            if (blocked.right && !this.isAttacking)
            {
                this.body.setVelocityX(-this.speed);

                this.setLastSpeed();
            }

            if (velocity.x > 0 && this.flipX)
            {
                this.setFlipX(false);

                this.body.setOffset(43, 30);
            }
            else if (velocity.x < 0 && !this.flipX)
            {
                this.setFlipX(true);

                this.body.setOffset(26, 30);
            }
        }
    }

    private fire ()
    {
        if (this.isFiring)
        {
            return;
        }

        const { x, y } = this.body.center;

        if (!this.scene.cameras.main.worldView.contains(x, y)) return;

        const ball: Projectile = this.scene.dragonHeadBalls.getFirstDead(true, this.body.center.x, this.body.center.y - 5, 'fireBall', undefined, true);

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
                ball.setAngle(-90);

                ball.body.setVelocity(-100, 0);
            }
            else
            {
                ball.setAngle(90);

                ball.body.setVelocity(100, 0);
            }

            this.scene.playSfx('wizardFire', { volume: 1, rate: 0.7 });

            this.scene.time.addEvent({
                delay: 3500,
                callback: () =>
                {
                    ball.body?.setEnable(false);
                    ball.setActive(false).setVisible(false);
                },
            });
        }
    }

    public looseLife (damage: number, weaponType: EWeaponType, weapon: Arrow | undefined): void
    {
        if (this.isHit)
        {
            return;
        }

        if (!this.isAttacking)
        {
            this.setLastSpeed();

            this.anims.play('worm-hurt');
        }
        else
        {
            this.setTintFill(0xDDDDDD);
        }

        this.isHit = true;

        try
        {
            this.scene.sound.play('skeletonHit');
        }
        catch (error)
        {
            console.log(error);
        }

        if (weapon === undefined || (weapon && !weapon.isDeflecting))
        {
            this.enemyState.life -= damage;

            this.scene.showEnemyDamage(this, damage);
        }

        if (this.isAttacking === false && weaponType !== 'arrow')
        {
            this.isAttacking = true;
        }

        if (weaponType === 'arrow')
        {
            const { x, y } = this.scene.player.body.center;

            if (x > this.body.center.x)
            {
                this.body.setVelocityX(this.speed);

                this.setLastSpeed();
            }

            if (x < this.body.center.x)
            {
                this.body.setVelocityX(-this.speed);

                this.setLastSpeed();
            }
        }

        if (this.enemyState.life <= 0)
        {
            this.kill();

            return;
        }

        this.scene?.time.addEvent({
            delay: 50,
            callback: () =>
            {
                if (!this.active) return;
                this.clearTint();
            },
        });


        this.scene?.time.addEvent({
            delay: 820,
            callback: () =>
            {
                if (!this.active || this.isDead) return;

                this.isHit = false;
            }
        });
    }

    public kill (): void
    {
        if (this.isDead) return;

        this.isDead = true;

        this.body.stop().setEnable(false);

        this.clearTint();

        this.playSfxDeath();

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('worm-death', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.burn();

            this.giveLife(x, y);

            this.scene.tweens.add({
                duration: 250,
                targets: this,
                alpha: 0,
                onComplete: () => this.destroy()
            });
        });
    }
}
