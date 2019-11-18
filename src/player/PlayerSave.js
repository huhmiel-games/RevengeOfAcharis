import getConfigKeys from '../utils/getConfigKeys';

let morph;
let jumpB;

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.lastAnim = null;
    this.scene = scene;
    this.inventory = {
      lifeEnergyBlock: 1,
      life: 100,
      savedPositionX: 600,
      savedPositionY: 300,
      map: 'map1',
      selectableWeapon: ['bullet'],
      gun: false,
      bulletDamage: 5,
      swell: false,
      swellDamage: 10,
      missile: false,
      missileDamage: 100,
      laser: false,
      laserDamage: 50,
      fireRate: 420,
      morphing: false,
      morphingBomb: false,
      morphingSonar: false,
      jumpBooster: true,
      speedBooster: true,
      boss1: false,
      bossFinal: false,
      rhino: false,
      powerUp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    this.state = {
      canJump: false,
      stopJump: false,
      onJump: false,
      jumpDelay: 500,
      onRun: false,
      onWalk: true,
      onMorphingBall: false,
      jumpBoost: false,
      onJumpBoost: false,
      speed: 165,
      runSpeed: 285,
      maxSpeed: 300,
      morphingSpeed: 140,
      selectedWeapon: 'bullet',
      lastFired: 0,
      bulletOrientationX: 'right',
      bulletOrientationY: 'normal',
      bulletPositionY: 10,
      bulletPositionX: 10,
      pause: false,
      dead: false,
      fullScreen: false,
      rhinoCount: 0,
      e: 0,
      d: 0,
      colorChange: false,
      SuperPowersActive: false,
    };

    this.onWater = false;
    this.jumpCooldownTimer = null;
    this.isSpeedRunningTimer = null;
    this.onSpeedRunning = 0;
    this.boostTimer = null;
    this.bombTimer = null;
    this.lavaOverlap = false;
    this.selectWeaponFlag = false;
    this.chooseDone = false;
    this.setDepth(105);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    const keysOptions = getConfigKeys();
    this.keys = this.scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes[keysOptions[0]],
      right: Phaser.Input.Keyboard.KeyCodes[keysOptions[1]],
      up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
      down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
      fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
      jump: Phaser.Input.Keyboard.KeyCodes[keysOptions[5]],
      run: Phaser.Input.Keyboard.KeyCodes[keysOptions[6]],
      select: Phaser.Input.Keyboard.KeyCodes[keysOptions[7]],
      pause: Phaser.Input.Keyboard.KeyCodes[keysOptions[8]],
    });

    this.ComboMorphingBall = this.scene.input.keyboard.createCombo(
      [this.keys.down, this.keys.down],
      {
        resetOnWrongKey: true,
        maxKeyDelay: 500,
        resetOnMatch: true,
        deleteOnMatch: false,
      },
    );
    this.ComboJumpBooster = this.scene.input.keyboard.createCombo(
      [this.keys.down, this.keys.jump],
      {
        resetOnWrongKey: true,
        maxKeyDelay: 500,
        resetOnMatch: true,
        deleteOnMatch: false,
      },
    );
    this.scene.input.keyboard.on('keycombomatch', (keyCombo) => {
      if (keyCombo.keyCodes[0] === this.keys.down.keyCode && keyCombo.keyCodes[1] === this.keys.down.keyCode && !this.body.touching.down) {
        morph = true;
        if (this.inventory.morphing) {
          this.scene.sound.play('morph', { volume: 0.3 });
        }
      }
      if (keyCombo.keyCodes[0] === this.keys.down.keyCode && keyCombo.keyCodes[1] === this.keys.jump.keyCode) {
        jumpB = true;
      }
    });

    this.playerGhostParticles = this.scene.add.particles('playerShoot').setDepth(99);
    this.playerGhostEmitter = this.playerGhostParticles.createEmitter({
      speed: this.body.velocity.x,
      quantity: 1,
      //lifespan: 32,
      //tint: [ 0xffff00, 0xff0000, 0x00ff00, 0x0000ff ],
      //tint: { start: 0xCC2485, end: 0xCCCC00 },
      alpha: { start: 0.7, end: 0 },
      //frame: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], cycle: false},
      //frequency: 10,
      //scale: { start: 1, end: 0 },
      rotate: 0,
      gravityY: 0,
      on: false,
      active: true,
      //blendMode: 1,
      // emitCallback: () => {
      //   if (Math.abs(this.body.velocity.x) > 550) {
      //     console.log(this.playerGhostEmitter)
      //     //this.playerGhostParticles.tint.start = 0xCCCC00;
      //   }
      // },
    });
    //this.playerGhostEmitter.startFollow(this);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const {
      body, keys, state, inventory,
    } = this;
    let animationName;
    // if not game pause
    if (!state.pause && !state.dead) {
      // check morphing ball ability active
      if (inventory.morphing) {
        this.state.onMorphingBall = morph;
      }
      // check jumpBooster ability active
      if (inventory.jumpBooster) {
        this.state.jumpBoost = jumpB;
      }
      // check jumpBoost
      if (body.blocked.down && state.jumpBoost) {
        this.jumpBoosterTimer();
      }
      // fire Y orientation
      if (keys.up.isDown && !morph) {
        this.state.bulletOrientationY = 'up';
      } else {
        this.state.bulletOrientationY = 'normal';
      }
      if (keys.up.isDown && state.onMorphingBall && this.scene.solLayer.getTileAtWorldXY(body.x + 6, body.y - 16, true) && !body.touching.down) {
        if (!this.scene.solLayer.getTileAtWorldXY(body.x + 6, body.y - 16, true).properties.collides) {
          this.state.bulletOrientationY = 'up';
          this.state.onMorphingBall = false;
          morph = false;
        }
      }
      // call run speed
      this.isRunning();
      if (keys.fire.isDown) {
        this.shoot(time);
      }
      // player movement
      // marche vers la gauche
      if (keys.left.isDown && !keys.run.isDown && !state.onMorphingBall) {
        this.body.setVelocityX(-this.state.speed);
        this.state.bulletOrientationX = 'left';
        if (keys.jump.isDown && !body.blocked.down) {
          animationName = 'jump';
        } else {
          animationName = 'walkShoot';
        }
        this.body.setSize(10, 35, true);
        // marche vers la droite
      } else if (keys.right.isDown && !keys.run.isDown && !state.onMorphingBall) {
        this.body.setVelocityX(this.state.speed);
        this.state.bulletOrientationX = 'right';
        if (keys.jump.isDown && !body.blocked.down) {
          animationName = 'jump';
        } else {
          animationName = 'walkShoot';
        }
        this.body.setSize(10, 35, true);
        // cours vers la gauche
      } else if (keys.left.isDown && keys.run.isDown && !state.onMorphingBall) {
        this.body.setVelocityX(-this.state.speed);
        this.state.bulletOrientationX = 'left';
        if (keys.jump.isDown && !body.blocked.down) {
          animationName = 'jump';
        } else {
          animationName = 'runShoot';
        }
        this.body.setSize(10, 35, true);
        // cours vers la droite
      } else if (keys.right.isDown && keys.run.isDown && !state.onMorphingBall) {
        this.body.setVelocityX(this.state.speed);
        this.state.bulletOrientationX = 'right';
        if (keys.jump.isDown && !body.blocked.down) {
          animationName = 'jump';
        } else {
          animationName = 'runShoot';
        }
        this.body.setSize(10, 35, true);
        // saut droit et chute libre
      } else if (!body.blocked.down
        && !(keys.left.isDown || keys.right.isDown)
        && !state.onMorphingBall
        && !state.jumpBoost
        && !body.touching.down
        && !state.SuperPowersActive) {
        animationName = 'jumpVertical';
        this.body.setVelocityX(0);
        this.ComboJumpBooster.enabled = false;
        // saut avec booster
      } else if (state.jumpBoost
        && !(keys.left.isDown || keys.right.isDown)
        && !state.onMorphingBall) {
        animationName = 'jumpBoost';
        // super power jump vertical
      } else if (!body.blocked.down
        && !(keys.left.isDown || keys.right.isDown)
        && !state.onMorphingBall
        && !state.jumpBoost
        && !body.touching.down
        && state.SuperPowersActive) {
        animationName = 'jumpBoost';
        // position baissée
      } else if (keys.down.isDown && !state.onMorphingBall && !body.touching.down && !(keys.left.isDown || keys.right.isDown)) {
        this.body.setVelocityX(0);
        this.state.bulletPositionY = 10;
        animationName = 'duck';
        this.body.velocity.y = -0.5;
        this.body.setSize(10, 23, 8, 10);
        // morphing ball
      } else if (state.onMorphingBall) {
        animationName = 'morphingBall';
        this.body.setSize(10, 10, true);
        this.body.setOffset(15, 22);
        if (!(keys.left.isDown || keys.right.isDown)) {
          if (this.lastAnim !== 'morphingBall') {
            animationName = 'morphingBallIdle';
          }
          this.body.setVelocityX(0);
          if (this.anims.isPlaying) {
            this.anims.pause(this.anims.currentFrame);
          }
        } else if (keys.left.isDown) {
          this.body.setVelocityX(-this.state.morphingSpeed);
          this.state.bulletOrientationX = 'left';
          this.anims.resume(this.anims.currentFrame);
        } else if (keys.right.isDown) {
          this.body.setVelocityX(this.state.morphingSpeed);
          this.state.bulletOrientationX = 'right';
          this.anims.resume(this.anims.currentFrame);
        }
        this.state.bulletPositionY = 10;
        // tire vers le haut
      } else if (keys.fire.isDown && keys.up.isDown && !(keys.left.isDown || keys.right.isDown)) {
        animationName = 'shootup';
        this.body.setVelocityX(0);
        // tire a l'arret
      } else if (keys.fire.isDown && !keys.up.isDown && !(keys.left.isDown || keys.right.isDown)) {
        this.state.bulletPositionY = 8;
        animationName = 'stand';
        this.body.setVelocityX(0);
        this.body.setSize(10, 35, true);
        this.state.runSpeed = 285;
        // reste immobile
      } else {
        this.body.setVelocityX(0);
        animationName = 'stand';
        this.body.setSize(10, 35, true);
        this.state.runSpeed = 285;
      }
      // positionne la hauteur du tir en marchant //ptet en courant aussi a verifier
      if (!keys.down.isDown && (keys.left.isDown || keys.right.isDown)) {
        this.state.bulletPositionY = 11;
      }
      //  PLAYER JUMP    ////
      // peut sauter
      if (!keys.jump.isDown && body.blocked.down) {
        this.state.canJump = true;
        this.state.stopJump = false;
      }
      // saute
      if (keys.jump.isDown && body.blocked.down && state.canJump && !jumpB) {
        // saut super power
        if (state.SuperPowersActive) {
          this.state.jumpDelay = 6666650;
          this.body.setVelocityY(-800);
        }
        // saut droit
        if ((!keys.left.isDown || !keys.right.isDown) && !state.SuperPowersActive) {
          this.state.jumpDelay = 650;
          this.body.setVelocityY(-180);
        }
        // saut en marchant
        if ((keys.left.isDown || keys.right.isDown) && state.canJump && !state.SuperPowersActive) {
          this.state.jumpDelay = 700;
          this.body.setVelocityY(-180);
        }
        // saut en courant
        if (keys.run.isDown && (keys.left.isDown || keys.right.isDown) && state.canJump && !state.SuperPowersActive) {
          this.state.jumpDelay = 500;
          this.body.setVelocityY(-this.state.speed);
        }
        this.state.onJump = true;
        this.isJumping();
        this.state.canJump = false;
      }
      // si touche un plafond
      if (body.blocked.up) {
        if (this.jumpCooldownTimer) {
          this.jumpCooldownTimer.remove();
        }
        this.body.setVelocityY(this.state.speed * 2);
        this.state.runSpeed = 285;
      }
      // a l'atterissage
      if (body.blocked.down) {
        this.state.onJump = false;
        this.ComboJumpBooster.enabled = true;
      }
      if (!body.blocked.down && jumpB) {
        this.state.onJump = true;
      }
      // reset jump
      if (state.stopJump) {
        this.body.setVelocityY(this.state.speed * 2);
      }
      // annule le timer du saut
      if (!keys.jump.isDown && !state.stopJump) {
        if (this.jumpCooldownTimer) {
          this.jumpCooldownTimer.remove();
        }
        this.body.setVelocityY(this.state.speed * 2);
      }
      // select weapon
      if (keys.select.isDown) {
        this.selectWeapon();
      }
      
      // player on water
      if (this.onWater) {
        this.state.speed = 70;
        this.state.morphingSpeed = 55;
        this.state.jumpDelay = 300;
      } else {
        if (!keys.run.isDown) {
          this.state.speed = 165;
        }
        this.state.morphingSpeed = 140;
        this.state.jumpDelay = 500;
      }
      // flip player animation and bullets positions
      if (body.velocity.x < 0) {
        this.flipX = true;
        this.state.bulletOrientationX = 'left';
        this.state.bulletPositionX = 3;
        this.playerGhostEmitter.texture.key = this.texture.key;
        const lastFrame = this.playerGhostEmitter.getFrame()
        if (lastFrame.name !== this.anims.currentFrame.textureFrame) {
          this.playerGhostEmitter.setFrame(this.anims.currentFrame.textureFrame);
        }
        this.playerGhostEmitter.scaleX.propertyValue = -1;
        this.body.velocity.x < -285 ? this.playerGhostEmitter.start() : this.playerGhostEmitter.stop();
      } else if (body.velocity.x > 0) {
        this.flipX = false;
        this.state.bulletOrientationX = 'right';
        this.state.bulletPositionX = 7;
        this.playerGhostEmitter.texture.key = this.texture.key;
        const lastFrame = this.playerGhostEmitter.getFrame()
        if (lastFrame.name !== this.anims.currentFrame.textureFrame) {
          this.playerGhostEmitter.setFrame(this.anims.currentFrame.textureFrame);
        }
        this.body.velocity.x > 285 ? this.playerGhostEmitter.start() : this.playerGhostEmitter.stop();
        this.playerGhostEmitter.scaleX.propertyValue = 1;
      }
      // pause
      if (keys.pause.isDown) {
        this.scene.pauseGame();
      }
    } else if (state.pause) {
      if (!this.chooseDone && (keys.down.isDown || keys.up.isDown)) {
        this.scene.choose();
      }
      if (!this.chooseDone && keys.fire.isDown) {
        this.scene.launch();
      }
    }
    if (!keys.run.isDown) {
      this.state.runSpeed = 285;
    }
    // player animation play
    if (this.lastAnim !== animationName) {
      this.lastAnim = animationName;
      this.animate(animationName, true);
    }
    // SPEED BOOSTER PART
    const absSpeed = Math.abs(body.velocity.x);
    if (absSpeed > 385) {
      this.playerGhostEmitter.setLifespan(Math.abs(this.body.velocity.x / 10));
      this.playerGhostEmitter.emitParticleAt(this.x, this.y);
      if (absSpeed > 550) {
        this.isSpeedRunningMax(true, time);
        if (keys.down.isDown) {
          this.SuperPowers(time);
        }
      }
      return;
    } else {
      this.clearTint();
      this.playerGhostEmitter.tint.propertyValue = 0xFFFFFF;
    }
    this.isSpeedRunningMax(false, time);
  }

  isJumping() {
    this.jumpCooldownTimer = this.scene.time.addEvent({
      delay: this.state.jumpDelay,
      callback: () => {
        this.state.stopJump = true;
      },
    });
  }

  animate(str) {
    this.anims.play(str, true);
    this.anims.setTimeScale(Math.abs(this.body.velocity.x) / 200)
  }

  stopAnimate(str) {
    this.anims.stop(str);
  }

  isRunning() {
    if (this.keys.run.isDown
      && (this.keys.left.isDown || this.keys.right.isDown)
      // && this.body.blocked.down
      && !this.onWater) {
      if (this.state.speed < this.state.runSpeed) {
        this.state.speed += this.state.speed / 10;
      }
      if (this.inventory.speedBooster) {
        this.isSpeedRunning();
      }
    } else if (!this.keys.run.isDown && (this.keys.left.isDown || this.keys.right.isDown) && !this.onWater) {
      this.state.speed = 165;
    }
  }

  isSpeedRunning() {
    this.scene.time.addEvent({
      delay: 32,
      callback: () => {
        if (this.state.runSpeed < 600) {
          this.state.runSpeed += this.state.runSpeed / 200;
        }
      },
    });
  }

  isSpeedRunningMax(bool, time) {
    if (!bool) {
      if (this.colorToggleTimer) {
        this.colorToggleTimer.destroy();
        this.state.colorChange = false;
      }
      return;
    }
    if (this.state.colorChange) {
      return;
    }
    this.state.colorChange = true;
    this.colorToggleTimer = this.scene.time.addEvent({
      delay: 64,
      loop: true,
      callback: () => {
        if (this.tintBottomLeft !== 16777215) {
          this.clearTint();
          this.playerGhostEmitter.tint.propertyValue = 0xFFFFFF;
          return;
        }
        const col = 0xDEFF00;
        this.setTint(col);
        this.playerGhostEmitter.tint.propertyValue = col;
      },
    });
  }

  SuperPowers(time) {
    if (this.state.SuperPowersActive) {
      return;
    }
    this.state.SuperPowersActive = true;
    this.colorToggleTimer.destroy();
    // display superpowers active
    this.colorToggleTimer2 = this.scene.time.addEvent({
      delay: 64,
      loop: true,
      callback: () => {
        if (this.tintBottomLeft !== 16777215) {
          this.clearTint();
        } else {
          this.setTintFill(0xDDFF00);
        }
      },
    });
    // ends superpowers
    this.scene.time.addEvent({
      delay: 5000,
      callback: () => {
        this.state.SuperPowersActive = false;
        this.colorToggleTimer2.destroy();
        this.clearTint();
      },
    });
  }

  shoot(time) {
    if (this.state.selectedWeapon === 'bullet' && !this.state.onMorphingBall) {
      this.shootGun(time);
    }
    if (this.state.selectedWeapon === 'swell' && !this.state.onMorphingBall) {
      this.shootSwell(time);
    }
    if (this.state.selectedWeapon === 'missile' && !this.state.onMorphingBall) {
      this.shootMissile(time);
    }
    if (this.state.selectedWeapon === 'laser' && !this.state.onMorphingBall) {
      this.shootLaser(time);
    }
    if (this.inventory.morphingBomb && this.state.onMorphingBall) {
      this.shootBomb(time);
    }
  }

  shootLaser(time) {
    if (time > this.state.lastFired) {
      const laser = this.lasers.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'laser', null, true);
      if (laser) {
        this.state.lastFired = time + this.inventory.fireRate;
        laser.visible = true;
        if (this.onWater) {
          laser.setDepth(98);
        } else {
          laser.setDepth(102);
        }
        this.scene.sound.play('laser', { volume: 0.3 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          laser.setAngle(0);
          laser.body.setSize(22, 4);
          laser.body.velocity.x = -600;
        }
        if (this.state.bulletOrientationX === 'right') {
          laser.setAngle(0);
          laser.body.setSize(22, 4);
          laser.body.velocity.x = 600;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          laser.setAngle(90);
          laser.body.setSize(4, 22);
          laser.body.velocity.y = -600;
          laser.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          laser.setAngle(0);
          laser.body.setSize(22, 4);
          laser.body.velocity.y = 0;
        }
        this.scene.time.addEvent({
          delay: 800,
          callback: () => {
            laser.destroy();
          },
        });
      }
    }
  }

  laserKill(e) {
    this.scene.sound.play('explo2', { volume: 0.2 });
    e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    e.anims.play('enemyExplode', true);
    e.on('animationcomplete', () => { e.destroy(); });
  }

  shootBomb(time) {
    if (time > this.state.lastFired) {
      const bomb = this.bombs.getFirstDead(true, this.body.x + 6, this.body.y + 10, 'bomb', null, true);
      if (bomb) {
        this.state.lastFired = time + this.inventory.fireRate;
        bomb.displayWidth = 10;
        bomb.displayHeight = 10;
        bomb.visible = true;
        bomb.setImmovable();
        bomb.anims.play('bomb', true);
        if (this.onWater) {
          bomb.setDepth(98);
        } else {
          bomb.setDepth(106);
        }
        bomb.body.enabled = false;
        bomb.body.setSize(16, 16);
        //    BOMB EXPLODE TIMER    //
        this.bombTimer = this.scene.time.addEvent({
          delay: 1500,
          callback: () => {
            const filteringOptions = {
              // isNotEmpty: false,
              isColliding: true,
              // hasInterestingFace: false
            };
            const tiles = this.scene.solLayer.getTilesWithinWorldXY(bomb.body.x || bomb.body.x - 8 || bomb.body.x + 8, bomb.body.y - 4, 16, 16, filteringOptions);
            tiles.forEach((e) => {
              if (e.properties.destructible) {
                this.scene.solLayer.removeTileAt(e.x, e.y, true, true);
                this.scene.frontLayer.removeTileAt(e.x, e.y, true, true);
              }
            });
            bomb.body.enabled = true;
            this.scene.sound.play('impact', { volume: 0.4 });
            bomb.displayWidth = 16;
            bomb.displayHeight = 16;
            bomb.anims.play('impactBomb', true).on('animationcomplete', () => bomb.destroy());
          },
        });
      }
    }
  }

  shootSwell(time) {
    if (time > this.state.lastFired) {
      const swell = this.swells.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'swell', null, true);
      if (swell) {
        this.state.lastFired = time + this.inventory.fireRate;
        // swell.displayWidth = 12;
        // swell.displayHeight = 12;
        swell.visible = true;
        swell.anims.play('swell', true);
        if (this.onWater) {
          swell.setDepth(98);
        } else {
          swell.setDepth(102);
        }
        this.scene.sound.play('swell', { volume: 0.15 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          // swell.body.setSize(18, 4);
          // swell.setAngle(0);
          swell.flipX = false;
          swell.body.velocity.x = -450;
        }
        if (this.state.bulletOrientationX === 'right') {
          // swell.body.setSize(18, 4);
          // swell.setAngle(0);
          swell.flipX = true;
          swell.body.velocity.x = 450;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          // swell.body.setSize(4, 18);
          // swell.setAngle(90);
          // swell.flipX = false;
          swell.body.velocity.y = -450;
          swell.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          swell.body.velocity.y = 0;
        }
        this.scene.time.addEvent({
          delay: 2000,
          callback: () => {
            swell.destroy();
          },
        });
      }
    }
  }

  swellKill(e) {
    this.scene.sound.play('impact', { volume: 0.4 });
    e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    e.anims.play('impact', true);
    e.on('animationcomplete', () => { e.destroy(); });
  }

  shootMissile(time) {
    if (time > this.state.lastFired) {
      const missile = this.missiles.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'missile', null, true);
      if (missile) {
        this.state.lastFired = time + this.inventory.fireRate;
        missile.visible = true;
        missile.anims.play('missile', true);
        if (this.onWater) {
          missile.setDepth(98);
        } else {
          missile.setDepth(102);
        }
        this.scene.sound.play('missile', { volume: 0.5 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          missile.body.setSize(18, 4);
          missile.setAngle(0);
          missile.flipX = false;
          missile.body.velocity.x = -450;
        }
        if (this.state.bulletOrientationX === 'right') {
          missile.body.setSize(18, 4);
          missile.setAngle(0);
          missile.flipX = true;
          missile.body.velocity.x = 450;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          missile.body.setSize(4, 18);
          missile.setAngle(90);
          missile.flipX = false;
          missile.body.velocity.y = -450;
          missile.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          missile.body.velocity.y = 0;
        }
        this.scene.time.addEvent({
          delay: 2000,
          callback: () => {
            missile.destroy();
          },
        });
      }
    }
  }

  missileKill(e) {
    e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    this.scene.sound.play('explo2', { volume: 0.4 });
    if (e.texture.key === 'missile') {
      e.anims.play('enemyExplode', true).on('animationcomplete', () => { e.destroy(); });
    } else {
      e.destroy();
    }
  }

  shootGun(time) {
    if (time > this.state.lastFired && this.inventory.gun) {
      const bullet = this.bullets.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'bullet', null, true);
      if (bullet) {
        this.state.lastFired = time + this.inventory.fireRate;
        bullet.visible = true;
        bullet.anims.play('bull', true);
        if (this.onWater) {
          bullet.setDepth(98);
        } else {
          bullet.setDepth(102);
        }
        // bullet sound
        this.scene.sound.play('bullet', { volume: 0.08 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          bullet.body.velocity.x = -600;
        }
        if (this.state.bulletOrientationX === 'right') {
          bullet.body.velocity.x = 600;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          bullet.body.velocity.y = -600;
          bullet.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          bullet.body.velocity.y = 0;
        }
        this.scene.time.addEvent({
          delay: 800,
          callback: () => {
            bullet.destroy();
          },
        });
      }
    }
  }

  bulletKill(e) {
    e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    e.anims.play('impact', true);
    this.scene.sound.play('impact', { volume: 0.4 });
    e.on('animationcomplete', () => { e.destroy(); });
  }

  jumpBoosterTimer() {
    if (this.state.onJump) {
      this.state.jumpBoost = false;
      this.state.onJumpBoost = false;
      jumpB = false;
      return;
    }
    this.state.onJumpBoost = true;
    this.state.maxSpeed = 550;
    this.body.setVelocityY(-550);
    this.body.velocity.normalize().scale(this.state.maxSpeed);
    this.scene.sound.play('jumpBooster', { volume: 0.08 });
    // timer for not passing trough floor
    this.scene.time.addEvent({
      delay: 50,
      callback: () => {
        this.body.setSize(10, 35, true);
      },
    });
    // timer for end of jumpBoster
    this.boostTimer = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.state.jumpBoost = false;
        this.state.onJumpBoost = false;
        jumpB = false;
        this.body.setVelocityY(this.state.speed * 2);
        this.state.maxSpeed = 250;
      },
    });
  }

  killJumpBoosterTimer() {
    if (this.state.onJumpBoost && this.body.blocked.down) {
      this.state.onJumpBoost = false;
      this.boostTimer.remove();
      this.state.jumpBoost = false;
      this.state.maxSpeed = 250;
      jumpB = false;
      this.body.setVelocityY(this.state.speed * 2);
    }
  }

  addEnergy() {
    this.inventory.lifeEnergyBlock += 1;
    this.inventory.life = this.inventory.lifeEnergyBlock * 100;
  }

  addSpeedFire() {
    this.inventory.fireRate -= 50;
  }

  addMissile() {
    this.inventory.missile = true;
    this.inventory.selectableWeapon.push('missile');
    this.scene.events.emit('addWeapon', { Weapon: 'missile' });
  }

  addLaser() {
    this.inventory.laser = true;
    this.inventory.selectableWeapon.push('laser');
    this.scene.events.emit('addWeapon', { Weapon: 'laser' });
  }

  addSwell() {
    this.inventory.swell = true;
    this.inventory.selectableWeapon.push('swell');
    this.scene.events.emit('addWeapon', { Weapon: 'swell' });
  }

  selectWeapon() {
    if (!this.selectWeaponFlag && !this.keys.fire.isDown) {
      this.selectWeaponFlag = true;
      let count = this.inventory.selectableWeapon.indexOf(this.state.selectedWeapon);
      if (count === this.inventory.selectableWeapon.length - 1) {
        count = -1;
      }
      this.state.selectedWeapon = this.inventory.selectableWeapon[count + 1];
      this.scene.events.emit('selectWeapon', { selectedWeapon: this.state.selectedWeapon });
      this.scene.sound.play('select', { volume: 0.1 });
      this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          this.selectWeaponFlag = false;
        },
      });
    }
  }

  handleLava() {
    if (!this.lavaOverlap) {
      this.lavaOverlap = true;
      this.inventory.life -= 3;
      this.scene.sound.play('playerHit');
      this.scene.events.emit('setHealth', { life: this.inventory.life });
      this.playerFlashTween = this.scene.tweens.add({
        targets: this.scene.player,
        ease: 'Sine.easeInOut',
        duration: 200,
        delay: 0,
        repeat: 5,
        yoyo: true,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1,
        },
        onComplete: () => {
          this.scene.player.alpha = 1;
        },
      });
      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          this.lavaOverlap = false;
        },
      });
    }
    if (this.inventory.life <= 0) {
      this.state.dead = true;
      this.playerDead = true;
      this.scene.physics.pause();
      this.scene.events.emit('setHealth', { life: 0 });
      this.scene.sound.play('playerDead', { volume: 0.2 });
      this.scene.input.enabled = false;
      this.scene.player.anims.pause(this.scene.player.anims.currentFrame);
      this.playerFlashTween.stop();
      this.inventory.life = 0;
      this.scene.player.setTintFill(0xFFFFFF);
      this.scene.player.setDepth(2000);

      this.round = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'whitePixel');
      this.round.setOrigin(0.5, 0.5);
      this.round.setDepth(1000);
      this.round.displayWidth = 2;
      this.round.displayHeight = 2;

      this.tween = this.scene.tweens.add({
        targets: this.round,
        ease: 'Sine.easeInOut',
        scaleX: 1,
        scaleY: 1,
        duration: 2000,
        delay: 2000,
        onComplete: () => {
          this.scene.input.enabled = true;
          this.scene.playerIsDead();
        },
      });
    }
  }

  getLife(l) {
    if (this.inventory.life + l.health < this.inventory.lifeEnergyBlock * 100) {
      this.inventory.life += l.health;
    } else {
      this.inventory.life = this.inventory.lifeEnergyBlock * 100;
    }
    this.scene.sound.play('getLife', { volume: 0.05 });
    l.destroy();
    this.scene.events.emit('setHealth', { life: this.inventory.life });
  }
}
