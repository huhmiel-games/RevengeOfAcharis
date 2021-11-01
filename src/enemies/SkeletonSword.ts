import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class SkeletonSword extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 20;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private reborn: boolean = false;
    private rebornMomentum: boolean = false;

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
            .setSize(8, 31)
            .setOffset(46, 20)
            .setVelocityX(-this.speed);
            //.setMaxVelocityX(this.speed);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"skeleton-sword-attack1_3":{"hitboxes":[{"frame":"skeleton-sword-attack1_3","type":"rectangle","x":52,"y":30,"width":11,"height":2}]},"skeleton-sword-attack1_4":{"hitboxes":[{"frame":"skeleton-sword-attack1_4","type":"rectangle","x":67,"y":28,"width":22,"height":3}]},"skeleton-sword-attack1_5":{"hitboxes":[{"frame":"skeleton-sword-attack1_5","type":"rectangle","x":65,"y":31,"width":19,"height":2}]},"skeleton-sword-attack2_4":{"hitboxes":[{"frame":"skeleton-sword-attack2_4","type":"rectangle","x":78,"y":27,"width":7,"height":8},{"frame":"skeleton-sword-attack2_4","type":"rectangle","x":66,"y":25,"width":14,"height":2},{"frame":"skeleton-sword-attack2_4","type":"rectangle","x":66,"y":35,"width":13,"height":2}]}}');

        this.walkplay = false;
        this.walkk = this.scene.sound.add('skeletonStep', { volume: 0.5 });
        this.anims.play('skeleton-sword-walk');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'skeleton-sword-walk_2' || frame === 'skeleton-sword-walk_5') this.playSound();

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox: Projectile = this.scene.projectiles.getFirst(false, true, element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setActive(true).setVisible(true).setDepth(102).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0);
                        hitbox.enemyState = { damage: 8 };

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

            if (anim === 'skeleton-sword-hurt')
            {
                this.anims.play('skeleton-sword-attack1', true);

                return;
            }

            if (anim === 'skeleton-sword-attack2' && !this.reborn)
            {
                this.anims.play('skeleton-sword-ready', true);

                return;
            }

            if (anim === 'skeleton-sword-ready')
            {
                this.anims.play('skeleton-sword-attack1', true);

                return;
            }

            if (anim === 'skeleton-sword-dead_near')
            {
                this.anims.play('skeleton-sword-reborn', true);

                return;
            }

            if (anim === 'skeleton-sword-reborn')
            {
                this.body.setEnable(true);

                this.rebornMomentum = false;

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

            this.anims.play('skeleton-sword-walk', true);
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

        if (this.active && this.body.blocked.down && !this.isDead && !this.rebornMomentum)
        {
            const { body } = this;
            const { blocked, velocity, bottom } = body;
            const { x, y } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(x, y, body.center.x, body.center.y);

            if (distance <= 30 && !this.isAttacking)
            {
                this.anims.play('skeleton-sword-attack2', true);

                this.isAttacking = true;
            }

            if (distance > 30 && !this.isAttacking)
            {
                !this.reborn ? this.anims.play('skeleton-sword-walk', true) : this.anims.play('skeleton-sword-run', true);
            }

            if (this.isAttacking)
            {
                (x - body.center.x) > 0 ? this.setFlipX(false) : this.setFlipX(true);

                this.body.setVelocityX(0);
            }
            else if (!this.isAttacking && velocity.x === 0 && !this.reborn)
            {
                const speed = (x - body.center.x) > 0 ? this.speed : -this.speed;

                this.body.setVelocityX(speed * (this.reborn ? 4 : 1));
            }
            else if (this.reborn && !this.isAttacking && Math.round(bottom) === this.scene.player.body.bottom)
            {
                const speed = (x - this.body.center.x) > 0 ? this.speed : -this.speed;

                this.body.setVelocityX(speed * (this.reborn ? 4 : 1));
            }

            if (blocked.left && !this.isAttacking)
            {
                this.body.setVelocityX(this.speed * (this.reborn ? 4 : 1));
            }

            if (blocked.right && !this.isAttacking)
            {
                this.body.setVelocityX(-this.speed * (this.reborn ? 4 : 1));
            }

            if (this.reborn && this.body.enable && !this.isAttacking && this.body.velocity.x === 0 && bottom !== this.scene.player.body.bottom)
            {
                const speed = (x - this.body.center.x) > 0 ? this.speed : -this.speed;

                this.body.setVelocityX(speed * 4);

                this.anims.play('skeleton-sword-run', true);
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
            this.anims.play('skeleton-sword-hurt', true);
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

        if (this.enemyState.life <= 0 && this.reborn)
        {
            this.kill();

            return;
        }

        if (this.enemyState.life <= 0 && !this.reborn)
        {
            this.reborn = true;
            this.rebornMomentum = true;

            this.enemyState.life = 15;

            this.isAttacking = false;

            this.body.setEnable(false);

            this.destroyHitbox();

            this.anims.play('skeleton-sword-dead_near', true);
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

        this.scene.giveLife = this.scene.physics.add.sprite(this.body.center.x, this.body.center.y, 'heart').setDataEnabled();
        this.scene.giveLife.setDepth(105);
        this.scene.giveLife.data.set('health', this.enemyState.giveLife);
        this.scene.giveLife.body = this.scene.giveLife.body as Phaser.Physics.Arcade.Body;
        this.scene.giveLife.body.setSize(23, 21);
        this.scene.giveLife.anims.play('heart');
        this.scene.giveLifeGroup.push(this.scene.giveLife);

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('skeleton-sword-dead_far', true);

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

    public playSfxDeath ()
    {
        try
        {
            this.scene.sound.play(`skeletonDeath`, { volume: 1, rate: 1 });
        }
        catch (error)
        {
            console.log(error);
        }
    }
}
