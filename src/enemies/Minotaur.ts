import { EWeaponType } from '../constant/config';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class Minotaur
 * @extends {Enemy}
 */
export default class Minotaur extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 10;
    public walkplay: boolean;
    public walkSfx: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private isGesture: boolean = false;

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
            .setSize(32, 64)
            .setOffset(35, 32)
            .setMaxVelocityX(this.speed);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.invulnerability = 'arrow';

        this.hitboxData = JSON.parse('{"minotaur-attack_6":{"hitboxes":[{"frame":"minotaur-attack_6","type":"circle","x":7,"y":15,"width":6,"height":6}]},"minotaur-attack_7":{"hitboxes":[{"frame":"minotaur-attack_7","type":"circle","x":1,"y":31,"width":6,"height":6}]},"minotaur-attack_8":{"hitboxes":[{"frame":"minotaur-attack_8","type":"circle","x":2,"y":42,"width":6,"height":6}]},"minotaur-attack_9":{"hitboxes":[{"frame":"minotaur-attack_9","type":"circle","x":4,"y":43,"width":5,"height":5}]}}');

        this.walkplay = false;

        this.walkSfx = this.scene.sound.add('thingStep', { volume: 0.5 });

        this.anims.play('minotaur-idle');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox = this.scene.projectiles.get(element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setVisible(true)
                            .setSize(element.width * 2, element.height * 2)
                            .setOrigin(0, 0)
                            .setName('fireball').setAlpha(0);
                        hitbox.enemyState = { damage: 20 };

                        if (element.type === 'rectangle')
                        {
                            hitbox.body.setSize(element.width * 2, element.height * 2)
                                .setEnable(true)
                                .reset(this.x + (element.x * 2), this.y + (element.y * 2));
                        }

                        if (element.type === 'circle')
                        {
                            hitbox.body.setCircle(6).setEnable(true);

                            if (this.flipX)
                            {
                                hitbox.body.reset(this.getTopRight().x - (element.x * 2) - element.width, this.getTopRight().y + (element.y * 2));
                            }
                            else
                            {
                                hitbox.body.reset(this.x + (element.x * 2), this.y + (element.y * 2));
                            }
                        }

                        if (frame === 'minotaur-attack_9')
                        {
                            this.scene.shakeCamera(25, 0.010);
                        }

                        this.hitbox.push(hitbox);

                        if (!this.swordSfx.isPlaying)
                        {
                            this.swordSfx.play(undefined, { rate: 0.5 });
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
            const anim = this.anims.getName();
            if (anim === 'minotaur-attack')
            {
                this.isAttacking = false;
                this.isGesture = true;
                this.anims.play('minotaur-gesture', true);
            }

            if (anim === 'minotaur-gesture')
            {
                this.isGesture = false;
                this.anims.play('minotaur-idle', true);
            }

        });
    }

    private playSound ()
    {
        this.anims.play('minotaur-idle');

        if (this.scene.cameras.main.worldView.contains(this.x, this.y))
        {
            this.walkSfx.play();

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

            if (distance <= 98 && !this.isAttacking && !this.isGesture)
            {
                this.anims.play('minotaur-attack', true);

                this.isAttacking = true;
            }

            (x - this.body.center.x) > 0 ? this.setFlipX(true) : this.setFlipX(false);
        }
    }

    public looseLife (damage: number, weaponType: EWeaponType): void
    {
        if (this.isHit || weaponType === 'arrow')
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

        this.enemyState.life -= damage;

        this.scene.showEnemyDamage(this, damage);

        if (this.isAttacking === false)
        {
            this.anims.play('minotaur-attack', true);

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

        this.body.stop().setEnable(false);

        this.clearTint();

        this.scene.playSfx('beardedSfx', { volume: 4, rate: 0.7 });

        this.destroyHitbox();

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('minotaur-death', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.burn();

            this.giveLife(x, y);

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
