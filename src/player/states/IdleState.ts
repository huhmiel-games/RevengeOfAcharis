import State from '../../utils/State';
import GameScene from '../../scenes/GameScene';
import Player from '../Player';
import StateMachine from '../../utils/StateMachine';
import { ACCELERATION_X } from '../../constant/config';
import PlayerState from '../../constant/playerState';
import PlayerAnims from '../../constant/playerAnims';

/**
 * @description
 * @author © Philippe Pereira 2021
 * @export
 * @class IdleState
 * @extends {State}
 */
export default class IdleState extends State
{
    private stateMachine: StateMachine;
    public enter (scene: GameScene, player: Player)
    {
        const { now } = scene.time;

        player.stateTimestamp.setNameAndTime(this.stateMachine.state, now);

        player.body.setOffset(21, 10);

        const currentAnim = player.anims.getName();

        if (currentAnim === 'adventurer-special-air-attack')
        {
            player.stopSwordAttack();

            player.anims.play('adventurer-idle-2', true);
        }
        else
        {
            player.anims.play('adventurer-idle', true);
        }

        console.log('IDLE STATE from', this.stateMachine.prevState);
    }

    public execute (scene: GameScene, player: Player)
    {
        const { left, right, fire, bow, jump } = player.keys;

        const { blocked, touching } = player.body;

        const { now } = scene.time;

        // Player is hit by enemy
        if (player.isHit || player.isOnSpike)
        {
            player.isBendBow = false;

            this.stateMachine.transition(PlayerState.HIT, this.stateMachine.state);

            return;
        }

        // Attack
        if (Phaser.Input.Keyboard.DownDuration(fire, 150) && !player.isAttacking)
        {
            player.swordAttack(now);
        }

        if (bow.isDown && !player.isAttacking && !player.isBendBow)
        {
            player.bendBow(now);
        }

        if (Phaser.Input.Keyboard.UpDuration(bow, 150) && player.isBendBow)
        {
            player.shootArrow(now);
        }

        // Transition to jump if pressing jump
        if (jump.isDown && jump.getDuration() < 250 && blocked.down && !player.isJumping)
        {
            player.isBendBow = false;

            this.stateMachine.transition(PlayerState.JUMP, this.stateMachine.state);

            return;
        }

        // Transition to move if pressing left or right key and not blocked
        if (right.isDown && !left.isDown && !blocked.right && !touching.right && !player.isAttacking)
        {
            player.isBendBow = false;

            this.stateMachine.transition(PlayerState.MOVE, this.stateMachine.state);

            return;
        }

        if (left.isDown && !right.isDown && !blocked.left && !touching.left && !player.isAttacking)
        {
            player.isBendBow = false;

            this.stateMachine.transition(PlayerState.MOVE, this.stateMachine.state);

            return;
        }

        // Transition to fall if not touching ground
        if (!blocked.down)
        {
            this.stateMachine.transition(PlayerState.FALL, this.stateMachine.state);

            return;
        }
    }
}