import HellHound from './HellHound';
import Thing from './Thing';
import Skeleton from './Skeleton';
import Ghost from './Ghost';
import Wizard from './Wizard';
import BurningGhoul from './BurningGhoul';
import Angel from './Angel';
import GameScene from '../scenes/GameScene';
import { FONTS, HEIGHT, WIDTH } from '../constant/config';
import LayerService from '../services/LayerService';
import { THitboxData } from '../types/types';
import Projectile from './Projectile';


export default class Demon extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; hited: boolean; skullHeadQuantity: number; speed: number; };
    public getFired: boolean = false;
    public isBreathFire: boolean = false;
    public isFollowingPath: boolean = false;
    public battleStarted: boolean = false;
    public skullRotates: boolean = false;
    public releaseEnemy: boolean = false;
    public fireBallAttackCount: number = 0;
    public phase: number = 0;
    public isDead: boolean = false;
    public diameter: { x: number; };
    public deathMsg;
    public twee: Phaser.Tweens.Tween;
    public skullTimer: Phaser.Time.TimerEvent;
    public skullTimer2: Phaser.Time.TimerEvent;
    public skullTimer3: Phaser.Time.TimerEvent;
    private isBattleMusic: boolean = false;
    private currentsong: Phaser.Sound.BaseSound;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.scene = scene;

        this.name = config.name;

        this.enemyState = {
            life: 10000,
            damage: 20,
            hited: false,
            skullHeadQuantity: 8,
            speed: 120,
        };

        this.setDepth(104).setOrigin(0, 0);

        this.hitboxData = JSON.parse('{"demon-breath-fire_0":{"hitboxes":[{"frame":"demon-breath-fire_0","type":"circle","x":82,"y":127,"width":18,"height":18}]},"demon-breath-fire_1":{"hitboxes":[{"frame":"demon-breath-fire_1","type":"rectangle","x":45,"y":138,"width":59,"height":35},{"frame":"demon-breath-fire_1","type":"circle","x":24,"y":157,"width":16,"height":16}]},"demon-breath-fire_2":{"hitboxes":[{"frame":"demon-breath-fire_2","type":"circle","x":17,"y":152,"width":23,"height":23},{"frame":"demon-breath-fire_2","type":"rectangle","x":48,"y":131,"width":67,"height":44}]},"demon-breath-fire_3":{"hitboxes":[{"frame":"demon-breath-fire_3","type":"circle","x":32,"y":128,"width":18,"height":18},{"frame":"demon-breath-fire_3","type":"rectangle","x":47,"y":123,"width":55,"height":53}]},"demon-breath-ice_0":{"hitboxes":[{"frame":"demon-breath-ice_0","type":"circle","x":82,"y":127,"width":18,"height":18}]},"demon-breath-ice_1":{"hitboxes":[{"frame":"demon-breath-ice_1","type":"rectangle","x":45,"y":138,"width":59,"height":35},{"frame":"demon-breath-ice_1","type":"circle","x":24,"y":157,"width":16,"height":16}]},"demon-breath-ice_2":{"hitboxes":[{"frame":"demon-breath-ice_2","type":"circle","x":17,"y":152,"width":23,"height":23},{"frame":"demon-breath-ice_2","type":"rectangle","x":48,"y":131,"width":67,"height":44}]},"demon-breath-ice_3":{"hitboxes":[{"frame":"demon-breath-ice_3","type":"circle","x":32,"y":128,"width":18,"height":18},{"frame":"demon-breath-ice_3","type":"rectangle","x":47,"y":123,"width":55,"height":53}]}}');

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setCircle(10, 121, 83)
            .setAllowGravity(false)
            .setCollideWorldBounds(true);

        this.diameter = { x: 0 };

        this.deathMsg = null;

        this.blockDoors();

        this.handleSkullHeads();
        // this.body.setVelocityX(-200);

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
                        hitbox.setActive(true).setVisible(true).setDepth(102).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0);
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

        this.on('animationcomplete', () =>
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
            // if (actualKey === 'demon-attack' && !this.releaseEnemy)
            // {
            //     this.isFollowingPath = false;
            //     this.body.setVelocity(0, 0);
            //     this.breathFire();
            //     this.anims.play('demon-attack-end', true);

            //     return;
            // }
            // if (actualKey === 'demon-attack' && this.releaseEnemy)
            // {
            //     this.isFollowingPath = false;
            //     this.body.setVelocity(0, 0);
            //     this.breathBlue();
            //     this.anims.play('demon-attack-end', true);

            //     return;
            // }
        });
        // this.addPath();
        this.startBattle();
        // this.twee = this.scene.tweens.add({
        //     targets: this.diameter,
        //     ease: 'Sine.easeInOut',
        //     duration: 4200,
        //     delay: 0,
        //     repeat: -1,
        //     loop: -1,
        //     yoyo: true,
        //     x: {
        //         getStart: () => 1,
        //         getEnd: () => 250,
        //     },
        // });
        // this.twee.play()
    }

    // availables anims
    // demon-idle
    // demon-attack
    // breathBlue
    // breathFire
    // fire-skull

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
        if (this.active && this.battleStarted && this.phase !== 1 && !this.isDead)
        {
            const { x, y } = this.body.center;

            if (!this.isBreathFire)
            {
                const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, x, y);

                if (distance < 150 && !this.isBreathFire) // && y < this.scene.player.y - 50)
                {
                    this.anims.play('demon-start-breath', true);
                }
                else if (distance > 200 && y > 415)
                {
                    this.releaseEnemy = true;
                    this.anims.play('demon-idle', true);
                }
            }
            if (x > this.scene.player.body.center.x && !this.isBreathFire)
            {
                if (this.flipX)
                {
                    this.flipX = false;
                }
            }
            else if (x < this.scene.player.body.center.x && !this.isBreathFire)
            {
                if (!this.flipX)
                {
                    this.flipX = true;
                }
            }

            // if (this.demonPath && this.isFollowingPath)
            // {
            //     // follow path
            //     const speed = this.enemyState.speed;
            //     const dx = this.demonPath.x - this.body.x;
            //     const dy = this.demonPath.y - this.body.y;
            //     const angle = Phaser.Math.Angle.Between(this.body.x, this.body.y, this.demonPath.x, this.demonPath.y); // Math.atan2(dy, dx);
            //     this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            // }

            if (this.skullRotates && this.phase !== 1)
            {
                Phaser.Actions.RotateAroundDistance(this.scene.skullHeads.getChildren(), {
                    x: this.body.center.x,
                    y: this.body.center.y
                }, 0.02, this.diameter.x);
            }
        }

        if (this.active && this.phase === 1)
        {
            this.scene.skullHeads.getChildren().forEach(e => e.destroy());
        }
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

    public handleSkullHeads ()
    {
        if (!this.active || this.phase === 1)
        {
            return;
        }
        this.skullTimer = this.scene.time.addEvent({
            delay: 20000,
            repeat: 0,
            callback: () =>
            {
                this.isFollowingPath = false;

                if (!this.active || this.phase === 1)
                {
                    return;
                }

                this.body.setVelocity(0, 0);

                const arrPositionsX = [this.body.x + 1500, this.body.x + 750, this.body.x, this.body.x - 750, this.body.x - 1500, this.body.x - 750, this.body.x, this.body.x + 750];
                const arrPositionsY = [this.body.y, this.body.y - 750, this.body.y - 1500, this.body.y - 750, this.body.y, this.body.y + 750, this.body.y + 1500, this.body.y + 750];

                const arrAngle = [0, Math.PI / 4, Math.PI / 2, 3 / 4 * Math.PI, Math.PI, 5 / 4 * Math.PI, 3 / 2 * Math.PI, 7 / 4 * Math.PI];

                for (let i = 0; i < this.enemyState.skullHeadQuantity; i += 1)
                {
                    this[`skull${i}`] = this.scene.skullHeads.getFirstDead(true, this.body.x, this.body.y, 'finalBoss', undefined, true);
                    if (this[`skull${i}`])
                    {
                        this[`skull${i}`].visible = true;
                        this[`skull${i}`].anims.play('fire-skull', true);
                        this[`skull${i}`].setDepth(103);
                        this[`skull${i}`].state = { damage: 25 };
                        this[`skull${i}`].name = 'skullHead';
                        this[`skull${i}`].body.setSize(24, 28).setOffset(12, 18).reset(arrPositionsX[i], arrPositionsY[i]);
                        this.scene.enemyGroup.push(this[`skull${i}`]);
                    }
                }
                // this.twee.play();
                this.skullRotates = true;
                this.scene.sound.play('demonSkullSummonSfx');
                this.skullHeadsAppears();
            }
        });


        // this.twee.play();
        // const skullhead = this.scene.skullHeads.getFirstDead(true, this.body.x, this.body.y, 'finalBoss', null, true);

    }

    public skullHeadsAppears ()
    {
        if (!this.active || this.phase === 1)
        {
            return;
        }
        this.skullTimer2 = this.scene.time.addEvent({
            delay: 10000,
            repeat: 0,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }

                // this.scene.skullGroup.forEach((skull) =>
                // {
                //     if (skull.active)
                //     {
                //         this.scene.sound.play('demonSkullAttackSfx', { volume: 0.1 });
                //         this.skullRotates = false;
                //         const angle = Phaser.Math.Angle.Between(skull.x, skull.y, this.scene.player.x, this.scene.player.y); // Math.atan2(dy, dx);
                //         skull.body.setVelocity(Math.cos(angle) * 400, Math.sin(angle) * 400);
                //         this.skullTimer3 = this.scene.time.addEvent({
                //             delay: 3000,
                //             repeat: 0,
                //             callback: () =>
                //             {
                //                 if (!this.active)
                //                 {
                //                     return;
                //                 }
                //                 skull.destroy();
                //             }
                //         });
                //     }

                // });
                this.isFollowingPath = true;
                this.handleSkullHeads();
            }
        });
    }

    public skullAttack ()
    {
        // return;
        // const lavaFireTimer = this.scene.time.addEvent({
        //     startAt: 100,
        //     delay: 1000,
        //     repeat: 0,
        //     callback: () =>
        //     {
        //         if (!this.active)
        //         {
        //             return;
        //         }
        //         if (lavaFireTimer.repeatCount === 3)
        //         {
        //             this.anims.play('demon-idle', true);
        //             // this.body.reset(200, 24 *16);

        //         }
        //         if (lavaFireTimer.repeatCount === 2)
        //         {
        //             this.anims.play('demon-idle', true);

        //             // this.body.reset(79, 24 *16);
        //         }
        //         if (lavaFireTimer.repeatCount === 1)
        //         {
        //             this.anims.play('demon-idle', true);

        //             // this.body.reset(318, 24 *16);
        //         }
        //         if (lavaFireTimer.repeatCount === 0)
        //         {

        //             // this.setAlpha(0);
        //             this.enemyState.damage = 0;
        //             // this.body.setVelocityX(0)
        //             // this.body.reset(-100, -100);

        //             this.isLavaAttack = false;
        //             lavaFireTimer.destroy();
        //         }
        //     },
        // });
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

    public startBattle ()
    {
        // this.body.reset(35 * 16 - this.width / 2, 8 * 16 - this.height / 2);

        this.anims.play('demon-idle', true);

        const text = ['Hey kid...', 'I\'m waiting for you ...'];
        this.scene.player.anims.play('stand', true);
        // @ts-ignore
        const ui = this.scene.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 8, WIDTH, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(1999)
            .setScrollFactor(0)
            .setVisible(true);

        let index = 0;

        const msg = this.scene.add.bitmapText(WIDTH / 32, HEIGHT - 48, FONTS.MINIMAL, text[index], 22, 1)
            .setOrigin(0, 0).setLetterSpacing(1).setAlpha(1).setDepth(2000).setScrollFactor(0, 0);

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
                        this.scene.player.isPause = false;
                        dialog.removeAllListeners();

                        this.checkMusic();

                        const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getGroundLayers(this.scene).filter(l => l.name === 'ground/ground')[0];

                        layer.putTileAt(734 + 17, 8, 14, true);
                        layer.putTileAt(797 + 17, 8, 15);
                        layer.putTileAt(860 + 17, 8, 16);

                        this.scene.colliderLayer.putTileAt(1, 8, 14).setCollision(true, true, true, true, true);
                        this.scene.colliderLayer.putTileAt(1, 8, 15).setCollision(true, true, true, true, true);
                        this.scene.colliderLayer.putTileAt(1, 8, 16).setCollision(true, true, true, true, true);
                        console.log(this.scene.colliderLayer.getTileAt(8, 14))

                        this.battleStarted = true;
                        // this.scene.player.state.pause = false;
                        this.scene.sound.play('demonScreamSfx');
                    }
                });
            }
        });

        // this.scene.player.state.pause = true;

        
        // const startTimer = this.scene.time.addEvent({
        //     delay: 2000,
        //     repeat: 5,
        //     callback: () =>
        //     {
        //         if (startTimer.repeatCount === 5)
        //         {
        //             this.showMsg
        //                 .setX(this.scene.player.x + 48)
        //                 .setY(this.scene.player.y - 48)
        //                 .setText('Hello');
        //         }

        //         if (startTimer.repeatCount === 4)
        //         {
        //             this.showMsg.setText('My name is Acharis');
        //         }
        //         if (startTimer.repeatCount === 3)
        //         {
        //             this.showMsg.setText('You killed my father');
        //         }
        //         if (startTimer.repeatCount === 2)
        //         {
        //             this.showMsg.setText('Prepare to die');
        //             this.scene.sound.play('hellBeastFirstLaughSfx');
        //         }
        //         if (startTimer.repeatCount === 1)
        //         {
        //             this.showMsg.destroy();
        //             this.setFlipX(true);
        //             this.body.setOffset(75, 64);
        //         }
        //         if (startTimer.repeatCount === 0)
        //         {
        //             this.setFlipX(false);
        //             this.body.setOffset(56, 64);
        //             this.battleStarted = true;
        //             // this.scene.player.state.pause = false;
        //             this.scene.sound.play('demonScreamSfx');
        //             startTimer.destroy();
        //             this.scene.stopMusic();
        //             this.scene.demonFight1.play();
        //         }
        //     }
        // });
    }

    public startPhase1 ()
    {
        // if (this.scene.player.state.dead)
        // {
        //     return;
        // }
        this.scene.demonFight1.stop();
        this.scene.demonLighting.play();
        this.phase = 1;
        this.isBreathFire = false;
        this.skullRotates = false;
        this.isFollowingPath = false;
        this.enemyState.life = 30000;
        this.scene.player.anims.play('stand');
        // this.scene.player.state.pause = true;

        this.body.setVelocity(0, 0);
        this.scene.cameras.main.startFollow(this);


        // this.showMsg = this.scene.add.bitmapText(this.body.x, this.body.y - 48, FONTS.MINIMAL, '', 8, 1)
        //     .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);

        // const startTimer = this.scene.time.addEvent({
        //     delay: 2000,
        //     repeat: 4,
        //     callback: () =>
        //     {
        //         if (startTimer.repeatCount === 4)
        //         {
        //             this.showMsg.setText('Kid...');
        //         }
        //         if (startTimer.repeatCount === 3)
        //         {
        //             this.showMsg.setText('I\'m bored to play with you');
        //         }
        //         if (startTimer.repeatCount === 2)
        //         {
        //             this.showMsg.setText('Let\'s end this joke');
        //         }
        //         if (startTimer.repeatCount === 1)
        //         {
        //             this.showMsg.destroy();

        //             const positionX = this.flipX ? this.body.x + 74 : this.body.x - 12;

        //             // this.demonThunder = this.scene.thunderPower.getFirstDead(true, -100, this.scene.player.body.x - 256, 'storm', undefined, true);

        //             // if (this.demonThunder)
        //             // {
        //             //     this.scene.cameras.main.startFollow(this.scene.player);
        //             //     this.demonThunder.visible = true;
        //             //     this.demonThunder.anims.play('thunder-magic', true);
        //             //     // this.demonThunder.on('animationcomplete', () => {
        //             //     //   //this.demonThunder.destroy();
        //             //     // });
        //             //     this.demonThunder.setDepth(105);
        //             //     this.demonThunder.state = { damage: 30 };
        //             //     this.demonThunder.name = 'demonThunder';

        //             //     // const dx = this.scene.player.x - this.x;
        //             //     // const dy = this.scene.player.y - this.y;
        //             //     // const angle = Math.atan2(dy, dx);

        //             //     this.demonThunder.body.setSize(32, 240).setOffset(24, 0);
        //             //     // this.scene.player.state.pause = true;
        //             //     this.scene.player.anims.play('duck', true);
        //             //     this.scene.player.body.setSize(10, 15, true).setOffset(21, 20);
        //             //     this.scene.player.body.setVelocity(0, 0);
        //             //     this.demonThunder.body.reset(this.scene.player.body.center.x, -100);
        //             //     this.demonThunder.body.setVelocity(0, 1900);
        //             //     this.scene.thunderGateSfx.play();
        //             //     this.scene.time.addEvent({
        //             //         delay: 2000,
        //             //         callback: () =>
        //             //         {
        //             //             this.scene.sound.play('demonlightingLaughSfx');
        //             //         }
        //             //     });

        //             //     // destroy all enemies
        //             //     this.scene.enemyGroup.forEach(enemy =>
        //             //     {
        //             //         if (enemy.active && enemy.name !== 'demon')
        //             //         {
        //             //             this.scene.enemyExplode(enemy.body.x, enemy.body.y);
        //             //             enemy.destroy();
        //             //         }
        //             //     });
        //             // }
        //         }
        //     }
        // });
    }

    public startPhase3 ()
    {
        if (this.isDead)
        {
            return;
        }
        this.isDead = true;
        // this.scene.player.inventory.bossFinal = true;
        this.isFollowingPath = false;
        this.body.setVelocity(0, 0);
        this.deathMsg = this.scene.add.bitmapText(this.body.x - 140, this.body.y - 48, FONTS.MINIMAL, '', 10, 1).setDepth(300);

        const demonExplode = this.scene.time.addEvent({
            delay: 150,
            repeat: 30,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }
                const X = Phaser.Math.Between(this.body.x, this.body.x + this.body.width);
                const Y = Phaser.Math.Between(this.body.y, this.body.y + this.body.height);
                this.scene.enemyExplode(X, Y);
                this.scene.sound.play('demonDyingFireSfx');

                if (demonExplode.repeatCount === 1)
                {
                    this.scene.sound.play('demonDeathSfx', { rate: 0.5 });
                }
                if (demonExplode.repeatCount > 25)
                {
                    this.deathMsg.setText(`
          No
          `);
                }
                if (demonExplode.repeatCount < 26)
                {
                    this.deathMsg.setText(`
          NOooooo
          `);
                }
                if (demonExplode.repeatCount < 16)
                {
                    this.deathMsg.setText(`
          You got your revenge
                  but
          this is not the end`);
                }
                if (demonExplode.repeatCount < 6)
                {
                    this.deathMsg.setText(`
          Survive this castle
            or i'll see you
              in hell!`);
                }

                if (demonExplode.repeatCount === 0)
                {
                    this.scene.heart = this.scene.physics.add.sprite(this.body.center.x, this.body.center.y, 'heart');
                    this.scene.heart.setDepth(105);
                    // @ts-ignore
                    this.scene.heart.health = 500;
                    // @ts-ignore
                    this.scene.heart.body.setSize(23, 21);
                    this.scene.heart.anims.play('heart');
                    this.scene.heartGroup.push(this.scene.heart);
                    this.body.reset(-1000, -1000);
                    // this.scene.player.inventory.escape = true;
                    this.deathMsg.destroy();
                }
            }
        });
    }

    public looseLife (e: number)
    {
        this.scene.sound.play('demonHitSfx');
        this.enemyState.life = this.enemyState.life - e;
    }

    public explode ()
    {
        this.isDead = true;
        this.body.setVelocity(0, 0);
        this.unlockDoors();
    }

    public blockDoors ()
    {
        this.scene.battleWithBoss = true;
    }

    public unlockDoors ()
    {
        this.scene.battleWithBoss = false;
    }

    public checkCollision (d)
    {
        return;
    }
}
