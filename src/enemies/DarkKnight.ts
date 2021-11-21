import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import Arrow from '../player/Arrow';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class DarkKnight extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 20;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private isWalking: boolean;

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
            .setSize(10, 47)
            .setOffset(26, 14)
            .setVelocityX(-this.speed)
            .setMaxVelocityX(this.speed);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"dark-knight-attack_4":{"hitboxes":[{"frame":"dark-knight-attack_4","type":"rectangle","x":1,"y":45,"width":18,"height":13},{"frame":"dark-knight-attack_4","type":"rectangle","x":5,"y":35,"width":19,"height":39},{"frame":"dark-knight-attack_4","type":"rectangle","x":14,"y":25,"width":5,"height":10}]},"dark-knight-attack_5":{"hitboxes":[{"frame":"dark-knight-attack_5","type":"rectangle","x":2,"y":49,"width":20,"height":24},{"frame":"dark-knight-attack_5","type":"rectangle","x":8,"y":36,"width":7,"height":23}]},"dark-knight-attack_6":{"hitboxes":[]}}');

        this.walkplay = false;
        this.walkk = this.scene.sound.add('skeletonStep', { volume: 0.5 });
        this.anims.play('dark-knight-idle');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'dark-knight-walk_1' || frame === 'dark-knight-walk_5') this.playSound();

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

            if (anim === 'dark-knight-attack')
            {
                this.isAttacking = false;

                this.body.setSize(10, 47).setOffset(23, 17);

                return;
            }
        });
    }

    private playSound ()
    {
        const { x, y } = this.body.center;

        const volume = 1 / Phaser.Math.Distance.Between(this.scene.player.body.center.x, this.scene.player.body.center.y, this.body.center.x, this.body.center.y) * 20;

        if (this.scene.cameras.main.worldView.contains(x, y))
        {
            this.walkk.play({ volume, rate: 0.5 });
        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.active && this.body.blocked.down && !this.isDead)
        {
            const { x, y } = this.scene.player.body.center;
            const { center } = this.body;

            const distance = Phaser.Math.Distance.Between(x, y, center.x, center.y);

            if (distance <= 33 && !this.isAttacking)
            {
                this.body.setVelocityX(0).setSize(10, 46).setOffset(32, 25);

                this.anims.play('dark-knight-attack', true);

                this.isWalking = false;

                this.isAttacking = true;
            }
            else if (distance <= 155 && !this.isAttacking)
            {
                this.anims.play('dark-knight-walk', true);

                const speed = (x - center.x) > 0 ? this.speed : -this.speed;

                this.isWalking = true;

                this.body.setVelocityX(speed);
            }
            else if (distance > 155 && !this.isAttacking)
            {
                this.body.setVelocityX(0).setSize(10, 47).setOffset(26, 14);

                this.isWalking = false;

                this.anims.play('dark-knight-idle', true);
            }

            if (x - center.x <= -10 && this.flipX)
            {
                this.setFlipX(false);

                if (this.isWalking) this.body.setOffset(26, 14);
            }
            else if (x - center.x > 10 && !this.flipX)
            {
                this.setFlipX(true);

                if (this.isWalking) this.body.setOffset(31, 14);
            }
            else if (x - center.x >= -10 && x - center.x < 10)
            {
                this.body.setVelocityX(0).setSize(10, 47).setOffset(26, 14);

                this.isWalking = false;

                this.anims.play('dark-knight-idle', true);
            }
        }
    }

    public looseLife (damage: number, weaponType: string, weapon?: Arrow): void
    {
        if (this.isHit)
        {
            return;
        }

        this.isHit = true;
        
        this.setTintFill(0xDDDDDD);

        try
        {
            this.scene.sound.play(`${this.name}Hit`);
        }
        catch (error)
        {
            console.log(error);
        }
        
        const specialDamage = weaponType === 'arrow' ? Math.round(damage / 2) : damage;

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
                to: this.body.top -32
            },
            alpha: 0,
            onComplete: () => damageText.destroy()
        });

        if (this.enemyState.life <= 0)
        {
            this.kill();
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
                if (!this.active) return;
                this.isHit = false;
            },
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
