import GameScene from '../../scenes/GameScene';
import { TEquipmentConfig, TShieldConfig, TSwordConfig } from '../../types/types';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class PowerUp
 * @extends {Phaser.GameObjects.Sprite}
 */
export default class PowerUp extends Phaser.GameObjects.Sprite
{
    public body: Phaser.Physics.Arcade.Body;
    public id: number;
    public properties: (TSwordConfig | TShieldConfig | TEquipmentConfig);
    public category: string;
    constructor (scene: GameScene, x: number, y: number, config: { key: string | Phaser.Textures.Texture; id: number; properties: (TSwordConfig | TShieldConfig), category: string })
    {
        super(scene, x, y, config.key);

        this.setFrame(config.id);

        this.id = config.id;
        this.category = config.category;
        this.properties = config.properties;

        this.setDepth(50);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // this.setDisplayOrigin(0, 0);
        this.body.setSize(32, 32).setAllowGravity(false);
        this.body.allowGravity = false;
    }
}
