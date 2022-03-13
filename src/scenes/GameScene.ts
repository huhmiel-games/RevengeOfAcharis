//#region imports
import { Scene } from 'phaser';
import animatedTilesPlugin from '../plugins/AnimatedTiles.js';
import { WIDTH, HEIGHT, FONTS, SCENES_NAMES, FONTS_SIZES, SWORDS, TILE_SIZE, SHIELDS, BOWS, EQUIPMENT, EWeaponType } from '../constant/config';
import { COLORS } from '../constant/colors';
import { TBowConfig, TDoor, TEquipmentConfig, TShieldConfig, TSwordConfig } from '../types/types';
import DEPTH from '../constant/depth';
import PowerUp from '../player/items/powerUp';
import Dragon from '../enemies/Dragon';
import HellBeast from '../enemies/HellBeast';
import Demon from '../enemies/Demon';
import ColliderService from '../services/ColliderService';
import LayerService from '../services/LayerService';
import GenerateWorldRoom from '../utils/GenerateWorldRoom';
import Player from '../player/Player';
import Npc from '../npc/Npc';
import Enemy from '../enemies/Enemy';
import SaveLoadService from '../services/SaveLoadService';
import Projectile from '../enemies/Projectile';
import Arrow from '../player/items/Arrow';
import BodyExtended from '../enemies/BodyExtended';
import BringerOfDeath from '../enemies/BringerOfDeath';
import WaterQueen from '../enemies/WaterQueen';
import addEnemies from '../utils/addEnemies';
import TopHeadText from '../utils/TopHeadText';
//#endregion

export default class GameScene extends Scene
{
    //#region properties
    public map: Phaser.Tilemaps.Tilemap;
    public firstTimestamp: number;
    public heartGroup: Phaser.GameObjects.Sprite[];
    public powerUpGroup: PowerUp[];
    public enemyGroup: (Enemy | Dragon | HellBeast | Demon | WaterQueen | Arrow)[];
    public projectileGroup: Projectile[] = [];
    public bodiesGroup: BodyExtended[] = [];
    public npcGroup: Npc[];
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
    public fireballs: Phaser.Physics.Arcade.Group;
    public skullHeads: Phaser.Physics.Arcade.Group;
    public explodeSprite: Phaser.GameObjects.Group;
    public playerIsPassingDoor: boolean = false;
    public onSismic: boolean = false;
    public isTheEnd: boolean = false;
    public battleWithBoss: boolean = false;
    public cameraIsShaking: boolean;
    public modalText: Phaser.GameObjects.BitmapText;
    // public lifeText: Phaser.GameObjects.BitmapText;
    // public heart: Phaser.GameObjects.Sprite;
    // public bossMusic: Phaser.Sound.BaseSound;
    public playerRoomName: string;
    public demon: Demon;
    public isChangingRoom: boolean;
    public colliderLayer: Phaser.Tilemaps.TilemapLayer;
    public hellBeast: HellBeast;
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
    public hearts: Phaser.GameObjects.Group;
    public archerArrows: Phaser.Physics.Arcade.Group;
    public topHeadTextGroup: Phaser.GameObjects.Group;
    private isSaved: boolean = true;
    //#endregion

    constructor ()
    {
        super(SCENES_NAMES.GAME);
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
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0)
            .setVisible(false);

        // Groups that need to be destroyed on changing room
        this.heartGroup = [];
        this.powerUpGroup = [];
        this.enemyGroup = [];
        this.projectileGroup = [];
        this.npcGroup = [];

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
        this.player = new Player(this, 20, 220, { key: 'atlas' });

        // create groups
        this.createGroups();

        this.watchWindowInactive();

        this.loadGame();

        // CAMERA
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.4).setRoundPixels(true);
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

        if (this.pauseText)
        {
            this.modalText.setText(`${this.children.list.length}`)
                .setPosition(WIDTH / 2, 16)
                .setDepth(DEPTH.UI_TEXT)
                .setOrigin(0.5, 0.5)
                .setScrollFactor(0, 0)
                .setTintFill(COLORS.RED);
        }

    }

    private createGroups (): void
    {
        this.explodeSprite = this.add.group({
            defaultKey: 'atlas',
            defaultFrame: 'enemy-death-1',
            maxSize: 30,
        });

        this.lightTorchesGroup = this.add.group({
            classType: Phaser.GameObjects.PointLight,
            maxSize: 20,
        });

        this.hearts = this.physics.add.group({
            defaultKey: 'heart',
            maxSize: 10,
            allowGravity: false,
        }) as Phaser.GameObjects.Group;

        this.lightCandlesGroup = this.add.group({
            classType: Phaser.GameObjects.PointLight,
            maxSize: 20,
        });

        this.smokeGroup = this.add.group({
            defaultKey: 'Smoke VFX B1',
            maxSize: 8,
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

        this.archerArrows = this.physics.add.group({
            classType: Arrow,
            maxSize: 10,
            allowGravity: true,
        });

        this.skullHeads = this.physics.add.group({
            defaultKey: 'atlas',
            frame: ['fire-skull_0', 'fire-skull_1', 'fire-skull_2', 'fire-skull_3', 'fire-skull_4', 'fire-skull_5', 'fire-skull_6', 'fire-skull_7'],
            maxSize: 8,
            allowGravity: false
        });

        this.topHeadTextGroup = this.add.group({
            classType: TopHeadText,
            maxSize: 10,
            defaultFrame: FONTS.GALAXY
        });
    }

    /**
     * Check if window is blurred
     */
    private watchWindowInactive (): void
    {
        this.game.events.once(Phaser.Core.Events.BLUR, () =>
        {
            this.isPause = true;


            this.events.emit('isPause', this.isPause);

            if (!this.cameras.main)
            {
                return;
            }

            this.modalText = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.GALAXY, 'pause', FONTS_SIZES.GALAXY, 1)
                .setDepth(DEPTH.UI_TEXT)
                .setOrigin(0.5, 0.5)
                .setScrollFactor(0, 0)
                .setTintFill(COLORS.RED);

            this.pauseText = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.GALAXY, 'pause', FONTS_SIZES.GALAXY, 1)
                .setDepth(DEPTH.UI_TEXT)
                .setOrigin(0.5, 0.5)
                .setScrollFactor(0, 0)
                .setTintFill(COLORS.RED);

            console.log(this.children.list);


            this.setPause();

            this.time.paused = true;

            this.watchWindowActive();
        });
    }

    /**
     * Check if window is focused
     */
    private watchWindowActive ()
    {
        this.game.events.once(Phaser.Core.Events.FOCUS, () =>
        {
            this.isPause = false;

            this.events.emit('isPause', this.isPause);

            if (this.pauseText)
            {
                this.pauseText.destroy();
            }

            this.unPause();

            this.time.paused = false;

            this.watchWindowInactive();
        });
    }

    /**
     * Pause the game
     * @param withPhysics default to true
     * @param withAnims default to true
     * @param withSounds default to true
     * @param withTime default to false
     */
    public setPause (withPhysics = true, withAnims = true, withSounds = true, withTime = false)
    {
        this.isPause = true;

        if (this.physics.world && withPhysics)
        {
            this.physics.pause();
        }

        if (withAnims)
        {
            this?.anims?.pauseAll();
        }

        if (withSounds)
        {
            this.sound.pauseAll();
        }

        if (withTime)
        {
            this.time.paused = true;
        }

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

        this.time.paused = false;
    }

    public playMusic (music: string | undefined)
    {
        if (!music) return;

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.musicGroup.length; i += 1)
        {
            if (this.musicGroup[i].isPlaying && this.musicGroup[i].key === music)
            {
                return;
            }
        }
        this.stopMusic();
        this[music].play();
        // console.log(this[music].key + ' is playing');
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

    public playSfx (sfx: string, config: Phaser.Types.Sound.SoundConfig = { })
    {
        const audioSfx = this.sound.get(sfx);

        if (!audioSfx)
        {
            this.sound.add(sfx, config);

            this.sound.play(sfx, config);
        }

        if (audioSfx && !audioSfx.isPlaying)
        {
            audioSfx.play(config);
        }
    }

    public playerIsHit (elm: Enemy | Projectile | Arrow)
    {
        if (elm.enemyState.damage === 0) return;

        if (elm instanceof BringerOfDeath) return;

        this.player.looseLife(elm);

        if (elm instanceof Arrow)
        {
            elm.kill();
        }
    }

    public playerIsDead ()
    {
        SaveLoadService.setPlayerDeathCount();

        SaveLoadService.setSavedGameTime(this);

        this.player.playerState.isDead = false;

        this.scene.start(SCENES_NAMES.GAMEOVER);
    }

    public enemyIsHit (_enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody, _weapon: Phaser.Types.Physics.Arcade.GameObjectWithBody)
    {
        const enemy = _enemy as Enemy;

        if (enemy.name === 'arrow')
        {
            const arrow = enemy as unknown as Arrow;
            arrow.deflect();

            return;
        }

        if (enemy.name === 'waterQueen')
        {
            const boss = _enemy as WaterQueen;

            if (_weapon.name === 'sword')
            {
                const str = Math.ceil(Math.sqrt(Math.pow(this.player.inventoryManager.getInventory().level, 3)) / 10);

                boss.looseLife(Math.floor(this.player.swordManager.getCurrentSword().damage * str), EWeaponType.SWORD, this.player.swordManager.getCurrentSword());

            }

            if (_weapon.name === 'arrow')
            {
                const weapon = _weapon as Arrow;

                const str = Math.ceil(Math.sqrt(Math.pow(this.player.inventoryManager.getInventory().level, 3)) / 10);

                boss.looseLife(Math.floor(this.player.bowManager.getCurrentBow().damage * str), EWeaponType.ARROW, _weapon as Arrow);

                if (!weapon.isDeflecting) weapon.kill();
            }
        }

        if (_weapon.name === 'sword' && enemy.name !== 'skullHeadDemon')
        {
            let str = Math.ceil(Math.sqrt(Math.pow(this.player.inventoryManager.getInventory().level, 3)) / 10);

            if (this.player.anims.getName() === 'adventurer-special-air-attack')
            {
                str *= 2;
            }

            enemy.looseLife(Math.floor(this.player.swordManager.getCurrentSword().damage * str), EWeaponType.SWORD);
        }

        if (_weapon.name === 'arrow' && enemy.name !== 'skullHeadDemon')
        {
            const weapon = _weapon as Arrow;

            if (enemy.invulnerability === 'arrow')
            {
                weapon.deflect();

                return;
            }

            const str = Math.ceil(Math.sqrt(Math.pow(this.player.inventoryManager.getInventory().level, 3)) / 10);

            enemy.looseLife(Math.floor(this.player.bowManager.getCurrentBow().damage * str), EWeaponType.ARROW, weapon);

            if (!weapon.isDeflecting) weapon.kill();
        }

    }

    public bossExplode (x: number | undefined, y: number | undefined)
    {
        const exp = this.explodeSprite.getFirstDead(true, x, y, 'atlas', 'enemy-death-1', true).setDepth(DEPTH.EXPLOSION);
        this.sound.play('explo2', { volume: 0.3 });
        if (exp)
        {
            exp.anims.play('bossExplode').on(Phaser.Animations.Events.ANIMATION_REPEAT, () =>
            {
                this.sound.play('explo2', { volume: 0.3 });
            }).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
            {
                exp.destroy();
            });
        }
    }

    public enemyExplode (x: number, y: number)
    {
        const exp = this.explodeSprite.getFirstDead(true, x, y - 8, 'atlas', 'enemy-death-1', true);
        if (exp)
        {
            exp.setDepth(DEPTH.EXPLOSION);
            exp.anims.play('enemyExplode').on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
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
        if (this.isCheckSaving || this.isSaving || this.isSaved) return;

        this.isCheckSaving = true;

        // @ts-ignore
        const ui = this.children.getByName('smallDialogBox') || this.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 16, WIDTH / 2, HEIGHT / 8, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setName('smallDialogBox')
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0);
        ui.setActive(true).setVisible(true);

        const label = this.children.getByName('pressToSaveLabel') as Phaser.GameObjects.BitmapText  || this.add.bitmapText(WIDTH / 2, HEIGHT - 24, FONTS.ULTIMA_BOLD, `Press ${this.player.keysOptions[4].toLowerCase()} to save`, FONTS_SIZES.ULTIMA, 1)
            .setOrigin(0.5, 0)
            .setName('pressToSaveLabel')
            .setLetterSpacing(1)
            .setAlpha(1)
            .setTintFill(COLORS.STEEL_GRAY)
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0);
        label.setActive(true).setVisible(true);

        const check = this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event: { key: string; }) =>
        {
            if (event.key === this.player.keys.fire.originalEvent.key)
            {
                label?.setActive(false).setVisible(false);

                ui?.setActive(false).setVisible(false);

                this.saveGame();
            }
        });

        this.time.addEvent({
            delay: 500,
            callback: () =>
            {
                label?.setActive(false).setVisible(false);

                ui?.setActive(false).setVisible(false);

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
        const ui = this.children.getByName('mediumDialogBox') || this.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 8, WIDTH / 2, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setName('mediumDialogBox')
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0);
        ui.setActive(true).setVisible(true);

        let index = 0;

        const label = this.children.getByName('saveLabel') as Phaser.GameObjects.BitmapText || this.add.bitmapText(WIDTH / 2, HEIGHT - 64, FONTS.ULTIMA_BOLD, 'Save the game?', FONTS_SIZES.ULTIMA, 1)
            .setOrigin(0.5, 0)
            .setName('saveLabel')
            .setTintFill(COLORS.STEEL_GRAY)
            .setLetterSpacing(1)
            .setAlpha(1)
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0);
        label.setActive(true).setText('Save the game ?').setPosition(WIDTH / 2, HEIGHT - 64).setVisible(true);

        const yes = this.children.getByName('yes') as Phaser.GameObjects.BitmapText || this.add.bitmapText(WIDTH / 2 - 64, HEIGHT - 48, FONTS.MINIMAL, 'yes', FONTS_SIZES.MINIMAL, 1)
            .setOrigin(0.5, 0)
            .setName('yes')
            .setLetterSpacing(1)
            .setAlpha(1)
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0);
        yes.setActive(true).setTintFill(COLORS.EAST_BLUE).setVisible(true);

        const no = this.children.getByName('no') as Phaser.GameObjects.BitmapText || this.add.bitmapText(WIDTH / 2 + 64, HEIGHT - 48, FONTS.MINIMAL, 'no', FONTS_SIZES.MINIMAL, 1)
            .setOrigin(0.5, 0)
            .setName('no')
            .setLetterSpacing(1)
            .setAlpha(1)
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0);
        no.setActive(true).setTintFill(COLORS.RED).setVisible(true);

        const dialog = this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event: { key: string; }) =>
        {
            if (event.key === this.player.keys.right.originalEvent?.key)
            {
                index = 1;
                no.setTintFill(COLORS.EAST_BLUE);
                yes.setTintFill(COLORS.RED);
            }

            if (event.key === this.player.keys.left.originalEvent?.key)
            {
                index = 0;
                yes.setTintFill(COLORS.EAST_BLUE);
                no.setTintFill(COLORS.RED);
            }

            if (event.key === this.player.keys.fire.originalEvent.key && index === 0)
            {
                SaveLoadService.saveGameData(this);

                SaveLoadService.setSavedGameTime(this);

                this.sound.play('melo');

                this.isSaved = true;

                yes.setActive(false).setVisible(false);
                no.setActive(false).setVisible(false);

                label?.setText('')
                    .setPosition(WIDTH / 2, HEIGHT - 48)
                    .setText('Game Saved');

                this.time.addEvent({
                    delay: 1000,
                    callback: () =>
                    {
                        this.unPause();
                        label?.setActive(false).setVisible(false);
                        ui?.setActive(false).setVisible(false);
                        this.isSaving = false;
                        dialog.removeAllListeners();
                    },
                });
            }

            if (event.key === this.player.keys.fire.originalEvent.key && index === 1)
            {
                yes?.setActive(false).setVisible(false);

                no?.setActive(false).setVisible(false);

                this.unPause();

                label?.setActive(false).setVisible(false);

                ui?.setActive(false).setVisible(false);

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

        addEnemies(this);

        this.playMusic(properties?.music);

        // launch special functions from the room
        if (properties?.callFunction && properties?.callFunction.length)
        {
            const arr = properties.callFunction.split(',');
            arr.forEach(elm => this[elm]());
        }

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.cameras.main.startFollow(this.player, true, 0.4, 0.4).fadeIn(50);

        this.debugColliders();
    }

    private debugColliders ()
    {
        this.time.addEvent({
            delay: 2000,
            callback: () =>
            {
                // @ts-ignore
                console.log('ACTIVE COLLIDERS', this.physics.world.colliders._active);
            }
        });
    }

    public changeRoom (player: Player, door: TDoor)
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
        this.map = this.make.tilemap({ key: door.name, tileWidth: 16, tileHeight: 16 });

        // @ts-ignore
        this.sys.animatedTilesPlugin.init(this.map);

        this.map.tilesets.forEach((tileset, i) =>
        {
            this.map.addTilesetImage(this.map.tilesets[i].name, this.map.tilesets[i].name, 16, 16);
        });

        this.playerRoomName = door.name;

        const properties = this.convertTiledObjectProperties(this.map.properties);

        LayerService.addLayers(this);

        // ColliderService.addColliders(this);

        switch (door.side)
        {
            case 'left':
                player.body.reset(door.door.x - 20, door.door.y + 15);
                break;
            case 'right':
                player.body.reset(door.door.x + 36, door.door.y + 15);
                break;
            case 'top':
                player.body.reset(door.door.x + player.body.halfWidth, door.door.y - 48);
                break;
            case 'bottom':
                player.body.reset(door.door.x + player.body.halfWidth, door.door.y + 32);
                break;
        }

        addEnemies(this);

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

        this.cameras.main.setDeadzone(0, 0).startFollow(this.player, true, 0.4, 0.1, 0, 20).fadeIn(50);

        this.playerIsPassingDoor = false;

        this.isChangingRoom = false;

        this.isSaved = false;

        this.debugColliders();
    }

    private destroyRoom (): void
    {
        this.physics.world.colliders.destroy();

        this.map.destroy();

        this.heartGroup.forEach(e =>
        {
            const body = e.body as Phaser.Physics.Arcade.Body;
            body.setEnable(false);
            e.setActive(false).setVisible(false);
        });

        this.powerUpGroup.forEach(e => e.destroy());
        this.powerUpGroup = [];

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
            e.setActive(false).setVisible(false);
        });
        this.enemyGroup = [];

        this.projectileGroup.forEach(projectile => projectile.setActive(false).setVisible(false));

        const element = this.children.list.find(e => e.name === 'waterElement');
        element?.destroy();

        this.npcGroup.forEach(e => e.destroy());
        this.npcGroup = [];

        // if (this.demon) this.demon.destroy();
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

    //#region handle powerUps
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
                    const props = SWORDS.find(e => e.id === element.properties.id) as TSwordConfig;

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
                    const props = BOWS.find(e => e.id === element.properties.id) as TBowConfig;

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
                    const props = SHIELDS.find(e => e.id === element.properties.id) as TShieldConfig;

                    const shield = new PowerUp(this, element.x as unknown as number + TILE_SIZE / 2, element.y as unknown as number - TILE_SIZE, {
                        key: 'stuff',
                        id: element.properties.id,
                        properties: props,
                        category: 'shield'
                    });

                    this.powerUpGroup.push(shield);
                }

                if (element.properties.id >= 20)
                {
                    const props = EQUIPMENT.find(e => e.id === element.properties.id) as TEquipmentConfig;

                    const equipment = new PowerUp(this, element.x as unknown as number + TILE_SIZE / 2, element.y as unknown as number - TILE_SIZE, {
                        key: 'stuff',
                        id: element.properties.id,
                        properties: props,
                        category: 'equipment'
                    });

                    this.powerUpGroup.push(equipment);
                }
            }
        });
    }

    public getPowerUp (elm: PowerUp)
    {
        this.playSfx('powerUp');

        const inventory = this.player.inventoryManager.getInventory();

        let title = '';

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
            if (elm.id === 23)
            {
                this.player.addJumpBoots();
            }
            else
            {
                const props: TEquipmentConfig = elm.properties as TEquipmentConfig;

                inventory.def += props.defense;
            }
        }

        inventory.powerUp.push(elm.id);

        this.setPause(true, true, false, false);

        // @ts-ignore
        const ui = this.children.getByName('powerUpDialogBox') || this.add.rexNinePatch(WIDTH / 2, HEIGHT / 2, WIDTH / 4 * 3, HEIGHT / 2, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setName('powerUpDialogBox')
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0, 0);
            ui.setActive(true).setVisible(true);

        let txt = '';
        // sword power up
        if (elm.category === 'sword')
        {
            const props: TSwordConfig = elm.properties as TSwordConfig;
            title = `${props.name.toUpperCase()}`;

            txt = `${props.name.toUpperCase()} \n\n ${props.desc} \n\n ATK: ${props.damage}  RATE: ${props.rate}`;
        }
        // shield power up
        if (elm.category === 'shield')
        {
            const props: TShieldConfig = elm.properties as TShieldConfig;
            title = `${props.name.toUpperCase()}`;

            txt = `${props.name.toUpperCase()} \n\n ${props.desc} \n\n DEF: ${props.defense}`;
        }
        // bow power up
        if (elm.category === 'bow')
        {
            const props: TBowConfig = elm.properties as TBowConfig;
            title = `${props.name.toUpperCase()}`;

            txt = `${props.name.toUpperCase()} \n\n ${props.desc} \n\n ATK: ${props.damage}  RATE: ${props.rate}  SPEED: ${props.speed}`;
        }
        // equipment power up
        if (elm.category === 'equipment')
        {
            const props: TEquipmentConfig = elm.properties as TEquipmentConfig;
            title = `${props.name.toUpperCase()}`;

            txt = `${props.name.toUpperCase()} \n\n ${props.desc} \n\n DEF: ${props.defense}`;
        }


        const powerUpDesc = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.ULTIMA_BOLD, txt, FONTS_SIZES.ULTIMA_BOLD, 1)
            .setOrigin(0.5, 0.5)
            .setAlpha(1)
            .setTintFill(COLORS.STEEL_GRAY)
            .setWordTint(title, 1, true, COLORS.RED, COLORS.RED, COLORS.ORANGE, COLORS.ORANGE)
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0);

        console.log(ui);

        elm.body.setEnable(false);
        elm.setDepth(DEPTH.UI_TEXT).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setPosition(ui.x + ui.width / 2 - elm.width, ui.y - ui.height / 2 + elm.height);

        const dialog = this.input.keyboard.once(this.player.getFireKeyEventName(), () =>
        {
            elm.destroy();
            powerUpDesc.destroy();
            ui.setActive(false).setVisible(false);
            dialog.removeAllListeners();
            this.unPause();
        });
    }
    //#endregion

    public checkObjectsLayerIndex (layerName: string): Phaser.Tilemaps.ObjectLayer | null
    {
        const arr = this.map.objects.find((elm) => elm.name === layerName);

        if (!arr)
        {
            return null;
        }

        return arr;
    }

    /**
     * Convert a Tiled Object Properties from array to an object
     * @param properties 
     */
    public convertTiledObjectProperties (properties: any)
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

    public showEnemyDamage (enemy: Enemy | Demon | HellBeast, damage: number)
    {
        const damageText: TopHeadText = this.topHeadTextGroup.getFirstDead(true, enemy.body.center.x, enemy.body.top, FONTS.GALAXY, undefined, true);

        if (!damageText) return;

        damageText.setAlpha(1).setActive(true).setVisible(true);
        damageText.showDamageText(enemy, damage);
    }

    // HANDLE ROOM ELEMENTS
    public openDoor (door)
    {
        door.openDoor();
    }

    public hideBossDoor ()
    {
        const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getForegroundLayers(this).find(l => l.name === 'foreground/bossDoor') as Phaser.Tilemaps.TilemapLayer;
        layer.setAlpha(0);
    }

    public callBringerOfDeath (): boolean
    {
        const swords = this.player.swordManager.getSwords().filter(swd => swd.id === 8);

        if (swords.length)
        {
            LayerService.showSecretPath(this);

            return false;
        }

        return true;
    }

    public callWaterQueen (): boolean
    {
        const inventory = this.player.inventoryManager.getInventory();
        if (inventory.waterElement)
        {
            LayerService.showSecretPath(this);

            return false;
        }

        const deadBosses = SaveLoadService.getDeadBoss(this);
        if (deadBosses.includes(2))
        {
            LayerService.showSecretPath(this);

            return false;
        }

        return true;
    }

    public callHellBeast ()
    {
        const inventory = this.player.inventoryManager.getInventory();

        if (inventory.fireElement) return;

        this.hellBeast = new HellBeast(this, -100, -100, { key: 'hell-beast-idle', name: 'hellBeast' });

        this.enemyGroup.push(this.hellBeast);
    }

    public addElementCheck ()
    {
        const zone = this.add.zone(34 * 16, 16 * 16, 32, 32).setOrigin(0, 0.5);

        this.physics.world.enable(zone);

        const body = zone.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);

        this.physics.add.overlap(this.player, zone, (_player, _zone) =>
        {
            const zonebody = _zone.body as Phaser.Physics.Arcade.Body;

            this.player.body.reset(zonebody.center.x, zonebody.center.y);
            this.player.anims.stop();
            this.player.setFrame('adventurer-idle-00');

            const { x, y } = zonebody.center;

            zonebody.setEnable(false);

            let fireElement: Phaser.GameObjects.Sprite;

            let waterElement: Phaser.GameObjects.Sprite;

            const inventory = this.player.inventoryManager.getInventory();

            if (inventory.fireElement)
            {
                this.player.body.stop();
                this.player.isPause = true;

                fireElement = this.add.sprite(x, y, 'atlas', 'fire-element_0').play('fire-element').setDepth(DEPTH.FRONT_LAYER + 1);

                this.tweens.add({
                    targets: fireElement,
                    duration: 1000,
                    x: 31 * 16
                });
            }

            if (inventory.waterElement)
            {
                this.player.body.stop();
                this.player.isPause = true;

                waterElement = this.add.sprite(x, y, 'atlas', 'water-element_0').play('water-element').setDepth(DEPTH.FRONT_LAYER + 1);

                this.tweens.add({
                    targets: waterElement,
                    duration: 1000,
                    x: 39 * 16
                });
            }

            // start the final boss
            if (inventory.fireElement && inventory.waterElement)
            {
                this.time.addEvent({
                    delay: 2000,
                    callback: () =>
                    {
                        this.flashCamera(1000);
                        fireElement.destroy();
                        waterElement.destroy();
                        this.callDemon();
                        zone.destroy();
                    }
                });
            }
            else
            {
                this.time.addEvent({
                    delay: 2000,
                    callback: () =>
                    {
                        if (fireElement)
                        {
                            this.tweens.add({
                                targets: fireElement,
                                duration: 500,
                                x: this.player.body.center.x,
                                scale: 0,
                                onComplete: () =>
                                {
                                    fireElement.destroy();
                                }
                            });
                        }

                        if (waterElement)
                        {
                            this.tweens.add({
                                targets: waterElement,
                                duration: 500,
                                x: this.player.body.center.x,
                                scale: 0,
                                onComplete: () =>
                                {
                                    waterElement.destroy();
                                }
                            });
                        }

                        this.player.isPause = false;
                    }
                });
            }
        });
    }

    public callDemon ()
    {
        const deadBosses = SaveLoadService.getDeadBoss(this);

        if (deadBosses.includes(3))
        {
            return;
        }
        this.stopMusic();
        this.demon = new Demon(this, 35 * 16 - 268 / 2, 8 * 16 - 192 / 2, { key: 'finalBoss', name: 'demon' });
        this.enemyGroup.push(this.demon);
    }

    public addWaterElement ()
    {
        if (this.player.inventoryManager.getInventory().waterElement === true)
        {
            return;
        }

        const waterElement = this.physics.add.sprite(18 * 16 + 8, 104 * 16, 'atlas', 'water-element_0')
            .play('water-element')
            .setDepth(DEPTH.FRONT_LAYER + 10)
            .setName('waterElement');

        this.physics.world.enable(waterElement);

        waterElement.body.setAllowGravity(false).setSize(10, 18).setOffset(27, 23);

        const overlap = this.physics.add.overlap(this.player, waterElement, () =>
        {
            const inventory = this.player.inventoryManager.getInventory();

            inventory.waterElement = true;

            waterElement.destroy();

            this.setPause();

            // @ts-ignore
            const ui = this.add.rexNinePatch(WIDTH / 2, HEIGHT / 2, WIDTH / 4 * 3, HEIGHT / 2, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
                .setOrigin(0.5, 0.5)
                .setDepth(DEPTH.UI_BACK)
                .setScrollFactor(0, 0)
                .setVisible(true);

            const powerUpDesc = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONTS.ULTIMA_BOLD, 'you get the water element', FONTS_SIZES.ULTIMA_BOLD, 1)
                .setOrigin(0.5, 0.5)
                .setAlpha(1)
                .setDepth(DEPTH.UI_TEXT)
                .setScrollFactor(0, 0);

            const dialog = this.input.keyboard.once(this.player.getFireKeyEventName(), () =>
            {
                powerUpDesc.destroy();
                ui.destroy();
                dialog.removeAllListeners();
                this.unPause();
                overlap.destroy();
            });
        });
    }

    // CAMERA EFFECTS
    public shakeCamera (duration: number | undefined, intensity: number = 0.025, playSnd: boolean = true)
    {
        if (!this.cameraIsShaking)
        {
            this.cameraIsShaking = true;
            this.cameras.main.shake(duration, intensity);

            if (playSnd) this.sound.play('impact', { rate: 0.5 });

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

    public flashCamera (time: number = 1000)
    {
        this.cameras.main.flash(time);
    }

    private resetAnimatedTiles ()
    {
        const str = JSON.stringify(this.map.tilesets[5].tileData);

        const blob = new Blob([str], { type: 'text/html' });
        window.open(URL.createObjectURL(blob));
    }
}
