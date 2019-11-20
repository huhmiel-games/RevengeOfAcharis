/* eslint-disable no-unused-expressions */
import getConfigKeys from '../utils/getConfigKeys';

// let morph;
// let jumpB;
// const cling = { left: false, right: false };
// const onWallJump = false;

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.lastAnim = null;
    this.scene = scene;
    this.inventory = {
      lifeEnergyBlock: 1,
      life: 100,
      savedPositionX: 80,
      savedPositionY: 135,
      map: 'map1',
      selectableWeapon: [],
      bullet: false,
      bulletDamage: 5,
      swell: false,
      swellDamage: 10,
      missile: false,
      missileDamage: 30,
      waterStorm: false,
      waterStormDamage: 100,
      lavaStorm: false,
      lavaStormDamage: 150,
      thunderStorm: false,
      thunderStormDamage: 200,
      fireRate: 420,
      boss1: false,
      thunderDoorReached: false,
      thunderDoorOpen: false,
      townInFire: false,
      boss2: false,
      bossFinal: false,
      powerUp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    this.state = {
      canJump: false,
      stopJump: false,
      onJump: false,
      jumpDelay: 500,
      onRun: false,
      onWalk: true,
      speed: 125,
      runSpeed: 165,
      maxSpeed: 200,
      selectedWeapon: 'bullet',
      lastFired: 0,
      bulletOrientationX: 'right',
      bulletOrientationY: 'normal',
      bulletPositionY: 10,
      bulletPositionX: 10,
      pause: false,
      dead: false,
      fullScreen: false,
      energyTime: 100,
      e: 0,
      d: 0,
    };

    this.jumpCooldownTimer = null;
    this.selectWeaponFlag = false;
    this.chooseDone = false;
    this.isSpelling = false;
    this.setDepth(105);
    // this.setPipeline('Light2D');
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setSize(10, 25, true).setOffset(21, 10);
    // this.player.body.setSize(15, 35, 6, 11);

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
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const {
      body, keys, state, inventory,
    } = this;
    let animationName;
    // if not game pause
    if (!state.pause && !state.dead) {
      if (keys.fire.isDown) {
        this.shoot(time);
      }
      // player movement
      switch (true) {
        case (keys.left.isDown && !keys.run.isDown):
        // marche vers la gauche
          this.body.setVelocityX(-this.state.speed);
          this.state.bulletOrientationX = 'left';
          if (body.velocity.y !== 0 && keys.jump.isDown) {
            animationName = 'jump';
          } else if (!body.blocked.down && !keys.jump.isDown && state.stopJump) {
            animationName = 'fall';
          } else {
            animationName = 'playerWalk';
          }
          this.body.setOffset(18, 10);
          break;

        case (keys.right.isDown && !keys.run.isDown):
        // marche vers la droite
          this.body.setVelocityX(this.state.speed);
          this.state.bulletOrientationX = 'right';
          if (body.velocity.y !== 0 && keys.jump.isDown) {
            animationName = 'jump';
          } else if (!body.blocked.down && !keys.jump.isDown) {
            animationName = 'fall';
          } else {
            animationName = 'playerWalk';
          }
          this.body.setOffset(26, 10);
          break;

        case (keys.left.isDown && keys.run.isDown):
        // cours vers la gauche
          this.state.energyTime > 1 ? 
            this.body.setVelocityX(-this.state.runSpeed)
            :
            this.body.setVelocityX(-this.state.speed);

          this.state.bulletOrientationX = 'left';
          if (body.velocity.y !== 0 && keys.jump.isDown) {
            animationName = 'runJump';
          } else if (body.velocity.y !== 0 && !keys.jump.isDown) {
            animationName = 'fall';
          } else {
            this.state.energyTime > 1 ? animationName = 'playerRun' : animationName = 'playerWalk';
          }
          this.body.setOffset(18, 10);
          break;

        case (keys.right.isDown && keys.run.isDown):
        // cours vers la droite
          this.state.energyTime > 1 ?
            this.body.setVelocityX(this.state.runSpeed)
            :
            this.body.setVelocityX(this.state.speed);

          this.state.bulletOrientationX = 'right';
          if (body.velocity.y !== 0 && keys.jump.isDown) {
            animationName = 'runJump';
          } else if (body.velocity.y !== 0 && !keys.jump.isDown) {
            animationName = 'fall';
          } else {
            this.state.energyTime > 1 ? animationName = 'playerRun' : animationName = 'playerWalk';
          }
          this.body.setOffset(26, 10);
          break;

        case (
          !body.blocked.down
          && (!keys.left.isDown || !keys.right.isDown)
          && !body.touching.down
          && !this.state.stopJump):
          // saut droit et chute libre
          animationName = 'jump';
          this.body.setVelocityX(0);
          break;

        case (
          !body.blocked.down
          && (!keys.left.isDown || !keys.right.isDown)
          && !body.touching.down
          && this.state.stopJump):
          // saut droit et chute libre
          animationName = 'fall';
          this.body.setVelocityX(0);
          break;

        case (keys.down.isDown && !body.touching.down && !(keys.left.isDown || keys.right.isDown)):
          // position baissée
          this.body.setVelocityX(0);
          this.state.bulletPositionY = 10;
          animationName = 'duck';
          this.body.setSize(10, 15, true).setOffset(21, 20);
          break;

        case (keys.fire.isDown && !(keys.left.isDown || keys.right.isDown)):
        // tire a l'arret
          this.state.bulletPositionY = 8;
          !this.isSpelling ? animationName = 'attack' : animationName = 'playerSpell';
          this.body.setVelocityX(0);
          break;

        default:
        // reste immobile
          this.body.setVelocityX(0);
          this.body.setOffset(21, 10);
          animationName = 'stand';
          this.state.runSpeed = 285;
          
      }
      if (this.isSpelling) {
        animationName = 'playerSpell';
        this.body.setVelocity(0, 0);
      }
      // not duck ? set body size to normal
      if (animationName !== 'duck' && this.lastAnim === 'duck') {
        this.body.setSize(10, 25, true).setOffset(21, 10);
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
      if (keys.jump.isDown && body.blocked.down && state.canJump) {
        // saut droit
        if (!keys.left.isDown || !keys.right.isDown) {
          this.body.setVelocityY(-this.state.speed);
        }
        // saut en marchant
        if ((keys.left.isDown || keys.right.isDown) && state.canJump) {
          this.body.setVelocityY(-this.state.speed);
        }
        // saut en courant
        if (keys.run.isDown && (keys.left.isDown || keys.right.isDown) && state.canJump) {
          this.body.setVelocityY(-this.state.runSpeed + 100);
          
        }
        this.state.onJump = true;
        this.isJumping();
        this.state.canJump = false;
      }

      // si touche un plafond
      if (body.blocked.up) {
        if (this.jumpCooldownTimer) {
          this.jumpCooldownTimer.remove();
          this.state.stopJump = true;
          this.state.runSpeed = 285;
        }
      }
      // a l'atterissage
      if (body.blocked.down) {
        this.state.onJump = false;
      }
      if (!body.blocked.down) {
        this.state.onJump = true;
      }
      // reset jump
      if (state.stopJump) {
        this.body.setVelocityY(this.state.speed * 1.5);
      }
      // annule le timer du saut
      if (!keys.jump.isDown && !state.stopJump) {
        if (this.jumpCooldownTimer) {
          this.jumpCooldownTimer.remove();
        }
        this.body.setVelocityY(this.state.speed * 1.5);
      }
      // select weapon
      if (keys.select.isDown) {
        this.selectWeapon();
      }
      
      // flip player animation and bullets positions
      if (body.velocity.x < 0) {
        this.flipX = true;
        this.state.bulletOrientationX = 'left';
        this.state.bulletPositionX = 3;
      } else if (body.velocity.x > 0) {
        this.flipX = false;
        this.state.bulletOrientationX = 'right';
        this.state.bulletPositionX = 7;
      }
      // pause
      if (keys.pause.isDown) {
        this.scene.pauseGame();
      }
    } else if (state.pause) {
      // GAME PAUSE
      if (!this.scene.isPausing && keys.pause.isDown) {
        this.scene.pauseGame();
      }
    }
    // player animation play
    if (this.lastAnim !== animationName) {
      this.lastAnim = animationName;
      this.animate(animationName, true);
    }
    this.consumeEnergy();
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
    //this.anims.setTimeScale(Math.abs(this.body.velocity.x) / 200);
  }

  stopAnimate(str) {
    this.anims.stop(str);
  }

  consumeEnergy(quantity) {
    if (quantity) {
      this.state.energyTime -= quantity;
      this.scene.events.emit('setEnergy', { energy: this.state.energyTime });
    }
    if (this.keys.run.isDown  && (this.keys.left.isDown || this.keys.right.isDown)) {
      this.state.energyTime > 0.2 ? this.state.energyTime -= 0.2 : null;
      this.scene.events.emit('setEnergy', { energy: this.state.energyTime });
      return;
    }
    if (this.keys.left.isDown || this.keys.right.isDown) {
      this.state.energyTime < 100 ? this.state.energyTime += 0.1 : null;
      this.scene.events.emit('setEnergy', { energy: this.state.energyTime });
      return;
    }
    if (!this.keys.left.isDown || !this.keys.right.isDown) {
      this.state.energyTime < 100 ? this.state.energyTime += 0.2 : null;
      this.scene.events.emit('setEnergy', { energy: this.state.energyTime });
    }
  }

  shoot(time) {
    if (this.state.selectedWeapon === 'bullet') {
      this.shootGun(time);
    }
    if (this.state.selectedWeapon === 'swell') {
      this.shootSwell(time);
    }
    if (this.state.selectedWeapon === 'missile') {
      this.shootMissile(time);
    }
    if (this.state.selectedWeapon === 'waterStorm') {
      this.shootWaterStorm(time);
    }
    if (this.state.selectedWeapon === 'lavaStorm') {
      this.shootLavaStorm(time);
    }
    if (this.state.selectedWeapon === 'thunderStorm') {
      this.shootThunderStorm(time);
    }
  }

  shootWaterStorm(time) {
    if (this.state.energyTime < 75) {
      return;
    }
    this.consumeEnergy(75);
    // pause the player
    this.state.pause = true;
    this.anims.play('playerSpell', true);
    this.setPipeline('GlowFixedFx');
    this.isSpelling = true;
    this.body.setVelocity(0, 0);

    // call the water storm
    const waterStorm = this.waterMagic.getFirstDead(true, 0, 0, 'water-storm', null, true);
    if (waterStorm) {
      waterStorm.name ='waterStorm';
      waterStorm.setOrigin(0.5, 0)
        .setPosition(this.scene.cameras.main.scrollX - 200, this.scene.cameras.main.scrollY + 56)
        .setVisible(true)
      waterStorm.body.setSize(280, 256).setOffset(60, -60)
      this.scene.physics.world.enable(waterStorm);
      this.scene.add.existing(waterStorm);
      waterStorm.anims.play('water-storm', true);
      waterStorm.setDepth(102);
      waterStorm.body.velocity.x = 300;
      
      this.scene.sound.play('waterStormSfx', { volume: 1 });
      
      this.scene.time.addEvent({
        delay: 2500,
        callback: () => {
          waterStorm.destroy();
          this.state.pause = false;
          this.scene.physics.resume();
          this.anims.play('stand');
          this.isSpelling = false;
          this.resetPipeline();
        },
      });
    }
  }

  shootLavaStorm() {
    if (this.state.energyTime < 75) {
      return;
    }
    const camView = this.scene.cameras.main.worldView;
    const enemyListOnScreen = [...this.scene.sys.displayList.list].filter(e => {
      return (e.family === 'enemies' && camView.contains(e.body.x, e.body.y))
    });
    if (!enemyListOnScreen.length) {
      return;
    }
    this.consumeEnergy(75);
    // pause the player
    this.state.pause = true;
    this.anims.play('playerSpell', true);
    this.setPipeline('GlowFixedFx');
    this.isSpelling = true;
    this.body.setVelocity(0, 0);
    
    enemyListOnScreen.forEach((enemy, i) => {
      const lavaStorm = this.lavaMagic.getFirstDead(true, 0, 0, 'lava-storm', null, true);
      if (lavaStorm) {
        this.scene.time.addEvent({
          delay: Phaser.Math.Between(100, 600),
          callback: () => {
            if (!enemy.active) {
              return;
            }
            lavaStorm.name ='lavaStorm';
            lavaStorm.setOrigin(0.5, 0).setVisible(true);
            lavaStorm.anims.play('lava-storm', true);
            lavaStorm.body.setSize(64, 160).reset(enemy.body.x + enemy.body.width / 2, camView.y)
            //lavaStorm.body.setCollideWorldBounds(true);
            
            this.scene.physics.world.enable(lavaStorm);
            this.scene.add.existing(lavaStorm);
            lavaStorm.body.setVelocityY(400)
            lavaStorm.setDepth(102);
            this.scene.shakeCamera(350)
            
            this.scene.sound.play('bullet', { volume: 0.08 });
            
            this.scene.time.addEvent({
              delay: 1500,
              callback: () => {
                lavaStorm.destroy();
                this.state.pause = false;
                this.scene.physics.resume();
                this.anims.play('stand');
                this.isSpelling = false;
                this.resetPipeline();
              },
            });
          }
        });
      }
    });
  }

  shootThunderStorm(time) {
    if (this.state.energyTime < 75) {
      return;
    }
    this.consumeEnergy(75)
  }

  shootSwell(time) {
    if (time > this.state.lastFired) {
      const swell = this.swords.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'sword', null, true);
      if (swell) {
        this.state.lastFired = time + this.inventory.fireRate;
        swell.visible = true;
        swell.anims.play('sword', true);
        swell.setDepth(102);

        const playerSpeed = Math.abs(this.body.velocity.x);
        
        this.scene.sound.play('swell', { volume: 0.6 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          swell.flipX = true;
          swell.body.velocity.x = -500 - playerSpeed;
        }
        if (this.state.bulletOrientationX === 'right') {
          swell.flipX = false;
          swell.body.velocity.x = 500 + playerSpeed;
        }

        this.scene.time.addEvent({
          delay: 500,
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
    e.destroy();
  }

  shootMissile(time) {
    if (time > this.state.lastFired) {
      const missile = this.axes.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'axe', null, true);
      if (missile) {
        this.state.lastFired = time + this.inventory.fireRate;
        missile.visible = true;
        missile.anims.play('axe', true);
        missile.setDepth(102);

        const playerSpeed = Math.abs(this.body.velocity.x);
        
        this.scene.sound.play('missile', { volume: 1 });
        // BULLET ORIENTATION
        if (this.state.bulletOrientationX === 'left') {
          missile.setAngle(0);
          missile.flipX = false;
          missile.body.velocity.x = -400 - playerSpeed;
        }
        if (this.state.bulletOrientationX === 'right') {
          missile.setAngle(0);
          missile.flipX = true;
          missile.body.velocity.x = 400 + playerSpeed;
        }

        this.scene.time.addEvent({
          delay: 600,
          callback: () => {
            missile.destroy();
          },
        });
      }
    }
  }

  missileKill(e) {
    // e.setVelocity(0, 0);
    if (this.onWater) {
      e.setDepth(98);
    } else {
      e.setDepth(102);
    }
    this.scene.sound.play('explo2', { volume: 0.4 });
    if (e.texture.key === 'missile') {
      e.setPipeline('TestFx');
      e.anims.play('enemyExplode', true).on('animationcomplete', () => { e.destroy(); });
    } else {
      e.destroy();
    }
  }

  shootGun(time) {
    if (time > this.state.lastFired && this.inventory.bullet) {
      const knife = this.knives.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'knife', null, true);
      if (knife) {        
        this.state.lastFired = time + this.inventory.fireRate;
        knife.visible = true;
        // knife.setPipeline('TestFx');
        this.scene.physics.world.enable(knife);
        this.scene.add.existing(knife);
        knife.anims.play('knife', true);
        knife.setDepth(102);

        const playerSpeed = Math.abs(this.body.velocity.x);
        
        // bullet sound
        this.scene.sound.play('bullet', { volume: 0.7 });
        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          knife.body.velocity.x = -600 - playerSpeed;
        }
        if (this.state.bulletOrientationX === 'right') {
          knife.body.velocity.x = 600 + playerSpeed;
        }

        this.scene.time.addEvent({
          delay: 400,
          callback: () => {
            knife.destroy();
          },
        });
      }
    }
  }

  bulletKill(e) {
    e.setVelocity(0, 0);
    e.setDepth(102);
    e.destroy();
    // e.anims.play('impact', true);
    this.scene.sound.play('impact', { volume: 0.4 });
    //e.on('animationcomplete', () => { e.destroy(); });
  }

  addEnergy() {
    this.inventory.lifeEnergyBlock += 1;
    this.inventory.life = this.inventory.lifeEnergyBlock * 100;
  }

  addSpeedFire() {
    this.inventory.fireRate -= 50;
  }

  addMagic(magic) {
    this.inventory[magic] = true;
    this.inventory.selectableWeapon.push(magic);
    this.scene.events.emit('addWeapon', { Weapon: magic });
  }

  addMissile() {
    this.inventory.missile = true;
    this.inventory.selectableWeapon.push('missile');
    this.scene.events.emit('addWeapon', { Weapon: 'missile' });
  }

  addBullet() {
    this.inventory.bullet = true;
    this.inventory.selectableWeapon.push('bullet');
    this.scene.events.emit('addWeapon', { Weapon: 'bullet' });
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
    if (!this.selectWeaponFlag) {
      this.selectWeaponFlag = true;
      const totalWeaponList = ['bullet', 'swell', 'missile', 'waterStorm', 'lavaStorm', 'thunderStorm'];
      const availableWeaponList = totalWeaponList.filter(e => {
        return this.inventory.selectableWeapon.includes(e)
      })
      let count = availableWeaponList.indexOf(this.state.selectedWeapon);
      if (count === availableWeaponList.length - 1) {
        count = -1;
      }
      this.state.selectedWeapon = availableWeaponList[count + 1];
      this.scene.events.emit('selectWeapon', { selectedWeapon: this.state.selectedWeapon });
      this.scene.sound.play('select', { volume: 0.1 });
      this.scene.time.addEvent({
        delay: 300,
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
      this.inventory.life += Math.round(l.health);
    } else {
      this.inventory.life = this.inventory.lifeEnergyBlock * 100;
    }
    this.scene.sound.play('getLife', { volume: 0.05 });
    l.destroy();
    this.scene.events.emit('setHealth', { life: this.inventory.life });
  }
}
