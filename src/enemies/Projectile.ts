import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class Projectile extends Enemy
{
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            // flip to face the player
            if (!this.body.blocked.none)
            {
                this.explode();
            }
            else
            {
                this.flipX = true;
            }
        }
    }

    public explode ()
    {
        this.setVisible(false).setActive(false);
    }
}