export default class Skeleton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.damage = config.damage;
    this.state = {
      life: config.life,
      damage: 0,
      directionX: 120,
      directionY: 0,
      hited: false,
      giveLife: config.life,
    };
    this.family = 'enemies';
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setPipeline('Light2D');
    this.body
      .setAllowGravity()
      .setGravityY(500)
      .setSize(16, 40)
      .setOffset(16, 12);
    this.lastAnim = null;
    this.getFired = false;
    this.flipX = true;
    this.followPath = false;
    this.speed = 120;
    this.visible = false;
    this.isAttacking = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      
      let animationName;
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      
      if (distance <= 120 && !this.isAttacking) {
        this.visible = true;
          const dx = this.scene.player.x - this.x;
          if (dx < 0) {
            this.flipX = false;
          }
          animationName = 'skeletonRise';
      } 
      if (this.isAttacking) {
        animationName = 'skeleton';
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;
        this.body.setVelocityX(this.state.directionX);
        if (dx < 0 && dy > -30) {
          this.flipX = false;
          this.state.directionX = -this.speed;
        } else {
          this.state.directionX = this.speed;
        }
        
        // turn back if blocked
        if (this.body.blocked.left) {
          this.state.directionX = this.speed;
        }
        if (this.body.blocked.right) {
          this.state.directionX = -this.speed;
        }
        // flip the sprite
        if (this.state.directionX > 0) {
          this.flipX = true;
        } else {
          this.flipX = false;
        }
      }
      
      if (this.lastAnim !== animationName) {
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

  animate(str) {
    if (str === 'skeletonRise') {
      this.anims.play(str, true).on('animationcomplete', () => {
        this.isAttacking = true;
        this.state.damage = this.damage;
      });
    }
    this.anims.play(str, true);
  }

  looseLife(e) {
    if (!this.isAttacking) {
      return;
    }
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
