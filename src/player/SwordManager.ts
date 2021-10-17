import { SWORDS } from '../constant/config';
import Sword from './Sword';

export default class SwordManager
{
    private swords: Sword[] = [];
    private currentSword: number = 0;

    public initSwords (swordsIds: number[])
    {
        swordsIds.forEach(id =>
        {
            const swordConfig = SWORDS.filter(e => e.id === id)[0];

            const sword = new Sword(swordConfig);

            this.swords.push(sword);
        });
    }

    public addSword (id: number, name: string, desc: string, damage: number, rate: number, key: number)
    {
        const config = {
            id,
            name,
            desc,
            damage,
            rate,
            key
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
        return this.swords.filter(sword => sword.id === this.currentSword)[0];
    }

    public selectSword (id: number)
    {
        this.currentSword = id;
    }
}
