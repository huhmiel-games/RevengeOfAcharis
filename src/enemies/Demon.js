import HellHound from './HellHound';
import Thing from './Thing';
import Skeleton from './Skeleton';
import Ghost from './Ghost';
import Wizard from './Wizard';
import BurningGhoul from './BurningGhoul';
import Angel from '../npc/Angel';


export default class Demon extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: 5000,
      damage: 20,
      hited: false,
      skullHeadQuantity: 8,
      speed: 120,
    };
    this.family = 'enemies';
    this.setDepth(104);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setSize(64, 92).setOffset(68, 64);
    this.body.setCollideWorldBounds(true);
    this.setPipeline('Light2D');
    this.getFired = false;
    this.lastAnim = null;
    this.isBreathFire = false;
    this.isBbreathBlue = false;
    this.isFollowingPath = true;
    this.battleStarted = false;
    this.skullRotates = false;
    this.releaseEnemy = false;
    this.attackTime = null;
    this.fireBallAttackCount = 0;
    this.phase = 0;
    this.demonThunder = null;
    this.isDead = false;
    this.lastAnim = null;
    this.diameter = { x: 0 };
    this.phase2started = false;
    this.blockDoors();
    //this.handleHellBeast();
    this.handleSkullHeads();
    //this.body.setVelocityX(-200);
    this.on('animationcomplete', () => {
      const actualKey = this.anims.currentAnim.key;
      // if (actualKey === 'demon-idle') {
      //   this.animate('demon-idle', true);
      //   this.state.damage = 75;
  
      //   this.scene.shakeCamera(350)
      //   //this.body.reset(this.body.x + 32, 23 * 16);
      //   //this.body.setVelocityX(Phaser.Math.Between(-50, 50));
      //   return;
      // }
      if (actualKey === 'demon-attack' && !this.releaseEnemy) {
        this.isFollowingPath = false;
        this.body.setVelocity(0, 0);
        this.breathFire();
        this.animate('demon-attack-end', true);
        return;
      }
      if (actualKey === 'demon-attack' && this.releaseEnemy) {
        this.isFollowingPath = false;
        this.body.setVelocity(0, 0);
        this.breathBlue();
        this.animate('demon-attack-end', true);
        return;
      }
      // if (actualKey === 'demon-attack-end') {
      //   this.scene.shakeCamera(350)
      //   //this.animate('demon-attack-end', true);
      //   return;
      // }
    });
    this.addPath();
    this.startBattle();
    this.twee = this.scene.tweens.add({
      targets: this.diameter,
      ease: 'Sine.easeInOut',
      duration: 4200,
      delay: 0,
      repeat: -1,
      loop: -1,
      yoyo: true,
      x: {
        getStart: () => 1,
        getEnd: () => 250,
      },
    });
    //this.twee.play()
  }

  // availables anims
  // demon-idle
  // demon-attack
  // breathBlue
  // breathFire
  // fire-skull

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active && this.battleStarted && this.phase !== 1 && !this.isDead) {
      let animationName
      if (!this.isBreathFire && !this.isBreathBlue) {
        const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
        if (distance < 150 && !this.isBreathFire && this.body.y < this.scene.player.y - 50 && this.lastAnim !== 'demon-attack-end') {
          animationName = 'demon-attack';
        } else if (distance > 200 && !this.isBreathBlue && this.body.center.y > 415 && this.lastAnim !== 'demon-attack-end') {
          this.releaseEnemy = true;
          animationName = 'demon-attack';
        }
      }
      if (this.x > this.scene.player.x && !this.isBreathFire) {
        if (this.flipX ) {
          this.flipX = false;
          this.body.setOffset(56, 64);
        }
      } else if (this.x < this.scene.player.x && !this.isBreathFire) {
        if (!this.flipX ) {
          this.flipX = true;
          this.body.setOffset(75, 64);
        }
      }
      if (this.demonPath && this.isFollowingPath) {
        // follow path
        const speed = this.state.speed;
        const dx = this.demonPath.x - this.body.x;
        const dy = this.demonPath.y - this.body.y;
        const angle = Phaser.Math.Angle.Between(this.body.x, this.body.y, this.demonPath.x, this.demonPath.y);// Math.atan2(dy, dx);
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      }

      if (this.skullRotates && this.phase !== 1) {
        Phaser.Actions.RotateAroundDistance(this.scene.skullHeads.getChildren(), {
          x: this.body.center.x,
          y: this.body.center.y
        } , 0.02, this.diameter.x);
      }

      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
    if (this.active && this.phase === 1) {
      this.scene.skullHeads.getChildren().forEach(e => e.destroy());
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

  handleSkullHeads() {
    if (!this.active || this.phase === 1) {
      return;
    }
    this.skullTimer = this.scene.time.addEvent({
      delay: 20000,
      repeat: 0,
      callback: () => {
        this.isFollowingPath = false;
        if (!this.active || this.phase === 1) {
          return;
        } 
        this.body.setVelocity(0, 0);
        const arrPositionsX = [this.body.x + 1500, this.body.x + 750, this.body.x, this.body.x - 750, this.body.x - 1500, this.body.x - 750, this.body.x, this.body.x + 750];
        const arrPositionsY = [this.body.y, this.body.y - 750, this.body.y - 1500, this.body.y - 750, this.body.y, this.body.y + 750, this.body.y + 1500, this.body.y + 750]
        const arrAngle = [0, Math.PI / 4, Math.PI / 2, 3/4*Math.PI, Math.PI, 5/4*Math.PI, 3/2*Math.PI, 7/4*Math.PI]
        for (let i = 0; i < this.state.skullHeadQuantity; i += 1) {
          this[`skull${i}`] = this.scene.skullHeads.getFirstDead(true, this.body.x, this.body.y, 'finalBoss', null, true);
          if (this[`skull${i}`]) {
            this[`skull${i}`].visible = true;
            this[`skull${i}`].anims.play('fire-skull', true)
            this[`skull${i}`].setDepth(103);
            this[`skull${i}`].state = { damage: 25 };
            this[`skull${i}`].body.setSize(24, 28).setOffset(12, 18).reset(arrPositionsX[i] , arrPositionsY[i]);
            this.scene.skullGroup.push(this[`skull${i}`])
          }
        }
        this.twee.play();
        this.skullRotates = true;
        this.skullHeadsAppears();
      }
    });
    
    
    //this.twee.play();
    //const skullhead = this.scene.skullHeads.getFirstDead(true, this.body.x, this.body.y, 'finalBoss', null, true);
    
  }

  skullHeadsAppears() {
    if (!this.active || this.phase === 1) {
      return;
    }
    this.skullTimer2 = this.scene.time.addEvent({
        delay: 10000,
        repeat: 0,
        callback: () => {
          if (!this.active) {
            return;
          }
          this.scene.skullGroup.forEach((skull) => {
            if (skull.active) {
              this.skullRotates = false;
              const angle = Phaser.Math.Angle.Between(skull.x, skull.y, this.scene.player.x, this.scene.player.y);// Math.atan2(dy, dx);
              skull.body.setVelocity(Math.cos(angle) * 400, Math.sin(angle) * 400);
              this.skullTimer3 = this.scene.time.addEvent({
                delay: 3000,
                repeat: 0,
                callback: () => {
                  if (!this.active) {
                    return;
                  }
                  skull.destroy()
                }
              });
            }
            
          });
          this.isFollowingPath = true;
        // this.body.setVelocity(0, 0);
          this.handleSkullHeads();
        }
      })
  }

  skullAttack() {
    if (this.isLavaAttack || !this.active) {
      return;
    }
    // this.hellBeastFadeOut();
    return;
    const lavaFireTimer = this.scene.time.addEvent({
      startAt: 100,
      delay: 1000,
      repeat: 0,
      callback: () => {
        if (!this.active) {
          return;
        }
        if (lavaFireTimer.repeatCount === 3) {
          this.animate('demon-idle', true);
          //this.body.reset(200, 24 *16);
    
        }
        if (lavaFireTimer.repeatCount === 2) {
          this.animate('demon-idle', true);
    
          //this.body.reset(79, 24 *16);
        }
        if (lavaFireTimer.repeatCount === 1) {
          this.animate('demon-idle', true);
    
          //this.body.reset(318, 24 *16);
        }
        if (lavaFireTimer.repeatCount === 0) {
    
          //this.setAlpha(0);
          this.state.damage = 0;
          //this.body.setVelocityX(0)
          //this.body.reset(-100, -100);
          this.hellBeastFadeOut();
          this.isLavaAttack = false;
          lavaFireTimer.destroy();
        }
      },
    });
  }

  breathFire() {
    if (this.isBreathFire) {
      return;
    }
    this.isBbreathFire = true;
    // this.isFiring = true;
    const positionX = this.flipX ? this.body.x + 74 : this.body.x - 12;
    const ball = this.scene.breathFire.getFirstDead(true, positionX, this.body.y + 56, 'finalBoss', null, true);
    if (ball) {
      ball.visible = true;
      ball.anims.play('breathFire', true)
      ball.on('animationcomplete', () => {
        ball.destroy();
      });
      ball.setDepth(105);
      ball.state = { damage: 30 };
      ball.name = 'fireball';
      ball.body.setSize(102, 46).setOffset(28, 28);
      this.scene.breathGroup.push(ball)

      if (this.flipX) {
        ball.body.setVelocity(380, 380);
      } else {
        ball.body.setVelocity(-380, 380);
      }
      
      if (ball.body.velocity.x < 0) {
        ball.flipX = false;
      } else {
        ball.flipX = true;
      }

      //ball.setRotation(angle + Math.PI/2)
      this.scene.sound.play('swell', { volume: 0.15 });
      this.endFire = this.scene.time.addEvent({
        delay: 50,
        callback: () => {
          ball.body.setVelocity(0, 0)
        },
      });
      this.endBreath = this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          this.isBreathFire = false;
          if (!this.skullRotates) {
            this.isFollowingPath = true;
          }
          this.animate('demon-idle', true);
        },
      });
      
    }
  }

  breathBlue() {
    if (this.isBreathBlue) {
      return;
    }
    this.isBbreathBlue = true;
    // this.isFiring = true;
    const positionX = this.flipX ? this.body.x + 74 : this.body.x - 12;
    const ball = this.scene.breathFire.getFirstDead(true, positionX, this.body.y + 56, 'finalBoss', null, true);
    if (ball) {
      ball.visible = true;
      ball.anims.play('breathBlue', true)
      ball.on('animationcomplete', () => {
        ball.destroy();
      });
      ball.setDepth(105);
      ball.state = { damage: 30 };
      ball.name = 'fireball';
      ball.body.setSize(102, 46).setOffset(28, 28);
      this.scene.breathGroup.push(ball)

      if (this.flipX) {
        ball.body.setVelocity(380, 380);
      } else {
        ball.body.setVelocity(-380, 380);
      }
      
      if (ball.body.velocity.x < 0) {
        ball.flipX = false;
      } else {
        ball.flipX = true;
      }

      // release an enemy
      
      const arrEnemies = ['ghost', 'skeleton', 'thing', 'hellhound', 'burningghoul', 'wizard'];
      const rdmNumber = Phaser.Math.Between(0, arrEnemies.length - 1);
      const ene = arrEnemies[rdmNumber];
      switch (ene) {
        case "ghost":
          this.ghost = new Ghost(this.scene, positionX, this.body.y + 56, {
            key: 'enemies',
            name: 'ghost',
            life: 15,
            damage: 10,
          });
          this.ghost.animate('ghost', true);
          this.scene.enemyGroup.push(this.ghost);
          break;
        case 'skeleton':
          this.skeleton = new Skeleton(this.scene, positionX, this.body.y + 56, {
            key: 'enemies',
            name: 'skeleton',
            life: 15,
            damage: 10,
          });
          //this.skeleton.animate('skeletonRise', true);
          this.scene.enemyGroup.push(this.skeleton);
          break;
        case 'thing':
          this.thing = new Thing(this.scene, positionX, this.body.y + 56, {
            key: 'enemies',
            name: 'thing',
            life: 15,
            damage: 10,
          });
          this.thing.animate('thing', true);
          this.scene.enemyGroup.push(this.thing);
          break;
        case 'hellhound':
          this.hellhound = new HellHound(this.scene, positionX, this.body.y + 56, {
            key: 'enemies',
            name: 'hellhound',
            life: 15,
            damage: 10,
          });
          this.hellhound.animate('hellHoundRun', true);
          this.scene.enemyGroup.push(this.hellhound);
          break;
        case 'burningghoul':
          this.burningGhoul = new BurningGhoul(this.scene, positionX, this.body.y + 56, {
            key: 'burning-ghoul',
            name: 'ghoul',
            life: 15,
            damage: 10,
          });
          this.burningGhoul.animate('burning-ghoul', true);
          this.scene.enemyGroup.push(this.burningGhoul);
          break;
        case 'wizard':
          this.wizard = new Wizard(this.scene, positionX, this.body.y + 56, {
            key: 'enemies',
            name: 'wizard',
            life: 15,
            damage: 10,
          });
          this.wizard.animate('wizard-idle', true);
          this.scene.enemyGroup.push(this.wizard);
          break;
      }

      //////////////
      this.scene.sound.play('swell', { volume: 0.15 });
      this.endFire = this.scene.time.addEvent({
        delay: 50,
        callback: () => {
          ball.body.setVelocity(0, 0)
        },
      });
      this.endBreath = this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          this.isBreathBlue = false;
          this.releaseEnemy = false;
          if (!this.skullRotates) {
            this.isFollowingPath = true;
          }
          this.animate('demon-idle', true);
        },
      });
      
    }
  }

  startOnPath() {
    this.setPosition(this.scene[`path${this.name}`].x, this.scene[`path${this.name}`].y);
    this.body.setAllowGravity(false);
    this.angle = this.scene[`path${this.name}`].angle;
    this.followPath = true;
  }

  addPath() {
    const layerArray = this.scene.checkObjectsLayerIndex('pathBoss');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      const poly = element.polyline;
      const pathOriginX = element.properties.originX * 16;
      const pathOriginY = element.properties.originY * 16;
      this.linePath = new Phaser.Curves.Path(pathOriginX + poly[0].x, pathOriginY + poly[0].y);
      poly.forEach(line => this.linePath.lineTo(line.x + pathOriginX, line.y + pathOriginY));
      this.demonPath = this.scene.add.follower(this.linePath, pathOriginX, pathOriginY, 'whitePixel');
      this.demonPath.setVisible(false);
      this.demonPath.setTintFill(0xFF0000);
      this.demonPath.name = element.name;
      this.demonPath.startFollow({
        duration: element.properties.duration,
        yoyo: false,
        repeat: -1,
        rotateToPath: false,
        verticalAdjust: false,
      });
      this.scene.pathGroup.push(this.demonPath);
      // graphics for debug
      // const graphics = this.scene.add.graphics();

      // graphics.lineStyle(1, 0xff0000, 1).setDepth(2000); // what is 1, , 1

      // this.linePath.draw(graphics, 328); // what is 328
    });
  }

  startBattle() {
    this.animate('demon-idle', true);
    let startTimer = this.scene.time.addEvent({
      delay: 1000,
      repeat: 1,
      callback: () => {
        if (startTimer.repeatCount === 1) {
          this.setFlipX(true);
          this.body.setOffset(75, 64);
        }
        if (startTimer.repeatCount === 0) {
          this.setFlipX(false);
          this.body.setOffset(56, 64);
          this.battleStarted = true;
          //this.skullRotates = true;
          startTimer = null;
          //this.handleSkullHeads();
        }
      }
    });
  }

  startPhase1() {
    this.phase = 1;
    this.isBreathFire = false;
    this.isBbreathBlue = false;
    this.skullRotates = false;
    this.isFollowingPath = false;
    this.state.life = 30000;
    this.body.setVelocity(0, 0);
    this.setPipeline('GlowFx');
    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        const positionX = this.flipX ? this.body.x + 74 : this.body.x - 12;
        this.demonThunder = this.scene.thunderPower.getFirstDead(true, -100, this.scene.player.body - 256, 'storm', null, true);
        if (this.demonThunder) {
          this.demonThunder.visible = true;
          this.demonThunder.anims.play('thunder-magic', true)
          this.demonThunder.on('animationcomplete', () => {
            //this.demonThunder.destroy();
          });
          this.demonThunder.setDepth(105);
          this.demonThunder.state = { damage: 30 };
          this.demonThunder.name = 'demonThunder';
          
          // const dx = this.scene.player.x - this.x;
          // const dy = this.scene.player.y - this.y;
          // const angle = Math.atan2(dy, dx);
          
          this.demonThunder.body.setSize(32, 192).setOffset(24, 0);
          this.scene.player.state.pause = true;
          this.scene.player.animate('duck', true)
          this.scene.player.body.setSize(10, 15, true).setOffset(21, 20);
          this.scene.player.body.setVelocity(0, 0);
          this.demonThunder.body.reset(this.scene.player.body.center.x, -100);
          this.demonThunder.body.setVelocity(0, 1900);
          this.scene.thunderGateSfx.play();
        }
      }
    });
  }

  startPhase2() {
    if (!this.active || this.phase2started) {
      return;
    }

    this.phase2started = true;
    this.setPipeline('GlowFx');
    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        // particles for broken window
        this.windowParticles = this.scene.add.particles('whitePixel');
        this.windowParticleEmitter = this.windowParticles.createEmitter({
          speed: { min: 200, max: 400 },
          quantity: 36,
          lifespan: 20000,
          alpha: 1,
          scale: 3,
          gravityY: 800,
          on: false,
        });
        this.scene.paraMiddle.setAlpha(0);
        this.windowParticleEmitter.explode(36, 394, 204);

        // angel appears
        
        this.scene.angel = new Angel(this.scene, 394, 274, {
          key: 'angel-idle',
          name: 'angel',
        });
        this.scene.enemyGroup.forEach(enemy => {
          if (enemy.active && enemy.name !== 'demon') {
            this.scene.enemyExplode(enemy.body.x, enemy.body.y);
            enemy.destroy();
          }
        })
        this.scene.angelLight = this.scene.lights.addLight(this.scene.angel.x, this.scene.angel.y, 256, 0xDDDDDD, 2);
        this.resetPipeline();
        this.scene.angel.finalSequence = true;
        this.scene.angel.animate('angel-idle', true);
        this.scene.npcGroup.push(this.scene.angel);
        const angle = Phaser.Math.Angle.Between(this.scene.angel.x, this.scene.angel.y, this.scene.player.x, this.scene.player.y);// Math.atan2(dy, dx);
        this.scene.angel.body.setVelocity(Math.cos(angle) * 100, Math.sin(angle) * 100);
      }
    });
  }

  startPhase3() {
    if (this.isDead) {
      return;
    }
    this.isDead = true;
    this.scene.player.inventory.bossFinal = true;
    this.isFollowingPath = false;
    this.body.setVelocity(0, 0);
    const demonExplode = this.scene.time.addEvent({
      delay: 150,
      repeat: 30,
      callback: () => {
        if (!this.active) {
          return;
        }
        const X = Phaser.Math.Between(this.body.x, this.body.x + this.body.width);
        const Y = Phaser.Math.Between(this.body.y, this.body.y + this.body.height);
        this.scene.enemyExplode(X, Y)
        if (demonExplode.repeatCount === 0) {
          this.unlockDoors();
          this.scene.giveLife = this.scene.physics.add.sprite(this.body.center.x, this.body.center.y, 'heart');
          this.scene.giveLife.setDepth(105)//.setPipeline('GlowFx');
          this.scene.giveLife.health = 500;
          this.scene.giveLife.body.setSize(23, 21);
          this.scene.giveLife.anims.play('heart'); 
          this.scene.giveLifeGroup.push(this.scene.giveLife);
          this.body.reset(-1000, -1000);
          this.scene.player.inventory.escape = true;
          const pos = this.scene.getCamCenter();
          this.showMsg = this.scene.add.bitmapText(pos.x, pos.y - 42, 'atomic', `two and a half minutes before the castle collapses
          Get out of here, quick!!!`, 12, 1)
            .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);
          this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
              // display counter
              this.scene.events.emit('count');
              this.showMsg.destroy();
              this.scene.escape();
            }
          });
        }
      }
    });
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
    //this.scene.player.inventory.boss1 = true;
  }

  checkCollision(d) {
    return;
  }
}
