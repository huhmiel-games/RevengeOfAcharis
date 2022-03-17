import { ACCELERATION_X, FONTS, FONTS_SIZES } from '../constant/config';
import GameScene from '../scenes/GameScene';
import { TKeys, TPlayerState } from '../types/types';
import SwordManager from './itemManagers/SwordManager';
import { COLORS } from '../constant/colors';
import StateMachine from '../utils/StateMachine';
import IdleState from './states/IdleState';
import FallState from './states/FallState';
import HitState from './states/HitState';
import JumpState from './states/JumpState';
import DoubleJumpState from './states/DoubleJumpState';
import JumpMomentumState from './states/JumpMomentumState';
import MoveState from './states/MoveState';
import StateTimestamp from '../utils/StateTimestamp';
import Enemy from '../enemies/Enemy';
import Projectile from '../enemies/Projectile';
import PlayerState from '../constant/playerState';
import ShieldManager from './itemManagers/ShieldManager';
import InventoryManager from './itemManagers/InventoryManager';
import SaveLoadService from '../services/SaveLoadService';
import BowManager from './itemManagers/BowManager';
import Arrow from './items/Arrow';
import WaterQueen from '../enemies/WaterQueen';
import DEPTH from '../constant/depth';
import TopHeadText from '../utils/TopHeadText';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class Player
 * @extends {Phaser.GameObjects.Sprite}
 */
export default class Player extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public swords: Phaser.Physics.Arcade.Group;
    public arrows: Phaser.Physics.Arcade.Group;
    public inventoryManager: InventoryManager;
    public playerState: TPlayerState;
    public jumpTime: number;
    public isJumping: boolean = false;
    public isAttacking: boolean = false;
    public chooseDone: boolean;
    private isSpelling: boolean;
    public sword: any;
    public keys: TKeys;
    public fallSfx: Phaser.Sound.BaseSound;
    public jumpSfx: Phaser.Sound.BaseSound;
    public hitSfx: Phaser.Sound.BaseSound;
    public walkStepSfx: Phaser.Sound.BaseSound;
    private playerFlashTween: Phaser.Tweens.Tween;
    public swordManager: SwordManager;
    public bowManager: BowManager;
    public shieldManager: ShieldManager;
    public HealthUiText: Phaser.GameObjects.BitmapText;
    public isHit: boolean = false;
    public isHitMomentum: boolean = false;
    public stateTimestamp = new StateTimestamp();
    public isOnSpike: boolean = false;
    public isPause: boolean = false;
    public isBendBow: boolean = false;
    public keysOptions: string[];
    public canDoubleJump: boolean = false;

    // The state machine managing the player
    public stateMachine: StateMachine = new StateMachine('idle', {
        fall: new FallState() as FallState,
        hit: new HitState() as HitState,
        idle: new IdleState() as IdleState,
        jump: new JumpState() as JumpState,
        doubleJump: new DoubleJumpState() as DoubleJumpState,
        momentum: new JumpMomentumState() as JumpMomentumState,
        move: new MoveState() as MoveState,
    }, [this.scene, this]);


    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {{ key: any; }} config
     */
    constructor (scene: GameScene, x: number, y: number, config: { key: string | Phaser.Textures.Texture; })
    {
        super(scene, x, y, config.key);

        this.jumpTime = 0;

        this.swordManager = new SwordManager();

        this.bowManager = new BowManager();

        this.shieldManager = new ShieldManager();

        this.inventoryManager = new InventoryManager(this.scene, this);

        if (!SaveLoadService.loadGameData())
        {
            const data = this.inventoryManager.setDefaultInventory();
            SaveLoadService.saveNewGameData(data);
        }
        try
        {
            const data = SaveLoadService.loadGameData();

            if (data) this.inventoryManager.initInventory(JSON.parse(data));
        }
        catch (error)
        {
            console.log(error);
        }

        this.playerState = {
            swordAttackAnim: 1,
            speed: 128,
            selectedWeapon: 'sword',
            selectedSword: 0,
            lastFired: 0,
            isDead: false,
            blockedDownTimestamp: 0
        };

        const inventory = this.inventoryManager.getInventory();

        this.swordManager.initSwords(inventory.swords);
        this.swordManager.selectSword(inventory.selectedSword);

        this.bowManager.initBows(inventory.bows);

        this.shieldManager.initShields(inventory.shields);

        if (inventory.selectedBow !== null)
        {
            this.bowManager.selectBow(inventory.selectedBow);
        }

        if (inventory.selectedShield !== null)
        {
            this.shieldManager.selectShield(inventory.selectedShield);
        }

        const healthUiBack = this.scene.add.image(0, 0, 'parchment').setScrollFactor(0, 0).setDepth(DEPTH.UI_BACK).setOrigin(0, 0);

        this.HealthUiText = this.scene.add.bitmapText(20, 9, FONTS.GALAXY, `${inventory.life}/${inventory.maxLife}`, FONTS_SIZES.GALAXY, 1)
            .setScrollFactor(0, 0).setDepth(DEPTH.UI_TEXT).setTintFill(COLORS.STEEL_GRAY);

        this.setDepth(DEPTH.PLAYER);

        this.scene.physics.world.enable(this);

        this.scene.add.existing(this);

        this.body.setSize(10, 25, true)
            .setOffset(21, 10)
            .setAllowGravity(true)
            .setGravityY(600)
            .setCollideWorldBounds(true)
            .setMaxVelocity(this.playerState.speed, this.playerState.speed * 4);

        this.swords = this.scene.physics.add.group({
            defaultKey: 'whitePixel',
            maxSize: 1,
            allowGravity: false,
        });

        this.arrows = this.scene.physics.add.group({
            classType: Arrow,
            maxSize: 3,
            allowGravity: true,
        });

        this.sword = this.swords.getFirstDead(true, this.body.x, this.body.y, undefined, undefined, true);
        this.sword.setVisible(false).setName('sword');
        this.sword.body.setCircle(14)
            .setEnable(false);

        const keysOptions = SaveLoadService.getConfigKeys();
        this.keysOptions = keysOptions;

        this.keys = this.scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes[keysOptions[0]],
            right: Phaser.Input.Keyboard.KeyCodes[keysOptions[1]],
            up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
            down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
            fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
            jump: Phaser.Input.Keyboard.KeyCodes[keysOptions[5]],
            bow: Phaser.Input.Keyboard.KeyCodes[keysOptions[6]],
            select: Phaser.Input.Keyboard.KeyCodes[keysOptions[7]],
            pause: Phaser.Input.Keyboard.KeyCodes[keysOptions[8]]
        }) as TKeys;

        // handle player walk and run sounds
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const walkRate = Phaser.Math.RND.realInRange(0.75, 1.25);

            const frame = this.anims.getFrameName();

            if (frame === 'adventurer-run-01' || frame === 'adventurer-run-04')
            {
                this.walkStepSfx.play({ rate: walkRate });
            }

            if (this.anims.getName() === 'adventurer-bow' && !this.keys.bow.isDown)
            {
                this.anims.play('adventurer-idle');
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            const currentAnim = this.anims.getName();

            if (currentAnim === 'adventurer-bow')
            {
                this.isBendBow = true;
            }
            else
            {
                this.isBendBow = false;
            }

            if (currentAnim === 'adventurer-bow-end')
            {
                this.anims.play('adventurer-idle', true);
            }

            // stop attack
            if (currentAnim.startsWith('adventurer-attack'))
            {
                this.stopSwordAttack();

                this.anims.play('adventurer-idle-2', true);

                return;
            }

            if (currentAnim === 'adventurer-idle-2')
            {
                this.anims.play('adventurer-sword-shte', true);

                return;
            }

            if (currentAnim === 'adventurer-sword-shte')
            {
                this.anims.play('adventurer-idle', true);

                return;
            }

            // stop normal air attack
            if (currentAnim.startsWith('adventurer-air-attack'))
            {
                this.stopSwordAttack();
                this.anims.play('adventurer-fall', true);

                return;
            }

            if (currentAnim === 'adventurer-jump-momentum' && !this.isAttacking)
            {
                this.anims.play('adventurer-fall', true);
            }
        });

        this.on('isPause', (e: boolean) => this.isPause = e);
    }



    public addXp (xp: number): void
    {
        const inventory = this.inventoryManager.getInventory();

        inventory.xp += xp;

        const nextLevelXp = Math.floor(0.8 * Math.pow(inventory.level, 2) + 1.8 * Math.pow(inventory.level, 3) + 3.3 * Math.pow(inventory.level, 2) + 0.6 * Math.pow(inventory.level - 1, 2) + 184.8 * inventory.level - 0.6);

        if (nextLevelXp <= inventory.xp)
        {
            this.scene.setPause(true, true, false);

            inventory.level += 1;

            inventory.maxLife = 30 + inventory.level * 3;

            this.showNextLevelText(inventory);

            return;
        }

        this.showXpText(xp);
    }

    private showNextLevelText (inventory)
    {
        const levelUpText: Phaser.GameObjects.BitmapText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.ULTIMA_BOLD, `level up ${inventory.level}`, FONTS_SIZES.ULTIMA_BOLD, 1);
        levelUpText.setPosition(this.body.center.x - levelUpText.width / 2)
            .setTintFill(0xfbf236)
            .setDropShadow(0, 2, COLORS.RED, 1)
            .setDepth(DEPTH.UI_TEXT);

        this.scene.time.addEvent({
            delay: 500,
            callback: () => this.scene.unPause()
        });

        this.scene.tweens.add({
            targets: levelUpText,
            duration: 1000,
            y: {
                from: this.body.top,
                to: this.body.top - 32
            },
            alpha: 0,
            onComplete: () => levelUpText.destroy()
        });
    }

    private showXpText (xp: number)
    {
        const xpText: TopHeadText = this.scene.topHeadTextGroup.getFirstDead(true, this.body.center.x, this.body.top, FONTS.GALAXY, undefined, true);

        if (!xpText) return;

        xpText.setAlpha(1)
            .setActive(true)
            .setVisible(true)
            .showXpText(this, xp);
    }

    private showDamageText (damage: number)
    {
        this.scene.time.addEvent({
            delay: 590,
            callback: () =>
            {
                const damageText: TopHeadText = this.scene.topHeadTextGroup.getFirstDead(true, this.body.center.x, this.body.top, FONTS.GALAXY, undefined, true);

                if (!damageText)
                {
                    console.log('damagetext limit reached');

                    return;
                }
                damageText.setAlpha(1).setActive(true).setVisible(true);
                damageText.showDamageText(this, damage);
            }
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        const { playerState, isPause } = this;
        const { select, pause, down } = this.keys;

        const currentAnim = this.anims.getName();
        // if not game pause
        if (!isPause && !playerState.isDead)
        {
            this.stateMachine.step();

            // weapon hitbox
            if (this.flipX && this.sword.body)
            {
                this.sword.body.reset(this.body.right - this.sword.body.width + 1, this.body.y - this.body.height / 2 + (down.isDown ? 14 : 4));
            }
            if (!this.flipX && this.sword.body)
            {
                this.sword.body.reset(this.body.left + 1, this.body.y - this.body.height / 2 + + (down.isDown ? 14 : 4));
            }

            // select weapon
            if (Phaser.Input.Keyboard.JustDown(select))
            {
                this.inventoryManager.showInventory();
            }
        }
    }

    /**
     * Move and stop with acceleration
     */
    public move ()
    {
        const { left, right, fire } = this.keys;

        // Decelerate with Drag
        if ((left.isUp && right.isUp) || this.isAttacking)
        {
            this.body.setAccelerationX(0);

            if (!this.body.blocked.down)
            {
                this.body.setDragX(ACCELERATION_X / 4 - Math.abs(this.body.acceleration.x) / 4);

                return;
            }

            this.body.setDragX(ACCELERATION_X * 4 - Math.abs(this.body.acceleration.x) / 4);

            return;
        }

        // Move with acceleration to the right
        if (right.isDown && !left.isDown && !this.isAttacking)
        {
            this.body.setOffset(26, 10);
            this.body.setDragX(0);
            this.body.setAccelerationX(ACCELERATION_X);
            this.flipX = false;
        }

        // Move with acceleration to the left
        if (left.isDown && !right.isDown && !this.isAttacking)
        {
            this.body.setOffset(18, 10);
            this.body.setDragX(0);
            this.body.setAccelerationX(-ACCELERATION_X);
            this.flipX = true;
        }
    }

    public slowDownOnWater (on: boolean)
    {
        if (on)
        {
            this.body.setMaxVelocity(this.playerState.speed / 2, this.playerState.speed * 3);
        }
        else
        {
            this.body.setMaxVelocity(this.playerState.speed, this.playerState.speed * 4);
        }

    }

    public playerOnPlatform (platform)
    {
        if (this.isSpelling)
        {
            return;
        }
        this.body.setVelocityX(platform.body.velocity.x);
    }

    public swordAttack (time: number)
    {
        if (this.isAttacking) return;

        const rate = this.swordManager.getCurrentSword().rate;

        const { up, down } = this.keys;

        const { blocked } = this.body;

        if (time > this.playerState.lastFired + rate)
        {
            switch (true)
            {
                case (up.isDown):
                    if (blocked.down)
                    {
                        this.anims.play({
                            key: 'adventurer-attack1',
                            frameRate: Math.round(10000 / this.swordManager.getCurrentSword().rate) - 5,
                            repeat: 0
                        }, true);
                    }
                    else
                    {
                        this.anims.play({
                            key: 'adventurer-air-attack2',
                            frameRate: Math.round(10000 / this.swordManager.getCurrentSword().rate) - 5,
                            repeat: 0
                        }, true);
                    }
                    break;

                case (down.isDown):
                    if (blocked.down)
                    {
                        this.anims.play({
                            key: 'adventurer-attack2',
                            frameRate: Math.round(10000 / this.swordManager.getCurrentSword().rate) - 5,
                            repeat: 0
                        }, true);
                    }
                    else if (this.stateMachine.state === PlayerState.FALL)
                    {
                        this.anims.play('adventurer-special-air-attack', true);
                    }
                    else
                    {
                        this.anims.play({
                            key: 'adventurer-air-attack1',
                            frameRate: Math.round(10000 / this.swordManager.getCurrentSword().rate) - 5,
                            repeat: 0
                        }, true);
                    }

                    break;

                case (blocked.down):
                    this.anims.play({
                        key: 'adventurer-attack1',
                        frameRate: Math.round(10000 / this.swordManager.getCurrentSword().rate) - 5,
                        repeat: 0
                    }, true);
                    break;

                case (!blocked.down):
                    this.anims.play({
                        key: 'adventurer-air-attack1',
                        frameRate: Math.round(10000 / this.swordManager.getCurrentSword().rate) - 5,
                        repeat: 0
                    }, true);
                    break;
                default:
                    break;
            }

            this.playerState.lastFired = time;

            this.scene.sound.play('bullet', { volume: 0.7 });

            this.sword.body.setEnable(true);

            this.isAttacking = true;
        }
    }

    public stopSwordAttack (): void
    {
        this.isAttacking = false;

        this.sword.body.setEnable(false);
    }

    public bendBow (time: number)
    {
        if (this.bowManager.getBows().length === 0) return;

        this.anims.play('adventurer-bow', true);
    }

    public shootArrow (time: number)
    {
        if (this.bowManager.getBows().length === 0) return;

        if (!this.isBendBow)
        {
            this.anims.play('adventurer-idle', true);
        }

        const currentBow = this.bowManager.getCurrentBow();

        const { rate, speed } = currentBow;

        if (time > this.playerState.lastFired + rate)
        {
            const arrow: Arrow = this.arrows.getFirstDead(true, this.body.center.x, this.body.center.y, 'arrow', undefined, true);

            if (arrow)
            {
                this.anims.play('adventurer-bow-end', true);

                this.playerState.lastFired = time;

                arrow.setVisible(true).setActive(true);
                arrow.body.reset(this.body.center.x, this.body.center.y);

                this.scene.sound.play('bullet', { volume: 0.6, rate: 2 });

                if (this.flipX)
                {
                    arrow.setFlipX(true);
                    arrow.body.setEnable(true).setVelocityX(-speed).setGravityY(30);
                }
                if (!this.flipX)
                {
                    arrow.setFlipX(false);
                    arrow.body.setEnable(true).setVelocityX(speed).setGravityY(30);
                }
            }
        }
    }

    public addJumpBoots ()
    {
        const inventory = this.inventoryManager.getInventory();

        inventory.jumpBoots = true;
        inventory.jumpBootsValue = 250;
    }

    public getLife (heart: Phaser.GameObjects.Sprite)
    {
        const body = heart.body as Phaser.Physics.Arcade.Body;
        body.setEnable(false);

        const inventory = this.inventoryManager.getInventory();

        const life: number = heart.data.get('health');

        if (!life)
        {
            heart.setActive(false).setVisible(false);

            return;
        }

        if (inventory.life + life < inventory.maxLife)
        {
            inventory.life += life;

            this.HealthUiText.setText(`${Math.floor(inventory.life)}/${inventory.maxLife}`);
        }
        else
        {
            inventory.life = inventory.maxLife;

            this.HealthUiText.setText(`${Math.floor(inventory.life)}/${inventory.maxLife}`);
        }

        this.scene.playSfx('getLife', { volume: 2 });

        heart.setActive(false).setVisible(false);
    }

    public looseLife (elm: Enemy | Projectile | Arrow)
    {
        const inventory = this.inventoryManager.getInventory();

        if (elm instanceof WaterQueen)
        {
            const { x, y } = this.body.center;
            const { x: queenPosX, y: queenPosY } = elm.body.center;
            if (x > queenPosX && elm.flipX && !this.flipX)
            {
                return;
            }

            if (x < queenPosX && !elm.flipX && this.flipX)
            {
                return;
            }
        }

        if (this.isHit || this.isHitMomentum) return;

        this.isHit = true;
        this.isHitMomentum = true;

        let currentDef = inventory.def > 0 ? inventory.def : 1;

        const shieldDef = this.shieldManager.getCurrentShield()?.defense || 0;

        if (shieldDef > 0) currentDef += shieldDef;

        const damage = Math.trunc(elm.enemyState.damage - elm.enemyState.damage * (shieldDef / 100));

        inventory.life -= damage;

        this.showDamageText(damage);

        this.HealthUiText.setText(`${Math.floor(inventory.life)}/${inventory.maxLife}`);

        if (inventory.life <= Math.floor(inventory.maxLife / 10))
        {
            this.scene.sound.play('lowLifeSfx');
        }

        if (elm.name === 'skullHead' || elm.name === 'demonBreath')
        {
            this.scene.sound.play('hellBeastFirstLaughSfx');
        }

        // if player is dead, launch deadth sequence
        if (inventory.life <= 0)
        {
            this.stopSwordAttack();

            this.HealthUiText.setText(`0%${inventory.maxLife}`);

            this.playerDeathSequence();

            this.scene.battleWithBoss = false;

            return;
        }

        this.resetHitMomentum();
    }

    private resetHitMomentum ()
    {
        this.scene.time.addEvent({
            delay: 2000,
            callback: () => this.isHitMomentum = false
        });
    }

    public onSpikes (elm: number): void
    {
        const inventory = this.inventoryManager.getInventory();

        if (this.isOnSpike || this.isHitMomentum) return;

        this.isOnSpike = true;
        this.isHitMomentum = true;

        inventory.life -= elm * Math.ceil(1 / (inventory.def > 0 ? inventory.def : 1));

        this.HealthUiText.setText(`${inventory.life}%${inventory.maxLife}`);

        if (inventory.life <= Math.floor(inventory.maxLife / 10))
        {
            this.scene.sound.play('lowLifeSfx');
        }

        if (inventory.life <= 0)
        {
            this.HealthUiText.setText(`0%${inventory.maxLife}`);

            this.playerDeathSequence();

            return;
        }

        this.resetHitMomentum();
    }

    public playerDeathSequence ()
    {
        this.playerState.isDead = true;

        this.body.setAccelerationX(0).setDragX(10000).setVelocityX(0);

        this.scene.input.enabled = false;

        if (this.playerFlashTween) this.playerFlashTween.stop();

        this.scene.stopMusic();

        this.scene.sound.play('playerDead', { volume: 1 });

        this.anims.play('adventurer-knock-down', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.inventoryManager.getInventory().life = 0;

            this.scene.time.addEvent({
                delay: 1000,
                callback: () =>
                {
                    this.scene.input.enabled = true;

                    this.scene.playerIsDead();
                }
            });
        });
    }

    public getFireKeyEventName (): string
    {
        console.log(`${Phaser.Input.Keyboard.Events.KEY_DOWN}${this.keys.fire.originalEvent.key.toUpperCase()}`);

        return `${Phaser.Input.Keyboard.Events.KEY_DOWN}${this.keys.fire.originalEvent.key.toUpperCase()}`;
    }

    public getPlayerKey (str: string): string
    {
        try
        {
            return this.keys[str].originalEvent.key;
        }
        catch (error)
        {
            return '';
        }
    }
}
