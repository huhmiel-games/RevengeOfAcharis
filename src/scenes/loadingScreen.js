import { Scene } from 'phaser';
import U from '../utils/usefull';

// SFX LOAD
// sound_ahead, you can change a sound this way:
// import bulletFX from '../assets/sounds/yoursoundname.ogg;
// don't change the first part of the lines "bulletFX"
// or the game breaks
// we need to have a list of all sfx we need for better organization
import bulletFX from '../assets/sfx/knife_fire.ogg'; // knife sfx
import swellFX from '../assets/sfx/sword_fire.ogg'; // sword sfx
import missileFX from '../assets/sfx/axe_fire.ogg'; // axe sfx
import waterStormSfx from '../assets/sfx/water_magic.ogg';
import lavaStormSfx from '../assets/sfx/lava_magic.ogg';
import thunderStormSfx from '../assets/sfx/thunder_magic.ogg';
import thunderGateSfx from '../assets/sfx/thunder_gate.ogg';
import forestWalkSfx from '../assets/sfx/forest_walk.ogg';
import townWalkSfx from '../assets/sfx/town_walk.ogg';
import graveyardWalkSfx from '../assets/sfx/graveyard_walk.ogg';
import castleWalkSfx from '../assets/sfx/castle_walk.ogg';
import churchWalkSfx from '../assets/sfx/church_walk.ogg';

// sfx for weapon select
import knifeIconSfx from '../assets/sfx/knife_icon.ogg';
import swordIconSfx from '../assets/sfx/sword_icon.ogg';
import axeIconSfx from '../assets/sfx/axe_icon.ogg';
import waterIconSfx from '../assets/sfx/water_icon.ogg';
import lavaIconSfx from '../assets/sfx/lava_icon.ogg';
import thunderIconSfx from '../assets/sfx/thunder_icon.ogg';

//HUD sfx
import playerDead from '../assets/sfx/Death_melody.ogg';
import melo from '../assets/sfx/SavePoint.ogg';
import powerUpFX from '../assets/sfx/Acharis_upgrade.ogg';
import playerHitFX from '../assets/sfx/Acharis_hit.ogg';
import lowLifeSfx from '../assets/sfx/Acharis_life_low.ogg';
import getLifeFX from '../assets/sfx/Acharis_heart_get.ogg';


import laserFX from '../assets/sounds/laser3.ogg'; // no use for now
import impactFX from '../assets/sounds/explo.ogg'; // no use for now
import explo2FX from '../assets/sounds/explo2.ogg'; // no use for now
import enemyImpactFX from '../assets/sounds/enemyHit.ogg'; 
//import playerHitFX from '../assets/sounds/playerHit.ogg'; // when player is hit
import morphFX from '../assets/sounds/playerHit2.ogg'; // no use for now
//simport powerUpFX from '../assets/sounds/powerup.ogg'; // when player got a item, could be cool to have a little melody instead
import selectFX from '../assets/sounds/select.ogg'; // menu navigation i guess
import doorFX from '../assets/sounds/elevator.ogg'; // door sfx but not used anu
import jumpBoosterFX from '../assets/sounds/jumpboost.ogg'; // no use for now
//import getLifeFX from '../assets/sounds/getlife2.ogg'; // when player get life from dead enemies
import runFX from '../assets/sounds/walk.ogg'; // player walk sfx
import explo3FX from '../assets/sounds/explo3.ogg'; // no use for now
//import melo from '../assets/sounds/melo1.ogg'; // when we save the game on checkpoints
//import playerDead from '../assets/sounds/playerdead.ogg'; // when player die, a little melody could be cool
import shake from '../assets/sounds/shake3.ogg'; // when i shake the camera like earthquake
import shake2 from '../assets/sounds/shake4.ogg'; // when i shake the camera like earthquake
import guepeFX from '../assets/sounds/guepe.ogg'; // the flying ghost in cemitary
import grog from '../assets/sounds/grog.ogg'; // need to investigate this one
import bip2 from '../assets/sounds/piou.ogg'; // used mainly on menu
import bip1 from '../assets/sounds/walk.ogg'; // used mainly on menu
import bip3 from '../assets/sounds/noname.ogg'; // used mainly on menu
import bip from '../assets/sounds/bip.ogg'; // used mainly on menu



// MUSIC LOAD
// musics are launched by the maps and i don't changed them yet
// so make a new line import with your song if you want, i'll add them to the map asap
import ambient1 from '../assets/music/ambient1.ogg';
import ambient2 from '../assets/music/ambient2.ogg';
import ambient3 from '../assets/music/grotte.ogg';


// GRAPHICS LOAD
import background from '../assets/menuBackgound4.png';
import backgroundWithoutTitles from '../assets/backWithoutTitles.png';

//Player
import spritesheetPlayer from '../assets/atlas/player_atlas.png';
import spritesheetPlayerN from '../assets/atlas/player_atlas_n.png';
import spritesheetPlayerJSON from '../assets/atlas/player_atlas.json';

// Enemies
import spritesheetEnemies from '../assets/atlas/enemies_atlas.png';
import spritesheetEnemiesN from '../assets/atlas/enemies_atlas_n.png';
import spritesheetEnemiesJSON from '../assets/atlas/enemies_atlas.json';

// Boss
import dragonAtlas from '../assets/atlas/dragon_atlas.png';
import dragonAtlasN from '../assets/atlas/dragon_atlas_n.png';
import dragonAtlasJSON from '../assets/atlas/dragon_atlas.json';
import hellBeastAtlas from '../assets/atlas/hellBeast_atlas.png';
import hellBeastAtlasN from '../assets/atlas/hellBeast_atlas_n.png';
import hellBeastAtlasJSON from '../assets/atlas/hellBeast_atlas.json';
import finalBossAtlas from '../assets/atlas/finalBoss_atlas.png';
import finalBossAtlasN from '../assets/atlas/finalBoss_atlas_n.png';
import finalBossAtlasJSON from '../assets/atlas/finalBoss_atlas.json';

// Angel
import angelAtlas from '../assets/atlas/angel_atlas.png';
import angelAtlasN from '../assets/atlas/angel_atlas_n.png';
import angelAtlasJSON from '../assets/atlas/angel_atlas.json';

// Magic
import stormAtlas from '../assets/atlas/storm_atlas.png';
import stormAtlasJSON from '../assets/atlas/storm_atlas.json';
import darkClouds from '../assets/darkClouds.png';

// Map
import tiles from '../assets/environment/layers/tilesets.png';
import tilesN from '../assets/environment/layers/tilesets_n.png';
import map1 from '../maps/map1.json';
import map2 from '../maps/map2.json';
import map3 from '../maps/map3.json';
import map4 from '../maps/map4.json';
import map5 from '../maps/map5.json';
import map6 from '../maps/map6.json';
import map7 from '../maps/map7.json';
import map8 from '../maps/map8.json';
import map9 from '../maps/map9.json';
import map10 from '../maps/map10.json';
import map11 from '../maps/map11.json';
import map12 from '../maps/map12.json';
import map13 from '../maps/map13.json';
import map14 from '../maps/map14.json';
import map15 from '../maps/map15.json';
import map16 from '../maps/map16.json';
import map17 from '../maps/map17.json';
import map18 from '../maps/map18.json';
import map19 from '../maps/map19.json';
//import map20 from '../maps/map20.json';


// Various
import knife from '../assets/knife.png';
import sword from '../assets/sword2.png';
import axe from '../assets/axe.png';
import heart from '../assets/heart.png';
import fireBall from '../assets/fire-ball.png';
import savestation from '../assets/savestation.png';


// import impact from '../assets/spritesheets/Fx/impact.png';

import blackPixel from '../assets/blackPixel.png';
import whitePixel from '../assets/whitePixel.png';
import normalMapPixel from '../assets/normalMapPixel.png';
import head from '../assets/head.png';
import movingPlatform from '../assets/platform.png';
import platformSpike from '../assets/platformSpike.png';

// parralax
import map1back from '../maps/map1back.png';
import map1backN from '../maps/map1back_n.png';
import map1middle from '../maps/map1middle.png';
import map1middleN from '../maps/map1middle_n.png';
import map2back from '../maps/map2back.png';
import map2backN from '../maps/map2back_n.png';
import map3backTest from '../maps/map3backTest.png';
import map3backTestN from '../maps/map3backTest_n.png';
import map3middle from '../maps/map3middle.png';
import map3middle2 from '../maps/map3middle2.png';
import map4back from '../maps/map4back.png';
import map4backN from '../maps/map4back_n.png';
import map5back from '../maps/map5back.png';
import map5backN from '../maps/map5back_n.png';
import map6back from '../maps/map6back.png';
import map6backN from '../maps/map6back_n.png';
import map7back from '../maps/map7back.png';
import map7backN from '../maps/map7back_n.png';
import map8back from '../maps/map8back.png';
import map8backN from '../maps/map8back_n.png';
import map9back from '../maps/map9back.png';
import map9backN from '../maps/map9back_n.png';
import map10back from '../maps/map10back.png';
import map10backN from '../maps/map10back_n.png';
import map11back from '../maps/map11back.png';
import map11backN from '../maps/map11back_n.png';
import map11middle2 from '../maps/map11middle2.png';
import map12back from '../maps/map12back.png';
import map12backN from '../maps/map12back_n.png';
import map13back from '../maps/map13back.png';
import map13backN from '../maps/map13back_n.png';
import map14back from '../maps/map14back.png';
import map14backN from '../maps/map14back_n.png';
import map15back from '../maps/map15back.png';
import map15backN from '../maps/map15back_n.png';
import map16back from '../maps/map16back.png';
import map16backN from '../maps/map16back_n.png';
import map17back from '../maps/map17back.png';
import map17backN from '../maps/map17back_n.png';
import map18back from '../maps/map18back.png';
import map18backN from '../maps/map18back_n.png';
import map19back from '../maps/map19back.png';
import map19backN from '../maps/map19back_n.png';


// dashboard
//import blackPixel from '../assets/blackPixel.png';
import knifeIcon from '../assets/knifeIcon.png';
import swordIcon from '../assets/swordIcon.png';
import axeIcon from '../assets/axeIcon.png';
import lavaStormIcon from '../assets/lavaStormIcon.png';
import waterStormIcon from '../assets/waterStormIcon.png';
import thunderStormIcon from '../assets/thunderStormIcon.png';
import iconFullscreen from '../assets/iconFullscreen.png';
//import heart from '../assets/heart.png';
import energyBar from '../assets/energyBar.png';



// import shaders
import GlowFx from '../shaders/glowFx';
import GlowFixedFx from '../shaders/glowFixed';
import TestFx from '../shaders/testShaders';
import HeatFx from '../shaders/heatFx';


export default class LoadingScreen extends Scene {
  constructor() {
    super({
      key: 'LoadingScreen',

      //  Splash screen and progress bar textures.
      pack: {
        files: [{
          key: 'background',
          type: 'image'
        }, {
          key: 'progressBar',
          type: 'image'
        }]
      }
    });
  }

  preload() {
    //  Display cover and progress bar textures.
    this.showCover();
    this.showProgressBar();
    
    // Load all assets here
    this.load.image('backgroundWithoutTitles', backgroundWithoutTitles);
    this.load.image('tiles', [tiles, tilesN]);
    this.load.tilemapTiledJSON('map1', map1);
    this.load.tilemapTiledJSON('map2', map2);
    this.load.tilemapTiledJSON('map3', map3);
    this.load.tilemapTiledJSON('map4', map4);
    this.load.tilemapTiledJSON('map5', map5);
    this.load.tilemapTiledJSON('map6', map6);
    this.load.tilemapTiledJSON('map7', map7);
    this.load.tilemapTiledJSON('map8', map8);
    this.load.tilemapTiledJSON('map9', map9);
    this.load.tilemapTiledJSON('map10', map10);
    this.load.tilemapTiledJSON('map11', map11);
    this.load.tilemapTiledJSON('map12', map12);
    this.load.tilemapTiledJSON('map13', map13);
    this.load.tilemapTiledJSON('map14', map14);
    this.load.tilemapTiledJSON('map15', map15);
    this.load.tilemapTiledJSON('map16', map16);
    this.load.tilemapTiledJSON('map17', map17);
    this.load.tilemapTiledJSON('map18', map18);
    this.load.tilemapTiledJSON('map19', map19);
    //this.load.tilemapTiledJSON('map20', map20);
    
    // player animation
    this.load.atlas('player', [spritesheetPlayer, spritesheetPlayerN], spritesheetPlayerJSON);

    // player bullets
    this.load.spritesheet('knife', knife, { frameWidth: 8, frameHeight: 8 });
    this.load.spritesheet('sword', sword, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('axe', axe, { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('fireBall', fireBall, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('savestation', savestation, { frameWidth: 16, frameHeight: 32 });
    this.load.spritesheet('heart', heart, { frameWidth: 12, frameHeight: 12 });

    // Enemies
    this.load.atlas('enemies', [spritesheetEnemies, spritesheetEnemiesN], spritesheetEnemiesJSON);
    this.load.atlas('dragon', [dragonAtlas, dragonAtlasN], dragonAtlasJSON);
    this.load.atlas('hellBeast', [hellBeastAtlas, hellBeastAtlasN], hellBeastAtlasJSON);
    this.load.atlas('finalBoss', [finalBossAtlas, finalBossAtlasN], finalBossAtlasJSON);
    this.load.atlas('storm', stormAtlas, stormAtlasJSON);
    this.load.atlas('angel', [angelAtlas, angelAtlasN], angelAtlasJSON);

    // various map items
    this.load.image('head', head);
    this.load.image('blackPixel', blackPixel);
    this.load.image('whitePixel', whitePixel);
    this.load.image('movingPlatform', movingPlatform);
    this.load.image('platformSpike', platformSpike);
    this.load.image('darkClouds', darkClouds);

    //dashboard
    //this.load.image('blackpixel', blackPixel);
    this.load.image('knifeIcon', knifeIcon);
    this.load.image('swordIcon', swordIcon);
    this.load.image('axeIcon', axeIcon);
    this.load.image('lavaStormIcon', lavaStormIcon);
    this.load.image('waterStormIcon', waterStormIcon);
    this.load.image('thunderStormIcon', thunderStormIcon);
    this.load.image('iconFullscreen', iconFullscreen);
    this.load.image('energyBar', energyBar);
    //this.load.spritesheet('heart', heart, { frameWidth: 12, frameHeight: 12 });
    

    // parralax
    this.load.image('map1back', [map1back, map1backN]);
    this.load.image('map1middle', [map1middle, map1middleN]);
    this.load.image('map2back', [map2back, map2backN]);
    this.load.image('map3back', [map3backTest, map3backTestN]);
    this.load.image('map3middle', map3middle);
    this.load.image('map3middle2', map3middle2);
    this.load.image('map4back', [map4back, map4backN]);
    this.load.image('map5back', [map5back, map5backN]);
    this.load.image('map6back', [map6back, map6backN]);
    this.load.image('map7back', [map7back, map7backN]);
    this.load.image('map8back', [map8back, map8backN]);
    this.load.image('map9back', [map9back, map9backN]);
    this.load.image('map10back', [map10back, map10backN]);
    this.load.image('map11back', [map11back, map11backN]);
    this.load.image('map11middle2', map11middle2);
    this.load.image('map12back', [map12back, map12backN]);
    this.load.image('map13back', [map13back, map13backN]);
    this.load.image('map14back', [map14back, map14backN]);
    this.load.image('map15back', [map15back, map15backN]);
    this.load.image('map16back', [map16back, map16backN]);
    this.load.image('map17back', [map17back, map17backN]);
    this.load.image('map18back', [map18back, map18backN]);
    this.load.image('map19back', [map19back, map19backN]);
    

    // sounds
    this.load.audio('bullet', bulletFX);
    this.load.audio('swell', swellFX);
    this.load.audio('missile', missileFX);
    this.load.audio('waterStormSfx', waterStormSfx);
    this.load.audio('lavaStormSfx', lavaStormSfx);
    this.load.audio('thunderStormSfx', thunderStormSfx);
    this.load.audio('thunderGateSfx', thunderGateSfx);
    this.load.audio('forestWalkSfx', forestWalkSfx);
    this.load.audio('townWalkSfx', townWalkSfx);
    this.load.audio('graveyardWalkSfx', graveyardWalkSfx);
    this.load.audio('castleWalkSfx', castleWalkSfx);
    this.load.audio('churchWalkSfx', churchWalkSfx);
    this.load.audio('knifeIcon', knifeIconSfx);
    this.load.audio('swordIcon', swordIconSfx);
    this.load.audio('axeIcon', axeIconSfx);
    this.load.audio('waterStormIcon', waterIconSfx);
    this.load.audio('lavaStormIcon', lavaIconSfx);
    this.load.audio('thunderStormIcon', thunderIconSfx);
    this.load.audio('laser', laserFX);
    this.load.audio('impact', impactFX);
    this.load.audio('explo2', explo2FX);
    this.load.audio('explo3', explo3FX);
    this.load.audio('enemyHit', enemyImpactFX);
    this.load.audio('playerHit', playerHitFX);
    this.load.audio('powerUp', powerUpFX);
    this.load.audio('select', selectFX);
    this.load.audio('jumpBooster', jumpBoosterFX);
    this.load.audio('getLife', getLifeFX);
    this.load.audio('run', runFX);
    this.load.audio('morph', morphFX);
    this.load.audio('melo', melo);
    this.load.audio('playerDead', playerDead);
    this.load.audio('shake', shake);
    this.load.audio('shake2', shake2);
    this.load.audio('guepe', guepeFX);
    this.load.audio('jumpers', grog);
    this.load.audio('door', doorFX);
    this.load.audio('doorLocked', morphFX);
    this.load.audio('bip2', bip2);
    this.load.audio('bip1', bip1);
    this.load.audio('bip3', bip3);
    this.load.audio('bip', bip);

    // sounds boss1


    // music
    this.load.audio('ambient1', ambient1);
    this.load.audio('ambient2', ambient2);
    this.load.audio('ambient3', ambient3);
  }

  create() {
    //  Create all anims here
    this.anims.create({
      key: 'stand',
      frames: [
        { key: 'player', frame: 'adventurer-idle-00' },
        { key: 'player', frame: 'adventurer-idle-01' },
        { key: 'player', frame: 'adventurer-idle-02' },
        { key: 'player', frame: 'adventurer-idle-03' },
      ],
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: 'playerWalk',
      frames: [
        { key: 'player', frame: 'adventurer-run-00' },
        { key: 'player', frame: 'adventurer-run-01' },
        { key: 'player', frame: 'adventurer-run-02' },
        { key: 'player', frame: 'adventurer-run-03' },
        { key: 'player', frame: 'adventurer-run-04' },
        { key: 'player', frame: 'adventurer-run-05' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'playerRun',
      frames: [
        { key: 'player', frame: 'adventurer-run-00' },
        { key: 'player', frame: 'adventurer-run-01' },
        { key: 'player', frame: 'adventurer-run-02' },
        { key: 'player', frame: 'adventurer-run-03' },
        { key: 'player', frame: 'adventurer-run-04' },
        { key: 'player', frame: 'adventurer-run-05' },
      ],
      frameRate: 18,
      repeat: -1,
    });
    this.anims.create({
      key: 'runJump',
      frames: [
        { key: 'player', frame: 'adventurer-smrslt-00' },
        { key: 'player', frame: 'adventurer-smrslt-01' },
        { key: 'player', frame: 'adventurer-smrslt-02' },
        { key: 'player', frame: 'adventurer-smrslt-03' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'jump',
      frames: [
        { key: 'player', frame: 'adventurer-jump-00' },
        { key: 'player', frame: 'adventurer-jump-01' },
        { key: 'player', frame: 'adventurer-jump-02' },
        { key: 'player', frame: 'adventurer-jump-02' },
        { key: 'player', frame: 'adventurer-jump-02' },
        { key: 'player', frame: 'adventurer-jump-03' },
        { key: 'player', frame: 'adventurer-jump-03' },
        { key: 'player', frame: 'adventurer-jump-03' },
        { key: 'player', frame: 'adventurer-jump-03' },
        { key: 'player', frame: 'adventurer-fall-00' },
        { key: 'player', frame: 'adventurer-fall-01' },
      ],
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'fall',
      frames: [
        { key: 'player', frame: 'adventurer-fall-00' },
        { key: 'player', frame: 'adventurer-fall-01' },
      ],
      frameRate: 5,
      repeat: 0,
    });
    this.anims.create({
      key: 'attack',
      frames: [
        { key: 'player', frame: 'adventurer-items-02' },
        { key: 'player', frame: 'adventurer-items-01' },
        { key: 'player', frame: 'adventurer-items-01' },
        { key: 'player', frame: 'adventurer-items-01' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'duck',
      frames: [
        { key: 'player', frame: 'adventurer-crouch-00' },
        { key: 'player', frame: 'adventurer-crouch-01' },
        { key: 'player', frame: 'adventurer-crouch-02' },
        { key: 'player', frame: 'adventurer-crouch-03' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'die',
      frames: [
        { key: 'player', frame: 'adventurer-crouch-03' },
        { key: 'player', frame: 'adventurer-sleep0' },
      ],
      frameRate: 10,
      repeat: 0,
    });
    //adventurer-cast-01
    this.anims.create({
      key: 'playerSpell',
      frames: [
        { key: 'player', frame: 'adventurer-cast-01' },
      ],
      frameRate: 1,
      repeat: -1,
    });
    
    
    // ////////////////////////////////////////////////////
    // weapons
    this.anims.create({
      key: 'knife',
      frames: this.anims.generateFrameNumbers('knife', { start: 0, end: 3, first: 0 }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: 'sword',
      frames: this.anims.generateFrameNumbers('sword', { start: 0, end: 3, first: 0 }),
      frameRate: 26,
      repeat: 0,
    });
    this.anims.create({
      key: 'axe',
      frames: this.anims.generateFrameNumbers('axe', { start: 0, end: 3, first: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    // dragon
    this.anims.create({
      key: 'dragon-idle',
      frames: [
        { key: 'dragon', frame: 'dragon-idle0' },
        { key: 'dragon', frame: 'dragon-idle1' },
        { key: 'dragon', frame: 'dragon-idle2' },
        { key: 'dragon', frame: 'dragon-idle3' },
        { key: 'dragon', frame: 'dragon-idle4' },
        { key: 'dragon', frame: 'dragon-idle5' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'dragon-tail',
      frames: [
        { key: 'dragon', frame: 'dragon-tail0' },
        { key: 'dragon', frame: 'dragon-tail1' },
        { key: 'dragon', frame: 'dragon-tail2' },
        { key: 'dragon', frame: 'dragon-tail3' },
        { key: 'dragon', frame: 'dragon-tail4' },
        { key: 'dragon', frame: 'dragon-tail5' },
        { key: 'dragon', frame: 'dragon-tail6' },
        { key: 'dragon', frame: 'dragon-tail7' },
      ],
      frameRate: 10,
      yoyo: true,
      repeat: -1,
    });
    this.anims.create({
      key: 'dragon-breath',
      frames: [
        { key: 'dragon', frame: 'dragon-breath0' },
        { key: 'dragon', frame: 'dragon-breath1' },
        { key: 'dragon', frame: 'dragon-breath2' },
        { key: 'dragon', frame: 'dragon-breath3' },
        { key: 'dragon', frame: 'dragon-breath4' },
        { key: 'dragon', frame: 'dragon-breath5' },
        { key: 'dragon', frame: 'dragon-breath6' },
        { key: 'dragon', frame: 'dragon-breath5' },
        { key: 'dragon', frame: 'dragon-breath6' },
        { key: 'dragon', frame: 'dragon-breath5' },
        { key: 'dragon', frame: 'dragon-breath6' },
      ],
      frameRate: 16,
      repeat: -1,
    });
    // hell beast
    this.anims.create({
      key: 'hell-beast-idle',
      frames: [
        { key: 'hellBeast', frame: 'hell-beast-idle0' },
        { key: 'hellBeast', frame: 'hell-beast-idle1' },
        { key: 'hellBeast', frame: 'hell-beast-idle2' },
        { key: 'hellBeast', frame: 'hell-beast-idle3' },
        { key: 'hellBeast', frame: 'hell-beast-idle4' },
        { key: 'hellBeast', frame: 'hell-beast-idle5' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'hell-beast-idle-stroke',
      frames: [
        { key: 'hellBeast', frame: 'hell-beast-idle-stroke0' },
        { key: 'hellBeast', frame: 'hell-beast-idle-stroke1' },
        { key: 'hellBeast', frame: 'hell-beast-idle-stroke2' },
        { key: 'hellBeast', frame: 'hell-beast-idle-stroke3' },
        { key: 'hellBeast', frame: 'hell-beast-idle-stroke4' },
        { key: 'hellBeast', frame: 'hell-beast-idle-stroke5' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'hell-beast-breath',
      frames: [
        { key: 'hellBeast', frame: 'hell-beast-breath0' },
        { key: 'hellBeast', frame: 'hell-beast-breath1' },
        { key: 'hellBeast', frame: 'hell-beast-breath2' },
        { key: 'hellBeast', frame: 'hell-beast-breath3' },
      ],
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: 'hell-beast-breath-stroke',
      frames: [
        { key: 'hellBeast', frame: 'hell-beast-breath-stroke0' },
        { key: 'hellBeast', frame: 'hell-beast-breath-stroke1' },
        { key: 'hellBeast', frame: 'hell-beast-breath-stroke2' },
        { key: 'hellBeast', frame: 'hell-beast-breath-stroke3' },
      ],
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: 'hell-beast-burn',
      frames: [
        { key: 'hellBeast', frame: 'hell-beast-burn0' },
        { key: 'hellBeast', frame: 'hell-beast-burn1' },
        { key: 'hellBeast', frame: 'hell-beast-burn2' },
        { key: 'hellBeast', frame: 'hell-beast-burn3' },
      ],
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: 'hell-beast-lava',
      frames: [
        { key: 'hellBeast', frame: 'hell-beast-burn4' },
        { key: 'hellBeast', frame: 'hell-beast-burn5' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    // demon
    this.anims.create({
      key: 'demon-idle',
      frames: [
        { key: 'finalBoss', frame: 'demon-idle0' },
        { key: 'finalBoss', frame: 'demon-idle1' },
        { key: 'finalBoss', frame: 'demon-idle2' },
        { key: 'finalBoss', frame: 'demon-idle3' },
        { key: 'finalBoss', frame: 'demon-idle4' },
        { key: 'finalBoss', frame: 'demon-idle5' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'demon-attack',
      frames: [
        { key: 'finalBoss', frame: 'demon-attack0' },
        { key: 'finalBoss', frame: 'demon-attack1' },
        { key: 'finalBoss', frame: 'demon-attack2' },
        { key: 'finalBoss', frame: 'demon-attack3' },
        { key: 'finalBoss', frame: 'demon-attack4' },
        { key: 'finalBoss', frame: 'demon-attack5' },
        { key: 'finalBoss', frame: 'demon-attack6' },
        { key: 'finalBoss', frame: 'demon-attack7' },
      ],
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: 'demon-attack-end',
      frames: [
        { key: 'finalBoss', frame: 'demon-attack7' },
        { key: 'finalBoss', frame: 'demon-attack7' },
        { key: 'finalBoss', frame: 'demon-attack7' },
        { key: 'finalBoss', frame: 'demon-attack7' },
        { key: 'finalBoss', frame: 'demon-attack7' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'breathBlue',
      frames: [
        { key: 'finalBoss', frame: 'breath0' },
        { key: 'finalBoss', frame: 'breath1' },
        { key: 'finalBoss', frame: 'breath2' },
        { key: 'finalBoss', frame: 'breath3' },
        { key: 'finalBoss', frame: 'breath1' },
        { key: 'finalBoss', frame: 'breath2' },
        { key: 'finalBoss', frame: 'breath3' },
        { key: 'finalBoss', frame: 'breath1' },
        { key: 'finalBoss', frame: 'breath2' },
        { key: 'finalBoss', frame: 'breath3' },
        { key: 'finalBoss', frame: 'breath4' },
      ],
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: 'breathFire',
      frames: [
        { key: 'finalBoss', frame: 'breath-fire0' },
        { key: 'finalBoss', frame: 'breath-fire1' },
        { key: 'finalBoss', frame: 'breath-fire2' },
        { key: 'finalBoss', frame: 'breath-fire3' },
        { key: 'finalBoss', frame: 'breath-fire1' },
        { key: 'finalBoss', frame: 'breath-fire2' },
        { key: 'finalBoss', frame: 'breath-fire3' },
        { key: 'finalBoss', frame: 'breath-fire1' },
        { key: 'finalBoss', frame: 'breath-fire2' },
        { key: 'finalBoss', frame: 'breath-fire3' },
        { key: 'finalBoss', frame: 'breath-fire4' },
      ],
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: 'fire-skull',
      frames: [
        { key: 'finalBoss', frame: 'fire-skull0' },
        { key: 'finalBoss', frame: 'fire-skull1' },
        { key: 'finalBoss', frame: 'fire-skull2' },
        { key: 'finalBoss', frame: 'fire-skull3' },
        { key: 'finalBoss', frame: 'fire-skull4' },
        { key: 'finalBoss', frame: 'fire-skull5' },
        { key: 'finalBoss', frame: 'fire-skull6' },
        { key: 'finalBoss', frame: 'fire-skull7' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    // storms
    this.anims.create({
      key: 'thunder-storm',
      frames: [
        { key: 'storm', frame: 'thunder-storm0' },
        { key: 'storm', frame: 'thunder-storm1' },
        { key: 'storm', frame: 'thunder-storm2' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'thunder-magic',
      frames: [
        { key: 'storm', frame: 'thunder-magic0' },
        { key: 'storm', frame: 'thunder-magic1' },
        { key: 'storm', frame: 'thunder-magic2' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'water-storm',
      frames: [
        { key: 'storm', frame: 'water-storm0' },
        { key: 'storm', frame: 'water-storm1' },
        { key: 'storm', frame: 'water-storm2' },
        { key: 'storm', frame: 'water-storm3' },
        { key: 'storm', frame: 'water-storm4' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'lava-storm',
      frames: [
        { key: 'storm', frame: 'lava-storm0' },
        { key: 'storm', frame: 'lava-storm1' },
      ],
      frameRate: 10,
      repeat: -1,
    });
    
    // impacts
    this.anims.create({
      key: 'impact',
      frames: this.anims.generateFrameNumbers('impact', { start: 0, end: 5, first: 0 }),
      frameRate: 20,
      repeat: 0,
    });
    
    this.anims.create({
      key: 'heart',
      frames: this.anims.generateFrameNumbers('heart', { start: 0, end: 3, first: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    // savestation anim
    this.anims.create({
      key: 'savestation',
      frames: this.anims.generateFrameNumbers('savestation', { start: 0, end: 2, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'savestation-idle',
      frames: this.anims.generateFrameNumbers('savestation', { start: 3, end: 3, first: 3 }),
      frameRate: 1,
      yoyo: false,
      repeat: -1,
    });
    // ====================================================================
    // SECTION ENEMIES
    // explode animation
    this.anims.create({
      key: 'enemyExplode',
      frames: [
        //{ key: 'enemies', frame: 'enemy-death-0' },
        { key: 'enemies', frame: 'enemy-death-1' },
        { key: 'enemies', frame: 'enemy-death-2' },
        { key: 'enemies', frame: 'enemy-death-3' },
        { key: 'enemies', frame: 'enemy-death-4' },
        { key: 'enemies', frame: 'enemy-death-5' },
      ],
      frameRate: 10,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'bossExplode',
      frames: this.anims.generateFrameNumbers('enemyExplode', { start: 0, end: 5, first: 0 }),
      frameRate: 15,
      yoyo: false,
      repeat: 10,
    });

    // anims enemies
    this.anims.create({
      key: 'hellHoundRun',
      frames: [
        { key: 'enemies', frame: 'hell-hound-run0' },
        { key: 'enemies', frame: 'hell-hound-run1' },
        { key: 'enemies', frame: 'hell-hound-run2' },
        { key: 'enemies', frame: 'hell-hound-run3' },
        { key: 'enemies', frame: 'hell-hound-run4' },
      ],
      frameRate: 8,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'hellHoundJump',
      frames: [
        { key: 'enemies', frame: 'hell-hound-jump0' },
        { key: 'enemies', frame: 'hell-hound-jump1' },
        { key: 'enemies', frame: 'hell-hound-jump2' },
        { key: 'enemies', frame: 'hell-hound-jump3' },
        { key: 'enemies', frame: 'hell-hound-jump4' },
      ],
      frameRate: 8,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'thing',
      frames: [
        { key: 'enemies', frame: 'thing1' },
        { key: 'enemies', frame: 'thing2' },
        { key: 'enemies', frame: 'thing3' },
        { key: 'enemies', frame: 'thing4' },
      ],
      frameRate: 8,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'skeletonRise',
      frames: [
        { key: 'enemies', frame: 'skeleton-rise-1' },
        { key: 'enemies', frame: 'skeleton-rise-1' },
        { key: 'enemies', frame: 'skeleton-rise-1' },
        { key: 'enemies', frame: 'skeleton-rise-2' },
        { key: 'enemies', frame: 'skeleton-rise-3' },
        { key: 'enemies', frame: 'skeleton-rise-4' },
        { key: 'enemies', frame: 'skeleton-rise-5' },
        { key: 'enemies', frame: 'skeleton-rise-6' },
      ],
      frameRate: 5,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'skeleton',
      frames: [
        { key: 'enemies', frame: 'skeleton-1' },
        { key: 'enemies', frame: 'skeleton-2' },
        { key: 'enemies', frame: 'skeleton-3' },
        { key: 'enemies', frame: 'skeleton-4' },
        { key: 'enemies', frame: 'skeleton-5' },
        { key: 'enemies', frame: 'skeleton-6' },
        { key: 'enemies', frame: 'skeleton-7' },
        { key: 'enemies', frame: 'skeleton-8' },
      ],
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'ghost',
      frames: [
        { key: 'enemies', frame: 'ghost-1' },
        { key: 'enemies', frame: 'ghost-2' },
        { key: 'enemies', frame: 'ghost-3' },
        { key: 'enemies', frame: 'ghost-4' },
      ],
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'wizard-idle',
      frames: [
        { key: 'enemies', frame: 'wizard-idle-1' },
        { key: 'enemies', frame: 'wizard-idle-2' },
        { key: 'enemies', frame: 'wizard-idle-3' },
        { key: 'enemies', frame: 'wizard-idle-4' },
        { key: 'enemies', frame: 'wizard-idle-5' },
      ],
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'wizard-fire',
      frames: [
        { key: 'enemies', frame: 'fire1' },
        { key: 'enemies', frame: 'fire2' },
        { key: 'enemies', frame: 'fire3' },
        { key: 'enemies', frame: 'fire4' },
        { key: 'enemies', frame: 'fire5' },
        { key: 'enemies', frame: 'fire6' },
        { key: 'enemies', frame: 'fire7' },
        { key: 'enemies', frame: 'fire8' },
        { key: 'enemies', frame: 'fire9' },
        { key: 'enemies', frame: 'fire10' },
      ],
      frameRate: 16,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'burning-ghoul',
      frames: [
        { key: 'enemies', frame: 'burning-ghoul1' },
        { key: 'enemies', frame: 'burning-ghoul2' },
        { key: 'enemies', frame: 'burning-ghoul3' },
        { key: 'enemies', frame: 'burning-ghoul4' },
        { key: 'enemies', frame: 'burning-ghoul5' },
        { key: 'enemies', frame: 'burning-ghoul6' },
        { key: 'enemies', frame: 'burning-ghoul7' },
        { key: 'enemies', frame: 'burning-ghoul8' },
      ],
      frameRate: 16,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'woman-idle',
      frames: [
        { key: 'enemies', frame: 'woman-idle-1' },
        { key: 'enemies', frame: 'woman-idle-2' },
        { key: 'enemies', frame: 'woman-idle-3' },
        { key: 'enemies', frame: 'woman-idle-4' },
        { key: 'enemies', frame: 'woman-idle-5' },
        { key: 'enemies', frame: 'woman-idle-6' },
        { key: 'enemies', frame: 'woman-idle-7' },
      ],
      frameRate: 8,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'bearded-idle',
      frames: [
        { key: 'enemies', frame: 'bearded-idle-1' },
        { key: 'enemies', frame: 'bearded-idle-1' },
        { key: 'enemies', frame: 'bearded-idle-1' },
        { key: 'enemies', frame: 'bearded-idle-1' },
        { key: 'enemies', frame: 'bearded-idle-2' },
        { key: 'enemies', frame: 'bearded-idle-2' },
        { key: 'enemies', frame: 'bearded-idle-2' },
        { key: 'enemies', frame: 'bearded-idle-2' },
        { key: 'enemies', frame: 'bearded-idle-3' },
        { key: 'enemies', frame: 'bearded-idle-4' },
        { key: 'enemies', frame: 'bearded-idle-5' },
        { key: 'enemies', frame: 'bearded-idle-3' },
        { key: 'enemies', frame: 'bearded-idle-4' },
        { key: 'enemies', frame: 'bearded-idle-5' },
        { key: 'enemies', frame: 'bearded-idle-3' },
        { key: 'enemies', frame: 'bearded-idle-4' },
        { key: 'enemies', frame: 'bearded-idle-5' },
        { key: 'enemies', frame: 'bearded-idle-3' },
        { key: 'enemies', frame: 'bearded-idle-4' },
        { key: 'enemies', frame: 'bearded-idle-5' },
        { key: 'enemies', frame: 'bearded-idle-3' },
        { key: 'enemies', frame: 'bearded-idle-4' },
        { key: 'enemies', frame: 'bearded-idle-5' },
        { key: 'enemies', frame: 'bearded-idle-3' },
        { key: 'enemies', frame: 'bearded-idle-4' },
        { key: 'enemies', frame: 'bearded-idle-5' },
      ],
      frameRate: 4,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'hat-man-idle',
      frames: [
        { key: 'enemies', frame: 'hat-man-idle-1' },
        { key: 'enemies', frame: 'hat-man-idle-2' },
        { key: 'enemies', frame: 'hat-man-idle-3' },
        { key: 'enemies', frame: 'hat-man-idle-4' },
      ],
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'oldman-walk',
      frames: [
        { key: 'enemies', frame: 'oldman-walk-1' },
        { key: 'enemies', frame: 'oldman-walk-2' },
        { key: 'enemies', frame: 'oldman-walk-3' },
        { key: 'enemies', frame: 'oldman-walk-4' },
        { key: 'enemies', frame: 'oldman-walk-5' },
        { key: 'enemies', frame: 'oldman-walk-6' },
        { key: 'enemies', frame: 'oldman-walk-7' },
        { key: 'enemies', frame: 'oldman-walk-8' },
        { key: 'enemies', frame: 'oldman-walk-9' },
        { key: 'enemies', frame: 'oldman-walk-10' },
        { key: 'enemies', frame: 'oldman-walk-11' },
        { key: 'enemies', frame: 'oldman-walk-12' },
      ],
      frameRate: 6,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'oldman-idle',
      frames: [
        { key: 'enemies', frame: 'oldman-idle-1' },
        { key: 'enemies', frame: 'oldman-idle-2' },
        { key: 'enemies', frame: 'oldman-idle-3' },
        { key: 'enemies', frame: 'oldman-idle-4' },
        { key: 'enemies', frame: 'oldman-idle-5' },
        { key: 'enemies', frame: 'oldman-idle-6' },
        { key: 'enemies', frame: 'oldman-idle-7' },
        //{ key: 'enemies', frame: 'oldman-idle-8' },
      ],
      frameRate: 8,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'angel-idle',
      frames: [
        { key: 'angel', frame: 'angel1' },
        { key: 'angel', frame: 'angel2' },
        { key: 'angel', frame: 'angel3' },
        { key: 'angel', frame: 'angel4' },
        { key: 'angel', frame: 'angel5' },
        { key: 'angel', frame: 'angel6' },
        { key: 'angel', frame: 'angel7' },
        { key: 'angel', frame: 'angel8' },
      ],
      frameRate: 8,
      yoyo: false,
      repeat: -1,
    });
    
    this.anims.create({
      key: 'fireball',
      frames: this.anims.generateFrameNumbers('fireBall', { start: 0, end: 2, first: 0 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
  }

  showCover() {
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT);
  }

  showProgressBar() {
    //  Get the progress bar filler texture dimensions.
    const {width: w, height: h} = this.textures.get('progressBar').get();

    //  Place the filler over the progress bar of the splash screen.
    const img = this.add.sprite(U.WIDTH / 2, U.HEIGHT / 4 * 3, 'progressBar').setOrigin(0.5, 0);

    // Add percentage text
    const loadingpercentage = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 4 * 3 - 10, 'atomic', 'Loading:', 10, 1)
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setTint(0xDDDDDD);

    //  Crop the filler along its width, proportional to the amount of files loaded.
    this.load.on('progress', (v) => {
      loadingpercentage.text = `Loading: ${Math.round(v * 100)}%`;
      img.setCrop(0, 0, Math.ceil(v * w), h);
    }).on('complete', (v) => {
      this.scene.start('intro');
    });
  }
}