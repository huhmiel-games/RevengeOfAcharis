import GameScene from '../scenes/GameScene';

export default class Elevators extends Phaser.GameObjects.Sprite
{
    public body: Phaser.Physics.Arcade.Body;
    public elevatorState: { up: number; down: number; position: string; isMoving: boolean; };
    constructor (scene: GameScene, x: number, y: number, config: { key: string | Phaser.Textures.Texture; up: number; down: number; position: string; })
    {
        super(scene, x, y, config.key);

        this.scene = scene;
        this.elevatorState = {
            up: config.up * 16,
            down: config.down * 16,
            position: config.position,
            isMoving: false,
        };
        this.setDepth(50)
            .setDisplaySize(48, 16)
            ;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setAllowGravity(false)
            .setSize(64, 16)
            .setImmovable(true)
            .setVelocity(0, 0)
            .setMass(20);
    }

    public preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.elevatorState.isMoving)
        {
            if (this.elevatorState.position === 'down')
            {
                if (this.y >= this.elevatorState.up)
                {
                    this.body.setVelocityY(-100);
                }
                if (this.y <= this.elevatorState.up + 8)
                {
                    this.elevatorState.isMoving = false;
                    this.body.setVelocityY(0);
                    this.scene.time.addEvent({
                        delay: 5000,
                        callback: () =>
                        {
                            this.elevatorState.position = 'up';
                        },
                    });
                }
            }
            if (this.elevatorState.position === 'up')
            {
                if (this.y <= this.elevatorState.down)
                {
                    this.body.setVelocityY(100);
                }
                if (this.y >= this.elevatorState.down + 6)
                {
                    this.elevatorState.isMoving = false;
                    this.body.setVelocityY(0);
                    this.scene.time.addEvent({
                        delay: 5000,
                        callback: () =>
                        {
                            this.elevatorState.position = 'down';
                        },
                    });
                }
            }
        }
    }

    public animate (str)
    {
        this.anims.play(str, true);
    }

    public handleElevator ()
    {
        this.elevatorState.isMoving = true;
    }
}
