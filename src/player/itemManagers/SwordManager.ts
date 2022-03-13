import { SWORDS } from '../../constant/config';
import { TSwordConfig } from '../../types/types';
import Sword from '../items/Sword';

export default class SwordManager
{
    private swords: Sword[] = [];
    private currentSwordId: number = 0;

    public initSwords (swordsIds: number[])
    {
        swordsIds.forEach(id =>
        {
            const swordConfig = SWORDS.find(e => e.id === id) as TSwordConfig;

            const sword = new Sword(swordConfig);

            this.swords.push(sword);
        });
    }

    public addSword (properties: TSwordConfig)
    {
        const config = {
            id: properties.id,
            name: properties.name,
            desc: properties.desc,
            damage: properties.damage,
            rate: properties.rate,
            key: properties.key
        };

        const sword = new Sword(config);

        this.swords.push(sword);
    }

    public getSwords (): Sword[]
    {
        return this.swords;
    }

    public getCurrentSword (): Sword
    {
        return this.swords.find(sword => sword.id === this.currentSwordId) as Sword;
    }

    public selectSword (id: number)
    {
        this.currentSwordId = id;
    }
}
