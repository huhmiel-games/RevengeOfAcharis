import { TSwordConfig } from '../../types/types';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class Sword
 */
export default class Sword
{
    public id: number;
    public name: string;
    public desc: string;
    public damage: number;
    public rate: number;
    public key: number;

    constructor (config: TSwordConfig)
    {
        this.id = config.id;
        this.name = config.name;
        this.desc = config.desc;
        this.damage = config.damage;
        this.rate = config.rate;
        this.key = config.key;
    }
}