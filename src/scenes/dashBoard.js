import { Scene } from 'phaser';
import U from '../utils/usefull';
import blackPixel from '../assets/blackPixel.png';
import knifeIcon from '../assets/knifeIcon.png';
import swordIcon from '../assets/swordIcon.png';
import axeIcon from '../assets/axeIcon.png';
import iconFullscreen from '../assets/iconFullscreen.png';
import heart from '../assets/heart.png';
import energyBar from '../assets/energyBar.png';


export default class DashBoard extends Scene {
  constructor() {
    super({ key: 'dashBoard', active: true });
  }

  preload() {
    this.load.image('blackpixel', blackPixel);
    this.load.image('knifeIcon', knifeIcon);
    this.load.image('swordIcon', swordIcon);
    this.load.image('axeIcon', axeIcon);
    this.load.image('iconFullscreen', iconFullscreen);
    this.load.image('energyBar', energyBar);
    this.load.spritesheet('heart', heart, { frameWidth: 12, frameHeight: 12 });
  }

  create() {
    this.mainScene = this.scene.get('playLvl1');
    this.cameras.main
      .setPosition(0, 0)
      .setSize(400, 20)
      .setAlpha(0)
      //.setBackgroundColor(0x722188);

    this.energyBarBack = this.add.image(20, 2, 'blackpixel');
    this.energyBarBack.setOrigin(0, 0).setDisplaySize(52, 6).setTintFill(0xFFFFFF);

    this.energyBar = this.add.image(21, 3, 'energyBar');
    this.energyBar.setOrigin(0, 0).setDisplaySize(50, 4); //.setTintFill(0xFF0000);
    
    this.healthBaricon = this.add.image(4, 4, 'heart')
      .setFrame(1)
      .setDisplaySize(12, 12)
      .setOrigin(0, 0);

    this.Health = this.add.bitmapText(20, 8, 'atomic', '')
      .setFontSize(9)
      .setText('')
      .setAlpha(0);
    
    this.bullet = this.add.image(276, 2, 'knifeIcon')
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDisplaySize(16, 16);

    this.swell = this.add.image(294, 2, 'swordIcon')
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDisplaySize(16, 16);

    this.missile = this.add.image(312, 2, 'axeIcon')
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDisplaySize(16, 16);

    this.waterStorm = this.add.image(330, 2, 'waterStormIcon')
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDisplaySize(16, 16);

    this.lavaStorm = this.add.image(348, 2, 'lavaStormIcon')
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDisplaySize(16, 16);

    this.thunderStorm = this.add.image(366, 2, 'axeIcon')
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDisplaySize(16, 16);


    this.fullscreenBtn = this.add.image(392, 2, 'iconFullscreen')
      .setDisplaySize(16, 16)
      .setInteractive()
      .on('pointerdown', () => {
        this.scale.toggleFullscreen();
      }, this);

    // loading
    this.mainScene.events.on('loadingDone', () => {
      this.fullscreenBtn.setAlpha(0);
      this.cameras.main && this.cameras.main.setAlpha(1);
      //this.cameras.main.setBackgroundColor(0x000000);

      this.Health
        .setAlpha(1)
        .setText(`${this.mainScene.player.inventory.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`);

      if (this.mainScene.player.inventory.bullet) {
        this.bullet.setAlpha(1).setTint(0xFF3B00);
      }
      if (this.mainScene.player.inventory.missile) {
        this.missile.setAlpha(1);
      }
      if (this.mainScene.player.inventory.swell) {
        this.swell.setAlpha(1);
      }
      if (this.mainScene.player.inventory.waterStorm) {
        this.waterStorm.setAlpha(1);
      }
      if (this.mainScene.player.inventory.lavaStorm) {
        this.lavaStorm.setAlpha(1);
      }
      if (this.mainScene.player.inventory.thunderStorm) {
        this.thunderStorm.setAlpha(1);
      }
    });

    this.mainScene.events.on('setHealth', (elm) => {
      this.Health.setText(`${elm.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`);
    });

    this.mainScene.events.on('addEnergyPack', (elm) => {
      this.Health.setText(elm.life);
    });

    this.mainScene.events.on('addWeapon', (elm) => {
      this[elm.Weapon].setAlpha(1);
    });

    this.mainScene.events.on('selectWeapon', (elm) => {
      this.bullet.clearTint();
      this.missile.clearTint();
      this.swell.clearTint();
      this.waterStorm.clearTint();
      this.lavaStorm.clearTint();
      this.thunderStorm.clearTint();
      if (this[elm.selectedWeapon]) {
        this[elm.selectedWeapon].setTint(0xFF3B00);
      }
    });

    this.mainScene.events.on('setEnergy', (elm) => {
      this.energyBar.setCrop(0, 0, Math.abs(elm.energy) / 2, 4)
    });

    this.mainScene.events.on('pause', () => {
      // this.cameras.main.setBackgroundColor(0x000000);
    });

    this.mainScene.events.on('unpause', () => {
      // this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');
    });
  }
}
