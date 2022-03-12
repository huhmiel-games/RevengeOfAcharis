import { GameObjects } from 'phaser';
import GameScene from '../scenes/GameScene';
import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES } from '../constant/config';
import SaveLoadService from '../services/SaveLoadService';
import Projectile from './Projectile';
import Arrow from '../player/Arrow';
import DEPTH from '../constant/depth';

/**
 * @description The Enemy base class
 * @author © Philippe Pereira 2020
 * @export
 * @class Enemy
 * @extends {Phaser.GameObjects.Sprite}
 */
export default class Enemy extends GameObjects.Sprite
{
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;
    protected isHit: boolean;
    protected speed: number;
    protected isDead: boolean;
    protected isPaused: boolean = false;
    public enemyState: any;
    protected isAttacking: boolean = false;
    protected xp: number = 0;
    public invulnerability: string = '';
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config as any);

        this.name = config.name;

        this.xp = config.life / 2;

        this.scene.add.existing(this);

        this.scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);

        this.setDepth(DEPTH.ENEMY);

        this.scene.enemyGroup.push(this);

        this.isHit = false;

        this.isDead = false;
    }

    public looseLife (damage: number, weaponType: EWeaponType, weapon?: Arrow): void
    {
        if (this.isHit)
        {
            return;
        }

        this.isHit = true;

        this.setTintFill(0xDDDDDD);

        this.playSfxHit();

        this.enemyState.life -= damage;

        this.scene.showEnemyDamage(this, damage);

        if (this.isAttacking === false)
        {
            this.isAttacking = true;
        }

        if (this.enemyState.life <= 0)
        {
            this.kill();
        }

        this.scene?.time.addEvent({
            delay: 50,
            callback: () =>
            {
                if (!this.active) return;
                this.clearTint();
            },
        });

        this.scene?.time.addEvent({
            delay: 220,
            callback: () =>
            {
                if (!this.active) return;
                this.isHit = false;
            },
        });
    }

    public kill (): void
    {
        this.clearTint();
        this.playSfxDeath();
        this.burn();
        // kill the enemy

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        this.giveLife(x, y);

        SaveLoadService.setEnemiesDeathCount();

        this.destroy();
    }

    public giveLife (x: number, y: number): void
    {
        const heart = this.scene.hearts.get(x, y, 'heart', undefined, true);

        if (heart)
        {
            heart.setDepth(DEPTH.LIFE)
                .anims.play('heart')
                .setActive(true)
                .setVisible(true)
                .setDataEnabled()
                .data.set('health', this.enemyState.giveLife);

            heart.body.setEnable(true);

            this.scene.heartGroup.push(heart);
        }
    }

    public burn ()
    {
        const { x, y } = this.body.center;

        const flames = this.scene.explodeSprite.getFirstDead(true, x, y - 4, 'atlas', undefined, true);

        if (flames)
        {
            flames.setDepth(DEPTH.EXPLOSION);

            flames.anims.play('enemyExplode').on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
            {
                flames.destroy();
            });
        }
    }

    public playSfxHit ()
    {
        try
        {
            this.scene.playSfx(`${this.name}Hit`);
        }
        catch (error)
        {
            switch (this.name)
            {
                case 'fireskull':
                    this.scene.playSfx('skeletonHit', { volume: 1.2, rate: 0.8 });
                    break;

                case 'dragon-head':
                    this.scene.playSfx('skeletonHit', { volume: 0.8, rate: 1.4 });
                    break;

                default:
                    console.log(error);
                    break;
            }
        }
    }

    public playSfxDeath ()
    {
        try
        {
            this.scene.playSfx(`${this.name}Death`, { volume: 0.6, rate: 1 });
        }
        catch (error)
        {
            switch (this.name)
            {
                case 'worm':
                    this.scene.playSfx('thingDeath', { volume: 1, rate: 0.7 });
                    break;

                default:
                    console.log(error);
                    const rate = Phaser.Math.RND.realInRange(0.8, 1);

                    this.scene.playSfx(`skeletonDeath`, { volume: 0.6, rate });
                    break;
            }
        }
    }
}
