import State from '../../utils/State';
import GameScene from '../../scenes/GameScene';
import Player from '../Player';
import StateMachine from '../../utils/StateMachine';
import PlayerAnims from '../../constant/playerAnims';
import PlayerState from '../../constant/playerState';

/**
 * @description
 * @author © Philippe Pereira 2021
 * @export
 * @class JumpState
 * @extends {State}
 */
export default class DoubleJumpState extends State
{
    private stateMachine: StateMachine;

    public enter (scene: GameScene, player: Player)
    {
        const { now } = scene.time;

        player.stateTimestamp.setNameAndTime(this.stateMachine.state, now);

        // Initialize the jump
        player.jumpTime = now;

        player.isJumping = true;

        player.canDoubleJump = false;

        player.body.setVelocityY(-400);

        // Handle animations
        if (!player.isAttacking) player.anims.play(PlayerAnims.JUMP, true);
    }

    public execute (scene: GameScene, player: Player)
    {
        const { fire, jump } = player.keys;

        const { blocked } = player.body;

        const { now } = scene.time;

        // Move with acceleration
        player.move();

        // Player is hit by enemy
        if (player.isHit || player.isOnSpike)
        {
            this.stateMachine.transition(PlayerState.HIT, this.stateMachine.state);

            return;
        }

        // Attack
        if (Phaser.Input.Keyboard.DownDuration(fire, 150))
        {
            player.swordAttack(now);
        }

        // End of jump
        if (jump.isDown && player.isJumping && player.jumpTime + 350 < now)
        {
            player.isJumping = false;

            player.body.setVelocityY(0);

            this.stateMachine.transition(PlayerState.JUMP_MOMENTUM, this.stateMachine.state);

            return;
        }

        // Player stops the jump
        if (jump.isUp && player.isJumping)
        {
            player.isJumping = false;

            player.body.setVelocityY(0);

            this.stateMachine.transition(PlayerState.JUMP_MOMENTUM, this.stateMachine.state);
        }

        // If touching the ceiling
        if (blocked.up)
        {
            player.isJumping = false;

            this.stateMachine.transition(PlayerState.FALL, this.stateMachine.state);

            return;
        }
    }
}