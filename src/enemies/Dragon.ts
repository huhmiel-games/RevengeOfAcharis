import GameScene from '../scenes/GameScene';

export default class Dragon extends Phaser.GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    public enemyState: { life: number; damage: number; directionX: number; directionY: number; hited: boolean; lastFired: number; fireRate: number; };
    private getFired: boolean;
    private lastAnim: string;
    private isFireAttacking: boolean;
    private isTailAttacking: boolean;
    private battleStarted: boolean;
    private attackTime: null;
    private isDead: boolean;
    private walkplay: boolean;
    private walkk: Phaser.Sound.BaseSound;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config.key);

        this.scene = scene;
        this.name = config.name;
        this.enemyState = {
            life: 100,
            damage: 20,
            directionX: -550,
            directionY: 0,
            hited: false,
            lastFired: 0,
            fireRate: 40,
        };

        this.setDepth(104);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setAllowGravity(true).setGravityY(200);

        this.getFired = false;
        this.lastAnim = '';
        this.isFireAttacking = false;
        this.isTailAttacking = false;
        this.battleStarted = false;
        this.attackTime = null;
        this.isDead = false;
        this.walkplay = false;

        this.blockDoors();

        this.anims.play('dragon-idle', true);

        this.walkk = this.scene.sound.add('dragonWalkSfx', { volume: 0.5 });
        
        this.on(Phaser.Animations.Events.ANIMATION_START, (e: any) =>
        {
            if (this.anims.currentAnim.key === 'dragon-breath')
            {
                this.scene.sound.play('dragonBreathSfx');
            }

            if (this.anims.currentAnim.key === 'dragon-tail')
            {
                this.scene.sound.play('dragonTailSfx', { volume: 2 });
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (e) =>
        {
            if (this.anims.currentAnim.key === 'dragon-breath' && this.isFireAttacking)
            {
                this.isFireAttacking = false;

                this.body.setVelocity(0, 0);

                this.anims.play('dragon-idle', true);
            }

            if (this.anims.currentAnim.key === 'dragon-tail' && this.isTailAttacking)
            {
                this.isTailAttacking = false;

                this.body.setVelocity(0, 0);

                this.anims.play('dragon-idle', true);
            }

            if (this.lastAnim !== 'dragon-idle')
            {
                this.lastAnim = 'dragon-idle';

                this.anims.play('dragon-idle', true);
            }
        });


        this.on('animationupdate', () =>
        {
            const runSpeedNow = Math.abs(this.body.velocity.x);

            const walkRate = Phaser.Math.RND.realInRange(0.95, 1.05);

            const runTimer = runSpeedNow > 0 ? (250 / runSpeedNow) * 50 : 330;

            if (this.anims.getName() === 'dragon-idle' && !this.walkplay && this.body.blocked.down)
            {
                this.walkplay = true;

                this.walkk.play({ rate: walkRate });

                this.scene.time.addEvent({
                    delay: runTimer,
                    callback: () =>
                    {
                        this.walkplay = false;
                    },
                });
            }
        });
    }

    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.body.setSize(this.width, (this.height / 4) * 3)
            .setOffset(0, this.height / 4);
        
        if (this.active && !this.isDead && this.body.blocked.down)
        {
            if (!this.scene.player.playerState.isDead)
            {
                const distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
                // tail attack
                if (distance <= 50 && !this.isFireAttacking)
                {
                    const dx = this.scene.player.x - this.x;
                    const dy = this.scene.player.y - this.y;
                    const angle = Math.atan2(dy, dx);

                    this.isTailAttacking = true;

                    if (distance > 30)
                    {
                        this.body.setVelocity(Math.cos(angle) * 15, 0);
                    }

                    this.anims.play('dragon-tail', true);
                }

                // breath attack
                if (distance <= 100 && distance > 50 && !this.isTailAttacking)
                {
                    const dx = this.scene.player.x - this.x;
                    const dy = this.scene.player.y - this.y;

                    const angle = Math.atan2(dy, dx);

                    this.isFireAttacking = true;

                    this.body.setVelocity(Math.cos(angle) * 30, 0);

                    this.anims.play('dragon-breath', true);
                }

                if (distance > 100 && !this.isTailAttacking && !this.isFireAttacking)
                {
                    const dx = this.scene.player.x - this.x;
                    const dy = this.scene.player.y - this.y;

                    const angle = Math.atan2(dy, dx);

                    this.body.setVelocity(Math.cos(angle) * 40, 0);

                    this.anims.play('dragon-idle', true);
                }
            }
            else if (this.scene.player.playerState.isDead)
            {
                this.anims.play('dragon-idle', true);

                this.isFireAttacking = false;

                this.isTailAttacking = false;

                this.body.setVelocity(0, 0);
            }

            if (this.body.velocity.x > 0)
            {
                this.flipX = true;
            }
            else if (this.body.velocity.x < 0)
            {
                this.flipX = false;
            }
        }
    }

    public looseLife (e)
    {
        this.scene.sound.play('dragonHitSfx', { volume: 1, rate: 1 });

        this.enemyState.life = this.enemyState.life - e;

        if (this.enemyState.life <= 0)
        {
            this.unlockDoors();

            this.scene.stopMusic();

            this.scene.playMusic('castleTheme');
        }
    }

    private playSfxDeath ()
    {
        this.scene.sound.play('dragonDeathSfx', { volume: 1, rate: 1 });
    }

    private explode ()
    {
        this.isDead = true;
        this.body.setVelocity(0, 0);
        this.unlockDoors();
    }

    private blockDoors ()
    {
        this.scene.battleWithBoss = true;
    }

    private unlockDoors ()
    {
        // if (this.scene.player.inventory.townInFire) {
        //   return;
        // }
        this.scene.battleWithBoss = false;
        // this.scene.player.inventory.boss1 = true;
    }
}
