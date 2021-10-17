import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class BurningGhoul extends Enemy
{
    public enemyState: { life: any; damage: any; directionX: number; directionY: number; hited: boolean; giveLife: number; };
    private walkplay: boolean;
    private walkk: Phaser.Sound.BaseSound;
    private distance: number;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);
        
        this.enemyState = {
            life: config.life,
            damage: config.damage,
            directionX: -200,
            directionY: 0,
            hited: false,
            giveLife: config.life / 3,
        };

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(16, 48)
            .setOffset(16, 15);
        
        this.flipX = true;
                
        this.speed = 90;

        this.anims.play('burning-ghoul', true);
        
        this.walkplay = false;
        
        this.walkk = this.scene.sound.add('ghoulStep', { volume: 1 });
        
        this.on('animationupdate', () =>
        {
            const runSpeedNow = Math.abs(this.body.velocity.x);

            const runTimer = runSpeedNow > 0 ? (750 / runSpeedNow) * 50 : 330;

            if (this.anims.currentAnim.key === 'burning-ghoul' && !this.walkplay && this.body.blocked.down && this.distance < 350)
            {
                this.walkplay = true;

                this.walkk.play();

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
        if (this.active)
        {
            this.body.setVelocityX(this.enemyState.directionX);
            this.body.setVelocityY(this.enemyState.directionY);
            
            const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
            
            this.distance = distance;
            
            // turn back if blocked
            if (this.body.blocked.left)
            {
                this.body.setVelocityX(this.speed);
                this.flipX = true;
            }
            
            if (this.body.blocked.right)
            {
                this.body.setVelocityX(-this.speed);
                this.flipX = false;
            }
        }
    }
}
