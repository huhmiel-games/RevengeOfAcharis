import { Scene } from 'phaser';
import U from '../utils/usefull';
import getConfigKeys from '../utils/getConfigKeys';

export default class Options extends Scene {
  constructor() {
    super('Options');
  }

  preload() {
    
  }

  create() {
    this.position = []; // [16, 24, 36, 48, 64, 80, 96, 112, 128, 144, 160, 176];
    for (let i = 1; i < 13; i++) {
      this.position.push((i * 16) + 32);
    }
    this.lastPosition = 0;

    
    this.keysOptions = [];
    // keysOptions index
    // left: 0,
    // right: 1,
    // up: 2,
    // down: 3,
    // fire: 4,
    // jump: 5,
    // run: 6,
    // select: 7,
    // pause: 8,

    this.title = this.add.bitmapText(U.WIDTH / 2, 15, 'atomic', 'Options', 20, 1)
      .setOrigin(0.5, 0.5);
    this.info = this.add.bitmapText(U.WIDTH / 2, 40, 'atomic', 'Available Keys: A to Z, Cursors, Ctrl, Shift', 8, 1)
      .setOrigin(0.5, 0.5);

    this.keyLeft = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[0], 'atomic', ' Left ', 8, 1);
    this.keyRight = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[1], 'atomic', ' Right ', 8, 1);
    this.keyUp = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[2], 'atomic', ' Up ', 8, 1);
    this.keyDown = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[3], 'atomic', ' Down ', 8, 1);
    this.keyFire = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[4], 'atomic', ' Fire ', 8, 1);
    this.keyJump = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[5], 'atomic', ' Jump ', 8, 1);
    this.keyRun = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[6], 'atomic', ' Run ', 8, 1);
    this.keySelect = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[7], 'atomic', ' Select Weapon ', 8, 1);
    this.keyPause = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[8], 'atomic', ' Pause/Save ', 8, 1);

    this.selectedKey0 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[0], 'atomic', ' LEFT, press enter to change ', 8, 1);
    this.selectedKey1 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[1], 'atomic', ' RIGHT, press enter to change ', 8, 1);
    this.selectedKey2 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[2], 'atomic', ' UP, press enter to change ', 8, 1);
    this.selectedKey3 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[3], 'atomic', ' DOWN, press enter to change ', 8, 1);
    this.selectedKey4 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[4], 'atomic', ' ENTER, press enter to change ', 8, 1);
    this.selectedKey5 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[5], 'atomic', ' SPACE, press enter to change ', 8, 1);
    this.selectedKey6 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[6], 'atomic', ' SHIFT, press enter to change ', 8, 1);
    this.selectedKey7 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[7], 'atomic', ' S, press enter to change ', 8, 1);
    this.selectedKey8 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[8], 'atomic', ' P, press enter to change ', 8, 1);

    this.saveOptions = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[9], 'atomic', ' Save Options (press enter)', 10, 1);
    this.resetOptions = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[10], 'atomic', ' Reset to Default (press enter)', 10, 1);
    this.quitOptions = this.add.bitmapText(U.WIDTH / 4 - 80, this.position[11], 'atomic', ' Quit Options (press enter)', 10, 1);

    this.head = this.add.image(U.WIDTH / 4 - 100, this.position[0], 'head')
      .setOrigin(0, 0)
      .setDisplaySize(12, 12);

    this.input.keyboard.on('keydown', (event) => {
      if (event.code === 'ArrowDown') {
        this.choose(1);
      }
      if (event.code === 'ArrowUp') {
        this.choose(-1);
      }
      if (event.code === 'Enter') {
        this.assignKey(this.lastPosition);
      }
    });

    this.keysOptions = getConfigKeys();
    this.keysOptions.forEach((elm, i) => {
      this[`selectedKey${i}`].text = elm;
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
    this.head.y = this.position[this.lastPosition];
  }

  assignKey(pos) {
    // save
    if (pos === 9) {
      const s = JSON.stringify(this.keysOptions);
      localStorage.setItem('Options', s);
      this.sound.play('melo');
      return;
    }
    // reset to default
    if (pos === 10) {
      localStorage.removeItem('Options');
      this.sound.play('melo');
      return;
    }
    // quit
    if (pos === 11) {
      this.scene.start('bootGame');
      return;
    }
    // assign a key
    const regex = /Key/gm;
    const regex2 = /Arrow/gm;
    const regex3 = /ShiftLeft/gm;
    const regex4 = /ShiftRight/gm;
    const regex5 = /ControlLeft/gm;
    const regex6 = /ControlRight/gm;
    this[`selectedKey${pos}`].text = ' Press a key ';
    this.input.keyboard.once('keydown', (e) => {
      let str = e.key.replace(regex, '');
      str = str.replace(regex2, '');
      str = str.replace(regex3, 'SHIFT');
      str = str.replace(regex4, 'SHIFT');
      str = str.replace(regex5, 'CTRL');
      str = str.replace(regex6, 'CTRL');
      this.keysOptions[pos] = str.toUpperCase();
      this[`selectedKey${pos}`].text = str.toUpperCase();
    });
    this.choose(1);
  }
}
