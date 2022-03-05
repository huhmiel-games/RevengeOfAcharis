import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class DemonAxe extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 20;
    public walkSfx: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private isBattleMusic: boolean = false;
    private currentsong: Phaser.Sound.BaseSound;
    private isBossMusic: boolean = false;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 3),
        };

        this.isBossMusic = config.isBossMusic;

        this.setOrigin(0, 0).setScale(2, 2);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(9, 35)
            .setOffset(44, 37)
            .setVelocityX(-this.speed)
            .setMaxVelocityX(this.speed);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"demon-axe-red-attack1_4":{"hitboxes":[{"frame":"demon-axe-red-attack1_4","type":"circle","x":51,"y":22,"width":44,"height":44}]},"demon-axe-red-attack2_4":{"hitboxes":[{"frame":"demon-axe-red-attack2_4","type":"circle","x":77,"y":40,"width":14,"height":14},{"frame":"demon-axe-red-attack2_4","type":"rectangle","x":23,"y":35,"width":23,"height":2},{"frame":"demon-axe-red-attack2_4","type":"rectangle","x":47,"y":37,"width":27,"height":6},{"frame":"demon-axe-red-attack2_4","type":"rectangle","x":57,"y":49,"width":23,"height":8}]},"demon-axe-red-attack2_6":{"hitboxes":[{"frame":"demon-axe-red-attack2_6","type":"rectangle","x":69,"y":57,"width":9,"height":5}]}}');

        this.walkSfx = this.scene.sound.add('skeletonStep', { volume: 0.5, rate: 0.6 });
        this.anims.play('demon-axe-red-walk');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'demon-axe-red-walk_3' || frame === 'demon-axe-red-walk_9') this.playSound();

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox: Projectile = this.scene.projectiles.getFirst(false, true, element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setActive(true).setVisible(true).setSize(element.width * 2, element.height * 2).setOrigin(0, 0).setName('fireball').setAlpha(0);
                        hitbox.enemyState = { damage: 10 };

                        if (element.type === 'rectangle')
                        {
                            hitbox.body.setSize(element.width * 2, element.height * 2).setEnable(true);
                        }

                        if (element.type === 'circle')
                        {
                            hitbox.body.setCircle(element.width).setEnable(true);
                        }

                        if (this.flipX)
                        {
                            hitbox.body.reset(this.getTopRight().x - element.x * 2 - element.width * 2, this.y + element.y * 2);
                        }
                        else
                        {
                            if (hitbox.body.isCircle && hitbox.body.width === 88)
                            {
                                hitbox.body.reset(this.x + element.x + element.width + 5, this.y + element.y * 2);
                            }
                            else
                            {
                                hitbox.body.reset(this.x + element.x * 2, this.y + element.y * 2);
                            }
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
            this.checkMusic();

            if (this.isDead) return;

            const anim = this.anims.getName();

            if (anim === 'demon-axe-red-hit')
            {
                this.anims.play('demon-axe-red-attack2', true);

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

            this.anims.play('demon-axe-red-walk', true);
        });
    }

    private checkMusic ()
    {
        if (!this.isBattleMusic && !this.isDead && this.isBossMusic)
        {
            if (!this.scene.cameras.main.worldView.contains(this.body.center.x, this.body.center.y))
            {
                return;
            }

            if (Math.round(this.body.bottom) !== Math.round(this.scene.player.body.bottom))
            {
                return;
            }
            
            this.currentsong = this.scene.musicGroup.filter(elm => elm.isPlaying)[0];
            this.isBattleMusic = true;
            this.scene.stopMusic();
            this.scene.bossBattleMusic.play();
            
        }
    }

    private playSound ()
    {
        const { x, y } = this.body.center;

        const volume = 1 / Phaser.Math.Distance.Between(this.scene.player.body.center.x, this.scene.player.body.center.y, this.body.center.x, this.body.center.y) * 20;

        if (this.scene.cameras.main.worldView.contains(x, y))
        {
            this.walkSfx.play({ volume, rate: 0.6 });
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

            if (distance <= 60 && !this.isAttacking)
            {
                this.anims.play('demon-axe-red-attack1', true);

                this.isAttacking = true;
            }

            if (distance > 60 && !this.isAttacking)
            {
                this.anims.play('demon-axe-red-walk', true);
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
                this.body.setOffset(46, 37);
            }
            else if (velocity.x > 0 && this.flipX)
            {
                this.setFlipX(false);
                this.body.setOffset(44, 37);
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
            this.anims.play('demon-axe-red-hit');
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

        this.anims.play('demon-axe-red-dead', true);

        this.scene.playSfx('beardedSfx', { volume: 4, rate: 0.5 });

        this.scene.time.addEvent({
            delay: 100,
            repeat: 10,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }
                const X = Phaser.Math.Between(this.body.x - 8, this.body.x + this.body.width + 8);
                const Y = Phaser.Math.Between(this.body.y - 8, this.body.y + this.body.height + 8);

                this.scene.enemyExplode(X, Y);
                // this.scene.playSfx('explo2', { volume: 0.3 });
            },
            
        });

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.burn();

            this.giveLife(x, y);

            if (this.isBossMusic)
            {
                this.scene.stopMusic();

                this.currentsong.play();
            }

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
