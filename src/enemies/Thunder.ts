import GameScene from '../scenes/GameScene';

export default class Thunder extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: any; damage: any; directionX: number; directionY: number; hited: boolean; giveLife: number; };
    public lastAnim: null;
    public getFired: boolean;
    public followPath: boolean;
    public speed: number;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.scene = scene;
        
        this.name = config.name;
        
        this.enemyState = {
            life: config.life,
            damage: config.damage,
            directionX: 20,
            directionY: 0,
            hited: false,
            giveLife: config.life / 8,
        };
        
        this.setDepth(101);
        
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        
        this.setOrigin(0, 0);
        
        this.body
            .setAllowGravity(false)
            .setSize(32, 192)
            .setOffset(24, 0);
        
        this.lastAnim = null;
        
        this.getFired = false;
        
        this.flipX = true;
        
        this.followPath = false;
        
        this.speed = 20;
    }

    public animate (str)
    {
        this.anims.play(str, true);
    }

    public looseLife (e)
    {
        return;
    }

    public explode (bullet)
    {

    }
}
