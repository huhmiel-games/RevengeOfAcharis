import { Scene } from 'phaser';
import U from '../utils/usefull';
import getConfigKeys from '../utils/getConfigKeys';

export default class GameOver extends Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    this.position = [128, 158];
    this.lastPosition = 0;

    this.scene.stop('dashBoard');

    this.background = this.add.image(0, 0, 'backgroundWithoutTitles')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT);

    this.title = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 40, 'atomic', ' No revenge today... ')
      .setFontSize(20)
      .setOrigin(0.5, 0.5)
      .setTint(0xFF3B00);

    this.retry = this.add.bitmapText(U.WIDTH / 4, this.position[0], 'atomic', ' Try again ')
      .setFontSize(18);

    this.quit = this.add.bitmapText(U.WIDTH / 4, this.position[1], 'atomic', ' Quit ')
      .setFontSize(18);

    this.head = this.add.image(U.WIDTH / 4 - 16, this.position[0], 'head')
      .setOrigin(0, 0)
      .setDisplaySize(16, 16);

    const keysOptions = getConfigKeys();

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
      down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
      fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
    });

    this.input.keyboard.on('keydown', (event) => {
      if (this.keys.down.isDown && event.key === this.keys.down.originalEvent.key) {
        this.sound.play('bullet', { volume: 0.8 });
        this.choose(1);
      } else if (this.keys.up.isDown && event.key === this.keys.up.originalEvent.key) {
        this.sound.play('bullet', { volume: 0.8 });
        this.choose(-1);
      } else if (this.keys.fire.isDown && event.key === this.keys.fire.originalEvent.key) {
        this.sound.play('melo', { volume: 1 });
        this.launch();
      }
    });

    // fading the scene from black
    
    this.cameras.main.setBackgroundColor('#0C1D1C');
    this.cameras.main.fadeIn(100);
  }

  choose(count) {
    if (this.lastPosition === this.position.length - 1 && count > 0) {
      this.lastPosition = 0;
    } else if (this.lastPosition === 0 && count < 0) {
      this.lastPosition = this.position.length - 1;
    } else {
      this.lastPosition += count;
    }
    this.head.y = this.position[this.lastPosition];
  }

  launch() {
    if (this.lastPosition === 0) {
      this.input.keyboard.enabled = true;
      this.scene.start('playLvl1', { loadSavedGame: true });
      this.scene.start('dashBoard');
    }
    if (this.lastPosition === 1) {
      this.scene.start('bootGame');
    }
  }
}
