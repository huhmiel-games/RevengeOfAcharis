export default class Oldman extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setPipeline('Light2D');
    this.body.setAllowGravity(true)
      .setSize(20, 40)
      .setVelocityX(30)
      .setCollideWorldBounds(true);
    this.flipX = false;
    this.showMsg = null;
    this.isTalking = false;
    this.lastAnim = null;
    this.animate(config.key, true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      let animationName;
      // flip to face the player
      
      if (Math.abs(this.x - this.scene.player.x) < 30) {
        this.body.setVelocityX(0);
        animationName = "oldman-idle"
        this.talkToPlayer();
        if (this.x > this.scene.player.x) {
          this.flipX = true;
        } else {
          this.flipX = false;
        }
      } else {
        this.stopTalking();
        if (this.body.velocity.x === 0) {
          this.body.setVelocityX(30);
        }
        animationName = "oldman-walk"
      }
      if (this.x < 40) {
        this.body.setVelocityX(30);
      }
      if (this.x > 770) {
        this.body.setVelocityX(-30);
      }
      if (this.body.velocity.x > 0) {
        this.flipX = false;
      } else if (this.body.velocity.x < 0) {
        this.flipX = true;
      }
      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
  }

  talkToPlayer() {
    if (this.isTalking) {
      return;
    }
    this.isTalking = true;
    let msg;
    if (!this.scene.player.inventory.thunderDoorReached) {
      msg = `Hey Acharis !!
You are back. I will try to help you.
Come back to me if you have questions,
I'll try to answer them !!`;
    } else {
      msg = `Hey Acharis !!
A lightning blocking you?? Never heard about that.
But someone is waiting for you in the forest
She is waiting you near a strange tree,
perhaps she knows...`;
    }
    if (this.scene.player.inventory.townInFire) {
      msg = `Hey Acharis !!
Everybody is gone...sadly...
Go to the castle now, your quest isn't over !!`;
    }
    this.showMsg = this.scene.add.bitmapText(this.x, this.y - 52, 'atomic', msg, 8, 1)
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
