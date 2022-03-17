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
 * @class HitState
 * @extends {State}
 */
export default class HitState extends State
{
    private hitTime: number;
    private stateMachine: StateMachine;

    public enter (scene: GameScene, player: Player)
    {
        const { now } = scene.time;

        player.stateTimestamp.setNameAndTime(this.stateMachine.state, now);

        player.stopSwordAttack();

        player.isJumping = false;

        player.canDoubleJump = false;

        if (player.playerState.isDead)
        {
            return;
        }

        // Stop player
        player.body.setDragX(0);

        this.hitTime = now;

        player.body.setAcceleration(0, 0);

        if (!player.flipX)
        {
            player.body.setVelocity(-200, -200);
        }

        if (player.flipX)
        {
            player.body.setVelocity(200, -200);
        }

        player.anims.play(PlayerAnims.HIT, true);

        player.hitSfx.play();

        console.log('HIT STATE from', this.stateMachine.prevState);
    }

    public execute (scene: GameScene, player: Player)
    {
        const { blocked } = player.body;

        const { now } = scene.time;

        if (blocked.down && this.hitTime + 600 < now && !player.playerState.isDead)
        {
            player.body.setVelocity(0, 0);

            player.isHit = false;
            player.isOnSpike = false;

            // return to previous state
            this.stateMachine.transition(PlayerState.IDLE, this.stateMachine.state);

            return;
        }


        // Transition to fall if not touching ground
        if (!blocked.down && this.hitTime + 600 < now && !player.playerState.isDead)
        {
            player.body.setVelocity(0, 0);

            player.isHit = false;
            player.isOnSpike = false;

            this.stateMachine.transition(PlayerState.FALL, this.stateMachine.state);

            return;
        }
    }
}