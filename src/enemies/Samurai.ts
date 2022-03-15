import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class Samurai extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 40;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private guardCount: number = 0;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 10),
        };

        this.setTexture('atlas').setFrame('samurai-idle_0');

        this.setOrigin(0, 0);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(10, 46)
            .setOffset(95, 75)
            .setVelocityX(-this.speed)
            .setMaxVelocityX(this.speed)
            .reset(x, y);

        this.hitboxData = JSON.parse('{"samurai-attack1_4":{"hitboxes":[{"frame":"samurai-attack1_4","type":"circle","x":147,"y":68,"width":39,"height":39},{"frame":"samurai-attack1_4","type":"rectangle","x":96,"y":59,"width":65,"height":14}]},"samurai-attack1_5":{"hitboxes":[{"frame":"samurai-attack1_5","type":"rectangle","x":93,"y":57,"width":64,"height":6}]},"samurai-attack2_4":{"hitboxes":[{"frame":"samurai-attack2_4","type":"rectangle","x":176,"y":81,"width":12,"height":24},{"frame":"samurai-attack2_4","type":"rectangle","x":109,"y":99,"width":65,"height":11}]},"samurai-attack2_5":{"hitboxes":[{"frame":"samurai-attack2_5","type":"rectangle","x":128,"y":110,"width":22,"height":5},{"frame":"samurai-attack2_5","type":"rectangle","x":91,"y":91,"width":29,"height":13},{"frame":"samurai-attack2_5","type":"rectangle","x":110,"y":105,"width":18,"height":8}]}}');

        this.anims.play('samurai-run');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            const anim = this.anims.getName();

            if (anim === 'samurai-fall' && this.body.blocked.down)
            {
                this.anims.play('samurai-run', true);
                this.guardCount = 0;
            }

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox: Projectile = this.scene.projectiles.getFirst(false, true, element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setActive(true).setVisible(true).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0);hitbox.body.setEnable(true);
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
                            hitbox.body.reset(this.getTopRight().x - element.x - element.width, this.y + element.y - 10);
                        }
                        else
                        {
                            hitbox.body.reset(this.x + element.x - element.width, this.y + element.y - 10);
                        }

                        this.hitbox.push(hitbox);

                        this.scene.playSfx('bullet', { volume: 0.7, rate: 0.8 });
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

            const { down } = this.body.blocked;

            const anim = this.anims.getName();

            if (anim === 'samurai-hurt')
            {
                this.anims.play('samurai-attack2', true);

                return;
            }

            this.isAttacking = false;

            const tileLeftBottom = this.scene.colliderLayer.getTileAtWorldXY(this.body.left - 16, this.body.bottom);

            const tileRightBottom = this.scene.colliderLayer.getTileAtWorldXY(this.body.right + 16, this.body.bottom);

            if (tileLeftBottom === null && this.guardCount < 5 && down)
            {
                this.body.setVelocityX(this.speed);
                this.guardCount += 1;
            }

            if (tileRightBottom === null && this.guardCount < 5 && down)
            {
                this.body.setVelocityX(-this.speed);
                this.guardCount += 1;
            }

            if (down) this.anims.play('samurai-run', true);
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.active && this.body.blocked.down && !this.isDead)
        {
            const { blocked, velocity } = this.body;
            const { x, y } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(x, y, this.body.center.x, this.body.center.y);

            if (distance <= 50 && !this.isAttacking && blocked.down)
            {
                this.anims.play('samurai-attack1', true);

                this.isAttacking = true;
            }

            if (distance > 50 && !this.isAttacking && blocked.down)
            {
                this.anims.play('samurai-run', true);
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

        if (!this.body.blocked.down && this.active && !this.isDead)
        {
            this.anims.play('samurai-fall', true);
            this.guardCount = 0;
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
            this.anims.play('samurai-hurt');
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

        this.destroyHitbox();

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('samurai-death', true);

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

    private destroyHitbox (): void
    {
        this.hitbox?.forEach(h =>
        {
            h.explode();
            h.setActive(false).setVisible(false);
            h.body.setEnable(false);
        });
    }

    public playSfxDeath ()
    {
        this.scene.playSfx(`oldmanSadSfx`, { volume: 2, rate: 0.5 });
    }
}
