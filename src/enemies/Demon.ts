import Skeleton from './Skeleton';
import GameScene from '../scenes/GameScene';
import { FONTS, FONTS_SIZES, HEIGHT, SCENES_NAMES, WIDTH } from '../constant/config';
import LayerService from '../services/LayerService';
import { THitboxData } from '../types/types';
import Projectile from './Projectile';
import { COLORS } from '../constant/colors';
import SkeletonSword from './SkeletonSword';
import SkeletonFlail from './SkeletonFlail';
import Enemy from './Enemy';
import DEPTH from '../constant/depth';


export default class Demon extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; hited: boolean; skullHeadQuantity: number; speed: number; };
    private isHurt: boolean = false;
    private isBreathFire: boolean = false;
    private isBreathIce: boolean = false;
    private isBattleStarted: boolean = false;
    private isSkullRotates: boolean = false;
    private isSkullAttack: boolean = false;
    private isReleaseEnemy: boolean = false;
    private isDead: boolean = false;
    private skullAttackDelay: number = 0;
    private diameter: { x: number; };
    private deathMsg;
    private skullTimer2: Phaser.Time.TimerEvent;
    private skullTimer3: Phaser.Time.TimerEvent;
    private isBattleMusic: boolean = false;
    private currentsong: Phaser.Sound.BaseSound;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    public skull0: Phaser.Physics.Arcade.Sprite;
    public skull1: Phaser.Physics.Arcade.Sprite;
    public skull2: Phaser.Physics.Arcade.Sprite;
    public skull3: Phaser.Physics.Arcade.Sprite;
    public skull4: Phaser.Physics.Arcade.Sprite;
    public skull5: Phaser.Physics.Arcade.Sprite;
    public skull6: Phaser.Physics.Arcade.Sprite;
    public skull7: Phaser.Physics.Arcade.Sprite;
    private skullGroup: Phaser.Physics.Arcade.Sprite[] = [];
    private healthUiBack: Phaser.GameObjects.Image;
    private healthUiText: Phaser.GameObjects.BitmapText;



    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.scene = scene;

        this.name = config.name;

        this.enemyState = {
            life: 4000,
            damage: 20,
            hited: false,
            skullHeadQuantity: 8,
            speed: 120,
        };

        this.setDepth(DEPTH.ENEMY + 3).setOrigin(0, 0);

        this.hitboxData = JSON.parse('{"demon-breath-fire_0":{"hitboxes":[{"frame":"demon-breath-fire_0","type":"circle","x":82,"y":127,"width":18,"height":18}]},"demon-breath-fire_1":{"hitboxes":[{"frame":"demon-breath-fire_1","type":"rectangle","x":45,"y":138,"width":59,"height":35},{"frame":"demon-breath-fire_1","type":"circle","x":24,"y":157,"width":16,"height":16}]},"demon-breath-fire_2":{"hitboxes":[{"frame":"demon-breath-fire_2","type":"circle","x":17,"y":152,"width":23,"height":23},{"frame":"demon-breath-fire_2","type":"rectangle","x":48,"y":131,"width":67,"height":44}]},"demon-breath-fire_3":{"hitboxes":[{"frame":"demon-breath-fire_3","type":"circle","x":32,"y":128,"width":18,"height":18},{"frame":"demon-breath-fire_3","type":"rectangle","x":47,"y":123,"width":55,"height":53}]},"demon-breath-ice_0":{"hitboxes":[{"frame":"demon-breath-ice_0","type":"circle","x":82,"y":127,"width":18,"height":18}]},"demon-breath-ice_1":{"hitboxes":[{"frame":"demon-breath-ice_1","type":"rectangle","x":45,"y":138,"width":59,"height":35},{"frame":"demon-breath-ice_1","type":"circle","x":24,"y":157,"width":16,"height":16}]},"demon-breath-ice_2":{"hitboxes":[{"frame":"demon-breath-ice_2","type":"circle","x":17,"y":152,"width":23,"height":23},{"frame":"demon-breath-ice_2","type":"rectangle","x":48,"y":131,"width":67,"height":44}]},"demon-breath-ice_3":{"hitboxes":[{"frame":"demon-breath-ice_3","type":"circle","x":32,"y":128,"width":18,"height":18},{"frame":"demon-breath-ice_3","type":"rectangle","x":47,"y":123,"width":55,"height":53}]}}');

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setCircle(10, 121, 83)
            .setAllowGravity(false)
            .setCollideWorldBounds(true);

        this.diameter = { x: 0 };

        this.deathMsg = null;

        this.blockDoors();

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
                            hitbox.body.reset(this.getTopRight().x - element.x * 2, this.y + element.y);
                        }
                        else
                        {
                            hitbox.body.reset(this.getTopLeft().x + element.x, this.y + element.y);
                        }

                        this.scene.projectileGroup.push(hitbox);
                        this.hitbox.push(hitbox);

                        // if (!this.swordSfx.isPlaying)
                        // {
                        //     this.swordSfx.play();
                        // }
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
            const anim = this.anims.getName();

            if (anim === 'demon-start-breath')
            {
                this.anims.play('demon-breath-fire');
                this.isBreathFire = true;

                return;
            }

            if (anim === 'demon-breath-fire')
            {
                this.anims.play('demon-idle');
                this.isBreathFire = false;

                return;
            }

            if (anim === 'demon-breath-ice')
            {
                this.anims.play('demon-idle');
                this.isBreathFire = false;

                return;
            }

            this.anims.play('demon-idle');
        });

        this.scene.physics.add.overlap(this, this.skullGroup, (demon, skull) =>
        {
            if (skull.active && skull.data.get('counterAttack') === true)
            {
                this.looseLife(200, 'skullHeadDemon');

                this.skullGroup.forEach(skullHead =>
                {
                    if (skullHead.active)
                    {
                        const smoke = this.scene.smokeGroup.getFirstDead(true, skullHead.body.center.x, skullHead.body.center.y, undefined, undefined, true);

                        if (smoke)
                        {
                            smoke.setDepth(DEPTH.ENEMY + 5);
                            smoke.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => smoke.destroy());
                            smoke.anims.play('smoke1');
                        }
                        skullHead.destroy();
                    }
                });

                this.isSkullAttack = false;

                this.skullAttackDelay = this.scene.time.now;
            }
        }, undefined, this.scene);

        this.startBattle();
    }

    // demonDeathSfx
    // demonHitSfx
    // demonDyingFireSfx
    // demonFlySfx
    // demonBreathSfx
    // demonBreathBlueSfx
    // demonScreamSfx
    // demonlightingLaughSfx
    // demonSkullAttackSfx
    // demonSkullHitSfx

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.scene.isPause || !this.active || !this.isBattleStarted || this.isDead) return;

        const { x, y } = this.body.center;

        const { x: playerPosX, y: playerPosY } = this.scene.player.body.center;

        const distance = Phaser.Math.Distance.Between(playerPosX, playerPosY, x, y);

        // breath fire or ice attack
        if (!this.isBreathFire && !this.isBreathIce && !this.isSkullRotates && !this.isSkullAttack && distance <= 120)
        {
            this.body.setVelocity(0, 0);

            this.anims.play('demon-start-breath', true);
        }

        // chase player
        if (this.canChase() && distance > 120)
        {
            const dx = playerPosX - x;
            const dy = playerPosY - y;

            this.body.setVelocityX(dx / 2);

            if (y < 200)
            {
                this.body.setVelocityY(dy / 2);
            }
            else
            {
                this.body.setVelocityY(0);
            }
        }

        // flip demon
        if (x > playerPosX && !this.isBreathFire)
        {
            if (this.flipX)
            {
                this.flipX = false;
            }
        }
        else if (x < playerPosX && !this.isBreathFire)
        {
            if (!this.flipX)
            {
                this.flipX = true;
            }
        }

        if (this.isSkullRotates)
        {
            Phaser.Actions.RotateAroundDistance(this.scene.skullHeads.getChildren(), {
                x: this.body.center.x,
                y: this.body.center.y
            }, 0.02, this.diameter.x);
        }
    }

    private expandSkullHeadDiameter ()
    {
        this.scene.tweens.add({
            targets: this.diameter,
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 0,
            repeat: 0,
            loop: 0,
            yoyo: false,
            x: {
                getStart: () => 1,
                getEnd: () => 80,
            },
        });
    }

    private canChase (): boolean
    {
        if (this.isSkullAttack || this.isSkullRotates || this.isBreathFire || this.isBreathIce)
        {
            return false;
        }

        return true;
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

    private handleSkullHeads ()
    {
        if (!this.active || this.isDead || this.skullAttackDelay + 10000 > this.scene.time.now)
        {
            return;
        }

        this.body.setVelocity(0, 0);

        const arrPositionsX = [this.body.x + 1500, this.body.x + 750, this.body.x, this.body.x - 750, this.body.x - 1500, this.body.x - 750, this.body.x, this.body.x + 750];
        const arrPositionsY = [this.body.y, this.body.y - 750, this.body.y - 1500, this.body.y - 750, this.body.y, this.body.y + 750, this.body.y + 1500, this.body.y + 750];

        const arrAngle = [0, Math.PI / 4, Math.PI / 2, 3 / 4 * Math.PI, Math.PI, 5 / 4 * Math.PI, 3 / 2 * Math.PI, 7 / 4 * Math.PI];

        this.skullGroup.length = 0;

        for (let i = 0; i < this.enemyState.skullHeadQuantity; i += 1)
        {
            this[`skull${i}`] = this.scene.skullHeads.getFirstDead(true, this.body.x, this.body.y, 'atlas', undefined, true);
            if (this[`skull${i}`])
            {
                this[`skull${i}`].visible = true;
                this[`skull${i}`].anims.play('fire-skull', true);
                this[`skull${i}`].setDepth(DEPTH.ENEMY + 2);
                this[`skull${i}`].enemyState = { damage: 5 };
                this[`skull${i}`].setDataEnabled().data.set('counterAttack', false);
                this[`skull${i}`].name = 'skullHeadDemon';
                this[`skull${i}`].body.setCircle(16, 10, 20).reset(arrPositionsX[i], arrPositionsY[i]);
                this.scene.enemyGroup.push(this[`skull${i}`]);
                this.skullGroup.push(this[`skull${i}`]);
            }
        }

        this.expandSkullHeadDiameter();

        this.isSkullRotates = true;

        this.scene.sound.play('demonSkullSummonSfx');

        this.skullHeadsAppears();
    }

    private skullHeadsAppears ()
    {
        if (!this.active || this.isDead)
        {
            return;
        }

        this.skullTimer2 = this.scene.time.addEvent({
            delay: 5000,
            repeat: 0,
            callback: () =>
            {
                if (!this.active || this.isDead)
                {
                    return;
                }

                this.isSkullRotates = false;

                this.skullAttack();
            }
        });
    }

    private skullAttack ()
    {
        if (this.isSkullAttack) return;

        this.isSkullAttack = true;

        [this.skull0, this.skull1, this.skull2, this.skull3, this.skull4, this.skull5, this.skull6, this.skull7].forEach((skull, i) =>
        {
            if (skull?.active)
            {
                this.scene.sound.play('demonSkullAttackSfx', { volume: 0.1 });

                this.isSkullRotates = false;

                const body = skull.body as Phaser.Physics.Arcade.Body;

                body.setVelocity(0, 0);

                this.scene.time.addEvent({
                    delay: 800 * (i + 1),
                    callback: () =>
                    {
                        const angle = Phaser.Math.Angle.Between(skull.x, skull.y, this.scene.player.body.center.x, this.scene.player.body.center.y); // Math.atan2(dy, dx);

                        body.setVelocity(Math.cos(angle) * 400, Math.sin(angle) * 400);

                        this.skullTimer3 = this.scene.time.addEvent({
                            delay: 3000,
                            repeat: 0,
                            callback: () =>
                            {
                                if (!this.active || this.isDead)
                                {
                                    return;
                                }

                                skull.destroy();

                                this.skullAttackDelay = this.scene.time.now;

                                const deadSkulls = [this.skull0, this.skull1, this.skull2, this.skull3,
                                this.skull4, this.skull5, this.skull6, this.skull7]
                                    .filter(e => e?.active).length;

                                if (deadSkulls === 0)
                                {
                                    this.isSkullAttack = false;
                                }
                            }
                        });
                    }
                });
            }
        });
    }

    private callSkeleton ()
    {
        if (this.isDead) return;

        for (let i = 0; i < 3; i += 1)
        {
            const skeletonPosX = Phaser.Math.RND.between(10 * 16, 59 * 16);
            const skeleton = new Skeleton(this.scene, skeletonPosX as unknown as number, 15 * 16 as unknown as number - 16, {
                key: 'skeletonRise',
                name: 'skeletonRise',
                life: 10,
                damage: 10,
            });
            skeleton.setPosition(skeletonPosX, 15 * 16 - 16);
            this.scene.enemyGroup.push(skeleton);
        }
    }

    private callSkeletonSword ()
    {
        if (this.isDead) return;

        for (let i = 0; i < 3; i += 1)
        {
            const skeletonPosX = Phaser.Math.RND.between(10 * 16, 59 * 16);
            const skeleton = new SkeletonSword(this.scene, skeletonPosX as unknown as number, 15 * 16 as unknown as number - 16, {
                key: 'skeletonRise',
                name: 'skeletonRise',
                life: 10,
                damage: 10,
            });
            skeleton.setPosition(skeletonPosX, 15 * 16 - 16);
            this.scene.enemyGroup.push(skeleton);
        }
    }

    private callSkeletonFlail ()
    {
        if (this.isDead) return;

        for (let i = 0; i < 3; i += 1)
        {
            const skeletonPosX = Phaser.Math.RND.between(10 * 16, 59 * 16);
            const skeleton = new SkeletonFlail(this.scene, skeletonPosX as unknown as number, 15 * 16 as unknown as number - 16, {
                key: 'skeletonRise',
                name: 'skeletonRise',
                life: 10,
                damage: 10,
            });
            skeleton.setPosition(skeletonPosX, 15 * 16 - 16);
            this.scene.enemyGroup.push(skeleton);
        }
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

    private startBattle ()
    {
        this.anims.play('demon-idle', true);

        const text = ['Hey kid...', 'I\'m really angry ...', 'You destroyed my evil army!!', 'And worst...', 'you freed my wife from her prison!!', 'Be damned !!!'];

        this.scene.player.anims.play('adventurer-idle', true);

        this.scene.player.isPause = true;

        this.scene.sound.play('demonScreamSfx');

        // @ts-ignore
        const ui = this.scene.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 8, WIDTH, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0)
            .setVisible(true);

        let index = 0;

        const msg = this.scene.add.bitmapText(WIDTH / 32, HEIGHT - 48, FONTS.MINIMAL, text[index], 22, 1)
            .setOrigin(0, 0).setLetterSpacing(1).setAlpha(1).setDepth(DEPTH.UI_TEXT).setScrollFactor(0, 0);

        const dialog = this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (event.key === this.scene.player.keys.fire.originalEvent.key && index < text.length)
            {
                index += 1;

                msg.setText('');

                this.scene.time.addEvent({
                    delay: 150,
                    callback: () => msg.setText(text[index])
                });
            }

            if (event.key === this.scene.player.keys.fire.originalEvent.key && index === text.length)
            {
                msg.destroy();

                ui.destroy();

                this.scene.unPause();

                this.scene.time.addEvent({
                    delay: 150,
                    callback: () =>
                    {
                        dialog.removeAllListeners();

                        this.checkMusic();

                        const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getGroundLayers(this.scene).filter(l => l.name === 'ground/ground')[0];

                        layer.putTileAt(734 + 17, 8, 14, true);
                        layer.putTileAt(797 + 17, 8, 15);
                        layer.putTileAt(860 + 17, 8, 16);
                        layer.putTileAt(754 + 17, 61, 14, true);
                        layer.putTileAt(817 + 17, 61, 15);
                        layer.putTileAt(880 + 17, 61, 16);

                        this.scene.colliderLayer.putTileAt(1, 8, 14).setCollision(true, true, true, true, true);
                        this.scene.colliderLayer.putTileAt(1, 8, 15).setCollision(true, true, true, true, true);
                        this.scene.colliderLayer.putTileAt(1, 8, 16).setCollision(true, true, true, true, true);
                        this.scene.colliderLayer.putTileAt(1, 61, 14).setCollision(true, true, true, true, true);
                        this.scene.colliderLayer.putTileAt(1, 61, 15).setCollision(true, true, true, true, true);
                        this.scene.colliderLayer.putTileAt(1, 61, 16).setCollision(true, true, true, true, true);

                        this.healthUiBack = this.scene.add.image(425, 0, 'parchment').setScrollFactor(0, 0).setDepth(DEPTH.UI_BACK).setOrigin(0, 0).setFlipX(true);

                        this.healthUiText = this.scene.add.bitmapText(435, 9, FONTS.GALAXY, `${this.enemyState.life}/4000`, FONTS_SIZES.GALAXY, 1)
                            .setScrollFactor(0, 0).setDepth(DEPTH.UI_TEXT).setTintFill(COLORS.STEEL_GRAY);

                        this.isBattleStarted = true;

                        this.scene.player.isPause = false;
                    }
                });


            }
        });
    }

    private kill ()
    {
        if (this.isDead)
        {
            return;
        }
        this.isDead = true;

        this.skullGroup.forEach(skullHead =>
        {
            if (skullHead?.active)
            {
                const smoke = this.scene.smokeGroup.getFirstDead(true, skullHead.body.center.x, skullHead.body.center.y, undefined, undefined, true);

                if (smoke)
                {
                    smoke.setDepth(DEPTH.SMOKE);
                    smoke.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => smoke.destroy());
                    smoke.anims.play('smoke1');
                }
                skullHead.destroy();
            }
        });

        this.scene.children.each(child =>
        {
            if (child.active && child instanceof Enemy)
            {
                child.kill();
            }
        });

        this.healthUiText.setText(`0/4000`);

        this.body.setVelocity(0, 0).setEnable(false);

        this.scene.stopMusic();

        // @ts-ignore
        const ui = this.scene.add.rexNinePatch(WIDTH / 2, HEIGHT / 4, WIDTH, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0)
            .setVisible(true);

        const msg = this.scene.add.bitmapText(WIDTH / 32, HEIGHT / 4 - 12, FONTS.MINIMAL, '', 22, 1)
            .setOrigin(0, 0).setLetterSpacing(1).setAlpha(1).setDepth(DEPTH.UI_TEXT).setScrollFactor(0, 0);

        const demonExplode = this.scene.time.addEvent({
            delay: 150,
            repeat: 30,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }
                const X = Phaser.Math.Between(this.body.x - 16, this.body.x + this.body.width + 16);
                const Y = Phaser.Math.Between(this.body.y - 16, this.body.y + this.body.height + 24);

                this.scene.enemyExplode(X, Y);

                this.scene.sound.play('demonDyingFireSfx');

                if (demonExplode.repeatCount === 1)
                {
                    this.scene.sound.play('demonDeathSfx', { rate: 0.5 });
                }
                if (demonExplode.repeatCount > 25)
                {
                    msg.setText(`No`);
                }
                if (demonExplode.repeatCount < 26)
                {
                    msg.setText(`NOooooo`);
                }
                if (demonExplode.repeatCount < 16)
                {
                    msg.setText(`I can't believe it`);
                }
                if (demonExplode.repeatCount < 6)
                {
                    msg.setText(`Be damned !!!`);
                }

                if (demonExplode.repeatCount === 0)
                {
                    this.body.reset(-10000, -10000);

                    this.anims.pause();

                    this.scene.shakeCamera(1000);

                    this.scene.flashCamera(3000);

                    this.setAlpha(0);

                    msg.destroy();
                    ui.destroy();

                    this.scene.time.addEvent({
                        delay: 6000,
                        callback: () =>
                        {
                            this.scene.cameras.main.fadeOut(2000, 0, 0, 0, (cam: Phaser.Cameras.Scene2D.Camera, progress: number) =>
                            {
                                if (progress === 1)
                                {
                                    this.scene.scene.start(SCENES_NAMES.ENDGAME);
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    public looseLife (damage: number, weapon: string)
    {
        if (this.isHurt === true) return;

        this.isHurt = true;

        this.scene.sound.play('demonHitSfx', { volume: 2, rate: 0.5 });

        this.anims.play('demon-hurt', true);

        if (this.isBreathFire) this.isBreathFire = false;
        if (this.isBreathIce) this.isBreathIce = false;

        this.enemyState.life -= damage;

        this.healthUiText.setText(`${this.enemyState.life}/4000`);

        const damageText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.GALAXY, `-${damage}`, FONTS_SIZES.GALAXY, 1)
            .setTintFill(COLORS.RED)
            .setDropShadow(1, 1, COLORS.WHITE)
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

        this.setTintFill(0xDDDDDD);

        if (this.enemyState.life <= 0)
        {
            this.kill();
        }

        this.scene.time.addEvent({
            delay: 60,
            callback: () =>
            {
                this.clearTint();
            }
        });

        this.scene.time.addEvent({
            delay: 500,
            callback: () =>
            {
                this.isHurt = false;

                if (weapon !== 'skullHeadDemon' && !this.isSkullRotates && !this.isSkullAttack)
                {
                    this.handleSkullHeads();

                    const randomNbr = Phaser.Math.RND.between(0, 10);
                    if (randomNbr > 8)
                    {
                        this.callSkeleton();
                    }
                    if (randomNbr < 2)
                    {
                        this.callSkeletonSword();
                    }
                    if (randomNbr > 1 && randomNbr < 5)
                    {
                        this.callSkeletonFlail();
                    }
                }
            }
        });
    }

    public blockDoors ()
    {
        this.scene.battleWithBoss = true;
    }

    public unlockDoors ()
    {
        this.scene.battleWithBoss = false;
    }
}
