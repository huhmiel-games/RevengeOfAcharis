import GameScene from '../scenes/GameScene';

import { GameObjects } from 'phaser';
import { COLORS } from '../constant/colors';
import { FONTS, FONTS_SIZES } from '../constant/config';

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

    public looseLife (damage: number): void
    {
        if (this.isHit)
        {
            return;
        }

        this.isHit = true;
        
        this.setTintFill(0xDDDDDD);

        this.scene.sound.play(`${this.name}Hit`);

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

        this.scene.giveLife = this.scene.physics.add.sprite(this.x, this.y, 'heart').setDataEnabled();
        this.scene.giveLife.setDepth(105);
        this.scene.giveLife.data.set('health', this.enemyState.giveLife);
        this.scene.giveLife.body = this.scene.giveLife.body as Phaser.Physics.Arcade.Body;
        this.scene.giveLife.body.setSize(23, 21);
        this.scene.giveLife.anims.play('heart');
        this.scene.giveLifeGroup.push(this.scene.giveLife);

        this.destroy();
    }

    public explode ()
    {
        const flames = this.scene.explodeSprite.getFirstDead(true, this.x, this.y - 8, 'enemyExplode', undefined, true);

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
        this.scene.sound.play(`${this.name}Death`, { volume: 1, rate: 1 });
    }
}
