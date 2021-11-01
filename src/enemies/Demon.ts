import HellHound from './HellHound';
import Thing from './Thing';
import Skeleton from './Skeleton';
import Ghost from './Ghost';
import Wizard from './Wizard';
import BurningGhoul from './BurningGhoul';
import Angel from './Angel';
import GameScene from '../scenes/GameScene';


export default class Demon extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; hited: boolean; skullHeadQuantity: number; speed: number; };
    public getFired: boolean;
    public lastAnim;
    public isBreathFire: boolean;
    public isBbreathBlue: boolean;
    public isFollowingPath: boolean;
    public battleStarted: boolean;
    public skullRotates: boolean;
    public releaseEnemy: boolean;
    public attackTime;
    public fireBallAttackCount: number;
    public phase: number;
    public demonThunder: any;
    public isDead: boolean;
    public diameter: { x: number; };
    public phase2started: boolean;
    public deathMsg;
    public twee: Phaser.Tweens.Tween;
    public isBreathBlue;
    public demonPath;
    public skullTimer: Phaser.Time.TimerEvent;
    public skullTimer2: Phaser.Time.TimerEvent;
    public skullTimer3: Phaser.Time.TimerEvent;
    public isLavaAttack: boolean;
    public isBbreathFire: boolean;
    public endFire: Phaser.Time.TimerEvent;
    public endBreath: Phaser.Time.TimerEvent;
    public ghost: Ghost;
    public skeleton: Skeleton;
    public thing: Thing;
    public hellhound: HellHound;
    public burningGhoul: BurningGhoul;
    public wizard: Wizard;
    public followPath: boolean;
    public linePath: Phaser.Curves.Path;
    public showMsg: Phaser.GameObjects.BitmapText;
    public windowParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    public windowParticleEmitter: any;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.scene = scene;
        this.name = config.name;
        this.enemyState = {
            life: 10000,
            damage: 20,
            hited: false,
            skullHeadQuantity: 8,
            speed: 120,
        };

        this.setDepth(104);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setSize(64, 92)
            .setOffset(68, 64)
            .setAllowGravity(false)
            .setCollideWorldBounds(true);

        this.getFired = false;
        this.lastAnim = null;
        this.isBreathFire = false;
        this.isBbreathBlue = false;
        this.isFollowingPath = true;
        this.battleStarted = false;
        this.skullRotates = false;
        this.releaseEnemy = false;
        this.attackTime = null;
        this.fireBallAttackCount = 0;
        this.phase = 0;
        this.isDead = false;
        this.lastAnim = null;
        this.diameter = { x: 0 };
        this.phase2started = false;
        this.deathMsg = null;
        this.blockDoors();
        this.handleSkullHeads();
        // this.body.setVelocityX(-200);

        this.on('animationcomplete', () =>
        {
            const actualKey = this.anims.currentAnim.key;
            if (actualKey === 'demon-attack' && !this.releaseEnemy)
            {
                this.isFollowingPath = false;
                this.body.setVelocity(0, 0);
                this.breathFire();
                this.anims.play('demon-attack-end', true);

                return;
            }
            if (actualKey === 'demon-attack' && this.releaseEnemy)
            {
                this.isFollowingPath = false;
                this.body.setVelocity(0, 0);
                this.breathBlue();
                this.anims.play('demon-attack-end', true);

                return;
            }
        });
        this.addPath();
        this.startBattle();
        this.twee = this.scene.tweens.add({
            targets: this.diameter,
            ease: 'Sine.easeInOut',
            duration: 4200,
            delay: 0,
            repeat: -1,
            loop: -1,
            yoyo: true,
            x: {
                getStart: () => 1,
                getEnd: () => 250,
            },
        });
        // this.twee.play()
    }

    // availables anims
    // demon-idle
    // demon-attack
    // breathBlue
    // breathFire
    // fire-skull

    // demonDeathSfx
    // demonHitSfx
    // demonDyingFireSfx
    // demonFlySfx
    // demonBreathSfx
    // demonBreathBlueSfx
    // demonScreamSfx
    // demonlightingLaughSfx
    // demonSkullAttackSfx
    // demonSkullHitSfx

    public preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.active && this.battleStarted && this.phase !== 1 && !this.isDead)
        {
            let animationName;

            if (!this.isBreathFire && !this.isBreathBlue)
            {
                const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);

                if (distance < 150 && !this.isBreathFire && this.body.y < this.scene.player.y - 50 && this.lastAnim !== 'demon-attack-end')
                {
                    animationName = 'demon-attack';
                }
                else if (distance > 200 && !this.isBreathBlue && this.body.center.y > 415 && this.lastAnim !== 'demon-attack-end')
                {
                    this.releaseEnemy = true;
                    animationName = 'demon-attack';
                }
            }
            if (this.x > this.scene.player.x && !this.isBreathFire)
            {
                if (this.flipX)
                {
                    this.flipX = false;
                    this.body.setOffset(56, 64);
                }
            }
            else if (this.x < this.scene.player.x && !this.isBreathFire)
            {
                if (!this.flipX)
                {
                    this.flipX = true;
                    this.body.setOffset(75, 64);
                }
            }

            if (this.demonPath && this.isFollowingPath)
            {
                // follow path
                const speed = this.enemyState.speed;
                const dx = this.demonPath.x - this.body.x;
                const dy = this.demonPath.y - this.body.y;
                const angle = Phaser.Math.Angle.Between(this.body.x, this.body.y, this.demonPath.x, this.demonPath.y); // Math.atan2(dy, dx);
                this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            }

            if (this.skullRotates && this.phase !== 1)
            {
                Phaser.Actions.RotateAroundDistance(this.scene.skullHeads.getChildren(), {
                    x: this.body.center.x,
                    y: this.body.center.y
                }, 0.02, this.diameter.x);
            }

            if (this.lastAnim !== animationName)
            {
                this.lastAnim = animationName;
                this.anims.play(animationName, true);
            }
        }
        if (this.active && this.phase === 1)
        {
            this.scene.skullHeads.getChildren().forEach(e => e.destroy());
        }
    }

    public handleSkullHeads ()
    {
        if (!this.active || this.phase === 1)
        {
            return;
        }
        this.skullTimer = this.scene.time.addEvent({
            delay: 20000,
            repeat: 0,
            callback: () =>
            {
                this.isFollowingPath = false;

                if (!this.active || this.phase === 1)
                {
                    return;
                }

                this.body.setVelocity(0, 0);

                const arrPositionsX = [this.body.x + 1500, this.body.x + 750, this.body.x, this.body.x - 750, this.body.x - 1500, this.body.x - 750, this.body.x, this.body.x + 750];
                const arrPositionsY = [this.body.y, this.body.y - 750, this.body.y - 1500, this.body.y - 750, this.body.y, this.body.y + 750, this.body.y + 1500, this.body.y + 750];

                const arrAngle = [0, Math.PI / 4, Math.PI / 2, 3 / 4 * Math.PI, Math.PI, 5 / 4 * Math.PI, 3 / 2 * Math.PI, 7 / 4 * Math.PI];

                for (let i = 0; i < this.enemyState.skullHeadQuantity; i += 1)
                {
                    this[`skull${i}`] = this.scene.skullHeads.getFirstDead(true, this.body.x, this.body.y, 'finalBoss', undefined, true);
                    if (this[`skull${i}`])
                    {
                        this[`skull${i}`].visible = true;
                        this[`skull${i}`].anims.play('fire-skull', true);
                        this[`skull${i}`].setDepth(103);
                        this[`skull${i}`].state = { damage: 25 };
                        this[`skull${i}`].name = 'skullHead';
                        this[`skull${i}`].body.setSize(24, 28).setOffset(12, 18).reset(arrPositionsX[i], arrPositionsY[i]);
                        //this.scene.skullGroup.push(this[`skull${i}`]);
                    }
                }
                this.twee.play();
                this.skullRotates = true;
                this.scene.sound.play('demonSkullSummonSfx');
                this.skullHeadsAppears();
            }
        });


        // this.twee.play();
        // const skullhead = this.scene.skullHeads.getFirstDead(true, this.body.x, this.body.y, 'finalBoss', null, true);

    }

    public skullHeadsAppears ()
    {
        if (!this.active || this.phase === 1)
        {
            return;
        }
        this.skullTimer2 = this.scene.time.addEvent({
            delay: 10000,
            repeat: 0,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }

                this.scene.skullGroup.forEach((skull) =>
                {
                    if (skull.active)
                    {
                        this.scene.sound.play('demonSkullAttackSfx', { volume: 0.1 });
                        this.skullRotates = false;
                        const angle = Phaser.Math.Angle.Between(skull.x, skull.y, this.scene.player.x, this.scene.player.y); // Math.atan2(dy, dx);
                        skull.body.setVelocity(Math.cos(angle) * 400, Math.sin(angle) * 400);
                        this.skullTimer3 = this.scene.time.addEvent({
                            delay: 3000,
                            repeat: 0,
                            callback: () =>
                            {
                                if (!this.active)
                                {
                                    return;
                                }
                                skull.destroy();
                            }
                        });
                    }

                });
                this.isFollowingPath = true;
                this.handleSkullHeads();
            }
        });
    }

    public skullAttack ()
    {
        if (this.isLavaAttack || !this.active)
        {
            return;
        }
        // return;
        const lavaFireTimer = this.scene.time.addEvent({
            startAt: 100,
            delay: 1000,
            repeat: 0,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }
                if (lavaFireTimer.repeatCount === 3)
                {
                    this.anims.play('demon-idle', true);
                    // this.body.reset(200, 24 *16);

                }
                if (lavaFireTimer.repeatCount === 2)
                {
                    this.anims.play('demon-idle', true);

                    // this.body.reset(79, 24 *16);
                }
                if (lavaFireTimer.repeatCount === 1)
                {
                    this.anims.play('demon-idle', true);

                    // this.body.reset(318, 24 *16);
                }
                if (lavaFireTimer.repeatCount === 0)
                {

                    // this.setAlpha(0);
                    this.enemyState.damage = 0;
                    // this.body.setVelocityX(0)
                    // this.body.reset(-100, -100);

                    this.isLavaAttack = false;
                    lavaFireTimer.destroy();
                }
            },
        });
    }

    public breathFire ()
    {
        if (this.isBreathFire)
        {
            return;
        }
        this.isBbreathFire = true;
        const positionX = this.flipX ? this.body.x + 74 : this.body.x - 12;
        const ball = this.scene.breathFire.getFirstDead(true, positionX, this.body.y + 56, 'finalBoss', undefined, true);
        if (ball)
        {
            ball.visible = true;
            ball.anims.play('breathFire', true);
            ball.on('animationcomplete', () =>
            {
                ball.destroy();
            });
            ball.setDepth(105);
            ball.state = { damage: 30 };
            ball.name = 'demonBreath';
            ball.body.setSize(102, 46).setOffset(28, 28);
            this.scene.breathGroup.push(ball);

            if (this.flipX)
            {
                ball.body.setVelocity(380, 380);
            } else
            {
                ball.body.setVelocity(-380, 380);
            }

            if (ball.body.velocity.x < 0)
            {
                ball.flipX = false;
            } else
            {
                ball.flipX = true;
            }

            // ball.setRotation(angle + Math.PI/2)
            this.scene.sound.play('demonBreathSfx');
            this.endFire = this.scene.time.addEvent({
                delay: 50,
                callback: () =>
                {
                    ball.body.setVelocity(0, 0);
                },
            });
            this.endBreath = this.scene.time.addEvent({
                delay: 1500,
                callback: () =>
                {
                    this.isBreathFire = false;
                    if (!this.skullRotates)
                    {
                        this.isFollowingPath = true;
                    }
                    this.anims.play('demon-idle', true);
                },
            });

        }
    }

    public breathBlue ()
    {
        if (this.isBreathBlue)
        {
            return;
        }
        this.isBbreathBlue = true;
        const positionX = this.flipX ? this.body.x + 74 : this.body.x - 12;
        const ball = this.scene.breathFire.getFirstDead(true, positionX, this.body.y + 56, 'finalBoss', undefined, true);
        if (ball)
        {
            ball.visible = true;
            ball.anims.play('breathBlue', true);
            ball.on('animationcomplete', () =>
            {
                ball.destroy();
            });
            ball.setDepth(105);
            ball.enemyState = { damage: 30 };
            ball.name = 'fireball';
            ball.body.setSize(102, 46).setOffset(28, 28);
            this.scene.breathGroup.push(ball);

            if (this.flipX)
            {
                ball.body.setVelocity(380, 380);
            } else
            {
                ball.body.setVelocity(-380, 380);
            }

            if (ball.body.velocity.x < 0)
            {
                ball.flipX = false;
            } else
            {
                ball.flipX = true;
            }

            // release an enemy

            const arrEnemies = ['ghost', 'skeleton', 'thing', 'hellhound', 'burningghoul', 'wizard'];
            const rdmNumber = Phaser.Math.Between(0, arrEnemies.length - 1);
            const ene = arrEnemies[rdmNumber];
            switch (ene)
            {
                case 'ghost':
                    const ghost = new Ghost(this.scene, positionX, this.body.y + 56, {
                        key: 'enemies',
                        name: 'ghost',
                        life: 15,
                        damage: 10,
                    });
                    this.ghost.anims.play('ghost', true);
                    this.scene.enemyGroup.push(ghost);
                    break;
                case 'skeleton':
                    const skeleton = new Skeleton(this.scene, positionX, this.body.y + 56, {
                        key: 'enemies',
                        name: 'skeleton',
                        life: 15,
                        damage: 10,
                    });
                    // this.skeleton.anims.play('skeletonRise', true);
                    this.scene.enemyGroup.push(skeleton);
                    break;
                case 'thing':
                    const thing = new Thing(this.scene, positionX, this.body.y + 56, {
                        key: 'enemies',
                        name: 'thing',
                        life: 15,
                        damage: 10,
                    });
                    this.thing.anims.play('thing', true);
                    this.scene.enemyGroup.push(thing);
                    break;
                case 'hellhound':
                    const hellhound = new HellHound(this.scene, positionX, this.body.y + 56, {
                        key: 'enemies',
                        name: 'hellhound',
                        life: 15,
                        damage: 10,
                    });
                    this.hellhound.anims.play('hellHoundRun', true);
                    this.scene.enemyGroup.push(hellhound);
                    break;
                case 'burningghoul':
                    const burningGhoul = new BurningGhoul(this.scene, positionX, this.body.y + 56, {
                        key: 'burning-ghoul',
                        name: 'ghoul',
                        life: 15,
                        damage: 10,
                    });
                    this.burningGhoul.anims.play('burning-ghoul', true);
                    this.scene.enemyGroup.push(burningGhoul);
                    break;
                case 'wizard':
                    const wizard = new Wizard(this.scene, positionX, this.body.y + 56, {
                        key: 'enemies',
                        name: 'wizard',
                        life: 15,
                        damage: 10,
                    });
                    this.wizard.anims.play('wizard-idle', true);
                    this.scene.enemyGroup.push(wizard);
                    break;
            }

            //////////////
            this.scene.sound.play('demonBreathBlueSfx');

            this.endFire = this.scene.time.addEvent({
                delay: 50,
                callback: () =>
                {
                    ball.body.setVelocity(0, 0);
                },
            });

            this.endBreath = this.scene.time.addEvent({
                delay: 1500,
                callback: () =>
                {
                    this.isBreathBlue = false;
                    this.releaseEnemy = false;
                    if (!this.skullRotates)
                    {
                        this.isFollowingPath = true;
                    }
                    this.anims.play('demon-idle', true);
                },
            });

        }
    }

    public startOnPath ()
    {
        this.setPosition(this.scene[`path${this.name}`].x, this.scene[`path${this.name}`].y);
        this.body.setAllowGravity(false);
        this.angle = this.scene[`path${this.name}`].angle;
        this.followPath = true;
    }

    public addPath ()
    {
        const layerArray = this.scene.checkObjectsLayerIndex('pathBoss');

        if (!layerArray || layerArray.objects.length === 0)
        {
            return;
        }

        layerArray.objects.forEach((element) =>
        {
            const poly = element.polyline as Phaser.Types.Math.Vector2Like[];

            if (!poly.length) return;

            const pathOriginX = element.properties.originX * 16;
            const pathOriginY = element.properties.originY * 16;

            if (!poly[0].x || !poly[0].y) return;

            this.linePath = new Phaser.Curves.Path(pathOriginX + poly[0].x, pathOriginY + poly[0].y);

            poly.forEach(line => this.linePath.lineTo(line.x as number + pathOriginX, line.y as number + pathOriginY));

            this.demonPath = this.scene.add.follower(this.linePath, pathOriginX, pathOriginY, 'whitePixel');
            this.demonPath.setVisible(false);
            this.demonPath.setTintFill(0xFF0000);
            this.demonPath.name = element.name;
            this.demonPath.startFollow({
                duration: element.properties.duration,
                yoyo: false,
                repeat: -1,
                rotateToPath: false,
                verticalAdjust: false,
            });

            this.scene.pathGroup.push(this.demonPath);
        });
    }

    public startBattle ()
    {
        this.anims.play('demon-idle', true);

        const msg = `Hey kid...
    I'm waiting
    for you ...`;
        this.scene.player.anims.play('stand');

        this.scene.player.state.pause = true;

        this.scene.time.addEvent({
            delay: 1000,
            callback: () =>
            {
                this.showMsg = this.scene.add.bitmapText(this.body.x - 48, this.body.y, 'atomic', msg, 8, 1)
                    .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);
            }
        });

        const startTimer = this.scene.time.addEvent({
            delay: 2000,
            repeat: 5,
            callback: () =>
            {
                if (startTimer.repeatCount === 5)
                {
                    this.showMsg
                        .setX(this.scene.player.x + 48)
                        .setY(this.scene.player.y - 48)
                        .setText('Hello');
                }

                if (startTimer.repeatCount === 4)
                {
                    this.showMsg.setText('My name is Acharis');
                }
                if (startTimer.repeatCount === 3)
                {
                    this.showMsg.setText('You killed my father');
                }
                if (startTimer.repeatCount === 2)
                {
                    this.showMsg.setText('Prepare to die');
                    this.scene.sound.play('hellBeastFirstLaughSfx');
                }
                if (startTimer.repeatCount === 1)
                {
                    this.showMsg.destroy();
                    this.setFlipX(true);
                    this.body.setOffset(75, 64);
                }
                if (startTimer.repeatCount === 0)
                {
                    this.setFlipX(false);
                    this.body.setOffset(56, 64);
                    this.battleStarted = true;
                    this.scene.player.state.pause = false;
                    this.scene.sound.play('demonScreamSfx');
                    startTimer.destroy();
                    this.scene.stopMusic();
                    this.scene.demonFight1.play();
                }
            }
        });
    }

    public startPhase1 ()
    {
        if (this.scene.player.state.dead)
        {
            return;
        }
        this.scene.demonFight1.stop();
        this.scene.demonLighting.play();
        this.phase = 1;
        this.isBreathFire = false;
        this.isBbreathBlue = false;
        this.skullRotates = false;
        this.isFollowingPath = false;
        this.enemyState.life = 30000;
        this.scene.player.anims.play('stand');
        this.scene.player.state.pause = true;

        this.body.setVelocity(0, 0);
        this.scene.cameras.main.startFollow(this);


        this.showMsg = this.scene.add.bitmapText(this.body.x, this.body.y - 48, 'atomic', '', 8, 1)
            .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);

        const startTimer = this.scene.time.addEvent({
            delay: 2000,
            repeat: 4,
            callback: () =>
            {
                if (startTimer.repeatCount === 4)
                {
                    this.showMsg.setText('Kid...');
                }
                if (startTimer.repeatCount === 3)
                {
                    this.showMsg.setText('I\'m bored to play with you');
                }
                if (startTimer.repeatCount === 2)
                {
                    this.showMsg.setText('Let\'s end this joke');
                }
                if (startTimer.repeatCount === 1)
                {
                    this.showMsg.destroy();

                    const positionX = this.flipX ? this.body.x + 74 : this.body.x - 12;

                    this.demonThunder = this.scene.thunderPower.getFirstDead(true, -100, this.scene.player.body.x - 256, 'storm', undefined, true);

                    if (this.demonThunder)
                    {
                        this.scene.cameras.main.startFollow(this.scene.player);
                        this.demonThunder.visible = true;
                        this.demonThunder.anims.play('thunder-magic', true);
                        // this.demonThunder.on('animationcomplete', () => {
                        //   //this.demonThunder.destroy();
                        // });
                        this.demonThunder.setDepth(105);
                        this.demonThunder.state = { damage: 30 };
                        this.demonThunder.name = 'demonThunder';

                        // const dx = this.scene.player.x - this.x;
                        // const dy = this.scene.player.y - this.y;
                        // const angle = Math.atan2(dy, dx);

                        this.demonThunder.body.setSize(32, 240).setOffset(24, 0);
                        // this.scene.player.state.pause = true;
                        this.scene.player.anims.play('duck', true);
                        this.scene.player.body.setSize(10, 15, true).setOffset(21, 20);
                        this.scene.player.body.setVelocity(0, 0);
                        this.demonThunder.body.reset(this.scene.player.body.center.x, -100);
                        this.demonThunder.body.setVelocity(0, 1900);
                        this.scene.thunderGateSfx.play();
                        this.scene.time.addEvent({
                            delay: 2000,
                            callback: () =>
                            {
                                this.scene.sound.play('demonlightingLaughSfx');
                            }
                        });

                        // destroy all enemies
                        this.scene.enemyGroup.forEach(enemy =>
                        {
                            if (enemy.active && enemy.name !== 'demon')
                            {
                                this.scene.enemyExplode(enemy.body.x, enemy.body.y);
                                enemy.destroy();
                            }
                        });
                    }
                }
            }
        });
    }

    public startPhase2 ()
    {
        if (!this.active || this.phase2started)
        {
            return;
        }

        this.phase2started = true;
        this.scene.time.addEvent({
            delay: 2000,
            callback: () =>
            {
                // particles for broken window
                this.windowParticles = this.scene.add.particles('whitePixel');
                this.windowParticleEmitter = this.windowParticles.createEmitter({
                    speed: { min: 200, max: 400 },
                    quantity: 36,
                    lifespan: 20000,
                    alpha: 1,
                    scale: 3,
                    gravityY: 800,
                    on: false,
                });

                this.windowParticleEmitter.explode(36, 394, 204);
                this.scene.sound.play('brokenGlass');

                this.showMsg = this.scene.add.bitmapText(this.body.x - 48, this.body.y - 48, 'atomic', 'What !??', 8, 1)
                    .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);

                this.scene.time.addEvent({
                    delay: 2000,
                    callback: () =>
                    {
                        this.showMsg.destroy();
                    }
                });

                // angel appears
                this.scene.angel = new Angel(this.scene, 394, 274, {
                    key: 'angel-idle',
                    name: 'angel',
                });
                this.scene.cameras.main.startFollow(this.scene.angel);

                
                this.scene.angel.anims.play('angel-idle', true);
                this.scene.npcGroup.push(this.scene.angel);
                const angle = Phaser.Math.Angle.Between(this.scene.angel.x, this.scene.angel.y, this.scene.player.x, this.scene.player.y); // Math.atan2(dy, dx);
                this.scene.angel.body.setVelocity(Math.cos(angle) * 100, Math.sin(angle) * 100);
                this.scene.stopMusic();
                this.scene.playMusic('demonFight1');
            }
        });
    }

    public startPhase3 ()
    {
        if (this.isDead)
        {
            return;
        }
        this.isDead = true;
        //this.scene.player.inventory.bossFinal = true;
        this.isFollowingPath = false;
        this.body.setVelocity(0, 0);
        this.deathMsg = this.scene.add.bitmapText(this.body.x - 140, this.body.y - 48, 'atomic', '', 10, 1).setDepth(300);

        const demonExplode = this.scene.time.addEvent({
            delay: 150,
            repeat: 30,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }
                const X = Phaser.Math.Between(this.body.x, this.body.x + this.body.width);
                const Y = Phaser.Math.Between(this.body.y, this.body.y + this.body.height);
                this.scene.enemyExplode(X, Y);
                this.scene.sound.play('demonDyingFireSfx');

                if (demonExplode.repeatCount === 1)
                {
                    this.scene.sound.play('demonDeathSfx', { rate: 0.5 });
                }
                if (demonExplode.repeatCount > 25)
                {
                    this.deathMsg.setText(`
          No
          `);
                }
                if (demonExplode.repeatCount < 26)
                {
                    this.deathMsg.setText(`
          NOooooo
          `);
                }
                if (demonExplode.repeatCount < 16)
                {
                    this.deathMsg.setText(`
          You got your revenge
                  but
          this is not the end`);
                }
                if (demonExplode.repeatCount < 6)
                {
                    this.deathMsg.setText(`
          Survive this castle
            or i'll see you
              in hell!`);
                }

                if (demonExplode.repeatCount === 0)
                {
                    this.scene.giveLife = this.scene.physics.add.sprite(this.body.center.x, this.body.center.y, 'heart');
                    this.scene.giveLife.setDepth(105);
                    // @ts-ignore
                    this.scene.giveLife.health = 500;
                    // @ts-ignore
                    this.scene.giveLife.body.setSize(23, 21);
                    this.scene.giveLife.anims.play('heart');
                    this.scene.giveLifeGroup.push(this.scene.giveLife);
                    this.body.reset(-1000, -1000);
                    // this.scene.player.inventory.escape = true;
                    this.deathMsg.destroy();

                    const pos = this.scene.getCamCenter();
                    this.showMsg = this.scene.add.bitmapText(pos.x, pos.y - 42, 'atomic', `two and a half minutes
        before the castle collapses
      Get out of here, quick!!!`, 10, 1)
                        .setOrigin(0.5, 0.5).setAlpha(1).setDepth(200);
                    this.scene.time.addEvent({
                        delay: 5000,
                        callback: () =>
                        {
                            // display counter
                            this.scene.events.emit('count');
                            this.showMsg.destroy();
                            this.unlockDoors();
                            this.scene.escape();
                        }
                    });
                }
            }
        });
    }

    public animate (str)
    {
        this.anims.play(str, true);
    }

    public looseLife (e)
    {
        this.scene.sound.play('demonHitSfx');
        this.enemyState.life = this.enemyState.life - e;
    }

    public explode ()
    {
        this.isDead = true;
        this.body.setVelocity(0, 0);
        this.unlockDoors();
    }

    public blockDoors ()
    {
        this.scene.battleWithBoss = true;
    }

    public unlockDoors ()
    {
        this.scene.battleWithBoss = false;
    }

    public checkCollision (d)
    {
        return;
    }
}
