import { GameObjects } from 'phaser';
import GameScene from '../scenes/GameScene';
import Enemy from './Enemy';

export default class BodyExtended extends GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public parent: Enemy;
    
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.scene.physics.world.enable(this);
    }

    public looseLife (weapon: Phaser.Types.Physics.Arcade.GameObjectWithBody): void
    {
        this.scene.enemyIsHit(this.parent, weapon);
    }

    public kill ()
    {
        this.body.setEnable(false);
    }
}