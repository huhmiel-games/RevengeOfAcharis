export default class HellHound extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: 100,
      directionY: 0,
      hited: false,
      giveLife: config.life / 3,
    };
    this.family = 'enemies';
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body
      .setAllowGravity()
      .setGravityY(500)
      .setSize(32, 16)
      .setOffset(16, 12);
    this.lastAnim = null;
    this.getFired = false;
    this.flipX = true;
    this.followPath = false;
    this.speed = 100;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active && !this.followPath) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);
      let animationName;
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      
      if (distance <= 60) {
          const dx = this.scene.player.x - this.x;
          const dy = this.scene.player.y - this.y;
          const angle = Math.atan2(dy, dx);
          this.body.setVelocityY(Math.sin(angle) * (this.speed/2));
          animationName = 'hellHoundJump';
      } else {
        animationName = 'hellHoundRun';
        // turn back if blocked
        if (this.body.blocked.left) {
          this.state.directionX = this.speed;
        }
        if (this.body.blocked.right) {
          this.state.directionX = -this.speed;
        }
        // fall
        if (this.body.blocked.none) {
          this.state.directionY = 600;
        }
        if (this.body.blocked.down) {
          this.state.directionY = 0;
        }
        // flip the sprite
        if (this.state.directionX > 0) {
          this.flipX = true;
        } else {
          this.flipX = false;
        }
      }
      
      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
    if (this.active && this.scene[`path${this.name}`]) {
      this.scene[`path${this.name}`].active ? this.startOnPath() : this.followPath = false;
    }
    
  }

  startOnPath() {
    this.setPosition(this.scene[`path${this.name}`].x, this.scene[`path${this.name}`].y);
    this.body.setAllowGravity(false);
    this.angle = this.scene[`path${this.name}`].angle;
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
        this.state.directionX = -this.speed;
      } else {
        this.state.directionX = this.speed;
      }
    }
  }

  explode(bullet) {
    // const arr = [];
    // for (let i = 0; i < 30; i += 1) {
    //   arr.push(i.toString());
    // }
    // const bulletSpeed = bullet.x !== 0 ? bullet.x / 2 : bullet.y / 2;
    // this.scene.particles = null;
    //this.scene.crabParticles = this.scene.add.particles('explodedCrab');
    // this.scene.crabEmitter = this.scene.crabParticles.createEmitter({
    //   angle: { min: -30, max: -150 },
    //   speed: { min: 200, max: 300 },
    //   frame: arr,
    //   quantity: 16,
    //   lifespan: 3000,
    //   alpha: 1,
    //   rotate: { start: 0, end: 3, ease: 'Linear' },
    //   gravityY: 300,
    //   on: false,
    // });
    // this.scene.crabParticles.emitParticleAt(this.x, this.y).setDepth(2000).setPipeline('Light2D');
  }
}
