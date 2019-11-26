export default class Ghost extends Phaser.GameObjects.Sprite {
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
      giveLife: config.life / 2,
    };
    this.family = 'enemies';
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.setPipeline('Light2D');
    this.body.setAllowGravity(false).setSize(20, 28).setOffset(10, 20);
    this.state.directionY = Math.sin(300 + Math.PI / 4);
    this.getFired = false;
    this.waspFX = this.scene.sound.add('ghostFly', { volume: 1 });
    this.ghostLight = this.scene.lights.addLight(this.x, this.y + 48, 48, 0xFCDECA, 0.6);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);
      this.body.velocity.normalize().scale(150);
      // turn back if blocked
      if (this.body.blocked.left) {
        this.state.directionX = 100;
        this.playSound();
      }
      if (this.body.blocked.right) {
        this.state.directionX = -100;
        this.playSound();
      }
      if (this.state.directionY > 0) {
        this.state.directionY += 2;
      } else {
        this.state.directionY -= 2;
      }
      if (this.body.blocked.down || this.state.directionY > 120) {
        this.state.directionY = -1;
        this.playSound();
      } else if (this.body.blocked.up || this.state.directionY < -120) {
        this.state.directionY = 2;
        this.playSound();
      }
      // flip the sprite
      if (this.state.directionX > 0) {
        this.flipX = false;
      } else {
        this.flipX = true;
      }
      if (this.ghostLight && this.active) {
        this.ghostLight.setPosition(this.body.x, this.body.y);
      } else {
        this.ghostLight.setPosition(-10000, -10000);
      }
    }
  }

  playSound() {
    if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) <= 150) {
      if (!this.waspFX.isPlaying) {
        this.waspFX.play();
      }
    }
  }

  playSfxDeath() {
    this.ghostLight.setPosition(-10000, -10000);
    this.scene.sound.play('ghostDeath', { volume: 1, rate: 1 });
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.scene.sound.play('ghostHit');
    this.state.life = this.state.life - e;
  }

  explode(bullet) {
        
  }

  checkCollision(d) {
    if (d.type === 'Sprite') {
      this.playSound();
      if (this.state.directionX > 0) {
        this.state.directionX = -100;
      } else {
        this.state.directionX = 100;
      }
    }
  }
}
