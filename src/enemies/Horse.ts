import { COLORS } from '../constant/colors';
import { EWeaponType, FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import Arrow from '../player/items/Arrow';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';
import { THitboxData } from '../types/types';
import BodyExtended from './BodyExtended';
import Enemy from './Enemy';

export default class Horse extends Enemy
{
    public enemyState: { life: number; damage: number; giveLife: number; };
    private attackSfx: Phaser.Sound.BaseSound;
    private hitboxData: THitboxData;
    public hitbox: BodyExtended[] = [];
    private walkk: Phaser.Sound.BaseSound;
    constructor (scene: GameScene, x: number, y: number, config: any)
    {
        super(scene, x, y, config);

        this.enemyState = {
            life: config.life,
            damage: config.damage,
            giveLife:  Math.round(config.life / 3)
        };

        this.body
            .setAllowGravity()
            .setGravityY(500)
            .setSize(48, 35)
            .setOffset(33, 60);

        // this.hitboxData = JSON.parse('{"horse-galloping_0":{"hitboxes":[{"frame":"horse-galloping_0","type":"rectangle","x":19,"y":42,"width":33,"height":9}]},"horse-galloping_1":{"hitboxes":[{"frame":"horse-galloping_1","type":"rectangle","x":19,"y":39,"width":34,"height":11}]},"horse-galloping_2":{"hitboxes":[{"frame":"horse-galloping_2","type":"rectangle","x":19,"y":47,"width":34,"height":10}]},"horse-galloping_3":{"hitboxes":[{"frame":"horse-galloping_3","type":"rectangle","x":19,"y":50,"width":33,"height":10}]}}');
        this.hitboxData = JSON.parse('{"horse-galloping_0":{"hitboxes":[{"frame":"horse-galloping_0","type":"circle","x":25,"y":28,"width":29,"height":29},{"frame":"horse-galloping_0","type":"rectangle","x":34,"y":56,"width":49,"height":35}]},"horse-galloping_1":{"hitboxes":[{"frame":"horse-galloping_1","type":"circle","x":24,"y":27,"width":30,"height":30},{"frame":"horse-galloping_1","type":"rectangle","x":27,"y":58,"width":74,"height":34}]},"horse-galloping_2":{"hitboxes":[{"frame":"horse-galloping_2","type":"circle","x":24,"y":36,"width":27,"height":27},{"frame":"horse-galloping_2","type":"rectangle","x":32,"y":56,"width":69,"height":39}]},"horse-galloping_3":{"hitboxes":[{"frame":"horse-galloping_3","type":"circle","x":23,"y":39,"width":29,"height":29},{"frame":"horse-galloping_3","type":"rectangle","x":31,"y":51,"width":62,"height":45}]}}');

        this.flipX = true;

        this.speed = 130;

        this.anims.play('horse-galloping', true);

        this.body.setVelocityX(this.speed);

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () =>
        {
            const frame = this.anims.getFrameName();

            if (this.hitboxData.hasOwnProperty(frame) && !this.isDead)
            {
                const data = this.hitboxData[frame].hitboxes;

                data.forEach(element =>
                {
                    const hitbox: BodyExtended = this.scene.bodyExtended.getFirst(false, true, element.x, element.y, 'fireBall', undefined, true);

                    if (hitbox)
                    {
                        hitbox.setActive(true).setVisible(true).setSize(element.width, element.height).setOrigin(0, 0).setName('fireball').setAlpha(0);
                        // hitbox.enemyState = { damage: 10 };
                        hitbox.parent = this;

                        if (element.type === 'rectangle')
                        {
                            hitbox.body.setSize(element.width, element.height).setEnable(true);
                        }

                        if (element.type === 'circle')
                        {
                            hitbox.body.setCircle(element.width / 2).setEnable(true);
                        }

                        if (this.flipX)
                        {
                            hitbox.body.reset(this.getTopRight().x - element.x - element.width, this.getTopRight().y + element.y);
                        }
                        else
                        {
                            hitbox.body.reset(this.getTopLeft().x + element.x, this.getTopRight().y + element.y);
                        }

                        this.scene.bodiesGroup.push(hitbox);
                        this.hitbox.push(hitbox);
                    }
                });

            }
            if (this.hitbox.length >= 4)
            {
                let oldHitbox = this.hitbox[0];
                oldHitbox.kill();
                oldHitbox.setActive(false);
                oldHitbox.body.setEnable(false);
                this.hitbox.shift();
                oldHitbox = this.hitbox[0];
                oldHitbox.kill();
                oldHitbox.setActive(false);
                oldHitbox.body.setEnable(false);
                this.hitbox.shift();

                // this.destroyHitbox();
            }
        });
    }


    public preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);
        if (this.active && !this.isDead)
        {
            const { velocity } = this.body;

            // turn back if blocked
            if (this.body.blocked.left)
            {
                this.body.setVelocityX(this.speed);
            }
            if (this.body.blocked.right)
            {
                this.body.setVelocityX(-this.speed);
            }

            // flip the sprite
            if (velocity.x >= 0)
            {
                this.setFlipX(true);
                this.body.setOffset(63, 60);
            }
            else
            {
                this.setFlipX(false);
                this.body.setOffset(33, 60);
            }
        }
    }

    public playAttackSfx ()
    {
        if (this.isAttacking)
        {
            return;
        }
        this.isAttacking = true;
        this.attackSfx.play();
    }

    public playSfxDeath ()
    {
        this.scene.sound.play('hellhoundDeath', { volume: 1, rate: 0.3 });
    }

    public looseLife (damage: number, weaponType: EWeaponType, weapon?: Arrow): void
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

        const specialDamage = weaponType === 'sword' ? damage * 2 : damage;

        this.enemyState.life -= specialDamage;

        this.scene.showEnemyDamage(this, specialDamage);

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
        if (this.isDead) return;

        this.isDead = true;
        this.destroyHitbox();
        this.clearTint();
        this.playSfxDeath();
        this.body.stop().setEnable(false);
        this.anims.pause();

        const explodeTimer = this.scene.time.addEvent({
            delay: 100,
            repeat: 20,
            callback: () =>
            {
                if (!this.active)
                {
                    return;
                }
                const X = Phaser.Math.Between(this.body.x - 8, this.body.x + this.body.width + 8);
                const Y = Phaser.Math.Between(this.body.y - 8, this.body.y + this.body.height + 8);

                this.scene.enemyExplode(X, Y);

                this.setAlpha(1 - explodeTimer.getOverallProgress());

                if (explodeTimer.getOverallProgress() === 1)
                {
                    this.burn();

                    this.scene.player.addXp(this.xp);

                    const { x, y } = this.body.center;

                    this.giveLife(x, y);

                    SaveLoadService.setEnemiesDeathCount();

                    this.destroy();
                }
            },
        });
    }

    private destroyHitbox (): void
    {
        this.hitbox?.forEach(h =>
        {
            h.kill();
            h.setActive(false);
            h.body.setEnable(false);
        });
    }
}
