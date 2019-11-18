export default class Wizard extends Phaser.GameObjects.Sprite {
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
      giveLife: config.life / 2,
    };
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body
      .setAllowGravity(false)
      .setSize(20, 40)
      .setOffset(32, 24);
    this.setAlpha(0);
    this.lastAnim = null;
    this.getFired = false;
    this.flipX = true;
    this.isAppearing = false;
    this.isFiring = false;
    this.isHidden = true;
    this.isShooting = false;
    this.wizardTimer = null;
    this.lastFired = 0;
    this.speed = 20;
    this.animate(config.key, true);
    this.handleWizard()
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      // flip to face the player
      if (this.x > this.scene.player.x) {
        this.flipX = false;
      } else {
        this.flipX = true;
      }
    }
  }

  handleWizard() {
    if (this.wizardTimer !== null || !this.active) {
      return;
    }
    if (!this.scene) {
      return;
    }
    this.wizardTimer = this.scene.time.addEvent({
      delay: 5000, //Phaser.Math.Between(2000, 5000),
      callback: () => {
        if (this.isHidden && this.active) {
          this.isAppearing = true;
          this.appears();
          this.wizardTimer = null;
        }
      },
    });
  }

  appears() {
    if (!this.isAppearing) {
      return;
    }
    this.isAppearing = false;
    this.wizardTimer = null;
    this.animate('wizard-idle', true);
    const randomX = Phaser.Math.Between(this.scene.player.x - 180, this.scene.player.x + 180);
    const randomY = Phaser.Math.Between(this.scene.player.y - 50, this.scene.player.y + 50);
    this.setPosition(randomX, randomY)
    this.fadingTween = this.scene.tweens.add({
      targets: this,
      ease: 'Sine.easeInOut',
      duration: 1000,
      delay: 0,
      repeat: 0,
      yoyo: false,
      alpha: {
        getStart: () => 0,
        getEnd: () => 1,
      },
      onComplete: () => {
        this.isFiring = true;
        this.animate('wizard-fire', true);
        this.fireThePlayer();
      },
    });
  }

  fireThePlayer() {
    if (!this.isFiring) {
      return;
    }
    this.isFiring = false;
    this.on('animationcomplete', (wizard) => {
      this.shootThePlayer()
          // const angle = Math.atan2(dy, dx);
      this.fadingTween = this.scene.tweens.add({
        targets: this,
        ease: 'Sine.easeInOut',
        duration: 800,
        delay: 0,
        repeat: 0,
        yoyo: false,
        alpha: {
          getStart: () => 1,
          getEnd: () => 0,
        },
        onComplete: () => {
          this.isFiring = false;
          this.isHidden = true;
          this.setPosition(-100, -100);
          this.handleWizard()
        },
      });
    }, this)
  }

  shootThePlayer() {
    if (this.isFiring) {
      return;
    }
    this.isFiring = true;
    const ball = this.scene.fireballs.getFirstDead(true, this.body.x, this.body.y, 'fireBall', null, true);
    if (ball) {
      ball.visible = true;
      ball.anims.play('fireball', true);
      ball.setDepth(102);
      ball.state = { damage: 15 };
      ball.name = 'fireball';
      ball.body.setCircle(6)
      this.scene.fireballGroup.push(ball)

      const dx = this.scene.player.x - this.x;
      const dy = this.scene.player.y - this.y;
      const angle = Math.atan2(dy, dx);
      ball.body.setVelocity(Math.cos(angle) * 330, Math.sin(angle) * 330);

      ball.setRotation(angle + Math.PI/2)
      this.scene.sound.play('swell', { volume: 0.15 });
      this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          this.isFiring = false;
          ball.destroy();
        },
      });
    }
  }

  animate(str) {
    this.active && this.anims.play(str, true);
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
    
  }
}
