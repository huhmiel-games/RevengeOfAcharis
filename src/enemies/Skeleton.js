export default class Skeleton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = 'skeleton';
    this.damage = config.damage;
    this.enemyState = {
      life: config.life,
      damage: 0,
      directionX: -120,
      directionY: 0,
      hited: false,
      giveLife: config.life,
    };
    
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body
      .setAllowGravity()
      .setGravityY(500)
      .setSize(16, 40)
      .setOffset(16, 12);
    this.lastAnim = null;
    this.getFired = false;
    this.flipX = true;
    this.followPath = false;
    this.speed = 40;
    this.visible = false;
    this.isAttacking = false;
    this.walkplay = false;
    this.walkk = this.scene.sound.add('skeletonStep', { volume: 1 });
    this.on('animationupdate', () => {
      const runSpeedNow = Math.abs(this.body.velocity.x);
      const walkRate = Phaser.Math.RND.realInRange(0.75, 1.25)
      const runTimer = runSpeedNow > 0 ? (1000 / runSpeedNow) * 50 : 330;
      if (this.anims.currentAnim.key === 'skeleton' && !this.walkplay && this.body.blocked.down && this.distance < 350) {
        this.walkplay = true;
        this.walkk.play({ rate: walkRate });
        this.scene.time.addEvent({
          delay: runTimer,
          callback: () => {
            this.walkplay = false;
          },
        });
      }
    });
    this.on('animationcomplete', () => {
      if (this.anims.currentAnim.key === 'skeletonRise') {
        this.isAttacking = true;
        this.enemyState.damage = this.damage;
        this.lastAnim = 'skeletonRise';
      }  
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      
      let animationName;
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      this.distance = distance;

      if (distance <= 120 && !this.isAttacking) {
        this.visible = true;
        const dx = this.scene.player.x - this.x;
        if (dx < 0) {
          this.flipX = false;
        }
        animationName = 'skeletonRise';
      } 
      if (this.isAttacking && distance <= 160) {
        animationName = 'skeleton';
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;
        this.body.setVelocityX(this.enemyState.directionX);
        if (dx < 0 && dy > -30) {
          this.flipX = false;
          this.enemyState.directionX = -this.speed;
        } else {
          this.enemyState.directionX = this.speed;
        }
        
        // turn back if blocked
        if (this.body.blocked.left) {
          this.enemyState.directionX = this.speed;
        }
        if (this.body.blocked.right) {
          this.enemyState.directionX = -this.speed;
        }
        // flip the sprite
        if (this.enemyState.directionX > 0) {
          this.flipX = true;
        } else {
          this.flipX = false;
        }
      }
      //console.log(this.lastAnim)
      if (this.isAttacking && distance > 120 && this.lastAnim === 'skeletonRise') {
        animationName = 'skeleton';
        //console.log(distance, this.body.velocity.x)
        // turn back if blocked
        if (this.body.blocked.left) {
          this.enemyState.directionX = this.speed;
        }
        if (this.body.blocked.right) {
          this.enemyState.directionX = -this.speed;
        }
        this.body.setVelocityX(this.enemyState.directionX);
        // flip the sprite
        if (this.enemyState.directionX > 0) {
          this.flipX = true;
        } else {
          this.flipX = false;
        }
      }
      
      if (this.lastAnim !== animationName && animationName !== undefined) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
  }

  startOnPath() {
    this.setPosition(this.scene[`path${this.name}`].x, this.scene[`path${this.name}`].y);
    this.body.setAllowGravity(false);
    this.angle = this.scene[`path${this.name}`].angle;
    this.followPath = true;
  }

  playSfxDeath() {
    this.scene.sound.play('skeletonDeath', { volume: 1, rate: 1 });
  }

  animate(str) {
    if (str === 'skeletonRise') {
      this.scene.sound.play('skeletonRising', { volume: 1, rate: 1 });
      this.anims.play(str, true)
    }
    this.anims.play(str, true);
  }

  looseLife(e) {
    if (!this.isAttacking) {
      return;
    }
    this.scene.sound.play('skeletonHit', { volume: 1, rate: 1 });
    this.enemyState.life = this.enemyState.life - e;
  }

  checkCollision(d) {
    if (d.type === 'Sprite') {
      if (this.enemyState.directionX > 0) {
        this.enemyState.directionX = -this.speed;
      } else {
        this.enemyState.directionX = this.speed;
      }
    }
  }

  explode(bullet) {
    
  }
}
