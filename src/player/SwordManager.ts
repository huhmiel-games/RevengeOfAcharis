import { SWORDS } from '../constant/config';
import { TSwordConfig } from '../types/types';
import Sword from './Sword';

export default class SwordManager
{
    private swords: Sword[] = [];
    private currentSwordId: number = 0;

    public initSwords (swordsIds: number[])
    {
        swordsIds.forEach(id =>
        {
            const swordConfig = SWORDS.filter(e => e.id === id)[0];

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
        return this.swords.filter(sword => sword.id === this.currentSwordId)[0];
    }

    public selectSword (id: number)
    {
        this.currentSwordId = id;
    }
}
