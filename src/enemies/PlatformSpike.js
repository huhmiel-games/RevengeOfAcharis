export default class PlatformSpike extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.scene = scene;
    this.name = 'platformSpike';
    this.duration = config.duration;
    this.directionType = config.directionType;
    this.enemyState = {
      damage: 20,
    }
    this.setDepth(101);
    this.durationTimer = 4000;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setAllowGravity(false).setImmovable();
    this.fallTimer = null;
    this.riseTimer = null;
    this.spikeIsPlaying = false;
    this.rise();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.body.onFloor()) {
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      if (distance < 350) {
        this.scene.shakeCamera(200);
        this.playSpikeSound();
      }
    }
  }

  playSpikeSound() {
    if (this.spikeIsPlaying) {
      return;
    }
    this.spikeIsPlaying = true;
    this.scene.sound.play('spikeBlock', { volume: 0.5 });
    this.scene.time.addEvent({
      delay: 600,
      callback: () => {
        this.spikeIsPlaying = false;
      }
    });
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
