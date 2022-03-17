import PlayerState from '../constant/playerState';

/**
 * @description A StateTimestamp class helper
 * @author © Philippe Pereira 2021
 * @export
 * @class StateTimestamp
 * @param stateName
 * @param timestamp
 */
export default class StateTimestamp
{
    private stateName: string = PlayerState.IDLE;
    private timestamp: number = 0;
    
    public getStateName (): string
    {
        return this.stateName;
    }

    public setStateName (value: PlayerState): void
    {
        this.stateName = value;
    }

    public getTimestamp (): number
    {
        return this.timestamp;
    }

    public setTimestamp (value: number): void
    {
        this.timestamp = value;
    }

    public setNameAndTime (state: PlayerState, time: number)
    {
        this.stateName = state;
        this.timestamp = time;
    }
}