import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class SkullHeadDemon extends Enemy
{
    public enemyState: { life: any; damage: any; directionX: number; directionY: number; hited: boolean; giveLife: number; };
    public skullFX: Phaser.Sound.BaseSound;
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
            giveLife: Math.round(config.life / 8),
        };

        this.body.setCollideWorldBounds(false)
            .setAllowGravity(false)
            .setCircle(16, 10, 20);
            
        this.skullFX = this.scene.sound.add('skeletonStep', { volume: 1, rate: 2 });

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.playSound, this);

        this.anims.play('fire-skull', true);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && !this.scene.physics.world.isPaused)
        {

        }
    }

    public playSound ()
    {
        const frame = this.anims.getFrameName();

        if (frame !== 'fire-skull1' && frame !== 'fire-skull5')
        {
            return;
        }

        if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) <= 150)
        {
            if (!this.skullFX.isPlaying)
            {
                this.skullFX.play();
            }
        }
    }
}
