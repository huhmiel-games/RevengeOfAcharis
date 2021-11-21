import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class SkeletonFlail extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 20;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
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
            giveLife: Math.round(config.life / 3),
        };

        this.setOrigin(0, 0);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(16, 30)
            .setOffset(21, 18)
            .setVelocityX(-this.speed)
            .setMaxVelocityX(this.speed);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"skeleton-flail-attack_4":{"hitboxes":[{"frame":"skeleton-flail-attack_4","type":"circle","x":14,"y":9,"width":6,"height":6},{"frame":"skeleton-flail-attack_4","type":"rectangle","x":20,"y":9,"width":26,"height":5},{"frame":"skeleton-flail-attack_4","type":"rectangle","x":58,"y":23,"width":6,"height":4},{"frame":"skeleton-flail-attack_4","type":"rectangle","x":42,"y":31,"width":17,"height":3},{"frame":"skeleton-flail-attack_4","type":"rectangle","x":45,"y":16,"width":14,"height":3}]},"skeleton-flail-attack_8":{"hitboxes":[{"frame":"skeleton-flail-attack_8","type":"rectangle","x":55,"y":24,"width":8,"height":7},{"frame":"skeleton-flail-attack_8","type":"rectangle","x":46,"y":33,"width":12,"height":4},{"frame":"skeleton-flail-attack_8","type":"rectangle","x":23,"y":33,"width":24,"height":4},{"frame":"skeleton-flail-attack_8","type":"circle","x":3,"y":16,"width":6,"height":6}]},"skeleton-flail-attack_9":{"hitboxes":[{"frame":"skeleton-flail-attack_9","type":"circle","x":4,"y":15,"width":6,"height":6}]},"skeleton-flail-attack_5":{"hitboxes":[{"frame":"skeleton-flail-attack_5","type":"circle","x":15,"y":10,"width":6,"height":6}]}}');

        this.walkplay = false;
        this.walkk = this.scene.sound.add('skeletonStep', { volume: 0.5 });
        this.anims.play('skeleton-flail-walk');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'skeleton-flail-walk_3' || frame === 'skeleton-flail-walk_9') this.playSound();

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox: Projectile = this.scene.projectiles.getFirst(false, true, element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setActive(true).setVisible(true).setDepth(102).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0);
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

                        this.scene.projectileGroup.push(hitbox);
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

            if (anim === 'skeleton-flail-hurt')
            {
                this.anims.play('skeleton-flail-attack', true);

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

            this.anims.play('skeleton-flail-walk', true);
        });
    }

    private playSound ()
    {
        const { x, y } = this.body.center;

        const volume = 1 / Phaser.Math.Distance.Between(this.scene.player.body.center.x, this.scene.player.body.center.y, this.body.center.x, this.body.center.y) * 20;

        if (this.scene.cameras.main.worldView.contains(x, y))
        {
            this.walkk.play({ volume });
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
                this.anims.play('skeleton-flail-attack', true);

                this.isAttacking = true;
            }

            if (distance > 30 && !this.isAttacking)
            {
                this.anims.play('skeleton-flail-walk', true);
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

    public looseLife (damage: number, weaponType: string): void
    {
        if (this.isHit)
        {
            return;
        }

        if (!this.isAttacking)
        {
            this.anims.play('skeleton-flail-hurt');
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

        const damageText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.GALAXY, `-${damage}`, FONTS_SIZES.GALAXY, 1)
            .setTintFill(COLORS.RED)
            .setDropShadow(1, 1, 0xffffff)
            .setDepth(2000);

        this.scene.tweens.add({
            targets: damageText,
            duration: 1500,
            y: {
                from: this.body.top,
                to: this.body.top - 32
            },
            alpha: 0,
            onComplete: () => damageText.destroy()
        });

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
        // kill the enemy

        this.scene.player.addXp(this.xp);

        this.scene.giveLife = this.scene.physics.add.sprite(this.body.center.x, this.body.center.y, 'heart').setDataEnabled();
        this.scene.giveLife.setDepth(105);
        this.scene.giveLife.data.set('health', this.enemyState.giveLife);
        this.scene.giveLife.body = this.scene.giveLife.body as Phaser.Physics.Arcade.Body;
        this.scene.giveLife.body.setSize(23, 21);
        this.scene.giveLife.anims.play('heart');
        this.scene.giveLifeGroup.push(this.scene.giveLife);

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('skeleton-flail-death', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
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
            h.setActive(false);
            h.body.setEnable(false);
        });
    }
}
