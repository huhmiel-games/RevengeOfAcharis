import { TSwordConfig } from '../types/types';

export const GAMENAME = 'Revenge of Acharis';
export const WIDTH = 512;
export const HEIGHT = 288;
export const ACCELERATION_X = 600;
export const TILE_SIZE = 16;

export const enum FONTS {
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
    ULTIMA_BOLD = 16
}

export const enum SCENES_NAMES
{
    LOGO = 'logoScene',
    LOADING = 'loadingScene',
    INTRO= 'introScene',
    MENU = 'menuScene',
    GAME = 'gameScene',
    GAMEOVER = 'gameOverScene',
    ENDGAME = 'endGameScene',
    OPTIONS = 'optionsScene'
    
}



// map default size to feet screen is 32x18 tiles

// ***  WEAPONS *** //

export const SWORDS: TSwordConfig[] = [
    {
        id: 0,
        name: 'wood-sword',
        desc: 'a simple wood sword',
        damage: 4,
        rate: 300,
        key: 0
    },
    {
        id: 1,
        name: 'iron-sword',
        desc: 'a simple iron sword',
        damage: 5,
        rate: 300,
        key: 1
    },
    {
        id: 2,
        name: 'steel-sword',
        desc: 'a simple wood sword',
        damage: 6,
        rate: 280,
        key: 2
    },
    {
        id: 3,
        name: 'long-sword',
        desc: 'a long sword',
        damage: 8,
        rate: 340,
        key: 3
    },
    {
        id: 6,
        name: 'saber',
        desc: 'a simple saber',
        damage: 5,
        rate: 240,
        key: 6
    },
    {
        id: 4,
        name: 'dark-sword',
        desc: 'a strange dark sword in a unknown matter',
        damage: 7,
        rate: 240,
        key: 4
    },
    {
        id: 5,
        name: 'Ashanti',
        desc: 'a old Ashanti sword',
        damage: 10,
        rate: 280,
        key: 5
    },
    {
        id: 7,
        name: 'fire-sword',
        desc: 'a flaming sword',
        damage: 12,
        rate: 240,
        key: 7
    },
    {
        id: 8,
        name: 'hammer-sword',
        desc: 'a huge sword',
        damage: 20,
        rate: 300,
        key: 8
    },
    {
        id: 9,
        name: 'demonic-sword',
        desc: 'a demonic sword with a strange eye on the pommel',
        damage: 30,
        rate: 270,
        key: 9
    }
];