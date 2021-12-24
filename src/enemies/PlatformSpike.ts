import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class PlatformSpike extends Enemy
{
    public duration: number;
    public directionType: string;
    public enemyState: { damage: number; };
    public durationTimer: number;
    public fallTimer: Phaser.Time.TimerEvent;
    public riseTimer: Phaser.Time.TimerEvent;
    public spikeIsPlaying: boolean;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.name = 'platformSpike';
        
        this.duration = config.duration;
        
        this.directionType = config.directionType;
        
        this.enemyState = {
            damage: 20,
        };

        this.setDepth(101);
        
        this.durationTimer = 4000;
        
        this.body.setAllowGravity(false).setImmovable();
        
        this.spikeIsPlaying = false;
        
        this.rise();
    }

    public preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.body.onFloor())
        {
            const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);

            if (distance < 350)
            {
                this.scene.shakeCamera(200);

                this.playSpikeSound();
            }
        }
    }

    public playSpikeSound ()
    {
        if (this.spikeIsPlaying)
        {
            return;
        }

        this.spikeIsPlaying = true;

        this.scene.sound.play('spikeBlock', { volume: 0.5 });
        
        this.scene.time.addEvent({
            delay: 600,
            callback: () =>
            {
                this.spikeIsPlaying = false;
            }
        });
    }

    public fall ()
    {
        if (!this.active)
        {
            return;
        }
        
        this.fallTimer = this.scene.time.addEvent({
            delay: this.duration,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }

                this.body.setVelocityY(600);
                
                this.rise();
            }
        });
    }

    public rise ()
    {
        if (!this.active)
        {
            return;
        }

        this.riseTimer = this.scene.time.addEvent({
            delay: 2000,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }
                this.body.setVelocityY(-100);
                this.fall();
            }
        });
    }

    public checkCollision (d)
    {
        // if (d.type === 'Sprite')
        // {
        //     if (this.enemyState.directionX > 0)
        //     {
        //         this.enemyState.directionX = -30;
        //     }
        //     else
        //     {
        //         this.enemyState.directionX = 30;
        //     }
        // }
    }
}
