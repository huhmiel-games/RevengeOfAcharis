export default class Doors extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.scene = scene;
    this.state = {
      key: 'blackpixel',
      side: config.side,
      destination: config.destination,
      playerX: config.playerX,
      playerY: config.playerY,
      openWith: config.openWith,
    };
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setImmovable(true);
    this.body.setVelocity(0, 0);
    this.body.mass = 20;
    this.isOpen = false;
    this.setAlpha(0);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  destroyDoor() {
    this.destroy(true);
  }

  openDoor() {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    this.setAlpha(0.1);
    if (this.state.side === 'left') {
      this.x = this.x + 32;
    } else if (this.state.side === 'right') {
      this.x = this.x - 32;
    }
  }

  setDoorPosition(x, y) {
    this.body.reset(x, y);
  }
}
