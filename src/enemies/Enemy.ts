import { GameObjects } from 'phaser';
import GameScene from '../scenes/GameScene';
import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';
import SaveLoadService from '../services/SaveLoadService';
import Projectile from './Projectile';
import Arrow from '../player/Arrow';

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
    public isHit: boolean;
    public speed: number;
    public isDead: boolean;
    public isPaused: boolean = false;
    public enemyState: any;
    public isAttacking: boolean = false;
    public xp: number = 0;
    public invulnerability: string = '';
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config as any);

        this.scene = scene;

        this.name = config.name;

        this.xp = config.life / 2;

        this.scene.add.existing(this);

        this.scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);

        this.setDepth(101);

        this.scene.enemyGroup.push(this);

        this.isHit = false;

        this.isDead = false;
    }

    public looseLife (damage: number, weaponType: string, weapon?: Arrow): void
    {
        if (this.isHit)
        {
            return;
        }

        this.isHit = true;
        
        this.setTintFill(0xDDDDDD);

        try
        {
            this.scene.sound.play(`${this.name}Hit`);
        }
        catch (error)
        {
            console.log(error);
        }
        

        this.enemyState.life -= damage;

        const damageText = this.scene.add.bitmapText(this.body.center.x, this.body.top, FONTS.GALAXY, `-${damage}`, FONTS_SIZES.GALAXY, 1)
            .setTintFill(COLORS.RED)
            .setDropShadow(1, 1, 0xffffff)
            .setDepth(2000);

        this.scene.tweens.add({
            targets: damageText,
            duration: 1500,
            y: {
                from: this.body.top,
                to: this.body.top -32
            },
            alpha: 0,
            onComplete: () => damageText.destroy()
        });

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
        this.explode();
        // kill the enemy

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        this.giveLife(x, y);

        SaveLoadService.setEnemiesDeathCount();

        this.destroy();
    }

    public giveLife (x: number, y: number): void
    {
        this.scene.heart = this.scene.physics.add.sprite(x, y, 'heart').setDataEnabled();
        this.scene.heart.setDepth(105);
        this.scene.heart.data.set('health', this.enemyState.giveLife);
        this.scene.heart.body = this.scene.heart.body as Phaser.Physics.Arcade.Body;
        this.scene.heart.body.setSize(23, 21).setAllowGravity(false);
        this.scene.heart.anims.play('heart');
        this.scene.heartGroup.push(this.scene.heart);
    }

    public explode ()
    {
        const { x, y } = this.body.center;

        const flames = this.scene.explodeSprite.getFirstDead(true, x, y - 4, 'enemyExplode', undefined, true);

        if (flames)
        {
            flames.setDepth(107);

            flames.anims.play('enemyExplode').on('animationcomplete', () =>
            {
                flames.destroy();
            });
        }
    }

    public playSfxDeath ()
    {
        try
        {
            this.scene.sound.play(`${this.name}Death`, { volume: 1, rate: 1 });
        }
        catch (error)
        {
            console.log(error);
        }
    }
}
