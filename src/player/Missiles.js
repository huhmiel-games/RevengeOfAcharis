export default class Missiles extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.lifespan = 0;
    this.key = 'missile';
    this.frame = 0;
    //this.setPipeline('Light2D');
    //this.setDepth(3000);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }
}
