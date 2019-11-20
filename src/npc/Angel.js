export default class Angel extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.name = config.name;
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body
      .setAllowGravity(false)
      .setSize(20, 40);
    this.flipX = true;
    this.showMsg = null;
    this.isTalking = false;
    this.msgCount = 0;
    this.animate('angel-idle', true);
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
      if (Math.abs(this.x - this.scene.player.x) < 20) {
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
    const msg = [`Hey Acharis!!
    I have a lot to say...
    So listen..`, `Your parents were not anyone.
    Your father was a great warrior,
    and your mother a white witch.`, `Their blood flows in your veins,
    you already have good fighting skills,
    but you can also use magics`, `I will offer you the magic of water,
    it will allow you to open
    the door of thunder,
    and kill nearby enemies`, `Good luck Acharis`];
    this.showMsg = this.scene.add.bitmapText(this.x, this.y - 42, 'atomic', msg[0], 8, 1)
      .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);
    
    // pause the player
    this.scene.player.state.pause = true;
    this.scene.physics.pause();
    this.scene.player.anims.play('stand');

    this.scene.time.addEvent({
      delay: 7000,
      repeat: 4,
      callback: () => {
        if (this.msgCount < msg.length - 1) {
          this.msgCount += 1;
          this.showMsg.text = msg[this.msgCount];
          this.walkplay = false;
        } else {
          console.log('here')
          this.showMsg.text = "";
          this.body.setVelocityY(-30);
          const item = {};
          item.state = { ability: 'waterStorm', id: 6 };
          this.scene.player.addMagic('waterStorm');
          this.scene.player.state.pause = false;
          this.scene.physics.resume();
          //this.scene.player.anims.resume(this.player.anims.currentFrame);
        }
      },
    });
  }

  stopTalking() {
    this.isTalking = false;
    this.showMsg && this.showMsg.setAlpha(0);
  }

  animate(str) {
    this.active && this.anims.play(str, true);
  }
}
