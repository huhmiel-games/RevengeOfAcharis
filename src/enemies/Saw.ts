import { TILE_SIZE } from '../constant/config';
import Arrow from '../player/Arrow';
import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class Saw extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 12;
    public walkplay: boolean;
    public walkk: Phaser.Sound.BaseSound;
    public distance: number;
    private startPosition: { x: number; y: number; };
    private amplitude: number;
    private duration: number = 2000;
    private isMoving: boolean = true;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.setTexture('atlas').setFrame('saw_0');

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: 0,
        };

        this.startPosition = { x, y };

        this.amplitude = config.amplitude;

        this.duration = config.duration;

        this.body
            .setAllowGravity(false)
            .setCircle(12.5)
            .setOffset(1, 1)
            .setMaxVelocityX(this.speed);

        this.anims.play('saw');

        this.body.setVelocityY(this.speed);
    }

    private goUp ()
    {
        this.isMoving = false;

        this.body.setVelocityY(0);

        this.anims.play('saw-start');

        this.scene.time.addEvent({
            delay: this.duration,
            callback: () =>
            {
                if (!this.active) return;

                this.isMoving = true;

                this.anims?.play('saw');

                this.body.setVelocityY(-this.speed);
            }
        });
    }

    private goDown ()
    {
        this.isMoving = false;

        this.body.setVelocityY(0);

        this.anims.play('saw-start');

        this.scene.time.addEvent({
            delay: this.duration,
            callback: () =>
            {
                if (!this.active) return;

                this.isMoving = true;

                this.anims?.play('saw');

                this.body.setVelocityY(this.speed);
            }
        });
    }

    private playSound ()
    {
        this.anims.play('thing');

        if (this.scene.cameras.main.worldView.contains(this.x, this.y))
        {
            this.walkk.play();

        }
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            const { center } = this.body;

            if (center.y > this.startPosition.y + this.amplitude * TILE_SIZE && this.isMoving)
            {
                this.goUp();
            }

            if (center.y < this.startPosition.y && this.isMoving)
            {
                this.goDown();
            }
        }
    }

    public looseLife (damage: number, weaponType: string, weapon?: Arrow): void
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
