import {Scene} from 'phaser';
import {WIDTH, HEIGHT} from '../constant/config';
import Player from '../player/Player';
import PowerUp from '../player/powerUp';
import HellHound from '../enemies/HellHound';
import Thing from '../enemies/Thing';
import Skeleton from '../enemies/Skeleton';
import Ghost from '../enemies/Ghost';
import Wizard from '../enemies/Wizard';
import BurningGhoul from '../enemies/BurningGhoul';
import Thunder from '../enemies/Thunder';
import Flames from '../enemies/Flames';
import Woman from '../npc/Woman';
import Bearded from '../npc/Bearded';
import Hatman from '../npc/Hatman';
import Oldman from '../npc/Oldman';
import Angel from '../npc/Angel';
import BossDragon from '../enemies/BossDragon';
import HellBeast from '../enemies/HellBeast';
import Demon from '../enemies/Demon';
import Doors from '../utils/Doors';
import Platform from '../utils/Platform';
import PlatformSpike from '../enemies/PlatformSpike';
import SaveStation from '../utils/saveStation';
import countDeadEnemies from '../utils/counDeadEnemies';
import countTime from '../utils/countTime';


export default class playLvl1 extends Scene {
    constructor () {
        super('playLvl1');
        this.state = {
            displayPowerUpMsg: false,
        };
    }

    // ====================================================================
    preload() {
        // see scenes/loadingScreen.js file
    }

    // ====================================================================
    create() {
        // initialize the map and tileset
        this.map = this.make.tilemap(this, {key: 'map1', tileWidth: 16, tileHeight: 16});
        this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);

        // initialize the time
        this.firstTimestamp = new Date().getTime();

        if(!localStorage.getItem('time')) {
            localStorage.setItem('time', 0);
        }

        // call stopFullscreen on esc key to prevent phaser 16.2 bug on esc key
        // this.leaveFullscreenKey = this.input.keyboard.addKey('ESC')
        //     .on('down', () => {
        //         this.scale.stopFullscreen();
        //     });

        // ====================================================================
        // Groups that need to be destroyed on changing room
        this.giveLifeGroup = [];
        this.powerups = [];
        this.enemyGroup = [];
        this.elevatorGroup = [];
        this.lavaGroup = [];
        this.doorGroup = [];
        this.saveStationGroup = [];
        this.pathGroup = [];
        this.platformGroup = [];
        this.paraBackGroup = [];
        this.paraMiddleGroup = [];
        this.paraMiddle2Group = [];
        this.fireballGroup = [];
        this.npcGroup = [];
        this.platformSpikeGroup = [];
        this.breathGroup = [];
        this.skullGroup = [];


        // ====================================================================
        // AMBIENT MUSIC
        this.musicGroup = [];
        this.hauntedForest = this.sound.add('hauntedForest', {volume: 1, loop: true});
        this.angelCalling = this.sound.add('angelCalling', {volume: 1, loop: true});
        this.townTheme = this.sound.add('townTheme', {volume: 1, loop: true});
        this.townAttackTheme = this.sound.add('townAttackTheme', {volume: 1, loop: true});
        this.graveyardTheme = this.sound.add('graveyardTheme', {volume: 1, loop: true});
        this.dragonFight = this.sound.add('dragonFight', {volume: 1, loop: true});
        this.castleTheme = this.sound.add('castleTheme', {volume: 1, loop: true});
        this.churchTheme = this.sound.add('churchTheme', {volume: 1, loop: true});
        this.hellBeastFight = this.sound.add('hellBeastFight', {volume: 1, loop: true});
        this.demonFight1 = this.sound.add('demonFight1', {volume: 1, loop: true});
        this.demonFight2 = this.sound.add('demonFight2', {volume: 1, loop: true});
        this.demonLighting = this.sound.add('demonLighting', {volume: 1, loop: true});
        this.escapeTheme = this.sound.add('escapeTheme', {volume: 1, loop: true});
        this.revengeTheme = this.sound.add('revengeTheme', {volume: 1, loop: true});
        this.EndingTheme = this.sound.add('EndingTheme', {volume: 1, loop: true});


        this.thunderGateSfx = this.sound.add('thunderGateSfx', {volume: 0.6, loop: true});
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
        this.player = new Player(this, 80, 170, {key: 'playerAtlas'}); // 458, 122 4 * 16, 6 * 16
        this.playerHurt = false;
        this.thunderOnPlayer = false;

        this.thunderPower = this.physics.add.group({
            defaultKey: 'thunder-storm',
            maxSize: 1,
            allowGravity: false,
            createIfNull: true,
        });
        // fireball
        this.fireballs = this.physics.add.group({
            defaultKey: 'fireBall',
            maxSize: 3,
            allowGravity: false,
            createIfNull: true,
        });
        // breathBlue
        this.breathBlue = this.physics.add.group({
            defaultKey: 'finalBoss',
            maxSize: 1,
            allowGravity: false,
            createIfNull: true,
        });
        // breath-fire
        this.breathFire = this.physics.add.group({
            defaultKey: 'finalBoss',
            maxSize: 1,
            allowGravity: false,
            createIfNull: true,
        });
        this.skullHeads = this.physics.add.group({
            defaultKey: 'finalBoss',
            frame: ['fire-skull1', 'fire-skull2', 'fire-skull3', 'fire-skull4', 'fire-skull5', 'fire-skull6', 'fire-skull7'],
            maxSize: 8,
            allowGravity: false,
            createIfNull: true,
        });
        this.playerFlashTween = null;

        // ====================================================================
        // loading saved game
        if(this.data.systems.settings.data.loadSavedGame) {
            this.loadGame();
        }
        // creating new game
        if(!localStorage.getItem('RevengeOfAcharis')) {
            this.player.inventory.savedPositionX = 4 * 16;
            this.player.inventory.savedPositionY = 9 * 16;
            const s = JSON.stringify(this.player.inventory);
            localStorage.setItem('RevengeOfAcharis', s);
            this.loadGame();
        }

        this.explodeSprite = this.add.group({
            defaultKey: 'enemies',
            frame: ['enemy-death-1', 'enemy-death-2', 'enemy-death-3', 'enemy-death-4', 'enemy-death-5'],
            maxSize: 50,
            allowGravity: false,
            createIfNull: true,
        });


        // particles for map tiles exploded
        this.weaponParticles = this.add.particles('blackPixel');
        this.weaponParticleEmitter = this.weaponParticles.createEmitter({
            angle: {min: -30, max: -150},
            speed: {min: 200, max: 400},
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


        // Lock doors when boss
        this.battleWithBoss = false;
        // ====================================================================
        // CAMERA
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
        this.cameras.main.transparent = true;
        this.cameraIsShaking = false;
        this.cameras.main.fadeIn(200);

        // set the fps to 120 for good collisions at high speed
        // this.physics.world.setFPS(120);

        // toggler for pause button
        this.isPausing = false;

        // DEBUG / HELPERS
        this.text1 = this.add.text(10, 226, '', {fill: '#00ff00'}).setDepth(5000);
    }

    // ====================================================================
    update(time) {
        if(this.modalText) {
            this.modalText.x = this.player.x;
            this.modalText.y = this.player.y - 100;
        }
        // anti fall trough map
        if(this.player.y > this.map.heightInPixels) {
            this.player.setPosition(this.map.widthInPixels / 2, this.map.heightInPixels / 2);
        }
    }

    // ====================================================================

    playMusic(music) {
        //return; //disabled music for working on walk sounds
        for(let i = 0; i < this.musicGroup.length; i += 1) {
            if(this.musicGroup[i].isPlaying && this.musicGroup[i].key === music) { //
                return;
            }
        }
        this.stopMusic();
        this[music].play();
        console.log(this[music].key + ' is playing')
    }

    stopMusic() {
        for(let i = 0; i < this.musicGroup.length; i += 1) {
            if(this.musicGroup[i].isPlaying) { //&& this.musicGroup[i].key === music
                this.musicGroup[i].stop();
                console.log(this.musicGroup[i].key + ' is stopped')
            }
        }
    }

    sismicActivity() {
        if(!this.onSismic) {
            this.onSismic = true;
            const rdm = Phaser.Math.Between(2000, 5000);
            this.shakeCamera(1000);
            this.sound.play('shake', {volume: 0.5});
            this.time.addEvent({
                delay: rdm,
                callback: () => {
                    this.onSismic = false;
                },
            });
        }
    }

    // ====================================================================
    getPowerUp(elm) {
        this.state.displayPowerUpMsg = true;
        if(elm.powerUpState.ability === 'energy') {
            this.player.addEnergy();
            this.events.emit('setHealth', {life: this.player.inventory.life});
        } else if(elm.powerUpState.ability === 'bow') {
            this.player.addBow(elm);
        } else if(elm.powerUpState.ability === 'jumpBoots') {
            this.player.addJumpBoots();
        } else if(elm.powerUpState.ability === 'swell') {
            this.player.inventory[elm.powerUpState.ability] = true;
            this.player.addSwell();
        } else if(elm.powerUpState.ability === 'waterStorm') {
            this.player.inventory[elm.powerUpState.ability] = true;
            this.player.addMagic('waterStorm');
        } else if(elm.powerUpState.ability === 'lavaStorm') {
            this.player.inventory[elm.powerUpState.ability] = true;
            this.player.addMagic('lavaStorm');
        } else if(elm.powerUpState.ability === 'thunderStorm') {
            this.player.inventory[elm.powerUpState.ability] = true;
            this.player.addMagic('thunderStorm');
        } else {
            this.player.inventory[elm.powerUpState.ability] = true;
        }
        this.sound.play('powerUp');
        this.player.inventory.powerUp[elm.powerUpState.id] = 1;

        this.pauseGamePowerUp();
        const pos = this.getCamCenter();
        this.msgtext = this.add.bitmapText(pos.x, pos.y, 'atomic', elm.powerUpState.text, 12, 1)
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
            onComplete: () => {
                this.msgtext.destroy();
                //this.state.displayPowerUpMsg = false;
            },
        });
    }

    // ====================================================================
    // GAME PAUSE
    pauseGamePowerUp() {
        if(this.isPausing) {
            return;
        }
        if(!this.isPausing && !this.player.playerState.pause) {
            this.isPausing = true;
            this.player.playerState.pause = true;
            this.physics.pause();
            this.player.anims.play('adventurer-idle');
            //this.player.setFrame('adventurer-cast-01');
            this.time.addEvent({
                delay: 3000,
                callback: () => {
                    this.isPausing = false;
                    this.player.playerState.pause = false;
                    this.scene.scene.physics.resume();
                    this.player.anims.resume(this.player.anims.currentFrame);
                }
            });
            return;
        }
    }

    pauseGame() {
        if(this.isPausing) {
            return;
        }
        if(!this.isPausing && !this.player.playerState.pause) {
            this.isPausing = true;
            this.events.emit('pause');
            this.countTime();
            this.player.anims.play('stand');
            this.player.playerState.pause = true;
            this.physics.pause();
            const pos = this.getCamCenter();
            this.lifeText = this.add.bitmapText(pos.x, pos.y, 'atomic', 'PAUSE', 14, 1)
                .setDepth(300)
                .setOrigin(0.5, 0.5)
                .setAlpha(1);
            this.time.addEvent({
                delay: 120,
                callback: () => {
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
            callback: () => {
                this.isPausing = false;
            },
        });
    }

    choose() {
        this.player.chooseDone = true;
        if(this.player.playerState.pause) {
            if(this.lastPosition === 1) {
                this.lastPosition = 0;
            } else {
                this.lastPosition += 1;
            }
            this.head.y = this.position[this.lastPosition];
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.player.chooseDone = false;
                },
            });
        }
    }

    launch() {
        this.player.chooseDone = true;
        if(this.player.playerState.pause) {
            if(this.lastPosition === 0) {
                this.events.emit('unpause');
                this.player.playerState.pause = false;
                this.scene.scene.physics.resume();
                this.player.anims.resume(this.player.anims.currentFrame);
                this.continueBtn.destroy();
                this.firstTimestamp = new Date().getTime();
                this.time.addEvent({
                    delay: 300,
                    callback: () => {
                        this.player.chooseDone = false;
                    },
                });
            }
            if(this.lastPosition === 1) {
                this.saveGame();
                this.time.addEvent({
                    delay: 300,
                    callback: () => {
                        this.player.chooseDone = false;
                    },
                });
            }
        }
    }

    // ====================================================================
    playerIsHit(elm) {
        if(elm.enemyState.damage === 0) {
            return;
        }

        if(elm instanceof PlatformSpike && elm.body.touching.down) {
            this.player.inventory.life = 0;
            this.events.emit('setHealth', {life: Math.round(this.player.inventory.life)});
            this.playerDeathSequence();
            return;
        }
        if(!this.playerHurt) {
            this.playerHurt = true; // flag
            this.player.hitSfx.play();
            this.player.inventory.life -= elm.enemyState.damage;
            if(this.player.inventory.life <= 30) {
                this.sound.play('lowLifeSfx');
            }
            if(elm.name === 'skullHead' || elm.name === 'demonBreath') {
                this.sound.play('hellBeastFirstLaughSfx');
            }
            this.playerFlashTween = this.tweens.add({
                targets: this.player,
                ease: 'Sine.easeInOut',
                duration: 200,
                delay: 0,
                repeat: 2,
                yoyo: true,
                alpha: {
                    getStart: () => 0,
                    getEnd: () => 1,
                },
                onComplete: () => {
                    this.player.alpha = 1;
                    this.playerHurt = false;
                },
            });
            // if player is dead, launch deadth sequence
            if(this.player.inventory.life <= 0) {
                this.playerDeathSequence();
            }
        }
        // set health dashboard scene
        this.events.emit('setHealth', {life: Math.round(this.player.inventory.life)});
    }

    playerOnSpikes(int) {
        if(!this.playerHurt) {
            this.playerHurt = true; // flag
            this.player.playerState.runSpeed = 285;
            this.player.hitSfx.play();
            this.player.inventory.life -= int;
            if(this.player.inventory.life <= 30) {
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
                onComplete: () => {
                    this.player.alpha = 1;
                    this.playerHurt = false;
                },
            });
            // if player is dead, launch deadth sequence
            if(this.player.inventory.life <= 0) {
                this.playerDeathSequence();
            }
            this.events.emit('setHealth', {life: this.player.inventory.life}); // set health dashboard scene
        }
    }

    // ====================================================================
    playerDeathSequence() {
        this.player.playerState.dead = true;
        this.playerDead = true;
        this.physics.pause();
        if(this.thunderGateSfx.isPlaying) {
            this.thunderGateSfx.stop();
        }
        this.input.enabled = false;
        this.player.anims.play('die');
        if(this.playerFlashTween) this.playerFlashTween.stop();
        this.player.inventory.life = 0;
        this.player
        this.player.setDepth(2000);

        this.round = this.add.sprite(this.cameras.main.scrollX, this.cameras.main.scrollY, 'blackpixel');
        this.round
            .setOrigin(0, 0)
            .setDepth(1000)
            .setAlpha(0)
            .setTintFill(0x272638) // 0C1D1C
            .setDisplaySize(WIDTH, HEIGHT);

        this.sound.play('playerDead', {volume: 1});

        this.tween = this.tweens.add({
            targets: this.round,
            ease: 'Sine.easeInOut',
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            duration: 2500,
            delay: 800,
            onComplete: () => {
                this.input.enabled = true;
                this.playerIsDead();
            },
        });
    }

    playerIsDead() {
        let d = localStorage.getItem('d');
        d = JSON.parse(d);
        d += 1;
        localStorage.setItem('d', d);
        this.stopMusic();

        this.countTime();
        this.player.playerState.dead = false;
        this.demonFight1.stop();
        this.demonFight2.stop();
        this.demonLighting.stop();
        this.thunderGateSfx.stop();
        this.scene.start('gameOver');
    }


    // ====================================================================
    enemyIsHit(enemy, playerWeapon) {
        const el = enemy;

        if(!el.getFired) {
            el.getFired = true;

            // if skeleton not rised don't do anything
            if(enemy instanceof Skeleton) {
                if(!el.isAttacking) {
                    el.getFired = false;
                    return;
                }
            }
            //destroy flames
            if(enemy instanceof Flames && playerWeapon.name === 'waterStorm') {
                enemy.destroy();
                const leftFlames = this.enemyGroup.filter(e => {
                    if(e.name === 'flame' && e.active) return e;

                });
                if(leftFlames.length === 0) {
                    this.battleWithBoss = false;
                }
                return;
            }
            // destroy the weapon
            if(this.player.playerState.selectedWeapon === 'bow') {
                this.player.bowKill(playerWeapon, false);
            }

            // enemy loose life
            el.looseLife(this.player.inventory[`${this.player.playerState.selectedWeapon}Damage`]);
            el.setTintFill(0xDDDDDD);

            this.time.addEvent({
                delay: 50,
                callback: () => {
                    if(!el.active) return;
                    el.clearTint();

                },
            });

            this.hitTimer = this.time.addEvent({
                delay: 220,
                callback: () => {
                    el.getFired = false;
                },
            });
        }
        // enemy is dead
        if(el.enemyState.life <= 0) {
            if(el.name === 'demon' && el.phase === 0) {
                el.clearTint();
                el.startPhase1();
                this.battleWithBoss = true;
                return;
            }
            if(el.name === 'demon' && el.phase === 2) {
                el.clearTint();
                el.startPhase3();
                return;
            }
            el.clearTint();
            el.playSfxDeath();
            el.explode();
            // kill the enemy
            this.giveLife = this.physics.add.sprite(el.x, el.y, 'heart');
            this.giveLife.setDepth(105)//;
            this.giveLife.health = el.enemyState.giveLife;
            this.giveLife.body.setSize(23, 21);
            this.giveLife.anims.play('heart');
            this.giveLifeGroup.push(this.giveLife);
            this.enemyExplode(el.x, el.y);
            this.enemyDestroy(el);
        }
    }

    enemyDestroy(e) {
        e.destroy();
        countDeadEnemies();
    }

    bossExplode(x, y) {
        this.bossMusic.stop();
        const exp = this.explodeSprite.getFirstDead(true, x, y, 'enemyExplode', null, true).setDepth(107);
        this.sound.play('explo2', {volume: 0.3});
        if(exp) {
            exp.anims.play('bossExplode').on('animationrepeat', () => {
                this.sound.play('explo2', {volume: 0.3});
            }).on('animationcomplete', () => {
                exp.destroy();
            });
        }
    }

    enemyExplode(x, y) {
        const exp = this.explodeSprite.getFirstDead(true, x, y - 8, 'enemyExplode', null, true)
        if(exp) {
            exp.setDepth(107);;
            exp.anims.play('enemyExplode').on('animationcomplete', () => {
                exp.destroy();
            });
        }
    }



    // ====================================================================
    // LOAD ROOM
    loadGame() {
        const l = localStorage.getItem('RevengeOfAcharis');
        this.player.inventory = JSON.parse(l);
        this.player.x = this.player.inventory.savedPositionX;
        this.player.y = this.player.inventory.savedPositionY;
        this.startRoom(this.player.inventory.map);
    }

    saveGame(player, savestation) {
        if(player === this.player && !savestation.isOverlap) {
            savestation.setIsOverlap();
            this.player.inventory.savedPositionX = this.player.x;
            this.player.inventory.savedPositionY = this.player.y;
            this.player.inventory.map = savestation.state.destination;
            const s = JSON.stringify(this.player.inventory);
            localStorage.setItem('RevengeOfAcharis', s);
            this.sound.play('melo');
            this.msgText = this.add.bitmapText(this.cameras.main.worldView.x + 200, this.cameras.main.worldView.y + 128, 'alagard', 'Game Saved', 30, 1)
                .setOrigin(0.5, 0.5)
                .setAlpha(1)
                .setDepth(110);
            this.countTime();
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.msgText.setAlpha(0);
                },
            });
        }
    }

    startRoom(room) {
        // clean up
        this.cameras.main.fadeOut(50);
        this.physics.world.colliders.destroy();
        this.map.destroy();
        this.doorGroup.forEach(e => e.destroyDoor());
        this.giveLifeGroup.forEach(e => e.destroy());
        this.powerups.forEach(e => e.destroy());
        this.enemyGroup.forEach(e => e.destroy());
        this.elevatorGroup.forEach(e => e.destroy());
        this.lavaGroup.forEach(e => e.destroy());
        if(this.thunderGateSfx.isPlaying) {
            this.thunderGateSfx.stop();
        }
        this.stopMusic();
        // create room
        this.map = this.make.tilemap({key: room, tileWidth: 16, tileHeight: 16});
        this.playerPosition = room;
        this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);
        const properties = this.convertTiledObjectProperties(this.map.properties);
        this.addParaBack(properties.paraBack);
        this.addParaMiddle(properties.paraMiddle);
        this.addParaMiddle2(properties.paraMiddle2);
        this.addLayers();
        this.addDoors();
        this.player.x = this.player.inventory.savedPositionX + 24;
        this.player.y = this.player.inventory.savedPositionY;
        this.addColliders();
        this.addPowerUp();
        this.addPlayerSfx();
        this.addEnemies();
        this.addMovingPlatform();
        this.playMusic(properties.music);
        // launch special functions from the room
        if(properties.callFunction && properties.callFunction.length) {
            const arr = properties.callFunction.split(',');
            arr.forEach(elm => this[elm]());
        }
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
        this.cameras.main.fadeIn(50);
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.events.emit('loadingDone');
            },
        });
    }

    changeRoom(player, doorP) {
        // if boss not dead return!
        if(this.battleWithBoss) return;
        // if door closed, return!!
        if(doorP && doorP.alpha === 1) {
            return;
        }
        if(this.playerIsPassingDoor) {
            return;
        }
        this.playerIsPassingDoor = true;
        console.clear();
        // destroy leaving room
        this.cameras.main.fadeOut(50);
        this.physics.world.colliders.destroy();
        this.map.destroy();
        this.doorGroup.forEach(e => e.destroyDoor());
        this.doorGroup = [];
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
        this.lavaGroup.forEach(e => e.destroy());
        this.lavaGroup = [];
        this.doorGroup.forEach(e => e.destroy());
        this.doorGroup = [];
        this.saveStationGroup.forEach(e => e.destroy());
        this.saveStationGroup = [];
        this.paraBackGroup.forEach(e => e.destroy());
        this.paraMiddleGroup.forEach(e => e.destroy());
        this.paraMiddle2Group.forEach(e => e.destroy());
        if(this.thunderGateSfx.isPlaying) {
            this.thunderGateSfx.stop();
        }
        if(this.demon) this.demon.destroy();
        if(this.escapeTimer) this.escapeTimer = null;

        // create new room
        this.map = this.make.tilemap({key: doorP.state.destination, tileWidth: 16, tileHeight: 16});
        this.playerPosition = doorP.state.destination;
        this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);
        const properties = this.convertTiledObjectProperties(this.map.properties);
        this.addLayers();
        this.addDoors();
        this.addParaBack(properties.paraBack);
        this.addParaMiddle(properties.paraMiddle);
        this.addParaMiddle2(properties.paraMiddle2);
        this.addSavestation();
        this.cameras.main.stopFollow();
        this.cameras.main.setScroll(doorP.state.playerX * 16, doorP.state.playerY * 16);
        if(doorP.state.side === 'left') {
            this.player.body.reset(doorP.state.playerX * 16, doorP.state.playerY * 16 + 20);
        } else {
            this.player.body.reset(doorP.state.playerX * 16 + 12, doorP.state.playerY * 16 + 20);
        }
        this.addMovingPlatform();
        this.addEnemies();
        this.addColliders();
        this.addPowerUp();
        this.addPlayerSfx();
        this.playMusic(properties.music);
        // launch special functions from the room
        if(properties.callFunction && properties.callFunction.length) {
            const arr = properties.callFunction.split(',');
            arr.forEach(elm => this[elm]());
        }


        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
        this.cameras.main.fadeIn(50);
        this.physics.world.setBoundsCollision();
        this.playerIsPassingDoor = false;
        // console.log(this);
    }

    // ====================================================================
    // HANDLE CRUMBLE TILES
    addCrumbleTiles() {
        const {CrumbleStartX, CrumbleStartY, CrumbleLength} = this.map.properties;
        this.solLayer.setTileLocationCallback(CrumbleStartX, CrumbleStartY, CrumbleLength, 1, (e, t) => this.handleCrumbleTile(e, t), this);
    }

    handleCrumbleTile(e, t) {

        if(!(e instanceof Player)) {
            return;
        }
        let {crumbleTimer} = t.properties;
        if(!crumbleTimer) crumbleTimer = 100;
        this.time.addEvent({
            delay: crumbleTimer,
            callback: () => {
                t.setVisible(false);
                const t2 = this.solLayer.getTileAt(t.x, t.y + 1);
                t2.setVisible(false);
                this.solLayer.setCollision(t2.index, false);
                this.resetCrumbleTiles(t, t2);
            },
        });
    }

    resetCrumbleTiles(t, t2) {
        let crumbleResetTime = 10000;
        if(this.map.properties.CrumbleResetTime) {
            crumbleResetTime = this.map.properties.CrumbleResetTime;
        }
        this.time.addEvent({
            delay: crumbleResetTime,
            callback: () => {
                t.setVisible(true);
                t2.setVisible(true);
                this.solLayer.setCollision(t2.index, true);
            },
        });
    }

    // ====================================================================
    // ADD ROOM STUFF
    addPlayerSfx() {
        const properties = this.convertTiledObjectProperties(this.map.properties);
        switch(properties.walkSfx) {
            case 'castleWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingCastleSfx', {volume: 1, rate: 1});
                this.player.jumpSfx = this.sound.add('jumpCastleSfx', {volume: 1, rate: 1});
                this.player.hitSfx = this.sound.add('hitCastleSfx', {volume: 2, rate: 1});
                break;
            }
            case 'churchWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingChurchSfx', {volume: 1, rate: 1});
                this.player.jumpSfx = this.sound.add('jumpChurchSfx', {volume: 1, rate: 1});
                this.player.hitSfx = this.sound.add('hitChurchSfx', {volume: 2, rate: 1});
                break;
            }
            case 'graveyardWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingGraveyardSfx', {volume: 1, rate: 1});
                this.player.jumpSfx = this.sound.add('jumpGraveyardSfx', {volume: 1, rate: 1});
                this.player.hitSfx = this.sound.add('hitGraveyardSfx', {volume: 2, rate: 1});
                break;
            }
            case 'townWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingTownSfx', {volume: 1, rate: 1});
                this.player.jumpSfx = this.sound.add('jumpTownSfx', {volume: 1, rate: 1});
                this.player.hitSfx = this.sound.add('hitTownSfx', {volume: 2, rate: 1});
                break;
            }
            case 'forestWalkSfx': {
                this.player.fallSfx = this.sound.add('fallingForestSfx', {volume: 1, rate: 1});
                this.player.jumpSfx = this.sound.add('jumpForestSfx', {volume: 1, rate: 1});
                this.player.hitSfx = this.sound.add('hitForestSfx', {volume: 2, rate: 1});
                break;
            }
        }
        this.player.walkk = this.sound.add(properties.walkSfx, {volume: 0.6, rate: 1});
    }

    addMovingPlatform() {
        const layerArray = this.checkObjectsLayerIndex('path');
        if(!layerArray || layerArray.objects.length === 0) {
            return;
        }
        layerArray.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            this[element.name] = new Platform(this, element.x, element.y - 16, {
                key: 'movingPlatform',
                name: element.name,
                duration: element.properties.duration,
                directionType: element.properties.vertical,
            });
            this.platformGroup.push(this[element.name]);
        });
    }

    addColliders() {
        this.solLayer.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.player, this.solLayer, null, (e, t) => {
            // if player is on spikes
            if(t.index === 968 || t.index === 969) {
                this.playerOnSpikes(20);
            }
            return true;
        }, this);
        this.physics.add.collider(this.platformGroup, this.player, (platform) => this.player.playerOnPlatform(platform), null, this);
        this.physics.add.collider(this.platformSpikeGroup, this.solLayer, null);
        this.physics.add.collider(this.platformSpikeGroup, this.player, (platform) => this.playerIsHit(platform), null, this);
        this.physics.add.collider(this.enemyGroup, this.solLayer, null, (enemy, tile) => {
            if(enemy.name !== 'demon') return true;
        });
        this.physics.add.collider(this.enemyGroup, this.doorGroup, (e, d) => {
            if(this[e.name] === undefined) {
                e.destroy();
                return;
            }
            this[e.name].checkCollision(d);
        }, null, this);
        this.physics.add.overlap(this.giveLifeGroup, this.player, elm => this.player.getLife(elm), null, this.player);
        this.physics.add.overlap(this.powerups, this.player, elm => this.getPowerUp(elm), null, this);
        this.physics.add.overlap(this.enemyGroup, this.player, elm => this.playerIsHit(elm), null, this);
        this.physics.add.overlap(this.fireballGroup, this.player, elm => this.playerIsHit(elm), null, this);
        this.physics.add.overlap(this.player.sword, this.enemyGroup, (elm, bull) => this.enemyIsHit(bull, elm), null, this.player);
        this.physics.add.overlap(this.player, this.doorGroup, (player, door) => this.changeRoom(player, door), null, this);
    }

    addLayers() {
        this.solLayer = this.map.createLayer('collideGround', this.tileset, 0, 0)
            .setDepth(11);
        this.backLayer = this.map.createLayer('back', this.tileset, 0, 0)
            .setDepth(4);;
        this.middleLayer = this.map.createLayer('middle', this.tileset, 0, 0)
            .setDepth(5);;
        this.middleLayer2 = this.map.createLayer('middle2', this.tileset, 0, 0)
            .setDepth(10);;
        this.frontLayer = this.map.createLayer('front', this.tileset, 0, 0)
            .setDepth(106);
    }

    addPowerUp() {
        const layerArray = this.checkObjectsLayerIndex('powerup');
        if(!layerArray || layerArray.objects.length === 0) {
            return;
        }
        layerArray.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            if(this.player.inventory.powerUp[element.properties.id] === 0) {
                this[element.name] = new PowerUp(this, element.x, element.y - 16, {
                    key: element.properties.key,
                    name: element.properties.name,
                    ability: element.properties.ability,
                    text: element.properties.text,
                    id: element.properties.id,
                });
                if(element.properties.key === 'heart') this[element.name].setDisplaySize(20, 20);
                this[element.name].setDisplayOrigin(0, 0).animate(element.properties.powerup, true);
                this[element.name].body.setSize(16, 16).setAllowGravity(false);
                this.powerups.push(this[element.name]);
            }
        });
    }

    addDoors() {
        const layerArray = this.checkObjectsLayerIndex('doors');
        layerArray.objects.forEach((element, i) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            let door;
            if(element.properties.side === 'right') {
                door = new Doors(this, element.x + 6, element.y + 9, {
                    key: 'blackPixel',
                    name: element.name,
                    side: element.properties.side,
                    playerX: element.properties.playerX,
                    playerY: element.properties.playerY,
                    destination: element.properties.destination,
                    openWith: element.properties.openWith,
                });
                door.body.setSize(10, 47);
            }
            if(element.properties.side === 'left') {
                door = new Doors(this, element.x + 16, element.y + 9, {
                    key: 'blackPixel',
                    name: element.name,
                    side: element.properties.side,
                    playerX: element.properties.playerX,
                    playerY: element.properties.playerY,
                    destination: element.properties.destination,
                    openWith: element.properties.openWith,
                });
                door.flipX = true;
                door.body.setSize(10, 47);
            }
            this.doorGroup.push(door);
            this.openDoor(door);
        });
    }

    checkObjectsLayerIndex(layerName) {
        const arr = this.map.objects.filter((elm) => elm.name === layerName);

        if(!arr || !arr.length) {
            return null;
        }

        return arr[0];
    }

    /**
     * Convert a Tiled Object Properties from array to an object
     * @param properties 
     */
    convertTiledObjectProperties(properties) {
        const props = {};

        properties.forEach(e => {
            props[e.name] = e.value;
        });

        return props;
    }

    addEnemies() {
        // the hellHound
        const layerArray = this.checkObjectsLayerIndex('hellhound');
        layerArray && layerArray.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const hellhound = new HellHound(this, element.x, element.y - 16, {
                key: element.properties.key,
                name: element.name,
                life: element.properties.life,
                damage: element.properties.damage,
            });
            hellhound.animate(element.properties.key, true);
            this.enemyGroup.push(hellhound);
            hellhound.setPosition(element.x, element.y - 16);
        });
        // the thing
        const layerArray2 = this.checkObjectsLayerIndex('thing');
        layerArray2 && layerArray2.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const thing = new Thing(this, element.x, element.y - 16, {
                key: element.properties.key,
                name: element.name,
                life: element.properties.life,
                damage: element.properties.damage,
            });
            thing.animate(element.properties.key, true);
            this.enemyGroup.push(thing);
        });
        // the skeletons
        const layerArray3 = this.checkObjectsLayerIndex('skeleton');
        layerArray3 && layerArray3.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const skeleton = new Skeleton(this, element.x, element.y - 16, {
                key: element.properties.key,
                name: element.name,
                life: element.properties.life,
                damage: element.properties.damage,
            });
            //this[element.name].animate(element.properties.key, true);
            skeleton.setPosition(element.x, element.y - 16);
            this.enemyGroup.push(skeleton);
        });
        // the ghosts
        const layerArray4 = this.checkObjectsLayerIndex('ghosts');
        layerArray4 && layerArray4.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const ghost = new Ghost(this, element.x, element.y - 16, {
                key: element.properties.key,
                name: element.name,
                life: element.properties.life,
                damage: element.properties.damage,
            });
            // this[element.name].animate(element.properties.key, true);
            this.enemyGroup.push(ghost);
        });
        // the wizards
        const layerArray5 = this.checkObjectsLayerIndex('wizard');
        layerArray5 && layerArray5.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const wiz = new Wizard(this, element.x, element.y - 16, {
                key: element.properties.key,
                name: element.name,
                life: element.properties.life,
                damage: element.properties.damage,
                delay: element.properties.delay || 0,
            });
            this.enemyGroup.push(wiz);
        });
        
        // the burning ghoul
        const layerArray8 = this.checkObjectsLayerIndex('burningGhoul');
        layerArray8 && layerArray8.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const ghoul = new BurningGhoul(this, element.x, element.y - 16, {
                key: element.properties.key,
                name: element.name,
                life: element.properties.life,
                damage: element.properties.damage,
            });
            ghoul.animate(element.properties.key, true);
            this.enemyGroup.push(ghoul);
        });
        // the platfom spike
        const layerArray9 = this.checkObjectsLayerIndex('platformSpike');
        layerArray9 && layerArray9.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const platformSpike = new PlatformSpike(this, element.x, element.y - 16, {
                key: 'platformSpike',
                name: element.name,
                directionType: element.properties.vertical,
                duration: element.properties.duration,
                damage: element.properties.damage,
            });
            this.platformSpikeGroup.push(platformSpike);
        });
        // the flames
        const layerArray10 = this.checkObjectsLayerIndex('flames');
        layerArray10 && layerArray10.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const flame = new Flames(this, element.x, element.y - 16, {
                key: 'flames',
                name: 'flame',
            });
            flame.animate(element.properties.key, true);
            this.enemyGroup.push(flame);
        });


        // the NPC
        //
        const layerArray7 = this.checkObjectsLayerIndex('npc');
        layerArray7 && layerArray7.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            if(element.name === 'oldman') {
                this.oldman = new Oldman(this, element.x, element.y - 16, {
                    key: element.properties.key,
                    name: element.name,
                });
                this.oldman.animate(element.properties.key, true);
                this.npcGroup.push(this.oldman);
            }
            if(element.name === 'woman') {
                const woman = new Woman(this, element.x, element.y - 16, {
                    key: element.properties.key,
                    name: element.name,
                });
                woman.animate(element.properties.key, true);
                this.npcGroup.push(woman);
            }
            if(element.name === 'bearded') {
                const bearded = new Bearded(this, element.x, element.y - 16, {
                    key: element.properties.key,
                    name: element.name,
                });
                bearded.animate(element.properties.key, true);
                this.npcGroup.push(bearded);
            }
            if(element.name === 'hatman') {
                const hatman = new Hatman(this, element.x, element.y - 16, {
                    key: element.properties.key,
                    name: element.name,
                });
                hatman.animate(element.properties.key, true);
                this.npcGroup.push(hatman);
            }

        });

    }

    addSavestation() {
        const layerArray = this.checkObjectsLayerIndex('savestation');
        if(!layerArray || layerArray.objects.length === 0) {
            return;
        }
        layerArray.objects.forEach((element) => {
            element.properties = this.convertTiledObjectProperties(element.properties);
            const save = new SaveStation(this, element.x + 16, element.y + 6, {
                key: element.properties.key,
                destination: element.properties.destination,
            });
            this.saveStationGroup.push(save);
            this.physics.add.overlap(this.player, save, (player, savestation) => {
                this.saveGame(player, savestation);
                savestation.anims.play('savestation-idle');
            }, null, this.player);
        });
    }

    addParaBack(image) {
        if(!image || (image && !image.length)) {
            return;
        }
        // check image size
        const tex = this.textures.get(image);
        tex.getSourceImage();
        const imgSize = {width: tex.source[0].width, height: tex.source[0].height};
        this.paraBack = this.add.image(0, 0, image).setOrigin(0, 0);
        this.paraBackGroup.push(this.paraBack);
    }

    addParaMiddle(image) {
        if(!image || (image && !image.length)) {
            return;
        }
        // check image size
        const tex = this.textures.get(image);
        tex.getSourceImage();
        const imgSize = {width: tex.source[0].width, height: tex.source[0].height};

        this.paraMiddle = this.add.image(0, 0, image).setOrigin(0, 0);
        this.paraMiddleGroup.push(this.paraMiddle);
        return;
    }

    addParaMiddle2(image) {
        if(!image || (image && !image.length)) {
            return;
        }
        // check image size
        const tex = this.textures.get(image);
        tex.getSourceImage();
        const imgSize = {width: tex.source[0].width, height: tex.source[0].height};

        // check how many images are needed
        const nbrWidth = Math.ceil(this.map.widthInPixels / imgSize.width);
        const nbrHeight = Math.ceil(this.map.heightInPixels / imgSize.height);
        // create new image
        for(let i = 0; i < nbrWidth; i += 1) {
            for(let k = 0; k < nbrHeight; k += 1) {
                this[`para_middle2${i}${k}`] = this.add.image(0 + (imgSize.width * i), 0 + (imgSize.height * k), image)
                    .setDepth(3)
                    .setScrollFactor(0.8, 1)
                    .setOrigin(0, 0)
                this[`para_middle2${i}${k}`].name = [`para_middle2${i}${k}`];
                this.paraMiddleGroup.push(this[`para_middle2${i}${k}`]);
            }
        }
    }

    // ====================================================================
    // HANDLE ROOM ELEMENTS
    openDoor(door) {
        door.openDoor();
    }

    handleElevator(elm) {
        if(this.player.body.touching.down && this.player.keys.down.isDown && elm.state.position === 'up') {
            elm.handleElevator();
        }
        if(this.player.body.touching.down && this.player.keys.up.isDown && elm.state.position === 'down') {
            elm.handleElevator();
        }
    }

    heatEffect() {
        this.backheat = this.add.image(0, 0, 'bgHeat')
            .setDepth(1003)
            .setScrollFactor(1)
            .setOrigin(0, 0)
            // .setDisplaySize(1024, 288)
            // .setPipeline('HeatFx')
            .setScrollFactor(1.8, 0.3);
        this.backheat.blend = 2;

        this.paraBackGroup.forEach((e) => {
            if(this[e.name[0]].active) {
                this[e.name[0]].setPipeline('HeatFx').setTint(0x333333);
            }
        });
        this.paraMiddleGroup.forEach((e) => {
            if(this[e.name[0]].active) {
                this[e.name[0]].setPipeline('HeatFx');
            }
        });
    }

    darkerPara() {
        this.paraMiddleGroup.forEach((e) => {
            if(this[e.name[0]].active) {
                this[e.name[0]].setTint(0x333333);
            }
        });
        this.paraMiddle2Group.forEach((e) => {
            if(this[e.name[0]].active) {
                this[e.name[0]].setTint(0x333333);
            }
        });
        this.paraBackGroup.forEach((e) => {
            if(this[e.name[0]].active) {
                this[e.name[0]].setTint(0x333333);
            }
        });
    }

    adjustParaBack() {
        this.paraBack.setOrigin(0.3, -0.1);
    }

    bossDragon() {
        if(this.player.inventory.boss1 === true) return;
        this.dragon = new BossDragon(this, 258, 170, {key: 'dragon', name: 'dragon'});
        this.enemyGroup.push(this.dragon);
        this.stopMusic();
        this.playMusic('dragonFight');
    }

    addThunderDoorCallback() {
        if(this.player.inventory.thunderDoorReached) {
            return;
        }
        this.solLayer.setTileLocationCallback(1, 50, 7, 4, (e, t) => {
            if(e instanceof Player) {
                this.player.inventory.thunderDoorReached = true;
            }
        }, this);
    }

    checkThunderDoorReached() {
        if(!this.player.inventory.thunderDoorReached) {
            return;
        }
        this.npcGroup.forEach(npc => npc.destroy())
        this.oldman = new Oldman(this, 144, 455 - 16, {
            key: 'oldman-walk',
            name: 'oldman',
        });
        this.oldman.animate('oldman-walk', true);
        this.npcGroup.push(this.oldman);
    }

    showAngel() {
        if(!this.player.inventory.thunderDoorReached || this.player.inventory.waterStorm) {
            return;
        }
        // angelCalling
        this.stopMusic();
        this.playMusic('angelCalling');
        this.angel = new Angel(this, 102, 153, {
            key: 'angel-idle',
            name: 'angel',
        });
        this.angel.animate('angel-idle', true);
        this.npcGroup.push(this.angel);
    }

    checkWaterStorm() {
        //if(!this.player.inventory.waterStorm || this.player.inventory.townInFire) {
            this.enemyGroup.forEach(e => e.destroy());
            return;
        //}
        this.stopMusic();
        this.playMusic('townAttackTheme');
        this.oldman.destroy();
        this.dragon = new BossDragon(this, 388, 311, {key: 'dragon', name: 'dragon'});
        this.enemyGroup.push(this.dragon);
        this.player.inventory.townInFire = true;
        this.battleWithBoss = true;
    }

    callHellBeast() {
        if(this.player.inventory.boss2) {
            if(!this.player.inventory.lavaStorm) {
                this.lavaStormPowerUp.setPosition(195, 195).setAlpha(1)
            }
            return;
        }
        this.lavaStormPowerUp.setAlpha(0);
        this.hellBeast = new HellBeast(this, -100, -100, {key: 'hell-beast-idle', name: 'hellBeast'});
        this.enemyGroup.push(this.hellBeast);
        this.stopMusic();
        //this.playMusic('hellBeastFight');
    }

    callDemon() {
        if(this.player.inventory.bossFinal) {
            return;
        }
        this.stopMusic();
        this.demon = new Demon(this, 24 * 16, 24 * 16, {key: 'finalBoss', name: 'demon'});
        this.enemyGroup.push(this.demon)
        this.physics.add.overlap(this.demon, this.player, elm => this.playerIsHit(elm), null, this);
        this.physics.add.overlap(this.skullGroup, this.player, elm => this.playerIsHit(elm), null, this);
        this.physics.add.overlap(this.breathGroup, this.player, elm => this.playerIsHit(elm), null, this);
        this.physics.add.overlap([
            this.player.knives,
            this.player.swords,
            this.player.axes,
            this.player.waterMagic,
            this.player.lavaMagic,
            this.player.thunderMagic,], this.skullGroup, (elm, bull) => {
                this.enemyExplode(bull.x, bull.y);
                this.sound.play('demonSkullHitSfx');
                bull.destroy()
            }, null, this.player);

        this.physics.add.overlap(this.thunderPower, this.player, (player, thunder) => {
            if(this.thunderOnPlayer) {
                return;
            }
            this.thunderOnPlayer = true;
            thunder.body.setVelocity(0, 0);
            this.time.addEvent({
                delay: 100,
                repeat: this.player.inventory.life - 1,
                callback: () => {
                    if(this.player.inventory.life > 1) {
                        this.demon.resetPipeline();
                        this.player;
                        this.player.inventory.life -= 1;
                        this.player.hitSfx.play();
                        this.events.emit('setHealth', {life: Math.round(this.player.inventory.life)});
                    } else {
                        this.player;
                        this.thunderGateSfx.stop();
                        this.demon.demonThunder.destroy();
                        this.demon.startPhase2();
                    }
                }
            });
        }, null, this);
    }

    noSaveIfEscape() {
        if(!this.player.inventory.escape) {
            return;
        }
        // disable checkpoints during escape
        this.saveStationGroup.forEach(checkpoint => checkpoint.destroy());
    }

    escape() {
        if(!this.player.inventory.escape) {
            return;
        }
        let arr = []
        for(let i = 0; i < 16; i += 1) {
            arr.push(i);
        };
        this.escapeParticles;
        if(this.map.properties.walkSfx === 'churchWalkSfx') {
            this.escapeParticles = this.add.particles('churchParticles').setDepth(200)
        } else {
            this.escapeParticles = this.add.particles('castleParticles').setDepth(200)
        }
        this.escapeParticleEmitter = this.escapeParticles.createEmitter({
            angle: {min: -30, max: -150},
            speed: {min: 100, max: 200},
            frame: arr,
            quantity: 16,
            lifespan: 3000,
            alpha: 1,
            scale: {min: 0.2, max: 3},
            rotate: {
                onEmit: (e) => {
                    return Phaser.Math.Between(0, 90);
                }
            },
            gravityY: 500,
            on: false,
        });

        // shake camera
        this.events.emit('count');
        let rdm = Phaser.Math.Between(2000, 5000);
        this.escapeTimer = this.time.addEvent({
            delay: rdm,
            repeat: -1,
            callback: () => {
                if(!this.player.inventory.escape) {
                    this.escapeTimer = null;
                    return;
                }
                this.shakeCameraEscape(1000);
                const pos = this.getCamCenter();
                const rdm = Phaser.Math.Between(-400, 600);
                this.escapeParticleEmitter.explode(10, pos.x + rdm, pos.y - 150);
            }
        });

        this.stopMusic();
        this.playMusic('escapeTheme');
    }

    // ====================================================================
    // CAMERA EFFECTS
    shakeCamera(e) {
        if(!this.cameraIsShaking) {
            this.cameraIsShaking = true;
            this.cameras.main.shake(e, 0.025);
            this.sound.play('impact', {rate: 0.5});
            this.time.addEvent({
                delay: e,
                callback: () => {
                    this.cameraIsShaking = false;
                },
            });
        }
    }

    shakeCameraEscape(e) {
        if(!this.cameraIsShaking) {
            this.cameraIsShaking = true;
            this.cameras.main.shake(e, 0.025);
            this.sound.play('impact', {rate: 0.5});
            this.time.addEvent({
                delay: e,
                callback: () => {
                    this.cameraIsShaking = false;
                },
            });
        }
    }

    flashCamera() {
        this.cameras.main.flash(1000);
    }


    // ====================================================================
    // HELPERS
    // checkObjectsLayerIndex(layerName) {
    //     const arr = this.map.objects.filter(elm => elm.name === layerName);
    //     if(!arr.length) {
    //         return null;
    //     }
    //     return arr[0];
    // }

    countTime() {
        this.firstTimestamp = countTime(this.firstTimestamp);
    }

    getCamCenter() {
        return {x: this.cameras.main.scrollX + WIDTH / 2, y: this.cameras.main.scrollY + HEIGHT / 2};
    }

    getCamOrigin() {
        return {x: this.cameras.main.scrollX, y: this.cameras.main.scrollY};
    }

    // ====================================================================
    // The end

    callBackEndMission() {
        if(!this.player.inventory.escape) {
            return;
        }
        this.solLayer.setTileLocationCallback(0, 10, 20, 4, (e, t) => {
            if(e instanceof Player) {
                this.endMission();
            }
        }, this);


    }

    endMission() {
        if(this.isTheEnd) {
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
        this.countTime();
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
            onComplete: () => {
                this.time.addEvent({
                    delay: 3000,
                    callback: () => {
                        this.stopMusic();
                        this.scene.start('endGame');
                    }
                });
            },
        });
    }
}
