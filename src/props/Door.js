import DEPTH from '../constant/depth';

/**
 * @description
 * @author © Philippe Pereira 2020
 * @export
 * @class Doors
 * @extends {Phaser.GameObjects.Sprite}
 */
export default class Door extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, config) {
        super(scene, x, y, config.key);

        this.scene = scene;

        this.defaultFrame;
        this.isHidden = false;
        this.isLocked = false;
        this.body;
        this.isOpen = false;
        this.state;
        this.isOpening = false;

        this.state = {
            key: config.key,
            openWith: config.openWith,
        };

        this.isHidden = config.hidden || false;

        this.setTexture('propsAtlas').setName('door');

        // switch(config.key) {
        //     case 'blueDoor':
        //         this.setFrame('blue-door_0');
        //         this.defaultFrame = 'blue-door_0';
        //         break;

        //     case 'greenDoor':
        //         this.setFrame('green-door_0');
        //         this.defaultFrame = 'green-door_0';
        //         break;

        //     case 'redDoor':
        //         this.setFrame('red-door_0');
        //         this.defaultFrame = 'red-door_0';
        //         break;

        //     default:
        //         this.setFrame('blue-door_0');
        //         this.defaultFrame = 'blue-door_0';
        // }

        this.setDepth(DEPTH.DOOR).setRotation(config.rotation);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setAllowGravity(false)
            .setImmovable(true);
        this.body.mass = 20;

        switch(this.angle) {
            case 0:
                this.body.checkCollision.left = false;
                break;

            case -180:
                this.body.checkCollision.right = false;
                break;

            case -90:
                this.body.setSize(24, 4).setOffset(-8, 12);
                this.body.checkCollision.down = false;
                break;

            case 90:
                this.body.setSize(24, 4).setOffset(-8, 8);
                this.body.checkCollision.up = false;
                break;

            default:
                this.body.checkCollision.left = false;
                break;
        }
    }

    animate(str) {
        this.anims.play(str, true).on('animationcomplete', () => {
            this.isOpen = true;

            this.setAlpha(0);
        });
    }

    destroyDoor() {
        this.destroy();
    }

    openDoor() {
        if(this.isOpen || this.isOpening) {
            return;
        }

        this.isOpening = true;

        this.anims.play(`open${this.state.key}`, true).on('animationcomplete', () => {
            this.body.setEnable(false);
            this.setVisible(false).setActive(false);
        });
    }

    setDoorPosition(x, y) {
        this.body.reset(x, y);
    }

    lockDoor() {
        this.isLocked = true;

        this.setFrame('lockedDoor');
    }

    unlockDoor() {
        this.setFrame(this.defaultFrame);

        this.isLocked = false;
    }
}
