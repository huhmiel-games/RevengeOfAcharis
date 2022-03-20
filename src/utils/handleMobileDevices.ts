import { COLORS } from '../constant/colors';
import { HEIGHT, JOYSTICK_DIRECTION, WIDTH } from '../constant/config';
import GameScene from '../scenes/GameScene';

const KEY_MAP = { left: 'LEFT', right: 'RIGHT', up: 'UP', down: 'DOWN', fire: 'Y', jump: 'X', bow: 'A', select: 'B', pause: 'P' };

export function checkIsMobileDevice (scene: Phaser.Scene): boolean
{
    const { android, iOS, iPad, iPhone } = scene.sys.game.device.os;

    if (android || iOS || iPad || iPhone)
    {
        return true;
    }

    return false;
}

export function addJoystick (scene: GameScene)
{
    scene.input.addPointer(3);
    // @ts-ignore
    scene.joyStick = scene.plugins.get('rexVirtualJoystickPlugin').add(scene, {
        x: 48,
        y: HEIGHT - 48,
        radius: 50,
        base: scene.add.circle(0, 0, 50, 0x888888),
        thumb: scene.add.circle(0, 0, 25, COLORS.RED),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        // forceMin: 16,
        // enable: true
    })
        .on('update', () => handleJoyStick(scene), scene);
    scene.joyStick.base.setDepth(2999).setAlpha(0.5);
    scene.joyStick.thumb.setDepth(3000).setAlpha(0.5);

    const x = scene.add.image(WIDTH - 32, HEIGHT - 32, 'abxy', 0).setName('jump');

    const y = scene.add.image(WIDTH - 96, HEIGHT - 32, 'abxy', 2).setName('fire');

    const a = scene.add.image(WIDTH - 32, HEIGHT - 96, 'abxy', 1).setName('bow');

    const b = scene.add.image(WIDTH - 32, 32, 'abxy', 3).setName('select');

    [a, b, x, y].forEach(button =>
    {
        button.setDepth(3000).setAlpha(0.5).setScrollFactor(0, 0).setDisplaySize(64, 64).setInteractive();
        button.on('pointerdown', () => handleButtons(scene, button.name, 'keydown'), scene);
        button.on('pointerup', () => handleButtons(scene, button.name, 'keyup'), scene);
    });
}

function handleButtons (scene: GameScene, name: string, eventName: 'keydown' | 'keyup')
{
    emitEventKeyDown(scene, name, eventName);
}

export function handleJoyStick (scene: GameScene)
{
    // console.log(this.joyStick);
    JOYSTICK_DIRECTION.forEach(joyBtn =>
    {
        // joystick pressed
        if (scene.joyStick[joyBtn] && scene.player.keys[joyBtn].isUp)
        {
            emitEventKeyDown(scene, joyBtn, 'keydown');
        }

        // joystick released
        if (!scene.joyStick[joyBtn] && scene.player.keys[joyBtn].isDown)
        {
            emitEventKeyDown(scene, joyBtn, 'keyup');
        }
    });
}

export function emitEventKeyDown (scene: GameScene, button: string, eventName: 'keydown' | 'keyup')
{
    const event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, false);
    // @ts-ignore
    event.originalEvent = { key: undefined };
    // @ts-ignore
    event.originalEvent.key = KEY_MAP[button];
    // @ts-ignore
    event.keyCode = scene.player.keys[button].keyCode;

    document.dispatchEvent(event);
}