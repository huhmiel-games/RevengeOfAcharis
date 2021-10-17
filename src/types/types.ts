import Angel from '../enemies/Angel';
import BurningGhoul from '../enemies/BurningGhoul';
import Demon from '../enemies/Demon';
import Dragon from '../enemies/Dragon';
import Flames from '../enemies/Flames';
import Ghost from '../enemies/Ghost';
import HellBeast from '../enemies/HellBeast';
import HellHound from '../enemies/HellHound';
import Skeleton from '../enemies/Skeleton';
import Thing from '../enemies/Thing';
import Wizard from '../enemies/Wizard';
import Bearded from '../npc/Bearded';
import Hatman from '../npc/Hatman';
import Npc from '../npc/Npc';
import Oldman from '../npc/Oldman';
import Woman from '../npc/Woman';

// export type Enemy = Thing | Wizard | Skeleton | Ghost | BurningGhoul | HellHound | Flames | Dragon | HellBeast | Demon;

export type TNpc = Angel | Bearded | Hatman | Oldman | Woman | Npc;

export type TKeys =
    {
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        up: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
        fire: Phaser.Input.Keyboard.Key;
        jump: Phaser.Input.Keyboard.Key;
        select: Phaser.Input.Keyboard.Key;
        pause: Phaser.Input.Keyboard.Key;
    };

export type TInventory = {
    xp: number
    level: number
    maxLife: number
    life: number
    def: number
    savedPositionX: number
    savedPositionY: number
    map: string,
    jumpBoots: boolean,
    jumpBootsValue: number
    selectableWeapon: string[],
    swords: number[],
    sword: boolean,
    bow: boolean,
    bowDamage: number
    shield: boolean
    shieldDef: number
    fireRate: number
    boss1: boolean,
    thunderDoorReached: boolean,
    thunderDoorOpen: boolean,
    townInFire: boolean,
    boss2: boolean,
    bossFinal: boolean,
    escape: boolean,
    powerUp: number[],
};

export type TSwordConfig = {
    id: number;
    name: string;
    desc: string;
    damage: number;
    rate: number;
    key: number;
};