import { GameObjects } from 'phaser';
import GameScene from '../scenes/GameScene';

export default class Arrow extends GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public damage: number;

    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.scene = scene;

        this.name = 'arrow';

        this.scene.add.existing(this);

        this.scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true).setSize(19, 3);
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active)
        {
            // console.log(this.body.center.x)
            // flip to face the player
            // if (!this.body.blocked.none)
            // {
            //     this.explode();
            // }
            // else
            // {
            //     this.flipX = true;
            // }
        }
    }

    public shootLeft ()
    {

    }

    public shootRight ()
    {

    }


    public explode ()
    {
        
    }

    public kill ()
    {
        this.setVisible(false).setActive(false);
    }
}