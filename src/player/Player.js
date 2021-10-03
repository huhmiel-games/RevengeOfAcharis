import getConfigKeys from '../utils/getConfigKeys';
import {ACCELERATION_X} from '../constant/config';



export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {{ key: any; }} config
     */
    constructor (scene, x, y, config) {
        super(scene, x, y, config.key);

        this.lastAnim = null;
        this.scene = scene;

        /** @type number */
        this.jumpTime = 0;

        this.isJumping = false;
        this.isAttacking = false;

        this.inventory = {
            lifeEnergyBlock: 1,
            life: 100,
            savedPositionX: 80,
            savedPositionY: 135,
            map: 'map1',
            jumpBoots: false,
            jumpBootsValue: 0,
            selectableWeapon: ['sword'],
            sword: true,
            swordDamage: 4,
            bow: false,
            bowDamage: 3,
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
            lastFired: 0,
            pause: false,
            dead: false,
            fullScreen: false,
            energyTime: 100,
            e: 0,
            d: 0,
        };

        this.selectWeaponFlag = false;
        this.chooseDone = false;
        this.isSpelling = false;
        this.setDepth(105);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setSize(10, 25, true).setOffset(21, 10).setAllowGravity(true).setCollideWorldBounds(true);
        this.body.maxVelocity = {x: this.playerState.speed, y: this.playerState.speed * 4};
        this.body.gravity.y = 600;

        this.swords = this.scene.physics.add.group({
            defaultKey: 'knife',
            maxSize: 1,
            allowGravity: false,
            createIfNull: true,
        });

        /**
         * @type Phaser.GameObjects.GameObject.Sprite
         */
        this.sword = this.swords.getFirstDead(true, this.body.x, this.body.y, 'knife', null, true);
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
            run: Phaser.Input.Keyboard.KeyCodes[keysOptions[6]],
            select: Phaser.Input.Keyboard.KeyCodes[keysOptions[7]],
            pause: Phaser.Input.Keyboard.KeyCodes[keysOptions[8]],
            cheat: Phaser.Input.Keyboard.KeyCodes['Y'],
        });

        // player walk, jump, fall and hit sfx
        // loaded from the start and change room method
        this.fallSfx;
        this.jumpSfx;
        this.hitSfx;
        this.walkk;

        // handle player walk and run sounds
        this.walkplay = false;
        this.on('animationupdate', () => {
            const walkRate = Phaser.Math.RND.realInRange(0.75, 1.25);

            const currentAnim = this.anims.getName();

            if(currentAnim === 'adventurer-walk' && !this.walkplay && this.body.blocked.down) {
                this.walkplay = true;
                this.walkk.play({rate: walkRate});
                this.scene.time.addEvent({
                    delay: 330,
                    callback: () => {
                        this.walkplay = false;
                    },
                });
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_START, () => {
            const currentAnim = this.anims.getName();

            if(currentAnim.startsWith('adventurer-attack') || currentAnim.startsWith('adventurer-air-attack')) {
                // start attack
                this.playerState.lastFired = this.scene.time + this.inventory.fireRate;
                this.scene.sound.play('bullet', {volume: 0.7});
                this.sword.body.setEnable(true);
                this.isAttacking = true;
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            const currentAnim = this.anims.getName();

            // stop attack
            if(currentAnim.startsWith('adventurer-attack')) {
                this.isAttacking = false;
                this.sword.body.setEnable(false);
                this.anims.play('adventurer-idle-2', true);
                return;
            }

            if(currentAnim === 'adventurer-idle-2') {
                this.anims.play('adventurer-sword-shte', true);
                return;
            }

            if(currentAnim === 'adventurer-sword-shte') {
                this.anims.play('adventurer-idle', true);
                return;
            }

            // stop air attack
            if(currentAnim.startsWith('adventurer-air-attack')) {
                this.isAttacking = false;
                this.sword.body.setEnable(false);
                this.anims.play('adventurer-fall', true);
                return;
            }

            // if(currentAnim === 'adventurer-jump-momentum' && !this.isAttacking) {
            //     this.anims.play('adventurer-fall', true);
            // }
        });
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        const {body, keys, playerState} = this;
        const {up, down, left, right, fire, jump, select, pause} = keys;
        const {blocked} = body;

        /////////////////////////////////
        const currentAnim = this.anims.getName();
        // if not game pause
        if(!playerState.pause && !playerState.dead) {
            // shoot
            if(Phaser.Input.Keyboard.JustDown(fire)) {
                this.swordAttack(time);
            }
            // player movement
            this.move();

            // weapon hitbox
            if(this.flipX && this.sword.body) {
                this.sword.body.reset(this.body.left - this.sword.body.width / 2, this.body.y + this.body.height / 2);
            }
            if(!this.flipX && this.sword.body) {
                this.sword.body.reset(this.body.right + this.sword.body.width / 2, this.body.y + this.body.height / 2);
            }

            if(fire.isUp && !currentAnim.startsWith('adventurer-air-attack') && !currentAnim.startsWith('adventurer-attack')) {
                this.isAttacking = false;
                this.sword.body.setEnable(false);
            }

            // handle player anims, body size, jump
            switch(true) {
                // jump now
                case (jump.isDown && jump.getDuration() < 250 && blocked.down && !this.isJumping):
                    this.jumpTime = time;

                    this.isJumping = true;

                    this.body.setVelocityY(-400 - this.inventory.jumpBootsValue);

                    if(!this.isAttacking) this.anims.play('adventurer-jump-start', true);
                    break;

                // end of jump
                case (jump.isDown && this.isJumping && this.jumpTime + 350 < time):
                    this.isJumping = false;

                    this.body.setVelocityY(0);

                    this.setGravityMomentum();

                    if(!this.isAttacking) {
                        this.anims.play('adventurer-jump-momentum', true).chain('adventurer-fall');
                    }
                    break;

                case (jump.isDown && !this.isJumping && !blocked.down):
                    if(!this.isAttacking) {
                        this.anims.play('adventurer-jump-momentum', true).chain('adventurer-fall');
                    }
                    break;

                // player stop the jump
                case (jump.isUp && this.isJumping):
                    this.isJumping = false;

                    this.body.setVelocityY(0);

                    this.setGravityMomentum();

                    if(!this.isAttacking) {
                        this.anims.play('adventurer-jump-momentum', true).chain('adventurer-fall');
                    }
                    break;

                case (left.isDown):
                    // marche vers la gauche
                    if(blocked.down) {
                        if(currentAnim === 'adventurer-idle-2') {
                            this.anims.play('adventurer-sword-shte', true).chain('adventurer-walk');
                        }
                        else {
                            this.anims.play('adventurer-walk', true);
                        }
                    }

                    this.body.setOffset(18, 10);
                    break;

                case (right.isDown):
                    // marche vers la droite
                    if(blocked.down) {
                        if(currentAnim === 'adventurer-idle-2') {
                            this.anims.play('adventurer-sword-shte', true).chain('adventurer-walk');
                        }
                        else {
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
            if(select.isDown) {
                this.selectWeapon();
            }

            // pause
            if(pause.isDown) {
                this.scene.pauseGame();
            }
        }
        else if(this.playerState.pause) {
            // GAME PAUSE
            if(!this.scene.isPausing && pause.isDown) {
                this.scene.pauseGame();
            }
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
    move() {
        const {left, right} = this.keys;

        // Move with acceleration to the right
        if(right.isDown && !left.isDown) {
            this.body.setDragX(0);
            this.body.setAccelerationX(ACCELERATION_X);
            this.flipX = false;
        }

        // Move with acceleration to the left
        if(left.isDown && !right.isDown) {
            this.body.setDragX(0);
            this.body.setAccelerationX(-ACCELERATION_X);
            this.flipX = true;
        }

        // Decelerate with Drag
        if(!left.isDown && !right.isDown) {
            this.body.setAccelerationX(0);

            if(!this.body.blocked.down) {
                this.body.setDragX(ACCELERATION_X / 4 - Math.abs(this.body.acceleration.x) / 4);

                return;
            }

            this.body.setDragX(ACCELERATION_X * 4 - Math.abs(this.body.acceleration.x) / 4);
        }
    }

    setGravityMomentum() {
        this.body.setGravityY(0);

        this.scene.time.addEvent({
            delay: 100,
            callback: this.resetGravity,
            callbackScope: this
        });
    }

    resetGravity() {
        this.body.setGravityY(1000);
    }

    playerOnPlatform(platform) {
        if(this.isSpelling) {
            return;
        }
        this.body.setVelocityX(platform.body.velocity.x)
    }

    swordAttack(time) {
        if(this.playerState.selectedWeapon === 'sword') {

            this.playerState.swordAttackAnim += 1;
            this.playerState.swordAttackAnim > 3 ? this.playerState.swordAttackAnim = 1 : null;
            if(this.body.blocked.down) {
                this.anims.play(`adventurer-attack${this.playerState.swordAttackAnim}`, true);
            }
            else {
                this.anims.play(`adventurer-air-attack${this.playerState.swordAttackAnim}`, true);
            }

        }

        if(this.playerState.selectedWeapon === 'bow') {
            this.shootArrow(time);
        }
    }

    shootArrow(time) {
        if(time > this.playerState.lastFired) {
            const swell = this.swords.getFirstDead(true, this.body.x + this.playerState.bulletPositionX, this.body.y + this.playerState.bulletPositionY, 'sword', null, true);
            if(swell) {
                this.playerState.lastFired = time + this.inventory.fireRate;
                swell.visible = true;
                swell.name = 'sword';
                swell.anims.play('sword', true);
                swell.setDepth(102);

                const playerSpeed = Math.abs(this.body.velocity.x);

                this.scene.sound.play('swell', {volume: 0.6});
                //    BULLET ORIENTATION    ////
                if(this.playerState.bulletOrientationX === 'left') {
                    swell.flipX = true;
                    swell.body.velocity.x = -500 - playerSpeed;
                }
                if(this.playerState.bulletOrientationX === 'right') {
                    swell.flipX = false;
                    swell.body.velocity.x = 500 + playerSpeed;
                }

                this.scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                        swell.destroy();
                    },
                });
            }
        }
    }

    bowKill(e, playSfxBool = true) {
        const {blocked} = e.body;
        const {body, texture, x, y} = e;
        e.setVelocity(0, 0);
        e.destroy();
        const sideHit = Object.entries(blocked)
            .filter((key) => {
                return key[1] === true;
            })[0][0];
        const sideHitOffset = sideHit === 'right' ? body.width / 2 : -body.width / 2
        this.scene.weaponParticles = this.scene.add.particles('whitePixel');
        this.scene.weaponParticleEmitter = this.scene.weaponParticles.createEmitter({
            //angle: { min: -e.body.velocity.x / 10, max: Math.abs(e.body.velocity.x / 10) },
            speed: {min: 200, max: 400},
            quantity: 6,
            lifespan: 100,
            alpha: 1,
            scale: texture.key === 'axe' ? 1 : 0.5,
            gravityX: -(Math.abs(body.velocity.x)),
            on: false,
        });
        this.scene.weaponParticleEmitter.explode(6, x + sideHitOffset, y);
        // leave if hit enemy, or play sfx on wall
        if(!playSfxBool) {
            return;
        }

        switch(e.name) {
            case 'knife':
                this.scene.sound.play('knifeIcon', {volume: 0.4, rate: 1.5});
                break;
            case 'sword':
                this.scene.sound.play('knifeIcon', {volume: 0.4, rate: 1.2});
                break;
            case 'axe':
                this.scene.sound.play('knifeIcon', {volume: 0.4, rate: 0.5});
                break;
        }

    }

    addEnergy() {
        this.inventory.lifeEnergyBlock += 1;
        this.inventory.life = this.inventory.lifeEnergyBlock * 100;
    }

    addJumpBoots() {
        this.inventory.jumpBoots = true;
        this.inventory.jumpBootsValue = 250;
    }

    addBow() {
        this.inventory.bow = true;
        this.inventory.selectableWeapon.push('bow');
    }

    selectWeapon() {
        if(!this.selectWeaponFlag) {
            this.selectWeaponFlag = true;
            const totalWeaponList = ['sword', 'bow'];
            const availableWeaponList = totalWeaponList.filter(e => {
                return this.inventory.selectableWeapon.includes(e)
            });

            let count = availableWeaponList.indexOf(this.playerState.selectedWeapon);

            if(count === availableWeaponList.length - 1) {
                count = -1;
            }

            this.playerState.selectedWeapon = availableWeaponList[count + 1];

            this.scene.time.addEvent({
                delay: 300,
                callback: () => {
                    this.selectWeaponFlag = false;
                },
            });
        }
    }

    handleLava() {
        if(!this.lavaOverlap) {
            this.lavaOverlap = true;
            this.inventory.life -= 3;
            this.scene.sound.play('playerHit');
            this.scene.events.emit('setHealth', {life: this.inventory.life});
            this.playerFlashTween = this.scene.tweens.add({
                targets: this.scene.player,
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
                    this.scene.player.alpha = 1;
                },
            });
            this.scene.time.addEvent({
                delay: 100,
                callback: () => {
                    this.lavaOverlap = false;
                },
            });
        }
        if(this.inventory.life <= 0) {
            this.playerState.dead = true;
            this.playerDead = true;
            this.scene.physics.pause();
            this.scene.events.emit('setHealth', {life: 0});
            this.scene.sound.play('playerDead', {volume: 1});
            this.scene.input.enabled = false;
            this.scene.player.anims.pause(this.scene.player.anims.currentFrame);
            this.playerFlashTween.stop();
            this.inventory.life = 0;
            this.scene.player.setTintFill(0xFFFFFF);
            this.scene.player.setDepth(2000);

            this.round = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'whitePixel');
            this.round.setOrigin(0.5, 0.5);
            this.round.setDepth(1000);
            this.round.displayWidth = 2;
            this.round.displayHeight = 2;

            this.tween = this.scene.tweens.add({
                targets: this.round,
                ease: 'Sine.easeInOut',
                scaleX: 1,
                scaleY: 1,
                duration: 2000,
                delay: 2000,
                onComplete: () => {
                    this.scene.input.enabled = true;
                    this.scene.playerIsDead();
                },
            });
        }
    }

    getLife(l) {
        if(this.inventory.life + l.health < this.inventory.lifeEnergyBlock * 100) {
            this.inventory.life += Math.round(l.health);
        } else {
            this.inventory.life = this.inventory.lifeEnergyBlock * 100;
        }
        this.scene.sound.play('getLife', {volume: 2});
        l.destroy();
        this.scene.events.emit('setHealth', {life: this.inventory.life});
    }
}
