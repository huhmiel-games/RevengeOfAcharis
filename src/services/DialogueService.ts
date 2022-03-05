import { FONTS, HEIGHT, WIDTH } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';

export default class DialogueService
{
    public static npcTalk (scene: GameScene, text: string[])
    {
        scene.setPause();

        scene.player.isPause = true;

        // @ts-ignore
        const ui = scene.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 8, WIDTH, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0)
            .setVisible(true);

        let index = 0;

        const msg = scene.add.bitmapText(WIDTH / 32, HEIGHT - 48, FONTS.MINIMAL, text[index], 22, 1)
            .setOrigin(0, 0).setLetterSpacing(1).setAlpha(1).setDepth(DEPTH.UI_TEXT).setScrollFactor(0, 0);

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
                msg.destroy();
                
                ui.destroy();
                
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
}
