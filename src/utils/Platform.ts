export default class Platform extends Phaser.GameObjects.Sprite
{
    public body: Phaser.Physics.Arcade.Body;
    private duration: any;
    private directionType: any;
    private followPath: boolean;
    private direction: string;
    constructor (scene, x, y, config)
    {
        super(scene, x, y, config.key);
        this.scene = scene;
        this.name = config.name;
        this.duration = config.duration;
        this.directionType = config.directionType;
        this.setDepth(101);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setAllowGravity(false).setImmovable(true).setFriction(1, 0);
        this.followPath = true;
        this.direction = 'right';
        this.startMoving('right');
        this.handleDirection();
    }

    private handleDirection ()
    {
        if (!this.active)
        {
            return;
        }

        this.scene.time.addEvent({
            delay: this.duration,
            loop: true,
            callback: () =>
            {
                if (this.direction === 'right')
                {
                    this.direction = 'left';
                }
                else
                {
                    this.direction = 'right';
                }

                this.startMoving(this.direction);
            }
        });
    }

    private startMoving (direction)
    {
        if (!this.active)
        {
            return;
        }

        if (!this.directionType)
        {
            if (direction === 'right')
            {
                this.body.setVelocityX(100);
            } else
            {
                this.body.setVelocityX(-100);
            }
        }
        else
        {
            if (direction === 'right')
            {
                this.body.setVelocityY(100);
            } else
            {
                this.body.setVelocityY(-100);
            }
        }
    }
}