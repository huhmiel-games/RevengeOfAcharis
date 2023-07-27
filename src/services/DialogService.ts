import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES, HEIGHT, WIDTH } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class DialogService
 */
export default class DialogService
{
    public static npcTalk (scene: GameScene, text: string[])
    {
        scene.player.isPause = true;

        scene.setPause(true, false, false);

        // @ts-ignore
        const ui = scene.children.getByName('bigDialogBox') || scene.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 8, WIDTH, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setName('bigDialogBox')
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0);
            ui.setActive(true).setVisible(true);

        let index = 0;

        const msg = scene.children.getByName('npcText') as Phaser.GameObjects.BitmapText || scene.add.bitmapText(WIDTH / 32, HEIGHT - 48, FONTS.MINIMAL, '', FONTS_SIZES.MINIMAL, 1)
            .setOrigin(0, 0)
            .setName('npcText')
            .setLetterSpacing(1)
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.STEEL_GRAY);
        msg.setActive(true).setText(text[index]).setVisible(true);

        const dialog = scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (event.key === scene.player.keys.fire.originalEvent.key && index < text.length)
            {
                index += 1;

                msg.setText('');

                scene.time.addEvent({
                    delay: 150,
                    callback: () => msg.setText(text[index])
                });
            }

            if (event.key === scene.player.keys.fire.originalEvent.key && index === text.length)
            {
                msg.setActive(false).setVisible(false);

                ui.setActive(false).setVisible(false);

                scene.unPause();

                scene.time.addEvent({
                    delay: 150,
                    callback: () =>
                    {
                        scene.player.isPause = false;
                        dialog.removeAllListeners();
                    }
                });
            }
        });
    }

    public static enemyTalk (scene: GameScene, text: string[], callback)
    {
        // @ts-ignore
        const ui = scene.children.getByName('bigDialogBox') || scene.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 8, WIDTH, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setName('bigDialogBox')
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0);
        ui.setActive(true)
            .setVisible(true);

        let index = 0;

        const msg = scene.children.getByName('npcText') as Phaser.GameObjects.BitmapText || scene.add.bitmapText(WIDTH / 32, HEIGHT - 48, FONTS.MINIMAL, text[index], FONTS_SIZES.MINIMAL, 1)
            .setOrigin(0, 0)
            .setName('npcText')
            .setLetterSpacing(1)
            .setAlpha(1)
            .setDepth(DEPTH.UI_TEXT)
            .setTintFill(COLORS.STEEL_GRAY)
            .setScrollFactor(0, 0);
        msg.setActive(true).setText(text[index]).setVisible(true);

        const dialog = scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (event.key === scene.player.keys.fire.originalEvent.key && index < text.length)
            {
                index += 1;

                msg.setText('');

                scene.time.addEvent({
                    delay: 150,
                    callback: () => msg.setText(text[index])
                });
            }

            if (event.key === scene.player.keys.fire.originalEvent.key && index === text.length)
            {
                msg.setActive(false).setVisible(false);

                ui.setActive(false).setVisible(false);

                dialog.removeAllListeners();

                callback();
            }
        });
    }
}
