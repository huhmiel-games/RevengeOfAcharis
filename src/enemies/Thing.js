export default class Thing extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: 20,
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
      .setAllowGravity()
      .setGravityY(500)
      .setSize(16, 32)
      .setOffset(8, 12);
    this.lastAnim = null;
    this.getFired = false;
    this.flipX = true;
    this.followPath = false;
    this.speed = 20;
    this.walkplay = false;
    this.walkk = this.scene.sound.add('thingStep', { volume: 0.5 });
    this.on('animationupdate', () => {
      const runSpeedNow = Math.abs(this.body.velocity.x);
      //const walkRate = Phaser.Math.RND.realInRange(0.75, 1.25)
      const runTimer = runSpeedNow > 0 ? (500 / runSpeedNow) * 50 : 330;
      if (this.anims.currentAnim.key === 'thing' && !this.walkplay && this.body.blocked.down && this.distance < 350) {
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
    if (this.active && !this.followPath && this.body.blocked.down) {
      this.body.setVelocityX(this.state.directionX)
      this.body.setVelocityY(this.state.directionY);
      let animationName;
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      this.distance = distance;

      if (this.state.directionX < 0) {
        const thingPositionInTileX = Math.floor(this.body.x / 16);
        const thingPositionInTileY = Math.floor(this.body.y / 16);
        const tileThingLeftBottom = this.scene.solLayer.getTileAt(thingPositionInTileX, thingPositionInTileY + 2);

        if (tileThingLeftBottom === null) {
          this.state.directionX = this.speed;
        }
        this.flipX = false;
      } else if (this.state.directionX > 0) {
        const thingPositionInTileX = Math.floor(this.body.x / 16);
        const thingPositionInTileY = Math.floor(this.body.y / 16);
        const tileThingRightBottom = this.scene.solLayer.getTileAt(thingPositionInTileX + 1 , thingPositionInTileY + 2);
        
        if (tileThingRightBottom === null) {
          this.state.directionX = -this.speed;
        }
        this.flipX = true;
      }
      if (this.body.blocked.left) {
        this.state.directionX = Math.abs(this.speed);
      }
      if (this.body.blocked.right) {
        this.state.directionX = -this.speed;
      }
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  playSfxDeath() {
    this.scene.sound.play('thingDeath', { volume: 1, rate: 1 });
  }

  looseLife(e) {
    this.scene.sound.play('thingHit');
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
    
  }
}
