import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES, HEIGHT, WIDTH } from '../constant/config';
import DEPTH from '../constant/depth';
import Arrow from '../player/items/Arrow';
import Sword from '../player/items/Sword';
import GameScene from '../scenes/GameScene';
import LayerService from '../services/LayerService';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class WaterQueen extends Enemy
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; hited: boolean; giveLife: number };
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    public isDead: boolean = false;
    private isBattleMusic: boolean = false;
    private currentsong: Phaser.Sound.BaseSound;
    private waterSfx: Phaser.Sound.BaseSound;
    public isHit: boolean = false;
    public isAttacking: boolean = false;
    public speed: number = 90;
    public xp: number = 200;
    private animsStack = ['waterQueenAttack1', 'waterQueenAttack3', 'waterQueenAttack2', 'waterQueenAttack4'];
    private animsStackCount = 0;
    private healthUiBack: Phaser.GameObjects.Image;
    private healthUiText: Phaser.GameObjects.BitmapText;
    laughSfx: Phaser.Sound.BaseSound;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);



        this.name = config.name;

        this.hitboxData = JSON.parse('{"waterQueenAttack1_2":{"hitboxes":[{"frame":"waterQueenAttack1_2","type":"rectangle","x":142,"y":86,"width":26,"height":2}]},"waterQueenAttack1_3":{"hitboxes":[{"frame":"waterQueenAttack1_3","type":"rectangle","x":143,"y":86,"width":27,"height":2}]},"waterQueenAttack2_2":{"hitboxes":[{"frame":"waterQueenAttack2_2","type":"rectangle","x":143,"y":86,"width":27,"height":2}]},"waterQueenAttack2_3":{"hitboxes":[{"frame":"waterQueenAttack2_3","type":"rectangle","x":143,"y":86,"width":27,"height":2}]},"waterQueenAttack2_7":{"hitboxes":[{"frame":"waterQueenAttack2_7","type":"circle","x":101,"y":67,"width":40,"height":40}]},"waterQueenAttack2_8":{"hitboxes":[{"frame":"waterQueenAttack2_8","type":"circle","x":101,"y":67,"width":40,"height":40}]},"waterQueenAttack2_14":{"hitboxes":[{"frame":"waterQueenAttack2_14","type":"rectangle","x":141,"y":84,"width":53,"height":5}]},"waterQueenAttack2_15":{"hitboxes":[{"frame":"waterQueenAttack2_15","type":"rectangle","x":142,"y":86,"width":26,"height":2},{"frame":"waterQueenAttack2_15","type":"circle","x":175,"y":81,"width":13,"height":13}]},"waterQueenAttack2_16":{"hitboxes":[{"frame":"waterQueenAttack2_16","type":"rectangle","x":143,"y":86,"width":27,"height":2}]},"waterQueenAttack2_17":{"hitboxes":[{"frame":"waterQueenAttack2_17","type":"rectangle","x":143,"y":86,"width":27,"height":2}]},"waterQueenAttack3_2":{"hitboxes":[{"frame":"waterQueenAttack3_2","type":"rectangle","x":142,"y":86,"width":26,"height":2}]},"waterQueenAttack3_3":{"hitboxes":[{"frame":"waterQueenAttack3_3","type":"rectangle","x":143,"y":86,"width":27,"height":2}]},"waterQueenAttack3_7":{"hitboxes":[{"frame":"waterQueenAttack3_7","type":"circle","x":101,"y":67,"width":41,"height":41}]},"waterQueenAttack3_8":{"hitboxes":[{"frame":"waterQueenAttack3_8","type":"circle","x":100,"y":67,"width":41,"height":41}]},"waterQueenAttack3_14":{"hitboxes":[{"frame":"waterQueenAttack3_14","type":"rectangle","x":141,"y":84,"width":53,"height":5}]},"waterQueenAttack3_15":{"hitboxes":[{"frame":"waterQueenAttack3_15","type":"rectangle","x":142,"y":86,"width":26,"height":1},{"frame":"waterQueenAttack3_15","type":"circle","x":175,"y":81,"width":13,"height":13}]},"waterQueenAttack3_16":{"hitboxes":[{"frame":"waterQueenAttack3_16","type":"rectangle","x":149,"y":57,"width":10,"height":54}]},"waterQueenAttack3_17":{"hitboxes":[{"frame":"waterQueenAttack3_17","type":"circle","x":101,"y":53,"width":55,"height":55}]},"waterQueenAttack3_18":{"hitboxes":[{"frame":"waterQueenAttack3_18","type":"circle","x":105,"y":58,"width":45,"height":45},{"frame":"waterQueenAttack3_18","type":"circle","x":106,"y":98,"width":12,"height":12}]},"waterQueenAttack3_19":{"hitboxes":[{"frame":"waterQueenAttack3_19","type":"rectangle","x":136,"y":99,"width":24,"height":12}]},"waterQueenAttack3_20":{"hitboxes":[{"frame":"waterQueenAttack3_20","type":"circle","x":151,"y":74,"width":33,"height":33}]},"waterQueenAttack3_21":{"hitboxes":[{"frame":"waterQueenAttack3_21","type":"circle","x":168,"y":66,"width":44,"height":44}]},"waterQueenAttack3_22":{"hitboxes":[{"frame":"waterQueenAttack3_22","type":"circle","x":168,"y":66,"width":44,"height":44}]},"waterQueenAttack3_23":{"hitboxes":[{"frame":"waterQueenAttack3_23","type":"rectangle","x":193,"y":65,"width":11,"height":46}]},"waterQueenAttack4_1":{"hitboxes":[{"frame":"waterQueenAttack4_1","type":"circle","x":162,"y":84,"width":13,"height":13}]},"waterQueenAttack4_2":{"hitboxes":[{"frame":"waterQueenAttack4_2","type":"circle","x":161,"y":65,"width":18,"height":18}]},"waterQueenAttack4_3":{"hitboxes":[{"frame":"waterQueenAttack4_3","type":"circle","x":154,"y":51,"width":23,"height":23},{"frame":"waterQueenAttack4_3","type":"circle","x":165,"y":59,"width":18,"height":18}]},"waterQueenAttack4_4":{"hitboxes":[{"frame":"waterQueenAttack4_4","type":"circle","x":146,"y":37,"width":33,"height":33},{"frame":"waterQueenAttack4_4","type":"circle","x":165,"y":45,"width":22,"height":22}]},"waterQueenAttack4_5":{"hitboxes":[{"frame":"waterQueenAttack4_5","type":"circle","x":157,"y":32,"width":33,"height":33},{"frame":"waterQueenAttack4_5","type":"circle","x":147,"y":48,"width":21,"height":21}]},"waterQueenAttack4_6":{"hitboxes":[{"frame":"waterQueenAttack4_6","type":"circle","x":148,"y":29,"width":28,"height":28},{"frame":"waterQueenAttack4_6","type":"circle","x":160,"y":42,"width":27,"height":27}]},"waterQueenAttack4_7":{"hitboxes":[{"frame":"waterQueenAttack4_7","type":"circle","x":148,"y":25,"width":41,"height":41}]},"waterQueenAttack4_8":{"hitboxes":[{"frame":"waterQueenAttack4_8","type":"circle","x":150,"y":25,"width":38,"height":38}]},"waterQueenAttack4_9":{"hitboxes":[{"frame":"waterQueenAttack4_9","type":"circle","x":150,"y":25,"width":37,"height":37}]},"waterQueenAttack4_10":{"hitboxes":[{"frame":"waterQueenAttack4_10","type":"circle","x":151,"y":24,"width":37,"height":37}]},"waterQueenAttack4_11":{"hitboxes":[{"frame":"waterQueenAttack4_11","type":"rectangle","x":161,"y":33,"width":17,"height":56}]},"waterQueenAttack4_12":{"hitboxes":[{"frame":"waterQueenAttack4_12","type":"rectangle","x":137,"y":89,"width":62,"height":22}]},"waterQueenAttack4_13":{"hitboxes":[{"frame":"waterQueenAttack4_13","type":"rectangle","x":143,"y":77,"width":59,"height":33}]},"waterQueenAttack4_14":{"hitboxes":[{"frame":"waterQueenAttack4_14","type":"rectangle","x":142,"y":75,"width":61,"height":35}]},"waterQueenAttack4_15":{"hitboxes":[{"frame":"waterQueenAttack4_15","type":"rectangle","x":133,"y":93,"width":66,"height":17}]},"waterQueenAttack4_22":{"hitboxes":[{"frame":"waterQueenAttack4_22","type":"rectangle","x":129,"y":102,"width":81,"height":9}]},"waterQueenAttack4_23":{"hitboxes":[{"frame":"waterQueenAttack4_23","type":"rectangle","x":129,"y":101,"width":81,"height":9}]},"waterQueenAttack4_24":{"hitboxes":[{"frame":"waterQueenAttack4_24","type":"rectangle","x":129,"y":102,"width":81,"height":9}]},"waterQueenAttack4_25":{"hitboxes":[{"frame":"waterQueenAttack4_25","type":"rectangle","x":129,"y":101,"width":81,"height":9}]},"waterQueenAttack4_26":{"hitboxes":[{"frame":"waterQueenAttack4_26","type":"rectangle","x":129,"y":101,"width":81,"height":9}]},"waterQueenAttack4_27":{"hitboxes":[{"frame":"waterQueenAttack4_27","type":"rectangle","x":129,"y":102,"width":81,"height":9}]},"waterQueenAttack4_28":{"hitboxes":[{"frame":"waterQueenAttack4_28","type":"rectangle","x":128,"y":104,"width":81,"height":6}]},"waterQueenAttack4_29":{"hitboxes":[{"frame":"waterQueenAttack4_29","type":"rectangle","x":127,"y":108,"width":83,"height":3},{"frame":"waterQueenAttack4_29","type":"rectangle","x":202,"y":102,"width":7,"height":4}]},"waterQueenAttack4_30":{"hitboxes":[{"frame":"waterQueenAttack4_30","type":"rectangle","x":199,"y":106,"width":11,"height":4}]},"waterQueenDefend_1":{"hitboxes":[{"frame":"waterQueenDefend_1","type":"rectangle","x":126,"y":71,"width":26,"height":38}]},"waterQueenDefend_2":{"hitboxes":[{"frame":"waterQueenDefend_2","type":"rectangle","x":121,"y":67,"width":25,"height":43}]},"waterQueenDefend_3":{"hitboxes":[{"frame":"waterQueenDefend_3","type":"rectangle","x":121,"y":67,"width":25,"height":43}]},"waterQueenDefend_4":{"hitboxes":[{"frame":"waterQueenDefend_4","type":"rectangle","x":121,"y":67,"width":26,"height":43}]},"waterQueenDefend_5":{"hitboxes":[{"frame":"waterQueenDefend_5","type":"rectangle","x":121,"y":68,"width":25,"height":43}]},"waterQueenDefend_6":{"hitboxes":[{"frame":"waterQueenDefend_6","type":"rectangle","x":126,"y":72,"width":19,"height":38}]},"waterQueenDefend_7":{"hitboxes":[{"frame":"waterQueenDefend_7","type":"rectangle","x":130,"y":95,"width":12,"height":15}]}}');

        this.setTexture('atlas').setFrame('waterQueenIdle_0').setDepth(DEPTH.GROUND_LAYER - 1);

        this.anims.play('waterQueenIdle');

        this.waterSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setAllowGravity(true).setSize(12, 35).setOffset(107, 76);

        this.enemyState = {
            life: 2000,
            damage: 5,
            hited: false,
            giveLife: 30
        };

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            const anim = this.anims.getName();

            const { down } = this.body.blocked;

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
                        this.isAttacking = true;

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
                            hitbox.body.reset(this.getTopRight().x - element.x - element.width, this.getTopLeft().y + element.y);
                        }
                        else
                        {
                            hitbox.body.reset(this.getTopLeft().x + element.x, this.getTopLeft().y + element.y);
                        }

                        this.scene.projectileGroup.push(hitbox);
                        this.hitbox.push(hitbox);

                        if (!this.waterSfx.isPlaying)
                        {
                            this.waterSfx.play();
                        }
                    }
                });

            }
            else if (this.hitbox.length)
            {
                this.destroyHitbox();
            }

            if (this.scene.player.playerState.isDead)
            {
                this.body.setVelocityX(0);
                this.anims.play('waterQueenIdle', true);
            }

            if (this.scene.player.body.center.x <= this.body.center.x && down)
            {
                switch (true)
                {
                    case anim === 'waterQueenSurf':
                        this.body.setVelocityX(-90);
                        break;

                    case anim.startsWith('waterQueenAttack1') || anim.startsWith('waterQueenAttack2'):
                        this.body.setVelocityX(-30);
                        break;

                    default:
                        this.body.setVelocityX(0);
                        break;
                }
            }
            else if (this.scene.player.body.center.x > this.body.center.x && down)
            {
                switch (true)
                {
                    case anim === 'waterQueenSurf':
                        this.body.setVelocityX(90);
                        break;

                    case anim.startsWith('waterQueenAttack1') || anim.startsWith('waterQueenAttack2'):
                        this.body.setVelocityX(30);
                        break;

                    default:
                        this.body.setVelocityX(0);
                        break;
                }
            }

            if (anim === 'waterQueenHeal' && frame === 'waterQueenHeal_6' && this.enemyState.life < 1990)
            {
                const healText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.GALAXY, `+ 10`, FONTS_SIZES.GALAXY, 1)
                    .setTintFill(COLORS.GREEN)
                    .setDropShadow(1, 1, COLORS.WHITE, 1)
                    .setDepth(DEPTH.UI_TEXT + 4);

                this.enemyState.life += 10;

                this.healthUiText.setText(`${this.enemyState.life}/2000`);

                this.scene.tweens.add({
                    targets: healText,
                    duration: 1500,
                    y: {
                        from: this.body.top,
                        to: this.body.top - 32
                    },
                    alpha: 0,
                    onComplete: () => healText.destroy()
                });
            }


        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            if (this.isDead) return;

            const anim = this.anims.getName();

            if (anim === 'waterQueenHurt')
            {
                this.anims.play('waterQueenDefend', true);

                return;
            }

            if (anim === 'waterQueenDefend')
            {
                const random = Phaser.Math.RND.between(1, 3);
                this.facePlayer();
                switch (random)
                {
                    case 1:
                        this.anims.play('waterQueenAttack1', true);
                        break;
                    case 2:
                        this.anims.play('waterQueenTumble', true);
                        break;
                    case 3:
                        this.anims.play('waterQueenAttack3', true);
                        break;

                    default:
                        break;
                }

                return;
            }

            if (this.isHit)
            {
                return;
            }

            if (anim === 'waterQueenTumble')
            {
                this.anims.play('waterQueenFall', true);

                return;
            }

            const { x: playerPosX, y: playerPosY } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(playerPosX, playerPosY, this.body.center.x, this.body.center.y);

            if (anim === 'waterQueenAttack3' || anim === 'waterQueenAttack4')
            {
                this.anims.play('waterQueenHeal', true);

                return;
            }

            if (distance > 32 && distance < 72)
            {
                this.anims.play(this.animsStack[this.animsStackCount], true);

                this.animsStackCount += 1;

                if (this.animsStackCount > 3) this.animsStackCount = 0;

                return;
            }

            this.anims.play('waterQueenSurf', true);
        });

        this.blockDoors();

        this.startBattle();
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && !this.isDead)
        {
            const anim = this.anims.getName();

            const { blocked } = this.body;

            if (anim === 'waterQueenTumble')
            {
                this.body.setVelocityY(-150);
            }
            else
            {
                this.body.setVelocityY(150);
            }

            if (this.x >= this.scene.player.x && !anim.startsWith('waterQueenAttack') && anim !== 'waterQueenDefend')
            {
                this.setFlipX(true);

                if (!blocked.down) this.body.setVelocityX(-80);
            }
            else if (this.x < this.scene.player.x && !anim.startsWith('waterQueenAttack') && anim !== 'waterQueenDefend')
            {
                this.setFlipX(false);

                if (!blocked.down) this.body.setVelocityX(80);
            }
        }
        if (this.active && this.isDead)
        {
            const { blocked } = this.body;
            if (blocked.down)
            {
                this.body.stop().setEnable(false);
            }
        }

    }

    public startBattle ()
    {
        const text = [`Ohh...`, 'You came to save me', 'So nice', 'He locked me up here...', `Don't you wonder why??`, 'Hahaha ...'];

        this.scene.setPause();

        this.scene.player.isPause = true;

        // this.scene.sound.play('hellBeastFirstLaughSfx');

        // @ts-ignore
        const ui = this.scene.add.rexNinePatch(WIDTH / 2, HEIGHT / 4, WIDTH, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0)
            .setVisible(true);

        let index = 0;

        const msg = this.scene.add.bitmapText(WIDTH / 32, HEIGHT / 4 - 12, FONTS.MINIMAL, text[index], FONTS_SIZES.MINIMAL, 1)
            .setOrigin(0, 0).setLetterSpacing(1).setAlpha(1).setDepth(DEPTH.UI_TEXT).setScrollFactor(0, 0).setTintFill(COLORS.STEEL_GRAY);

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

                this.laughSfx = this.scene.sound.add('womanSfx', { volume: 1.4, rate: 1.5, detune: 400 });
                this.laughSfx.play();
                this.scene.time.addEvent({
                    delay: 150,
                    repeat: 2,
                    callback: () =>
                    {
                        this.laughSfx.play();
                    }
                });
                // this.laughSfx.once(Phaser.Sound.Events.COMPLETE, () =>
                // {
                //     this.laughSfx.play();
                //     this.laughSfx.once(Phaser.Sound.Events.COMPLETE, () =>
                //     {
                //         this.laughSfx.play();
                //     });
                // });

                this.scene.sound.play('womanSfx', { volume: 1.4, rate: 0.6, });

                this.scene.time.addEvent({
                    delay: 150,
                    callback: () =>
                    {
                        this.scene.player.isPause = false;
                        dialog.removeAllListeners();

                        this.checkMusic();

                        this.healthUiBack = this.scene.add.image(425, 0, 'parchment').setScrollFactor(0, 0).setDepth(DEPTH.UI_BACK).setOrigin(0, 0).setFlipX(true);

                        this.healthUiText = this.scene.add.bitmapText(435, 9, FONTS.GALAXY, `${this.enemyState.life}/2000`, FONTS_SIZES.GALAXY, 1)
                            .setScrollFactor(0, 0).setDepth(DEPTH.UI_TEXT).setTintFill(COLORS.STEEL_GRAY);

                        const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getGroundLayers(this.scene).find(l => l.name === 'ground/ground') as Phaser.Tilemaps.TilemapLayer;

                        layer.putTileAt(734 + 17, 0, 30, true);
                        layer.putTileAt(797 + 17, 0, 31);
                        layer.putTileAt(860 + 17, 0, 32);
                    }
                });
            }
        });
    }

    public looseLife (damage: number, weaponType: EWeaponType, weapon?: Sword | Arrow): void
    {
        if (this.isHit || this.isDead || this.isAttacking)
        {
            return;
        }

        const anim = this.anims.getName();

        if (anim === 'waterQueenDefend' || anim.startsWith('waterQueenAttack'))
        {
            if (weaponType === 'arrow')
            {
                const arrow = weapon as Arrow;
                arrow.deflect();
            }

            return;
        }

        this.isHit = true;

        if (!this.isAttacking)
        {
            this.anims.play('waterQueenHurt', true);
            this.scene.playSfx('womanSfx', { volume: 1.4, rate: 0.6 });
        }
        else
        {
            this.setTintFill(0xDDDDDD);
        }

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

        this.healthUiText.setText(`${this.enemyState.life}/2000`);

        if (this.enemyState.life <= 0)
        {
            this.healthUiText.setText(`0/2000`);

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

        // this.body.stop().setEnable(false);

        this.clearTint();

        // this.playSfxDeath();

        this.destroyHitbox();

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        SaveLoadService.setEnemiesDeathCount();

        SaveLoadService.setDeadBoss(this.scene, 2);

        this.anims.play('waterQueenDeath', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.setFrame('waterQueenDeath_15');

            this.flash(1000);

            this.healthUiText.destroy();

            this.healthUiBack.destroy();

            if (this.isBattleMusic)
            {
                this.scene.stopMusic();

                this.scene.setPause();
                this.scene.player.isPause = true;
            }
        });
    }

    private flash (time: number)
    {
        this.scene.tweens.add({
            targets: this,
            duration: time / 2,
            alpha: 0,
            yoyo: true
        });
        // this.scene.bossBattleMusic.stop();

        this.scene.time.addEvent({
            delay: time,
            callback: () =>
            {
                if (time > 0)
                {
                    this.clearTint();
                    this.scene.bossBattleMusic.play({ loop: true, rate: time / 100 / 2 });
                    this.flash(time - Phaser.Math.Clamp(time / 10, 20, 100));
                }
                else
                {
                    this.setTintFill(0xDDDDDD);
                    this.scene.flashCamera(2000);
                    this.scene.shakeCamera(500);
                    this.endBattle();
                    LayerService.showSecretPath(this.scene);
                    this.destroy();
                }
            }
        });
    }

    private endBattle ()
    {
        this.clearTint();
        this.setAlpha(0);
        this.currentsong.play();
        this.scene.unPause();
        this.scene.player.isPause = false;
        this.giveLife(this.body.center.x, this.body.center.y);
        this.unlockDoors();
    }

    private facePlayer ()
    {
        if (this.scene.player.body.center.x <= this.body.center.x)
        {
            this.setFlipX(true);
        }
        else if (this.scene.player.body.center.x > this.body.center.x)
        {
            this.setFlipX(false);
        }
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

    public blockDoors ()
    {
        this.scene.battleWithBoss = true;
    }

    public unlockDoors ()
    {
        this.scene.battleWithBoss = false;
        // this.scene.player.inventory.boss1 = true;
    }

    private destroyHitbox (): void
    {
        this.hitbox?.forEach(h =>
        {
            h.explode();
            h.setActive(false);
            h.body.setEnable(false);
        });
        this.isAttacking = false;
    }
}