import GameScene from '../scenes/GameScene';

export default class PowerUp extends Phaser.GameObjects.Sprite
{
    public body: Phaser.Physics.Arcade.Body;
    public powerUpState: { name: any; ability: any; text: any; id: any; };
    constructor (scene: GameScene, x: number, y: number, config: { key: string | Phaser.Textures.Texture; name: any; ability: any; text: any; id: any; })
    {
        super(scene, x, y, config.key);

        this.scene = scene;
        this.powerUpState = {
            name: config.name,
            ability: config.ability,
            text: config.text,
            id: config.id,
        };
        this.setDepth(50);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.allowGravity = false;
    }

    public animate (str: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig)
    {
        this.anims.play(str, true);
    }
}
