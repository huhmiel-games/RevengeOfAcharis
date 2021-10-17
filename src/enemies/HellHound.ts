import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class HellHound extends Enemy
{
    public enemyState: { life: any; damage: any; directionX: number; directionY: number; hited: boolean; giveLife: number; };
    private lastAnim: string = '';
    private followPath: boolean;
    private walkplay: boolean;
    private attackSfx: Phaser.Sound.BaseSound;
    private walkk: Phaser.Sound.BaseSound;
    private distance: number;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            directionX: 100,
            directionY: 0,
            hited: false,
            giveLife: config.life / 3,
        };

        this.body
            .setAllowGravity()
            .setGravityY(500)
            .setSize(32, 16)
            .setOffset(16, 12);

        this.flipX = true;

        this.followPath = false;

        this.speed = 100;

        this.walkplay = false;

        this.attackSfx = this.scene.sound.add('hellhoundAttack').on('complete', () =>
        {
            this.isAttacking = false;
        });

        this.walkk = this.scene.sound.add('hellhoundStep', { volume: 0.5 });

        this.on('animationupdate', () =>
        {
            const runSpeedNow = Math.abs(this.body.velocity.x);
            const walkRate = Phaser.Math.RND.realInRange(0.75, 1.25);
            const runTimer = runSpeedNow > 0 ? (1000 / runSpeedNow) * 50 : 330;
            if (this.anims.currentAnim.key === 'hellHoundRun' && !this.walkplay && this.body.blocked.down && this.distance < 350)
            {
                this.walkplay = true;
                this.walkk.play(); // { rate: walkRate }
                this.scene.time.addEvent({
                    delay: runTimer,
                    callback: () =>
                    {
                        this.walkk.stop();
                        this.walkplay = false;
                    },
                });
            }
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && !this.followPath)
        {
            this.body.setVelocityX(this.enemyState.directionX);
            this.body.setVelocityY(this.enemyState.directionY);
            let animationName: string | null;
            const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
            this.distance = distance;
            if (distance <= 40)
            {
                this.playAttackSfx();
                const dx = this.scene.player.x - this.x;
                const dy = this.scene.player.y - this.y;
                const angle = Math.atan2(dy, dx);
                this.body.setVelocityY(Math.sin(angle) * (this.speed / 2));
                animationName = 'hellHoundJump';
            }
            else
            {
                animationName = 'hellHoundRun';
                // turn back if blocked
                if (this.body.blocked.left)
                {
                    this.enemyState.directionX = this.speed;
                }
                if (this.body.blocked.right)
                {
                    this.enemyState.directionX = -this.speed;
                }
                // fall
                if (this.body.blocked.none)
                {
                    this.enemyState.directionY = 600;
                }
                if (this.body.blocked.down)
                {
                    this.enemyState.directionY = 0;
                }
                // flip the sprite
                if (this.enemyState.directionX > 0)
                {
                    this.flipX = true;
                } else
                {
                    this.flipX = false;
                }
            }

            if (this.lastAnim !== animationName)
            {
                this.lastAnim = animationName;
                this.animate(animationName);
            }
        }
        if (this.active && this.scene[`path${this.name}`])
        {
            this.scene[`path${this.name}`].active ? this.startOnPath() : this.followPath = false;
        }

    }

    public playAttackSfx ()
    {
        if (this.isAttacking)
        {
            return;
        }
        this.isAttacking = true;
        this.attackSfx.play();
    }

    public playSfxDeath ()
    {
        this.scene.sound.play('hellhoundDeath', { volume: 1, rate: 1 });
    }

    public startOnPath ()
    {
        this.setPosition(this.scene[`path${this.name}`].x, this.scene[`path${this.name}`].y);
        this.body.setAllowGravity(false);
        this.angle = this.scene[`path${this.name}`].angle;
        this.followPath = true;
    }

    public animate (str: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig)
    {
        this.anims.play(str, true);
    }

    public checkCollision (d: { type: string; })
    {
        if (d.type === 'Sprite')
        {
            if (this.enemyState.directionX > 0)
            {
                this.enemyState.directionX = -this.speed;
            } else
            {
                this.enemyState.directionX = this.speed;
            }
        }
    }
}
