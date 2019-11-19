export default class HellBeast extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: 2000,
      damage: 5,
      directionX: -550,
      directionY: 0,
      hited: false,
      lastFired: 0,
      fireRate: 20,
    };
    this.setDepth(104);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setSize(64, 64);
    this.getFired = false;
    this.lastAnim = null;
    this.isAppearing = false;
    this.isFiring = false;
    this.isHidden = true;
    this.isShooting = false;
    this.isLavaAttack = false;
    this.hellBeastTimer = null;
    this.battleStarted = false;
    this.attackTime = null;
    this.fireBallAttackCount = 0;
    this.isDead = false;
    this.blockDoors();
    this.handleHellBeast();
    this.on('animationcomplete', () => {
      const actualKey = this.anims.currentAnim.key;
      if (this.isLavaAttack && actualKey === 'hell-beast-burn') {
        this.animate('hell-beast-lava', true);
        this.state.damage = 75;
        this.body.setSize(64, 160);
        this.scene.shakeCamera(350)
        this.body.reset(this.body.x + 32, 144);
        this.body.setVelocityX(Phaser.Math.Between(-50, 50));
        return;
      }
      if (actualKey === 'hell-beast-breath') {
        this.shootThePlayer();
        return;
      }
      if (actualKey === 'hell-beast-breath-stroke') {
        this.shootThePlayer();
        return;
      }
    });
  }

  // availables anims
  // hell-beast-idle
  // hell-beast-idle-stroke
  // hell-beast-breath
  // hell-beast-breath-stroke
  // hell-beast-burn
  // hell-beast-lava

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      if (this.x > this.scene.player.x) {
        this.flipX = false;
      } else if (this.x < this.scene.player.x) {
        this.flipX = true;
      }
    }
  }

  handleHellBeast() {
    if (this.hellBeastTimer !== null || !this.active) {
      return;
    }
    if (!this.scene) {
      return;
    }
    this.hellBeastTimer = this.scene.time.addEvent({
      delay: this.state.life,
      callback: () => {
        if (this.isHidden && this.active) {
          this.isAppearing = true;
          this.appears();
          this.hellBeastTimer = null;
        }
      },
    });
  }

  appears() {
    if (!this.isAppearing) {
      return;
    }
    this.isAppearing = false;
    this.hellBeastTimer = null;
    const selectAnim = this.state.life > 1000 ? 'hell-beast-idle' : 'hell-beast-idle-stroke';
    this.animate(selectAnim, true);
    this.body.setSize(64, 64);
    const randomX = Phaser.Math.Between(24, 376);
    this.body.reset(randomX, 188)
    this.fadingTween = this.scene.tweens.add({
      targets: this,
      ease: 'Sine.easeInOut',
      duration: 500,
      delay: 0,
      repeat: 0,
      yoyo: false,
      alpha: {
        getStart: () => 0,
        getEnd: () => 1,
      },
      onComplete: () => {
        this.isFiring = true;
        this.prepareToFire();
      },
    });
  }

  prepareToFire() {
    if (!this.active) {
      return;
    }
    if (this.fireBallAttackCount <= 3) {
      this.fireBallAttackCount += 1;
    } else {
      this.fireBallAttackCount = 0;
      this.isLavaAttack = true;
      this.lavaAttack();
      return;
    }
    
    const fireTimer = this.scene.time.addEvent({
      startAt: 200,
      delay: 500,
      repeat: 2,
      callback: () => {
        if (!this.active) {
          return;
        }
        const selectAnim = this.state.life > 750 ? 'hell-beast-breath' : 'hell-beast-breath-stroke';
        this.animate(selectAnim, true);
        if (fireTimer.repeatCount === 0) {
          this.hellBeastFadeOut()
        }
      },
    });
  }

  hellBeastFadeOut() {
    if (!this.active) {
      return;
    }
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
        if (!this.active) {
          return;
        }
        this.isFiring = false;
        this.isHidden = true;
        this.body.reset(-100, -100);
        this.handleHellBeast();
      },
    });
  }

  lavaAttack() {
    if (!this.isLavaAttack || !this.active) {
      return;
    }
    const lavaFireTimer = this.scene.time.addEvent({
      startAt: 100,
      delay: 1000,
      repeat: 3,
      callback: () => {
        if (!this.active) {
          return;
        }
        if (lavaFireTimer.repeatCount === 3) {
          this.animate('hell-beast-burn', true);
          this.body.reset(200, 188);
          this.body.setSize(64, 64);
        }
        if (lavaFireTimer.repeatCount === 2) {
          this.animate('hell-beast-burn', true);
          this.body.setSize(64, 64);
          this.body.reset(79, 188);
        }
        if (lavaFireTimer.repeatCount === 1) {
          this.animate('hell-beast-burn', true);
          this.body.setSize(64, 64);
          this.body.reset(318, 188);
        }
        if (lavaFireTimer.repeatCount === 0) {
          this.body.setSize(64, 64);
          this.setAlpha(0);
          this.state.damage = 5;
          this.body.setVelocityX(0)
          this.body.reset(-100, -100);
          this.hellBeastFadeOut();
          this.isLavaAttack = false;
          lavaFireTimer.destroy();
        }
      },
    });
  }

  shootThePlayer() {
    if (this.body.x < -30) {
      return;
    }
    this.isFiring = true;
    const ball = this.scene.fireballs.getFirstDead(true, this.body.x + this.width / 2, 198, 'fireBall', null, true);
    if (ball) {
      ball.visible = true;
      ball.anims.play('fireball', true);
      ball.setDepth(102);
      ball.state = { damage: 30 };
      ball.name = 'fireball';
      ball.body.setCircle(6)
      this.scene.fireballGroup.push(ball)

      const dx = this.scene.player.x - this.x;
      const dy = this.scene.player.y - this.y;
      const angle = Math.atan2(dy, dx);
      ball.body.setVelocity(Math.cos(angle) * 380, Math.sin(angle) * 380);

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

  playRoar(cri) {
    if (!this.roar) {
      this.roar = true;
      this.scene.sound.play(cri);
      this.scene.time.addEvent({
        delay: 1800,
        callback: () => {
          this.roar = false;
        },
      });
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    if (this.isLavaAttack) {
      return;
    }
    this.state.life = this.state.life - e;
    if (this.state.life <= 0) {
      this.unlockDoors();
      this.scene.player.inventory.boss2 = true;
    }
  }

  explode() {
    this.isDead = true;
    this.body.setVelocity(0, 0);
    this.unlockDoors();
  }

  blockDoors() {
    this.scene.battleWithBoss = true;
  }

  unlockDoors() {
    this.scene.battleWithBoss = false;
    this.scene.player.inventory.boss1 = true;
  }

  checkCollision(d) {
    return;
  }
}
