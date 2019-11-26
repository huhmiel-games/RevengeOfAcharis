export default class Thunder extends Phaser.GameObjects.Sprite {
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
      giveLife: config.life / 8,
    };
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setOrigin(0, 0);
    this.body
      .setAllowGravity(false)
      .setSize(32, 192)
      .setOffset(24, 0);
    this.lastAnim = null;
    this.getFired = false;
    this.flipX = true;
    this.followPath = false;
    this.speed = 20;
    this.setPipeline('GlowFx')
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active && !this.followPath && this.body.blocked.down) {
      
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    return;
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
    // const arr = [];
    // for (let i = 0; i < 30; i += 1) {
    //   arr.push(i.toString());
    // }
    // const bulletSpeed = bullet.x !== 0 ? bullet.x / 2 : bullet.y / 2;
    // this.scene.particles = null;
    //this.scene.crabParticles = this.scene.add.particles('explodedCrab');
    // this.scene.crabEmitter = this.scene.crabParticles.createEmitter({
    //   angle: { min: -30, max: -150 },
    //   speed: { min: 200, max: 300 },
    //   frame: arr,
    //   quantity: 16,
    //   lifespan: 3000,
    //   alpha: 1,
    //   rotate: { start: 0, end: 3, ease: 'Linear' },
    //   gravityY: 300,
    //   on: false,
    // });
    // this.scene.crabParticles.emitParticleAt(this.x, this.y).setDepth(2000).setPipeline('Light2D');
  }
}
