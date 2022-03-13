import { SHIELDS } from '../../constant/config';
import { TShieldConfig } from '../../types/types';
import Shield from '../items/Shield';

export default class ShieldManager
{
    private shields: Shield[] = [];
    private currentShieldId: (number | null) = null;

    public initShields (shieldsIds: number[])
    {
        shieldsIds.forEach(id =>
        {
            const shieldConfig = SHIELDS.find(e => e.id === id) as TShieldConfig;

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
        return this.shields.find(shield => shield.id === this.currentShieldId) as Shield;
    }

    public selectShield (id: number)
    {
        this.currentShieldId = id;
    }
}
