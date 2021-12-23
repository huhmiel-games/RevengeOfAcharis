import { FONTS, FONTS_SIZES, HEIGHT, WIDTH } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';

export default class HellBeast extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; directionX: number; directionY: number; hited: boolean; lastFired: number; fireRate: number; };
    public getFired: boolean;
    public lastAnim: null;
    public isAppearing: boolean;
    public isFiring: boolean;
    public isHidden: boolean;
    public isShooting: boolean;
    public isLavaAttack: boolean;
    public hellBeastTimer: Phaser.Time.TimerEvent | undefined;
    public battleStarted: boolean;
    public attackTime: null;
    public fireBallAttackCount: number;
    public isGlowing: boolean;
    public isDead: boolean;
    public hellBeastThemeIsPlaying: boolean;
    public showMsg: Phaser.GameObjects.BitmapText;
    public fadingTween: Phaser.Tweens.Tween;
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

        this.setDepth(DEPTH.ENEMY);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.allowGravity = true;
        this.body.setSize(64, 64);
        this.getFired = false;
        this.lastAnim = null;
        this.isAppearing = false;
        this.isFiring = false;
        this.isHidden = true;
        this.isShooting = false;
        this.isLavaAttack = false;
        this.battleStarted = false;
        this.attackTime = null;
        this.fireBallAttackCount = 0;
        this.isGlowing = false;
        this.isDead = false;
        this.hellBeastThemeIsPlaying = false;
        // this.glowingSfx = this.scene.sound.add('hellBeastGlowingSfx');
        this.blockDoors();
        this.startBattle();

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            const currentAnim = this.anims.getName();

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

    // availables anims
    // hell-beast-idle
    // hell-beast-idle-stroke
    // hell-beast-breath
    // hell-beast-breath-stroke
    // hell-beast-burn
    // hell-beast-lava

    // hellBeastDeathSfx
    // hellBeastFireballSfx
    // hellBeastHitSfx
    // hellBeastLavaAttackSfx
    // hellBeastFirstLaughSfx
    // hellBeastAppearLaughSfx
    // hellBeastDisappearLaughSfx
    // hellBeastGlowingSfx

    public preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            if (this.x > this.scene.player.x)
            {
                this.flipX = false;
            }
            else if (this.x < this.scene.player.x)
            {
                this.flipX = true;
            }
            // if (this.scene.player.state.dead) {
            //   this.glowingSfx.stop();
            // }
        }
    }

    // playGlowing() {
    //   if (this.isGlowing) {
    //     return;
    //   }
    //   this.isGlowing = true;
    //   this.glowingSfx.play({ loop: true });
    // }

    public startBattle ()
    {
        const msg = `Hmm fresh meat...`;

        this.scene.time.addEvent({
            delay: 600,
            callback: () =>
            {
                this.showMsg = this.scene.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.MINIMAL, msg, FONTS_SIZES.MINIMAL, 1)
                    .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200).setScrollFactor(0, 0);
                this.scene.sound.play('hellBeastFirstLaughSfx');
            }
        });

        this.scene.time.addEvent({
            delay: 2000,
            callback: () =>
            {
                this.showMsg.destroy();
                this.handleHellBeast();
            }
        });

    }

    public handleHellBeast ()
    {
        if (this.hellBeastTimer !== undefined || !this.active)
        {
            return;
        }

        if (!this.scene)
        {
            return;
        }

        this.hellBeastTimer = this.scene.time.addEvent({
            delay: this.enemyState.life,
            callback: () =>
            {
                if (this.isHidden && this.active)
                {
                    this.isAppearing = true;
                    this.appears();
                    // this.playHellBeastTheme();
                    this.hellBeastTimer = undefined; // destroy();
                }
            },
        });
    }

    public playHellBeastTheme ()
    {
        if (this.hellBeastThemeIsPlaying)
        {
            return;
        }

        this.hellBeastThemeIsPlaying = true;

        this.scene.playMusic('hellBeastFight');
    }

    public appears ()
    {
        if (!this.isAppearing)
        {
            return;
        }
        this.isAppearing = false;

        this.hellBeastTimer = undefined; // .destroy();

        const selectAnim = this.enemyState.life > 1000 ? 'hell-beast-idle' : 'hell-beast-idle-stroke';

        this.anims.play(selectAnim, true);

        this.body.setSize(64, 64);

        const randomX = Phaser.Math.Between(24, 376);

        this.body.reset(randomX, 528 - this.body.height / 2);

        this.scene.sound.play('hellBeastAppearLaughSfx');

        this.playHellBeastTheme();

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
                // this.playHellBeastTheme();
                this.prepareToFire();
            },
        });
    }

    public prepareToFire ()
    {
        if (!this.active)
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
                if (!this.active)
                {
                    return;
                }

                if (fireTimer.repeatCount > 1)
                {
                    const selectAnim = this.enemyState.life > 750 ? 'hell-beast-breath' : 'hell-beast-breath-stroke';
                    // if (selectAnim === 'hell-beast-breath-stroke') {
                    //   this.playGlowing();
                    // }
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
        if (!this.active)
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
                if (!this.active)
                {
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
        if (!this.isLavaAttack || !this.active)
        {
            return;
        }

        const lavaFireTimer = this.scene.time.addEvent({
            startAt: 100,
            delay: 1000,
            repeat: 3,
            callback: () =>
            {
                if (!this.active)
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
        if (this.body.x < -30)
        {
            return;
        }

        this.isFiring = true;

        const ball = this.scene.fireballs.getFirstDead(true, this.body.x + this.width / 2, this.body.center.y, 'fireBall', undefined, true);

        if (ball)
        {
            ball.visible = true;
            ball.anims.play('fireball', true);
            ball.setDepth(102);
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

    public animate (str)
    {
        this.anims.play(str, true);
    }

    public looseLife (e)
    {
        if (this.isLavaAttack || this.enemyState.hited)
        {
            return;
        }

        this.enemyState.hited = true;

        this.setTintFill(0xFFFFFF);

        this.scene.time.addEvent({
            delay: 250,
            callback: () =>
            {
                this.clearTint();
                this.enemyState.hited = false;
            }
        });

        this.enemyState.life = this.enemyState.life - e;

        this.scene.sound.play('hellBeastHitSfx', { volume: 1, rate: 1 });

        if (this.enemyState.life <= 0)
        {
            // this.glowingSfx.stop();
            this.unlockDoors();

            // this.scene.player.inventory.boss2 = true;
            this.scene.stopMusic();
            this.scene.playMusic('hellBeastFight');
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
}
