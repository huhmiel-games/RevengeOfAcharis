import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class Flames extends Enemy
{
    public life: number;
    public enemyState: { damage: number; };
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.name = 'flame';
        
        this.life = 10000;
        
        this.enemyState = {
            damage: 60
        };
        
        this.body.setAllowGravity(false).setImmovable(true);
    }

    public looseLife (e: any)
    {
        return;
    }
}
