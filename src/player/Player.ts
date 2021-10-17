import getConfigKeys from '../utils/getConfigKeys';
import { ACCELERATION_X, FONTS, FONTS_SIZES, HEIGHT, WIDTH } from '../constant/config';
import GameScene from '../scenes/GameScene';
import { TInventory, TKeys } from '../types/types';
import Sword from './Sword';
import SwordManager from './SwordManager';
import { COLORS } from '../constant/colors';
import PlatformSpike from '../enemies/PlatformSpike';

export default class Player extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public swords: Phaser.Physics.Arcade.Group;
    public inventory: TInventory;
    public playerState: any;
    private jumpTime: number;
    private isJumping: boolean;
    private isAttacking: boolean;
    public chooseDone: boolean;
    private isSpelling: boolean;
    public sword: any;
    public keys: TKeys;
    public fallSfx: any;
    public jumpSfx: any;
    public hitSfx: any;
    public walkk: any;
    private walkplay: boolean;
    private playerFlashTween: Phaser.Tweens.Tween;
    private playerDead: boolean;
    public state: any;
    public swordManager: SwordManager;
    public HealthUiText: Phaser.GameObjects.BitmapText;
    public isHit: boolean = false;


    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {{ key: any; }} config
     */
    constructor (scene: GameScene, x: number, y: number, config: { key: string | Phaser.Textures.Texture; })
    {
        super(scene, x, y, config.key);

        this.scene = scene;

        /** @type number */
        this.jumpTime = 0;

        this.isJumping = false;
        this.isAttacking = false;

        this.swordManager = new SwordManager();

        this.inventory = {
            xp: 0,
            level: 1,
            maxLife: 33,
            life: 33,
            def: 0,
            savedPositionX: 80,
            savedPositionY: 135,
            map: 'map2',
            jumpBoots: false,
            jumpBootsValue: 0,
            selectableWeapon: ['sword'],
            swords: [0],
            sword: true,
            bow: false,
            bowDamage: 3,
            shield: false,
            shieldDef: 0,
            fireRate: 420,
            boss1: false,
            thunderDoorReached: false,
            thunderDoorOpen: false,
            townInFire: false,
            boss2: false,
            bossFinal: false,
            escape: false,
            powerUp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };

        this.playerState = {
            canJump: false,
            stopJump: false,
            isAttacking: false,
            swordAttackAnim: 1,
            onRun: false,
            onWalk: true,
            speed: 128,
            runSpeed: 250,
            maxSpeed: 200,
            selectedWeapon: 'sword',
            selectedSword: 0,
            swords: [],
            lastFired: 0,
            pause: false,
            dead: false,
            fullScreen: false,
            energyTime: 100,
            e: 0,
            d: 0,
        };

        this.swordManager.initSwords(this.inventory.swords);
        this.swordManager.selectSword(0);

        this.HealthUiText = this.scene.add.bitmapText(20, 8, FONTS.GALAXY, `${this.inventory.life}%${this.inventory.maxLife}`, FONTS_SIZES.GALAXY, 1)
            .setScrollFactor(0, 0).setDepth(2000);

        this.setDepth(105);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setSize(10, 25, true).setOffset(21, 10).setAllowGravity(true).setCollideWorldBounds(true);
        this.body.setMaxVelocity(this.playerState.speed, this.playerState.speed * 4);
        this.body.gravity.y = 600;

        this.swords = this.scene.physics.add.group({
            defaultKey: 'knife',
            maxSize: 1,
            allowGravity: false,
        });

        this.sword = this.swords.getFirstDead(true, this.body.x, this.body.y, 'knife', undefined, true);
        this.sword.body.setSize(24, this.body.height).setEnable(false);
        this.sword.setVisible(false);

        const keysOptions = getConfigKeys();
        this.keys = this.scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes[keysOptions[0]],
            right: Phaser.Input.Keyboard.KeyCodes[keysOptions[1]],
            up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
            down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
            fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
            jump: Phaser.Input.Keyboard.KeyCodes[keysOptions[5]],
            select: Phaser.Input.Keyboard.KeyCodes[keysOptions[7]],
            pause: Phaser.Input.Keyboard.KeyCodes[keysOptions[8]]
        }) as TKeys;

        // player walk, jump, fall and hit sfx
        // loaded from the start and change room method
        // this.fallSfx;
        // this.jumpSfx;
        // this.hitSfx;
        // this.walkk;

        // handle player walk and run sounds
        this.walkplay = false;
        this.on('animationupdate', () =>
        {
            const walkRate = Phaser.Math.RND.realInRange(0.75, 1.25);

            const currentAnim = this.anims.getName();

            if (currentAnim === 'adventurer-walk' && !this.walkplay && this.body.blocked.down)
            {
                this.walkplay = true;
                this.walkk.play({ rate: walkRate });
                this.scene.time.addEvent({
                    delay: 330,
                    callback: () =>
                    {
                        this.walkplay = false;
                    },
                });
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_START, () =>
        {
            const currentAnim = this.anims.getName();

            if (currentAnim.startsWith('adventurer-attack') || currentAnim.startsWith('adventurer-air-attack'))
            {
                // start attack
                const time = this.scene.time.now;

                const rate = this.swordManager.getCurrentSword().rate;

                if (time > this.playerState.lastFired + rate)
                {
                    this.playerState.lastFired = this.scene.time.now;
                    this.scene.sound.play('bullet', { volume: 0.7 });
                    this.sword.body.setEnable(true);
                    this.isAttacking = true;
                    // console.time('attackTime');
                }

            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            const currentAnim = this.anims.getName();

            // stop attack
            if (currentAnim.startsWith('adventurer-attack'))
            {
                this.isAttacking = false;
                // console.timeEnd('attackTime');
                this.sword.body.setEnable(false);
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

            // stop air attack
            if (currentAnim.startsWith('adventurer-air-attack'))
            {
                this.isAttacking = false;
                this.sword.body.setEnable(false);
                this.anims.play('adventurer-fall', true);

                return;
            }

            if (currentAnim === 'adventurer-jump-momentum' && !this.isAttacking)
            {
                this.anims.play('adventurer-fall', true);
            }
        });
    }

    public addXp (xp: number): void
    {
        this.inventory.xp += xp;

        const nextLevelXp = Math.floor(0.8 * Math.pow(this.inventory.level, 2) + 1.8 * Math.pow(this.inventory.level, 3) + 3.3 * Math.pow(this.inventory.level, 2) + 0.6 * Math.pow(this.inventory.level - 1, 2) + 184.8 * this.inventory.level - 0.6);

        if (nextLevelXp <= this.inventory.xp)
        {
            this.scene.setPause();

            this.inventory.level += 1;

            this.inventory.maxLife = 30 + this.inventory.level * 3;

            const levelUpText: Phaser.GameObjects.BitmapText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.ULTIMA_BOLD, `level up ${this.inventory.level}`, FONTS_SIZES.ULTIMA_BOLD, 1);
            levelUpText.setPosition(this.body.center.x - levelUpText.width / 2)
                .setTintFill(0xfbf236)
                .setDropShadow(0, 2, COLORS.RED)
                .setDepth(2100);
            
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

            return;
        }

        const xpText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.GALAXY, `xp ${Math.round(xp)}`, FONTS_SIZES.GALAXY, 1);
        xpText.setPosition(this.body.center.x - xpText.width / 2)
            .setTintFill(COLORS.GREEN)
            .setDropShadow(1, 1, 0xFFFFFF)
            .setDepth(2000);

        this.scene.tweens.add({
            targets: xpText,
            duration: 1500,
            y: {
                from: this.body.top,
                to: this.body.top - 32
            },
            alpha: 0,
            onComplete: () => xpText.destroy()
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        const { body, keys, playerState } = this;
        const { up, down, left, right, fire, jump, select, pause } = keys;
        const { blocked } = body;

        /////////////////////////////////
        const currentAnim = this.anims.getName();
        // if not game pause
        if (!playerState.pause && !playerState.dead)
        {
            // shoot
            if (Phaser.Input.Keyboard.DownDuration(fire, 150))
            {
                this.swordAttack(time);
            }
            // player movement
            this.move();

            // weapon hitbox
            if (this.flipX && this.sword.body)
            {
                this.sword.body.reset(this.body.left - this.sword.body.width / 2, this.body.y + this.body.height / 2);
            }
            if (!this.flipX && this.sword.body)
            {
                this.sword.body.reset(this.body.right + this.sword.body.width / 2, this.body.y + this.body.height / 2);
            }

            if (fire.isUp && !currentAnim.startsWith('adventurer-air-attack') && !currentAnim.startsWith('adventurer-attack'))
            {
                this.isAttacking = false;
                this.sword.body.setEnable(false);
            }

            // handle player anims, body size, jump
            switch (true)
            {
                // jump now
                case (jump.isDown && jump.getDuration() < 250 && blocked.down && !this.isJumping):
                    this.jumpTime = time;

                    this.isJumping = true;

                    this.body.setVelocityY(-400 - this.inventory.jumpBootsValue);

                    if (!this.isAttacking) this.anims.play('adventurer-jump-start', true);
                    break;

                // end of jump
                case (jump.isDown && this.isJumping && this.jumpTime + 350 < time):
                    this.isJumping = false;

                    this.body.setVelocityY(0);

                    this.setGravityMomentum();

                    if (!this.isAttacking)
                    {
                        this.anims.play('adventurer-jump-momentum', true); // .chain('adventurer-fall');
                    }
                    break;

                case (jump.isDown && !this.isJumping && !blocked.down):
                    if (!this.isAttacking)
                    {
                        // this.anims.play('adventurer-jump-momentum', true)// .chain('adventurer-fall');
                    }
                    break;

                // player stop the jump
                case (jump.isUp && this.isJumping):
                    this.isJumping = false;

                    this.body.setVelocityY(0);

                    this.setGravityMomentum();

                    if (!this.isAttacking)
                    {
                        this.anims.play('adventurer-jump-momentum', true); // .chain('adventurer-fall');
                    }
                    break;

                case (left.isDown && fire.isUp && !this.isAttacking):
                    // marche vers la gauche
                    if (blocked.down)
                    {
                        if (currentAnim === 'adventurer-idle-2')
                        {
                            this.anims.play('adventurer-sword-shte', true);
                            this.anims.chain('adventurer-walk');
                        }
                        else
                        {
                            this.anims.play('adventurer-walk', true);
                        }
                    }

                    this.body.setOffset(18, 10);
                    break;

                case (right.isDown && fire.isUp && !this.isAttacking):
                    // marche vers la droite
                    if (blocked.down)
                    {
                        if (currentAnim === 'adventurer-idle-2')
                        {
                            this.anims.play('adventurer-sword-shte', true);
                            this.anims.chain('adventurer-walk');
                        }
                        else
                        {
                            this.anims.play('adventurer-walk', true);
                        }
                    }
                    this.body.setOffset(26, 10);
                    break;

                case (!blocked.down && !this.isJumping && currentAnim !== 'adventurer-jump'):
                    this.anims.play('adventurer-fall', true);
                    break;

                case (!this.isAttacking && currentAnim !== 'adventurer-sword-shte' && !currentAnim.startsWith('adventurer-idle')):
                    // reste immobile
                    this.body.setOffset(21, 10);
                    this.anims.play('adventurer-idle', true);
                    break;

                case (currentAnim === 'adventurer-fall' && blocked.down):
                    this.anims.play('adventurer-idle', true);

            }

            // select weapon
            if (Phaser.Input.Keyboard.JustDown(select) && !this.playerState.pause)
            {
                this.selectWeapon();
            }

            // pause
            if (pause.isDown)
            {
                // this.scene.pauseGame();
            }
        }
        else if (this.playerState.pause)
        {
            // GAME PAUSE
            // if (!this.scene.isPausing && pause.isDown)
            // {
            //     //this.scene.pauseGame();
            // }
        }

        // player animation play
        // if(this.lastAnim !== currentAnim && currentAnim !== undefined) {
        //     this.lastAnim = currentAnim;
        //     this.animate(currentAnim);
        // }
    }

    /**
     * Move and stop with acceleration
     */
    private move ()
    {
        const { left, right, fire } = this.keys;

        // Move with acceleration to the right
        if (right.isDown && !left.isDown && fire.isUp && !this.isAttacking)
        {
            this.body.setDragX(0);
            this.body.setAccelerationX(ACCELERATION_X);
            this.flipX = false;
        }

        // Move with acceleration to the left
        if (left.isDown && !right.isDown && fire.isUp && !this.isAttacking)
        {
            this.body.setDragX(0);
            this.body.setAccelerationX(-ACCELERATION_X);
            this.flipX = true;
        }

        // Decelerate with Drag
        if ((left.isUp && right.isUp) || fire.isDown || this.isAttacking)
        {
            this.body.setAccelerationX(0);

            if (!this.body.blocked.down)
            {
                this.body.setDragX(ACCELERATION_X / 4 - Math.abs(this.body.acceleration.x) / 4);

                return;
            }

            this.body.setDragX(ACCELERATION_X * 4 - Math.abs(this.body.acceleration.x) / 4);
        }
    }

    private setGravityMomentum ()
    {
        this.body.setGravityY(0);

        this.scene.time.addEvent({
            delay: 100,
            callback: this.resetGravity,
            callbackScope: this
        });
    }

    private resetGravity ()
    {
        this.body.setGravityY(1000);
    }

    public playerOnPlatform (platform)
    {
        if (this.isSpelling)
        {
            return;
        }
        this.body.setVelocityX(platform.body.velocity.x);
    }

    private swordAttack (time: number)
    {
        if (this.isAttacking) return;

        if (this.playerState.selectedWeapon === 'sword' && !this.anims.getName().startsWith('adventurer-attack'))
        {
            this.playerState.swordAttackAnim += 1;

            if (this.playerState.swordAttackAnim > 3) this.playerState.swordAttackAnim = 1;

            if (this.body.blocked.down)
            {
                this.anims.play({
                    key: `adventurer-attack${this.playerState.swordAttackAnim}`,
                    frameRate: Math.round(10000 / this.swordManager.getCurrentSword().rate) - 5,
                    repeat: 0
                }, true);
            }
            else
            {
                this.anims.play(`adventurer-air-attack${this.playerState.swordAttackAnim}`, true);
            }

        }

        if (this.playerState.selectedWeapon === 'bow')
        {
            this.shootArrow(time);
        }
    }

    private shootArrow (time: number)
    {
        if (time > this.playerState.lastFired)
        {
            const swell = this.swords.getFirstDead(true, this.body.x + this.playerState.bulletPositionX, this.body.y + this.playerState.bulletPositionY, 'sword', undefined, true);
            if (swell)
            {
                this.playerState.lastFired = time + this.inventory.fireRate;
                swell.visible = true;
                swell.name = 'sword';
                swell.anims.play('sword', true);
                swell.setDepth(102);

                const playerSpeed = Math.abs(this.body.velocity.x);

                this.scene.sound.play('swell', { volume: 0.6 });
                //    BULLET ORIENTATION    ////
                if (this.playerState.bulletOrientationX === 'left')
                {
                    swell.flipX = true;
                    swell.body.velocity.x = -500 - playerSpeed;
                }
                if (this.playerState.bulletOrientationX === 'right')
                {
                    swell.flipX = false;
                    swell.body.velocity.x = 500 + playerSpeed;
                }

                this.scene.time.addEvent({
                    delay: 500,
                    callback: () =>
                    {
                        swell.destroy();
                    },
                });
            }
        }
    }

    public bowKill (e, playSfxBool = true)
    {
        const { blocked } = e.body;
        const { body, texture, x, y } = e;
        e.setVelocity(0, 0);
        e.destroy();
        const sideHit = Object.entries(blocked)
            .filter((key) =>
            {
                return key[1] === true;
            })[0][0];
        const sideHitOffset = sideHit === 'right' ? body.width / 2 : -body.width / 2;
        // this.scene.weaponParticles = this.scene.add.particles('whitePixel');
        // this.scene.weaponParticleEmitter = this.scene.weaponParticles.createEmitter({
        //     //angle: { min: -e.body.velocity.x / 10, max: Math.abs(e.body.velocity.x / 10) },
        //     speed: { min: 200, max: 400 },
        //     quantity: 6,
        //     lifespan: 100,
        //     alpha: 1,
        //     scale: texture.key === 'axe' ? 1 : 0.5,
        //     gravityX: -(Math.abs(body.velocity.x)),
        //     on: false,
        // });
        // this.scene.weaponParticleEmitter.explode(6, x + sideHitOffset, y);
        // leave if hit enemy, or play sfx on wall
        if (!playSfxBool)
        {
            return;
        }

        switch (e.name)
        {
            case 'knife':
                this.scene.sound.play('knifeIcon', { volume: 0.4, rate: 1.5 });
                break;
            case 'sword':
                this.scene.sound.play('knifeIcon', { volume: 0.4, rate: 1.2 });
                break;
            case 'axe':
                this.scene.sound.play('knifeIcon', { volume: 0.4, rate: 0.5 });
                break;
        }

    }

    // public addEnergy ()
    // {
    //     this.inventory.lifeEnergyBlock += 1;
    //     this.inventory.life = this.inventory.lifeEnergyBlock * 100;
    // }

    public addJumpBoots ()
    {
        this.inventory.jumpBoots = true;
        this.inventory.jumpBootsValue = 250;
    }

    public addBow ()
    {
        this.inventory.bow = true;
        this.inventory.selectableWeapon.push('bow');
    }

    private selectWeapon ()
    {
        if (this.playerState.pause)
        {
            return;
        }

        this.playerState.pause = true;

        const origin = {
            x: this.scene.backUi.getTopLeft().x + 32,
            y: this.scene.backUi.getTopLeft().y + 30,
            center: this.scene.backUi.getCenter(),
            right: this.scene.backUi.getTopRight().x,
            bottom: this.scene.backUi.getBottomRight().y
        };

        this.scene.setPause();
        this.scene.backUi.setVisible(true);

        const GRID = this.scene.add.image(origin.x - 17, origin.y - 17, 'inventory-grid').setDepth(1999).setScrollFactor(0, 0).setOrigin(0, 0);

        const items = this.swordManager.getSwords();
        const selectableItemsToDisplay: Phaser.GameObjects.Image[] = [];
        const fixedItemsToDisplay: Phaser.GameObjects.Image[] = [];

        items.forEach(item =>
        {
            const img = this.scene.add.image(-100, -100, 'stuff', item.key)
                .setDepth(2000)
                .setScrollFactor(0, 0)
                .setDataEnabled()
                .setData('id', item.id);

            selectableItemsToDisplay.push(img);
        });

        for (let i = 20; i < 24; i++)
        {
            const img = this.scene.add.image(-100, -100, 'stuff', i).setDepth(2000).setScrollFactor(0, 0);
            fixedItemsToDisplay.push(img);
        }

        Phaser.Actions.GridAlign(selectableItemsToDisplay, {
            width: 5,
            height: 3,
            cellWidth: 32,
            cellHeight: 32,
            x: origin.x,
            y: origin.y
        });

        const selector = this.scene.add.image(origin.x, origin.y, 'framing32')
            .setDepth(2010)
            .setScrollFactor(0, 0);

        const currentSwordId = this.swordManager.getCurrentSword().id;

        const selectedItem = selectableItemsToDisplay.filter(e => e.data.get('id') === currentSwordId)[0];

        selector.setPosition(selectedItem.x, selectedItem.y);

        Phaser.Actions.GridAlign(fixedItemsToDisplay, {
            width: 5,
            height: 1,
            cellWidth: 32,
            cellHeight: 32,
            x: origin.x,
            y: origin.y + 160
        });

        const LVL = this.scene.add.bitmapText(WIDTH / 8 * 4, origin.center.y - 86, FONTS.ULTIMA_BOLD, `LEVEL: ${this.inventory.level}`, FONTS_SIZES.ULTIMA_BOLD)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setLetterSpacing(2).setTintFill(COLORS.STEEL_GRAY);

        const nextLevelXp = Math.floor(0.8 * Math.pow(this.inventory.level, 2) + 1.8 * Math.pow(this.inventory.level, 3) + 3.3 * Math.pow(this.inventory.level, 2) + 0.6 * Math.pow(this.inventory.level - 1, 2) + 184.8 * this.inventory.level - 0.6);

        const XP = this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 68, FONTS.ULTIMA, `XP: ${Math.round(this.inventory.xp)}/${nextLevelXp}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.STEEL_GRAY);

        const HP = this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 50, FONTS.ULTIMA, `HP: ${this.inventory.life}/${this.inventory.maxLife}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.DARK_GREEN);

        const s = Math.ceil(Math.sqrt(Math.pow(this.inventory.level, 3)) / 10);

        const STR = this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 34, FONTS.ULTIMA, `STR: ${s}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.RED);

        const DEF = this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 18, FONTS.ULTIMA, `DEF: ${this.inventory.def}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.DARK_GREEN);
        
        const swordAttack = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 16, FONTS.ULTIMA, `Sword ATK: ${this.swordManager.getCurrentSword().damage}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.RED);

        const swordRate = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 32, FONTS.ULTIMA, `Sword RATE: ${Math.round(this.swordManager.getCurrentSword().rate)}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.EAST_BLUE);

        let bowAttack, bowRate, shieldDef;

        if (this.inventory.bow)
        {
            bowAttack = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 48, FONTS.ULTIMA, `Bow ATK: 5`, FONTS_SIZES.ULTIMA)
                .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.RED);

            bowRate = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 64, FONTS.ULTIMA, `Bow RATE: 300`, FONTS_SIZES.ULTIMA)
                .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.EAST_BLUE);
        }

        if (this.inventory.shield)
        {
            shieldDef = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 80, FONTS.ULTIMA, `Shield DEF: 5`, FONTS_SIZES.ULTIMA)
                .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.DARK_GREEN);
        }

        const dialog = this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (event.key === this.keys.select.originalEvent.key && this.playerState.pause)
            {
                this.scene.unPause();

                selectableItemsToDisplay.forEach(img => img.setVisible(false));

                fixedItemsToDisplay.forEach(img => img.setVisible(false));

                selector.destroy();
                LVL.destroy();
                XP.destroy();
                STR.destroy();
                HP.destroy();
                DEF.destroy();
                swordRate.destroy();
                swordAttack.destroy();
                bowAttack?.destroy();
                bowRate?.destroy();
                shieldDef?.destroy();
                GRID.destroy();
                this.scene.backUi.setVisible(false);

                this.scene.time.addEvent({
                    delay: 150,
                    callback: () =>
                    {
                        this.playerState.pause = false;
                        dialog.removeAllListeners();
                    }
                });
            }

            if (event.keyCode === this.keys.left.keyCode && this.playerState.pause && selector.x > origin.x)
            {
                selector.x -= 32;
            }

            if (event.keyCode === this.keys.right.keyCode && this.playerState.pause && selector.x < origin.x + 4 * 32)
            {
                selector.x += 32;
            }

            if (event.keyCode === this.keys.up.keyCode && this.playerState.pause && selector.y > origin.y)
            {
                selector.y -= 32;
            }

            if (event.keyCode === this.keys.down.keyCode && this.playerState.pause && selector.y < origin.y + 3 * 30)
            {
                selector.y += 32;
            }

            // change the weapon
            if (event.keyCode === this.keys.fire.keyCode && this.playerState.pause)
            {
                const choosedItem = selectableItemsToDisplay.filter(e => e.x === selector.x && e.y === selector.y)[0];
                if (choosedItem)
                {
                    this.swordManager.selectSword(choosedItem.data.get('id'));

                    swordAttack.setText(`Sword ATK: ${this.swordManager.getCurrentSword().damage.toString()}`);

                    swordRate.setText(`Sword RATE: ${(Math.round(this.swordManager.getCurrentSword().rate)).toString()}`);
                }
            }
        });
    }

    public getLife (l: Phaser.Types.Physics.Arcade.GameObjectWithBody)
    {
        const life: number = l.data.get('health');

        if (!life)
        {
            l.destroy();

            return;
        }

        if (this.inventory.life + life < this.inventory.maxLife)
        {
            this.inventory.life += life;

            this.HealthUiText.setText(`${this.inventory.life}%${this.inventory.maxLife}`);
        }
        else
        {
            this.inventory.life = this.inventory.maxLife;

            this.HealthUiText.setText(`${this.inventory.life}%${this.inventory.maxLife}`);
        }

        this.scene.sound.play('getLife', { volume: 2 });

        l.destroy();
    }

    public looseLife (elm)
    {
        if (elm instanceof PlatformSpike && elm.body.touching.down)
        {
            this.inventory.life = 0;

            this.HealthUiText.setText(`${this.inventory.life}%${this.inventory.maxLife}`);

            this.scene.playerDeathSequence();

            return;
        }
        if (this.isHit) return;

        this.isHit = true;

        this.hitSfx.play();

        this.inventory.life -= elm.enemyState.damage * Math.ceil(1 / (this.inventory.def > 0 ? this.inventory.def : 1));

        this.HealthUiText.setText(`${this.inventory.life}%${this.inventory.maxLife}`);

        if (this.inventory.life <= 30)
        {
            this.scene.sound.play('lowLifeSfx');
        }

        if (elm.name === 'skullHead' || elm.name === 'demonBreath')
        {
            this.scene.sound.play('hellBeastFirstLaughSfx');
        }

        this.playerFlashTween = this.scene.tweens.add({
            targets: this,
            ease: 'Sine.easeInOut',
            duration: 200,
            delay: 0,
            repeat: 2,
            yoyo: true,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1,
            },
            onComplete: () =>
            {
                this.alpha = 1;
                this.isHit = false;
            },
        });

        // if player is dead, launch deadth sequence
        if (this.inventory.life <= 0)
        {
            this.scene.playerDeathSequence();
        }

        // set health text
        this.HealthUiText.setText(`${this.inventory.life}%${this.inventory.maxLife}`);
    }
}
