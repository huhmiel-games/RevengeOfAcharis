import { TShieldConfig } from '../../types/types';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class Shield
 */
export default class Shield
{
    public id: number;
    public name: string;
    public desc: string;
    public defense: number;
    public key: number;

    constructor (config: TShieldConfig)
    {
        this.id = config.id;
        this.name = config.name;
        this.desc = config.desc;
        this.defense = config.defense;
        this.key = config.key;
    }
}