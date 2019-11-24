import { Scene } from 'phaser';
import U from '../utils/usefull';
import background from '../assets/menuBackgound4.png';
import bip2 from '../assets/sounds/piou.ogg';
import ambient2 from '../assets/music/ambient2.ogg';

export default class bootGame extends Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('background', background);
    this.load.audio('bip2', bip2);
    this.load.audio('ambient2', ambient2);
  }

  create() {
    this.bgimage = this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT);

    this.ambient2 = this.sound.add('ambient2', { volume: 0.5 });

    this.start = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 + 50, 'atomic', 'press any key to start', 14, 1)
      .setOrigin(0.5, 0.5)
      .setTint(0xDDDDDD);

    this.input.keyboard.once('keydown', () => {
      // this.sound.play('bip2', { volume: 0.1 });
      this.ambient2.stop();
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
    this.ambient2.play();
  }
}
