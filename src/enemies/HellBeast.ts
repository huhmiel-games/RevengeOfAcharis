import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES, HEIGHT, WIDTH } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import LayerService from '../services/LayerService';

export default class HellBeast extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; directionX: number; directionY: number; hited: boolean; lastFired: number; fireRate: number; };
    public isAppearing: boolean = false;
    public isFiring: boolean = false;
    public isHidden: boolean = true;
    public isLavaAttack: boolean = false;
    public hellBeastTimer: Phaser.Time.TimerEvent | undefined;
    public fireBallAttackCount: number = 0;
    public isDead: boolean = false;
    public fadingTween: Phaser.Tweens.Tween;
    private isBattleMusic: boolean = false;
    private currentsong: Phaser.Sound.BaseSound;
    private healthUiText: Phaser.GameObjects.BitmapText;
    private healthUiBack: Phaser.GameObjects.Image;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.scene = scene;

        this.name = config.name;

        this.enemyState = {
            life: 2000,
            damage: 0,
            directionX: -550,
            directionY: 0,
            hited: false,
            lastFired: 0,
            fireRate: 20,
        };

        this.setDepth(DEPTH.FRONT_LAYER + 1);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setAllowGravity(true)
            .setSize(64, 64);

        this.blockDoors();

        this.startBattle();

        this.healthUiBack = this.scene.add.image(425, 0, 'parchment').setScrollFactor(0, 0).setDepth(DEPTH.UI_BACK).setOrigin(0, 0).setFlipX(true);

        this.healthUiText = this.scene.add.bitmapText(435, 9, FONTS.GALAXY, `${this.enemyState.life}/2000`, FONTS_SIZES.GALAXY, 1)
            .setScrollFactor(0, 0).setDepth(DEPTH.UI_TEXT).setTintFill(COLORS.STEEL_GRAY);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            const currentAnim = this.anims.getName();

            if (this.isDead && currentAnim === 'hell-beast-burn')
            {
                this.anims.play({ key: 'hell-beast-lava', repeat: -1 }, true);

                return;
            }

            if (this.isLavaAttack && currentAnim === 'hell-beast-burn')
            {
                this.anims.play('hell-beast-lava', true);

                this.scene.sound.play('hellBeastLavaAttackSfx');

                this.enemyState.damage = 25;

                this.body.setSize(64, 160);

                this.scene.shakeCamera(350);

                this.body.reset(this.body.x + 32, 528 - this.body.height / 2);
                this.body.setVelocityX(Phaser.Math.Between(-50, 50));

                return;
            }

            if (currentAnim === 'hell-beast-breath')
            {
                this.shootThePlayer();

                this.scene.sound.play('hellBeastFireballSfx');

                return;
            }

            if (currentAnim === 'hell-beast-breath-stroke')
            {
                this.shootThePlayer();

                this.scene.sound.play('hellBeastFireballSfx');

                return;
            }
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && !this.isDead)
        {
            if (this.x > this.scene.player.x)
            {
                this.flipX = false;
            }
            else if (this.x < this.scene.player.x)
            {
                this.flipX = true;
            }
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

    public startBattle ()
    {
        const text = [`Hmm fresh meat...`];

        this.scene.setPause();

        this.scene.player.isPause = true;

        this.scene.sound.play('hellBeastFirstLaughSfx');

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
                        this.scene.player.isPause = false;
                        dialog.removeAllListeners();

                        this.checkMusic();

                        this.handleHellBeast();

                        const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getGroundLayers(this.scene).filter(l => l.name === 'ground/ground')[0];

                        layer.putTileAt(734 + 17, 0, 30, true);
                        layer.putTileAt(797 + 17, 0, 31);
                        layer.putTileAt(860 + 17, 0, 32);
                    }
                });
            }
        });
    }

    public handleHellBeast ()
    {
        if (this.hellBeastTimer !== undefined || !this.active || this.isDead || !this.scene)
        {
            return;
        }

        this.hellBeastTimer = this.scene.time.addEvent({
            delay: this.enemyState.life,
            callback: () =>
            {
                if (this.isHidden && this.active && !this.isDead)
                {
                    this.isAppearing = true;
                    this.appears();
                    this.hellBeastTimer = undefined;
                }
            },
        });
    }

    public appears ()
    {
        if (!this.isAppearing || this.isDead)
        {
            return;
        }
        this.isAppearing = false;

        this.hellBeastTimer = undefined;

        const selectAnim = this.enemyState.life > 1000 ? 'hell-beast-idle' : 'hell-beast-idle-stroke';

        this.anims.play(selectAnim, true);

        this.body.setSize(64, 64);

        const randomX = Phaser.Math.Between(80, 480);

        this.body.reset(randomX, 528 - this.body.height / 2);

        this.scene.sound.play('hellBeastAppearLaughSfx');

        this.fadingTween = this.scene.tweens.add({
            targets: this,
            ease: 'Sine.easeInOut',
            duration: 500,
            delay: 0,
            repeat: 0,
            yoyo: false,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1,
            },
            onComplete: () =>
            {
                this.isFiring = true;

                this.prepareToFire();
            },
        });
    }

    public prepareToFire ()
    {
        if (!this.active || this.isDead)
        {
            return;
        }

        if (this.fireBallAttackCount <= 3)
        {
            this.fireBallAttackCount += 1;
        }
        else
        {
            this.fireBallAttackCount = 0;

            this.isLavaAttack = true;

            this.lavaAttack();

            return;
        }

        const fireTimer = this.scene.time.addEvent({
            startAt: 500,
            delay: 800,
            repeat: 4,
            callback: () =>
            {
                if (!this.active || this.isDead)
                {
                    return;
                }

                if (fireTimer.repeatCount > 1)
                {
                    const selectAnim = this.enemyState.life > 750 ? 'hell-beast-breath' : 'hell-beast-breath-stroke';

                    this.anims.play(selectAnim, true);
                }

                if (fireTimer.repeatCount === 0)
                {
                    this.hellBeastFadeOut();
                }
            },
        });
    }

    public hellBeastFadeOut ()
    {
        if (!this.active || this.isDead)
        {
            return;
        }

        this.scene.sound.play('hellBeastDisappearLaughSfx');

        this.fadingTween = this.scene.tweens.add({
            targets: this,
            ease: 'Sine.easeInOut',
            duration: 800,
            delay: 0,
            repeat: 0,
            yoyo: false,
            alpha: {
                getStart: () => 1,
                getEnd: () => 0,
            },
            onComplete: () =>
            {
                if (!this.active || this.isDead)
                {
                    this?.setAlpha(1);

                    return;
                }

                this.isFiring = false;

                this.isHidden = true;

                this.body.reset(-100, -100);

                this.handleHellBeast();
            },
        });
    }

    public lavaAttack ()
    {
        if (!this.isLavaAttack || !this.active || this.isDead)
        {
            return;
        }

        const lavaFireTimer = this.scene.time.addEvent({
            startAt: 100,
            delay: 1000,
            repeat: 3,
            callback: () =>
            {
                if (!this.active || this.isDead)
                {
                    return;
                }

                if (lavaFireTimer.repeatCount === 3)
                {
                    this.anims.play('hell-beast-burn', true);

                    this.body.setSize(64, 64);
                    this.body.reset(288, 528 - this.body.height / 2);
                }

                if (lavaFireTimer.repeatCount === 2)
                {
                    this.anims.play('hell-beast-burn', true);

                    this.body.setSize(64, 64);
                    this.body.reset(175, 528 - this.body.height / 2);
                }

                if (lavaFireTimer.repeatCount === 1)
                {
                    this.anims.play('hell-beast-burn', true);

                    this.body.setSize(64, 64);
                    this.body.reset(400, 528 - this.body.height / 2);
                }

                if (lavaFireTimer.repeatCount === 0)
                {
                    this.body.setSize(64, 64);

                    this.setAlpha(0);

                    this.enemyState.damage = 0;

                    this.body.setVelocityX(0);
                    this.body.reset(-100, -100);

                    this.hellBeastFadeOut();

                    this.isLavaAttack = false;

                    lavaFireTimer.destroy();
                }
            },
        });
    }

    public shootThePlayer ()
    {
        if (this.body.x < -30 || this.isDead)
        {
            return;
        }

        this.isFiring = true;

        const ball = this.scene.fireballs.getFirstDead(true, this.body.x + this.width / 2, this.body.center.y, 'fireBall', undefined, true);

        if (ball)
        {
            ball.visible = true;
            ball.anims.play('fireball', true);
            ball.setDepth(DEPTH.FLAME_BALL);
            ball.enemyState = { damage: 10 };
            ball.name = 'fireball';
            ball.body.setCircle(6);

            this.scene.projectileGroup.push(ball);

            const dx = this.scene.player.x - this.x;
            const dy = this.scene.player.y - this.y;

            const angle = Math.atan2(dy, dx);

            ball.body.setVelocity(Math.cos(angle) * 380, Math.sin(angle) * 380);

            ball.setRotation(angle + Math.PI / 2);

            this.scene.sound.play('swell', { volume: 0.15 });

            this.scene.time.addEvent({
                delay: 1500,
                callback: () =>
                {
                    this.isFiring = false;
                    ball.destroy();
                },
            });
        }
    }

    public looseLife (damage: number)
    {
        if (this.isLavaAttack || this.enemyState.hited || this.isDead)
        {
            return;
        }

        this.enemyState.hited = true;

        this.setTintFill(COLORS.WHITE);

        this.scene.time.addEvent({
            delay: 250,
            callback: () =>
            {
                this.clearTint();
                this.enemyState.hited = false;
            }
        });

        this.enemyState.life -= damage;

        this.healthUiText.setText(`${this.enemyState.life}/2000`);

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

        this.scene.sound.play('hellBeastHitSfx', { volume: 1, rate: 1 });

        if (this.enemyState.life <= 0)
        {
            this.isDead = true;

            this.healthUiText.destroy();

            this.healthUiBack.destroy();

            this.startDeathSequence();

            this.scene.stopMusic();
        }
    }

    public playSfxDeath ()
    {
        this.scene.sound.play('hellBeastDeathSfx');
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
        // this.scene.player.inventory.boss1 = true;
    }

    public checkCollision (d)
    {
        return;
    }

    private startDeathSequence (): void
    {
        this.play({ key: 'hell-beast-lava', repeat: -1 }, true);

        this.scene.shakeCamera(3500);

        this.scene.sound.play('hellBeastHitSfx', { volume: 1, rate: 0.3 });

        this.scene.sound.play('hellBeastLavaAttackSfx', { volume: 1, rate: 0.3 });

        this.body.setSize(64, 160).setAllowGravity(false);
        this.body.reset(288, 528 - this.body.height / 2);

        this.scene.tweens.add({
            targets: this,
            delay: 1000,
            duration: 1000,
            ease: Phaser.Math.Easing.Expo.Out,
            displayWidth: 2,
            onComplete: this.startDeathSequence2,
            onCompleteScope: this
        });


    }

    private startDeathSequence2 (): void
    {
        this.scene.tweens.add({
            targets: this,
            duration: 500,
            ease: Phaser.Math.Easing.Linear,
            displayHeight: 2,
            onComplete: () =>
            {
                this.scene.flashCamera(2000);

                this.setAlpha(0);

                const { x, y } = this.body.center;

                const fireElement = this.scene.physics.add.sprite(x, y, 'atlas', 'fire-element_0').play('fire-element').setDepth(DEPTH.FRONT_LAYER);

                this.scene.physics.world.enable(fireElement);

                fireElement.body.setAllowGravity(false).setSize(10, 18).setOffset(27, 23);

                const overlap = this.scene.physics.add.overlap(this.scene.player, fireElement, () =>
                {
                    const inventory = this.scene.player.inventoryManager.getInventory();

                    inventory.fireElement = true;

                    fireElement.destroy();

                    this.scene.setPause();

                    // @ts-ignore
                    const ui = this.scene.add.rexNinePatch(WIDTH / 2, HEIGHT / 2, WIDTH / 4 * 3, HEIGHT / 2, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
                        .setOrigin(0.5, 0.5)
                        .setDepth(DEPTH.UI_BACK)
                        .setScrollFactor(0, 0)
                        .setVisible(true);

                    const powerUpDesc = this.scene.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.ULTIMA_BOLD, 'you get the fire element', FONTS_SIZES.ULTIMA_BOLD, 1)
                        .setOrigin(0.5, 0.5)
                        .setAlpha(1)
                        .setDepth(DEPTH.UI_TEXT)
                        .setScrollFactor(0, 0);

                    const dialog = this.scene.input.keyboard.once(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, () =>
                    {
                        powerUpDesc.destroy();
                        ui.destroy();
                        dialog.removeAllListeners();
                        this.scene.unPause();

                        const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getGroundLayers(this.scene).filter(l => l.name === 'ground/ground')[0];

                        const tile = layer.getTileAt(0, 31);

                        const smoke = this.scene.smokeGroup.getFirstDead(true, tile.getCenterX(), tile.getCenterY(), undefined, undefined, true);

                        if (smoke)
                        {
                            smoke.setDepth(DEPTH.SMOKE);
                            smoke.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => smoke.destroy());
                            smoke.anims.play('smoke1');

                            this.scene.sound.play('impact', { rate: 0.5 });
                        }
                        layer.removeTileAt(0, 30);
                        layer.removeTileAt(0, 31);
                        layer.removeTileAt(0, 32);

                        this.unlockDoors();
                    });

                    overlap.destroy();
                }, undefined, this.scene);
            }
        });
    }
}
