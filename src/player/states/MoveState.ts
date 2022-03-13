import State from '../../utils/State';
import GameScene from '../../scenes/GameScene';
import Player from '../Player';
import StateMachine from '../../utils/StateMachine';
import PlayerState from '../../constant/playerState';
import PlayerAnims from '../../constant/playerAnims';

/**
 * @description
 * @author © Philippe Pereira 2020
 * @export
 * @class MoveState
 * @extends {State}
 */
export default class MoveState extends State
{
    private stateMachine: StateMachine;

    public enter (scene: GameScene, player: Player)
    {
        const { now } = scene.time;

        player.stateTimestamp.setNameAndTime(this.stateMachine.state, now);

        const currentAnim = player.anims.getName();

        if (currentAnim === 'adventurer-idle-2')
        {
            player.anims.play('adventurer-sword-shte', true);
            player.anims.chain('adventurer-walk');
        }
        
        if (currentAnim === 'adventurer-special-air-attack')
        {
            player.stopSwordAttack();

            player.anims.play('adventurer-idle-2', true);
        }
        else
        {
            player.anims.play('adventurer-walk', true);
        }

        console.log('MOVE STATE from', this.stateMachine.prevState);
    }

    public execute (scene: GameScene, player: Player)
    {
        const { left, right, fire, jump } = player.keys;

        const { blocked, velocity } = player.body;

        const absSpeed = Math.abs(velocity.x);

        const { now } = scene.time;

        // Move with acceleration
        player.move();

        if (!player.isAttacking)
        {
            player.anims.play(PlayerAnims.WALK, true);
        }

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

        // Transition to jump if pressing jump from ground or sloped ground
        if (jump.isDown && jump.getDuration() < 250 && blocked.down && !player.isJumping)
        {
            this.stateMachine.transition(PlayerState.JUMP, this.stateMachine.state);

            return;
        }

        // Transition to idle if not pressing movement keys
        if (!(left.isDown || right.isDown) && !player.isAttacking)
        {
            // If player stopped set to idle state or stop it now if onSlope
            if (absSpeed === 0)
            {
                this.stateMachine.transition(PlayerState.IDLE, this.stateMachine.state);

                return;
            }
        }

        // Transition to fall if not touching ground
        if (!blocked.down)
        {
            player.playerState.blockedDownTimestamp = now;

            this.stateMachine.transition(PlayerState.FALL, this.stateMachine.state);

            return;
        }
    }
}