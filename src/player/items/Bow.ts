import { TBowConfig } from '../../types/types';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class Bow
 */
export default class Bow
{
    public id: number;
    public name: string;
    public desc: string;
    public damage: number;
    public rate: number;
    public key: number;
    public speed: number;

    constructor (config: TBowConfig)
    {
        this.id = config.id;
        this.name = config.name;
        this.desc = config.desc;
        this.damage = config.damage;
        this.speed = config.speed;
        this.rate = config.rate;
        this.key = config.key;
    }
}