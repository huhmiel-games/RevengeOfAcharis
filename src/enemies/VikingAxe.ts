import { EWeaponType } from '../constant/config';
import GameScene from '../scenes/GameScene';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class VikingAxe
 * @extends {Enemy}
 */
export default class VikingAxe extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 30;
    public walkSfx: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 5),
        };

        this.setOrigin(0, 0);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(5, 29)
            .setOffset(58, 12)
            .setVelocityX(-this.speed)
            .setMaxVelocityX(this.speed)
            .reset(x, y);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"viking-axe-attack2_4":{"hitboxes":[{"frame":"viking-axe-attack2_4","type":"rectangle","x":36,"y":13,"width":42,"height":3},{"frame":"viking-axe-attack2_4","type":"rectangle","x":78,"y":15,"width":11,"height":4},{"frame":"viking-axe-attack2_4","type":"circle","x":89,"y":17,"width":10,"height":10},{"frame":"viking-axe-attack2_4","type":"rectangle","x":79,"y":24,"width":11,"height":4},{"frame":"viking-axe-attack2_4","type":"rectangle","x":68,"y":27,"width":11,"height":3}]}}');

        this.walkSfx = this.scene.sound.add('townWalkSfx', { volume: 0.8 });
        this.anims.play('viking-axe-walk');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'viking-axe-walk_3' || frame === 'viking-axe-walk_9') this.playSound();

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox: Projectile = this.scene.projectiles.getFirst(false, true, element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setActive(true).setVisible(true).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0);
                        hitbox.body.setEnable(true);
                        hitbox.enemyState = { damage: 10 };

                        if (element.type === 'rectangle')
                        {
                            hitbox.body.setSize(element.width, element.height).setEnable(true);
                        }

                        if (element.type === 'circle')
                        {
                            hitbox.body.setCircle(element.width).setEnable(true);
                        }

                        if (this.flipX)
                        {
                            hitbox.body.reset(this.getTopRight().x - element.x - element.width, this.y + element.y);
                        }
                        else
                        {
                            hitbox.body.reset(this.x + element.x, this.y + element.y);
                        }

                        this.hitbox.push(hitbox);

                        if (!this.swordSfx.isPlaying)
                        {
                            this.swordSfx.play();
                        }
                    }
                });

            }
            else if (this.hitbox.length)
            {
                this.destroyHitbox();
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            if (this.isDead) return;

            const anim = this.anims.getName();

            if (anim === 'viking-axe-hit')
            {
                this.anims.play('viking-axe-attack2', true);

                if (!this.active || this.isDead) return;

                this.isHit = false;

                return;
            }

            this.isAttacking = false;

            const tileLeftBottom = this.scene.colliderLayer.getTileAtWorldXY(this.body.left - 16, this.body.bottom);

            const tileRightBottom = this.scene.colliderLayer.getTileAtWorldXY(this.body.right + 16, this.body.bottom);

            if (tileLeftBottom === null)
            {
                this.body.setVelocityX(this.speed);
            }

            if (tileRightBottom === null)
            {
                this.body.setVelocityX(-this.speed);
            }

            this.anims.play('viking-axe-walk', true);
        });
    }

    private playSound ()
    {
        const { x, y } = this.body.center;

        const volume = 1 / Phaser.Math.Distance.Between(this.scene.player.body.center.x, this.scene.player.body.center.y, this.body.center.x, this.body.center.y) * 20;

        if (this.scene.cameras.main.worldView.contains(x, y))
        {
            this.walkSfx.play({ volume });
        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.active && this.body.blocked.down && !this.isDead)
        {
            const { blocked, velocity } = this.body;
            const { x, y } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(x, y, this.body.center.x, this.body.center.y);

            if (distance <= 30 && !this.isAttacking)
            {
                this.anims.play('viking-axe-attack2', true);

                this.isAttacking = true;
            }

            if (distance > 30 && !this.isAttacking)
            {
                this.anims.play('viking-axe-walk', true);
            }

            if (this.isAttacking)
            {
                (x - this.body.center.x) > 0 ? this.setFlipX(false) : this.setFlipX(true);

                this.body.setVelocityX(0);
            }
            else if (!this.isAttacking && velocity.x === 0)
            {
                const speed = (x - this.body.center.x) > 0 ? this.speed : -this.speed;

                this.body.setVelocityX(speed);
            }

            if (blocked.left && !this.isAttacking)
            {
                this.body.setVelocityX(this.speed);
            }

            if (blocked.right && !this.isAttacking)
            {
                this.body.setVelocityX(-this.speed);
            }

            if (velocity.x < 0 && !this.flipX)
            {
                this.setFlipX(true);
            }
            else if (velocity.x > 0 && this.flipX)
            {
                this.setFlipX(false);
            }
        }
    }

    public looseLife (damage: number, weaponType: EWeaponType): void
    {
        if (this.isHit)
        {
            return;
        }

        if (!this.isAttacking)
        {
            this.anims.play('viking-axe-hit');
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
            // console.log(error);
        }

        this.enemyState.life -= damage;

        this.scene.showEnemyDamage(this, damage);

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
            }

            if (x < this.body.center.x)
            {
                this.body.setVelocityX(-this.speed);
            }
        }

        if (this.enemyState.life <= 0)
        {
            this.destroyHitbox();

            this.scene.playSfx('oldmanDoubtSfx', { volume: 1,  rate: 0.7 });
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
            delay: 220,
            callback: () =>
            {
                if (!this.active || this.isDead) return;

                this.isHit = false;
            }
        });
    }

    private destroyHitbox (): void
    {
        this.hitbox?.forEach(h =>
        {
            h.explode();
            h.setActive(false).setVisible(false);
            h.body.setEnable(false);
        });
    }
}
