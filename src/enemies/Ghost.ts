import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class Ghost extends Enemy
{
    public enemyState: { life: number; damage: number; directionX: number; directionY: number; hited: boolean; giveLife: number; };
    public waspFX: Phaser.Sound.BaseSound;
    public speed: number = 10;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            directionX: -10,
            directionY: 0,
            hited: false,
            giveLife: config.life / 2,
        };

        this.body.setCollideWorldBounds(true)
            .setAllowGravity(false)
            .setSize(20, 28)
            .setOffset(10, 20)
            .setVelocityX(-this.speed)
            .velocity.normalize().scale(15);

        this.enemyState.directionY = Math.sin(300 + Math.PI / 4);

        this.waspFX = this.scene.sound.add('ghostFly', { volume: 1 });

        this.anims.play('ghost', true);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && !this.scene.physics.world.isPaused)
        {
            if (!this.isAttacking)
            {
                this.body.setVelocityY(this.enemyState.directionY);

                // turn back if blocked
                if (this.body.blocked.left)
                {
                    this.body.setVelocityX(this.speed);
                    this.playSound();
                    this.isAttacking = false;
                }

                if (this.body.blocked.right)
                {
                    this.body.setVelocityX(-this.speed);
                    this.playSound();
                    this.isAttacking = false;
                }

                if (this.enemyState.directionY > 0)
                {
                    this.enemyState.directionY += 0.2;
                }
                else
                {
                    this.enemyState.directionY -= 0.2;
                }

                if (this.body.blocked.down || this.enemyState.directionY > 22)
                {
                    this.enemyState.directionY = -0.1;

                    this.playSound();
                }
                else if (this.body.blocked.up || this.enemyState.directionY < -22)
                {
                    this.enemyState.directionY = 0.2;

                    this.playSound();
                }
            }
            else
            {
                const dx = this.scene.player.x - this.x;
                const dy = this.scene.player.y - this.y;

                this.body.setVelocity(dx, dy);
            }

            // flip the sprite
            if (this.body.velocity.x > 0)
            {
                this.flipX = false;
            }
            else
            {
                this.flipX = true;
            }
        }
    }

    public playSound ()
    {
        if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) <= 150)
        {
            if (!this.waspFX.isPlaying)
            {
                this.waspFX.play();
            }
        }
    }
}
