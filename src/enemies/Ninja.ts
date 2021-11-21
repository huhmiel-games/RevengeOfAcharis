import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class Ninja extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 60;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private guardCount: number = 0;
    private isJumping: boolean = false;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 3),
        };

        this.setTexture('enemies2Atlas').setFrame('ninja-idle_0');

        this.setOrigin(0, 0);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(18, 50)
            .setOffset(96, 78)
            .setVelocityX(-this.speed)
            .setMaxVelocityX(this.speed)
            .reset(x, y);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"ninja-attack1_2":{"hitboxes":[{"frame":"ninja-attack1_2","type":"circle","x":123,"y":70,"width":54,"height":54},{"frame":"ninja-attack1_2","type":"rectangle","x":108,"y":73,"width":19,"height":12}]},"ninja-attack2_2":{"hitboxes":[{"frame":"ninja-attack2_2","type":"rectangle","x":142,"y":59,"width":33,"height":60},{"frame":"ninja-attack2_2","type":"rectangle","x":104,"y":52,"width":63,"height":6},{"frame":"ninja-attack2_2","type":"rectangle","x":122,"y":46,"width":29,"height":6},{"frame":"ninja-attack2_2","type":"rectangle","x":176,"y":70,"width":6,"height":38}]}}');

        this.walkplay = false;
        this.walkk = this.scene.sound.add('skeletonStep', { volume: 0.5 });
        this.anims.play('ninja-run');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            const anim = this.anims.getName();

            if (anim === 'ninja-fall' && this.body.blocked.down)
            {
                this.anims.play('ninja-run', true);
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
                            hitbox.body.reset(this.getTopRight().x - element.x - element.width, this.y + element.y - 10);
                        }
                        else
                        {
                            hitbox.body.reset(this.x + element.x - element.width, this.y + element.y - 10);
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

            const { down } = this.body.blocked;

            const anim = this.anims.getName();

            if (anim === 'ninja-hurt')
            {
                this.anims.play('ninja-attack2', true);

                return;
            }

            if (anim === 'ninja-run')
            {
                this.jump();

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

            if (down) this.anims.play('ninja-run', true);
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

            if (distance <= 50 && !this.isAttacking && blocked.down)
            {
                this.anims.play('ninja-attack1', true);

                this.isAttacking = true;
            }

            if (distance > 50 && !this.isAttacking && blocked.down)
            {
                this.anims.play('ninja-run', true);
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

        if (!this.body.blocked.down)
        {
            this.anims.play('ninja-fall', true);
            this.guardCount = 0;
        }
    }

    private jump ()
    {
        if (this.isJumping) return;

        this.isJumping = true;

        this.body.setVelocityY(-400);

        this.anims.play('ninja-jump', true);

        this.scene.time.addEvent({
            delay: 250,
            callback: this.fall,
            callbackScope: this
        });
    }

    private fall ()
    {
        this.body.setVelocityY(0);

        this.anims.play('ninja-fall', true);

        this.isJumping = false;
    }

    public looseLife (damage: number, weaponType: string): void
    {
        if (this.isHit)
        {
            return;
        }

        if (!this.isAttacking)
        {
            this.anims.play('ninja-hurt');
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

        this.anims.play('ninja-death', true);

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
