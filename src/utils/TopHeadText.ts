import { GameObjects } from 'phaser';
import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import Demon from '../enemies/Demon';
import Enemy from '../enemies/Enemy';
import HellBeast from '../enemies/HellBeast';
import GameScene from '../scenes/GameScene';
import Player from '../player/Player';

export default class TopHeadText extends GameObjects.BitmapText
{
    public scene: GameScene;
    public font: string = FONTS.GALAXY;
    public fontSize: number = FONTS_SIZES.GALAXY;

    constructor (scene: GameScene, x: number, y: number, font: string)
    {
        super(scene, x, y, font);

        this.setFont(FONTS.GALAXY)
            .setFontSize(FONTS_SIZES.GALAXY)
            .setCenterAlign()
            .setDepth(DEPTH.UI_TEXT);
    }

    public showXpText (player: Player, xp: number)
    {
        if (player.active === false || player.body === undefined)
        {
            this.setActive(false).setVisible(false);

            return;
        }
        this.setText(`xp ${Math.round(xp)}`)
            .setTintFill(COLORS.GREEN)
            .setDropShadow(1, 1, COLORS.ORANGE, 1)
            .setPosition(player.body.center.x - this.width / 2, player.body.top);

        this.scene.tweens.add({
            targets: this,
            duration: 1500,
            y: {
                from: player.body.top,
                to: player.body.top - 32
            },
            alpha: 0,
            onComplete: () => this.setActive(false).setVisible(false)
        });
    }

    public showDamageText (character: Player | Enemy | Demon | HellBeast, damage: number)
    {
        if (character.active === false || character.body === undefined)
        {
            this.setActive(false).setVisible(false);

            return;
        }
        this.setText(`-${damage}`)
            .setTintFill(COLORS.RED)
            .setDropShadow(1, 1, COLORS.ORANGE, 1)
            .setPosition(character.body.center.x, character.body.top);

        this.scene.tweens.add({
            targets: this,
            duration: 1500,
            y: {
                from: character.body.top,
                to: character.body.top - 32
            },
            alpha: 0,
            onComplete: () => this.setActive(false).setVisible(false)
        });
    }
}