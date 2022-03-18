import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES, HEIGHT, SWORDS, WIDTH } from '../constant/config';
import DEPTH from '../constant/depth';
import PowerUp from '../player/items/powerUp';
import GameScene from '../scenes/GameScene';
import LayerService from '../services/LayerService';
import SaveLoadService from '../services/SaveLoadService';
import { TCoord, THitboxData } from '../types/types';
import Enemy from './Enemy';
import Projectile from './Projectile';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class BringerOfDeath
 * @extends {Enemy}
 */
export default class BringerOfDeath extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    public speed: number = 30;
    private hitboxData: THitboxData;
    public hitbox: Projectile[] = [];
    private swordSfx: Phaser.Sound.BaseSound;
    private isBossMusic: boolean = true;
    private currentsong: Phaser.Sound.BaseSound;
    private isBattleMusic: boolean = false;
    private xy: TCoord = { x: 0, y: 0 };
    private isSpelling: boolean = false;


    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage * 2,
            giveLife: Math.round(config.life / 3),
        };

        this.setOrigin(0, 0).setAlpha(0);

        this.body
            .setAllowGravity(false)
            .setSize(12, 54)
            .setCollideWorldBounds(false)
            .setOffset(100, 38)
            .reset(x, y - 12);

        this.xy = { x, y: y - 12 };

        this.swordSfx = this.scene.sound.add('bullet', { volume: 0.7, rate: 0.8 });

        this.hitboxData = JSON.parse('{"Bringer-of-Death_Attack_5":{"hitboxes":[{"frame":"Bringer-of-Death_Attack_5","type":"circle","x":7,"y":39,"width":52,"height":52}]},"Bringer-of-Death_Attack_6":{"hitboxes":[{"frame":"Bringer-of-Death_Attack_6","type":"circle","x":8,"y":39,"width":52,"height":52}]},"Bringer-of-Death_Spell_5":{"hitboxes":[{"frame":"Bringer-of-Death_Spell_5","type":"rectangle","x":56,"y":48,"width":13,"height":9}]},"Bringer-of-Death_Spell_6":{"hitboxes":[{"frame":"Bringer-of-Death_Spell_6","type":"rectangle","x":52,"y":53,"width":20,"height":11}]},"Bringer-of-Death_Spell_7":{"hitboxes":[{"frame":"Bringer-of-Death_Spell_7","type":"rectangle","x":58,"y":49,"width":14,"height":33}]},"Bringer-of-Death_Spell_8":{"hitboxes":[{"frame":"Bringer-of-Death_Spell_8","type":"rectangle","x":54,"y":57,"width":20,"height":34}]},"Bringer-of-Death_Spell_9":{"hitboxes":[{"frame":"Bringer-of-Death_Spell_9","type":"rectangle","x":52,"y":53,"width":21,"height":39}]},"Bringer-of-Death_Spell_10":{"hitboxes":[{"frame":"Bringer-of-Death_Spell_10","type":"rectangle","x":52,"y":53,"width":21,"height":38}]},"Bringer-of-Death_Spell_11":{"hitboxes":[{"frame":"Bringer-of-Death_Spell_11","type":"rectangle","x":56,"y":82,"width":12,"height":9}]}}');

        for (const frame in this.hitboxData)
        {
            if (this.hitboxData[frame].hasOwnProperty('hitboxes') && frame.includes('Spell'))
            {
                this.hitboxData[frame].hitboxes.forEach(element =>
                {
                    element.x = 18;
                    element.width = 20;
                });
            }
        }

        this.anims.play('Bringer-of-Death_Idle');

        this.blockDoors();

        this.startBattle();

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (frame === 'Bringer-of-Death_Spell_1') this.isSpelling = true;

            if (frame === 'Bringer-of-Death_Spell_5')
            {
                this.isSpelling = false;

                this.body.setVelocityX(0);
            }

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox: Projectile = this.scene.projectiles.getFirst(false, true, element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setActive(true).setVisible(true).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0);
                        hitbox.body.setEnable(true);
                        hitbox.enemyState = { damage: 15 };

                        if (element.type === 'rectangle')
                        {
                            hitbox.body.setSize(element.width, element.height).setEnable(true);
                        }

                        if (element.type === 'circle')
                        {
                            hitbox.body.setCircle(element.width).setEnable(true);
                        }

                        if (this.flipX && element.type === 'circle')
                        {
                            hitbox.body.reset(this.getTopRight().x - element.x - element.width * 2, this.y + element.y);
                        }
                        if (!this.flipX && element.type === 'circle')
                        {
                            hitbox.body.reset(this.x + element.x, this.y + element.y);
                        }

                        if (this.flipX && element.type === 'rectangle')
                        {
                            hitbox.body.reset(this.getTopRight().x - element.x - element.width, this.y + element.y);
                        }
                        if (!this.flipX && element.type === 'rectangle')
                        {
                            hitbox.body.reset(this.x + element.x, this.y + element.y);
                        }

                        if (frame === 'Bringer-of-Death_Spell_8')
                        {
                            this.scene.shakeCamera(50, 0.010);
                        }

                        this.hitbox.push(hitbox);

                        if (!this.swordSfx.isPlaying)
                        {
                            this.swordSfx.play();
                        }
                    }
                });

            }
            else if (this.hitbox.length)
            {
                this.destroyHitbox();
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_REPEAT, () =>
        {
            if (this.isDead) return;

            const anim = this.anims.getName();

            if (anim === 'Bringer-of-Death_Spell')
            {
                const posX = this.scene.player.body.center.x;

                this.body.reset(posX - 22, this.xy.y);
            }
        });



        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            if (this.isDead) return;

            const anim = this.anims.getName();

            if (anim === 'Bringer-of-Death_Idle')
            {
                this.anims.play('Bringer-of-Death_Attack', true);

                return;
            }

            if (anim === 'Bringer-of-Death_Attack')
            {
                this.anims.play('Bringer-of-Death_Cast', true);

                return;
            }

            if (anim === 'Bringer-of-Death_Cast')
            {
                this.isSpelling = true;

                const posX = this.scene.player.body.center.x;

                this.body.reset(posX - 22, this.xy.y);

                this.anims.play('Bringer-of-Death_Spell', true);

                return;
            }

            if (anim === 'Bringer-of-Death_Spell')
            {
                this.body.reset(this.xy.x, this.xy.y);

                this.anims.play('Bringer-of-Death_Idle', true);

                return;
            }

            if (anim === 'Bringer-of-Death_Hurt')
            {
                this.anims.play('Bringer-of-Death_Cast', true);
            }
        });

        this.scene.time.addEvent({
            delay: 2000,
            callback: this.checkMusic,
            callbackScope: this,
        });
    }



    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.active && !this.isDead)
        {
            const { x, y } = this.scene.player.body.center;

            if (this.isSpelling)
            {
                if (this.body.offset.x === 100)
                {
                    this.body.offset.x = 0;
                }
            }
            else if (this.body.offset.x === 0)
            {
                this.body.offset.x = 100;
            }

            if (this.anims.getName() !== 'Bringer-of-Death_Spell')
            {
                this.body.center.x > x ? this.setFlipX(false) : this.setFlipX(true);
            }
        }
    }

    public startBattle ()
    {
        const text = [`There is nothing for you here...`];

        this.scene.setPause();

        this.scene.player.isPause = true;

        // @ts-ignore
        const ui = this.scene.children.getByName('bigDialogBox') || this.scene.add.rexNinePatch(WIDTH / 2, HEIGHT - HEIGHT / 8, WIDTH, HEIGHT / 4, 'framing', [7, undefined, 7], [7, undefined, 7], 0)
            .setOrigin(0.5, 0.5)
            .setName('bigDialogBox')
            .setDepth(DEPTH.UI_BACK)
            .setScrollFactor(0);
        ui.setActive(true)
            .setVisible(true);

        let index = 0;

        const msg = this.scene.children.getByName('npcText') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 32, HEIGHT - 48, FONTS.MINIMAL, text[index], FONTS_SIZES.MINIMAL, 1)
            .setOrigin(0, 0)
            .setLetterSpacing(1)
            .setAlpha(1)
            .setDepth(DEPTH.UI_TEXT)
            .setTintFill(COLORS.STEEL_GRAY)
            .setScrollFactor(0, 0);
        msg.setActive(true).setVisible(true);

        const dialog = this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (event.key === this.scene.player.keys.fire.originalEvent.key && index < text.length)
            {
                index += 1;

                msg.setText('');

                this.scene.time.addEvent({
                    delay: 150,
                    callback: () => msg.setText(text[index])
                });
            }

            if (event.key === this.scene.player.keys.fire.originalEvent.key && index === text.length)
            {
                msg.setActive(false).setVisible(false);

                ui.setActive(false).setVisible(false);

                this.scene.unPause();

                this.scene.time.addEvent({
                    delay: 150,
                    callback: () =>
                    {
                        this.scene.player.isPause = false;
                        dialog.removeAllListeners();

                        this.checkMusic();
                    }
                });

                this.scene.tweens.add({
                    targets: this,
                    delay: 1000,
                    duration: 300,
                    alpha: 1
                });
            }
        });
    }

    private checkMusic ()
    {
        if (!this.isBattleMusic && !this.isDead && this.isBossMusic)
        {
            if (!this.scene?.cameras.main.worldView.contains(this.body.center.x, this.body.center.y))
            {
                return;
            }

            if (Math.round(this.body.bottom) !== Math.round(this.scene.player.body.bottom))
            {
                return;
            }

            this.currentsong = this.scene.musicGroup.find(elm => elm.isPlaying) as Phaser.Sound.BaseSound;
            this.isBattleMusic = true;
            this.scene.stopMusic();
            this.scene.bossBattleMusic.play();

        }
    }

    public looseLife (damage: number, weaponType: EWeaponType): void
    {
        if (this.isHit || this.anims.getName() !== 'Bringer-of-Death_Idle')
        {
            return;
        }

        if (!this.isAttacking)
        {
            this.anims.play('Bringer-of-Death_Hurt');
        }
        else
        {
            this.setTintFill(0xDDDDDD);
        }

        this.isHit = true;

        try
        {
            this.scene.sound.play('skeletonHit');
        }
        catch (error)
        {
            console.log(error);
        }

        this.enemyState.life -= damage;

        this.scene.showEnemyDamage(this, damage);

        if (this.isAttacking === false && weaponType !== 'arrow')
        {
            this.isAttacking = true;
        }

        if (this.enemyState.life <= 0)
        {
            this.destroyHitbox();

            this.kill();

            return;
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
            delay: 820,
            callback: () =>
            {
                if (!this.active || this.isDead) return;

                this.isHit = false;
            }
        });
    }

    public kill (): void
    {
        if (this.isDead) return;

        this.isDead = true;

        this.body.stop().setEnable(false);

        this.clearTint();

        this.playSfxDeath();

        this.destroyHitbox();

        this.scene.player.addXp(this.xp);

        const { x, y } = this.body.center;

        SaveLoadService.setEnemiesDeathCount();

        this.anims.play('Bringer-of-Death_Death', true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            this.burn();

            this.giveLife(x, y);

            if (this.isBossMusic)
            {
                this.scene.stopMusic();

                this.currentsong.play();
            }

            this.scene.tweens.add({
                duration: 1000,
                targets: this,
                alpha: 0,
                onComplete: () =>
                {
                    const props = SWORDS.filter(e => e.id === 8)[0];

                    const hammerSword = this.scene.player.swordManager.getSwords().filter(e => e.id === 8);

                    if (hammerSword.length === 0)
                    {
                        const sword = new PowerUp(this.scene, this.body.center.x as unknown as number, this.body.center.y as unknown as number, {
                            key: 'stuff',
                            id: 8,
                            properties: props,
                            category: 'sword'
                        });

                        sword.setAlpha(0);

                        this.scene.tweens.add({
                            targets: sword,
                            duration: 1000,
                            alpha: 1,
                            onComplete: () =>
                            {
                                this.scene.powerUpGroup.push(sword);

                                this.scene.time.addEvent({
                                    delay: 2000,
                                    callback: () =>
                                    {
                                        const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getForegroundLayers(this.scene).find(l => l.name === 'foreground/secret') as Phaser.Tilemaps.TilemapLayer;
                                        layer.setAlpha(0);

                                        this.unlockDoors();

                                        this.destroy();
                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        this.scene.time.addEvent({
                            delay: 2000,
                            callback: () =>
                            {
                                const layer: Phaser.Tilemaps.TilemapLayer = LayerService.getForegroundLayers(this.scene).find(l => l.name === 'foreground/secret') as Phaser.Tilemaps.TilemapLayer;
                                layer.setAlpha(0);

                                this.unlockDoors();

                                this.destroy();
                            }
                        });
                    }
                }
            });
        });
    }

    private destroyHitbox (): void
    {
        this.hitbox?.forEach(h =>
        {
            h.explode();
            h.setActive(false).setVisible(false);
            h.body.setEnable(false);
        });
    }

    public blockDoors ()
    {
        this.scene.battleWithBoss = true;
    }

    public unlockDoors ()
    {
        this.scene.battleWithBoss = false;
    }
}
