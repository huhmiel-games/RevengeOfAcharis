import Arrow from '../player/items/Arrow';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import Enemy from './Enemy';

/**
 * @description
 * @author © Philippe Pereira 2021
 * @export
 * @class Archer
 * @extends {Enemy}
 */
export default class Archer extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public distance: number;
    private arrows: Phaser.Physics.Arcade.Group;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife: Math.round(config.life / 3),
        };

        this.setOrigin(0, 0);

        this.body
            .setAllowGravity(true)
            .setGravityY(500)
            .setSize(10, 33)
            .setOffset(26, 15);

        this.arrows = this.scene.archerArrows;

        this.anims.play('archer-idle');

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'archer-attack_6')
            {
                const arrow: Arrow = this.arrows.getFirstDead(true, this.body.center.x, this.body.center.y - 3, 'arrow', undefined, true);

                if (arrow)
                {
                    arrow.isDeflecting = false;
                    arrow.enemyState = { damage: 5 };
                    arrow.setSize(33, 1)
                        .setDisplaySize(33, 3)
                        .setAngle(0)
                        .setVisible(true)
                        .setActive(true)
                        .body.reset(this.body.center.x, this.body.center.y - 3);

                    this.scene.sound.play('bullet', { volume: 0.6, rate: 2.4 });

                    if (this.flipX)
                    {
                        arrow.setFlipX(true);
                        arrow.body.setEnable(true).setVelocityX(-400).setGravityY(30);
                    }
                    if (!this.flipX)
                    {
                        arrow.setFlipX(false);
                        arrow.body.setEnable(true).setVelocityX(400).setGravityY(30);
                    }

                    this.scene.enemyGroup.push(arrow);
                }
            }


        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            if (this.isDead) return;

            const { center } = this.body;

            const playerX = this.scene.player.body.center.x;

            if (center.x < playerX)
            {
                this.setFlipX(false);
            }
            else if (center.x > playerX)
            {
                this.setFlipX(true);
            }

            if (this.scene.cameras.main.worldView.contains(center.x, center.y))
            {
                this.anims.play('archer-attack', true);
            }
            else
            {
                this.anims.play('archer-idle');
            }
        });
    }
    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.active && this.body.blocked.down && !this.isDead)
        {
            const { x, y } = this.body.center;
            const { x: playerPosX, y: playerPosY } = this.scene.player.body.center;

            const distance = Phaser.Math.Distance.Between(playerPosX, playerPosY, x, y);

            if (distance <= 400 && !this.isAttacking)
            {
                this.anims.play('archer-attack', true);

                this.isAttacking = true;
            }

            if (distance > 400 && !this.isAttacking)
            {
                this.anims.play('archer-idle', true);
            }
        }
    }

    public kill (): void
    {
        if (this.isDead) return;

        this.isDead = true;

        this.body.stop().setEnable(false);

        this.clearTint();

        this.playSfxDeath();

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('archer-death', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.burn();

            this.giveLife(x, y);

            this.scene.tweens.add({
                duration: 250,
                targets: this,
                alpha: 0,
                onComplete: () => this.destroy()
            });
        });
    }
}
