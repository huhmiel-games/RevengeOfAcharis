import { Scene } from 'phaser';
import U from '../utils/usefull';


export default class Intro extends Scene {
  constructor() {
    super('intro');
  }

  preload() {
    
  }

  create() {
    this.background = this.add.image(0, 0, 'backgroundWithoutTitles')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT);
    
    this.text = 'My name is Acharis.-My parents were murdered-by a demon when i was young.-Since then, i have been training-all my life in combat.-Now It\'s time to take revenge!!';
    this.count = 0;
    this.chief = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2, 'alagard', '', 12, 1)
      .setOrigin(0.5, 0.5).setTintFill(0xA20000);

    this.time.addEvent({
      delay: 100,
      repeat: this.text.length - 1,
      callback: () => {
        if (this.text[this.count] === '-') {
          this.chief.text += '\n';
          this.count += 1;
        } else {
          this.chief.text += this.text[this.count];
          this.count += 1;
        }
      },
    });


    this.start = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT - 60, 'alagard', 'press any key to skip', 14, 1)
      .setOrigin(0.5, 0.5)
      .setTint(0xDDDDDD);

    this.input.keyboard.once('keydown', () => {
      this.sound.play('swell', { volume: 0.8 });
      this.revengeTheme.stop();
      this.scene.start('loadSavedGame');
    });

    this.tween = this.tweens.add({
      targets: this.start,
      ease: 'Sine.easeInOut',
      duration: 1500,
      delay: 0,
      repeat: -1,
      yoyo: true,
      alpha: {
        getStart: () => 0.05,
        getEnd: () => 1,
      },
    });
    this.revengeTheme = this.sound.add('revengeTheme');
    this.revengeTheme.play({ loop: true });
    this.cameras.main.setBackgroundColor('#0C1D1C');
    this.cameras.main.fadeIn(2000);
  }
}
