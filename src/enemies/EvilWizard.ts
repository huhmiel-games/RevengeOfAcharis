import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class EvilWizard extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 40;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private isDodging: boolean = false;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 3),
        };

        this.setTexture('atlas').setFrame('evil-wizard-idle_0');

        this.setOrigin(0, 0);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(15, 43)
            .setOffset(66, 56)
            .reset(x, y);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"evil-wizard-attack_0": { "hitboxes": [{ "frame": "evil-wizard-attack_0", "type": "circle", "x": 101, "y": 64, "width": 24, "height": 24 }, { "frame": "evil-wizard-attack_0", "type": "rectangle", "x": 86, "y": 69, "width": 16, "height": 12 }] },"evil-wizard-attack_1": { "hitboxes": [{ "frame": "evil-wizard-attack_1", "type": "circle", "x": 101, "y": 64, "width": 24, "height": 24 }, { "frame": "evil-wizard-attack_1", "type": "rectangle", "x": 86, "y": 69, "width": 16, "height": 12 }] },"evil-wizard-attack_3": { "hitboxes": [{ "frame": "evil-wizard-attack_3", "type": "circle", "x": 101, "y": 64, "width": 24, "height": 24 }, { "frame": "evil-wizard-attack_2", "type": "rectangle", "x": 86, "y": 69, "width": 16, "height": 12 }] },"evil-wizard-attack_4": { "hitboxes": [{ "frame": "evil-wizard-attack_4", "type": "circle", "x": 101, "y": 64, "width": 24, "height": 24 }, { "frame": "evil-wizard-attack_3", "type": "rectangle", "x": 86, "y": 69, "width": 16, "height": 12 }] },"evil-wizard-attack_5": { "hitboxes": [{ "frame": "evil-wizard-attack_5", "type": "circle", "x": 101, "y": 64, "width": 24, "height": 24 }, { "frame": "evil-wizard-attack_4", "type": "rectangle", "x": 86, "y": 69, "width": 16, "height": 12 }] },"evil-wizard-attack_6": { "hitboxes": [{ "frame": "evil-wizard-attack_6", "type": "circle", "x": 101, "y": 64, "width": 24, "height": 24 }, { "frame": "evil-wizard-attack_5", "type": "rectangle", "x": 86, "y": 69, "width": 16, "height": 12 }] },"evil-wizard-attack_7": { "hitboxes": [{ "frame": "evil-wizard-attack_7", "type": "circle", "x": 101, "y": 64, "width": 24, "height": 24 }, { "frame": "evil-wizard-attack_6", "type": "rectangle", "x": 86, "y": 69, "width": 16, "height": 12 }] }}');

        this.walkplay = false;
        this.walkk = this.scene.sound.add('skeletonStep', { volume: 0.5 });

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
                        hitbox.setActive(true).setVisible(true).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0);
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

            const anim = this.anims.getName();

            if (anim === 'evil-wizard-hurt')
            {
                this.anims.play('evil-wizard-walk', true);

                return;
            }

            if (anim === 'evil-wizard-walk')
            {
                this.anims.play('evil-wizard-attack', true);

                return;
            }

            if (anim === 'evil-wizard-attack')
            {
                this.anims.play('evil-wizard-idle', true);

                this.isAttacking = false;

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
            this.walkk.play({ volume });
        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.active && !this.isDead)
        {
            const { x, y } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(x, y, this.body.center.x, this.body.center.y);

            if (distance <= 50 && !this.isAttacking)
            {
                this.anims.play('evil-wizard-walk', true);

                this.isAttacking = true;
            }

            if (distance > 50 && !this.isAttacking)
            {
                this.anims.play('evil-wizard-idle', true);
            }

            x - this.body.center.x > 0 ? this.setFlipX(false) : this.setFlipX(true);
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
            this.anims.play('evil-wizard-hurt');
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
            .setDepth(DEPTH.UI_TEXT);

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

        this.anims.play('evil-wizard-death', true);

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
            h.setActive(false);
            h.body.setEnable(false);
        });
    }

    public dodge ()
    {
        if (this.isDodging) return;

        this.isDodging = true;

        const { x } = this.scene.player.body.center;

        if (x > this.body.center.x)
        {
            this.body.setVelocityX(200);
        }
        else
        {
            this.body.setVelocityX(-200);
        }

        this.scene.tweens.add({
            targets: this,
            duration: 80,
            alpha: 0,
            yoyo: true,
            onComplete: () =>
            {
                this.isDodging = false;
                this.body.setVelocityX(0);
            }
        });
    }
}

