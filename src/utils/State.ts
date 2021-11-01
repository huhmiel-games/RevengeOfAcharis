import GameScene from '../scenes/GameScene';
import Player from '../player/Player';

abstract class State
{
    public abstract enter (scene: GameScene, player: Player): void;

    public abstract execute (scene: GameScene, player: Player): void;
}

export default State;