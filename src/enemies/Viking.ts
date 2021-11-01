import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class Viking extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 20;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private isShield: boolean = false;
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
            .setSize(28, 35)
            .setOffset(16, 28)
            .setVelocityX(-this.speed)
            .setMaxVelocityX(this.speed);
        
        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"viking-attack_2":{"hitboxes":[{"frame":"viking-attack_2","type":"rectangle","x":44,"y":45,"width":19,"height":19}]},"viking-attack_3":{"hitboxes":[{"frame":"viking-attack_3","type":"rectangle","x":45,"y":49,"width":9,"height":15}]},"viking-attack_4":{"hitboxes":[{"frame":"viking-attack_4","type":"rectangle","x":47,"y":49,"width":8,"height":14}]},"viking-attack_7":{"hitboxes":[{"frame":"viking-attack_7","type":"rectangle","x":36,"y":35,"width":28,"height":2}]},"viking-attack_8":{"hitboxes":[{"frame":"viking-attack_8","type":"rectangle","x":48,"y":32,"width":16,"height":2}]}}');

        this.walkplay = false;
        this.walkk = this.scene.sound.add('thingStep', { volume: 0.5 });
        this.anims.play('viking-run');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox = this.scene.fireballs.get(true, element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setVisible(true).setDepth(102).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0); // .setActive(true);
                        hitbox.enemyState = { damage: 10 };

                        if (element.type === 'rectangle')
                        {
                            hitbox.body.setSize(element.width, element.height).setEnable(true);

                            if (this.flipX)
                            {
                                hitbox.body.reset(this.getTopRight().x - element.x - element.width, this.y + element.y);
                            }
                            else
                            {
                                hitbox.body.reset(this.x + element.x, this.y + element.y);
                            }
                        }

                        if (element.type === 'circle')
                        {
                            hitbox.body.setCircle(6);
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
            else if (this.hitbox)
            {
                this.destroyHitbox();
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.isAttacking = false;
            this.isShield = false;
        });
    }

    private playSound ()
    {
        this.anims.play('viking-idle');

        if (this.scene.cameras.main.worldView.contains(this.x, this.y))
        {
            this.walkk.play();
        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && this.body.blocked.down && !this.isDead)
        {
            const { blocked, velocity } = this.body;
            const { x, y } = this.scene.player;

            const distance = Phaser.Math.Distance.Between(x, y, this.x, this.y);

            if (distance <= 78 && !this.isAttacking && !this.isShield)
            {
                this.anims.play('viking-attack', true);

                this.isAttacking = true;
            }
            
            if (distance > 78 && !this.isAttacking && !this.isShield)
            {
                this.anims.play('viking-run', true);
            }

            if (this.isAttacking)
            {
                (this.scene.player.x - this.x) > 0 ? this.setFlipX(false) : this.setFlipX(true);

                this.body.setVelocityX(0);
            }
            else if (!this.isAttacking && velocity.x === 0)
            {
                const speed = (this.scene.player.x - this.x) > 0 ? this.speed : -this.speed;

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

    public looseLife (damage: number): void
    {
        if (this.isHit)
        {
            return;
        }

        // if (Phaser.Math.Between(1, 99) > 80)
        // {
        //     this.isShield = true;

        //     this.anims.play('viking-shield');
        //     console.log('SHIELD')

        //     return;
        // }

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
                to: this.body.top -32
            },
            alpha: 0,
            onComplete: () => damageText.destroy()
        });

        if (this.isAttacking === false)
        {
            this.isAttacking = true;
        }

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

    public kill (): void
    {
        if (this.isDead) return;

        this.isDead = true;

        this.body.stop();

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

        this.anims.play('viking-death', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.destroy();
        });
    }

    private destroyHitbox (): void
    {
        this.hitbox?.forEach(h =>
        {
            h.explode();

            h.body.setEnable(false);
        });
    }
}
