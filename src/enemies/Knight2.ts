import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class Knight2 extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 80;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private moveTimestamp: number = 0;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 3),
        };

        this.setTexture('enemies2Atlas').setFrame('knight2-idle_0');

        this.setOrigin(0, 0);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(12, 38)
            .setOffset(63, 45);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"knight2-attack_4":{"hitboxes":[{"frame":"knight2-attack_4","type":"circle","x":81,"y":38,"width":37,"height":37},{"frame":"knight2-attack_4","type":"rectangle","x":43,"y":68,"width":56,"height":11}]}}');


        this.anims.play('knight2-idle');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

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

            if (anim === 'knight2-hurt')
            {
                this.body.setVelocityX(0);

                this.anims.play('knight2-attack', true);

                return;
            }

            const { center, blocked, velocity } = this.body;
            const { x: pX, y: pY } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(pX, pY, center.x, center.y);

            if (distance <= 52 && anim === 'knight2-idle' && blocked.down)
            {
                this.body.setVelocityX(0);

                this.anims.play('knight2-attack', true);

                this.moveTimestamp = 0;

                return;
            }

            if (anim === 'knight2-attack' && blocked.down)
            {
                this.anims.play('knight2-idle', true);

                this.isAttacking = false;

                this.moveTimestamp = 0;

                return;
            }

            if (this.moveTimestamp > 13000 && anim === 'knight2-run' && blocked.down)
            {
                this.moveTimestamp = 0;

                this.body.setVelocityX(0);

                this.anims.play('knight2-idle', true);

                return;
            }

            if (this.moveTimestamp > 10000 && velocity.x === 0 && !this.isAttacking && blocked.down)
            {
                this.speed = -this.speed;

                this.body.setVelocityX(this.speed);

                this.anims.play('knight2-run', true);

                return;
            }

            if (anim === 'knight2-run' && !this.isAttacking && velocity.x !== 0 && blocked.down)
            {
                this.anims.play('knight2-run', true);
            }

            // this.anims.play('knight2-idle', true);
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

        if (this.active && !this.isDead)
        {
            const { blocked, velocity, center } = this.body;
            const { x, y } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(x, y, this.body.center.x, this.body.center.y);

            this.moveTimestamp += delta;

            if (distance <= 52 && !this.isAttacking && blocked.down)
            {
                this.body.setVelocityX(0);

                this.moveTimestamp = 0;

                this.anims.play('knight2-attack', true);

                this.isAttacking = true;
            }

            if (distance > 52 && !this.isAttacking && velocity.x === 0 && blocked.down)
            {
                this.body.setVelocityX(0);

                this.anims.play('knight2-idle', true);
            }

            if (velocity.x !== 0 && (blocked.left || blocked.right) && blocked.down)
            {
                this.speed = -this.speed;

                this.body.setVelocityX(this.speed);
            }

            if (!blocked.down)
            {
                this.anims.play('knight2-fall', true);
            }

            if (blocked.down && this.anims.getName() === 'knight2-fall')
            {
                this.anims.play('knight2-idle', true);

                this.body.setVelocityX(0);

                this.moveTimestamp = 0;
            }

            if (velocity.x !== 0)
            {
                velocity.x > 0 ? this.setFlipX(false) : this.setFlipX(true);

                return;
            }

            x - center.x > 0 && blocked.down ? this.setFlipX(false) : this.setFlipX(true);
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
            this.anims.play('knight2-hurt');
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

        const specialDamage = weaponType === 'arrow' ? damage / 2 : damage;

        this.enemyState.life -= specialDamage;

        const damageText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.GALAXY, `-${specialDamage}`, FONTS_SIZES.GALAXY, 1)
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

        this.anims.play('knight2-death', true);

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
