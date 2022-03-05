import { Scene } from 'phaser';
import { COLORS } from '../constant/colors';
import { WIDTH, HEIGHT, SCENES_NAMES, FONTS, FONTS_SIZES } from '../constant/config';
import SaveLoadService from '../services/SaveLoadService';
import GameScene from './GameScene';
export default class EndGame extends Scene
{
    private mainScene: GameScene;
    private trans: string;
    private cnt: number;
    private transDisplay: Phaser.GameObjects.BitmapText;
    private congrat: Phaser.GameObjects.BitmapText;
    private enemiesKilled: Phaser.GameObjects.BitmapText;
    private death: Phaser.GameObjects.BitmapText;
    private items: Phaser.GameObjects.BitmapText;
    private timeGame: Phaser.GameObjects.BitmapText;
    constructor ()
    {
        super('endGameScene');
    }

    public create ()
    {
        this.mainScene = this.scene.get(SCENES_NAMES.GAME) as GameScene;

        const enemyDeathCount = SaveLoadService.getEnemiesDeathCount().toString();

        const playerDeathCount = SaveLoadService.getPlayerDeathCount().toString();

        const swordsCount = this.mainScene.player.swordManager.getSwords().length;
        const bowsCount = this.mainScene.player.bowManager.getBows().length;
        const shieldsCount = this.mainScene.player.shieldManager.getShields().length;
        const powerUpsCount = this.mainScene.player.inventoryManager.getInventory().def / 2 + 1;

        const totalPowerUpsCount = swordsCount + bowsCount + shieldsCount + powerUpsCount;

        const percent = Math.floor(totalPowerUpsCount * 100 / 24);

        SaveLoadService.setSavedGameTime(this.mainScene);

        const totalTime = SaveLoadService.getSavedGameTimeToString();

        this.sound.play('EndingTheme');

        this.add.image(0, 0, 'backgroundWithoutTitles')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);

        this.trans = 'The end';
        this.cnt = 0;
        this.transDisplay = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, 'alagard', '', 20, 1)
            .setOrigin(0.5, 0.5).setDropShadow(0, 1, COLORS.ORANGE);

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
                this.tweens.add({
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
                        this.congrat = this.add.bitmapText(WIDTH / 2, HEIGHT / 4, 'alagard', 'Congratulations !!', 20, 1)
                            .setOrigin(0.5, 0.5)
                            .setAlpha(0).setDropShadow(0, 1, COLORS.ORANGE);

                        this.enemiesKilled = this.add.bitmapText(42, HEIGHT / 4 + 50, 'alagard', `Killed Enemies: ${enemyDeathCount}`, 12, 0)
                            .setAlpha(0).setTintFill(COLORS.RED).setDropShadow(0, 1, COLORS.ORANGE);

                        this.death = this.add.bitmapText(42, HEIGHT / 4 + 70, 'alagard', `Player Death: ${playerDeathCount}`, 12, 0)
                            .setAlpha(0).setDropShadow(0, 1, COLORS.ORANGE);

                        this.items = this.add.bitmapText(42, HEIGHT / 4 + 90, 'alagard', `Collected items: ${percent}%`, 12, 0)
                            .setAlpha(0).setDropShadow(0, 1, COLORS.ORANGE);

                        this.timeGame = this.add.bitmapText(42, HEIGHT / 4 + 110, 'alagard', `Total time: ${totalTime}`, 12, 0)
                            .setAlpha(0).setDropShadow(0, 1, COLORS.ORANGE);

                        this.tweens.add({
                            targets: [this.congrat, this.enemiesKilled, this.death, this.items, this.timeGame],
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
                this.tweens.add({
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
        const credits = `
CREDITS


DESIGNER:
Philippe Pereira


GRAPHICS:
Clembod
LuizMelo
Sanctumpixel
Anokolisa
Calciumtrice
Ansimuz
Emcee flesher
Creativekind
Astrobob
Oco
Jam991
David Garay
Pimen
Eddie's Workshop


MUSIC and SFX:
Sound a Head


PROGRAMMING:
Philippe Pereira


SPECIAL THANKS
Kilian for testing
Richard Davey for Phaser 3











Thanks for playing`;
        
        
        const creditsDisplay = this.add.bitmapText(WIDTH / 2, HEIGHT + 10, FONTS.ALAGARD, credits, 18, 1)
            .setOrigin(0.5, 0)
            .setAlpha(1)
            .setTintFill(COLORS.RED)
            .setDropShadow(0, 1, COLORS.ORANGE);
        
        this.tweens.add({
            targets: creditsDisplay,
            y: -creditsDisplay.height + HEIGHT / 2 + 18,
            duration: 50000
        });
    }
}
