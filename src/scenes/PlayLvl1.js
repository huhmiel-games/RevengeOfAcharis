import { Scene } from 'phaser';
import U from '../utils/usefull';
import Player from '../player/Player';
import PowerUp from '../player/powerUp';
import HellHound from '../enemies/HellHound';
import Thing from '../enemies/Thing';
import Skeleton from '../enemies/Skeleton';
import Ghost from '../enemies/Ghost';
import Wizard from '../enemies/Wizard';
import BurningGhoul from '../enemies/BurningGhoul';
import Thunder from '../enemies/Thunder';
import Woman from '../npc/Woman';
import Bearded from '../npc/Bearded';
import Hatman from '../npc/Hatman';
import Oldman from '../npc/Oldman';
import Angel from '../npc/Angel';
import BossDragon from '../enemies/BossDragon';
import HellBeast from '../enemies/HellBeast';
import Doors from '../utils/Doors';
import SaveStation from '../utils/saveStation';
import countDeadEnemies from '../utils/counDeadEnemies';
import countTime from '../utils/countTime';

// import shaders
import GlowFx from '../shaders/glowFx';
import GlowFixedFx from '../shaders/glowFixed';
import TestFx from '../shaders/testShaders';
import HeatFx from '../shaders/heatFx';

export default class playLvl1 extends Scene {
  constructor() {
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
    this.map = this.make.tilemap(this, { key: 'map1', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);

    // initialize the time
    this.firstTimestamp = new Date().getTime();
    if (!localStorage.getItem('time')) {
      localStorage.setItem('time', 0);
    }

    // call stopFullscreen on esc key to prevent phaser 16.2 bug on esc key
    this.leaveFullscreenKey = this.input.keyboard.addKey('ESC')
      .on('down', () => {
        this.scale.stopFullscreen();
      });

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
    this.paraBackGroup = [];
    this.paraMiddleGroup = [];
    this.paraMiddle2Group = [];
    this.fireballGroup = [];
    this.npcGroup = [];


    // ====================================================================
    // AMBIENT MUSIC
    this.musicGroup = [];
    this.ambient1 = this.sound.add('ambient1', { volume: 0.2, loop: true });
    this.ambient2 = this.sound.add('ambient2', { volume: 0.1, loop: true });
    this.ambient3 = this.sound.add('ambient3', { volume: 0.1, loop: true });

    this.musicGroup.push(this.ambient1, this.ambient2, this.ambient3);

    // ====================================================================
    // PLAYER SECTION
    this.player = new Player(this, 80,170, { key: 'player' }); // 458, 122 4 * 16, 6 * 16
    this.playerHurt = false;
    this.player.body.setCollideWorldBounds(true);

    // player walk and run sounds
    this.walkplay = false;
    this.walkk = this.sound.add('run', { volume: 0.8 });
    this.player.on('animationupdate', () => {
      const runSpeedNow = Math.abs(this.player.body.velocity.x);
      const runTimer = runSpeedNow > 0 ? (1000 / runSpeedNow) * 50 : 330;
      if (this.player.anims.currentAnim.key === 'playerRun' && !this.walkplay && this.player.body.blocked.down) {
        this.walkplay = true;
        this.walkk.play();
        this.time.addEvent({
          delay: runTimer,
          callback: () => {
            this.walkplay = false;
          },
        });
      }
      if (this.player.anims.currentAnim.key === 'playerWalk' && !this.walkplay && this.player.body.blocked.down) {
        this.walkplay = true;
        this.walkk.play();
        this.time.addEvent({
          delay: 330,
          callback: () => {
            this.walkplay = false;
          },
        });
      }
    });
    // player bullets
    this.player.knives = this.physics.add.group({
      defaultKey: 'knife',
      maxSize: 10,
      allowGravity: false,
      createIfNull: true,
    });
    // player missiles
    this.player.axes = this.physics.add.group({
      defaultKey: 'axe',
      maxSize: 1,
      allowGravity: false,
      createIfNull: true,
    });
    // player swell
    this.player.swords = this.physics.add.group({
      defaultKey: 'sword',
      maxSize: 10,
      allowGravity: false,
      createIfNull: true,
    });
    // magics
    this.player.waterMagic = this.physics.add.group({
      defaultKey: 'water-storm',
      maxSize: 1,
      allowGravity: false,
      createIfNull: true,
    });
    this.player.lavaMagic = this.physics.add.group({
      defaultKey: 'lava-storm',
      maxSize: 25,
      allowGravity: false,
      createIfNull: true,
    });
    this.player.thunderMagic = this.physics.add.group({
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
    this.playerFlashTween = null;
    console.log(this);

    // SHADERS for player
    // ondulation
    if (this.hasWebGL()) {
      this.t = 0.0;
      this.t2 = 0.0;
      this.t3 = 0;
      // glow
      this.glowFx = this.game.renderer.addPipeline('GlowFx', new GlowFx(this.game));
      this.glowFx.setFloat1('alpha', 1.0);
      this.glowFixedFx = this.game.renderer.addPipeline('GlowFixedFx', new GlowFixedFx(this.game));
      this.glowFixedFx.setFloat1('alpha', 1.0);
      // heat
      this.heatFx = this.game.renderer.addPipeline('HeatFx', new HeatFx(this.game));
      this.heatFx.setFloat1('time', this.t2);

      // TEST SHADERS
      this.testFx = this.game.renderer.addPipeline('TestFx', new TestFx(this.game));
      this.testFx.setFloat2('u_resolution', this.game.config.width, this.game.config.height);
      this.testFx.setFloat2('resolution', this.game.config.width, this.game.config.height);
      this.testFx.setFloat2('mouse', this.player.x, this.player.y);
    }
    
    

    // ====================================================================
    // loading saved game
    if (this.data.systems.settings.data.loadSavedGame) {
      this.loadGame();
    }
    // creating new game
    if (!localStorage.getItem('RevengeOfAcharis')) {
      // this.transmission('New transmision-A problem occured during-the material transfer on planet-Sorry for inconvenience.');
      this.player.inventory.savedPositionX = 4 * 16;
      this.player.inventory.savedPositionY = 9 * 16;
      const s = JSON.stringify(this.player.inventory);
      localStorage.setItem('RevengeOfAcharis', s);
      this.loadGame();
    }

    this.explodeSprite = this.add.group({
      defaultKey: 'enemies',
      frame: ['enemy-death-1', 'enemy-death-2', 'enemy-death-3', 'enemy-death-4', 'enemy-death-5'],
      maxSize: 30,
      allowGravity: false,
      createIfNull: true,
    });

    // particles for map tiles exploded
    this.tileParticles = this.add.particles('blackPixel');
    this.tileEmitter = this.tileParticles.createEmitter({
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
    // .setRenderToTexture(this.spawnFx);
    //this.cameras.main.setRenderToTexture().setPipeline('GlowFixedFx');

    // set the fps to 120 for good collisions at high speed
    this.physics.world.setFPS(120);

    // toggler for pause button
    this.isPausing = false;

    // ====================================================================
    // load the dashBoard
    this.events.emit('loadingDone');

    // DEBUG / HELPERS
    this.text1 = this.add.text(10, 226, '', { fill: '#00ff00' }).setDepth(5000);
  }

  // ====================================================================
  update(time) {
    // DEBUG
    const pointer = this.input.activePointer;
    // test shaders
    if (this.glowFx) {
      this.glowFx.setFloat1('time', this.t);
      this.heatFx.setFloat1('time', this.t2);
      this.testFx.setFloat1('time', this.t2 * 10);
      this.t += 0.1;
      this.t2 += 0.03;
    }
    
    //

    this.text1.setText([
      `x: ${Math.round(pointer.worldX)}`,
      `y: ${Math.round(pointer.worldY)}`,
    ]);
    this.text1.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY + 226);
    

    // if (this.playerLight && this.player) {
    //   this.playerLight.setPosition(this.player.body.x, this.player.body.y);
    // } else {
    //   this.playerLight.setPosition(-10000, -10000);
    // }
    // ====================================================================

    if (this.state.displayPowerUpMsg) {
      this.msgtext.x = this.player.x;
      this.msgtext.y = this.player.y - 60;
    }
    if (this.modalText) {
      this.modalText.x = this.player.x;
      this.modalText.y = this.player.y - 100;
    }
    // anti fall trough map
    if (this.player.y > this.map.heightInPixels) {
      this.player.setPosition(this.map.widthInPixels / 2, this.map.heightInPixels / 2);
    }
  }


  hasWebGL() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl && gl instanceof WebGLRenderingContext) {
      return true;
    }
    return false;
  }
  // ====================================================================

  playMusic(music) {
    for (let i = 0; i < this.musicGroup.length; i += 1) {
      if (this.musicGroup[i].isPlaying && this.musicGroup[i].key === music) {
        break;
      }
      this.musicGroup[i].stop();
      this[music].play();
    }
  }

  sismicActivity() {
    if (!this.onSismic) {
      this.onSismic = true;
      const rdm = Phaser.Math.Between(2000, 5000);
      this.shakeCamera(1000);
      this.sound.play('shake', { volume: 0.5 });
      // this.sound.play('shake2', { volume: 0.5 });
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
    if (elm.state.ability === 'energy') {
      this.player.addEnergy();
      this.events.emit('setHealth', { life: this.player.inventory.life });
    } else if (elm.state.ability === 'bullet') {
      this.player.addBullet(elm);
    } else if (elm.state.ability === 'missile') {
      this.player.addMissile();
    } else if (elm.state.ability === 'swell') {
      this.player.inventory[elm.state.ability] = true;
      this.player.addSwell();
    } else if (elm.state.ability === 'waterStorm') {
      this.player.inventory[elm.state.ability] = true;
      this.player.addMagic('waterStorm');
    } else if (elm.state.ability === 'lavaStorm') {
      this.player.inventory[elm.state.ability] = true;
      this.player.addMagic('lavaStorm');
    } else if (elm.state.ability === 'thunderStorm') {
      this.player.inventory[elm.state.ability] = true;
      this.player.addMagic('thunderStorm');
    } else {
      this.player.inventory[elm.state.ability] = true;
    }
    this.sound.play('powerUp');
    this.player.inventory.powerUp[elm.state.id] = 1;

    this.pauseGamePowerUp();
    this.msgtext = this.add.bitmapText(0, 0, 'atomic', elm.state.text, 12, 1)
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
        this.state.displayPowerUpMsg = false;
      },
    });
  }

  // ====================================================================
  // GAME PAUSE
  pauseGamePowerUp() {
    if (this.isPausing) {
      return;
    }
    if (!this.isPausing && !this.player.state.pause) {
      this.isPausing = true;
      // this.events.emit('pause');
      // this.countTime();
      this.player.state.pause = true;
      this.physics.pause();
      this.player.anims.play('stand');
      this.player.setFrame('adventurer-cast-01');
      // this.time.addEvent({
      //   delay: 120,
      //   callback: () => {
      //     this.isPausing = false;
      //   },
      // });
      this.time.addEvent({
      delay: 3000,
      callback: () => {
        this.isPausing = false;
        this.player.state.pause = false;
        this.scene.scene.physics.resume();
        this.player.anims.resume(this.player.anims.currentFrame);
      }
    });
      return;
    }
    // this.isPausing = true;
    // this.events.emit('unpause');
    // this.player.state.pause = false;
    // this.scene.scene.physics.resume();
    // this.player.anims.resume(this.player.anims.currentFrame);
    
  }

  pauseGame() {
    if (this.isPausing) {
      return;
    }
    if (!this.isPausing && !this.player.state.pause) {
      this.isPausing = true;
      this.events.emit('pause');
      this.countTime();
      this.player.anims.play('stand');
      this.player.state.pause = true;
      this.physics.pause();
      this.lifeText = this.add.bitmapText(U.WIDTH/2, U.HEIGHT/2, 'atomic', 'PAUSE')
      .setFontSize(10)
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
    this.player.state.pause = false;
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
    if (this.player.state.pause) {
      if (this.lastPosition === 1) {
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
    if (this.player.state.pause) {
      if (this.lastPosition === 0) {
        this.events.emit('unpause');
        this.player.state.pause = false;
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
      if (this.lastPosition === 1) {
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
    if (elm.state.damage === 0) {
      return;
    }
    if (!this.playerHurt) {
      this.playerHurt = true; // flag
      this.sound.play('playerHit');
      this.player.inventory.life -= elm.state.damage;
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
          // this.player.animate('stand');
        },
      });
      // if player is dead, launch deadth sequence
      if (this.player.inventory.life <= 0) {
        this.playerDeathSequence();
      }
    }
    // set health dashboard scene
    this.events.emit('setHealth', { life: Math.round(this.player.inventory.life) });
  }

  playerOnSpikes(int) {
    if (!this.playerHurt) {
      this.playerHurt = true; // flag
      this.player.state.runSpeed = 285;
      this.sound.play('playerHit');
      this.player.inventory.life -= int;
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
          // this.player.animate('stand');
        },
      });
      // if player is dead, launch deadth sequence
      if (this.player.inventory.life <= 0) {
        this.playerDeathSequence();
      }
      this.events.emit('setHealth', { life: this.player.inventory.life }); // set health dashboard scene
    }
  }

  // ====================================================================
  playerDeathSequence() {
    this.player.state.dead = true;
    this.playerDead = true;
    this.physics.pause();
    this.input.enabled = false;
    this.player.anims.play('die');
    this.playerFlashTween.stop();
    this.player.inventory.life = 0;
    this.player.setPipeline('GlowFixedFx')
    this.player.setDepth(2000);

    this.round = this.add.sprite(this.cameras.main.scrollX, this.cameras.main.scrollY, 'blackpixel');
    this.round
      .setOrigin(0, 0)
      .setDepth(1000)
      .setAlpha(0)
      .setTintFill(0x0C1D1C)
      .setDisplaySize(U.WIDTH, U.HEIGHT);
    
    this.sound.play('playerDead', { volume: 0.2 });

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
    // this.bossMusic.stop();
    this.ambient1.stop();
    this.ambient2.stop();
    this.ambient3.stop();
    this.countTime();
    this.player.state.dead = false;
    this.scene.start('gameOver');
  }


  // ====================================================================
  enemyIsHit(bull, elm) {
    const el = elm;
    if (!el.getFired) {
      el.getFired = true;

      // if skeleton not rised don't do anything
      if (elm instanceof Skeleton) {
        if (!el.isAttacking) {
          el.getFired = false;
          return;
        }
      }
      // destroy the weapon
      if (this.player.state.selectedWeapon === 'missile'
      || this.player.state.selectedWeapon === 'bullet'
      || this.player.state.selectedWeapon === 'swell'
      ) {
        this.player[`${this.player.state.selectedWeapon}Kill`](bull);
      }

      if (this.player.state.selectedWeapon === 'waterStorm') {
        // destroy the thunder door
        if ( el instanceof Thunder) {
          el.destroy();
          this.player.inventory.thunderDoorOpen = true;
          return;
        }
        // No damage on hellBeast with waterStorm
        if ( el.name ==='hellBeast') {
          el.getFired = false;
          return;
        }
      }
      // No damage to hellBeast during his lava attacks
      if (el.name ==='hellBeast' && el.isLavaAttack) {
        el.getFired = false;
        return;
      }
      
      // enemy loose life
      el.looseLife(this.player.inventory[`${this.player.state.selectedWeapon}Damage`]);
      el.setTintFill(0xDDDDDD);
      this.time.addEvent({
        delay: 50,
        callback: () => {
          el.clearTint();
        },
      });

      this.hitTimer = this.time.addEvent({
        delay: 120,
        callback: () => {
          el.getFired = false;
        },
      });
    }
    // enemy is dead
    if (el.state.life <= 0) {
      el.clearTint();
      el.explode();
      // kill the enemy
      this.giveLife = this.physics.add.sprite(el.x, el.y, 'heart');
      this.giveLife.setDepth(105)//.setPipeline('GlowFx');
      this.giveLife.health = el.state.giveLife;
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
    this.sound.play('explo2', { volume: 0.3 });
    if (exp) {
      exp.anims.play('bossExplode').on('animationrepeat', () => {
        this.sound.play('explo2', { volume: 0.3 });
      }).on('animationcomplete', () => {
        exp.destroy();
      });
    }
  }

  enemyExplode(x, y) {
    const exp = this.explodeSprite.getFirstDead(true, x, y - 8, 'enemyExplode', null, true).setDepth(107);
    exp.anims.play('enemyExplode').on('animationcomplete', () => {
      exp.destroy();
    });
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
    if (player === this.player && !savestation.isOverlap) {
      savestation.setIsOverlap();
      this.player.inventory.savedPositionX = this.player.x;
      this.player.inventory.savedPositionY = this.player.y;
      this.player.inventory.map = savestation.state.destination;
      console.log(this.player.inventory)
      const s = JSON.stringify(this.player.inventory);
      localStorage.setItem('RevengeOfAcharis', s);
      this.sound.play('melo');
      this.msgText = this.add.bitmapText(this.cameras.main.worldView.x + 200, this.cameras.main.worldView.y + 128, 'atomic', 'Game Saved', 30, 1)
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
    this.lights.lights.forEach(light => this.lights.removeLight(light));
    // create room
    this.map = this.make.tilemap({ key: room, tileWidth: 16, tileHeight: 16 });
    this.playerPosition = room;
    this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);
    this.addParaBack(this.map.properties.paraBack);
    this.addParaMiddle(this.map.properties.paraMiddle);
    this.addParaMiddle2(this.map.properties.paraMiddle2);
    this.addLayers();
    // this.addSceneLights();
    this.addDoors();
    this.player.x = this.player.inventory.savedPositionX + 24;
    this.player.y = this.player.inventory.savedPositionY;
    this.addColliders();
    this.addPowerUp();
    this.addEnemies();
    // launch special functions from the room
    if (this.map.properties.callFunction && this.map.properties.callFunction.length) {
      const arr = this.map.properties.callFunction.split(',');
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
    if (this.battleWithBoss) return;
    // if door closed, return!!
    if (doorP && doorP.alpha === 1) {
      return;
    }
    if (this.playerIsPassingDoor) {
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
    // this.lights.lights.forEach(light => light.setPosition(-10000, -10000)); // this.lights.removeLight(light));

    // create new room
    this.map = this.make.tilemap({ key: doorP.state.destination, tileWidth: 16, tileHeight: 16 });
    this.playerPosition = doorP.state.destination;
    this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);
    this.addLayers();
    // this.addSceneLights();
    this.addDoors();
    this.addParaBack(this.map.properties.paraBack);
    this.addParaMiddle(this.map.properties.paraMiddle);
    this.addParaMiddle2(this.map.properties.paraMiddle2);
    this.addSavestation();
    this.cameras.main.stopFollow();
    this.cameras.main.setScroll(doorP.state.playerX * 16, doorP.state.playerY * 16);
    if (doorP.state.side === 'left') {
      this.player.body.reset(doorP.state.playerX * 16, doorP.state.playerY * 16 + 20);
    } else {
      this.player.body.reset(doorP.state.playerX * 16 + 12 , doorP.state.playerY * 16 + 20);
    }
    this.addEnemies();
    this.addColliders();
    this.addPowerUp();
    // launch special functions from the room
    if (this.map.properties.callFunction && this.map.properties.callFunction.length) {
      const arr = this.map.properties.callFunction.split(',');
      arr.forEach(elm => this[elm]());
    }
    this.playMusic(this.map.properties.music);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
    this.cameras.main.fadeIn(50);
    this.physics.world.setBoundsCollision();
    this.playerIsPassingDoor = false;
    console.log(this);
  }

  // ====================================================================
  // HANDLE CRUMBLE TILES
  addCrumbleTiles() {
    const { CrumbleStartX, CrumbleStartY, CrumbleLength } = this.map.properties;
    this.solLayer.setTileLocationCallback(CrumbleStartX, CrumbleStartY, CrumbleLength, 1, (e, t) => this.handleCrumbleTile(e, t), this);
  }

  handleCrumbleTile(e, t) {
    
    if (!(e instanceof Player)) {
      return;
    }
    let { crumbleTimer } = t.properties;
    if (!crumbleTimer) crumbleTimer = 100;
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
    if (this.map.properties.CrumbleResetTime) {
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
  addPath() {
    const layerArray = this.checkObjectsLayerIndex('path');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      const poly = element.polyline;
      const pathOriginX = element.properties.originX;
      const pathOriginY = element.properties.originY;
      this.pathCrabs = new Phaser.Curves.Path(pathOriginX + poly[0].x, pathOriginY + poly[0].y);
      poly.forEach(line => this.pathCrabs.lineTo(line.x + pathOriginX, line.y + pathOriginY));
      this[`path${element.name}`] = this.add.follower(this.pathCrabs, pathOriginX, pathOriginY, 'blackPixel');
      this[`path${element.name}`].setVisible(true);
      this[`path${element.name}`].setTintFill(0xFF0000);
      this[`path${element.name}`].name = element.name;
      this[`path${element.name}`].startFollow({
        duration: element.properties.duration,
        yoyo: false,
        repeat: -1,
        rotateToPath: true,
        verticalAdjust: false,
      });
      this.pathGroup.push(this[`path${element.name}`]);
      // graphics for debug
      const graphics = this.add.graphics();

      graphics.lineStyle(1, 0xffffff, 1); // what is 1, , 1

      this.pathCrabs.draw(graphics, 328); // what is 328
    });
  }

  addColliders() {
    this.solLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.solLayer, null, (e, t) => {
      // if player is on spikes
      if (t.index === 968 || t.index === 969) {
        this.playerOnSpikes(20);
      }
      return true;
    }, this);

    this.physics.add.collider(this.enemyGroup, this.solLayer, null);
    this.physics.add.collider(this.enemyGroup, this.doorGroup, (e, d) => {
      if (this[e.name] === undefined) {
        e.destroy();
        return;
      }
      this[e.name].checkCollision(d);
    }, null, this);
    this.physics.add.collider([this.player.knives, this.player.swords, this.player.axes], this.solLayer, this.player.bulletKill, null, this.player);
    this.physics.add.collider([this.player.knives, this.player.swords, this.player.axes], this.doorGroup, (d, miss) => this.openDoor(d, miss), null, this);
    this.physics.add.overlap(this.giveLifeGroup, this.player, elm => this.player.getLife(elm), null, this.player);
    this.physics.add.overlap(this.powerups, this.player, elm => this.getPowerUp(elm), null, this);
    this.physics.add.overlap(this.enemyGroup, this.player, elm => this.playerIsHit(elm), null, this);
    this.physics.add.overlap(this.fireballGroup, this.player, elm => this.playerIsHit(elm), null, this);
    this.physics.add.overlap([
      this.player.knives,
      this.player.swords,
      this.player.axes,
      this.player.waterMagic,
      this.player.lavaMagic,
      this.player.thunderMagic,], this.enemyGroup, (elm, bull) => this.enemyIsHit(bull, elm), null, this.player);
    this.physics.add.overlap(this.player, this.doorGroup, (player, door) => this.changeRoom(player, door), null, this);
  }

  addLayers() {
    this.solLayer = this.map.createDynamicLayer('collideGround', this.tileset, 0, 0)
      .setDepth(11);
    this.backLayer = this.map.createStaticLayer('back', this.tileset, 0, 0)
      .setDepth(4);
    this.middleLayer = this.map.createStaticLayer('middle', this.tileset, 0, 0)
      .setDepth(5);
    this.middleLayer2 = this.map.createDynamicLayer('middle2', this.tileset, 0, 0)
      .setDepth(10);
    this.frontLayer = this.map.createDynamicLayer('front', this.tileset, 0, 0)
      .setDepth(106)//.setPipeline('Light2D');
  }

  addPowerUp() {
    const layerArray = this.checkObjectsLayerIndex('powerup');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      if (this.player.inventory.powerUp[element.properties.id] === 0) {
        this[element.name] = new PowerUp(this, element.x, element.y - 16, {
          key: element.properties.key,
          name: element.properties.name,
          ability: element.properties.ability,
          text: element.properties.text,
          id: element.properties.id,
        });
        if (element.properties.key === 'heart') this[element.name].setDisplaySize(20, 20);
        this[element.name].setDisplayOrigin(0, 0).animate(element.properties.powerup, true);
        this[element.name].body.setSize(16, 16).setAllowGravity(false);
        this.powerups.push(this[element.name]);
      }
    });
  }

  addDoors() {
    const layerArray = this.checkObjectsLayerIndex('doors');
    layerArray.objects.forEach((element, i) => {
      if (element.properties.side === 'right') {
        this[element.name] = new Doors(this, element.x + 6, element.y + 9, {
          key: 'blackPixel',
          name: element.name,
          side: element.properties.side,
          playerX: element.properties.playerX,
          playerY: element.properties.playerY,
          destination: element.properties.destination,
          openWith: element.properties.openWith,
        });
        this[element.name].body.setSize(10, 47);
      }
      if (element.properties.side === 'left') {
        this[element.name] = new Doors(this, element.x + 16, element.y + 9, {
          key: 'blackPixel',
          name: element.name,
          side: element.properties.side,
          playerX: element.properties.playerX,
          playerY: element.properties.playerY,
          destination: element.properties.destination,
          openWith: element.properties.openWith,
        });
        this[element.name].flipX = true;
        this[element.name].body.setSize(10, 47);
      }
      this.doorGroup.push(this[element.name]);
      this.openDoor(this[element.name]);
    });
  }

  addSceneLights() {
    return;
    // Clean up existing lights (need more testing and optimization)
    if (this.lights.lights.length > 0) {
      this.lights.culledLights.forEach(light => this.lights.removeLight(light));
      this.lights.lightPool.forEach(light => this.lights.removeLight(light));
      this.lights.lights.forEach(light => this.lights.removeLight(light));
      this.lights.forEachLight(elm => this.lights.removeLight(elm));
    }
    // enable the light system
    this.lights.enable();
    // Player light
    this.playerLight = this.lights.addLight(this.player.x, this.player.y + 48, 48, 0xFCDECA, 0.4);
    // add room ambient lights
    const layerArray = this.checkObjectsLayerIndex('lights');
    if (layerArray) {
      layerArray.objects.forEach((element) => {
        this.lights.addLight(element.x, element.y, element.properties.radius, element.properties.color, element.properties.intensity);
      });
    }
    if (this.map.properties.ambientColor) {
      this.lights.setAmbientColor(this.map.properties.ambientColor);
      return;
    }
    this.lights.setAmbientColor(0x222222);
  }

  addEnemies() {
    // the hellHound
    const layerArray = this.checkObjectsLayerIndex('hellhound');
    layerArray && layerArray.objects.forEach((element) => {
      this[element.name] = new HellHound(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
      this[element.name].setPosition(element.x, element.y - 16);
    });
    // the thing
    const layerArray2 = this.checkObjectsLayerIndex('thing');
    layerArray2 && layerArray2.objects.forEach((element) => {
      this[element.name] = new Thing(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
    });
    // the skeletons
    const layerArray3 = this.checkObjectsLayerIndex('skeleton');
    layerArray3 && layerArray3.objects.forEach((element) => {
      this[element.name] = new Skeleton(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      //this[element.name].animate(element.properties.key, true);
      this[element.name].setPosition(element.x, element.y - 16);
      this.enemyGroup.push(this[element.name]);
    });
    // the ghosts
    const layerArray4 = this.checkObjectsLayerIndex('ghosts');
    layerArray4 && layerArray4.objects.forEach((element) => {
      this[element.name] = new Ghost(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
    });
    // the wizards
    const layerArray5 = this.checkObjectsLayerIndex('wizard');
    layerArray5 && layerArray5.objects.forEach((element) => {
      this[element.name] = new Wizard(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this.enemyGroup.push(this[element.name]);
    });
    // the storm
    if (!this.player.inventory.thunderDoorOpen) {
      const layerArray6 = this.checkObjectsLayerIndex('thunder');
      layerArray6 && layerArray6.objects.forEach((element) => {
        this[element.name] = new Thunder(this, element.x, element.y - 16, {
          key: element.properties.key,
          name: element.name,
          life: element.properties.life,
          damage: element.properties.damage,
        });
        this[element.name].animate(element.properties.key, true);
        this.enemyGroup.push(this[element.name]);
      });
    }
    // the burning ghoul
    const layerArray8 = this.checkObjectsLayerIndex('burningGhoul');
    layerArray8 && layerArray8.objects.forEach((element) => {
      this[element.name] = new BurningGhoul(this, element.x, element.y - 16, {
        key: element.properties.key,
        name: element.name,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
    });


    // the NPC
    //
    const layerArray7 = this.checkObjectsLayerIndex('npc');
    layerArray7 && layerArray7.objects.forEach((element) => {
      if (element.name === 'oldman') {
        this[element.name] = new Oldman(this, element.x, element.y - 16, {
          key: element.properties.key,
          name: element.name,
        });
        this[element.name].animate(element.properties.key, true);
        this.npcGroup.push(this[element.name]);
      }
      if (element.name === 'woman') {
        this[element.name] = new Woman(this, element.x, element.y - 16, {
          key: element.properties.key,
          name: element.name,
        });
        this[element.name].animate(element.properties.key, true);
        this.npcGroup.push(this[element.name]);
      }
      if (element.name === 'bearded') {
        this[element.name] = new Bearded(this, element.x, element.y - 16, {
          key: element.properties.key,
          name: element.name,
        });
        this[element.name].animate(element.properties.key, true);
        this.npcGroup.push(this[element.name]);
      }
      if (element.name === 'hatman') {
        this[element.name] = new Hatman(this, element.x, element.y - 16, {
          key: element.properties.key,
          name: element.name,
        });
        this[element.name].animate(element.properties.key, true);
        this.npcGroup.push(this[element.name]);
      }
      
    });

  }

  addSavestation() {
    const layerArray = this.checkObjectsLayerIndex('savestation');
    if (!layerArray || layerArray.objects.length === 0) {
      return;
    }
    layerArray.objects.forEach((element) => {
      this[element.name] = new SaveStation(this, element.x + 16, element.y + 6, {
        key: element.properties.key,
        destination: element.properties.destination,
      });
      this.saveStationGroup.push(this[element.name]);
      this.physics.add.overlap(this.player, this[element.name], (player, savestation) => {
        this.saveGame(player, savestation);
        savestation.anims.play('savestation-idle');
        }, null, this.player);
    });
  }

  addParaBack(image) {
    if (!image || (image && !image.length)) {
      return;
    }
    // check image size
    const tex = this.textures.get(image);
    tex.getSourceImage();
    const imgSize = { width: tex.source[0].width, height: tex.source[0].height };
    this.paraBack = this.add.image(0, 0, image).setOrigin(0, 0);

    // this.paraBack
    //   .setScrollFactor(0.3, 1)
    //   .setOrigin(0.3, 0)
    this.paraBackGroup.push(this.paraBack);
    // check how many images are needed
    // const nbrWidth = Math.ceil(this.map.widthInPixels / imgSize.width);
    // const nbrHeight = Math.ceil(this.map.heightInPixels / imgSize.height);
    // // create new image
    // for (let i = 0; i < nbrWidth; i += 1) {
    //   for (let k = 0; k < nbrHeight; k += 1) {
    //     this[`para_back${i}${k}`] = this.add.image(0 + (imgSize.width * i), 0 + (imgSize.height * k), image)
    //       .setDepth(0)
    //       .setScrollFactor(0.2, 1)
    //       .setOrigin(0, 0)
    //     this[`para_back${i}${k}`].name = [`para_back${i}${k}`];
    //     this.paraBackGroup.push(this[`para_back${i}${k}`]);
    //   }
    // }
  }

  addParaMiddle(image) {
    if (!image || (image && !image.length)) {
      return;
    }
    // check image size
    const tex = this.textures.get(image);
    tex.getSourceImage();
    const imgSize = { width: tex.source[0].width, height: tex.source[0].height };

    this.paraMiddle = this.add.image(0, 0, image)
    this.paraMiddle
      .setScrollFactor(0.4, 1)
      .setOrigin(0, 0)
    this.paraMiddleGroup.push(this.paraMiddle);
    return;
    // check how many images are needed
    const nbrWidth = Math.ceil(this.map.widthInPixels / imgSize.width);
    const nbrHeight = Math.ceil(this.map.heightInPixels / imgSize.height);
    // create new image
    for (let i = 0; i < nbrWidth; i += 1) {
      for (let k = 0; k < nbrHeight; k += 1) {
        this[`para_middle${i}${k}`] = this.add.image(0 + (imgSize.width * i), 0 + (imgSize.height * k), image)
          .setDepth(3)
          .setScrollFactor(0.4, 1)
          .setOrigin(0, 0)
        this[`para_middle${i}${k}`].name = [`para_middle${i}${k}`];
        this.paraMiddleGroup.push(this[`para_middle${i}${k}`]);
      }
    }
  }

  addParaMiddle2(image) {
    if (!image || (image && !image.length)) {
      return;
    }
    // check image size
    const tex = this.textures.get(image);
    tex.getSourceImage();
    const imgSize = { width: tex.source[0].width, height: tex.source[0].height };

    // check how many images are needed
    const nbrWidth = Math.ceil(this.map.widthInPixels / imgSize.width);
    const nbrHeight = Math.ceil(this.map.heightInPixels / imgSize.height);
    // create new image
    for (let i = 0; i < nbrWidth; i += 1) {
      for (let k = 0; k < nbrHeight; k += 1) {
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
  openDoor(d, miss) {
    d.openDoor();
    if (miss) miss.destroy();
  }

  handleElevator(elm) {
    if (this.player.body.touching.down && this.player.keys.down.isDown && elm.state.position === 'up') {
      elm.handleElevator();
    }
    if (this.player.body.touching.down && this.player.keys.up.isDown && elm.state.position === 'down') {
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
      if (this[e.name[0]].active) {
        this[e.name[0]].setPipeline('HeatFx').setTint(0x333333);
      }
    });
    this.paraMiddleGroup.forEach((e) => {
      if (this[e.name[0]].active) {
        this[e.name[0]].setPipeline('HeatFx');
      }
    });
  }

  darkerPara() {
    this.paraMiddleGroup.forEach((e) => {
      if (this[e.name[0]].active) {
        this[e.name[0]].setTint(0x333333);
      }
    });
    this.paraMiddle2Group.forEach((e) => {
      if (this[e.name[0]].active) {
        this[e.name[0]].setTint(0x333333);
      }
    });
    this.paraBackGroup.forEach((e) => {
      if (this[e.name[0]].active) {
        this[e.name[0]].setTint(0x333333);
      }
    });
  }

  bossDragon() {
    if (this.player.inventory.boss1 === true) return;
    this.dragon = new BossDragon(this, 258,170, { key: 'dragon', name: 'dragon' });
    this.enemyGroup.push(this.dragon)
  }

  addThunderDoorCallback() {
    if (this.player.inventory.thunderDoorReached) {
      return;
    }
    this.solLayer.setTileLocationCallback(1, 50, 7, 4, (e, t) => {
      if (e instanceof Player) {
        this.player.inventory.thunderDoorReached = true;
      }
    }, this);
  }

  checkThunderDoorReached() {
    if (!this.player.inventory.thunderDoorReached) {
      return;
    }
    console.log(this.map)
    this.npcGroup.forEach(npc => npc.destroy())
    this.oldman = new Oldman(this, 144, 455 - 16, {
      key: 'oldman-walk',
      name: 'oldman',
    });
    this.oldman.animate('oldman-walk', true);
    this.npcGroup.push(this.oldman);
  }

  showAngel() {
    if (!this.player.inventory.thunderDoorReached || this.player.inventory.waterStorm) {
      return;
    }
    this.angel = new Angel(this, 102, 153, {
      key: 'angel-idle',
      name: 'angel',
    });
    this.angel.animate('angel-idle', true);
    this.npcGroup.push(this.angel);
  }

  checkWaterStorm() {
    if (!this.player.inventory.waterStorm || this.player.inventory.townInFire) {
      this.enemyGroup.forEach(e => e.destroy());
      return;
    }
    this.oldman.destroy();
    this.dragon = new BossDragon(this, 388, 311, { key: 'dragon', name: 'dragon' });
    this.enemyGroup.push(this.dragon);
    this.player.inventory.townInFire = true;
    this.battleWithBoss = true;
  }

  callHellBeast() {
    if (this.player.inventory.boss2) {
      if (!this.player.inventory.lavaStorm) {
        this.lavaStormPowerUp.setPosition(195, 195).setAlpha(1)
      }
      return;
    }
    this.lavaStormPowerUp.setAlpha(0);
    this.hellBeast = new HellBeast(this, -100, -100, { key: 'hell-beast-idle', name: 'hellBeast' });
    this.enemyGroup.push(this.hellBeast)
  }

  // ====================================================================
  // CAMERA EFFECTS
  shakeCamera(e) {
    if (!this.cameraIsShaking) {
      this.cameraIsShaking = true;
      this.cameras.main.shake(e, 0.025);
      this.sound.play('impact', { rate: 0.5 });
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
  checkObjectsLayerIndex(layerName) {
    const arr = this.map.objects.filter(elm => elm.name === layerName);
    if (!arr.length) {
      return null;
    }
    return arr[0];
  }

  countTime() {
    this.firstTimestamp = countTime(this.firstTimestamp);
  }

  // ====================================================================
  transmission(txt) {
    let count = 0;
    this.modalText = this.add.bitmapText(this.player.x, this.player.y - 480, 'atomic', '', 6, 1)
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(201);
    this.time.addEvent({
      delay: 100,
      repeat: txt.length - 1,
      callback: () => {
        if (txt[count] === '-') {
          this.modalText.text += '\n';
          this.modalText.y -= 10;
          this.sound.play('bip3', { volume: 0.5 });
          count += 1;
        } else {
          this.modalText.text += txt[count];
          this.sound.play('bip1', { volume: 1 });
          count += 1;
        }
      },
    });
    this.time.addEvent({
      delay: 12000,
      callback: () => {
        this.modalText.destroy();
      },
    });
  }

  endMission() {
    if (!this.isTheEnd) {
      this.isTheEnd = true;
      this.round = this.add.sprite(this.player.x, this.player.y, 'whitePixel')
        .setOrigin(0.5, 0.5)
        .setDepth(1000)
        .setDisplaySize(4096, 4096)
        .setAlpha(0);
      this.countTime();
      this.ambient1.stop();
      this.tween = this.tweens.add({
        targets: this.round,
        ease: 'Sine.easeInOut',
        duration: 1500,
        delay: 0,
        repeat: 0,
        yoyo: false,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1,
        },
        onComplete: () => {
          this.lavaRise = null;
          this.ambient1.stop();
          this.scene.start('endGame');
        },
      });
    }
  }
}
