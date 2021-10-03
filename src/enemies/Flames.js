export default class Flames extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.scene = scene;
    this.name = 'flame';
    this.life = 10000;
    this.enemyState = {
      damage: 60,
    }
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setAllowGravity(false).setImmovable(true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    if (e.name === 'waterStorm') {
      this.destroy();
    }
  }

  checkCollision(d) {
    if (d.type === 'Sprite') {
      if (this.enemyState.directionX > 0) {
        this.enemyState.directionX = -30;
      } else {
        this.enemyState.directionX = 30;
      }
    }
  }

  explode(bullet) {
    
  }
}
