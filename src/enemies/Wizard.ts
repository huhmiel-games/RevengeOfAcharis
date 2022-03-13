import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import Arrow from '../player/items/Arrow';
import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class Wizard extends Enemy
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; directionX: number; directionY: number; hited: boolean; giveLife: number; delay: number; };
    public lastAnim: string = '';
    public getFired: boolean;
    public isAppearing: boolean;
    public isFiring: boolean;
    public isHidden: boolean;
    public isShooting: boolean;
    public wizardTimer: Phaser.Time.TimerEvent;
    public lastFired: number;
    public speed: number;
    public fadingTween: Phaser.Tweens.Tween;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        
        this.name = config.name;
        this.enemyState = {
            life: config.life,
            damage: 0,
            directionX: 20,
            directionY: 0,
            hited: false,
            giveLife: Math.round(config.life / 2),
            delay: config.delay,
        };

        this.setDepth(DEPTH.ENEMY);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body
            .setAllowGravity(false)
            .setSize(20, 40)
            .setOffset(32, 24);

        this.setAlpha(0);
        this.getFired = false;
        this.flipX = true;
        this.isAppearing = false;
        this.isFiring = false;
        this.isHidden = true;
        this.isShooting = false;
        this.lastFired = 0;
        this.speed = 20;
        this.anims.play(config.key, true);
        this.handleWizard();
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            // flip to face the player
            if (this.x > this.scene.player.x)
            {
                this.flipX = false;
            }
            else
            {
                this.flipX = true;
            }
        }
    }

    public handleWizard ()
    {
        if (!this.active)
        {
            return;
        }

        if (!this.scene)
        {
            return;
        }

        this.wizardTimer = this.scene.time.addEvent({
            delay: 5000 + this.enemyState.delay,
            callback: () =>
            {
                if (this.isHidden && this.active)
                {
                    this.isAppearing = true;
                    this.appears();
                    this.wizardTimer.destroy();
                }
            },
        });
    }

    public appears ()
    {
        if (!this.isAppearing)
        {
            return;
        }

        this.isAppearing = false;

        this.wizardTimer.destroy();

        this.anims.play('wizard-idle', true);

        const randomX = Phaser.Math.Between(this.scene.player.x - 180, this.scene.player.x + 180);
        const randomY = Phaser.Math.Between(this.scene.player.y - 50, this.scene.player.y + 50);

        if (this.scene.colliderLayer.getTileAtWorldXY(randomX, randomY) !== null)
        {
            this.isAppearing = true;

            this.appears();

            return;
        }

        this.setPosition(randomX, randomY);

        this.scene.sound.play('wizardAppear', { volume: 1, rate: 1 });

        this.fadingTween = this.scene.tweens.add({
            targets: this,
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 0,
            repeat: 0,
            yoyo: false,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1,
            },
            onComplete: () =>
            {
                if (this.active)
                {
                    this.isFiring = true;

                    this.anims.play('wizard-fire', true);

                    this.fireThePlayer();
                }
            },
        });
    }

    public fireThePlayer ()
    {
        if (!this.active || !this.isFiring)
        {
            return;
        }

        this.isFiring = false;

        this.scene.sound.play('wizardFireLaugh', { volume: 1, rate: 1 });

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (wizard: any) =>
        {
            this.shootThePlayer();
            // const angle = Math.atan2(dy, dx);
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
                    if (!this.active || !this.isFiring)
                    {
                        return;
                    }

                    this.scene.sound.play('wizardDisappear', { volume: 1, rate: 1 });

                    this.isFiring = false;

                    this.isHidden = true;

                    this.setPosition(-100, -100);

                    this.handleWizard();
                },
            });
        }, this);
    }

    public shootThePlayer ()
    {
        if (this.isFiring)
        {
            return;
        }

        this.isFiring = true;

        const ball: Projectile = this.scene.fireballs.getFirstDead(true, this.body.x, this.body.y, 'fireBall', undefined, true);

        if (ball)
        {
            ball.setVisible(true).setDepth(DEPTH.FLAME_BALL).setName('fireball').setAlpha(1);
            ball.anims.play('fireball', true);

            ball.enemyState = { damage: 5 };
            ball.body.setCircle(6);

            this.scene.projectileGroup.push(ball);

            const dx = this.scene.player.x - this.x;
            const dy = this.scene.player.y - this.y;
            const angle = Math.atan2(dy, dx);

            ball.body.setVelocity(Math.cos(angle) * 330, Math.sin(angle) * 330);

            ball.setRotation(angle + Math.PI / 2);

            this.scene.sound.play('wizardFire', { volume: 1 });

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

    public looseLife (damage: number, weaponType: EWeaponType, weapon?: Arrow): void
    {
        if (this.isHit)
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
        
        const specialDamage = weaponType === 'arrow' ? damage * 2 : damage;

        this.enemyState.life -= specialDamage;

        this.scene.showEnemyDamage(this, specialDamage);

        if (this.isAttacking === false)
        {
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
}
