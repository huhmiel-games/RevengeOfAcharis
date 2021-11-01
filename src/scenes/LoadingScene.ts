import { Scene } from 'phaser';
import { WIDTH, HEIGHT, SCENES_NAMES } from '../constant/config';

// Acharis sfx
// walk
import forestWalkSfx from '../assets/sfx/Acharis/forest_walk.ogg';
import townWalkSfx from '../assets/sfx/Acharis/town_walk.ogg';
import graveyardWalkSfx from '../assets/sfx/Acharis/graveyard_walk.ogg';
import castleWalkSfx from '../assets/sfx/Acharis/castle_walk.ogg';
import churchWalkSfx from '../assets/sfx/Acharis/church_walk.ogg';

// jump
import jumpCastleSfx from '../assets/sfx/Acharis/jumping_castle.ogg';
import jumpChurchSfx from '../assets/sfx/Acharis/jumping_church.ogg';
import jumpTownSfx from '../assets/sfx/Acharis/jumping_town.ogg';
import jumpForestSfx from '../assets/sfx/Acharis/jumping_forest.ogg';
import jumpGraveyardSfx from '../assets/sfx/Acharis/jumping_graveyard.ogg';

// falling
import fallingCastleSfx from '../assets/sfx/Acharis/falling_castle.ogg';
import fallingChurchSfx from '../assets/sfx/Acharis/falling_church.ogg';
import fallingForestSfx from '../assets/sfx/Acharis/falling_forest.ogg';
import fallingGraveyardSfx from '../assets/sfx/Acharis/falling_graveyard.ogg';
import fallingTownSfx from '../assets/sfx/Acharis/falling_town.ogg';

// hit
import hitCastleSfx from '../assets/sfx/Acharis/hit_castle.ogg';
import hitChurchSfx from '../assets/sfx/Acharis/hit_church.ogg';
import hitForestSfx from '../assets/sfx/Acharis/hit_forest.ogg';
import hitGraveyardSfx from '../assets/sfx/Acharis/hit_graveyard.ogg';
import hitTownSfx from '../assets/sfx/Acharis/hit_town.ogg';

// weapons
import bulletFX from '../assets/sfx/knife_fire.ogg'; // knife sfx
import swellFX from '../assets/sfx/sword_fire.ogg'; // sword sfx
import missileFX from '../assets/sfx/axe_fire.ogg'; // axe sfx

// magic
import waterStormSfx from '../assets/sfx/water_magic.ogg';
import lavaStormSfx from '../assets/sfx/lava_magic.ogg';
import thunderStormSfx from '../assets/sfx/thunder_magic.ogg';

// sfx for weapon select
import knifeIconSfx from '../assets/sfx/knife_icon.ogg';
import swordIconSfx from '../assets/sfx/sword_icon.ogg';
import axeIconSfx from '../assets/sfx/axe_icon.ogg';
import waterIconSfx from '../assets/sfx/water_icon.ogg';
import lavaIconSfx from '../assets/sfx/lava_icon.ogg';
import thunderIconSfx from '../assets/sfx/thunder_icon.ogg';

// HUD sfx
import playerDead from '../assets/sfx/Acharis/Death_melody.ogg';
import melo from '../assets/sfx/Acharis/SavePoint.ogg';
import powerUpFX from '../assets/sfx/Acharis/Acharis_upgrade.ogg';
import lowLifeSfx from '../assets/sfx/Acharis/Acharis_life_low.ogg';
import getLifeFX from '../assets/sfx/Acharis/Acharis_heart_get.ogg';

// skeleton sfx
import skeletonRising from '../assets/sfx/Skeleton/Skeleton_Rising.ogg';
import skeletonHit from '../assets/sfx/Skeleton/Skeleton_hit.ogg';
import skeletonDeath from '../assets/sfx/Skeleton/Skeleton_death.ogg';
import skeletonStep from '../assets/sfx/Skeleton/Skeleton_step.ogg';

// wizard sfx
import wizardAppear from '../assets/sfx/Cynical/Cynical_appear.ogg';
import wizardDisappear from '../assets/sfx/Cynical/Cynical_disaappear.ogg';
import wizardFire from '../assets/sfx/Cynical/fire_enemy.ogg';
import wizardFireLaugh from '../assets/sfx/Cynical/cynical_fire_laugh.ogg';
import wizardDeathLaugh from '../assets/sfx/Cynical/cynical_death_laugh.ogg';
import wizardHit from '../assets/sfx/Cynical/cynical_hit.ogg';

// hellhound sfx
import hellhoundDeath from '../assets/sfx/Hound_dog/hound_dog_death.ogg';
import hellhoundAttack from '../assets/sfx/Hound_dog/hound_dog_attack.ogg';
import hellhoundStep from '../assets/sfx/Hound_dog/hound_dog_walk.ogg';
import hellhoundHit from '../assets/sfx/Hound_dog/hound_dog_hit.ogg';

// thing sfx
import thingDeath from '../assets/sfx/Swamp_monster/Swamp_monster_death.ogg';
import thingStep from '../assets/sfx/Swamp_monster/Swamp_monster_step.ogg';
import thingHit from '../assets/sfx/Swamp_monster/Swamp_monster_hit.ogg';

// ghost
import ghostDeath from '../assets/sfx/flying_ghoul/Flying_ghoul_death.ogg';
import ghostFly from '../assets/sfx/flying_ghoul/Flying_ghoul_fly.ogg';
import ghostHit from '../assets/sfx/flying_ghoul/Flying_ghoul_hit.ogg';

// burning ghoul
import ghoulDeath from '../assets/sfx/Pumpikin/Pumpikim_death.ogg';
import ghoulHit from '../assets/sfx/Pumpikin/Pumpikim_hit.ogg';
import ghoulStep from '../assets/sfx/Pumpikin/Pumpikim_step.ogg';

// town npc
import ladySfx from '../assets/sfx/Town/lady.ogg';
import hatmanSfx from '../assets/sfx/Town/Desperate_man.ogg';
import beardedSfx from '../assets/sfx/Town/Grumpy_man.ogg';
import oldmanDoubtSfx from '../assets/sfx/Town/old_man_doubt.ogg';
import oldmanHeySfx from '../assets/sfx/Town/old_man_hey.ogg';
import oldmanSadSfx from '../assets/sfx/Town/old_man_sad.ogg';

// dragon
import dragonDeathSfx from '../assets/sfx/Dragon_mix/dragon_death.ogg';
import dragonBreathSfx from '../assets/sfx/Dragon_mix/dragon_fire_attack.ogg';
import dragonHitSfx from '../assets/sfx/Dragon_mix/dragon_hit.ogg';
import dragonTailSfx from '../assets/sfx/Dragon_mix/dragon_tail_attack.ogg';
import dragonWalkSfx from '../assets/sfx/Dragon_mix/dragon_walk.ogg';

// hellBeast
import hellBeastDeathSfx from '../assets/sfx/HellBeast_ogg/Hell_beast_death.ogg';
import hellBeastFireballSfx from '../assets/sfx/HellBeast_ogg/Hell_beast_fireball.ogg';
import hellBeastHitSfx from '../assets/sfx/HellBeast_ogg/Hell_beast_hit.ogg';
import hellBeastLavaAttackSfx from '../assets/sfx/HellBeast_ogg/Hell_beast_Lava_Attack.ogg';
import hellBeastFirstLaughSfx from '../assets/sfx/HellBeast_ogg/Hell_beast_first_laugh.ogg';
import hellBeastAppearLaughSfx from '../assets/sfx/HellBeast_ogg/Hell_beast_appear_laugh.ogg';
import hellBeastDisappearLaughSfx from '../assets/sfx/HellBeast_ogg/Hell_beast_disappear_laugh.ogg';
import hellBeastGlowingSfx from '../assets/sfx/HellBeast_ogg/Hell_beast_glowing.ogg';

// demon
import demonDeathSfx from '../assets/sfx/Demon_ogg/demon_death.ogg';
import demonHitSfx from '../assets/sfx/Demon_ogg/demon_hit.ogg';
import demonDyingFireSfx from '../assets/sfx/Demon_ogg/demon_dying_fire.ogg';
import demonFlySfx from '../assets/sfx/Demon_ogg/demon_fly.ogg';
import demonBreathSfx from '../assets/sfx/Demon_ogg/demon_orange_fire.ogg';
import demonBreathBlueSfx from '../assets/sfx/Demon_ogg/demon_blue_fire.ogg';
import demonScreamSfx from '../assets/sfx/Demon_ogg/demon_first_scream.ogg';
import demonlightingLaughSfx from '../assets/sfx/Demon_ogg/demon_lightining_laugh.ogg';
import demonSkullSummonSfx from '../assets/sfx/Demon_ogg/demon_skull_summon.ogg';
import demonSkullAttackSfx from '../assets/sfx/Demon_ogg/demon_skull_attack.ogg';
import demonSkullHitSfx from '../assets/sfx/Demon_ogg/demon_skull_hit.ogg';


// Various sfx
import brokenGlass from '../assets/sfx/broken_glass.ogg';
import spikeBlock from '../assets/sfx/spike_block.ogg';
import angelWing from '../assets/sfx/angel_wing.ogg';
import thunderGateSfx from '../assets/sfx/thunder_gate.ogg';
import impactFX from '../assets/sounds/explo.ogg'; // used when camera shake
import explo2FX from '../assets/sounds/explo2.ogg'; // no use for now
import selectFX from '../assets/sounds/select.ogg'; // menu navigation i guess
import explo3FX from '../assets/sounds/explo3.ogg'; // no use for now
import shake from '../assets/sounds/shake3.ogg'; // when i shake the camera like earthquake
import shake2 from '../assets/sounds/shake4.ogg'; // when i shake the camera like earthquake
import bip1 from '../assets/sounds/walk.ogg'; // used mainly on menu
import bip3 from '../assets/sounds/noname.ogg'; // used mainly on menu

// MUSIC LOAD
// musics are launched by the maps and i don't changed them yet
// so make a new line import with your song if you want, i'll add them to the map asap
import hauntedForest from '../assets/music/Haunted_forest_theme.ogg';
import angelCalling from '../assets/music/Angel_calling.ogg';

import townTheme from '../assets/music/Town_theme.ogg';
import townAttackTheme from '../assets/music/Town_attack_theme.ogg';

import graveyardTheme from '../assets/music/Graveyard_theme.ogg';

import dragonFight from '../assets/music/Dragon_Fight.ogg';
import castleTheme from '../assets/music/Castle_theme.ogg';

import churchTheme from '../assets/music/Church_theme.ogg';
import hellBeastFight from '../assets/music/HellBeast_fight.ogg';
import demonFight1 from '../assets/music/Demon_fight_part_1.ogg';
import demonFight2 from '../assets/music/Demon_fight_part_2.ogg';
import demonLighting from '../assets/music/Demon_lighting.ogg';
import escapeTheme from '../assets/music/Escape_theme.ogg';

import revengeTheme from '../assets/music/Revenge_theme.ogg';
import EndingTheme from '../assets/music/Ending_theme.ogg';
import titleMenu from '../assets/music/Title_theme.ogg';


// GRAPHICS LOAD
import background from '../assets/menuBackgound5.png';
import backgroundWithoutTitles from '../assets/backWithoutTitles.png';

// Player
import adventurerAtlas from '../assets/atlas/adventurerAtlas.png';
import adventurerAtlasJSON from '../assets/atlas/adventurerAtlas.json';

// Enemies
import spritesheetEnemies from '../assets/atlas/enemies_atlas.png';
import spritesheetEnemiesJSON from '../assets/atlas/enemies_atlas.json';

// Boss
import dragonAtlas from '../assets/atlas/dragon_atlas.png';
import dragonAtlasJSON from '../assets/atlas/dragon_atlas.json';
import hellBeastAtlas from '../assets/atlas/hellBeast_atlas.png';
import hellBeastAtlasJSON from '../assets/atlas/hellBeast_atlas.json';
import finalBossAtlas from '../assets/atlas/finalBoss_atlas.png';
import finalBossAtlasJSON from '../assets/atlas/finalBoss_atlas.json';

// Angel
import angelAtlas from '../assets/atlas/angel_atlas.png';
import angelAtlasJSON from '../assets/atlas/angel_atlas.json';

// Magic
import stormAtlas from '../assets/atlas/storm_atlas.png';
import stormAtlasJSON from '../assets/atlas/storm_atlas.json';
import darkClouds from '../assets/darkClouds.png';

// Map
import tiles from '../assets/environment/layers/tilesets.png';
import tilesetSwamp from '../assets/environment/layers/tileset-swamp.png';
import colliderTiles from '../assets/environment/layers/colliderTileset.png';
import tilesetTown from '../assets/environment/layers/tileset-town.png';
import tilesetChurch from '../assets/environment/layers/tileset-church.png';
import castleA from '../assets/environment/layers/castle-a.png';
import castleBack from '../assets/environment/layers/castle-back.png';
import castleBack2 from '../assets/environment/layers/castle-back2.png';
import cave from '../assets/environment/layers/cave.png';
import cave2 from '../assets/environment/layers/cave2.png';
import caveBack from '../assets/environment/layers/cave-back.png';
import woodTileset from '../assets/environment/layers/wood-tileset.png';

import map0 from '../maps/map0.json';
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
import map20 from '../maps/map20.json';
import map21 from '../maps/map21.json';

// Various
import knife from '../assets/knife.png';
import sword from '../assets/sword2.png';
import axe from '../assets/axe.png';
import heart from '../assets/heart.png';
import fireBall from '../assets/fire-ball.png';
import savestation from '../assets/savestation.png';
import blackPixel from '../assets/blackPixel.png';
import head from '../assets/head.png';
import movingPlatform from '../assets/platform.png';
import platformSpike from '../assets/platformSpike.png';
import jumpBoots from '../assets/jumpBoots.png';
import churchParticles from '../assets/churchParticles.png';
import castleParticles from '../assets/castleParticles.png';

// dashboard
// import blackPixel from '../assets/blackPixel.png';
import knifeIcon from '../assets/knifeIcon.png';
import swordIcon from '../assets/swordIcon.png';
import axeIcon from '../assets/axeIcon.png';
import lavaStormIcon from '../assets/lavaStormIcon.png';
import waterStormIcon from '../assets/waterStormIcon.png';
import thunderStormIcon from '../assets/thunderStormIcon.png';
import iconFullscreen from '../assets/iconFullscreen.png';
import framing from '../assets/props/framing.png';
import framing32 from '../assets/props/framing32x32.png';
import stuff from '../assets/props/stuff.png';
import energyBar from '../assets/energyBar.png';
import inventoryGrid from '../assets/props/inventoryGrid.png';
import parchment from '../assets/parchment.png';
import arrow from '../assets/props/arrow.png';


// import backgrounds
import backgroundSwamp from '../assets/environment/backgrounds/background-swamp.png';
import midlayerswamp01 from '../assets/environment/backgrounds/mid-layer-swamp-01.png';
import midlayerswamp02 from '../assets/environment/backgrounds/mid-layer-swamp-02.png';
import backgroundTown from '../assets/environment/backgrounds/background-town.png';
import middlegroundTown from '../assets/environment/backgrounds/middleground-town.png';
import backgroundBackyard from '../assets/environment/backgrounds/background-backyard.png';
import mountainsBackyard from '../assets/environment/backgrounds/mountains-backyard.png';
import graveyard from '../assets/environment/backgrounds/graveyard.png';
import oldDarkCastleBack from '../assets/environment/backgrounds/old-dark-castle-interior-background.png';
import back from '../assets/environment/backgrounds/back.png';
import town from '../assets/environment/backgrounds/town.png';
import mountain from '../assets/environment/backgrounds/mountains.png';

// objects images
import houseA from '../assets/environment/objects/house-a.png';
import houseB from '../assets/environment/objects/house-b.png';
import houseC from '../assets/environment/objects/house-c.png';
import cloud1 from '../assets/environment/backgrounds/clouds/cloud1.png';
import cloud2 from '../assets/environment/backgrounds/clouds/cloud2.png';
import cloud3 from '../assets/environment/backgrounds/clouds/cloud3.png';
import cloud4 from '../assets/environment/backgrounds/clouds/cloud4.png';

// tilesets
import tilesetGraveyard from '../assets/environment/layers/tileset-graveyard.png';
import olddarkCastleTileset from '../assets/environment/layers/old-dark-castle-interior-tileset.png';
import gothicCastleBackTiles from '../assets/environment/layers/gothic-castle-background-tileset.png';
import gothicCastleTileset from '../assets/environment/layers/gothic-castle-tileset.png';
import castleAssets from '../assets/environment/layers/Castle-Assets.png';
import decorative from '../assets/environment/layers/decorative.png';
import animated from '../assets/environment/layers/animated.png';


import mapWorld from '../maps/world.world';
import world from '../maps/world.json';
import { COLORS } from '../constant/colors';

import vikingJSON from '../enemies/hitbox_data/viking.json';

// IMPORT SECTION //
import skeletonSwordAtlasJSON from '../assets/atlas/skeletonSwordAtlas.json';
import skeletonSwordAtlas from '../assets/atlas/skeletonSwordAtlas.png';
import impRedAtlasJSON from '../assets/atlas/imp-red-atlas.json';
import impRedAtlas from '../assets/atlas/imp-red-atlas.png';
import impAxeRedAtlasJSON from '../assets/atlas/imp-axe-red-atlas.json';
import impAxeRedAtlas from '../assets/atlas/imp-axe-red-atlas.png';
import evilWizard2AtlasJSON from '../assets/atlas/evil-wizard2-atlas.json';
import evilWizard2Atlas from '../assets/atlas/evil-wizard2-atlas.png';
import bringerOfDeathAtlasJSON from '../assets/atlas/bringerOfDeathAtlas.json';
import bringerOfDeathAtlas from '../assets/atlas/bringerOfDeathAtlas.png';
import enemies2AtlasJSON from '../assets/atlas/enemies3Atlas.json';
import enemies2Atlas from '../assets/atlas/enemies3Atlas.png';



export default class LoadingScreen extends Scene
{
    constructor ()
    {
        super({
            key: 'loadingScene',

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

    public preload ()
    {
        //  Display cover and progress bar textures.
        this.showCover();
        this.showProgressBar();

        this.load.json('vikingJSON', vikingJSON);

        // Load all assets here
        this.load.image('backgroundWithoutTitles', backgroundWithoutTitles);
        this.load.image('tileground', tiles);
        this.load.image('colliderTileset', colliderTiles);
        this.load.image('tilesetSwamp', tilesetSwamp);
        this.load.image('tileset-graveyard', tilesetGraveyard);
        this.load.image('tileset-town', tilesetTown);
        this.load.image('tileset-church', tilesetChurch);
        this.load.image('old-dark-castle-interior-tileset', olddarkCastleTileset);
        this.load.image('gothic-castle-background-tileset', gothicCastleBackTiles);
        this.load.image('gothic-castle-tileset', gothicCastleTileset);
        this.load.image('Castle-Assets', castleAssets);
        this.load.image('castle-a', castleA);
        this.load.image('decorative', decorative);
        this.load.image('castle-back', castleBack);
        this.load.image('castle-back2', castleBack2);
        this.load.image('animated', animated);
        this.load.image('cave', cave);
        this.load.image('cave2', cave2);
        this.load.image('cave-back', caveBack);
        this.load.image('wood-tileset', woodTileset);

        this.load.image('background-swamp', backgroundSwamp);
        this.load.image('mid-layer-swamp-01', midlayerswamp01);
        this.load.image('mid-layer-swamp-02', midlayerswamp02);
        this.load.image('background-town', backgroundTown);
        this.load.image('middleground-town', middlegroundTown);
        this.load.image('background-backyard', backgroundBackyard);
        this.load.image('mountains-backyard', mountainsBackyard);
        this.load.image('graveyard', graveyard);
        this.load.image('old-dark-castle-interior-background', oldDarkCastleBack);
        this.load.image('back', back);
        this.load.image('town', town);
        this.load.image('mountain', mountain);

        this.load.image('house-a', houseA);
        this.load.image('house-b', houseB);
        this.load.image('house-c', houseC);
        this.load.image('cloud1', cloud1);
        this.load.image('cloud2', cloud2);
        this.load.image('cloud3', cloud3);
        this.load.image('cloud4', cloud4);


        this.load.json('mapWorld', mapWorld);
        this.load.json('world', world);

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
        this.load.tilemapTiledJSON('map20', map20);
        this.load.tilemapTiledJSON('map21', map21);

        // player animation
        this.load.atlas('playerAtlas', adventurerAtlas, adventurerAtlasJSON);

        // player bullets
        this.load.spritesheet('knife', knife, { frameWidth: 8, frameHeight: 8 });
        this.load.spritesheet('sword', sword, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('axe', axe, { frameWidth: 20, frameHeight: 20 });
        this.load.spritesheet('fireBall', fireBall, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('savestation', savestation, { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('heart', heart, { frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet('jumpBoots', jumpBoots, { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('churchParticles', churchParticles, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('castleParticles', castleParticles, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('stuff', stuff, { frameWidth: 32, frameHeight: 32 });

        // Enemies
        this.load.atlas('enemies', spritesheetEnemies, spritesheetEnemiesJSON);
        this.load.atlas('dragon', dragonAtlas, dragonAtlasJSON);
        this.load.atlas('hellBeast', hellBeastAtlas, hellBeastAtlasJSON);
        this.load.atlas('finalBoss', finalBossAtlas, finalBossAtlasJSON);
        this.load.atlas('storm', stormAtlas, stormAtlasJSON);
        this.load.atlas('angel', angelAtlas, angelAtlasJSON);

        // various map items
        this.load.image('head', head);
        this.load.image('blackPixel', blackPixel);
        this.load.image('movingPlatform', movingPlatform);
        this.load.image('platformSpike', platformSpike);
        this.load.image('darkClouds', darkClouds);
        this.load.image('framing32', framing32);
        this.load.image('inventory-grid', inventoryGrid);
        this.load.image('parchment', parchment);
        this.load.image('arrow', arrow);

        // dashboard
        this.load.image('knifeIcon', knifeIcon);
        this.load.image('swordIcon', swordIcon);
        this.load.image('axeIcon', axeIcon);
        this.load.image('lavaStormIcon', lavaStormIcon);
        this.load.image('waterStormIcon', waterStormIcon);
        this.load.image('thunderStormIcon', thunderStormIcon);
        this.load.image('iconFullscreen', iconFullscreen);
        this.load.image('energyBar', energyBar);
        this.load.image('framing', framing);

        // sounds
        // player sfx
        // walk and run
        this.load.audio('lowLifeSfx', lowLifeSfx);
        this.load.audio('forestWalkSfx', forestWalkSfx);
        this.load.audio('townWalkSfx', townWalkSfx);
        this.load.audio('graveyardWalkSfx', graveyardWalkSfx);
        this.load.audio('castleWalkSfx', castleWalkSfx);
        this.load.audio('churchWalkSfx', churchWalkSfx);
        // jump
        this.load.audio('jumpCastleSfx', jumpCastleSfx);
        this.load.audio('jumpChurchSfx', jumpChurchSfx);
        this.load.audio('jumpTownSfx', jumpTownSfx);
        this.load.audio('jumpForestSfx', jumpForestSfx);
        this.load.audio('jumpGraveyardSfx', jumpGraveyardSfx);
        // falling
        this.load.audio('fallingCastleSfx', fallingCastleSfx);
        this.load.audio('fallingChurchSfx', fallingChurchSfx);
        this.load.audio('fallingForestSfx', fallingForestSfx);
        this.load.audio('fallingGraveyardSfx', fallingGraveyardSfx);
        this.load.audio('fallingTownSfx', fallingTownSfx);
        // hit
        this.load.audio('hitCastleSfx', hitCastleSfx);
        this.load.audio('hitChurchSfx', hitChurchSfx);
        this.load.audio('hitForestSfx', hitForestSfx);
        this.load.audio('hitGraveyardSfx', hitGraveyardSfx);
        this.load.audio('hitTownSfx', hitTownSfx);

        // weapons
        this.load.audio('bullet', bulletFX);
        this.load.audio('swell', swellFX);
        this.load.audio('missile', missileFX);

        // magic
        this.load.audio('waterStormSfx', waterStormSfx);
        this.load.audio('lavaStormSfx', lavaStormSfx);
        this.load.audio('thunderStormSfx', thunderStormSfx);
        this.load.audio('thunderGateSfx', thunderGateSfx);

        // hud
        this.load.audio('knifeIcon', knifeIconSfx);
        this.load.audio('swordIcon', swordIconSfx);
        this.load.audio('axeIcon', axeIconSfx);
        this.load.audio('waterStormIcon', waterIconSfx);
        this.load.audio('lavaStormIcon', lavaIconSfx);
        this.load.audio('thunderStormIcon', thunderIconSfx);

        // Enemies sfx
        // skeleton sfx
        this.load.audio('skeletonRising', skeletonRising);
        this.load.audio('skeletonHit', skeletonHit);
        this.load.audio('skeletonDeath', skeletonDeath);
        this.load.audio('skeletonStep', skeletonStep);
        // wizard sfx
        this.load.audio('wizardAppear', wizardAppear);
        this.load.audio('wizardDisappear', wizardDisappear);
        this.load.audio('wizardFire', wizardFire);
        this.load.audio('wizardFireLaugh', wizardFireLaugh);
        this.load.audio('wizardDeath', wizardDeathLaugh);
        this.load.audio('wizardHit', wizardHit);
        // hellhound sfx
        this.load.audio('hellhoundDeath', hellhoundDeath);
        this.load.audio('hellhoundAttack', hellhoundAttack);
        this.load.audio('hellhoundStep', hellhoundStep);
        this.load.audio('hellhoundHit', hellhoundHit);
        // thing sfx
        this.load.audio('thingDeath', thingDeath);
        this.load.audio('thingStep', thingStep);
        this.load.audio('thingHit', thingHit);
        // ghost
        this.load.audio('ghostDeath', ghostDeath);
        this.load.audio('ghostFly', ghostFly);
        this.load.audio('ghostHit', ghostHit);
        // burning ghoul
        this.load.audio('ghoulDeath', ghoulDeath);
        this.load.audio('ghoulHit', ghoulHit);
        this.load.audio('ghoulStep', ghoulStep);

        // town npc
        this.load.audio('womanSfx', ladySfx);
        this.load.audio('hatmanSfx', hatmanSfx);
        this.load.audio('beardedSfx', beardedSfx);
        this.load.audio('oldmanDoubtSfx', oldmanDoubtSfx);
        this.load.audio('oldmanHeySfx', oldmanHeySfx);
        this.load.audio('oldmanSadSfx', oldmanSadSfx);

        // dragon
        this.load.audio('dragonDeathSfx', dragonDeathSfx);
        this.load.audio('dragonBreathSfx', dragonBreathSfx);
        this.load.audio('dragonHitSfx', dragonHitSfx);
        this.load.audio('dragonTailSfx', dragonTailSfx);
        this.load.audio('dragonWalkSfx', dragonWalkSfx);

        // hellBeast
        this.load.audio('hellBeastDeathSfx', hellBeastDeathSfx);
        this.load.audio('hellBeastFireballSfx', hellBeastFireballSfx);
        this.load.audio('hellBeastHitSfx', hellBeastHitSfx);
        this.load.audio('hellBeastLavaAttackSfx', hellBeastLavaAttackSfx);
        this.load.audio('hellBeastFirstLaughSfx', hellBeastFirstLaughSfx);
        this.load.audio('hellBeastAppearLaughSfx', hellBeastAppearLaughSfx);
        this.load.audio('hellBeastDisappearLaughSfx', hellBeastDisappearLaughSfx);
        this.load.audio('hellBeastGlowingSfx', hellBeastGlowingSfx);

        // demon
        this.load.audio('demonDeathSfx', demonDeathSfx);
        this.load.audio('demonHitSfx', demonHitSfx);
        this.load.audio('demonDyingFireSfx', demonDyingFireSfx);
        this.load.audio('demonFlySfx', demonFlySfx);
        this.load.audio('demonBreathSfx', demonBreathSfx);
        this.load.audio('demonBreathBlueSfx', demonBreathBlueSfx);
        this.load.audio('demonScreamSfx', demonScreamSfx);
        this.load.audio('demonlightingLaughSfx', demonlightingLaughSfx);
        this.load.audio('demonSkullSummonSfx', demonSkullSummonSfx);
        this.load.audio('demonSkullAttackSfx', demonSkullAttackSfx);
        this.load.audio('demonSkullHitSfx', demonSkullHitSfx);

        // Various
        this.load.audio('impact', impactFX);
        this.load.audio('brokenGlass', brokenGlass);
        this.load.audio('spikeBlock', spikeBlock);
        this.load.audio('angelWing', angelWing);

        // old sfx
        this.load.audio('explo2', explo2FX);
        this.load.audio('explo3', explo3FX);
        this.load.audio('powerUp', powerUpFX);
        this.load.audio('select', selectFX);
        this.load.audio('getLife', getLifeFX);
        this.load.audio('melo', melo);
        this.load.audio('playerDead', playerDead);
        this.load.audio('shake', shake);
        this.load.audio('shake2', shake2);
        this.load.audio('bip1', bip1);
        this.load.audio('bip3', bip3);

        // music
        this.load.audio('hauntedForest', hauntedForest);
        this.load.audio('angelCalling', angelCalling);
        this.load.audio('townTheme', townTheme);
        this.load.audio('townAttackTheme', townAttackTheme);
        this.load.audio('graveyardTheme', graveyardTheme);
        this.load.audio('dragonFight', dragonFight);
        this.load.audio('castleTheme', castleTheme);
        this.load.audio('churchTheme', churchTheme);
        this.load.audio('hellBeastFight', hellBeastFight);
        this.load.audio('demonFight1', demonFight1);
        this.load.audio('demonFight2', demonFight2);
        this.load.audio('demonLighting', demonLighting);
        this.load.audio('escapeTheme', escapeTheme);
        this.load.audio('revengeTheme', revengeTheme);
        this.load.audio('EndingTheme', EndingTheme);
        this.load.audio('titleMenu', titleMenu);

        // PRELOAD SECTION //
        this.load.atlas('skeletonSwordAtlas', skeletonSwordAtlas, skeletonSwordAtlasJSON);
        this.load.atlas('imp-red-atlas', impRedAtlas, impRedAtlasJSON);
        this.load.atlas('imp-axe-red-atlas', impAxeRedAtlas, impAxeRedAtlasJSON);
        this.load.atlas('evil-wizard2-atlas', evilWizard2Atlas, evilWizard2AtlasJSON);
        this.load.atlas('bringerOfDeathAtlas', bringerOfDeathAtlas, bringerOfDeathAtlasJSON);
        this.load.atlas('enemies2Atlas', enemies2Atlas, enemies2AtlasJSON);

    }

    public create ()
    {
        //  Create all anims here
        this.anims.create({
            key: 'adventurer-stand',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-stand-00' },
                { key: 'playerAtlas', frame: 'adventurer-stand-01' },
                { key: 'playerAtlas', frame: 'adventurer-stand-02' },
            ],
            frameRate: 6,
            repeat: -1,
        });

        this.anims.create({
            key: 'adventurer-idle',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-idle-00' },
                { key: 'playerAtlas', frame: 'adventurer-idle-01' },
                { key: 'playerAtlas', frame: 'adventurer-idle-02' },
                { key: 'playerAtlas', frame: 'adventurer-idle-03' },
            ],
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: 'adventurer-idle-2',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-idle-2-00' },
                { key: 'playerAtlas', frame: 'adventurer-idle-2-01' },
                { key: 'playerAtlas', frame: 'adventurer-idle-2-02' },
                { key: 'playerAtlas', frame: 'adventurer-idle-2-03' },
            ],
            frameRate: 8,
            repeat: 4,
        });

        this.anims.create({
            key: 'adventurer-walk-slow',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-walk-00' },
                { key: 'playerAtlas', frame: 'adventurer-walk-01' },
                { key: 'playerAtlas', frame: 'adventurer-walk-02' },
                { key: 'playerAtlas', frame: 'adventurer-walk-03' },
                { key: 'playerAtlas', frame: 'adventurer-walk-04' },
                { key: 'playerAtlas', frame: 'adventurer-walk-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-walk',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-run-00' },
                { key: 'playerAtlas', frame: 'adventurer-run-01' },
                { key: 'playerAtlas', frame: 'adventurer-run-02' },
                { key: 'playerAtlas', frame: 'adventurer-run-03' },
                { key: 'playerAtlas', frame: 'adventurer-run-04' },
                { key: 'playerAtlas', frame: 'adventurer-run-05' },
            ],
            frameRate: 9,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-crouch',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-crouch-00' },
                { key: 'playerAtlas', frame: 'adventurer-crouch-01' },
                { key: 'playerAtlas', frame: 'adventurer-crouch-02' },
                { key: 'playerAtlas', frame: 'adventurer-crouch-03' },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: 'adventurer-crouch-walk',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-crouch-walk-00' },
                { key: 'playerAtlas', frame: 'adventurer-crouch-walk-01' },
                { key: 'playerAtlas', frame: 'adventurer-crouch-walk-02' },
                { key: 'playerAtlas', frame: 'adventurer-crouch-walk-03' },
                { key: 'playerAtlas', frame: 'adventurer-crouch-walk-04' },
                { key: 'playerAtlas', frame: 'adventurer-crouch-walk-05' },
            ],
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'adventurer-jump-start',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-jump-02' }
            ],
            frameRate: 2,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-jump-momentum',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-jump-03' }
            ],
            frameRate: 4,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-fall',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-fall-00' },
                { key: 'playerAtlas', frame: 'adventurer-fall-01' },
            ],
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: 'adventurer-sword-drw',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-swrd-drw-00' },
                { key: 'playerAtlas', frame: 'adventurer-swrd-drw-01' },
                { key: 'playerAtlas', frame: 'adventurer-swrd-drw-02' },
                { key: 'playerAtlas', frame: 'adventurer-swrd-drw-03' },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: 'adventurer-sword-shte',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-swrd-shte-00' },
                { key: 'playerAtlas', frame: 'adventurer-swrd-shte-01' },
                { key: 'playerAtlas', frame: 'adventurer-swrd-shte-02' },
                { key: 'playerAtlas', frame: 'adventurer-swrd-shte-03' },
            ],
            frameRate: 24,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-attack1',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-attack1-00' },
                { key: 'playerAtlas', frame: 'adventurer-attack1-01' },
                { key: 'playerAtlas', frame: 'adventurer-attack1-02' },
                { key: 'playerAtlas', frame: 'adventurer-attack1-03' },
                { key: 'playerAtlas', frame: 'adventurer-attack1-04' },
            ],
            frameRate: 25,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-attack2',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-attack2-00' },
                { key: 'playerAtlas', frame: 'adventurer-attack2-01' },
                { key: 'playerAtlas', frame: 'adventurer-attack2-02' },
                { key: 'playerAtlas', frame: 'adventurer-attack2-03' },
                { key: 'playerAtlas', frame: 'adventurer-attack2-04' },
                { key: 'playerAtlas', frame: 'adventurer-attack2-05' },
            ],
            frameRate: 30,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-attack3',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-attack3-00' },
                { key: 'playerAtlas', frame: 'adventurer-attack3-01' },
                { key: 'playerAtlas', frame: 'adventurer-attack3-02' },
                { key: 'playerAtlas', frame: 'adventurer-attack3-03' },
                { key: 'playerAtlas', frame: 'adventurer-attack3-04' },
                { key: 'playerAtlas', frame: 'adventurer-attack3-05' },
            ],
            frameRate: 30,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-air-attack1',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-air-attack1-00' },
                { key: 'playerAtlas', frame: 'adventurer-air-attack1-01' },
                { key: 'playerAtlas', frame: 'adventurer-air-attack1-02' },
                { key: 'playerAtlas', frame: 'adventurer-air-attack1-03' },
            ],
            frameRate: 20,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-air-attack2',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-air-attack2-00' },
                { key: 'playerAtlas', frame: 'adventurer-air-attack2-01' },
                { key: 'playerAtlas', frame: 'adventurer-air-attack2-02' },
            ],
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-bow',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-bow-00' },
                { key: 'playerAtlas', frame: 'adventurer-bow-01' },
                { key: 'playerAtlas', frame: 'adventurer-bow-02' },
                { key: 'playerAtlas', frame: 'adventurer-bow-03' },
                { key: 'playerAtlas', frame: 'adventurer-bow-04' },
                { key: 'playerAtlas', frame: 'adventurer-bow-05' }
            ],
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-bow-end',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-bow-06' },
                { key: 'playerAtlas', frame: 'adventurer-bow-07' },
                { key: 'playerAtlas', frame: 'adventurer-bow-08', duration: 200 },
            ],
            frameRate: 24,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-bow-jump',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-bow-jump-00' },
                { key: 'playerAtlas', frame: 'adventurer-bow-jump-01' },
                { key: 'playerAtlas', frame: 'adventurer-bow-jump-02' },
                { key: 'playerAtlas', frame: 'adventurer-bow-jump-03' },
                { key: 'playerAtlas', frame: 'adventurer-bow-jump-04' },
                { key: 'playerAtlas', frame: 'adventurer-bow-jump-05' },
                { key: 'playerAtlas', frame: 'adventurer-bow-jump-06' }
            ],
            frameRate: 7,
            repeat: 0,
        });

        // this.anims.create({
        //     key: 'adventurer-air-attack3',
        //     frames: [
        //         { key: 'playerAtlas', frame: 'adventurer-air-attack2-00' },
        //         { key: 'playerAtlas', frame: 'adventurer-air-attack2-01' },
        //         { key: 'playerAtlas', frame: 'adventurer-air-attack2-02' },
        //     ],
        //     frameRate: 15,
        //     repeat: 0,
        // });


        this.anims.create({
            key: 'adventurer-special-air-attack',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-air-attack3-loop-00' },
                { key: 'playerAtlas', frame: 'adventurer-air-attack3-loop-01' },
                // { key: 'playerAtlas', frame: 'adventurer-air-attack3-rdy-00' },
                // { key: 'playerAtlas', frame: 'adventurer-air-attack3-end-00' },
                // { key: 'playerAtlas', frame: 'adventurer-air-attack3-end-01' },
                // { key: 'playerAtlas', frame: 'adventurer-air-attack3-end-02' },
            ],
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: 'adventurer-special-air-attack-end',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-air-attack3-end-00' },
                { key: 'playerAtlas', frame: 'adventurer-air-attack3-end-01' },
                { key: 'playerAtlas', frame: 'adventurer-air-attack3-end-02' },
            ],
            frameRate: 9,
            repeat: 0,
        });

        // this.anims.create({
        //     key: 'adventurer-air-attack3',
        //     frames: [
        //         {key: 'playerAtlas', frame: 'adventurer-air-attack3-rdy-00'},
        //     ],
        //     frameRate: 2,
        //     repeat: 0,
        // });

        this.anims.create({
            key: 'adventurer-die',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-die-00' },
                { key: 'playerAtlas', frame: 'adventurer-die-01' },
                { key: 'playerAtlas', frame: 'adventurer-die-02' },
                { key: 'playerAtlas', frame: 'adventurer-die-03' },
                { key: 'playerAtlas', frame: 'adventurer-die-04' },
                { key: 'playerAtlas', frame: 'adventurer-die-05' },
                { key: 'playerAtlas', frame: 'adventurer-die-06' },
            ],
            frameRate: 14,
            repeat: 0,
        });

        this.anims.create({
            key: 'adventurer-hurt',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-hurt-00' },
                { key: 'playerAtlas', frame: 'adventurer-hurt-01' },
                { key: 'playerAtlas', frame: 'adventurer-hurt-02' },
            ],
            frameRate: 6,
            repeat: -1,
        });

        this.anims.create({
            key: 'adventurer-knock-down',
            frames: [
                { key: 'playerAtlas', frame: 'adventurer-knock-dwn-00' },
                { key: 'playerAtlas', frame: 'adventurer-knock-dwn-01' },
                { key: 'playerAtlas', frame: 'adventurer-knock-dwn-02' },
                { key: 'playerAtlas', frame: 'adventurer-knock-dwn-03' },
                { key: 'playerAtlas', frame: 'adventurer-knock-dwn-04' },
                { key: 'playerAtlas', frame: 'adventurer-knock-dwn-05' },
                { key: 'playerAtlas', frame: 'adventurer-knock-dwn-06' },
            ],
            frameRate: 4,
            repeat: 0,
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
            frameRate: 4,
            yoyo: false,
            repeat: 0,
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
            frameRate: 4,
            repeat: 0,
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
        this.anims.create({
            key: 'jumpBoots',
            frames: this.anims.generateFrameNumbers('jumpBoots', { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0,
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
                // { key: 'enemies', frame: 'enemy-death-0' },
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
        // flames
        this.anims.create({
            key: 'flames',
            frames: [
                { key: 'enemies', frame: 'enemy-death-2' },
                { key: 'enemies', frame: 'enemy-death-3' },
                { key: 'enemies', frame: 'enemy-death-4' },
            ],
            frameRate: 20,
            yoyo: false,
            repeat: -1,
        });

        // hellhound
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

        // thing
        this.anims.create({
            key: 'thing',
            frames: [
                { key: 'enemies', frame: 'thing1' },
                { key: 'enemies', frame: 'thing2' },
                { key: 'enemies', frame: 'thing3' },
                { key: 'enemies', frame: 'thing4' },
            ],
            frameRate: 4,
            yoyo: false,
            repeat: 0,
        });

        // keleton
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

        // ghost
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

        // wizard
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

        // burning ghoul
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

        // NPC
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
                // { key: 'enemies', frame: 'oldman-idle-8' },
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

        // ANIMS SECTION //

        this.anims.create({
            key: 'skeleton-sword-attack2',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack2_1', duration: 100 },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack2_2', duration: 100 },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack2_3', duration: 100 },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack2_4' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack2_5' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack2_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-dead_far',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_far_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_far_2' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_far_3' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_far_4' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_far_5' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_far_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-dead_near',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_near_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_near_2' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_near_3' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_near_4' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_near_5' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-dead_near_6', duration: 3000 },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-attack1',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack1_1', duration: 100 },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack1_2', duration: 100 },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack1_3', duration: 100 },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack1_4' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack1_5' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-attack1_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-run',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-run_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-run_2' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-run_3' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-run_4' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-run_5' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-run_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'skeleton-sword-jump',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-jump_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-jump_2' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-jump_3' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-jump_4' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-jump_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-walk',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-walk_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-walk_2' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-walk_3' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-walk_4' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-walk_5' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-walk_6' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-ready',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-ready_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-ready_2' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-ready_3' },
            ],
            frameRate: 6,
            repeat: 1,
        });
                
        this.anims.create({
            key: 'skeleton-sword-hurt',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-hit_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-hit_2' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-hit_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-reborn',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-reborn_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-reborn_2' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-reborn_3' },
            ],
            frameRate: 3,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-corpse',
            frames: [
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-corpse_1' },
                { key: 'skeletonSwordAtlas', frame: 'skeleton-sword-corpse_2' },
            ],
            frameRate: 4,
            repeat: -1,
        });
                

        this.anims.create({
            key: 'imp-red-attack2',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-attack2_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack2_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack2_3' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack2_4' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack2_5' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack2_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'imp-red-attack1',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-attack1_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack1_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack1_3' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack1_4' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack1_5' },
                { key: 'imp-red-atlas', frame: 'imp-red-attack1_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'imp-red-stand_up',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-stand_up_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-stand_up_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-stand_up_3' },
                { key: 'imp-red-atlas', frame: 'imp-red-stand_up_4' },
                { key: 'imp-red-atlas', frame: 'imp-red-stand_up_5' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'imp-red-fall_back',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-fall_back_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-fall_back_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-fall_back_3' },
                { key: 'imp-red-atlas', frame: 'imp-red-fall_back_4' },
                { key: 'imp-red-atlas', frame: 'imp-red-fall_back_5' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'imp-red-walk',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-walk_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-walk_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-walk_3' },
                { key: 'imp-red-atlas', frame: 'imp-red-walk_4' },
                { key: 'imp-red-atlas', frame: 'imp-red-walk_5' },
                { key: 'imp-red-atlas', frame: 'imp-red-walk_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'imp-red-jump',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-jump_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-jump_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-jump_3' },
                { key: 'imp-red-atlas', frame: 'imp-red-jump_4' },
                { key: 'imp-red-atlas', frame: 'imp-red-jump_5' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'imp-red-run',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-run_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-run_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-run_3' },
                { key: 'imp-red-atlas', frame: 'imp-red-run_4' },
                { key: 'imp-red-atlas', frame: 'imp-red-run_5' },
                { key: 'imp-red-atlas', frame: 'imp-red-run_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'imp-red-ready',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-ready_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-ready_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-ready_3' },
                { key: 'imp-red-atlas', frame: 'imp-red-ready_4' },
                { key: 'imp-red-atlas', frame: 'imp-red-ready_5' },
                { key: 'imp-red-atlas', frame: 'imp-red-ready_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'imp-red-hit',
            frames: [
                { key: 'imp-red-atlas', frame: 'imp-red-hit_1' },
                { key: 'imp-red-atlas', frame: 'imp-red-hit_2' },
                { key: 'imp-red-atlas', frame: 'imp-red-hit_3' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                

        this.anims.create({
            key: 'demon-axe-red-attack1',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack1_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack1_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack1_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack1_4' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack1_5' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack1_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-attack2',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack2_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack2_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack2_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack2_4' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack2_5' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-attack2_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-stand_up',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-stand_up_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-stand_up_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-stand_up_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-stand_up_4' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-stand_up_5' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-fall_back',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-fall_back_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-fall_back_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-fall_back_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-fall_back_4' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-dead',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-dead_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-dead_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-dead_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-dead_4' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-walk',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-walk_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-walk_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-walk_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-walk_4' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-walk_5' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-walk_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-jump',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-jump_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-jump_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-jump_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-jump_4' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-jump_5' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-run',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-run_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-run_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-run_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-run_4' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-run_5' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-run_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-ready',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-ready_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-ready_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-ready_3' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-ready_4' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-ready_5' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-ready_6' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'demon-axe-red-hit',
            frames: [
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-hit_1' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-hit_2' },
                { key: 'imp-axe-red-atlas', frame: 'demon-axe-red-hit_3' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                

        this.anims.create({
            key: 'evil-wizard2-attack2',
            frames: [
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack2_0' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack2_1' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack2_2' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack2_3' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack2_4' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack2_5' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack2_6' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack2_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'evil-wizard2-attack1',
            frames: [
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack1_0' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack1_1' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack1_2' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack1_3' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack1_4' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack1_5' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack1_6' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-attack1_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'evil-wizard2-death',
            frames: [
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-death_0' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-death_1' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-death_2' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-death_3' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-death_4' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-death_5' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-death_6' },
            ],
            frameRate: 14,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'evil-wizard2-idle',
            frames: [
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-idle_0' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-idle_1' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-idle_2' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-idle_3' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-idle_4' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-idle_5' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-idle_6' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-idle_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'evil-wizard2-fall',
            frames: [
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-fall_0' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-fall_1' },
            ],
            frameRate: 4,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'evil-wizard2-hurt',
            frames: [
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-hurt_0' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-hurt_1' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-hurt_2' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'evil-wizard2-jump',
            frames: [
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-jump_0' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-jump_1' },
            ],
            frameRate: 4,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'evil-wizard2-run',
            frames: [
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-run_0' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-run_1' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-run_2' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-run_3' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-run_4' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-run_5' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-run_6' },
                { key: 'evil-wizard2-atlas', frame: 'evil-wizard2-run_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                

        this.anims.create({
            key: 'Bringer-of-Death_Attack',
            frames: [
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_1' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_2' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_3' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_4' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_5' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_6' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_7' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_8' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_9' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Attack_10' },
            ],
            frameRate: 20,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Cast',
            frames: [
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_1' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_2' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_3' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_4' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_5' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_6' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_7' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_8' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Cast_9' },
            ],
            frameRate: 18,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Death',
            frames: [
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_1' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_2' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_3' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_4' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_5' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_6' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_7' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_8' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_9' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Death_10' },
            ],
            frameRate: 20,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Spell',
            frames: [
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_1' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_2' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_3' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_4' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_5' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_6' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_7' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_8' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_9' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_10' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_11' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_12' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_13' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_14' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_15' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Spell_16' },
            ],
            frameRate: 32,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Walk',
            frames: [
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Walk_1' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Walk_2' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Walk_3' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Walk_4' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Walk_5' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Walk_6' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Walk_7' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Walk_8' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Idle',
            frames: [
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Idle_1' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Idle_2' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Idle_3' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Idle_4' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Idle_5' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Idle_6' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Idle_7' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Idle_8' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Hurt',
            frames: [
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Hurt_1' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Hurt_2' },
                { key: 'bringerOfDeathAtlas', frame: 'Bringer-of-Death_Hurt_3' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                

        this.anims.create({
            key: 'horse-galloping',
            frames: [
                { key: 'enemies2Atlas', frame: 'horse-galloping_0' },
                { key: 'enemies2Atlas', frame: 'horse-galloping_1' },
                { key: 'enemies2Atlas', frame: 'horse-galloping_2' },
                { key: 'enemies2Atlas', frame: 'horse-galloping_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'flying-dragon',
            frames: [
                { key: 'enemies2Atlas', frame: 'flying-dragon_0' },
                { key: 'enemies2Atlas', frame: 'flying-dragon_1' },
                { key: 'enemies2Atlas', frame: 'flying-dragon_2' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-attack2',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-attack2_0' },
                { key: 'enemies2Atlas', frame: 'samurai-attack2_1' },
                { key: 'enemies2Atlas', frame: 'samurai-attack2_2' },
                { key: 'enemies2Atlas', frame: 'samurai-attack2_3' },
                { key: 'enemies2Atlas', frame: 'samurai-attack2_4' },
                { key: 'enemies2Atlas', frame: 'samurai-attack2_5' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-attack1',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-attack1_0' },
                { key: 'enemies2Atlas', frame: 'samurai-attack1_1' },
                { key: 'enemies2Atlas', frame: 'samurai-attack1_2' },
                { key: 'enemies2Atlas', frame: 'samurai-attack1_3' },
                { key: 'enemies2Atlas', frame: 'samurai-attack1_4' },
                { key: 'enemies2Atlas', frame: 'samurai-attack1_5' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'horse-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'horse-idle_0' },
                { key: 'enemies2Atlas', frame: 'horse-idle_1' },
                { key: 'enemies2Atlas', frame: 'horse-idle_2' },
                { key: 'enemies2Atlas', frame: 'horse-idle_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'fire-skull',
            frames: [
                { key: 'enemies2Atlas', frame: 'fire-skull_0' },
                { key: 'enemies2Atlas', frame: 'fire-skull_1' },
                { key: 'enemies2Atlas', frame: 'fire-skull_2' },
                { key: 'enemies2Atlas', frame: 'fire-skull_3' },
                { key: 'enemies2Atlas', frame: 'fire-skull_4' },
                { key: 'enemies2Atlas', frame: 'fire-skull_5' },
                { key: 'enemies2Atlas', frame: 'fire-skull_6' },
                { key: 'enemies2Atlas', frame: 'fire-skull_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'ninja-attack2',
            frames: [
                { key: 'enemies2Atlas', frame: 'ninja-attack2_0' },
                { key: 'enemies2Atlas', frame: 'ninja-attack2_1' },
                { key: 'enemies2Atlas', frame: 'ninja-attack2_2' },
                { key: 'enemies2Atlas', frame: 'ninja-attack2_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'ninja-attack1',
            frames: [
                { key: 'enemies2Atlas', frame: 'ninja-attack1_0' },
                { key: 'enemies2Atlas', frame: 'ninja-attack1_1' },
                { key: 'enemies2Atlas', frame: 'ninja-attack1_2' },
                { key: 'enemies2Atlas', frame: 'ninja-attack1_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight2-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight2-attack_0' },
                { key: 'enemies2Atlas', frame: 'knight2-attack_1' },
                { key: 'enemies2Atlas', frame: 'knight2-attack_2' },
                { key: 'enemies2Atlas', frame: 'knight2-attack_3' },
                { key: 'enemies2Atlas', frame: 'knight2-attack_4' },
                { key: 'enemies2Atlas', frame: 'knight2-attack_5' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight-attack_0' },
                { key: 'enemies2Atlas', frame: 'knight-attack_1' },
                { key: 'enemies2Atlas', frame: 'knight-attack_2' },
                { key: 'enemies2Atlas', frame: 'knight-attack_3' },
                { key: 'enemies2Atlas', frame: 'knight-attack_4' },
                { key: 'enemies2Atlas', frame: 'knight-attack_5' },
                { key: 'enemies2Atlas', frame: 'knight-attack_6' },
                { key: 'enemies2Atlas', frame: 'knight-attack_7' },
                { key: 'enemies2Atlas', frame: 'knight-attack_8' },
                { key: 'enemies2Atlas', frame: 'knight-attack_9' },
                { key: 'enemies2Atlas', frame: 'knight-attack_10' },
                { key: 'enemies2Atlas', frame: 'knight-attack_11' },
                { key: 'enemies2Atlas', frame: 'knight-attack_12' },
                { key: 'enemies2Atlas', frame: 'knight-attack_13' },
                { key: 'enemies2Atlas', frame: 'knight-attack_14' },
                { key: 'enemies2Atlas', frame: 'knight-attack_15' },
                { key: 'enemies2Atlas', frame: 'knight-attack_16' },
                { key: 'enemies2Atlas', frame: 'knight-attack_17' },
                { key: 'enemies2Atlas', frame: 'knight-attack_18' },
                { key: 'enemies2Atlas', frame: 'knight-attack_19' },
            ],
            frameRate: 40,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'shadow-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'shadow-attack_0' },
                { key: 'enemies2Atlas', frame: 'shadow-attack_1' },
                { key: 'enemies2Atlas', frame: 'shadow-attack_2' },
                { key: 'enemies2Atlas', frame: 'shadow-attack_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'shadow-rise',
            frames: [
                { key: 'enemies2Atlas', frame: 'shadow-rise_0' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_1' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_2' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_3' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_4' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_5' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_6' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_7' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_8' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_9' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_10' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_11' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_12' },
                { key: 'enemies2Atlas', frame: 'shadow-rise_13' },
            ],
            frameRate: 28,
            repeat: -1,
        });
                
        // this.anims.create({
        //     key: 'tile',
        //     frames: [
        //         { key: 'enemies2Atlas', frame: 'tile015' },
        //         { key: 'enemies2Atlas', frame: 'tile014' },
        //         { key: 'enemies2Atlas', frame: 'tile031' },
        //         { key: 'enemies2Atlas', frame: 'tile023' },
        //     ],
        //     frameRate: 8,
        //     repeat: -1,
        // });
                
        this.anims.create({
            key: 'ninja-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'ninja-death_0' },
                { key: 'enemies2Atlas', frame: 'ninja-death_1' },
                { key: 'enemies2Atlas', frame: 'ninja-death_2' },
                { key: 'enemies2Atlas', frame: 'ninja-death_3' },
                { key: 'enemies2Atlas', frame: 'ninja-death_4' },
                { key: 'enemies2Atlas', frame: 'ninja-death_5' },
                { key: 'enemies2Atlas', frame: 'ninja-death_6' },
            ],
            frameRate: 14,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'night-borne-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'night-borne-death_0' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_1' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_2' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_3' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_4' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_5' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_6' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_7' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_8' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_9' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_10' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_11' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_12' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_13' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_14' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_15' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_16' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_17' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_18' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_19' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_20' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_21' },
                { key: 'enemies2Atlas', frame: 'night-borne-death_22' },
            ],
            frameRate: 46,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'dark-knight-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'dark-knight-attack_0' },
                { key: 'enemies2Atlas', frame: 'dark-knight-attack_1' },
                { key: 'enemies2Atlas', frame: 'dark-knight-attack_2' },
                { key: 'enemies2Atlas', frame: 'dark-knight-attack_3' },
                { key: 'enemies2Atlas', frame: 'dark-knight-attack_4' },
                { key: 'enemies2Atlas', frame: 'dark-knight-attack_5' },
                { key: 'enemies2Atlas', frame: 'dark-knight-attack_6' },
            ],
            frameRate: 14,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'worm-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'worm-attack_0' },
                { key: 'enemies2Atlas', frame: 'worm-attack_1' },
                { key: 'enemies2Atlas', frame: 'worm-attack_2' },
                { key: 'enemies2Atlas', frame: 'worm-attack_3' },
                { key: 'enemies2Atlas', frame: 'worm-attack_4' },
                { key: 'enemies2Atlas', frame: 'worm-attack_5' },
                { key: 'enemies2Atlas', frame: 'worm-attack_6' },
                { key: 'enemies2Atlas', frame: 'worm-attack_7' },
                { key: 'enemies2Atlas', frame: 'worm-attack_8' },
                { key: 'enemies2Atlas', frame: 'worm-attack_9' },
                { key: 'enemies2Atlas', frame: 'worm-attack_10' },
                { key: 'enemies2Atlas', frame: 'worm-attack_11' },
                { key: 'enemies2Atlas', frame: 'worm-attack_12' },
                { key: 'enemies2Atlas', frame: 'worm-attack_13' },
                { key: 'enemies2Atlas', frame: 'worm-attack_14' },
                { key: 'enemies2Atlas', frame: 'worm-attack_15' },
            ],
            frameRate: 32,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'skeleton-flail-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_0', duration: 100 },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_1', duration: 100 },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_2', duration: 100 },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_3' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_4' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_5' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_6', duration: 100 },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_7', duration: 150 },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_8' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_9' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_10', duration: 100 },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_11', duration: 150 },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-attack_12', duration: 200 },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'night-borne-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'night-borne-attack_0' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_1' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_2' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_3' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_4' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_5' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_6' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_7' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_8' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_9' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_10' },
                { key: 'enemies2Atlas', frame: 'night-borne-attack_11' },
            ],
            frameRate: 24,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'worm-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'worm-death_0' },
                { key: 'enemies2Atlas', frame: 'worm-death_1' },
                { key: 'enemies2Atlas', frame: 'worm-death_2' },
                { key: 'enemies2Atlas', frame: 'worm-death_3' },
                { key: 'enemies2Atlas', frame: 'worm-death_4' },
                { key: 'enemies2Atlas', frame: 'worm-death_5' },
                { key: 'enemies2Atlas', frame: 'worm-death_6' },
                { key: 'enemies2Atlas', frame: 'worm-death_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight-death_0' },
                { key: 'enemies2Atlas', frame: 'knight-death_1' },
                { key: 'enemies2Atlas', frame: 'knight-death_2' },
                { key: 'enemies2Atlas', frame: 'knight-death_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'tiny-wizard-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-death_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-death_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-death_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-death_3' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-death_4' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-death_5' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-death_6' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-death_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'ninja-hurt',
            frames: [
                { key: 'enemies2Atlas', frame: 'ninja-hurt_0' },
                { key: 'enemies2Atlas', frame: 'ninja-hurt_1' },
                { key: 'enemies2Atlas', frame: 'ninja-hurt_2' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'ninja-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'ninja-idle_0' },
                { key: 'enemies2Atlas', frame: 'ninja-idle_1' },
                { key: 'enemies2Atlas', frame: 'ninja-idle_2' },
                { key: 'enemies2Atlas', frame: 'ninja-idle_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'ninja-jump',
            frames: [
                { key: 'enemies2Atlas', frame: 'ninja-jump_0' },
                { key: 'enemies2Atlas', frame: 'ninja-jump_1' },
            ],
            frameRate: 4,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-fall',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-fall_0' },
                { key: 'enemies2Atlas', frame: 'samurai-fall_1' },
            ],
            frameRate: 4,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'ninja-fall',
            frames: [
                { key: 'enemies2Atlas', frame: 'ninja-fall_0' },
                { key: 'enemies2Atlas', frame: 'ninja-fall_1' },
            ],
            frameRate: 4,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'skull',
            frames: [
                { key: 'enemies2Atlas', frame: 'skull_0' },
                { key: 'enemies2Atlas', frame: 'skull_1' },
                { key: 'enemies2Atlas', frame: 'skull_2' },
                { key: 'enemies2Atlas', frame: 'skull_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-hurt2',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-hurt2_0' },
                { key: 'enemies2Atlas', frame: 'samurai-hurt2_1' },
                { key: 'enemies2Atlas', frame: 'samurai-hurt2_2' },
                { key: 'enemies2Atlas', frame: 'samurai-hurt2_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-hurt',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-hurt_0' },
                { key: 'enemies2Atlas', frame: 'samurai-hurt_1' },
                { key: 'enemies2Atlas', frame: 'samurai-hurt_2' },
                { key: 'enemies2Atlas', frame: 'samurai-hurt_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-jump',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-jump_0' },
                { key: 'enemies2Atlas', frame: 'samurai-jump_1' },
            ],
            frameRate: 4,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-death_0' },
                { key: 'enemies2Atlas', frame: 'samurai-death_1' },
                { key: 'enemies2Atlas', frame: 'samurai-death_2' },
                { key: 'enemies2Atlas', frame: 'samurai-death_3' },
                { key: 'enemies2Atlas', frame: 'samurai-death_4' },
                { key: 'enemies2Atlas', frame: 'samurai-death_5' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'dark-knight-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'dark-knight-idle_0' },
                { key: 'enemies2Atlas', frame: 'dark-knight-idle_1' },
                { key: 'enemies2Atlas', frame: 'dark-knight-idle_2' },
                { key: 'enemies2Atlas', frame: 'dark-knight-idle_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'worm-walk',
            frames: [
                { key: 'enemies2Atlas', frame: 'worm-walk_0' },
                { key: 'enemies2Atlas', frame: 'worm-walk_1' },
                { key: 'enemies2Atlas', frame: 'worm-walk_2' },
                { key: 'enemies2Atlas', frame: 'worm-walk_3' },
                { key: 'enemies2Atlas', frame: 'worm-walk_4' },
                { key: 'enemies2Atlas', frame: 'worm-walk_5' },
                { key: 'enemies2Atlas', frame: 'worm-walk_6' },
                { key: 'enemies2Atlas', frame: 'worm-walk_7' },
                { key: 'enemies2Atlas', frame: 'worm-walk_8' },
            ],
            frameRate: 18,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-idle_0' },
                { key: 'enemies2Atlas', frame: 'samurai-idle_1' },
                { key: 'enemies2Atlas', frame: 'samurai-idle_2' },
                { key: 'enemies2Atlas', frame: 'samurai-idle_3' },
                { key: 'enemies2Atlas', frame: 'samurai-idle_4' },
                { key: 'enemies2Atlas', frame: 'samurai-idle_5' },
                { key: 'enemies2Atlas', frame: 'samurai-idle_6' },
                { key: 'enemies2Atlas', frame: 'samurai-idle_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'worm-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'worm-idle_0' },
                { key: 'enemies2Atlas', frame: 'worm-idle_1' },
                { key: 'enemies2Atlas', frame: 'worm-idle_2' },
                { key: 'enemies2Atlas', frame: 'worm-idle_3' },
                { key: 'enemies2Atlas', frame: 'worm-idle_4' },
                { key: 'enemies2Atlas', frame: 'worm-idle_5' },
                { key: 'enemies2Atlas', frame: 'worm-idle_6' },
                { key: 'enemies2Atlas', frame: 'worm-idle_7' },
                { key: 'enemies2Atlas', frame: 'worm-idle_8' },
            ],
            frameRate: 18,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'archer-doublejump',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-doublejump_0' },
                { key: 'enemies2Atlas', frame: 'archer-doublejump_1' },
                { key: 'enemies2Atlas', frame: 'archer-doublejump_2' },
                { key: 'enemies2Atlas', frame: 'archer-doublejump_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'ninja-run',
            frames: [
                { key: 'enemies2Atlas', frame: 'ninja-run_0' },
                { key: 'enemies2Atlas', frame: 'ninja-run_1' },
                { key: 'enemies2Atlas', frame: 'ninja-run_2' },
                { key: 'enemies2Atlas', frame: 'ninja-run_3' },
                { key: 'enemies2Atlas', frame: 'ninja-run_4' },
                { key: 'enemies2Atlas', frame: 'ninja-run_5' },
                { key: 'enemies2Atlas', frame: 'ninja-run_6' },
                { key: 'enemies2Atlas', frame: 'ninja-run_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight2-run',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight2-run_0' },
                { key: 'enemies2Atlas', frame: 'knight2-run_1' },
                { key: 'enemies2Atlas', frame: 'knight2-run_2' },
                { key: 'enemies2Atlas', frame: 'knight2-run_3' },
                { key: 'enemies2Atlas', frame: 'knight2-run_4' },
                { key: 'enemies2Atlas', frame: 'knight2-run_5' },
                { key: 'enemies2Atlas', frame: 'knight2-run_6' },
                { key: 'enemies2Atlas', frame: 'knight2-run_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'samurai-run',
            frames: [
                { key: 'enemies2Atlas', frame: 'samurai-run_0' },
                { key: 'enemies2Atlas', frame: 'samurai-run_1' },
                { key: 'enemies2Atlas', frame: 'samurai-run_2' },
                { key: 'enemies2Atlas', frame: 'samurai-run_3' },
                { key: 'enemies2Atlas', frame: 'samurai-run_4' },
                { key: 'enemies2Atlas', frame: 'samurai-run_5' },
                { key: 'enemies2Atlas', frame: 'samurai-run_6' },
                { key: 'enemies2Atlas', frame: 'samurai-run_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'dark-knight-walk',
            frames: [
                { key: 'enemies2Atlas', frame: 'dark-knight-walk_0' },
                { key: 'enemies2Atlas', frame: 'dark-knight-walk_1' },
                { key: 'enemies2Atlas', frame: 'dark-knight-walk_2' },
                { key: 'enemies2Atlas', frame: 'dark-knight-walk_3' },
                { key: 'enemies2Atlas', frame: 'dark-knight-walk_4' },
                { key: 'enemies2Atlas', frame: 'dark-knight-walk_5' },
                { key: 'enemies2Atlas', frame: 'dark-knight-walk_6' },
                { key: 'enemies2Atlas', frame: 'dark-knight-walk_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight-idle_0' },
                { key: 'enemies2Atlas', frame: 'knight-idle_1' },
                { key: 'enemies2Atlas', frame: 'knight-idle_2' },
                { key: 'enemies2Atlas', frame: 'knight-idle_3' },
                { key: 'enemies2Atlas', frame: 'knight-idle_4' },
                { key: 'enemies2Atlas', frame: 'knight-idle_5' },
                { key: 'enemies2Atlas', frame: 'knight-idle_6' },
                { key: 'enemies2Atlas', frame: 'knight-idle_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight-health',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight-health_0' },
                { key: 'enemies2Atlas', frame: 'knight-health_1' },
                { key: 'enemies2Atlas', frame: 'knight-health_2' },
                { key: 'enemies2Atlas', frame: 'knight-health_3' },
                { key: 'enemies2Atlas', frame: 'knight-health_4' },
                { key: 'enemies2Atlas', frame: 'knight-health_5' },
                { key: 'enemies2Atlas', frame: 'knight-health_6' },
                { key: 'enemies2Atlas', frame: 'knight-health_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'archer-wall-slide',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-wall-slide_0' },
                { key: 'enemies2Atlas', frame: 'archer-wall-slide_1' },
                { key: 'enemies2Atlas', frame: 'archer-wall-slide_2' },
                { key: 'enemies2Atlas', frame: 'archer-wall-slide_3' },
                { key: 'enemies2Atlas', frame: 'archer-wall-slide_4' },
                { key: 'enemies2Atlas', frame: 'archer-wall-slide_5' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight-run',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight-run_0' },
                { key: 'enemies2Atlas', frame: 'knight-run_1' },
                { key: 'enemies2Atlas', frame: 'knight-run_2' },
                { key: 'enemies2Atlas', frame: 'knight-run_3' },
                { key: 'enemies2Atlas', frame: 'knight-run_4' },
                { key: 'enemies2Atlas', frame: 'knight-run_5' },
                { key: 'enemies2Atlas', frame: 'knight-run_6' },
                { key: 'enemies2Atlas', frame: 'knight-run_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'hell-hound-run',
            frames: [
                { key: 'enemies2Atlas', frame: 'hell-hound-run_0' },
                { key: 'enemies2Atlas', frame: 'hell-hound-run_1' },
                { key: 'enemies2Atlas', frame: 'hell-hound-run_2' },
                { key: 'enemies2Atlas', frame: 'hell-hound-run_3' },
                { key: 'enemies2Atlas', frame: 'hell-hound-run_4' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight-hurt',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight-hurt_0' },
                { key: 'enemies2Atlas', frame: 'knight-hurt_1' },
                { key: 'enemies2Atlas', frame: 'knight-hurt_2' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'hell-hound-walk',
            frames: [
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_0' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_1' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_2' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_3' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_4' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_5' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_6' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_7' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_8' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_9' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_10' },
                { key: 'enemies2Atlas', frame: 'hell-hound-walk_11' },
            ],
            frameRate: 24,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'worm-hurt',
            frames: [
                { key: 'enemies2Atlas', frame: 'worm-hurt_0' },
                { key: 'enemies2Atlas', frame: 'worm-hurt_1' },
                { key: 'enemies2Atlas', frame: 'worm-hurt_2' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'archer-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-idle_0' },
                { key: 'enemies2Atlas', frame: 'archer-idle_1' },
                { key: 'enemies2Atlas', frame: 'archer-idle_2' },
                { key: 'enemies2Atlas', frame: 'archer-idle_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'archer-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-attack_0' },
                { key: 'enemies2Atlas', frame: 'archer-attack_1' },
                { key: 'enemies2Atlas', frame: 'archer-attack_2' },
                { key: 'enemies2Atlas', frame: 'archer-attack_3' },
                { key: 'enemies2Atlas', frame: 'archer-attack_4' },
                { key: 'enemies2Atlas', frame: 'archer-attack_5' },
                { key: 'enemies2Atlas', frame: 'archer-attack_6' },
            ],
            frameRate: 14,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'skeleton-flail-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_0' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_1' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_2' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_3', duration: 200 },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_4' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_5' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_6' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_7' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_8' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_9' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_10' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_11' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-death_12' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-attack2',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack2_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack2_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack2_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack2_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'archer-fall',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-fall_0' },
            ],
            frameRate: 2,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'archer-run',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-run_0' },
                { key: 'enemies2Atlas', frame: 'archer-run_1' },
                { key: 'enemies2Atlas', frame: 'archer-run_2' },
                { key: 'enemies2Atlas', frame: 'archer-run_3' },
                { key: 'enemies2Atlas', frame: 'archer-run_4' },
                { key: 'enemies2Atlas', frame: 'archer-run_5' },
                { key: 'enemies2Atlas', frame: 'archer-run_6' },
                { key: 'enemies2Atlas', frame: 'archer-run_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'tiny-wizard-attack3',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack3_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack3_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack3_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack3_3' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack3_4' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack3_5' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack3_6' },
            ],
            frameRate: 14,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'minotaur-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'minotaur-attack_0', duration: 25 },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_1', duration: 50 },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_2', duration: 75 },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_3', duration: 100 },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_4', duration: 150 },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_5' },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_6' },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_7' },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_8' },
                { key: 'enemies2Atlas', frame: 'minotaur-attack_9' },
            ],
            frameRate: 20,
            repeat: 2,
        });
                
        this.anims.create({
            key: 'tiny-wizard-attack1',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack1_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack1_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack1_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack1_3' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack1_4' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack1_5' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack1_6' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-attack1_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'hell-hound-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'hell-hound-idle_0' },
                { key: 'enemies2Atlas', frame: 'hell-hound-idle_1' },
                { key: 'enemies2Atlas', frame: 'hell-hound-idle_2' },
                { key: 'enemies2Atlas', frame: 'hell-hound-idle_3' },
                { key: 'enemies2Atlas', frame: 'hell-hound-idle_4' },
                { key: 'enemies2Atlas', frame: 'hell-hound-idle_5' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight2-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight2-idle_0' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_1' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_2' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_3' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_4' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_5' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_6' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_7' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_8' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_9' },
                { key: 'enemies2Atlas', frame: 'knight2-idle_10' },
            ],
            frameRate: 22,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight2-hurt',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight2-hurt_0' },
                { key: 'enemies2Atlas', frame: 'knight2-hurt_1' },
                { key: 'enemies2Atlas', frame: 'knight2-hurt_2' },
                { key: 'enemies2Atlas', frame: 'knight2-hurt_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'skeleton-flail-walk',
            frames: [
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_0' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_1' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_2' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_3' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_4' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_5' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_6' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_7' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_8' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_9' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_10' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-walk_11' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-fall',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight2-fall_0' },
                { key: 'enemies2Atlas', frame: 'knight2-fall_1' },
                { key: 'enemies2Atlas', frame: 'knight2-fall_2' },
                { key: 'enemies2Atlas', frame: 'knight2-fall_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'archer-jump',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-jump_0' },
            ],
            frameRate: 2,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'archer-roll',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-roll_0' },
                { key: 'enemies2Atlas', frame: 'archer-roll_1' },
                { key: 'enemies2Atlas', frame: 'archer-roll_2' },
                { key: 'enemies2Atlas', frame: 'archer-roll_3' },
                { key: 'enemies2Atlas', frame: 'archer-roll_4' },
                { key: 'enemies2Atlas', frame: 'archer-roll_5' },
                { key: 'enemies2Atlas', frame: 'archer-roll_6' },
            ],
            frameRate: 14,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight2-jump',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight2-jump_0' },
                { key: 'enemies2Atlas', frame: 'knight2-jump_1' },
                { key: 'enemies2Atlas', frame: 'knight2-jump_2' },
                { key: 'enemies2Atlas', frame: 'knight2-jump_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'night-borne-run',
            frames: [
                { key: 'enemies2Atlas', frame: 'night-borne-run_0' },
                { key: 'enemies2Atlas', frame: 'night-borne-run_1' },
                { key: 'enemies2Atlas', frame: 'night-borne-run_2' },
                { key: 'enemies2Atlas', frame: 'night-borne-run_3' },
                { key: 'enemies2Atlas', frame: 'night-borne-run_4' },
                { key: 'enemies2Atlas', frame: 'night-borne-run_5' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'night-borne-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'night-borne-idle_0' },
                { key: 'enemies2Atlas', frame: 'night-borne-idle_1' },
                { key: 'enemies2Atlas', frame: 'night-borne-idle_2' },
                { key: 'enemies2Atlas', frame: 'night-borne-idle_3' },
                { key: 'enemies2Atlas', frame: 'night-borne-idle_4' },
                { key: 'enemies2Atlas', frame: 'night-borne-idle_5' },
                { key: 'enemies2Atlas', frame: 'night-borne-idle_6' },
                { key: 'enemies2Atlas', frame: 'night-borne-idle_7' },
                { key: 'enemies2Atlas', frame: 'night-borne-idle_8' },
            ],
            frameRate: 18,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight2-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight2-death_0' },
                { key: 'enemies2Atlas', frame: 'knight2-death_1' },
                { key: 'enemies2Atlas', frame: 'knight2-death_2' },
                { key: 'enemies2Atlas', frame: 'knight2-death_3' },
                { key: 'enemies2Atlas', frame: 'knight2-death_4' },
                { key: 'enemies2Atlas', frame: 'knight2-death_5' },
                { key: 'enemies2Atlas', frame: 'knight2-death_6' },
                { key: 'enemies2Atlas', frame: 'knight2-death_7' },
                { key: 'enemies2Atlas', frame: 'knight2-death_8' },
            ],
            frameRate: 18,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'minotaur-walk',
            frames: [
                { key: 'enemies2Atlas', frame: 'minotaur-walk_0' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_1' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_2' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_3' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_4' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_5' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_6' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_7' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_8' },
                { key: 'enemies2Atlas', frame: 'minotaur-walk_9' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'tiny-wizard-jump',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-jump_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-jump_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-jump_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-jump_3' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-jump_4' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'skeleton-flail-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'skeleton-flail-idle_0' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-idle_1' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-idle_2' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-idle_3' },
            ],
            frameRate: 8,
            repeat: 3,
        });
                
        this.anims.create({
            key: 'archer-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'archer-death_0' },
                { key: 'enemies2Atlas', frame: 'archer-death_1' },
                { key: 'enemies2Atlas', frame: 'archer-death_2' },
                { key: 'enemies2Atlas', frame: 'archer-death_3' },
                { key: 'enemies2Atlas', frame: 'archer-death_4' },
                { key: 'enemies2Atlas', frame: 'archer-death_5' },
                { key: 'enemies2Atlas', frame: 'archer-death_6' },
                { key: 'enemies2Atlas', frame: 'archer-death_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'minotaur-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'minotaur-death_0' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_1' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_2' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_3' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_4' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_5' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_6' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_7' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_8' },
                { key: 'enemies2Atlas', frame: 'minotaur-death_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-flail-hurt',
            frames: [
                { key: 'enemies2Atlas', frame: 'skeleton-flail-hurt_0' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-hurt_1' },
                { key: 'enemies2Atlas', frame: 'skeleton-flail-hurt_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'minotaur-gesture',
            frames: [
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_0' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_1' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_2' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_3' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_4' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_5' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_6' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_7' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_8' },
                { key: 'enemies2Atlas', frame: 'minotaur-gesture_9' },
            ],
            frameRate: 20,
            repeat: 3,
        });
                
        this.anims.create({
            key: 'minotaur-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'minotaur-idle_0' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_1' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_2' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_3' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_4' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_5' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_6' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_7' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_8' },
                { key: 'enemies2Atlas', frame: 'minotaur-idle_9' },
            ],
            frameRate: 12,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'night-borne-hurt',
            frames: [
                { key: 'enemies2Atlas', frame: 'night-borne-hurt_0' },
                { key: 'enemies2Atlas', frame: 'night-borne-hurt_1' },
                { key: 'enemies2Atlas', frame: 'night-borne-hurt_2' },
                { key: 'enemies2Atlas', frame: 'night-borne-hurt_3' },
                { key: 'enemies2Atlas', frame: 'night-borne-hurt_4' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight2-dash',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight2-dash_0' },
                { key: 'enemies2Atlas', frame: 'knight2-dash_1' },
                { key: 'enemies2Atlas', frame: 'knight2-dash_2' },
                { key: 'enemies2Atlas', frame: 'knight2-dash_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'viking-death',
            frames: [
                { key: 'enemies2Atlas', frame: 'viking-death_0' },
                { key: 'enemies2Atlas', frame: 'viking-death_1' },
                { key: 'enemies2Atlas', frame: 'viking-death_2' },
                { key: 'enemies2Atlas', frame: 'viking-death_3' },
                { key: 'enemies2Atlas', frame: 'viking-death_4' },
                { key: 'enemies2Atlas', frame: 'viking-death_5' },
                { key: 'enemies2Atlas', frame: 'viking-death_6' },
                { key: 'enemies2Atlas', frame: 'viking-death_7' },
                { key: 'enemies2Atlas', frame: 'viking-death_8' },
            ],
            frameRate: 9,
            repeat: 0,
            hideOnComplete: true
        });
                
        this.anims.create({
            key: 'viking-attack',
            frames: [
                { key: 'enemies2Atlas', frame: 'viking-attack_0', duration: 250 },
                { key: 'enemies2Atlas', frame: 'viking-attack_1', duration: 500 },
                { key: 'enemies2Atlas', frame: 'viking-attack_2' },
                { key: 'enemies2Atlas', frame: 'viking-attack_3' },
                { key: 'enemies2Atlas', frame: 'viking-attack_4' },
                { key: 'enemies2Atlas', frame: 'viking-attack_5', duration: 125 },
                { key: 'enemies2Atlas', frame: 'viking-attack_6', duration: 250 },
                { key: 'enemies2Atlas', frame: 'viking-attack_7' },
                { key: 'enemies2Atlas', frame: 'viking-attack_8' },
            ],
            frameRate: 16,
            repeat: 0,
        });

        this.anims.create({
            key: 'viking-shield',
            frames: [
                // { key: 'enemies2Atlas', frame: 'viking-shield_0' },
                // { key: 'enemies2Atlas', frame: 'viking-shield_1' },
                // { key: 'enemies2Atlas', frame: 'viking-shield_2' },
                // { key: 'enemies2Atlas', frame: 'viking-shield_3' },
                // { key: 'enemies2Atlas', frame: 'viking-shield_4' },
                { key: 'enemies2Atlas', frame: 'viking-shield_5' },
                { key: 'enemies2Atlas', frame: 'viking-shield_6' },
                { key: 'enemies2Atlas', frame: 'viking-shield_7' },
                { key: 'enemies2Atlas', frame: 'viking-shield_8' },
            ],
            frameRate: 32,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dragon-head',
            frames: [
                { key: 'enemies2Atlas', frame: 'dragon-head_0' },
                { key: 'enemies2Atlas', frame: 'dragon-head_1' },
                { key: 'enemies2Atlas', frame: 'dragon-head_2' },
                { key: 'enemies2Atlas', frame: 'dragon-head_3' },
                { key: 'enemies2Atlas', frame: 'dragon-head_4' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'tiny-wizard-cast',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-cast_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-cast_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-cast_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-cast_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'knight-roll',
            frames: [
                { key: 'enemies2Atlas', frame: 'knight-roll_0' },
                { key: 'enemies2Atlas', frame: 'knight-roll_1' },
                { key: 'enemies2Atlas', frame: 'knight-roll_2' },
                { key: 'enemies2Atlas', frame: 'knight-roll_3' },
            ],
            frameRate: 8,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'tiny-wizard-emote',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-emote_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-emote_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-emote_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-emote_3' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-emote_4' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-emote_5' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-emote_6' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-emote_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'crow-eat',
            frames: [
                { key: 'enemies2Atlas', frame: 'crow-eat0' },
                { key: 'enemies2Atlas', frame: 'crow-eat1' },
                { key: 'enemies2Atlas', frame: 'crow-eat2' },
            ],
            frameRate: 6,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'crow-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'crow-idle0' },
                { key: 'enemies2Atlas', frame: 'crow-idle1' },
                { key: 'enemies2Atlas', frame: 'crow-idle2' },
                { key: 'enemies2Atlas', frame: 'crow-idle3' },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: 'crow-fly',
            frames: [
                { key: 'enemies2Atlas', frame: 'crow-fly0' },
                { key: 'enemies2Atlas', frame: 'crow-fly1' },
                { key: 'enemies2Atlas', frame: 'crow-fly2' },
            ],
            frameRate: 6,
            repeat: -1,
        });

        this.anims.create({
            key: 'crow-fly-off',
            frames: [
                { key: 'enemies2Atlas', frame: 'crow-fly-off0' },
                { key: 'enemies2Atlas', frame: 'crow-fly-off1' },
                { key: 'enemies2Atlas', frame: 'crow-fly-off2' },
                { key: 'enemies2Atlas', frame: 'crow-fly-off3' },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: 'crow-look-behind',
            frames: [
                { key: 'enemies2Atlas', frame: 'crow-look-behind_0' },
            ],
            frameRate: 2,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'tiny-wizard-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-idle_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-idle_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-idle_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-idle_3' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-idle_4' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-idle_5' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-idle_6' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-idle_7' },
            ],
            frameRate: 16,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'tiny-wizard-walk',
            frames: [
                { key: 'enemies2Atlas', frame: 'tiny-wizard-walk_0' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-walk_1' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-walk_2' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-walk_3' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-walk_4' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-walk_5' },
                { key: 'enemies2Atlas', frame: 'tiny-wizard-walk_6' },
            ],
            frameRate: 14,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'viking-run',
            frames: [
                { key: 'enemies2Atlas', frame: 'viking-run_0' },
                { key: 'enemies2Atlas', frame: 'viking-run_1' },
                { key: 'enemies2Atlas', frame: 'viking-run_2' },
                { key: 'enemies2Atlas', frame: 'viking-run_3' },
                { key: 'enemies2Atlas', frame: 'viking-run_4' },
                { key: 'enemies2Atlas', frame: 'viking-run_5' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-jump',
            frames: [
                { key: 'enemies2Atlas', frame: 'viking-jump_0' },
                { key: 'enemies2Atlas', frame: 'viking-jump_1' },
                { key: 'enemies2Atlas', frame: 'viking-jump_2' },
                { key: 'enemies2Atlas', frame: 'viking-jump_3' },
                { key: 'enemies2Atlas', frame: 'viking-jump_4' },
            ],
            frameRate: 10,
            repeat: -1,
        });
                
        this.anims.create({
            key: 'viking-idle',
            frames: [
                { key: 'enemies2Atlas', frame: 'viking-idle_0' },
                { key: 'enemies2Atlas', frame: 'viking-idle_1' },
                { key: 'enemies2Atlas', frame: 'viking-idle_2' },
                { key: 'enemies2Atlas', frame: 'viking-idle_3' },
                { key: 'enemies2Atlas', frame: 'viking-idle_4' },
                { key: 'enemies2Atlas', frame: 'viking-idle_5' },
                { key: 'enemies2Atlas', frame: 'viking-idle_6' },
            ],
            frameRate: 14,
            repeat: -1,
        });
    }

    private showCover ()
    {
        this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);
        
        this.add.image(WIDTH / 2, HEIGHT / 4 * 3 + 8, 'whitePixel')
            .setDisplaySize(242, 18);
    }

    private showProgressBar ()
    {
        //  Get the progress bar filler texture dimensions.
        const { width: w, height: h } = this.textures.get('progressBar').get();

        //  Place the filler over the progress bar of the splash screen.
        const img = this.add.sprite(WIDTH / 2, HEIGHT / 4 * 3, 'progressBar').setOrigin(0.5, 0);

        // Add percentage text
        const loadingpercentage = this.add.bitmapText(WIDTH / 2, HEIGHT / 4 * 3 - 10, 'alagard', 'Loading:', 10, 1)
            .setOrigin(0.5, 0.5)
            .setAlpha(1)
            .setTintFill(0xDDDDDD)
            .setDropShadow(0, 1, COLORS.RED);

        //  Crop the filler along its width, proportional to the amount of files loaded.
        this.load.on('progress', (v) =>
        {
            loadingpercentage.text = `Loading: ${Math.round(v * 100)}%`;
            img.setCrop(0, 0, Math.ceil(v * w), h);
        }).on('complete', (v) =>
        {
            this.scene.start(SCENES_NAMES.INTRO);
        });
    }
}