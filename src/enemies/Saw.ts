import { EWeaponType, TILE_SIZE } from '../constant/config';
import DEPTH from '../constant/depth';
import Arrow from '../player/items/Arrow';
import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class Saw
 * @extends {Enemy}
 */
export default class Saw extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 12;
    public walkplay: boolean;
    public walkSfx: Phaser.Sound.BaseSound;
    public distance: number;
    private startPosition: { x: number; y: number; };
    private amplitude: number;
    private direction: string = 'vertical';
    private duration: number = 2000;
    private start: number = 0;
    private end: number = 0;
    private isMoving: boolean = true;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.setTexture('atlas').setFrame('saw_0').setDepth(DEPTH.GROUND_LAYER - 1);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: 0,
        };

        this.startPosition = { x, y };

        this.amplitude = config.amplitude;

        this.direction = config.direction;

        this.duration = config.duration;

        this.start = config.start * TILE_SIZE + 8;

        this.end = config.end * TILE_SIZE;

        this.body
            .setAllowGravity(false)
            .setCircle(12.5)
            .setOffset(1, 1)
            .setMaxVelocity(this.speed, this.speed);

        this.anims.play('saw');

        this.walkSfx = this.scene.sound.add('hellhoundDeath', { rate: 0.1, loop: true, seek: 0.4 });

        if (this.direction === 'vertical')
        {
            this.startPosition.y > (this.end + this.start) / 2 ? this.body.setVelocityY(-this.speed) : this.body.setVelocityY(this.speed);
        }

        if (this.direction === 'horizontal')
        {
            this.startPosition.x > (this.end + this.start) / 2 ? this.body.setVelocityX(-this.speed) : this.body.setVelocityX(this.speed);
        }

        this.playSawSfx();
    }

    private goUp ()
    {
        this.isMoving = false;

        this.body.setVelocityY(0);

        this.walkSfx.stop();

        this.anims.play('saw-start');

        this.scene.time.addEvent({
            delay: this.duration,
            callback: () =>
            {
                if (!this.active) return;

                this.isMoving = true;

                this.anims?.play('saw');

                this.body.setVelocityY(-this.speed);

                this.playSawSfx();
            }
        });
    }

    private goDown ()
    {
        this.isMoving = false;

        this.body.setVelocityY(0);

        this.walkSfx.stop();

        this.anims.play('saw-start');

        this.scene.time.addEvent({
            delay: this.duration,
            callback: () =>
            {
                if (!this.active) return;

                this.isMoving = true;

                this.anims?.play('saw');

                this.body.setVelocityY(this.speed);

                this.playSawSfx();
            }
        });
    }

    private goLeft ()
    {
        this.isMoving = false;

        this.body.setVelocityX(0);

        this.walkSfx.stop();

        this.anims.play('saw-start');

        this.scene.time.addEvent({
            delay: this.duration,
            callback: () =>
            {
                if (!this.active) return;

                this.isMoving = true;

                this.anims?.play('saw');

                this.body.setVelocityX(-this.speed);

                this.playSawSfx();
            }
        });
    }

    private goRight ()
    {
        this.isMoving = false;

        this.body.setVelocityX(0);

        this.walkSfx.stop();

        this.anims.play('saw-start');

        this.scene.time.addEvent({
            delay: this.duration,
            callback: () =>
            {
                if (!this.active) return;

                this.isMoving = true;

                this.anims?.play('saw');

                this.body.setVelocityX(this.speed);

                this.playSawSfx();
            }
        });
    }

    private playSawSfx ()
    {
        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) return;

        const distance = Phaser.Math.Distance.BetweenPoints(this, this.scene.player);

        this.walkSfx.play({ volume: 1 - Phaser.Math.Clamp(distance / 100, 0, 1) * 1.5 });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            const { center } = this.body;

            if (this.direction === 'vertical' && center.y > this.end && this.isMoving)
            {
                this.goUp();
            }

            if (this.direction === 'vertical' && center.y < this.start && this.isMoving)
            {
                this.goDown();
            }

            if (this.direction === 'horizontal' && center.x > this.end && this.isMoving)
            {
                this.goLeft();
            }

            if (this.direction === 'horizontal' && center.x < this.start && this.isMoving)
            {
                this.goRight();
            }
        }
    }

    public looseLife (damage: number, weaponType: EWeaponType, weapon?: Arrow): void
    {
        return;
    }

    public kill (): void
    {
        return;
    }

    public giveLife (x: number, y: number): void
    {
        return;
    }

}
