import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class Skeleton extends Enemy
{
    public damage: number;
    public enemyState: { life: number; damage: number; directionX: number; directionY: number; hited: boolean; giveLife: number; };
    public speed: number = 40;
    public isAttacking: boolean = false;
    public walkSfx: Phaser.Sound.BaseSound;
    public distance: number;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.scene = scene;
        this.name = 'skeleton';
        this.damage = config.damage;
        this.enemyState = {
            life: config.life,
            damage: 0,
            directionX: -120,
            directionY: 0,
            hited: false,
            giveLife: config.life,
        };

        this.xp = config.life;

        this.body
            .setAllowGravity()
            .setGravityY(500)
            .setSize(16, 40)
            .setOffset(16, 12)
            .setMaxVelocityX(this.speed);
        this.flipX = true;

        this.setVisible(false);

        this.walkSfx = this.scene.sound.add('skeletonStep', { volume: 1 });

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.playSound, this);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.handleRise, this);

        this.on(Phaser.Animations.Events.ANIMATION_START, this.playSoundRiseUp, this);
    }

    private playSoundRiseUp ()
    {
        const { x, y } = this.body.center;

        const volume = 60 / Phaser.Math.Distance.Between(this.scene.player.body.center.x, this.scene.player.body.center.y, this.body.center.x, this.body.center.y);

        this.scene.playSfx('skeletonRising', { volume: Phaser.Math.Clamp(volume, 0, 1) });
    }

    private handleRise ()
    {
        if (this.anims.getName() === 'skeletonRise' && !this.isAttacking)
        {
            this.isAttacking = true;

            this.body.setEnable(true);

            this.anims.play('skeleton', true);

            this.enemyState.damage = this.damage;
        }

        if (this.anims.getName() === 'skeletonRise' && this.isAttacking)
        {
            this.isAttacking = false;

            this.body.setEnable(false);

            this.setVisible(false);

            this.enemyState.damage = 0;
        }
    }

    private playSound ()
    {
        const { x, y } = this.body.center;

        if (!this.scene.cameras.main.worldView.contains(x, y)) return;

        const volume = 1 / Phaser.Math.Distance.Between(this.scene.player.body.center.x, this.scene.player.body.center.y, this.body.center.x, this.body.center.y) * 25;

        const frame = this.anims.getFrameName();

        if (frame === 'skeleton-4' || frame === 'skeleton-8')
        {
            // this.scene.playSfx('skeletonStep', { volume: Phaser.Math.Clamp(volume, 0, 1) });
            this.walkSfx.play({ volume: Phaser.Math.Clamp(volume, 0, 1) });
        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
            this.distance = distance;

            // rise
            if (distance <= 120 && !this.isAttacking && this.scene.player.body.bottom === this.body.bottom)
            {
                this.setVisible(true);

                this.body.setVelocityX(0);

                const dx = this.scene.player.x - this.x;

                if (dx <= 0)
                {
                    this.setFlipX(false);
                }
                else
                {
                    this.setFlipX(true);
                }

                this.anims.play('skeletonRise', true);
            }

            // start chasing player
            if (this.isAttacking && distance <= 200 && this.visible)
            {
                const dx = this.scene.player.x - this.x;

                this.body.setVelocityX(dx);

                // flip the sprite
                if (this.visible && this.body.velocity.x > 2)
                {
                    this.setFlipX(true);
                }

                if (this.visible && this.body.velocity.x < 2)
                {
                    this.setFlipX(false);
                }

                // unrise if blocked
                if (this.body.blocked.left || this.body.blocked.right)
                {
                    this.anims.playReverse('skeletonRise', true);

                    this.body.setVelocityX(0);

                    return;
                }
            }

            // unrise
            if (this.isAttacking && distance > 200)
            {
                this.anims.playReverse('skeletonRise', true);

                this.body.setVelocityX(0);
            }
        }
    }

    public looseLife (damage: number)
    {
        if (!this.isAttacking || this.isHit)
        {
            return;
        }

        this.isHit = true;

        this.setTintFill(0xDDDDDD);

        // this.scene.sound.play('skeletonHit', { volume: 1, rate: 1 });
        this.scene.playSfx('skeletonHit', { volume: 1, rate: 1 });

        this.enemyState.life = this.enemyState.life - damage;

        const damageText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.GALAXY, `-${damage}`, FONTS_SIZES.GALAXY, 1)
            .setTintFill(COLORS.RED)
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
