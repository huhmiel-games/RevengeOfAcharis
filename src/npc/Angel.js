export default class Angel extends Phaser.GameObjects.Sprite {
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
      .setSize(20, 40).setOffset(50, 40);
    this.flipX = true;
    this.showMsg = null;
    this.isTalking = false;
    this.msgCount = 0;
    this.firstEncounter = false;
    this.finalSequence = false;
    this.animate('angel-idle', true);
    this.on('animationrepeat', () => {
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      if (distance < 350) {
      this.scene.sound.play('angelWing', { volume: 0.5 });
      }
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active && !this.finalSequence) {
      // flip to face the player
      if (this.x > this.scene.player.x) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
      if (Math.abs(this.x - this.scene.player.x) < 20 && !this.firstEncounter) {
        this.talkToPlayer();
      } else {
        this.stopTalking();
      }
    }
    if (this.active && this.finalSequence) {
      const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
      if (distance < 50) {
        this.body.setVelocity(0, 0);
        this.talkFinalSequence()
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
    this.showMsg = this.scene.add.bitmapText(this.x + 10, this.y - 42, 'atomic', msg[0], 8, 1)
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
          this.showMsg.text = "";
          this.body.setVelocityY(-30);
          const item = {};
          item.state = { ability: 'waterStorm', id: 6 };
          this.scene.player.addMagic('waterStorm');
          this.scene.sound.play('powerUp');
          this.scene.player.state.pause = false;
          this.scene.physics.resume();
          this.firstEncounter = true;
          //this.scene.player.anims.resume(this.player.anims.currentFrame);
        }
      },
    });
  }

  stopTalking() {
    this.isTalking = false;
    this.showMsg && this.showMsg.setAlpha(0);
  }

  talkFinalSequence() {
    if (this.isTalking) {
      return;
    }
    this.isTalking = true;
    const msg = [
      `Hey Acharis!!`,
      `Don't give up`,
      `I can merge with you to defeat this demon`,
      `Let's go!!`];
    this.showMsg = this.scene.add.bitmapText(this.x, this.y - 42, 'atomic', msg[0], 8, 1)
      .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);
    // pause the player
    this.scene.player.state.pause = true;

    this.scene.time.addEvent({
      delay: 2000,
      repeat: 3,
      callback: () => {
        if (this.msgCount < msg.length - 1) {
          this.msgCount += 1;
          this.showMsg.text = msg[this.msgCount];
          this.walkplay = false;
        } else {
          this.showMsg.text = "";
          this.scene.tweens.add({
            targets: this,
            ease: 'Sine.easeInOut',
            duration: 4200,
            delay: 0,
            repeat: 0,
            yoyo: false,
            x: { from: this.body.x + 10, to: this.scene.player.body.x + 5 },
            y: { from: this.body.y, to: this.scene.player.body.y },
            scale: {
              getStart: () => 1,
              getEnd: () => 0,
            },
            onComplete: () => {
              this.scene.cameras.main.startFollow(this.scene.player);
              this.scene.player.inventory.bulletDamage = 5 * 10;
              this.scene.player.inventory.swellDamage = 10 * 10;
              this.scene.player.inventory.missileDamage = 30 * 10;
              this.scene.player.inventory.life = 100 * this.scene.player.inventory.lifeEnergyBlock;
              this.scene.events.emit('setHealth', { life: Math.round(this.scene.player.inventory.life) });
              this.scene.sound.play('getLife', { volume: 0.05 });
              this.scene.player.inventory.fireRate = 120;
              this.scene.demon.phase = 2;
              this.scene.player.body.setSize(10, 25, true).setOffset(21, 10)
              this.scene.player.state.pause = false;
              this.scene.physics.resume();
              this.body.reset(-100, -100);
              this.scene.player.setPipeline('GlowFx');
              this.scene.demon.isFollowingPath = true;
              this.scene.demonLighting.stop();
              this.scene.demonFight2.play();
            }
          });
        }
      },
    });
  }

  animate(str) {
    this.active && this.anims.play(str, true);
  }
}
