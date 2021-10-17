import GameScene from '../scenes/GameScene';

/**
 * Handle crumble tiles
 */
export default class CrumbleService
{
    public static handleCrumbleTile (scene, tile)
    {
        scene.time.addEvent({
            delay: 100,
            callback: () =>
            {
                const groundLayers = scene.map.layers.filter(layer => layer.name.startsWith('ground/'));

                groundLayers.forEach(layer =>
                {
                    const topTile = layer.tilemapLayer.getTileAt(tile.x, tile.y - 1);

                    const crumbleTile = layer.tilemapLayer.getTileAt(tile.x, tile.y);

                    topTile.setVisible(false);

                    crumbleTile.setVisible(false);
                });

                scene.colliderLayer.setCollision(tile.index, false);

                this.resetCrumbleTiles(scene, tile);
            },
        });
    }

    public static resetCrumbleTiles (scene, tile)
    {
        scene.time.addEvent({
            delay: 500,
            callback: () =>
            {
                const groundLayers = scene.map.layers.filter(layer => layer.name.startsWith('ground/'));

                groundLayers.forEach(layer =>
                {
                    const topTile = layer.tilemapLayer.getTileAt(tile.x, tile.y - 1);

                    const crumbleTile = layer.tilemapLayer.getTileAt(tile.x, tile.y);

                    topTile.setVisible(true);

                    crumbleTile.setVisible(true);
                });

                scene.colliderLayer.setCollision(tile.index, true);
            },
        });
    }
}