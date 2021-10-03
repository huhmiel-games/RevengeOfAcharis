export default class HellBeast extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.enemyState = {
      life: 2000,
      damage: 0,
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
    this.isGlowing = false;
    this.isDead = false;
    this.hellBeastThemeIsPlaying = false;
    // this.glowingSfx = this.scene.sound.add('hellBeastGlowingSfx');
    this.blockDoors();
    this.startBattle();

    this.on('animationcomplete', () => {
      const actualKey = this.anims.currentAnim.key;
      if (this.isLavaAttack && actualKey === 'hell-beast-burn') {
        this.animate('hell-beast-lava', true);
        this.scene.sound.play('hellBeastLavaAttackSfx');
        this.enemyState.damage = 75;
        this.body.setSize(64, 160);
        this.scene.shakeCamera(350)
        this.body.reset(this.body.x + 32, 144);
        this.body.setVelocityX(Phaser.Math.Between(-50, 50));
        return;
      }
      if (actualKey === 'hell-beast-breath') {
        this.shootThePlayer();
        this.scene.sound.play('hellBeastFireballSfx');
        return;
      }
      if (actualKey === 'hell-beast-breath-stroke') {
        this.shootThePlayer();
        this.scene.sound.play('hellBeastFireballSfx');
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

    // hellBeastDeathSfx
    // hellBeastFireballSfx
    // hellBeastHitSfx
    // hellBeastLavaAttackSfx
    // hellBeastFirstLaughSfx
    // hellBeastAppearLaughSfx
    // hellBeastDisappearLaughSfx
    // hellBeastGlowingSfx

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      if (this.x > this.scene.player.x) {
        this.flipX = false;
      } else if (this.x < this.scene.player.x) {
        this.flipX = true;
      }
      // if (this.scene.player.state.dead) {
      //   this.glowingSfx.stop();
      // }
    }
  }

  // playGlowing() {
  //   if (this.isGlowing) {
  //     return;
  //   }
  //   this.isGlowing = true;
  //   this.glowingSfx.play({ loop: true });
  // }

  startBattle() {
    const msg = `Hmm fresh meat...`;
    this.scene.time.addEvent({
      delay: 600,
      callback: () => {
        this.showMsg = this.scene.add.bitmapText(190, 138, 'atomic', msg, 8, 1)
          .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);
        this.scene.sound.play('hellBeastFirstLaughSfx');
      }
    });

    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.showMsg.destroy();
        this.handleHellBeast();
      }
    });
    
  }

  handleHellBeast() {
    if (this.hellBeastTimer !== null || !this.active) {
      return;
    }
    if (!this.scene) {
      return;
    }
    this.hellBeastTimer = this.scene.time.addEvent({
      delay: this.enemyState.life,
      callback: () => {
        if (this.isHidden && this.active) {
          this.isAppearing = true;
          this.appears();
          // this.playHellBeastTheme();
          this.hellBeastTimer = null;
        }
      },
    });
  }

  playHellBeastTheme() {
    if (this.hellBeastThemeIsPlaying) {
      return;
    }
    this.hellBeastThemeIsPlaying = true;
    this.scene.playMusic('hellBeastFight');
  }

  appears() {
    if (!this.isAppearing) {
      return;
    }
    this.isAppearing = false;
    this.hellBeastTimer = null;
    const selectAnim = this.enemyState.life > 1000 ? 'hell-beast-idle' : 'hell-beast-idle-stroke';
    this.animate(selectAnim, true);
    this.body.setSize(64, 64);
    const randomX = Phaser.Math.Between(24, 376);
    this.body.reset(randomX, 188);
    this.scene.sound.play('hellBeastAppearLaughSfx');
    this.playHellBeastTheme();
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
        //this.playHellBeastTheme();
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
        const selectAnim = this.enemyState.life > 750 ? 'hell-beast-breath' : 'hell-beast-breath-stroke';
        // if (selectAnim === 'hell-beast-breath-stroke') {
        //   this.playGlowing();
        // }
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
    this.scene.sound.play('hellBeastDisappearLaughSfx');
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
          this.enemyState.damage = 0;
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
      ball.enemyState = { damage: 30 };
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

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    if (this.isLavaAttack) {
      return;
    }
    this.enemyState.life = this.enemyState.life - e;
    this.scene.sound.play('hellBeastHitSfx', { volume: 1, rate: 1 });
    if (this.enemyState.life <= 0) {
      // this.glowingSfx.stop();
      this.unlockDoors();
      this.scene.player.inventory.boss2 = true;
      this.scene.stopMusic();
      this.scene.playMusic('hellBeastFight');
    }
  }

  playSfxDeath() {
    this.scene.sound.play('hellBeastDeathSfx');
  }

  explode() {
    this.isDead = true;
    this.body.setVelocity(0, 0);
    this.scene.lavaStormPowerUp.body.reset(195, 195)
    this.scene.lavaStormPowerUp.setAlpha(1);
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
