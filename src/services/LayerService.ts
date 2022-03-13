import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';

const tilesetsNames = [
    'tileground',
    'tilesetSwamp',
    'tileset-graveyard',
    'tileset-town',
    'tileset-church',
    'old-dark-castle-interior-tileset',
    'gothic-castle-background-tileset',
    'gothic-castle-tileset',
    'Castle-Assets',
    'castle-a',
    'castle-b',
    'castle-c',
    'decorative',
    'castle-back',
    'castle-back-b',
    'castle-back2',
    'animated',
    'cave',
    'cave2',
    'cave-back',
    'wood-tileset'
];


/**
 * Handle tiled Layers
 */
export default class LayerService
{

    /**
     * Return the layer object
     */
    public static checkObjectsLayerIndex (scene: GameScene, layerName: string)
    {
        const arr = scene.map.objects.filter((elm) => elm.name === layerName);

        if (!arr || !arr.length)
        {
            return null;
        }

        return arr[0];
    }

    /**
     * Return true or false
     */
    public static checkIfLayerExists (scene: GameScene, layerName: string)
    {
        const arr = scene.map.layers.filter((elm) => elm.name === layerName);
        if (!arr.length)
        {
            return false;
        }

        return true;
    }

    /**
     * Add the layers
     */
    public static addLayers (scene: GameScene)
    {
        // layer that only handle collisions
        scene.colliderLayer = scene.map.createLayer('collider', 'colliderTileset', 0, 0)
            .setAlpha(0);
        
        // clean up active point lights
        scene.lightTorchesGroup.children.getArray().forEach(e =>
        {
            const torch = e as Phaser.GameObjects.PointLight;
            torch.setActive(false).setVisible(false);
        });

        scene.lightCandlesGroup.children.getArray().forEach(e =>
        {
            const candle = e as Phaser.GameObjects.PointLight;
            candle.setActive(false).setVisible(false);
        });
        
        // add point lights
        const torchArray = scene.checkObjectsLayerIndex('torch');

        torchArray?.objects.forEach((element) =>
        {
            const torch = scene.lightTorchesGroup.get(element.x as number, element.y as number) as Phaser.GameObjects.PointLight;
            torch.attenuation = 0.125;
            torch.radius = 64;
            torch.intensity = 0.05;

            const color = Phaser.Display.Color.ColorToRGBA(0xd9a066);

            torch.color.setTo(color.r, color.g, color.b, color.a);
            torch.setActive(true).setVisible(true).setDepth(DEPTH.GROUND_LAYER - 1).setName('torch');
        });

        scene.add.tween({
            targets: scene.children.list.filter(e => e.name === 'torch'),
            duration: 250,
            attenuation: { from: 0.120, to: 0.125},
            repeat: -1
        });

        const candleArray = scene.checkObjectsLayerIndex('candle');

        candleArray?.objects.forEach((element) =>
        {
            const candle = scene.lightCandlesGroup.get(element.x as number, element.y as number) as Phaser.GameObjects.PointLight;
            candle.attenuation = 0.125;
            candle.radius = 24;
            candle.intensity = 0.05;

            const color = Phaser.Display.Color.ColorToRGBA(0xd9a066);

            candle.color.setTo(color.r, color.g, color.b, color.a);
            candle.setActive(true).setVisible(true).setDepth(DEPTH.GROUND_LAYER + 1).setName('candle'); // 
        });

        scene.add.tween({
            targets: scene.children.list.filter(e => e.name === 'candle'),
            duration: 150,
            attenuation: { from: 0.120, to: 0.125},
            repeat: -1
        });

        // Background layers
        const backgroundLayers = scene.map.layers.filter(layer => layer.name.startsWith('background/'));
        backgroundLayers.forEach(layer =>
        {
            const layerElement = scene.map.createLayer(layer.name, tilesetsNames, 0, 0).setDepth(DEPTH.BACKGROUND_LAYER);
            // get the name of the layer
            const layerName = layer.name.split('/')[1];

            if (layerName === 'noscroll')
            {
                layerElement.setScrollFactor(0, 0);
            }

            layerElement.setName(layerName);
        });

        // Middle layers
        const groundLayers = scene.map.layers.filter(layer => layer.name.startsWith('ground/'));
        groundLayers.forEach(layer =>
        {
            const layerElement = scene.map.createLayer(layer.name, tilesetsNames, 0, 0).setDepth(DEPTH.GROUND_LAYER);
            layerElement.setName(layer.name);
        });

        const foregroundLayers = scene.map.layers.filter(layer => layer.name.startsWith('foreground/'));
        foregroundLayers.forEach(layer =>
        {
            const layerElement = scene.map.createLayer(layer.name, tilesetsNames, 0, 0).setDepth(DEPTH.FRONT_LAYER);
            layerElement.setName(layer.name);
        });

        scene.children.list.forEach(e =>
        {
            if (e.name === 'to-remove-net-room')
            {
                const image = e as unknown as Phaser.GameObjects.Image;
                image.setVisible(false);
            }
        });


        scene.map.images.forEach(e =>
        {
            try
            {
                const properties = scene.convertTiledObjectProperties(e.properties);

                // @ts-ignore
                const { scrollFactorX, scrollFactorY } = properties;

                scene.add.image(e.x, e.y, e.name).setOrigin(0, 0)
                    .setPosition(e.x, e.y)
                    .setScrollFactor(scrollFactorX, scrollFactorY)
                    .setDepth(0)
                    .setName('to-remove-net-room');
            }
            catch (error)
            {
                console.log(error);
            }
        });
    }

    /**
     * Reveals the secret path
     * @param scene 
     */
    public static showSecretPath (scene: GameScene)
    {
        const secretLayerData = scene.map.layers.find(layer => layer.name.startsWith('foreground/secret')) as Phaser.Tilemaps.LayerData;
        const secretLayer = secretLayerData.tilemapLayer;

        if (secretLayer.alpha === 0)
        {
            return;
        }

        scene.tweens.add({
            targets: secretLayer,
            duration: 150,
            alpha: 0
        });
    }

    public static removeLayers (scene: GameScene)
    {
        scene.map.layers.forEach(layer =>
        {
            if (layer.name !== 'collider')
            {
                scene.map.removeLayer(layer.name);
            }

        });
    }

    public static getGroundLayers (scene: GameScene): Phaser.Tilemaps.TilemapLayer[]
    {
        return scene.children.list.filter(layer => layer.name.startsWith('ground')) as Phaser.Tilemaps.TilemapLayer[];
    }

    public static getForegroundLayers (scene: GameScene): Phaser.Tilemaps.TilemapLayer[]
    {
        return scene.children.list.filter(layer => layer.name.startsWith('foreground')) as Phaser.Tilemaps.TilemapLayer[];
    }

    public static getBackgroundLayers (scene: GameScene): Phaser.Tilemaps.TilemapLayer[]
    {
        return scene.children.list.filter(layer => layer.name.startsWith('background')) as Phaser.Tilemaps.TilemapLayer[];
    }

    public static removeForegroundTileAt (scene: GameScene, tile: Phaser.Tilemaps.Tile): boolean
    {
        let result = false;
        // remove foreground tiles
        this.getForegroundLayers(scene).forEach(layer =>
        {
            if (layer.name === 'foreground/water')
            {
                return; // don't remove water tiles
            }

            const isTileExplode = layer.getTileAt(tile.x, tile.y);

            if (isTileExplode && isTileExplode.index !== -1)
            {
                result = true;

                layer.removeTileAt(tile.x, tile.y);
            }
        });

        return result;
    }

    public static removeGroundTileAt (scene: GameScene, tile: Phaser.Tilemaps.Tile): void
    {
        this.getGroundLayers(scene).forEach(layer =>
        {
            if (layer.name === 'ground/ground')
            {
                return; // don't remove ground tiles
            }

            layer.removeTileAt(tile.x, tile.y);
        });
    }

    public static addImageFromTile (scene: GameScene, layer: Phaser.Tilemaps.TilemapLayer, tile: Phaser.Tilemaps.Tile)
    {
        const currentTile = layer.getTileAt(tile.x, tile.y);

        if (currentTile)
        {
            const data = currentTile.tileset.getTileTextureCoordinates(currentTile.index) as { x: number, y: number };
            const { columns } = currentTile.tileset;
            const frame = data.x / 8 * data.y / 8 * columns + 1;
            scene.add.image(tile.pixelX, tile.pixelY, currentTile.tileset.name, frame).setDepth(3000);
        }
    }
}