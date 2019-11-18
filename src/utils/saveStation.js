export default class SaveStation extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      destination: config.destination,
      text: 'press fire to save the game',
      confirm: false,
      active: false,
      save: false,
    };

    this.setDepth(100);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.isOverlap = false;
    this.animate(config.key, true);
  }

  animate(str) {
    this.anims.play(str, true);
  }

  setIsOverlap() {
    this.isOverlap = true;
  }
}
