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
export default class JumpMomentumState extends State
{
    private stateMachine: StateMachine;

    public enter (scene: GameScene, player: Player)
    {
        player.body.setGravityY(0);

        scene.time.addEvent({
            delay: 100,
            callback: () =>
            {
                player.body.setGravityY(1000);

                if (!player.isHit)
                {
                    this.stateMachine.transition(PlayerState.FALL, this.stateMachine.state);
                }
            }
        });

        if (!player.isAttacking)
        {
            player.anims.play(PlayerAnims.JUMP_MOMENTUM, true);
        }
    }

    public execute (scene: GameScene, player: Player)
    {
        const { fire } = player.keys;

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

        // If touching the ceiling
        if (blocked.up)
        {
            this.stateMachine.transition(PlayerState.FALL, this.stateMachine.state);

            return;
        }
    }
}
