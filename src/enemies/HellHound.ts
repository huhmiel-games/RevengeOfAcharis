import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class HellHound extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    private walkplay: boolean;
    private attackSfx: Phaser.Sound.BaseSound;
    private walkk: Phaser.Sound.BaseSound;
    private distance: number;
    private cadaver: { x: number; y: number; };
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: 5,
            damage: 5,
            giveLife: 1,
        };

        this.cadaver = { x, y };

        this.speed = 100;

        this.anims.play('hellHoundIdle', true);

        this.body
            .setAllowGravity(true)
            .setGravityY(1000)
            .setSize(32, 19)
            .setOffset(16, 29)
            .setVelocityX(0);

        this.flipX = true;

        this.walkplay = false;

        this.attackSfx = this.scene.sound.add('hellhoundAttack');

        this.walkk = this.scene.sound.add('hellhoundStep', { volume: 0.5 });

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
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

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            const { center } = this.body;

            const anim = this.anims.getName();

            const playerX = this.scene.player.body.center.x;
            const playerY = this.scene.player.body.center.y;

            const distanceDogPlayer = Phaser.Math.Distance.Between(playerX, playerY, center.x, center.y);
            const distanceCadaverPlayer = Phaser.Math.Distance.Between(playerX, playerY, this.cadaver.x, this.cadaver.y);
            const distanceDogCadaver = Phaser.Math.Distance.Between(center.x, center.y, this.cadaver.x, this.cadaver.y);

            if (distanceDogPlayer < 40)
            {
                if (!this.attackSfx.isPlaying) this.attackSfx.play();
            }

            if (anim === 'hellHoundWalk' && distanceCadaverPlayer < 250)
            {
                this.body.setVelocityX(playerX - center.x > 0 ? this.speed : -this.speed);
                this.anims.play('hellHoundRun', true);

                return;
            }

            if (distanceCadaverPlayer <= 250 && anim !== 'hellHoundRun')
            {
                this.body.setVelocityX(playerX - center.x > 0 ? this.speed / 3 : -this.speed / 3);
                this.anims.play('hellHoundWalk', true);

                return;
            }

            if (distanceDogCadaver < 50 && distanceCadaverPlayer > 250)
            {
                this.body.setVelocityX(0);
                this.anims.play('hellHoundIdle', true);

                return;
            }

            if (distanceDogCadaver > 50 && distanceCadaverPlayer > 250)
            {
                this.body.setVelocityX(this.cadaver.x - center.x > 0 ? this.speed / 3 : -this.speed / 3);

                this.anims.play('hellHoundWalk', true);

                return;
            }

            if (anim === 'hellHoundRun')
            {
                if (distanceCadaverPlayer <= 250)
                {
                    this.anims.play('hellHoundRun', true);

                    return;
                }

                if (distanceCadaverPlayer > 250)
                {
                    this.body.setVelocityX(this.cadaver.x - center.x > 0 ? this.speed / 3 : -this.speed / 3);
                    this.anims.play('hellHoundWalk', true);

                    return;
                }
            }
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            const { x, y } = this.scene.player.body.center;

            const { velocity, blocked } = this.body;

            // turn back if blocked
            if (blocked.left)
            {
                this.body.setVelocityX(this.speed);
                this.anims.play('hellHoundRun', true);
            }

            if (blocked.right)
            {
                this.body.setVelocityX(-this.speed);
                this.anims.play('hellHoundRun', true);
            }

            // flip the sprite
            if (velocity.x > 0)
            {
                this.flipX = true;
            }
            else
            {
                this.flipX = false;
            }
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
}
