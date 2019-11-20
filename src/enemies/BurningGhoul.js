export default class BurningGhoul extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: -200,
      directionY: 0,
      hited: false,
      giveLife: config.life / 3,
    };
    this.family = 'enemies';
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body
      .setAllowGravity(true)
      .setGravityY(500)
      .setSize(16, 48)
      .setOffset(16, 15);
    this.lastAnim = null;
    this.getFired = false;
    this.flipX = true;
    this.followPath = false;
    this.speed = 200;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active && !this.followPath) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);
      let animationName;
      animationName = 'burning-ghoul';
      // turn back if blocked
      if (this.body.blocked.left) {
        this.state.directionX = this.speed;
      }
      if (this.body.blocked.right) {
        this.state.directionX = -this.speed;
      }
      // fall
      if (!this.body.blocked.down) {
        this.state.directionY = 600;
      }
      if (this.body.blocked.down) {
        this.state.directionY = 0;
      }
      // flip the sprite
      if (this.state.directionX > 0) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }

      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
  }

  animate(str) {
    this.anims.play(str, true);
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
