import { GameObjects } from 'phaser';
import GameScene from '../scenes/GameScene';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class Projectile
 * @extends {GameObjects.Sprite}
 */
export default class Projectile extends GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState = {
        damage: 0 as number
    };

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.scene.physics.world.enable(this);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            if (!this.body.blocked.none)
            {
                this.explode();
            }
        }
    }

    public looseLife (damage: number): void
    {
        return;
    }

    public explode ()
    {
        this.setVisible(false).setActive(false);
    }
}