import Enemy from '../enemies/Enemy';
import Projectile from '../enemies/Projectile';
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
                if (tile.properties.saveBlock)
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

        scene.physics.add.collider(scene.platformGroup, scene.player, (platform) => scene.player.playerOnPlatform(platform), undefined, scene);
        scene.physics.add.collider(scene.platformSpikeGroup, scene.colliderLayer, undefined);
        // scene.physics.add.collider(scene.platformSpikeGroup, scene.player, (platform) => scene.playerIsHit(platform), undefined, scene);
        scene.physics.add.collider(scene.enemyGroup, scene.colliderLayer, undefined, (enemy, tile) =>
        {
            if (enemy.name !== 'demon') return true;
        });

        scene.physics.add.overlap(scene.giveLifeGroup, scene.player, elm => scene.player.getLife(elm), undefined, scene.player);

        scene.physics.add.overlap(scene.powerups, scene.player, elm => scene.getPowerUp(elm as PowerUp), undefined, scene);

        scene.physics.add.overlap(scene.player, scene.enemyGroup, (player, enemy) => scene.playerIsHit(enemy as Enemy), undefined, scene);
        scene.physics.add.overlap(scene.player, scene.projectileGroup, (player, projectile) => scene.playerIsHit(projectile as Projectile), undefined, scene);
        scene.physics.add.overlap([scene.player.swords, scene.player.arrows], scene.enemyGroup, (weapon, enemy) => scene.enemyIsHit(weapon, enemy), undefined, scene);
        scene.physics.add.collider([scene.player.swords, scene.player.arrows], scene.colliderLayer, undefined, undefined, scene);
    }
}