//#region imports
import { Scene } from 'phaser';
import animatedTilesPlugin from '../plugins/AnimatedTiles.js';
import { WIDTH, HEIGHT, FONTS, SCENES_NAMES, FONTS_SIZES, SWORDS, TILE_SIZE, SHIELDS, BOWS } from '../constant/config';
import PowerUp from '../player/powerUp';
import HellHound from '../enemies/HellHound';
import Thing from '../enemies/Thing';
import Skeleton from '../enemies/Skeleton';
import Ghost from '../enemies/Ghost';
import Wizard from '../enemies/Wizard';
import BurningGhoul from '../enemies/BurningGhoul';
import Flames from '../enemies/Flames';
import Oldman from '../npc/Oldman';
import Angel from '../enemies/Angel';
import Dragon from '../enemies/Dragon';
import HellBeast from '../enemies/HellBeast';
import Demon from '../enemies/Demon';
import Platform from '../utils/Platform';
import PlatformSpike from '../enemies/PlatformSpike';
import ColliderService from '../services/ColliderService';
import LayerService from '../services/LayerService';
import GenerateWorldRoom from '../utils/GenerateWorldRoom';
import Player from '../player/Player';
import { TBowConfig, TNpc, TShieldConfig, TSwordConfig } from '../types/types';
import Npc from '../npc/Npc';
import Enemy from '../enemies/Enemy';
import SaveLoadService from '../services/SaveLoadService';
import Cloud from '../props/Cloud';
import { COLORS } from '../constant/colors';
import Projectile from '../enemies/Projectile';
import Viking from '../enemies/Viking';
import Minotaur from '../enemies/Minotaur';
import DEPTH from '../constant/depth.js';
import SkeletonFlail from '../enemies/SkeletonFlail';
import SkeletonSword from '../enemies/SkeletonSword';
import Arrow from '../player/Arrow';
import DarkKnight from '../enemies/DarkKnight';
import Horse from '../enemies/Horse';
import BodyExtended from '../enemies/BodyExtended';
import FireSkull from '../enemies/FireSkull';
import Samurai from '../enemies/Samurai';
import Knight2 from '../enemies/Knight2';
import EvilWizard from '../enemies/EvilWizard';
import DragonHead from '../enemies/DragonHead';
import Saw from '../enemies/Saw';
import VikingAxe from '../enemies/VikingAxe';
//#endregion

export default class GameScene extends Scene
{
    //#region properties
    public state: { displayPowerUpMsg: boolean; };
    public map: Phaser.Tilemaps.Tilemap;
    public firstTimestamp: number;
    public heartGroup: Phaser.GameObjects.Sprite[];
    public powerUpGroup: PowerUp[];
    public enemyGroup: (Enemy | Dragon | HellBeast | Demon)[];
    public platformGroup: Platform[];
    public projectileGroup: Projectile[] = [];
    public bodiesGroup: BodyExtended[] = [];
    public npcGroup: TNpc[];
    public platformSpikeGroup: PlatformSpike[];
    public musicGroup: Phaser.Sound.BaseSound[];
    public hauntedForest: Phaser.Sound.BaseSound;
    public angelCalling: Phaser.Sound.BaseSound;
    public townTheme: Phaser.Sound.BaseSound;
    public townAttackTheme: Phaser.Sound.BaseSound;
    public graveyardTheme: Phaser.Sound.BaseSound;
    public bossBattleMusic: Phaser.Sound.BaseSound;
    public castleTheme: Phaser.Sound.BaseSound;
    public churchTheme: Phaser.Sound.BaseSound;
    public hellBeastFight: Phaser.Sound.BaseSound;
    public demonFight1: Phaser.Sound.BaseSound;
    public demonFight2: Phaser.Sound.BaseSound;
    public demonLighting: Phaser.Sound.BaseSound;
    public escapeTheme: Phaser.Sound.BaseSound;
    public revengeTheme: Phaser.Sound.BaseSound;
    public EndingTheme: Phaser.Sound.BaseSound;
    public thunderGateSfx: Phaser.Sound.BaseSound;
    public fireballs: Phaser.Physics.Arcade.Group;
    public skullHeads: Phaser.Physics.Arcade.Group;
    public explodeSprite: Phaser.GameObjects.Group;
    public playerIsPassingDoor: boolean = false;
    public onSismic: boolean = false;
    public isTheEnd: boolean = false;
    public battleWithBoss: boolean = false;
    public cameraIsShaking: boolean;
    public modalText: Phaser.GameObjects.BitmapText;
    public lifeText: Phaser.GameObjects.BitmapText;
    public heart: Phaser.GameObjects.Sprite;
    public bossMusic: Phaser.Sound.BaseSound;
    public playerRoomName: string;
    public demon: Demon;
    public escapeTimer: Phaser.Time.TimerEvent | null;
    public isChangingRoom: boolean;
    public colliderLayer: Phaser.Tilemaps.TilemapLayer;
    public hellBeast: HellBeast;
    public showMsg: Phaser.GameObjects.BitmapText;
    public player: Player;
    public backUi: Phaser.GameObjects.Image;
    public isCheckSaving: boolean = false;
    public isSaving: boolean = false;
    public projectiles: Phaser.Physics.Arcade.Group;
    public isPause: boolean = false;
    private pauseText: Phaser.GameObjects.BitmapText;
    public lightTorchesGroup: Phaser.GameObjects.Group;
    public lightCandlesGroup: Phaser.GameObjects.Group;
    public bodyExtended: Phaser.Physics.Arcade.Group;
    public dragonHeadBalls: Phaser.Physics.Arcade.Group;
    public smokeGroup: Phaser.GameObjects.Group;
    //#endregion

    constructor ()
    {
        super('gameScene');
        this.state = {
            displayPowerUpMsg: false,
        };
    }

    public preload ()
    {
        this.load.scenePlugin({
            key: 'animatedTilesPlugin',
            url: animatedTilesPlugin,
            sceneKey: 'animatedTile'
        });
    }

    public create ()
    {
        // initialize the map and tileset
        this.map = this.make.tilemap({ key: 'map3', tileWidth: 16, tileHeight: 16 });
        this.map.tilesets.forEach((tileset, i) =>
        {
            this.map.addTilesetImage(this.map.tilesets[i].name, this.map.tilesets[i].name, 16, 16);
        });

        // initialize the time
        this.firstTimestamp = new Date().getTime();

        // @ts-ignore
        this.backUi = this.add.rexNinePatch(WIDTH / 2, HEIGHT / 2, WIDTH / 4 * 3, HEIGHT / 4 * 3, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(1999)
            .setScrollFactor(0)
            .setVisible(false);

        // Groups that need to be destroyed on changing room
        this.heartGroup = [];
        this.powerUpGroup = [];
        this.enemyGroup = [];
        this.platformGroup = [];
        this.projectileGroup = [];
        this.npcGroup = [];
        this.platformSpikeGroup = [];

        // AMBIENT MUSIC
        this.musicGroup = [];
        this.hauntedForest = this.sound.add('hauntedForest', { volume: 1, loop: true });
        this.angelCalling = this.sound.add('angelCalling', { volume: 1, loop: true });
        this.townTheme = this.sound.add('townTheme', { volume: 1, loop: true });
        this.townAttackTheme = this.sound.add('townAttackTheme', { volume: 1, loop: true });
        this.graveyardTheme = this.sound.add('graveyardTheme', { volume: 1, loop: true });
        this.bossBattleMusic = this.sound.add('dragonFight', { volume: 1, loop: true });
        this.castleTheme = this.sound.add('castleTheme', { volume: 1, loop: true });
        this.churchTheme = this.sound.add('churchTheme', { volume: 1, loop: true });
        this.hellBeastFight = this.sound.add('hellBeastFight', { volume: 1, loop: true });
        this.demonFight1 = this.sound.add('demonFight1', { volume: 1, loop: true });
        this.demonFight2 = this.sound.add('demonFight2', { volume: 1, loop: true });
        this.demonLighting = this.sound.add('demonLighting', { volume: 1, loop: true });
        this.escapeTheme = this.sound.add('escapeTheme', { volume: 1, loop: true });
        this.revengeTheme = this.sound.add('revengeTheme', { volume: 1, loop: true });
        this.EndingTheme = this.sound.add('EndingTheme', { volume: 1, loop: true });

        this.thunderGateSfx = this.sound.add('thunderGateSfx', { volume: 0.6, loop: true });
        this.musicGroup.push(
            this.hauntedForest,
            this.angelCalling,
            this.townTheme,
            this.townAttackTheme,
            this.graveyardTheme,
            this.bossBattleMusic,
            this.castleTheme,
            this.churchTheme,
            this.hellBeastFight,
            this.demonFight1,
            this.demonFight2,
            this.demonLighting,
            this.escapeTheme,
        );

        // PLAYER SECTION
        this.player = new Player(this, 80, 170, { key: 'playerAtlas' }); // 458, 122 4 * 16, 6 * 16

        // create groups
        this.createGroups();

        this.watchWindowInactive();

        this.loadGame();

        this.explodeSprite = this.add.group({
            defaultKey: 'atlas',
            defaultFrame: 'enemy-death-1',
            // frames: ['enemy-death-1', 'enemy-death-2', 'enemy-death-3', 'enemy-death-4', 'enemy-death-5'],
            maxSize: 50,
        });

        // CAMERA
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1).setRoundPixels(true);
        this.cameras.main.transparent = true;
        this.cameraIsShaking = false;
        this.cameras.main.fadeIn(200);

        GenerateWorldRoom.generate(this);
    }

    public update (time: number, delta: number)
    {
        if (this.modalText)
        {
            this.modalText.x = this.player.x;
            this.modalText.y = this.player.y - 100;
        }
        // anti fall trough map
        if (this.player.y > this.map.heightInPixels)
        {
            this.player.setPosition(this.map.widthInPixels / 2, this.map.heightInPixels / 2);
        }
    }

    private createGroups (): void
    {
        this.lightTorchesGroup = this.add.group({
            classType: Phaser.GameObjects.PointLight,
            maxSize: 20,
        });

        this.lightCandlesGroup = this.add.group({
            classType: Phaser.GameObjects.PointLight,
            maxSize: 20,
        });

        this.smokeGroup = this.add.group({
            defaultKey: 'Smoke VFX B1',
            maxSize: 1,
        });
        // fireball
        this.fireballs = this.physics.add.group({
            classType: Projectile,
            maxSize: 3,
            allowGravity: false
        });

        this.dragonHeadBalls = this.physics.add.group({
            classType: Projectile,
            maxSize: 15,
            allowGravity: false
        });

        // more bodies for complex enemies
        this.bodyExtended = this.physics.add.group({
            classType: BodyExtended,
            maxSize: 10,
            allowGravity: false
        });
        // enemies projectiles
        this.projectiles = this.physics.add.group({
            classType: Projectile,
            maxSize: 30,
            allowGravity: false,
        });

        this.skullHeads = this.physics.add.group({
            defaultKey: 'finalBoss',
            frame: ['fire-skull_1', 'fire-skull_2', 'fire-skull_3', 'fire-skull_4', 'fire-skull_5', 'fire-skull_6', 'fire-skull_7'],
            maxSize: 8,
            allowGravity: false
        });
    }

    /**
     * Check if window is blurred
     */
    private watchWindowInactive (): void
    {
        this.game.events.once('blur', () =>
        {
            this.isPause = true;

            this.events.emit('isPause', this.isPause);

            if (!this.cameras.main)
            {
                return;
            }

            this.pauseText = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.GALAXY, 'pause', FONTS_SIZES.GALAXY, 1)
                .setDepth(2000)
                .setOrigin(0.5, 0.5)
                .setScrollFactor(0, 0)
                .setTintFill(COLORS.RED);

            this.setPause();

            this.watchWindowActive();
        });
    }

    /**
     * Check if window is focused
     */
    private watchWindowActive ()
    {
        this.game.events.once('focus', () =>
        {
            this.isPause = false;

            this.events.emit('isPause', this.isPause);

            if (this.pauseText)
            {
                this.pauseText.destroy();
            }

            this.unPause();

            this.watchWindowInactive();
        });
    }

    public setPause ()
    {
        this.isPause = true;

        if (this.physics.world)
        {
            this.physics.pause();
        }

        this?.anims?.pauseAll();

        this.sound.pauseAll();

        if (!this.cameras.main)
        {
            return;
        }
    }

    public unPause ()
    {
        this.isPause = false;

        if (this.physics.world)
        {
            this.physics.resume();
        }

        this.anims.resumeAll();

        this.sound.resumeAll();
    }

    public playMusic (music)
    {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.musicGroup.length; i += 1)
        {
            if (this.musicGroup[i].isPlaying && this.musicGroup[i].key === music)
            { //
                return;
            }
        }
        this.stopMusic();
        this[music].play();
        console.log(this[music].key + ' is playing');
    }

    public stopMusic ()
    {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.musicGroup.length; i += 1)
        {
            if (this.musicGroup[i].isPlaying)
            {
                this.musicGroup[i].stop();
                console.log(this.musicGroup[i].key + ' is stopped');
            }
        }
    }

    public sismicActivity ()
    {
        if (!this.onSismic)
        {
            this.onSismic = true;
            const rdm = Phaser.Math.Between(2000, 5000);
            this.shakeCamera(1000);
            this.sound.play('shake', { volume: 0.5 });
            this.time.addEvent({
                delay: rdm,
                callback: () =>
                {
                    this.onSismic = false;
                },
            });
        }
    }

    public getPowerUp (elm: PowerUp)
    {
        this.state.displayPowerUpMsg = true;

        const inventory = this.player.inventoryManager.getInventory();

        if (elm.category === 'sword')
        {
            const props: TSwordConfig = elm.properties as TSwordConfig;

            this.player.swordManager.addSword(props);

            inventory.swords.push(elm.id);
        }

        if (elm.category === 'shield')
        {
            const props: TShieldConfig = elm.properties as TShieldConfig;

            this.player.shieldManager.addShield(props);

            inventory.shields.push(elm.id);

            if (inventory.selectedShield === null) inventory.selectedShield = elm.id;
        }

        if (elm.category === 'bow')
        {
            const props: TBowConfig = elm.properties as TBowConfig;

            this.player.bowManager.addBow(props);

            inventory.bows.push(elm.id);

            if (inventory.selectedBow === null) inventory.selectedBow = elm.id;
        }

        if (elm.category === 'equipment')
        {
            if (elm.id === 23) this.player.addJumpBoots();
        }

        this.sound.play('powerUp');


        inventory.powerUp.push(elm.id);


        this.setPause();

        // @ts-ignore
        const ui = this.add.rexNinePatch(WIDTH / 2, HEIGHT / 2, WIDTH / 2, HEIGHT / 2, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(1999)
            .setScrollFactor(0, 0)
            .setVisible(true);

        let txt = '';

        if (elm.category === 'sword')
        {
            const props: TSwordConfig = elm.properties as TSwordConfig;

            txt = `${props.name.toUpperCase()}
${props.desc}
ATK: ${props.damage}  RATE: ${props.rate}`;
        }

        if (elm.category === 'shield')
        {
            const props: TShieldConfig = elm.properties as TShieldConfig;

            txt = `${props.name.toUpperCase()}
${props.desc}
DEF: ${props.defense}`;
        }

        if (elm.category === 'bow')
        {
            const props: TBowConfig = elm.properties as TBowConfig;

            txt = `${props.name.toUpperCase()}
${props.desc}
ATK: ${props.damage}  RATE: ${props.rate}  SPEED: ${props.speed}`;
        }

        if (elm.category === 'equipment')
        {
            txt = `${elm.properties.name.toUpperCase()}
${elm.properties.desc}`;
        }


        const powerUpDesc = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.ULTIMA_BOLD, txt, FONTS_SIZES.ULTIMA_BOLD, 1)
            .setOrigin(0.5, 0.5)
            .setAlpha(1)
            .setDepth(2000)
            .setScrollFactor(0, 0);

        elm.destroy();

        const dialog = this.input.keyboard.once(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, () =>
        {
            powerUpDesc.destroy();
            ui.destroy();
            dialog.removeAllListeners();
            this.unPause();
        });
    }

    // GAME PAUSE
    // public pauseGamePowerUp ()
    // {
    //     if (this.isPausing)
    //     {
    //         return;
    //     }
    //     if (!this.isPausing && !this.player.isPause)
    //     {
    //         this.isPausing = true;
    //         this.player.isPause = true;
    //         this.physics.pause();
    //         this.player.anims.play('adventurer-idle');

    //         this.time.addEvent({
    //             delay: 3000,
    //             callback: () =>
    //             {
    //                 this.isPausing = false;
    //                 this.player.isPause = false;
    //                 this.scene.scene.physics.resume();
    //                 this.player.anims.resume(this.player.anims.currentFrame);
    //             }
    //         });

    //         return;
    //     }
    // }

    // public pauseGame ()
    // {
    //     if (this.isPausing)
    //     {
    //         return;
    //     }

    //     if (!this.isPausing && !this.player.isPause)
    //     {
    //         this.isPausing = true;

    //         SaveLoadService.setSavedGameTime(this);
    //         this.player.anims.play('stand');
    //         this.player.isPause = true;
    //         this.physics.pause();
    //         const pos = this.getCamCenter();

    //         this.lifeText = this.add.bitmapText(pos.x, pos.y, FONTS.MINIMAL, 'PAUSE', 14, 1)
    //             .setDepth(300)
    //             .setOrigin(0.5, 0.5)
    //             .setAlpha(1);

    //         this.time.addEvent({
    //             delay: 120,
    //             callback: () =>
    //             {
    //                 this.isPausing = false;
    //             },
    //         });

    //         return;
    //     }
    //     this.isPausing = true;
    //     this.events.emit('unpause');
    //     this.lifeText.destroy();
    //     this.player.isPause = false;
    //     this.scene.scene.physics.resume();
    //     this.player.anims.resume(this.player.anims.currentFrame);
    //     this.time.addEvent({
    //         delay: 200,
    //         callback: () =>
    //         {
    //             this.isPausing = false;
    //         },
    //     });
    // }

    public playerIsHit (elm: Enemy | Projectile)
    {
        if (elm.enemyState.damage === 0)
        {
            return;
        }

        this.player.looseLife(elm);
    }

    public playerIsDead ()
    {
        SaveLoadService.setPlayerDeathCount();

        SaveLoadService.setSavedGameTime(this);

        this.player.playerState.isDead = false;

        this.demonFight1.stop();
        this.demonFight2.stop();
        this.demonLighting.stop();
        this.thunderGateSfx.stop();
        this.scene.start(SCENES_NAMES.GAMEOVER);
    }

    public enemyIsHit (_enemy, _weapon)
    {
        const enemy = _enemy as Enemy;

        if (_weapon.name === 'sword')
        {
            const str = Math.ceil(Math.sqrt(Math.pow(this.player.inventoryManager.getInventory().level, 3)) / 10);

            enemy.looseLife(Math.floor(this.player.swordManager.getCurrentSword().damage * str), 'sword');

        }

        if (_weapon.name === 'arrow')
        {
            const weapon = _weapon as Arrow;

            if (enemy.invulnerability === 'arrow')
            {
                weapon.deflect();

                return;
            }
            const str = Math.ceil(Math.sqrt(Math.pow(this.player.inventoryManager.getInventory().level, 3)) / 10);

            enemy.looseLife(Math.floor(this.player.bowManager.getCurrentBow().damage * str), 'arrow', weapon);

            if (!weapon.isDeflecting) weapon.kill();
        }

    }

    public bossExplode (x, y)
    {
        this.bossMusic.stop();
        const exp = this.explodeSprite.getFirstDead(true, x, y, 'enemyExplode', undefined, true).setDepth(107);
        this.sound.play('explo2', { volume: 0.3 });
        if (exp)
        {
            exp.anims.play('bossExplode').on('animationrepeat', () =>
            {
                this.sound.play('explo2', { volume: 0.3 });
            }).on('animationcomplete', () =>
            {
                exp.destroy();
            });
        }
    }

    public enemyExplode (x: number, y: number)
    {
        const exp = this.explodeSprite.getFirstDead(true, x, y - 8, 'enemyExplode', undefined, true);
        if (exp)
        {
            exp.setDepth(107);
            exp.anims.play('enemyExplode').on('animationcomplete', () =>
            {
                exp.destroy();
            });
        }
    }

    // LOAD ROOM
    public loadGame ()
    {
        this.player.x = this.player.inventoryManager.getInventory().savedPositionX;
        this.player.y = this.player.inventoryManager.getInventory().savedPositionY;

        this.startRoom(this.player.inventoryManager.getInventory().map);
    }

    public askForGameSave (player: Player, tile: Phaser.Tilemaps.Tile)
    {
        if (this.isCheckSaving || this.isSaving) return;

        this.isCheckSaving = true;

        // @ts-ignore
        const ui = this.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 16, WIDTH / 2, HEIGHT / 8, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(1999)
            .setScrollFactor(0)
            .setVisible(true);

        const label = this.add.bitmapText(WIDTH / 2, HEIGHT - 24, FONTS.ULTIMA_BOLD, 'Press fire to save', FONTS_SIZES.ULTIMA, 1)
            .setOrigin(0.5, 0).setLetterSpacing(1).setAlpha(1).setDepth(2000).setScrollFactor(0, 0);

        const check = this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event: { key: string; }) =>
        {
            if (event.key === this.player.keys.fire.originalEvent.key)
            {
                label?.destroy();

                ui?.destroy();

                this.saveGame();
            }
        });

        this.time.addEvent({
            delay: 500,
            callback: () =>
            {
                label?.destroy();

                ui?.destroy();

                this.isCheckSaving = false;

                if (this.isSaving) return;

                check?.removeAllListeners();
            },
        });
    }

    public saveGame ()
    {
        if (this.isSaving) return;

        this.setPause();

        this.isSaving = true;

        // @ts-ignore
        const ui = this.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 8, WIDTH / 2, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(1999)
            .setScrollFactor(0)
            .setVisible(true);

        let index = 0;

        const label = this.add.bitmapText(WIDTH / 2, HEIGHT - 64, FONTS.ULTIMA_BOLD, 'Save the game?', FONTS_SIZES.ULTIMA, 1)
            .setOrigin(0.5, 0).setLetterSpacing(1).setAlpha(1).setDepth(2000).setScrollFactor(0, 0);

        const yes = this.add.bitmapText(WIDTH / 2 - 64, HEIGHT - 48, FONTS.MINIMAL, 'yes', 22, 1)
            .setOrigin(0.5, 0).setLetterSpacing(1).setAlpha(1).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.STEEL_GRAY);

        const no = this.add.bitmapText(WIDTH / 2 + 64, HEIGHT - 48, FONTS.MINIMAL, 'no', 22, 1)
            .setOrigin(0.5, 0).setLetterSpacing(1).setAlpha(1).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.DARK_GREEN);

        const dialog = this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event: { key: string; }) =>
        {
            if (event.key === this.player.keys.right.originalEvent.key)
            {
                index = 1;
                no.setTintFill(COLORS.STEEL_GRAY);
                yes.setTintFill(COLORS.DARK_GREEN);
            }

            if (event.key === this.player.keys.left.originalEvent.key)
            {
                index = 0;
                yes.setTintFill(COLORS.STEEL_GRAY);
                no.setTintFill(COLORS.DARK_GREEN);
            }

            if (event.key === this.player.keys.fire.originalEvent.key && index === 0)
            {
                SaveLoadService.saveGameData(this);

                SaveLoadService.setSavedGameTime(this);

                this.sound.play('melo');

                yes.destroy();
                no.destroy();

                label.setText('').setPosition(WIDTH / 2, HEIGHT - 48).setText('Game Saved');

                this.time.addEvent({
                    delay: 1000,
                    callback: () =>
                    {
                        this.unPause();
                        label.destroy();
                        ui.destroy();
                        this.isSaving = false;
                        dialog.removeAllListeners();
                    },
                });
            }

            if (event.key === this.player.keys.fire.originalEvent.key && index === 1)
            {
                yes.destroy();

                no.destroy();

                this.unPause();

                label.destroy();

                ui.destroy();

                this.isSaving = false;

                dialog.removeAllListeners();
            }
        });

    }

    public startRoom (room: string)
    {
        // clean up
        this.cameras.main.fadeOut(50);

        this.physics.world.colliders.destroy();

        this.map.destroy();

        this.heartGroup.forEach(e => e.destroy());

        this.powerUpGroup.forEach(e => e.destroy());

        this.enemyGroup.forEach(e => e.destroy());

        if (this.thunderGateSfx.isPlaying)
        {
            this.thunderGateSfx.stop();
        }

        this.stopMusic();

        // create room
        this.map = this.make.tilemap({ key: room, tileWidth: 16, tileHeight: 16 });

        // @ts-ignore
        this.sys.animatedTilesPlugin.init(this.map);

        this.map.tilesets.forEach((tileset, i) =>
        {
            this.map.addTilesetImage(this.map.tilesets[i].name, this.map.tilesets[i].name, 16, 16);
        });

        this.playerRoomName = room;

        const properties = this.convertTiledObjectProperties(this.map.properties);

        LayerService.addLayers(this);

        this.player.x = this.player.inventoryManager.getInventory().savedPositionX + 24;
        this.player.y = this.player.inventoryManager.getInventory().savedPositionY;

        ColliderService.addColliders(this);

        this.addPlayerSfx();

        this.addEnemies();

        this.playMusic(properties?.music);

        // launch special functions from the room
        if (properties?.callFunction && properties?.callFunction.length)
        {
            const arr = properties.callFunction.split(',');
            arr.forEach(elm => this[elm]());
        }

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.cameras.main.startFollow(this.player, true, 0.4, 0.1).fadeIn(50);
    }

    public changeRoom (player: Player, doorP: { alpha: number; name: string; side: string; door: { x: number; y: number; }; })
    {
        // if boss not dead return!
        if (this.battleWithBoss) return;

        if (this.playerIsPassingDoor)
        {
            return;
        }

        this.playerIsPassingDoor = true;

        console.clear();

        // destroy leaving room
        this.cameras.main.fadeOut(50);

        this.destroyRoom();

        // create new room
        this.map = this.make.tilemap({ key: doorP.name, tileWidth: 16, tileHeight: 16 });

        // @ts-ignore
        this.sys.animatedTilesPlugin.init(this.map);

        this.map.tilesets.forEach((tileset, i) =>
        {
            this.map.addTilesetImage(this.map.tilesets[i].name, this.map.tilesets[i].name, 16, 16);
        });

        this.playerRoomName = doorP.name;

        const properties = this.convertTiledObjectProperties(this.map.properties);

        LayerService.addLayers(this);

        ColliderService.addColliders(this);

        switch (doorP.side)
        {
            case 'left':
                player.body.reset(doorP.door.x - 20, doorP.door.y + 15);
                break;
            case 'right':
                player.body.reset(doorP.door.x + 20, doorP.door.y + 15);
                break;
            case 'top':
                player.body.reset(doorP.door.x + player.body.halfWidth, doorP.door.y - 48);
                break;
            case 'bottom':
                player.body.reset(doorP.door.x + player.body.halfWidth, doorP.door.y + 32);
                break;
        }

        this.addMovingPlatform();

        this.addEnemies();

        ColliderService.addColliders(this);

        this.addPowerUp();

        this.addPlayerSfx();

        this.playMusic(properties?.music);

        // launch special functions from the room
        try
        {
            if (properties?.callFunction && properties.callFunction.length)
            {
                const arr = properties.callFunction.split(',');
                arr.forEach(elm => this[elm]());
            }
        }
        catch (error)
        {
            console.log(error);
        }

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels).setBoundsCollision();

        this.cameras.main.setDeadzone(0, 80).startFollow(this.player, true, 0.4, 0.1, 0, 20).fadeIn(50);

        this.playerIsPassingDoor = false;

        this.isChangingRoom = false;
    }

    private destroyRoom (): void
    {
        this.physics.world.colliders.destroy();

        this.map.destroy();

        this.heartGroup.forEach(e => e.destroy());

        this.powerUpGroup.forEach(e => e.destroy());
        this.powerUpGroup = [];

        this.platformGroup.forEach(e => e.destroy());
        this.platformGroup = [];

        this.platformSpikeGroup.forEach(e => e.destroy());
        this.platformSpikeGroup = [];

        this.enemyGroup.forEach(e =>
        {
            try
            {
                // @ts-ignore
                e.destroyHitbox();
            }
            catch (error)
            {
                // console.log(error);
            }
            e.destroy();
        });
        this.enemyGroup = [];

        this.npcGroup.forEach(e => e.destroy());
        this.npcGroup = [];

        if (this.demon) this.demon.destroy();

        if (this.escapeTimer) this.escapeTimer = null;
    }

    // ADD ROOM STUFF
    public addPlayerSfx ()
    {
        const properties = this.convertTiledObjectProperties(this.map.properties);
        switch (properties?.walkSfx)
        {
            case 'castleWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingCastleSfx', { volume: 1, rate: 1 });
                this.player.jumpSfx = this.sound.add('jumpCastleSfx', { volume: 1, rate: 1 });
                this.player.hitSfx = this.sound.add('hitCastleSfx', { volume: 2, rate: 1 });
                break;
            }
            case 'churchWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingChurchSfx', { volume: 1, rate: 1 });
                this.player.jumpSfx = this.sound.add('jumpChurchSfx', { volume: 1, rate: 1 });
                this.player.hitSfx = this.sound.add('hitChurchSfx', { volume: 2, rate: 1 });
                break;
            }
            case 'graveyardWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingGraveyardSfx', { volume: 1, rate: 1 });
                this.player.jumpSfx = this.sound.add('jumpGraveyardSfx', { volume: 1, rate: 1 });
                this.player.hitSfx = this.sound.add('hitGraveyardSfx', { volume: 2, rate: 1 });
                break;
            }
            case 'townWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingTownSfx', { volume: 1, rate: 1 });
                this.player.jumpSfx = this.sound.add('jumpTownSfx', { volume: 1, rate: 1 });
                this.player.hitSfx = this.sound.add('hitTownSfx', { volume: 2, rate: 1 });
                break;
            }
            case 'forestWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingForestSfx', { volume: 1, rate: 1 });
                this.player.jumpSfx = this.sound.add('jumpForestSfx', { volume: 1, rate: 1 });
                this.player.hitSfx = this.sound.add('hitForestSfx', { volume: 2, rate: 1 });
                break;
            }
        }
        const walkSound = properties?.walkSfx as string;
        this.player.walkStepSfx = this.sound.add(walkSound, { volume: 0.6, rate: 1 });
    }

    public addMovingPlatform ()
    {
        const layerArray = this.checkObjectsLayerIndex('path');
        if (!layerArray || layerArray.objects.length === 0)
        {
            return;
        }
        layerArray.objects.forEach((element: Phaser.Types.Tilemaps.TiledObject) =>
        {
            element.properties = this.convertTiledObjectProperties(element.properties);
            if (!element.y) return;
            const platform = new Platform(this, element.x, element.y - 16, {
                key: 'movingPlatform',
                name: element.name,
                duration: element.properties.duration,
                directionType: element.properties.vertical,
            });
            this.platformGroup.push(platform);
        });
    }

    public addPowerUp ()
    {
        const layerArray = this.checkObjectsLayerIndex('powerup');
        if (!layerArray || layerArray.objects.length === 0)
        {
            return;
        }
        layerArray.objects.forEach((element) =>
        {
            element.properties = this.convertTiledObjectProperties(element.properties);

            if (!this.player.inventoryManager.getInventory().powerUp.includes(element.properties.id))
            {
                if (!element.y) return;

                if (element.properties.id < 10)
                {
                    const props = SWORDS.filter(e => e.id === element.properties.id)[0];

                    const sword = new PowerUp(this, element.x as unknown as number + TILE_SIZE / 2, element.y as unknown as number - TILE_SIZE, {
                        key: 'stuff',
                        id: element.properties.id,
                        properties: props,
                        category: 'sword'
                    });

                    this.powerUpGroup.push(sword);

                    return;
                }

                if (element.properties.id < 15)
                {
                    const props = BOWS.filter(e => e.id === element.properties.id)[0];

                    const bow = new PowerUp(this, element.x as unknown as number + TILE_SIZE / 2, element.y as unknown as number - TILE_SIZE, {
                        key: 'stuff',
                        id: element.properties.id,
                        properties: props,
                        category: 'bow'
                    });

                    this.powerUpGroup.push(bow);

                    return;
                }

                if (element.properties.id < 20)
                {
                    const props = SHIELDS.filter(e => e.id === element.properties.id)[0];

                    const shield = new PowerUp(this, element.x as unknown as number + TILE_SIZE / 2, element.y as unknown as number - TILE_SIZE, {
                        key: 'stuff',
                        id: element.properties.id,
                        properties: props,
                        category: 'shield'
                    });

                    this.powerUpGroup.push(shield);
                }

                if (element.properties.id === 23)
                {
                    const jumpBoots = new PowerUp(this, element.x as unknown as number + TILE_SIZE / 2, element.y as unknown as number - TILE_SIZE, {
                        key: 'stuff',
                        id: element.properties.id,
                        properties: {
                            id: element.properties.id,
                            name: 'jump boots',
                            desc: 'jump higher with this boots',
                            defense: 0,
                            key: 23
                        },
                        category: 'equipment'
                    });

                    this.powerUpGroup.push(jumpBoots);
                }
            }
        });
    }

    public checkObjectsLayerIndex (layerName)
    {
        const arr = this.map.objects.filter((elm) => elm.name === layerName);

        if (!arr || !arr.length)
        {
            return null;
        }

        return arr[0];
    }

    /**
     * Convert a Tiled Object Properties from array to an object
     * @param properties 
     */
    public convertTiledObjectProperties (properties)
    {
        const props = {
            callFunction: '',
            music: '',
            walkSfx: '',
            scrollFactorX: undefined,
            scrollFactorY: undefined
        };

        if (!properties.length)
        {
            return undefined;
        }

        properties.forEach(e =>
        {
            props[e.name] = e.value;
        });

        return props;
    }

    public addEnemies ()
    {
        // the hellHound
        const layerArray = this.checkObjectsLayerIndex('objects');

        layerArray?.objects.forEach((element) =>
        {
            element.properties = this.convertTiledObjectProperties(element.properties);

            switch (element.name)
            {
                case 'cloud':
                    const cloud = new Cloud(this, element.x as unknown as number, element.y as unknown as number, {
                        name: 'to-remove-net-room',
                        key: element.properties.key,
                        speed: element.properties.speed
                    });
                    break;

                case 'minotaur':
                    if (!element.y) return;

                    const minotaur = new Minotaur(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(minotaur);
                    break;

                case 'viking':
                    if (!element.y) return;

                    const viking = new VikingAxe(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(viking);
                    break;

                case 'samurai':
                    if (!element.y) return;

                    const samurai = new Samurai(this, element.x as unknown as number - 64, element.y as unknown as number - 64, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(samurai);
                    break;

                case 'saw':
                    if (!element.y) return;

                    const saw = new Saw(this, element.x as unknown as number + 8, element.y - 12 as unknown as number, {
                        key: 'atlas',
                        name: 'saw',
                        life: 0,
                        damage: 15,
                        amplitude: element.properties.amplitude,
                        duration: element.properties.duration ? element.properties.duration : 2000
                    });

                    this.enemyGroup.push(saw);
                    break;

                case 'dragon-head':
                    if (!element.y) return;

                    const dragonHead = new DragonHead(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                        flipX: element.properties.flipX
                    });

                    this.enemyGroup.push(dragonHead);
                    break;

                case 'evil-wizard':
                    if (!element.y) return;

                    const evilWizard = new EvilWizard(this, element.x as unknown as number - 64, element.y as unknown as number - 64, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(evilWizard);
                    break;

                case 'knight2':
                    if (!element.y) return;

                    const knight2 = new Knight2(this, element.x as unknown as number - 64, element.y as unknown as number - 64, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(knight2);
                    break;

                // case 'dark-knight':
                //     if (!element.y) return;

                //     const darkKnight = new DarkKnight(this, element.x as unknown as number, element.y as unknown as number - 16, {
                //         key: element.properties.key,
                //         name: element.name,
                //         life: element.properties.life,
                //         damage: element.properties.damage,
                //     });

                //     this.enemyGroup.push(darkKnight);
                //     break;

                case 'horse':
                    if (!element.y) return;

                    const horse = new Horse(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: 'horse-galloping_0',
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(horse);
                    break;

                case 'skeleton-flail':
                    if (!element.y) return;

                    const skeletonFlail = new SkeletonFlail(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(skeletonFlail);
                    break;

                case 'skeleton-sword':
                    if (!element.y) return;

                    const skeletonSword = new SkeletonSword(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(skeletonSword);
                    break;

                case 'hellhound':
                    if (!element.y) return;

                    const hellhound = new HellHound(this, element.x as unknown as number, element.y - 16 as unknown as number - 16, {
                        key: 'hellHound',
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(hellhound);
                    break;

                case 'fireskull':
                    if (!element.y) return;

                    const fireskull = new FireSkull(this, element.x as unknown as number, element.y - 16 as unknown as number - 16, {
                        key: 'fire-skull',
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(fireskull);
                    break;

                case 'thing':
                    if (!element.y) return;

                    const thing = new Thing(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });
                    this.enemyGroup.push(thing);
                    break;

                case 'skeleton':
                    if (!element.y) return;

                    const skeleton = new Skeleton(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });
                    skeleton.setPosition(element.x, element.y - 16);
                    this.enemyGroup.push(skeleton);
                    break;

                case 'ghost':
                    if (!element.y) return;

                    const ghost = new Ghost(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });
                    this.enemyGroup.push(ghost);
                    break;

                case 'wizard':
                    if (!element.y) return;

                    const wiz = new Wizard(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                        delay: element.properties.delay || 0,
                    });
                    this.enemyGroup.push(wiz);
                    break;

                case 'burningGhoul':
                    if (!element.y) return;

                    const ghoul = new BurningGhoul(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    this.enemyGroup.push(ghoul);
                    break;

                case 'platformSpike':
                    if (!element.y) return;

                    const platformSpike = new PlatformSpike(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: 'platformSpike',
                        name: element.name,
                        directionType: element.properties.vertical,
                        duration: element.properties.duration,
                        damage: element.properties.damage,
                    });
                    this.platformSpikeGroup.push(platformSpike);
                    break;

                case 'flames':
                    if (!element.y) return;

                    const flame = new Flames(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: 'flames',
                        name: 'flame',
                    });

                    this.enemyGroup.push(flame);
                    break;

                case 'oldman':
                    if (!element.y) return;

                    const oldman = new Oldman(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                    });

                    this.npcGroup.push(oldman);
                    break;

                case 'woman':
                    if (!element.y) return;

                    const woman = new Npc(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        msg: element.properties.msg
                    });

                    this.npcGroup.push(woman);
                    break;

                case 'bearded':
                    if (!element.y) return;

                    const bearded = new Npc(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        msg: element.properties.msg
                    });

                    this.npcGroup.push(bearded);
                    break;

                case 'hatman':
                    if (!element.y) return;

                    const hatman = new Npc(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        msg: element.properties.msg
                    });

                    this.npcGroup.push(hatman);
                    break;

                default:
                    break;
            }
        });
    }

    // HANDLE ROOM ELEMENTS
    public openDoor (door)
    {
        door.openDoor();
    }

    public callHellBeast ()
    {
        const deadBosses = SaveLoadService.getDeadBoss(this);

        if (deadBosses.includes(1))
        {
            return;
        }

        this.hellBeast = new HellBeast(this, -100, -100, { key: 'hell-beast-idle', name: 'hellBeast' });
        this.enemyGroup.push(this.hellBeast);
        this.stopMusic();
        this.bossBattleMusic.play();
    }

    public callDemon ()
    {
        const deadBosses = SaveLoadService.getDeadBoss(this);

        if (deadBosses.includes(3))
        {
            return;
        }
        this.stopMusic();
        this.demon = new Demon(this, 24 * 16, 24 * 16, { key: 'finalBoss', name: 'demon' });
        this.enemyGroup.push(this.demon);
    }

    // CAMERA EFFECTS
    public shakeCamera (duration: number | undefined, intensity: number = 0.025)
    {
        if (!this.cameraIsShaking)
        {
            this.cameraIsShaking = true;
            this.cameras.main.shake(duration, intensity);
            this.sound.play('impact', { rate: 0.5 });

            this.time.addEvent({
                delay: duration,
                callback: () =>
                {
                    this.cameraIsShaking = false;
                },
            });
        }
    }

    public shakeCameraEscape (e: number | undefined)
    {
        if (!this.cameraIsShaking)
        {
            this.cameraIsShaking = true;
            this.cameras.main.shake(e, 0.025);
            this.sound.play('impact', { rate: 0.5 });
            this.time.addEvent({
                delay: e,
                callback: () =>
                {
                    this.cameraIsShaking = false;
                },
            });
        }
    }

    public flashCamera ()
    {
        this.cameras.main.flash(1000);
    }

    private resetAnimatedTiles ()
    {
        const str = JSON.stringify(this.map.tilesets[5].tileData);

        const blob = new Blob([str], { type: 'text/html' });
        window.open(URL.createObjectURL(blob));
    }
}
