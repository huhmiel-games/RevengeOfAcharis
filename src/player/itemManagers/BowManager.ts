import { BOWS } from '../../constant/config';
import { TBowConfig } from '../../types/types';
import Bow from '../items/Bow';

export default class BowManager
{
    private bows: Bow[] = [];
    private currentBowId: (number | null) = null;

    public initBows (bowsIds: number[])
    {
        bowsIds.forEach(id =>
        {
            const swordConfig = BOWS.find(e => e.id === id) as TBowConfig;

            const sword = new Bow(swordConfig);

            this.bows.push(sword);
        });
    }

    public addBow (properties: TBowConfig)
    {
        const config = {
            id: properties.id,
            name: properties.name,
            desc: properties.desc,
            damage: properties.damage,
            speed: properties.speed,
            rate: properties.rate,
            key: properties.key
        };

        const bow = new Bow(config);

        this.bows.push(bow);

        if (this.currentBowId === null)
        {
            this.currentBowId = bow.id;
        }
    }

    public getBows (): Bow[]
    {
        return this.bows;
    }

    public getCurrentBow (): Bow
    {
        return this.bows.find(bow => bow.id === this.currentBowId) as Bow;
    }

    public selectBow (id: number)
    {
        this.currentBowId = id;
    }
}
