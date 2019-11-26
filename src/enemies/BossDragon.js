export default class BossDragon extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: 150,
      damage: 20,
      directionX: -550,
      directionY: 0,
      hited: false,
      lastFired: 0,
      fireRate: 20,
    };
    this.family = 'enemies';
    this.setDepth(104);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setPipeline('Light2D');
    this.body.allowGravity = true;
    this.body.setGravityY(200)
    this.getFired = false;
    this.lastAnim = null;
    this.isAttacking = false;
    this.isFireAttacking = false;
    this.isTailAttacking = false;
    this.battleStarted = false;
    this.attackTime = null;
    this.isDead = false;
    this.walkplay = false;
    this.blockDoors();
    this.walkk = this.scene.sound.add('dragonWalkSfx', { volume: 0.5 });
    this.on('animationstart', (e) => {
      if (this.anims.currentAnim.key === 'dragon-breath') {
        this.scene.sound.play('dragonBreathSfx')
      }
      if (this.anims.currentAnim.key === 'dragon-tail') {
        this.scene.sound.play('dragonTailSfx', { volume: 2 })
      }
    });

    this.on('animationcomplete', (e) => {
      if (this.anims.currentAnim.key === 'dragon-breath' && this.isFireAttacking) {
        this.isFireAttacking = false;
        this.body.setVelocity(0, 0);
      }
      if (this.anims.currentAnim.key === 'dragon-tail' && this.isTailAttacking) {
        this.isTailAttacking = false;
        this.body.setVelocity(0, 0);
      }
    });

    
    this.on('animationupdate', () => {
      const runSpeedNow = Math.abs(this.body.velocity.x);
      //const walkRate = Phaser.Math.RND.realInRange(0.75, 1.25)
      const runTimer = runSpeedNow > 0 ? (250 / runSpeedNow) * 50 : 330;
      if (this.anims.currentAnim.key === 'dragon-idle' && !this.walkplay && this.body.blocked.down) {
        this.walkplay = true;
        this.walkk.play();//{ rate: walkRate }
        this.scene.time.addEvent({
          delay: runTimer,
          callback: () => {
            // this.walkk.stop()
            this.walkplay = false;
          },
        });
      }
    });
  }

  // this.load.audio('dragonDeathSfx', dragonDeathSfx);
  //   this.load.audio('dragonBreathSfx', dragonBreathSfx);
  //   this.load.audio('dragonHitSfx', dragonHitSfx);
  //   this.load.audio('dragonTailSfx', dragonTailSfx);
  //   this.load.audio('dragonWalkSfx', dragonWalkSfx);

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.body.width = this.width;
    this.body.height = (this.height / 4) * 3;
    this.body.setOffset(0, this.height / 4)
    let animationName;
    
    if (this.active && !this.isDead && this.body.blocked.down) {
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      
      if (distance <= 60 && !this.isFireAttacking) {
          const dx = this.scene.player.x - this.x;
          const dy = this.scene.player.y - this.y;
          const angle = Math.atan2(dy, dx);
          this.isTailAttacking = true;
          this.body.setVelocity(Math.cos(angle) * 30, 0);
          animationName = 'dragon-tail';
      } 

      if (distance <= 150 && distance > 60 && !this.isTailAttacking) {
          const dx = this.scene.player.x - this.x;
          const dy = this.scene.player.y - this.y;
          const angle = Math.atan2(dy, dx);
          this.isFireAttacking = true;
          this.body.setVelocity(Math.cos(angle) * 50, 0);
          animationName = 'dragon-breath';
      } 
      
      if (distance > 150 && !this.isTailAttacking && !this.isTailAttacking) {
          const dx = this.scene.player.x - this.x;
          const dy = this.scene.player.y - this.y;
          const angle = Math.atan2(dy, dx);
          //this.isFireAttacking = true;
          this.body.setVelocity(Math.cos(angle) * 30, 0);
          animationName = 'dragon-idle';
      } 

      if (this.body.velocity.x > 0) {
        this.flipX = true;
      } else if (this.body.velocity.x < 0) {
        this.flipX = false;
      }

      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
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
    this.scene.sound.play('dragonHitSfx', { volume: 1, rate: 1 });
    this.state.life = this.state.life - e;
    if (this.state.life <= 0) {
      this.unlockDoors();
    }
  }

  playSfxDeath() {
    this.scene.sound.play('dragonDeathSfx', { volume: 1, rate: 1 });
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
