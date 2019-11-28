export default class Hatman extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setPipeline('Light2D');
    this.body
      .setAllowGravity(false)
      .setSize(20, 40);
    this.flipX = true;
    this.showMsg = null;
    this.isTalking = false;
    this.animate(config.key, true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      // flip to face the player
      if (this.x > this.scene.player.x) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
      if (Math.abs(this.x - this.scene.player.x) < 20 && !this.scene.oldman.isTalking) {
        this.talkToPlayer();
      } else {
        this.stopTalking();
      }
    }
  }

  talkToPlayer() {
    if (this.isTalking) {
      return;
    }
    this.isTalking = true;
    this.scene.sound.play('hatmanSfx', { volume: 4 });
    const msg = `I must leave this town...
    I must leave this town...
    I must leave this town...quickly`;
    this.showMsg = this.scene.add.bitmapText(this.x, this.y - 42, 'atomic', msg, 8, 1)
      .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);
  }

  stopTalking() {
    this.isTalking = false;
    this.showMsg && this.showMsg.setAlpha(0);
  }

  animate(str) {
    this.active && this.anims.play(str, true);
  }
}
