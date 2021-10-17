import { Scene } from 'phaser';
import animatedTilesPlugin from '../plugins/AnimatedTiles.js';
import { WIDTH, HEIGHT, FONTS, SCENES_NAMES, FONTS_SIZES } from '../constant/config';
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
import countDeadEnemies from '../utils/counDeadEnemies';
import ColliderService from '../services/ColliderService';
import LayerService from '../services/LayerService';
import GenerateWorldRoom from '../utils/GenerateWorldRoom';
import Player from '../player/Player';
import { TNpc } from '../types/types';
import Npc from '../npc/Npc';
import Enemy from '../enemies/Enemy';
import SaveLoadService from '../services/SaveLoadService';
import Cloud from '../props/Cloud';
import { COLORS } from '../constant/colors';
import Projectile from '../enemies/Projectile';






export default class GameScene extends Scene
{
    public state: { displayPowerUpMsg: boolean; };
    public map: Phaser.Tilemaps.Tilemap;
    public firstTimestamp: number;
    public giveLifeGroup: Phaser.GameObjects.Sprite[];
    public powerups: PowerUp[];
    public enemyGroup: (Enemy | Dragon | HellBeast | Demon)[];
    public pathGroup: Phaser.GameObjects.PathFollower[];
    public platformGroup: Platform[];
    public projectileGroup: Projectile[];
    public npcGroup: TNpc[];
    public platformSpikeGroup: PlatformSpike[];
    public breathGroup: any[];
    public skullGroup: any[];
    public musicGroup: Phaser.Sound.BaseSound[];
    public hauntedForest: Phaser.Sound.BaseSound;
    public angelCalling: Phaser.Sound.BaseSound;
    public townTheme: Phaser.Sound.BaseSound;
    public townAttackTheme: Phaser.Sound.BaseSound;
    public graveyardTheme: Phaser.Sound.BaseSound;
    public dragonFight: Phaser.Sound.BaseSound;
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
    public playerHurt: boolean;
    public thunderOnPlayer: boolean;
    public thunderPower: any;
    public fireballs: any;
    public breathBlue: any;
    public breathFire: any;
    public skullHeads: any;
    public playerFlashTween: Phaser.Tweens.Tween;
    public explodeSprite: Phaser.GameObjects.Group;
    public weaponParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    public weaponParticleEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
    public playerIsPassingDoor: boolean;
    public onSismic: boolean;
    public isTheEnd: boolean;
    public battleWithBoss: boolean = false;
    public cameraIsShaking: boolean;
    public isPausing: boolean;
    public modalText: Phaser.GameObjects.BitmapText;
    public msgtext: Phaser.GameObjects.BitmapText;
    public fadingTween: Phaser.Tweens.Tween;
    public lifeText: Phaser.GameObjects.BitmapText;
    public lastPosition: number;
    public head: any;
    public position: any;
    public continueBtn: any;
    public playerDead: boolean;
    public round: Phaser.GameObjects.Sprite;
    public tween: Phaser.Tweens.Tween;
    public hitTimer: Phaser.Time.TimerEvent;
    public giveLife: Phaser.GameObjects.Sprite;
    public bossMusic: Phaser.Sound.BaseSound;
    public msgText: Phaser.GameObjects.BitmapText;
    public playerPosition: string;
    public demon: Demon;
    public escapeTimer: Phaser.Time.TimerEvent | null;
    public isChangingRoom: boolean;
    public colliderLayer: Phaser.Tilemaps.TilemapLayer;
    public oldman: Oldman;
    public dragon: Dragon;
    public angel: Angel;
    public hellBeast: HellBeast;
    public escapeParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    public escapeParticleEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
    public showMsg: Phaser.GameObjects.BitmapText;
    public player: Player;
    public backUi: Phaser.GameObjects.Image;
    private isCheckSaving: boolean = false;
    private isSaving: boolean;
    public projectiles: Phaser.Physics.Arcade.Group;

    constructor ()
    {
        super('gameScene');
        this.state = {
            displayPowerUpMsg: false,
        };
    }

    public init ()
    {
        // set health text
        // this.player?.HealthUiText.setText(`${this.inventory.life}%${this.inventory.maxLife}`);
    }

    // ====================================================================
    public preload ()
    {
        this.load.scenePlugin({
            key: 'animatedTilesPlugin',
            url: animatedTilesPlugin,
            sceneKey: 'animatedTile'
        });
    }

    // ====================================================================
    public create ()
    {
        // initialize the map and tileset
        this.map = this.make.tilemap({ key: 'map3', tileWidth: 16, tileHeight: 16 });
        this.map.tilesets.forEach((tileset, i) =>
        {
            this.map.addTilesetImage(this.map.tilesets[i].name, this.map.tilesets[i].name, 16, 16);
        });
        // this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);

        // initialize the time
        this.firstTimestamp = new Date().getTime();

        // if (!localStorage.getItem('time'))
        // {
        //     localStorage.setItem('time', '0');
        // }



        // @ts-ignore
        this.backUi = this.add.rexNinePatch(WIDTH / 2, HEIGHT / 2, WIDTH / 4 * 3, HEIGHT / 4 * 3, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setDepth(1999)
            .setScrollFactor(0)
            .setVisible(false);


        // ====================================================================
        // Groups that need to be destroyed on changing room
        this.giveLifeGroup = [];
        this.powerups = [];
        this.enemyGroup = [];
        this.pathGroup = [];
        this.platformGroup = [];
        this.projectileGroup = [];
        this.npcGroup = [];
        this.platformSpikeGroup = [];
        this.breathGroup = [];
        this.skullGroup = [];


        // ====================================================================
        // AMBIENT MUSIC
        this.musicGroup = [];
        this.hauntedForest = this.sound.add('hauntedForest', { volume: 1, loop: true });
        this.angelCalling = this.sound.add('angelCalling', { volume: 1, loop: true });
        this.townTheme = this.sound.add('townTheme', { volume: 1, loop: true });
        this.townAttackTheme = this.sound.add('townAttackTheme', { volume: 1, loop: true });
        this.graveyardTheme = this.sound.add('graveyardTheme', { volume: 1, loop: true });
        this.dragonFight = this.sound.add('dragonFight', { volume: 1, loop: true });
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
            this.dragonFight,
            this.castleTheme,
            this.churchTheme,
            this.hellBeastFight,
            this.demonFight1,
            this.demonFight2,
            this.demonLighting,
            this.escapeTheme,
        );

        // ====================================================================
        // PLAYER SECTION
        this.player = new Player(this, 80, 170, { key: 'playerAtlas' }); // 458, 122 4 * 16, 6 * 16

        if (!SaveLoadService.loadGameData())
        {
            SaveLoadService.saveNewGameData(this.player.inventory);
        }

        this.playerHurt = false;
        this.thunderOnPlayer = false;

        this.thunderPower = this.physics.add.group({
            defaultKey: 'thunder-storm',
            maxSize: 1,
            allowGravity: false
        });
        // fireball
        this.fireballs = this.physics.add.group({
            classType: Projectile,
            // defaultKey: 'fireBall',
            maxSize: 3,
            allowGravity: false
        });
        // enemies projectiles
        this.projectiles = this.physics.add.group({
            classType: Projectile,
            maxSize: 30,
            allowGravity: false,
        });
        // breathBlue
        this.breathBlue = this.physics.add.group({
            defaultKey: 'finalBoss',
            maxSize: 1,
            allowGravity: false
        });
        // breath-fire
        this.breathFire = this.physics.add.group({
            defaultKey: 'finalBoss',
            maxSize: 1,
            allowGravity: false
        });
        this.skullHeads = this.physics.add.group({
            defaultKey: 'finalBoss',
            frame: ['fire-skull1', 'fire-skull2', 'fire-skull3', 'fire-skull4', 'fire-skull5', 'fire-skull6', 'fire-skull7'],
            maxSize: 8,
            allowGravity: false
        });
        // this.playerFlashTween = null;

        // ====================================================================
        // loading saved game
        // if (this.data.systems.settings.data.loadSavedGame)
        // {

        // }
        // creating new game
        // if (!localStorage.getItem('RevengeOfAcharis'))
        // {
        //     this.player.inventory.savedPositionX = 4 * 16;
        //     this.player.inventory.savedPositionY = 9 * 16;
        //     this.player.inventory.map = 'map2';
        //     const s = JSON.stringify(this.player.inventory);
        //     localStorage.setItem('RevengeOfAcharis', s);
        //     this.loadGame();
        // }
        // else
        // {
        //     this.loadGame();
        // }

        this.loadGame();

        this.explodeSprite = this.add.group({
            defaultKey: 'enemies',
            // frames: ['enemy-death-1', 'enemy-death-2', 'enemy-death-3', 'enemy-death-4', 'enemy-death-5'],
            maxSize: 50,
            // allowGravity: false
        });


        // particles for map tiles exploded
        this.weaponParticles = this.add.particles('blackPixel');
        this.weaponParticleEmitter = this.weaponParticles.createEmitter({
            angle: { min: -30, max: -150 },
            speed: { min: 200, max: 400 },
            // frame: arr,
            quantity: 16,
            lifespan: 3000,
            alpha: 1,
            scale: 0.5,
            // rotate: { start: 0, end: 3, ease: 'Linear' },
            gravityY: 500,
            on: false,
        });


        // LAVA RISE
        this.playerIsPassingDoor = false;
        this.onSismic = false;
        this.isTheEnd = false; // My only friend, the end


        // ====================================================================
        // CAMERA
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1).setRoundPixels(true);
        this.cameras.main.transparent = true;
        this.cameraIsShaking = false;
        this.cameras.main.fadeIn(200);

        // set the fps to 120 for good collisions at high speed
        // this.physics.world.setFPS(120);

        // toggler for pause button
        this.isPausing = false;

        // DEBUG / HELPERS

        GenerateWorldRoom.generate(this);
    }

    // ====================================================================
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

    public setPause ()
    {
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
        if (this.physics.world)
        {
            this.physics.resume();
        }

        this.anims.resumeAll();

        this.sound.resumeAll();
    }

    // ====================================================================

    public playMusic (music)
    {
        // return; //disabled music for working on walk sounds
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
            { // && this.musicGroup[i].key === music
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

    // ====================================================================
    public getPowerUp (elm: { powerUpState: { ability: string; id: string | number; text: string | string[] | undefined; }; destroy: () => void; })
    {
        this.state.displayPowerUpMsg = true;

        if (elm.powerUpState.ability === 'bow')
        {
            this.player.addBow();
        }
        else if (elm.powerUpState.ability === 'jumpBoots')
        {
            this.player.addJumpBoots();
        }
        else
        {
            this.player.inventory[elm.powerUpState.ability] = true;
        }
        this.sound.play('powerUp');
        this.player.inventory.powerUp[elm.powerUpState.id] = 1;

        this.pauseGamePowerUp();
        const pos = this.getCamCenter();
        this.msgtext = this.add.bitmapText(pos.x, pos.y, FONTS.MINIMAL, elm.powerUpState.text, 12, 1)
            .setOrigin(0.5, 0.5)
            .setAlpha(1)
            .setDepth(210);
        elm.destroy();

        this.fadingTween = this.tweens.add({
            targets: [this.msgtext],
            ease: 'Sine.easeInOut',
            duration: 3000,
            delay: 200,
            repeat: 0,
            yoyo: false,
            alpha: {
                getStart: () => 1,
                getEnd: () => 0,
            },
            onComplete: () =>
            {
                this.msgtext.destroy();
                // this.state.displayPowerUpMsg = false;
            },
        });
    }

    // ====================================================================
    // GAME PAUSE
    public pauseGamePowerUp ()
    {
        if (this.isPausing)
        {
            return;
        }
        if (!this.isPausing && !this.player.playerState.pause)
        {
            this.isPausing = true;
            this.player.playerState.pause = true;
            this.physics.pause();
            this.player.anims.play('adventurer-idle');
            // this.player.setFrame('adventurer-cast-01');
            this.time.addEvent({
                delay: 3000,
                callback: () =>
                {
                    this.isPausing = false;
                    this.player.playerState.pause = false;
                    this.scene.scene.physics.resume();
                    this.player.anims.resume(this.player.anims.currentFrame);
                }
            });

            return;
        }
    }

    public pauseGame ()
    {
        if (this.isPausing)
        {
            return;
        }

        if (!this.isPausing && !this.player.playerState.pause)
        {
            this.isPausing = true;

            SaveLoadService.setSavedGameTime(this);
            this.player.anims.play('stand');
            this.player.playerState.pause = true;
            this.physics.pause();
            const pos = this.getCamCenter();

            this.lifeText = this.add.bitmapText(pos.x, pos.y, FONTS.MINIMAL, 'PAUSE', 14, 1)
                .setDepth(300)
                .setOrigin(0.5, 0.5)
                .setAlpha(1);

            this.time.addEvent({
                delay: 120,
                callback: () =>
                {
                    this.isPausing = false;
                },
            });

            return;
        }
        this.isPausing = true;
        this.events.emit('unpause');
        this.lifeText.destroy();
        this.player.playerState.pause = false;
        this.scene.scene.physics.resume();
        this.player.anims.resume(this.player.anims.currentFrame);
        this.time.addEvent({
            delay: 200,
            callback: () =>
            {
                this.isPausing = false;
            },
        });
    }

    public choose ()
    {
        this.player.chooseDone = true;
        if (this.player.playerState.pause)
        {
            if (this.lastPosition === 1)
            {
                this.lastPosition = 0;
            }
            else
            {
                this.lastPosition += 1;
            }

            this.head.y = this.position[this.lastPosition];

            this.time.addEvent({
                delay: 300,
                callback: () =>
                {
                    this.player.chooseDone = false;
                },
            });
        }
    }

    public launch ()
    {
        this.player.chooseDone = true;
        if (this.player.playerState.pause)
        {
            if (this.lastPosition === 0)
            {
                this.events.emit('unpause');
                this.player.playerState.pause = false;
                this.scene.scene.physics.resume();
                this.player.anims.resume(this.player.anims.currentFrame);
                this.continueBtn.destroy();
                this.firstTimestamp = new Date().getTime();
                this.time.addEvent({
                    delay: 300,
                    callback: () =>
                    {
                        this.player.chooseDone = false;
                    },
                });
            }
            if (this.lastPosition === 1)
            {
                // this.saveGame(this.player);
                this.time.addEvent({
                    delay: 300,
                    callback: () =>
                    {
                        this.player.chooseDone = false;
                    },
                });
            }
        }
    }

    // ====================================================================
    public playerIsHit (elm: Enemy | Projectile)
    {
        if (elm.enemyState.damage === 0)
        {
            return;
        }

        this.player.looseLife(elm);
    }

    public playerOnSpikes (int: number)
    {
        if (!this.playerHurt)
        {
            this.playerHurt = true; // flag
            this.player.playerState.runSpeed = 285;
            this.player.hitSfx.play();
            this.player.inventory.life -= int;
            if (this.player.inventory.life <= 30)
            {
                this.sound.play('lowLifeSfx');
            }
            this.playerFlashTween = this.tweens.add({
                targets: this.player,
                ease: 'Sine.easeInOut',
                duration: 200,
                delay: 0,
                repeat: 5,
                yoyo: true,
                alpha: {
                    getStart: () => 0,
                    getEnd: () => 1,
                },
                onComplete: () =>
                {
                    this.player.alpha = 1;
                    this.playerHurt = false;
                },
            });
            // if player is dead, launch deadth sequence
            if (this.player.inventory.life <= 0)
            {
                this.playerDeathSequence();
            }
            this.events.emit('setHealth', { life: this.player.inventory.life }); // set health dashboard scene
        }
    }

    // ====================================================================
    public playerDeathSequence ()
    {
        this.player.playerState.dead = true;
        this.playerDead = true;
        this.physics.pause();
        if (this.thunderGateSfx.isPlaying)
        {
            this.thunderGateSfx.stop();
        }
        this.input.enabled = false;
        this.player.anims.play('die');
        if (this.playerFlashTween) this.playerFlashTween.stop();
        this.player.inventory.life = 0;
        this.player.setDepth(2000);

        this.round = this.add.sprite(this.cameras.main.scrollX, this.cameras.main.scrollY, 'blackpixel');
        this.round
            .setOrigin(0, 0)
            .setDepth(1000)
            .setAlpha(0)
            .setTintFill(0x272638) // 0C1D1C
            .setDisplaySize(WIDTH, HEIGHT);

        this.sound.play('playerDead', { volume: 1 });

        this.tween = this.tweens.add({
            targets: this.round,
            ease: 'Sine.easeInOut',
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            duration: 2500,
            delay: 800,
            onComplete: () =>
            {
                this.input.enabled = true;
                this.playerIsDead();
            },
        });
    }

    public playerIsDead ()
    {
        SaveLoadService.setPlayerDeathCount();

        SaveLoadService.setSavedGameTime(this);

        this.stopMusic();

        this.player.playerState.dead = false;
        this.demonFight1.stop();
        this.demonFight2.stop();
        this.demonLighting.stop();
        this.thunderGateSfx.stop();
        this.scene.start(SCENES_NAMES.GAMEOVER);
    }


    // ====================================================================
    public enemyIsHit (_weapon, _enemy)
    {
        const enemy = _enemy as Enemy;

        // console.log(this.player.swordManager.getCurrentSword().damage * this.player.inventory.level / 1.3)
        // const str = Math.ceil(Math.sqrt(Math.pow(this.player.inventory.level, 4)));
        const str = Math.ceil(Math.sqrt(Math.pow(this.player.inventory.level, 3)) / 10);
        enemy.looseLife(Math.floor(this.player.swordManager.getCurrentSword().damage * str));

        // if (!el.isHit)
        // {
        //     el.isHit = true;

        //     // if skeleton not rised don't do anything
        //     if (enemy instanceof Skeleton)
        //     {
        //         if (!el.isAttacking)
        //         {
        //             el.isHit = false;

        //             return;
        //         }
        //     }
        //     // destroy flames
        //     if (enemy instanceof Flames)
        //     {
        //         return;
        //     }

        //     // destroy the weapon
        //     if (this.player.playerState.selectedWeapon === 'bow')
        //     {
        //         this.player.bowKill(playerWeapon, false);
        //     }

        //     // enemy loose life
        //     el.looseLife(this.player.swordManager.getCurrentSword().damage * (this.player.inventory.level + 1));
        //     el.setTintFill(0xDDDDDD);

        //     this.time.addEvent({
        //         delay: 50,
        //         callback: () =>
        //         {
        //             if (!el.active) return;
        //             el.clearTint();
        //         },
        //     });

        //     this.hitTimer = this.time.addEvent({
        //         delay: 220,
        //         callback: () =>
        //         {
        //             el.isHit = false;
        //         },
        //     });
        // }
        // enemy is dead
        // if (el.enemyState.life <= 0)
        // {
        //     if (el.name === 'demon' && el.phase === 0)
        //     {
        //         el.clearTint();
        //         el.startPhase1();
        //         this.battleWithBoss = true;

        //         return;
        //     }

        //     if (el.name === 'demon' && el.phase === 2)
        //     {
        //         el.clearTint();
        //         el.startPhase3();

        //         return;
        //     }

        //     el.clearTint();
        //     el.playSfxDeath();
        //     el.explode();
        //     // kill the enemy

        //     this.player.addXp();
        //     this.giveLife = this.physics.add.sprite(el.x, el.y, 'heart').setDataEnabled();
        //     this.giveLife.setDepth(105);
        //     this.giveLife.data.set('health', el.enemyState.giveLife);
        //     this.giveLife.body = this.giveLife.body as Phaser.Physics.Arcade.Body;
        //     this.giveLife.body.setSize(23, 21);
        //     this.giveLife.anims.play('heart');
        //     this.giveLifeGroup.push(this.giveLife);
        //     this.enemyExplode(el.x, el.y);
        //     this.enemyDestroy(el);
        // }
    }

    public enemyDestroy (e)
    {
        e.destroy();
        countDeadEnemies();
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



    // ====================================================================
    // LOAD ROOM
    public loadGame ()
    {
        const gameData = SaveLoadService.loadGameData();

        if (gameData)
        {
            this.player.inventory = JSON.parse(gameData);
            this.player.HealthUiText.setText(`${this.player.inventory.life}%${this.player.inventory.maxLife}`);
        }

        this.player.x = this.player.inventory.savedPositionX;
        this.player.y = this.player.inventory.savedPositionY;

        this.startRoom(this.player.inventory.map);
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

        const check = this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (event.key === this.player.keys.fire.originalEvent.key)
            {
                label?.destroy();
                ui?.destroy();
                this.saveGame();
            }
        });

        this.time.addEvent({
            delay: 1000,
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

        const dialog = this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
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
        });

    }

    public startRoom (room: string)
    {
        // clean up
        this.cameras.main.fadeOut(50);
        this.physics.world.colliders.destroy();
        this.map.destroy();
        this.giveLifeGroup.forEach(e => e.destroy());
        this.powerups.forEach(e => e.destroy());
        this.enemyGroup.forEach(e => e.destroy());
        if (this.thunderGateSfx.isPlaying)
        {
            this.thunderGateSfx.stop();
        }
        this.stopMusic();
        // create room
        this.map = this.make.tilemap({ key: room, tileWidth: 16, tileHeight: 16 });
        this.map.tilesets.forEach((tileset, i) =>
        {
            this.map.addTilesetImage(this.map.tilesets[i].name, this.map.tilesets[i].name, 16, 16);
        });
        this.playerPosition = room;
        // this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);
        const properties = this.convertTiledObjectProperties(this.map.properties);
        // this.addParaBack(properties.paraBack);
        // this.addParaMiddle(properties.paraMiddle);
        // this.addParaMiddle2(properties.paraMiddle2);
        LayerService.addLayers(this);
        // this.addLayers();
        // this.addDoors();
        this.player.x = this.player.inventory.savedPositionX + 24;
        this.player.y = this.player.inventory.savedPositionY;
        ColliderService.addColliders(this);
        // this.addColliders();
        // this.addPowerUp();
        this.addPlayerSfx();
        this.addEnemies();
        // this.addMovingPlatform();
        this.playMusic(properties?.music);
        // launch special functions from the room
        if (properties?.callFunction && properties?.callFunction.length)
        {
            const arr = properties.callFunction.split(',');
            arr.forEach(elm => this[elm]());
        }
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
        this.cameras.main.fadeIn(50);
        this.time.addEvent({
            delay: 1000,
            callback: () =>
            {
                this.events.emit('loadingDone');
            },
        });
    }

    public changeRoom (player, doorP)
    {
        // if boss not dead return!
        if (this.battleWithBoss) return;
        // if door closed, return!!
        if (doorP && doorP.alpha === 1)
        {
            return;
        }
        if (this.playerIsPassingDoor)
        {
            return;
        }
        this.playerIsPassingDoor = true;
        console.clear();
        // destroy leaving room
        this.cameras.main.fadeOut(50);
        this.physics.world.colliders.destroy();
        this.map.destroy();
        this.giveLifeGroup.forEach(e => e.destroy());
        this.powerups.forEach(e => e.destroy());
        this.powerups = [];
        this.pathGroup.forEach(e => e.destroy());
        this.pathGroup = [];
        this.platformGroup.forEach(e => e.destroy());
        this.platformGroup = [];
        this.platformSpikeGroup.forEach(e => e.destroy());
        this.platformSpikeGroup = [];
        this.enemyGroup.forEach(e => e.destroy());
        this.enemyGroup = [];
        this.npcGroup.forEach(e => e.destroy());
        this.npcGroup = [];
        if (this.demon) this.demon.destroy();
        if (this.escapeTimer) this.escapeTimer = null;

        // create new room
        this.map = this.make.tilemap({ key: doorP.name, tileWidth: 16, tileHeight: 16 });
        this.map.tilesets.forEach((tileset, i) =>
        {
            this.map.addTilesetImage(this.map.tilesets[i].name, this.map.tilesets[i].name, 16, 16);
        });
        this.playerPosition = doorP.name;
        const properties = this.convertTiledObjectProperties(this.map.properties);
        LayerService.addLayers(this);

        ColliderService.addColliders(this);

        switch (doorP.side)
        {
            case 'left':
                player.body.reset(doorP.door.x - 20, doorP.door.y + 4);
                break;
            case 'right':
                player.body.reset(doorP.door.x + 20, doorP.door.y + 4);
                break;
            case 'top':
                player.body.reset(doorP.door.x + player.body.halfWidth, doorP.door.y - 20);
                break;
            case 'bottom':
                player.body.reset(doorP.door.x + player.body.halfWidth, doorP.door.y + 24);
                break;
        }
        this.addMovingPlatform();
        this.addEnemies();
        ColliderService.addColliders(this);

        this.addPowerUp();
        this.addPlayerSfx();
        this.playMusic(properties?.music);
        // launch special functions from the room
        if (properties?.callFunction && properties.callFunction.length)
        {
            const arr = properties.callFunction.split(',');
            arr.forEach(elm => this[elm]());
        }


        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
        this.cameras.main.fadeIn(50);
        this.physics.world.setBoundsCollision();
        this.playerIsPassingDoor = false;
        this.isChangingRoom = false;
        // console.log(this);
    }

    // ====================================================================
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
        this.player.walkk = this.sound.add(walkSound, { volume: 0.6, rate: 1 });
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
            if (this.player.inventory.powerUp[element.properties.id] === 0)
            {
                if (!element.y) return;

                const power = new PowerUp(this, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.properties.name,
                    ability: element.properties.ability,
                    text: element.properties.text,
                    id: element.properties.id,
                });
                if (element.properties.key === 'heart') power.setDisplaySize(20, 20);
                power.setDisplayOrigin(0, 0).animate(element.properties.powerup);
                power.body.setSize(16, 16).setAllowGravity(false);
                this.powerups.push(power);
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

                case 'hellhound':
                    if (!element.y) return;

                    const hellhound = new HellHound(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });
                    hellhound.animate(element.properties.key);
                    this.enemyGroup.push(hellhound);
                    hellhound.setPosition(element.x, element.y - 16);
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

                    this.oldman = new Oldman(this, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                    });

                    this.npcGroup.push(this.oldman);
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





    // ====================================================================
    // HANDLE ROOM ELEMENTS
    public openDoor (door)
    {
        door.openDoor();
    }

    public bossDragon ()
    {
        if (this.player.inventory.boss1 === true) return;
        this.dragon = new Dragon(this, 258, 170, { key: 'dragon', name: 'dragon' });
        this.enemyGroup.push(this.dragon);
        this.stopMusic();
        this.playMusic('dragonFight');
    }

    public addThunderDoorCallback ()
    {
        if (this.player.inventory.thunderDoorReached)
        {
            return;
        }
        this.colliderLayer.setTileLocationCallback(1, 50, 7, 4, (e, t) =>
        {
            if (e instanceof Player)
            {
                this.player.inventory.thunderDoorReached = true;
            }
        }, this);
    }

    public showAngel ()
    {
        // angelCalling
        this.stopMusic();
        this.playMusic('angelCalling');
        this.angel = new Angel(this, 102, 153, {
            key: 'angel-idle',
            name: 'angel',
        });

        this.npcGroup.push(this.angel);
    }

    public checkWaterStorm ()
    {
        // if(!this.player.inventory.waterStorm || this.player.inventory.townInFire) {
        this.enemyGroup.forEach(e => e.destroy());

        return;
        // }

    }

    public callHellBeast ()
    {
        if (this.player.inventory.boss2)
        {
            return;
        }

        this.hellBeast = new HellBeast(this, -100, -100, { key: 'hell-beast-idle', name: 'hellBeast' });
        this.enemyGroup.push(this.hellBeast);
        this.stopMusic();
        // this.playMusic('hellBeastFight');
    }

    public callDemon ()
    {
        if (this.player.inventory.bossFinal)
        {
            return;
        }
        this.stopMusic();
        this.demon = new Demon(this, 24 * 16, 24 * 16, { key: 'finalBoss', name: 'demon' });
        // this.enemyGroup.push(this.demon);
        // this.physics.add.overlap(this.player, this.demon, elm => this.playerIsHit(elm), undefined, this);
        // this.physics.add.overlap(this.skullGroup, this.player, elm => this.playerIsHit(elm), undefined, this);
        // this.physics.add.overlap(this.breathGroup, this.player, elm => this.playerIsHit(elm), undefined, this);
        // this.physics.add.overlap(this.player.swords, this.skullGroup, (elm, bull) =>
        // {
        //     // @ts-ignore
        //     this.enemyExplode(bull.x, bull.y);
        //     this.sound.play('demonSkullHitSfx');
        //     bull.destroy();
        // }, undefined, this.player);

        this.physics.add.overlap(this.thunderPower, this.player, (player, thunder) =>
        {
            if (this.thunderOnPlayer)
            {
                return;
            }

            this.thunderOnPlayer = true;

            thunder.body = thunder.body as Phaser.Physics.Arcade.Body;
            thunder.body.setVelocity(0, 0);

            this.time.addEvent({
                delay: 100,
                repeat: this.player.inventory.life - 1,
                callback: () =>
                {
                    if (this.player.inventory.life > 1)
                    {
                        this.player.inventory.life -= 1;
                        this.player.hitSfx.play();
                        this.events.emit('setHealth', { life: Math.round(this.player.inventory.life) });
                    }
                    else
                    {
                        this.thunderGateSfx.stop();
                        this.demon.demonThunder.destroy();
                        this.demon.startPhase2();
                    }
                }
            });
        }, undefined, this);
    }

    public noSaveIfEscape ()
    {
        if (!this.player.inventory.escape)
        {
            return;
        }
        // disable checkpoints during escape
        // this.saveStationGroup.forEach(checkpoint => checkpoint.destroy());
    }

    public escape ()
    {
        if (!this.player.inventory.escape)
        {
            return;
        }
        const arr: number[] = [];
        for (let i = 0; i < 16; i += 1)
        {
            arr.push(i);
        }

        if (this.convertTiledObjectProperties(this.map.properties)?.walkSfx === 'churchWalkSfx')
        {
            this.escapeParticles = this.add.particles('churchParticles').setDepth(200);
        }
        else
        {
            this.escapeParticles = this.add.particles('castleParticles').setDepth(200);
        }
        this.escapeParticleEmitter = this.escapeParticles.createEmitter({
            angle: { min: -30, max: -150 },
            speed: { min: 100, max: 200 },
            frame: arr,
            quantity: 16,
            lifespan: 3000,
            alpha: 1,
            scale: { min: 0.2, max: 3 },
            rotate: {
                onEmit: (e) =>
                {
                    return Phaser.Math.Between(0, 90);
                }
            },
            gravityY: 500,
            on: false,
        });

        // shake camera
        this.events.emit('count');
        const rdm = Phaser.Math.Between(2000, 5000);
        this.escapeTimer = this.time.addEvent({
            delay: rdm,
            repeat: -1,
            callback: () =>
            {
                if (!this.player.inventory.escape)
                {
                    this.escapeTimer = null;

                    return;
                }
                this.shakeCameraEscape(1000);
                const pos = this.getCamCenter();
                const random = Phaser.Math.Between(-400, 600);
                this.escapeParticleEmitter.explode(10, pos.x + random, pos.y - 150);
            }
        });

        this.stopMusic();
        this.playMusic('escapeTheme');
    }

    // ====================================================================
    // CAMERA EFFECTS
    public shakeCamera (e)
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

    public shakeCameraEscape (e)
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

    public getCamCenter ()
    {
        return { x: this.cameras.main.scrollX + WIDTH / 2, y: this.cameras.main.scrollY + HEIGHT / 2 };
    }

    public getCamOrigin ()
    {
        return { x: this.cameras.main.scrollX, y: this.cameras.main.scrollY };
    }

    // ====================================================================
    // The end

    public callBackEndMission ()
    {
        if (!this.player.inventory.escape)
        {
            return;
        }
        this.colliderLayer.setTileLocationCallback(0, 10, 20, 4, (e, t) =>
        {
            if (e instanceof Player)
            {
                this.endMission();
            }
        }, this);


    }

    public endMission ()
    {
        if (this.isTheEnd)
        {
            return;
        }
        this.events.emit('countStop');
        this.isTheEnd = true;
        this.battleWithBoss = true;
        this.player.inventory.escape = false;
        this.showMsg = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, 'alagard', `
    Congratulations Acharis!!
    You got your revenge!!!`, 14, 1)
            .setOrigin(0.5, 0.5).setAlpha(0).setDepth(200);
        SaveLoadService.setSavedGameTime(this);
        this.tween = this.tweens.add({
            targets: this.showMsg,
            ease: 'Sine.easeInOut',
            duration: 2000,
            delay: 2000,
            repeat: 0,
            yoyo: false,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1,
            },
            onComplete: () =>
            {
                this.time.addEvent({
                    delay: 3000,
                    callback: () =>
                    {
                        this.stopMusic();
                        this.scene.start(SCENES_NAMES.ENDGAME);
                    }
                });
            },
        });
    }
}
