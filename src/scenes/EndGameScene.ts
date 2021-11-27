import { Scene } from 'phaser';
import { WIDTH, HEIGHT } from '../constant/config';
import GameScene from './GameScene';
export default class EndGame extends Scene
{
    private mainScene: GameScene;
    private background: Phaser.GameObjects.Image;
    private trans: string;
    private cnt: number;
    private transDisplay: Phaser.GameObjects.BitmapText;
    private twe: Phaser.Tweens.Tween;
    private congrat: Phaser.GameObjects.BitmapText;
    private enemiesKilled: Phaser.GameObjects.BitmapText;
    private death: Phaser.GameObjects.BitmapText;
    private items: Phaser.GameObjects.BitmapText;
    private timeGame: Phaser.GameObjects.BitmapText;
    private twee: Phaser.Tweens.Tween;
    private dinan: any;
    private tweene: Phaser.Tweens.Tween;
    constructor ()
    {
        super('endGameScene');
    }

    public create ()
    {
        this.mainScene = this.scene.get('GAMESCENE') as GameScene;
        let en = localStorage.getItem('e') as string;
        en = JSON.parse(en);
        let d = localStorage.getItem('d') as string;
        d = JSON.parse(d);

        const arr = this.mainScene.player.inventoryManager.getInventory().powerUp.filter(e => e === 1);
        const percent = Math.floor(arr.length * 100 / 9);

        let t = localStorage.getItem('time') as string;
        t = JSON.parse(t);
        const totalTime = new Date(t).toISOString().substr(11, 8);
        this.sound.play('EndingTheme');

        this.background = this.add.image(0, 0, 'backgroundWithoutTitles')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);

        this.trans = 'The end';
        this.cnt = 0;
        this.transDisplay = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, 'alagard', '', 20, 1)
            .setOrigin(0.5, 0.5).setTintFill(0xDB4D35);

        this.time.addEvent({
            delay: 100,
            repeat: this.trans.length - 1,
            callback: () =>
            {
                if (this.trans[this.cnt] === '-')
                {
                    this.transDisplay.text += '\n';
                    this.sound.play('bip3', { volume: 0.5 });
                    this.cnt += 1;
                } else
                {
                    this.transDisplay.text += this.trans[this.cnt];
                    this.sound.play('bip1', { volume: 1 });
                    this.cnt += 1;
                }
            },
        });

        this.time.addEvent({
            delay: 5000,
            callback: () =>
            {
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
                    onComplete: () =>
                    {
                        // this.sound.play('melP', { volume: 0.5 });
                        this.congrat = this.add.bitmapText(WIDTH / 2, HEIGHT / 4, 'alagard', 'Congratulations !!', 20, 1)
                            .setOrigin(0.5, 0.5)
                            .setAlpha(0).setTintFill(0xDB4D35);

                        this.enemiesKilled = this.add.bitmapText(100, HEIGHT / 4 + 50, 'alagard', `Enemies killed: ${en}`, 12, 0)
                            .setAlpha(0).setTintFill(0xDB4D35);

                        this.death = this.add.bitmapText(100, HEIGHT / 4 + 70, 'alagard', `Death: ${d}`, 12, 0)
                            .setAlpha(0).setTintFill(0xDB4D35);

                        this.items = this.add.bitmapText(100, HEIGHT / 4 + 90, 'alagard', `Collected items: ${percent}%`, 12, 0)
                            .setAlpha(0).setTintFill(0xDB4D35);

                        this.timeGame = this.add.bitmapText(100, HEIGHT / 4 + 110, 'alagard', `Total time: ${totalTime}`, 12, 0)
                            .setAlpha(0).setTintFill(0xDB4D35);


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
            delay: 16000,
            callback: () =>
            {
                this.tweene = this.tweens.add({
                    targets: [this.congrat, this.enemiesKilled, this.death, this.items, this.timeGame],
                    ease: 'Sine.easeInOut',
                    duration: 2000,
                    delay: 0,
                    repeat: 0,
                    yoyo: false,
                    alpha: {
                        getStart: () => 1,
                        getEnd: () => 0,
                    },
                    onComplete: () =>
                    {
                        this.credits();
                    },
                });
            },
        });
        this.cameras.main.fadeIn(5000);
    }

    public credits ()
    {
        this.trans = 'Credits---Designer:-Philippe Pereira---Graphics:-Luis Zuno-rvros---Music and SFX:-Sound a Head---Programming:-Philippe Pereira--- -- -- -- -- -- -- -- -- -- --Thanks for playing-- -- -- --';
        this.cnt = 0;
        this.transDisplay = this.add.bitmapText(WIDTH / 2, HEIGHT / 2 - 70, 'alagard', '', 20, 1)
            .setOrigin(0.5, 0.8)
            .setAlpha(1).setTintFill(0xDB4D35);

        this.time.addEvent({
            delay: 90,
            repeat: this.trans.length - 1,
            callback: () =>
            {
                if (this.trans[this.cnt] === '-')
                {
                    this.transDisplay.text += '\n';
                    this.cnt += 1;
                } else
                {
                    this.transDisplay.text += this.trans[this.cnt];
                    this.cnt += 1;
                }
            },
        });
    }
}