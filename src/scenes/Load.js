import { Scene } from 'phaser';
import U from '../utils/usefull';
import getConfigKeys from '../utils/getConfigKeys';

export default class LoadSavedGame extends Scene {
  constructor() {
    super({ key: 'loadSavedGame' });
  }

  preload() {
    
  }

  create() {
    this.position = [];
    this.lastPosition = 0;
    let totalTime = '';
    if (localStorage.getItem('time')) {
      let t = localStorage.getItem('time');
      t = JSON.parse(t);
      totalTime = new Date(t).toISOString().substr(11, 8);
    }

    this.background = this.add.image(0, 0, 'backgroundWithoutTitles')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT);

    if (localStorage.getItem('RevengeOfAcharis')) {
      this.position = [74, 114, 154];
      this.position = [U.HEIGHT / 4, U.HEIGHT / 2, U.HEIGHT / 4 * 3];
      this.loadGame = this.add.bitmapText(U.WIDTH / 4, this.position[0], 'atomic', ' Load Game ', 18, 1);
      this.timeGame = this.add.bitmapText(U.WIDTH / 4 * 3 - 24, this.position[0] + 5, 'atomic', ` ${totalTime} `, 10, 2);
      this.deleteSavedGame = this.add.bitmapText(U.WIDTH / 4, this.position[2], 'atomic', ' Delete Game ', 18, 1);
    } else {
      this.position = [74, 114];
      this.newGame = this.add.bitmapText(U.WIDTH / 4, this.position[0], 'atomic', ' New Game ', 18, 1);
    }
    if (!localStorage.getItem('d')) {
      localStorage.setItem('d', '0');
    }
    if (!localStorage.getItem('e')) {
      localStorage.setItem('e', '0');
    }

    const keysOptions = getConfigKeys();

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
      down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
      fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
    });

    this.options = this.add.bitmapText(U.WIDTH / 4, this.position[1], 'atomic', ' Options ', 18, 1);

    this.head = this.add.image(U.WIDTH / 4 - 16, this.position[0] + 11, 'head')
      //.setOrigin(0, 0)
      .setDisplaySize(16, 16);

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
    this.cameras.main.fadeIn(500);
  }

  choose(count) {
    if (this.lastPosition === this.position.length - 1 && count > 0) {
      this.lastPosition = 0;
    } else if (this.lastPosition === 0 && count < 0) {
      this.lastPosition = this.position.length - 1;
    } else {
      this.lastPosition += count;
    }
    this.head.y = this.position[this.lastPosition] + 11;
  }

  launch() {
    if (this.lastPosition === 0 && this.loadGame) {
      this.scene.start('playLvl1', { loadSavedGame: true });
      this.scene.start('dashBoard');
    } else if (this.lastPosition === 0) {
      this.scene.start('playLvl1');
      this.scene.start('dashBoard');
    }
    if (this.lastPosition === 1) {
      this.scene.start('Options');
    }
    if (this.lastPosition === 2) {
      localStorage.removeItem('RevengeOfAcharis');
      localStorage.removeItem('d');
      localStorage.removeItem('e');
      localStorage.removeItem('time');
      this.sound.play('playerDead', { volume: 1 });
      window.location.reload(false);
    }
  }
}
