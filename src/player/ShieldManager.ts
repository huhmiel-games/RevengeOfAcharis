import { SHIELDS } from '../constant/config';
import { TShieldConfig } from '../types/types';
import Shield from './Shield';

export default class ShieldManager
{
    private shields: Shield[] = [];
    private currentShieldId: (number | null) = null;

    public initShields (shieldsIds: number[])
    {
        shieldsIds.forEach(id =>
        {
            const shieldConfig = SHIELDS.filter(e => e.id === id)[0];

            const shield = new Shield(shieldConfig);

            this.shields.push(shield);
        });
    }

    public addShield (properties: TShieldConfig)
    {
        const config = {
            id: properties.id,
            name: properties.name,
            desc: properties.desc,
            defense: properties.defense,
            key: properties.key
        };

        const shield = new Shield(config);

        this.shields.push(shield);

        if (this.currentShieldId === null)
        {
            this.currentShieldId = shield.id;
        }
    }

    public getShields (): Shield[]
    {
        return this.shields;
    }

    public getCurrentShield (): Shield
    {
        return this.shields.filter(shield => shield.id === this.currentShieldId)[0];
    }

    public selectShield (id: number)
    {
        this.currentShieldId = id;
    }
}
