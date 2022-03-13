import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import LayerService from '../services/LayerService';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class EvilWizardBoss extends Enemy
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
    private isBattleStarted: boolean;
    private isBattleMusic: any;
    private currentsong: Phaser.Sound.BaseSound;
    private nextAction: string;
    private lastAction: string;
    private actionCount: number = 0;
    private actionList: string[] = ['jumpToLeft', 'attack1', 'runToRight', 'attack2', 'runToLeft', 'jumpToRight', 'attack1', 'runToLeft', 'attack2', 'runToRight'];

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 3),
        };

        this.setTexture('atlas').setFrame('evil-wizard2-idle_0');

        this.setOrigin(0, 0).setFlipX(true);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(12, 52)
            .setOffset(118, 115)
            .reset(x, y);

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"evil-wizard2-attack1_3":{"hitboxes":[{"frame":"evil-wizard2-attack1_3","type":"circle","x":167,"y":80,"width":62,"height":62}]},"evil-wizard2-attack1_4":{"hitboxes":[{"frame":"evil-wizard2-attack1_4","type":"circle","x":151,"y":52,"width":85,"height":85}]},"evil-wizard2-attack1_5":{"hitboxes":[{"frame":"evil-wizard2-attack1_5","type":"circle","x":152,"y":49,"width":82,"height":82}]},"evil-wizard2-attack1_6":{"hitboxes":[{"frame":"evil-wizard2-attack1_6","type":"circle","x":166,"y":28,"width":47,"height":47}]},"evil-wizard2-attack2_4":{"hitboxes":[{"frame":"evil-wizard2-attack2_4","type":"circle","x":129,"y":51,"width":115,"height":115}]},"evil-wizard2-attack2_5":{"hitboxes":[{"frame":"evil-wizard2-attack2_5","type":"circle","x":128,"y":60,"width":107,"height":107}]},"evil-wizard2-attack2_6":{"hitboxes":[{"frame":"evil-wizard2-attack2_6","type":"circle","x":131,"y":91,"width":89,"height":89}]}}');

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

            if (anim === 'evil-wizard2-attack1')
            {
                this.incrementActionCount();

                this.nextAction = this.actionList[this.actionCount];
            }

            if (anim === 'evil-wizard2-attack2')
            {
                this.incrementActionCount();

                this.nextAction = this.actionList[this.actionCount];
            }

            if (anim === 'evil-wizard2-run')
            {
                this.incrementActionCount();

                this.nextAction = this.actionList[this.actionCount];
            }

            if (anim === 'evil-wizard2-hurt')
            {
                this.incrementActionCount();

                this.nextAction = this.actionList[this.actionCount];
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

        if (this.active && !this.isBattleStarted)
        {
            const { x, y } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(x, y, this.body.center.x, this.body.center.y);

            if (distance < 192)
            {
                this.startBattle();
            }
        }

        if (this.active && !this.isDead && this.isBattleStarted)
        {
            const { x, y } = this.scene.player.body.center;
            const { blocked, velocity } = this.body;

            if (blocked.down && this.nextAction !== this.lastAction)
            {
                this.lastAction = this.nextAction;

                this.body.stop();

                this[this.nextAction]();
            }

            if (!blocked.down && velocity.y <= 30)
            {
                this.anims.play('evil-wizard2-jump', true);
            }

            if (!blocked.down && velocity.y > 30)
            {
                this.anims.play('evil-wizard2-fall', true);
            }
        }
    }

    private startBattle ()
    {
        if (this === undefined || this.isBattleStarted) return;

        this.isBattleStarted = true;

        const bossDoorLayer: Phaser.Tilemaps.TilemapLayer = LayerService.getForegroundLayers(this.scene).find(l => l.name === 'foreground/bossDoor') as Phaser.Tilemaps.TilemapLayer;
        bossDoorLayer.setAlpha(1);
        bossDoorLayer.forEachTile(tile =>
        {
            if (tile.index !== -1)
            {
                this.scene.colliderLayer.putTileAt(1, tile.x, tile.y).setCollision(true, true, true, true, true);
            }
        });

        this.scene.shakeCamera(250);

        this.scene.player.isPause = true;
        this.scene.player.body.stop();
        this.scene.player.anims.play('adventurer-idle');

        this.scene.time.addEvent({
            delay: 1000,
            callback: () =>
            {
                this.checkMusic();
                this.scene.player.isPause = false;
                this.jumpToLeft();
            }
        });
    }

    private incrementActionCount ()
    {
        this.actionCount += 1;

        if (this.actionCount > 9) this.actionCount = 0;
    }

    private jumpToLeft ()
    {
        this.body.setVelocity(-180, -400);

        this.setFlipX(true);

        const timer = this.scene.time.addEvent({
            delay: 80,
            repeat: 10,
            callback: () =>
            {
                if (!this.active || this.isDead) return;

                if (timer.getOverallProgress() > 0.5 && timer.getOverallProgress() < 0.6)
                {
                    this.body.setVelocityY(0);
                    this.body.setGravityY(0);
                }

                if (timer.getOverallProgress() > 0.8)
                {
                    this.body.setGravityY(500);
                }

                if (timer.getOverallProgress() === 1)
                {
                    this.incrementActionCount();

                    this.nextAction = this.actionList[this.actionCount];
                }
            }
        });
    }

    private jumpToRight ()
    {
        this.body.setVelocity(180, -400);

        this.setFlipX(false);

        const timer = this.scene.time.addEvent({
            delay: 80,
            repeat: 10,
            callback: () =>
            {
                if (!this.active || this.isDead) return;

                if (timer.getOverallProgress() > 0.5 && timer.getOverallProgress() < 0.6)
                {
                    this.body.setVelocityY(0);
                    this.body.setGravityY(0);
                }

                if (timer.getOverallProgress() > 0.8)
                {
                    this.body.setGravityY(500);
                }

                if (timer.getOverallProgress() === 1)
                {
                    this.incrementActionCount();

                    this.nextAction = this.actionList[this.actionCount];
                }
            }
        });
    }

    private runToLeft ()
    {
        this.body.setVelocityX(-180);

        this.setFlipX(true);

        this.anims.play('evil-wizard2-run', true);
    }

    private runToRight ()
    {
        this.body.setVelocityX(180);

        this.setFlipX(false);

        this.anims.play('evil-wizard2-run', true);
    }

    private attack1 ()
    {
        this.scene.player.body.center.x - this.body.center.x > 0 ? this.setFlipX(false) : this.setFlipX(true);

        this.anims.play('evil-wizard2-attack1', true);
    }

    private attack2 ()
    {
        this.scene.player.body.center.x - this.body.center.x > 0 ? this.setFlipX(false) : this.setFlipX(true);

        this.anims.play('evil-wizard2-attack2', true);
    }



    private checkMusic ()
    {
        if (!this.isBattleMusic && !this.isDead)
        {
            this.currentsong = this.scene.musicGroup.find(elm => elm.isPlaying) as Phaser.Sound.BaseSound;

            this.isBattleMusic = true;

            this.scene.stopMusic();

            this.scene.bossBattleMusic.play({ loop: true });
        }
    }

    public looseLife (damage: number, weaponType: EWeaponType): void
    {
        if (this.isHit)
        {
            return;
        }

        this.setTintFill(0xDDDDDD);

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

        this.scene.playSfx('wizardDeath', { rate: 0.5 });

        this.destroyHitbox();

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('evil-wizard2-death', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.burn();

            this.giveLife(x, y);

            const bossDoorLayer: Phaser.Tilemaps.TilemapLayer = LayerService.getForegroundLayers(this.scene).find(l => l.name === 'foreground/bossDoor') as Phaser.Tilemaps.TilemapLayer;
            bossDoorLayer.forEachTile(tile =>
            {
                if (tile.index !== -1)
                {
                    this.scene.colliderLayer.removeTileAt(tile.x, tile.y);

                    const smoke = this.scene.smokeGroup.getFirstDead(true, tile.getCenterX(), tile.getCenterY(), undefined, undefined, true);

                    if (smoke)
                    {
                        smoke.setDepth(DEPTH.FRONT_LAYER + 10);
                        smoke.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => smoke.destroy());
                        smoke.anims.play('smoke1');
                    }
                }
            });
            this.scene.playSfx('impact', { volume: 0.5, rate: 0.3 });
            bossDoorLayer.setAlpha(0);

            this.scene.shakeCamera(250);

            this.scene.stopMusic();
            this.currentsong.play();

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

