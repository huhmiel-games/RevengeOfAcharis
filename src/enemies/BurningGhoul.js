export default class BurningGhoul extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: -200,
      directionY: 0,
      hited: false,
      giveLife: config.life / 3,
    };
    this.family = 'enemies';
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setPipeline('Light2D');
    this.body
      .setAllowGravity(true)
      .setGravityY(500)
      .setSize(16, 48)
      .setOffset(16, 15);
    this.lastAnim = null;
    this.getFired = false;
    this.flipX = true;
    this.followPath = false;
    this.speed = 200;
    this.walkplay = false;
    this.walkk = this.scene.sound.add('ghoulStep', { volume: 1});
    this.on('animationupdate', () => {
      const runSpeedNow = Math.abs(this.body.velocity.x);
      //const walkRate = Phaser.Math.RND.realInRange(0.75, 1.25)
      const runTimer = runSpeedNow > 0 ? (750 / runSpeedNow) * 50 : 330;
      if (this.anims.currentAnim.key === 'burning-ghoul' && !this.walkplay && this.body.blocked.down && this.distance < 350) {
        this.walkplay = true;
        this.walkk.play();//{ rate: walkRate }
        this.scene.time.addEvent({
          delay: runTimer,
          callback: () => {
            this.walkk.stop()
            this.walkplay = false;
          },
        });
      }
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active && !this.followPath) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);
      let animationName;
      animationName = 'burning-ghoul';
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      this.distance = distance;
      // turn back if blocked
      if (this.body.blocked.left) {
        this.state.directionX = this.speed;
      }
      if (this.body.blocked.right) {
        this.state.directionX = -this.speed;
      }
      // fall
      if (!this.body.blocked.down) {
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

      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.scene.sound.play('ghoulHit');
    this.state.life = this.state.life - e;
  }

  playSfxDeath() {
    this.scene.sound.play('ghoulDeath', { volume: 1, rate: 1 });
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
    
  }
}
