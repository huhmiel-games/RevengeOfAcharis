import { Scene } from 'phaser';
import U from '../utils/usefull';

export default class EndGame extends Scene {
  constructor() {
    super('endGame');
  }

  preload() {

  }

  create() {
    this.mainScene = this.scene.get('playLvl1');
    let en = localStorage.getItem('e');
    en = JSON.parse(en);
    let d = localStorage.getItem('d');
    d = JSON.parse(d);

    const arr = this.mainScene.player.inventory.powerUp.filter(e => e === 1);
    const percent = Math.floor(arr.length * 100 / 22);

    let t = localStorage.getItem('time');
    t = JSON.parse(t);
    const totalTime = new Date(t).toISOString().substr(11, 8);


    // this.background = this.add.image(0, 0, 'background')
    //   .setOrigin(0, 0)
    //   .setDisplaySize(U.WIDTH, U.HEIGHT);

    this.trans = "The end";
    this.cnt = 0;
    this.transDisplay = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 70, 'atomic', '', 20, 1)
      .setOrigin(0.5, 0.5);

    this.time.addEvent({
      delay: 100,
      repeat: this.trans.length - 1,
      callback: () => {
        if (this.trans[this.cnt] === '-') {
          this.transDisplay.text += '\n';
          this.sound.play('bip3', { volume: 0.5 });
          this.cnt += 1;
        } else {
          this.transDisplay.text += this.trans[this.cnt];
          this.sound.play('bip1', { volume: 1 });
          this.cnt += 1;
        }
      },
    });

    this.time.addEvent({
      delay: 25000,
      callback: () => {
        this.twe = this.tweens.add({
          targets: [this.transDisplay],
          ease: 'Sine.easeInOut',
          duration: 2000,
          delay: 1000,
          repeat: 0,
          yoyo: false,
          alpha: {
            getStart: () => 1,
            getEnd: () => 0,
          },
          onComplete: () => {
            this.sound.play('melP', { volume: 0.5 });
            this.congrat = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 4, 'atomic', 'Congratulation !!\nMission complete', 30, 1)
              .setOrigin(0.5, 0.5)
              .setAlpha(0);

            this.enemiesKilled = this.add.bitmapText(40, U.HEIGHT / 4 + 60, 'atomic', `Enemies killed: ${en}`, 20, 0)
              .setAlpha(0);

            this.death = this.add.bitmapText(40, U.HEIGHT / 4 + 90, 'atomic', `Death: ${d}`, 20, 0)
              .setAlpha(0);

            this.items = this.add.bitmapText(40, U.HEIGHT / 4 + 120, 'atomic', `Collected items: ${percent}%`, 20, 0)
              .setAlpha(0);

            this.timeGame = this.add.bitmapText(40, U.HEIGHT / 4 + 150, 'atomic', `Total time: ${totalTime}`, 20, 0)
              .setAlpha(0);

            
            this.twee = this.tweens.add({
              targets: [this.congrat, this.enemiesKilled, this.death, this.items, this.timeGame, this.dinan],
              ease: 'Sine.easeInOut',
              duration: 2000,
              delay: 1000,
              repeat: 0,
              yoyo: false,
              alpha: {
                getStart: () => 0,
                getEnd: () => 1,
              },
            });
          },
        });
      },
    });

    this.time.addEvent({
      delay: 38000,
      callback: () => {
        this.tweene = this.tweens.add({
          targets: [this.congrat, this.enemiesKilled, this.death, this.items, this.timeGame, this.dinan],
          ease: 'Sine.easeInOut',
          duration: 2000,
          delay: 0,
          repeat: 0,
          yoyo: false,
          alpha: {
            getStart: () => 1,
            getEnd: () => 0,
          },
          onComplete: () => {
            this.credits();
          },
        });
      },
    });
    this.cameras.main.fadeIn(5000);
  }

  credits() {
    this.trans = 'Credits---Designer:-Philippe Pereira---Graphics:-Luis Zuno---Music:-Sound a Head---Programming:-Philippe Pereira---Game Engine:-Phaser 3---Sound Programming:-Philippe Pereira--- -- -- -- -- -- -- -- --Thanks for playing-- -- -- -- -- -- -- -- -- -- --THE END-- -- -- -- -- -- -- -- --';
    this.cnt = 0;
    this.transDisplay = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 70, 'atomic', '', 20, 1)
      .setOrigin(0.5, 0.8)
      .setAlpha(1);

    this.time.addEvent({
      delay: 80,
      repeat: this.trans.length - 1,
      callback: () => {
        if (this.trans[this.cnt] === '-') {
          this.transDisplay.text += '\n';
          this.cnt += 1;
        } else {
          this.transDisplay.text += this.trans[this.cnt];
          this.cnt += 1;
        }
      },
    });
  }
}
