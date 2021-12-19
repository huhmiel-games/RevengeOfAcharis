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
 * @class FallState
 * @extends {State}
 */
export default class FallState extends State
{
    private stateMachine: StateMachine;
    private fallTimestamp: number = 0; // future double jump ??
    constructor ()
    {
        super();
    }
    public enter (scene: GameScene, player: Player)
    {
        const { now } = scene.time;
        player.stateTimestamp.setNameAndTime(this.stateMachine.state, now);

        player.body.setGravityY(1000);

        console.log('FALL STATE from', this.stateMachine.prevState);
    }

    public execute (scene: GameScene, player: Player)
    {
        const { left, right, up, down, fire, jump, select, pause } = player.keys;

        const { playerState, body } = player;

        const { now } = scene.time;

        // Move with acceleration
        player.move();

        if (!player.isAttacking) player.anims.play(PlayerAnims.FALL, true);

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

        // Ghost Jumping
        if (jump.isDown && jump.getDuration() < 250 && playerState.blockedDownTimestamp + 125 > now)
        {
            this.stateMachine.transition(PlayerState.JUMP, this.stateMachine.state);

            return;
        }

        // Transition to Idle if touching ground
        if (body.blocked.down)
        {
            player.stopSwordAttack();

            const smoke = scene.smoke.getFirstDead(true, body.center.x, body.bottom - 8, undefined, undefined, true);

            smoke?.setDepth(2000);
            smoke?.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => smoke.destroy());
            smoke?.anims.play('smoke3');

            if (left.isDown || right.isDown)
            {
                this.stateMachine.transition(PlayerState.MOVE, this.stateMachine.state);

                return;
            }

            if (!player.walkStepSfx.isPlaying && playerState.blockedDownTimestamp + 250 < now) player.walkStepSfx.play({ rate: 0.8 });

            this.stateMachine.transition(PlayerState.IDLE, this.stateMachine.state);

            return;
        }
    }
}