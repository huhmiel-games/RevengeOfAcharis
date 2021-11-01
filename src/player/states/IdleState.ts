import State from '../../utils/State';
import GameScene from '../../scenes/GameScene';
import Player from '../Player';
import StateMachine from '../../utils/StateMachine';
import { ACCELERATION_X } from '../../constant/config';
import PlayerState from '../../constant/playerState';
import PlayerAnims from '../../constant/playerAnims';

/**
 * @description
 * @author © Philippe Pereira 2020
 * @export
 * @class IdleState
 * @extends {State}
 */
export default class IdleState extends State
{
    private stateMachine: StateMachine;
    public enter (scene: GameScene, player: Player)
    {
        player.stateTimestamp.setNameAndTime(this.stateMachine.state, scene.time.now);

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
        const { left, right, up, down, fire, bow, jump, select, pause } = player.keys;

        const { blocked, touching } = player.body;

        const { now } = scene.time;

        // Player is hit by enemy
        if (player.isHit || player.isOnSpike)
        {
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
            this.stateMachine.transition(PlayerState.JUMP, this.stateMachine.state);

            return;
        }

        // Transition to move if pressing left or right key and not blocked
        if (right.isDown && !left.isDown && !blocked.right && !touching.right && !player.isAttacking)
        {
            this.stateMachine.transition(PlayerState.MOVE, this.stateMachine.state);

            return;
        }

        if (left.isDown && !right.isDown && !blocked.left && !touching.left && !player.isAttacking)
        {
            this.stateMachine.transition(PlayerState.MOVE, this.stateMachine.state);

            return;
        }

        // Transition to fall if not touching ground
        if (!player.body.blocked.down)
        {
            this.stateMachine.transition(PlayerState.FALL, this.stateMachine.state);

            return;
        }
    }
}