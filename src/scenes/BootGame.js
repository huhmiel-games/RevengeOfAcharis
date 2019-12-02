import { Scene } from 'phaser';
import U from '../utils/usefull';
import background from '../assets/menuBackgound5.png';
import menuTheme from '../assets/music/Title_theme.ogg';
// alagard fonts
import alagard from '../assets/alagard.png';
import alagardXML from '../assets/alagard.xml';
// import alagard2 from '../assets/alagard2.png';
// import alagard2XML from '../assets/alagard2.xml';

export default class bootGame extends Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.bitmapFont('alagard', alagard, alagardXML);
    //this.load.bitmapFont('alagard2', alagard2, alagard2XML);
    this.load.image('background', background);
    this.load.audio('menuTheme', menuTheme);
  }

  create() {
    this.bgimage = this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT);

    this.menuTheme = this.sound.add('menuTheme', { volume: 0.5 });

    this.start = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 + 50, 'alagard', 'press any key to start', 14, 1)
      .setOrigin(0.5, 0.5)
      .setTint(0xDDDDDD);

    this.input.keyboard.once('keydown', () => {
      this.menuTheme.stop();
      this.scene.start('LoadingScreen');
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

    this.cameras.main.fadeIn(2000);
    this.menuTheme.play();
  }
}
