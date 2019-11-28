export default class PlatformSpike extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.scene = scene;
    this.name = 'platformSpike';
    this.duration = config.duration;
    this.directionType = config.directionType;
    this.state = {
      damage: 20,
    }
    this.setDepth(101);
    this.durationTimer = 4000;
    this.setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setAllowGravity(false).setImmovable();
    this.fallTimer = null;
    this.riseTimer = null;   
    this.rise();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.body.onFloor()) {
      this.scene.shakeCamera(200);
    }
  }

  fall() {
    if (!this.active) {
      return;
    }
    this.fallTimer = this.scene.time.addEvent({
      delay: this.duration,
      callback: () => {
        if (!this.active) {
          return;
        }
        this.body.setVelocityY(600);
        this.rise();
      }
    });
  }

  rise() {
    if (!this.active) {
      return;
    }
    this.riseTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        if (!this.active) {
          return;
        }
        this.body.setVelocityY(-100);
        this.fall();
      }
    });
  }

  checkCollision(d) {
    if (d.type === 'Sprite') {
      if (this.state.directionX > 0) {
        this.state.directionX = -30;
      } else {
        this.state.directionX = 30;
      }
    }
  }

  explode(bullet) {
    
  }
}
