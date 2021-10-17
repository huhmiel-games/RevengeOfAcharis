import GameScene from '../scenes/GameScene';

export default class Cloud extends Phaser.GameObjects.Image
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public name: string = 'cloud';
    public speed: number;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);
        this.speed = config.speed;

        this.scene.add.existing(this);

        this.setName('to-remove-net-room').setTexture(config.key).setOrigin(0, 0).setDepth(5 - +config.key.slice(-1));
    }

    public preUpdate (time: number, delta: number)
    {
        this.x += this.speed / 100;

        if (this.x > this.scene.map.widthInPixels)
        {
            this.x = 0 - this.width;
        }
    }
}