import { TBowConfig, TShieldConfig, TSwordConfig, TEquipmentConfig } from '../types/types';

export const GAMENAME = 'Revenge of Acharis';
export const WIDTH = 512;
export const HEIGHT = 288;
export const ACCELERATION_X = 600;
export const TILE_SIZE = 16;

export const JOYSTICK_DIRECTION = ['up', 'down', 'left', 'right'];

export const enum FONTS
{
    MINIMAL = 'DungeonFont',
    GALAXY = 'galaxy8',
    ALAGARD = 'alagard',
    ULTIMA = 'PixelUltima',
    ULTIMA_BOLD = 'PixelUltimaBold'
}

export const enum FONTS_SIZES
{
    MINIMAL = 22,
    GALAXY = 8,
    ULTIMA = 16,
    ULTIMA_BOLD = 16,
    ALAGARD = 20
}

export const enum SCENES_NAMES
{
    LOGO = 'logoScene',
    LOADING = 'loadingScene',
    INTRO = 'introScene',
    MENU = 'menuScene',
    GAME = 'gameScene',
    GAMEOVER = 'gameOverScene',
    ENDGAME = 'endGameScene',
    OPTIONS = 'optionsScene'

}

export const enum EWeaponType
{
    SWORD = 'sword',
    ARROW = 'arrow'
}



// map default size to feet screen is 32x18 tiles

// ***  WEAPONS *** //

export const SWORDS: TSwordConfig[] = [
    {
        id: 0, // done
        name: 'wood-sword',
        desc: 'a simple wood sword',
        damage: 4,
        rate: 300,
        key: 0
    },
    {
        id: 1, // done
        name: 'iron-sword',
        desc: 'a simple iron sword',
        damage: 5,
        rate: 300,
        key: 1
    },
    {
        id: 2, // done -> cave
        name: 'steel-sword',
        desc: 'a solid steel sword',
        damage: 6,
        rate: 280,
        key: 2
    },
    {
        id: 3, // done -> chapelle
        name: 'long-sword',
        desc: 'a long sword',
        damage: 8,
        rate: 340,
        key: 3
    },
    {
        id: 6, // done -> castle-b entrance
        name: 'saber',
        desc: 'a simple saber',
        damage: 5,
        rate: 240,
        key: 6
    },
    {
        id: 4, // done
        name: 'dark-sword',
        desc: 'a strange dark sword in a unknown matter',
        damage: 7,
        rate: 240,
        key: 4
    },
    {
        id: 5, // done
        name: 'Ashanti',
        desc: 'a old Ashanti sword',
        damage: 10,
        rate: 280,
        key: 5
    },
    {
        id: 7, // done
        name: 'fire-sword',
        desc: 'a flaming sword',
        damage: 14,
        rate: 240,
        key: 7
    },
    {
        id: 8,
        name: 'hammer-sword',
        desc: 'a huge sword that can break walls',
        damage: 12,
        rate: 440,
        key: 8
    },
    {
        id: 9,
        name: 'demonic-sword',
        desc: 'a demonic sword with a strange eye on the pommel',
        damage: 20,
        rate: 270,
        key: 9
    }
];

export const BOWS: TBowConfig[] = [
    {
        id: 10, // done
        name: 'wood-bow',
        desc: 'a simple old wood bow',
        damage: 2,
        rate: 300,
        speed: 450,
        key: 10
    },
    {
        id: 11, // done
        name: 'steel-bow',
        desc: 'throws fastest arrows',
        damage: 3,
        rate: 300,
        speed: 550,
        key: 11
    },
    {
        id: 12, // done
        name: 'dark-bow',
        desc: 'a strange dark bow in a unknown matter',
        damage: 4,
        rate: 270,
        speed: 500,
        key: 12
    },
    {
        id: 13,
        name: 'hammer-bow', // done
        desc: 'throws heavy arrows',
        damage: 5,
        rate: 440,
        speed: 500,
        key: 13
    },
    {
        id: 14,
        name: 'fire-bow',
        desc: 'throws flamed arrows',
        damage: 6,
        rate: 250,
        speed: 550,
        key: 14
    }
];

export const SHIELDS: TShieldConfig[] = [
    {
        id: 15, // done
        name: 'wood-shield',
        desc: 'a simple shield made with wood',
        defense: 4,
        key: 15
    },
    {
        id: 16, // done
        name: 'iron-shield',
        desc: 'a full iron shield ',
        defense: 6,
        key: 16
    },
    {
        id: 17, // done
        name: 'knight-shield',
        desc: 'a good knight shield',
        defense: 8,
        key: 17
    },
    {
        id: 18, // done
        name: 'royal-guard-shield',
        desc: 'perhaps the best ever made shield',
        defense: 10,
        key: 18
    },
    {
        id: 19, // done
        name: 'dark-shield',
        desc: 'a strange dark shield in a unknown matter',
        defense: 15,
        key: 19
    },
];

export const EQUIPMENT: TEquipmentConfig[] = [
    {
        id: 20,
        name: 'helm', // done
        desc: 'protect your head',
        defense: 2,
        key: 20
    },
    {
        id: 21,
        name: 'cuirass', // done
        desc: 'protect your torso',
        defense: 2,
        key: 21
    },
    {
        id: 22, // done
        name: 'cuisses',
        desc: 'protect your upper legs',
        defense: 2,
        key: 22
    },
    {
        id: 23, // done
        name: 'jump-boots',
        desc: 'make double jumps with this boots',
        defense: 0,
        key: 23
    }
];