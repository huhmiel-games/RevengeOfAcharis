import BodyExtended from '../enemies/BodyExtended';
import BringerOfDeath from '../enemies/BringerOfDeath';
import DragonHead from '../enemies/DragonHead';
import Enemy from '../enemies/Enemy';
import EvilWizard from '../enemies/EvilWizard';
import Projectile from '../enemies/Projectile';
import Skeleton from '../enemies/Skeleton';
import Worm from '../enemies/Worm';
import Arrow from '../player/Arrow';
import Player from '../player/Player';
import PowerUp from '../player/powerUp';
import GameScene from '../scenes/GameScene';
import CrumbleService from './CrumbleService';
import DoorService from './DoorService';
import LayerService from './LayerService';

/**
 * @description Collider service
 * @class
 */
export default class ColliderService
{
    /**
     * @description Add the Colliders
     * @static
     */
    public static addColliders (scene: GameScene)
    {
        scene.colliderLayer.setCollisionByProperty({ collides: true });

        // Players collides with environment
        scene.physics.add.collider(scene.player, scene.colliderLayer,
            undefined,
            (_player, _tile) =>
            {
                // Convert types
                const tile = _tile as unknown as Phaser.Tilemaps.Tile;
                const player = _player as unknown as Player;

                if (!tile || !tile.tilemapLayer)
                {
                    return false;
                }

                // if player is on spikes
                if (tile.properties.spikeBlock && !player.isOnSpike)
                {
                    player.onSpikes(10);
                }

                // if player is on crumble tile
                if (tile.properties.crumbleBlock && tile.visible === true)
                {
                    CrumbleService.handleCrumbleTile(scene, tile);
                }

                // if player overlap with secret tile
                if (tile.properties.hiddenBlock)
                {
                    LayerService.showSecretPath(scene);
                }

                // if player overlap with saveBlock tile
                if (tile.properties.saveBlock && !player.isPause)
                {
                    scene.askForGameSave(player, tile);
                }

                // if player collide with door tile
                if (tile.properties.doorBlock && !scene.isChangingRoom && !scene.battleWithBoss)
                {
                    tile.setCollision(false);

                    const leftTile = scene.colliderLayer.getTileAt(tile.x - 1, tile.y);

                    if (leftTile && leftTile.properties.doorBlock)
                    {
                        leftTile.setCollision(false);
                    }

                    const rightTile = scene.colliderLayer.getTileAt(tile.x + 1, tile.y);

                    if (rightTile && rightTile.properties.doorBlock)
                    {
                        rightTile.setCollision(false);
                    }

                    scene.isChangingRoom = true;

                    DoorService.searchNextRoom(scene, tile);
                }

                return true;
            },
            scene
        );

        scene.physics.add.overlap(scene.player.sword, scene.colliderLayer, undefined, (_sword, _tile) =>
        {
            const tile = _tile as unknown as Phaser.Tilemaps.Tile;
            if (tile.properties.breakableBlock)
            {
                const sword = scene.player.swordManager.getCurrentSword();

                if (sword.id !== 8) return;

                if (tile.properties.hit === 3)
                {
                    scene.colliderLayer.removeTileAt(tile.x, tile.y);

                    LayerService.removeGroundTileAt(scene, tile);

                    return;
                }

                const smoke = scene.smokeGroup.getFirstDead(true, tile.getCenterX(), tile.getCenterY(), undefined, undefined, true);

                const impactFx = scene.sound.get('impact');

                if (smoke)
                {
                    smoke.setDepth(2000);
                    smoke.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => smoke.destroy());
                    smoke.anims.play('smoke1');

                    if (!tile.properties.hit)
                    {
                        tile.properties.hit = 1;
                    }
                    else
                    {
                        tile.properties.hit += 1;
                    }

                    if (!impactFx)
                    {
                        scene.sound.play('impact', { rate: 0.5 });

                        return;
                    }

                    if (!impactFx?.isPlaying)
                    {
                        impactFx.play({ rate: 0.5 });
                    }
                }
            }
        }, scene);

        scene.physics.add.collider(scene.platformGroup, scene.player, (platform) => scene.player.playerOnPlatform(platform), undefined, scene);
        scene.physics.add.collider(scene.platformSpikeGroup, scene.colliderLayer, undefined);
        // scene.physics.add.collider(scene.platformSpikeGroup, scene.player, (platform) => scene.playerIsHit(platform), undefined, scene);
        scene.physics.add.collider(scene.enemyGroup, scene.colliderLayer, undefined, (enemy, tile) =>
        {
            if (enemy.name !== 'demon' && enemy.name !== 'skullHeadDemon') return true;
        });

        scene.physics.add.collider(scene.enemyGroup, scene.enemyGroup, undefined, (enemyA, enemyB) =>
        {
            if (enemyA instanceof DragonHead && enemyB instanceof DragonHead) return true;

            return false;
        });

        scene.physics.add.overlap(scene.heartGroup, scene.player, elm => scene.player.getLife(elm), undefined, scene.player);

        scene.physics.add.overlap(scene.powerUpGroup, scene.player, elm => scene.getPowerUp(elm as PowerUp), undefined, scene);

        scene.physics.add.overlap(scene.player, scene.enemyGroup, (player, enemy) => scene.playerIsHit(enemy as Enemy), undefined, scene);
        scene.physics.add.overlap(scene.player, scene.projectileGroup, (player, projectile) => scene.playerIsHit(projectile as Projectile), undefined, scene);

        scene.physics.add.overlap(scene.player, scene.bodiesGroup, (player, _body) =>
        {
            const body = _body as BodyExtended;
            const enemy = body.parent;
            scene.playerIsHit(enemy as Enemy);
        }, undefined, scene);

        scene.physics.add.overlap([scene.player.swords, scene.player.arrows], scene.enemyGroup,
            (enemy, weapon) => scene.enemyIsHit(enemy, weapon),
            (enemy, weapon) =>
            {
                if (enemy instanceof EvilWizard && weapon.name === 'arrow')
                {
                    const e = enemy as unknown as EvilWizard;
                    e.dodge();

                    return false;
                }

                if (enemy instanceof Skeleton && weapon.name === 'arrow')
                {
                    const e = enemy as unknown as EvilWizard;

                    if (!e.visible) return false;
                }

                if (enemy instanceof Worm && weapon.name === 'arrow')
                {
                    const worm = enemy as unknown as Worm;

                    const arrow = weapon as unknown as Arrow;

                    if (!worm.flipX && arrow.body.velocity.x > 0)
                    {
                        const w = weapon as unknown as Arrow;

                        w.deflect();

                        return false;
                    }

                    if (worm.flipX && arrow.body.velocity.x < 0)
                    {
                        const w = weapon as unknown as Arrow;

                        w.deflect();

                        return false;
                    }
                }

                if (enemy.name === 'skullHeadDemon' && enemy.data.get('counterAttack') === false)
                {
                    if (weapon.name === 'arrow')
                    {
                        const w = weapon as unknown as Arrow;

                        w.deflect();

                        return false;
                    }
                    enemy.data.set('counterAttack', true);
                    // @ts-ignore
                    enemy.body.setVelocityX(-enemy.body.velocity.x);
                    // @ts-ignore
                    enemy.body.setVelocityY(-enemy.body.velocity.y);

                    return false;
                }

                return true;
            }, scene);

        scene.physics.add.overlap([scene.player.swords, scene.player.arrows], scene.bodiesGroup, (_body, _weapon) =>
        {
            const enemyBody = _body as BodyExtended;
            enemyBody.looseLife(_weapon);
        }, undefined, scene);

        scene.physics.add.collider([scene.player.swords, scene.player.arrows], scene.colliderLayer, undefined, undefined, scene);
    }
}