import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import LayerService from '../services/LayerService';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class SkeletonSeeker extends Enemy
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 20;
    private lastSpeed: number = 20;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
    public distance: number;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    public isDead: boolean = false;
    public isAttacking: boolean = false;
    public isHit: boolean = false;
    public xp: number;
    private isBattleStarted: boolean = false;
    private lastAttackTimestamp: number = 0;
    private isBattleMusic: boolean = false;
    private currentsong: Phaser.Sound.BaseSound;
    private earthBumps: Phaser.Physics.Arcade.Group;
    private countAttack: number = 0;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 3),
        };

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setOrigin(0, 0).setTexture('atlas').setFrame('skeleton-skeeker-spawn_0');

        this.xp = config.life / 2;

        this.body
            .setAllowGravity(false)
            .setGravityY(500)
            .setSize(22, 12)
            .setOffset(53, 44)
            .setMaxVelocityX(this.speed);

        this.earthBumps = this.scene.physics.add.group({
            maxSize: 4,
            allowGravity: false
        });

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"skeleton-skeeker-attack_4":{"hitboxes":[{"frame":"skeleton-skeeker-attack_4","type":"circle","x":86,"y":30,"width":32,"height":32}]},"skeleton-skeeker-attack_5":{"hitboxes":[{"frame":"skeleton-skeeker-attack_5","type":"circle","x":87,"y":68,"width":33,"height":33}]},"skeleton-skeeker-attack_6":{"hitboxes":[{"frame":"skeleton-skeeker-attack_6","type":"circle","x":94,"y":78,"width":25,"height":25}]}}');

        this.walkplay = false;
        this.walkk = this.scene.sound.add('skeletonStep', { volume: 0.5 });

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'skeleton-skeeker-spawn_6') this.scene.sound.play('impact', { rate: 0.3 });

            if (frame === 'skeleton-skeeker-walk_1' || frame === 'skeleton-skeeker-walk_4') this.playSound();

            if (frame === 'skeleton-skeeker-attack_7') this.earthBumpAttack();

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

            if (anim === 'skeleton-seeker-spawn')
            {
                this.scene.player.isPause = false;

                this.body.setVelocityX(this.speed);

                this.anims.play('skeleton-seeker-walk');

                this.isBattleStarted = true;

                this.checkMusic();

                return;
            }

            if (anim === 'skeleton-seeker-attack')
            {
                this.isAttacking = false;
                this.countAttack += 1;
            }

            if (anim === 'skeleton-seeker-hurt')
            {
                this.isHit = false;
            }

            this.anims.play('skeleton-seeker-walk', true);
        });

        if (this.scene.playerRoomName === 'map35')
        {
            this.scene.battleWithBoss = true;
        }

        this.scene.time.addEvent({
            delay: 500,
            callback: this.startBattle,
            callbackScope: this
        });
    }

    private earthBumpAttack ()
    {
        const x: number = this.flipX ? this.x + 8 : this.x + 112;
        const y: number = this.getBottomCenter().y - 24;

        this.scene.shakeCamera(100, 0.010);

        const leftEarthBump = this.earthBumps.getFirst(false, true, x, y, 'fireBall', undefined, true);
        const rightEarthBump = this.earthBumps.getFirst(false, true, x, y, 'fireBall', undefined, true);

        if (leftEarthBump)
        {
            leftEarthBump.setActive(true).setVisible(true).setDepth(DEPTH.UI_TEXT + 2).setName('earthBump').setAlpha(1).setFlipX(true);
            leftEarthBump.enemyState = { damage: 5 };
            leftEarthBump.body.setSize(34, 14).setVelocityX(-250);
            leftEarthBump.anims.play('earth-bump');
            leftEarthBump.looseLife = () => { return; };
        }

        if (rightEarthBump)
        {
            rightEarthBump.setActive(true).setVisible(true).setDepth(DEPTH.UI_TEXT + 2).setName('earthBump').setAlpha(1).setFlipX(false);
            rightEarthBump.enemyState = { damage: 5 };
            rightEarthBump.body.setSize(34, 14).setVelocityX(250);
            rightEarthBump.anims.play('earth-bump');
            rightEarthBump.looseLife = () => { return; };
        }

        this.scene.enemyGroup.push(leftEarthBump, rightEarthBump);

        this.scene.time.addEvent({
            delay: 1000,
            callback: () =>
            {
                leftEarthBump.destroy();
                rightEarthBump.destroy();
            }
        });

        if (this.countAttack === 3)
        {
            this.countAttack = 0;
            this.isAttacking = true;
            this.anims.play('skeleton-seeker-attack', false);
        }
    }

    private startBattle ()
    {
        if (this === undefined || this.active === false) return;

        if (this.scene.playerRoomName === 'map35')
        {
            const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getGroundLayers(this.scene).filter(l => l.name === 'ground/ground')[0];

            layer.putTileAt(157 + 17, 30, 6);
            layer.putTileAt(157 + 17, 30, 7);
            layer.putTileAt(157 + 17, 30, 8);
            layer.putTileAt(157 + 17, 30, 13);
            layer.putTileAt(157 + 17, 30, 14);
            layer.putTileAt(157 + 17, 30, 15);

            this.scene.colliderLayer.putTileAt(1, 30, 6).setCollision(true, true, true, true, true);
            this.scene.colliderLayer.putTileAt(1, 30, 7).setCollision(true, true, true, true, true);
            this.scene.colliderLayer.putTileAt(1, 30, 8).setCollision(true, true, true, true, true);
            this.scene.colliderLayer.putTileAt(1, 30, 13).setCollision(true, true, true, true, true);
            this.scene.colliderLayer.putTileAt(1, 30, 14).setCollision(true, true, true, true, true);
            this.scene.colliderLayer.putTileAt(1, 30, 15).setCollision(true, true, true, true, true);

            this.scene.shakeCamera(250);

            this.scene.player.isPause = true;
            this.scene.player.body.stop();
            this.scene.player.anims.play('adventurer-idle');

            this.scene.time.addEvent({
                delay: 1000,
                callback: () =>
                {
                    this.anims.play('skeleton-seeker-spawn');
                    this.scene.shakeCamera(2500, 0.005, false);
                    this.scene.sound.play('impact', { rate: 0.4 });
                }
            });
        }
        else
        {
            this.scene.player.anims.play('adventurer-idle');
            this.scene.time.addEvent({
                delay: 1000,
                callback: () =>
                {
                    if (this === undefined || this.active === false) return;
                    this.anims.play('skeleton-seeker-spawn');
                    this.scene.shakeCamera(2500, 0.005, false);
                    this.scene.sound.play('impact', { rate: 0.4 });
                }
            });
        }
    }

    private playSound ()
    {
        this.walkk.play({ volume: 1, rate: 0.3 });
    }

    private checkMusic ()
    {
        if (!this.isBattleMusic && !this.isDead)
        {
            this.currentsong = this.scene.musicGroup.filter(elm => elm.isPlaying)[0];

            this.isBattleMusic = true;

            this.scene.stopMusic();

            this.scene.bossBattleMusic.play({ loop: true });
        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (!this.isBattleStarted) return;

        if (this.active && !this.isDead)
        {
            const { blocked, velocity } = this.body;
            const { x, y } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(x, y, this.body.center.x, this.body.center.y);

            if (this.lastAttackTimestamp < time)
            {
                this.lastSpeed = velocity.x;

                this.body.stop();

                this.lastAttackTimestamp = time + 6000;

                this.anims.play('skeleton-seeker-attack', true);

                this.isAttacking = true;
            }

            if (!this.isAttacking && velocity.x === 0)
            {
                this.body.setVelocityX(this.lastSpeed);
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

    public looseLife (damage: number, weaponType: EWeaponType): void
    {
        if (this.isHit)
        {
            return;
        }

        if (!this.isAttacking)
        {
            this.anims.play('skeleton-seeker-hurt');
        }
        else
        {
            this.setTintFill(0xDDDDDD);
        }

        this.isHit = true;

        this.scene.sound.play('skeletonHit', { volume: 2, rate: 0.6 });

        this.enemyState.life -= damage;

        this.scene.showEnemyDamage(this, damage);

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

        this.earthBumps.destroy();

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('skeleton-seeker-death', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.burn();

            this.giveLife(x, y);

            if (this.scene.playerRoomName === 'map35')
            {
                const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getGroundLayers(this.scene).filter(l => l.name === 'ground/ground')[0];

                const tile = layer.getTileAt(30, 7);
                const tile2 = layer.getTileAt(30, 14);

                const smoke = this.scene.smokeGroup.getFirstDead(true, tile.getCenterX(), tile.getCenterY(), undefined, undefined, true);

                if (smoke)
                {
                    smoke.setDepth(DEPTH.SMOKE);
                    smoke.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => smoke.destroy());
                    smoke.anims.play('smoke1');

                    this.scene.sound.play('impact', { rate: 0.5 });
                }
                const smoke2 = this.scene.smokeGroup.getFirstDead(true, tile2.getCenterX(), tile2.getCenterY(), undefined, undefined, true);

                if (smoke2)
                {
                    smoke2.setDepth(DEPTH.SMOKE);
                    smoke2.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => smoke.destroy());
                    smoke2.anims.play('smoke1');

                    this.scene.sound.play('impact', { rate: 0.2 });
                }
                layer.removeTileAt(30, 6);
                layer.removeTileAt(30, 7);
                layer.removeTileAt(30, 8);
                layer.removeTileAt(30, 13);
                layer.removeTileAt(30, 14);
                layer.removeTileAt(30, 15);

                this.scene.colliderLayer.removeTileAt(30, 6);
                this.scene.colliderLayer.removeTileAt(30, 7);
                this.scene.colliderLayer.removeTileAt(30, 8);
                this.scene.colliderLayer.removeTileAt(30, 13);
                this.scene.colliderLayer.removeTileAt(30, 14);
                this.scene.colliderLayer.removeTileAt(30, 15);

                this.scene.battleWithBoss = false;
            }

            this.scene.tweens.add({
                duration: 250,
                targets: this,
                alpha: 0,
                onComplete: () =>
                {
                    if (this.currentsong !== undefined)
                    {
                        this.scene.stopMusic();
                        this.currentsong.play();
                    }

                    this.destroy();
                }
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
            this.scene.sound.play(`skeletonDeath`, { volume: 1, rate: 0.5 });
        }
        catch (error)
        {
            console.log(error);
        }
    }

    public burn ()
    {
        const { x } = this.body.center;

        const flames = this.scene.explodeSprite.getFirstDead(true, x, this.getBottomCenter().y - 36, 'enemyExplode', undefined, true);

        if (flames)
        {
            flames.setDepth(DEPTH.EXPLOSION);

            flames.anims.play('enemyExplode').on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
            {
                flames.destroy();
            });
        }
    }

    public giveLife (x: number, y: number): void
    {
        const heart = this.scene.hearts.get(x, y, 'heart', undefined, true);

        if (heart)
        {
            heart.setDepth(DEPTH.LIFE)
                .anims.play('heart')
                .setActive(true)
                .setVisible(true)
                .setDataEnabled()
                .data.set('health', this.enemyState.giveLife);

            heart.body.setEnable(true);

            this.scene.heartGroup.push(heart);
        }
    }
}
