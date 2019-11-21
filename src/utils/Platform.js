export default class Platform extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.duration = config.duration;
    this.directionType = config.directionType
    this.setDepth(101);
    
    //this.setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setAllowGravity(false).setImmovable(true).setFriction(1, 0);
    this.followPath = true;
    //this.startOnPath();
    this.direction = 'right';
    this.startMoving('right');
    this.handleDirection();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    if (this.active && this.scene[`path${this.name}`]) {
      // if (this.active && this.body.velocity.x === 0) {
      //   this.body.setVelocityX(100);
      // }
      // if (this.body.x <= this.scene[`path${this.name}`].x - 3 && this.body.velocity.x < 0) {
      //   this.body.setVelocityX(100);
      // } else if (this.body.x > this.scene[`path${this.name}`].x + 3 && this.body.velocity.x > 0) {
      //   this.body.setVelocityX(-100);
      // }
      // if (this.y < this.scene[`path${this.name}`].y) {
      //   this.body.setVelocityY(200);
      // } else {
      //   this.body.setVelocityY(-200);
      // }

      //this.scene[`path${this.name}`].active ? this.startOnPath() : this.followPath = false;

    }
  }

  handleDirection() {
    if (!this.active) {
      return;
    }
    this.scene.time.addEvent({
      delay: this.duration,
      loop: true,
      callback: () => {
        if (this.direction === 'right') {
          this.direction = 'left';
        } else {
          this.direction = 'right';
        }
        this.startMoving(this.direction);
      }
    });
  }

  startMoving(direction) {
    if (!this.active) {
      return;
    }
    if (!this.directionType) {
      if(direction === 'right') {
        this.body.setVelocityX(100);
      } else {
        this.body.setVelocityX(-100);
      }
    } else {
      if (direction === 'right') {
        this.body.setVelocityY(100);
      } else {
        this.body.setVelocityY(-100);
      }
    }
  }

  startOnPath() {
    this.setPosition(this.scene[`path${this.name}`].x, this.scene[`path${this.name}`].y);
    this.body.setAllowGravity(false);
    //this.angle = this.scene[`path${this.name}`].angle;
    this.followPath = true;
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.scene.sound.play('enemyHit');
    this.state.life = this.state.life - e;
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
    const arr = [];
    for (let i = 0; i < 30; i += 1) {
      arr.push(i.toString());
    }
    // const bulletSpeed = bullet.x !== 0 ? bullet.x / 2 : bullet.y / 2;
    // this.scene.particles = null;
    this.scene.crabParticles = this.scene.add.particles('explodedCrab');
    this.scene.crabEmitter = this.scene.crabParticles.createEmitter({
      angle: { min: -30, max: -150 },
      speed: { min: 200, max: 300 },
      frame: arr,
      quantity: 16,
      lifespan: 3000,
      alpha: 1,
      rotate: { start: 0, end: 3, ease: 'Linear' },
      gravityY: 300,
      on: false,
    });
    this.scene.crabParticles.emitParticleAt(this.x, this.y).setDepth(2000).setPipeline('Light2D');
  }
}
