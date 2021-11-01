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
    'decorative',
    'castle-back',
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
    public static checkObjectsLayerIndex (scene: GameScene, layerName)
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
    public static checkIfLayerExists (scene: GameScene, layerName)
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
            .setAlpha(0.2);
        
        scene.torchs.children.getArray().forEach(e =>
        {
            const torch = e as Phaser.GameObjects.PointLight;
            torch.setActive(false).setVisible(false);
        });

        scene.candles.children.getArray().forEach(e =>
        {
            const candle = e as Phaser.GameObjects.PointLight;
            candle.setActive(false).setVisible(false);
        });
        
        // add point lights
        const torchArray = scene.checkObjectsLayerIndex('torch');

        torchArray?.objects.forEach((element) =>
        {
            // element.properties = scene.convertTiledObjectProperties(element.properties);
            const torch = scene.torchs.get(element.x as number, element.y as number) as Phaser.GameObjects.PointLight;
            torch.attenuation = 0.125;
            torch.radius = 64;
            torch.intensity = 0.05;

            const color = Phaser.Display.Color.ColorToRGBA(0xd9a066);

            torch.color.setTo(color.r, color.g, color.b, color.a);
            torch.setActive(true).setVisible(true).setDepth(DEPTH.GROUND_LAYER - 1).setName('torch');

            
            // scene.add.pointlight(element.x as number, element.y as number, 0xd9a066, 48, 0.1, 0.125).setDepth(DEPTH.GROUND_LAYER).setName('torch');
        });

        scene.add.tween({
            targets: scene.children.list.filter(e => e.name === 'torch'),
            duration: 250,
            //intensity: { from: 0.03999, to: 0.051111 },
            //radius: { from: 47.5, to: 48.5 },
            attenuation: { from: 0.120, to: 0.125},
            repeat: -1
        });

        const candleArray = scene.checkObjectsLayerIndex('candle');

        candleArray?.objects.forEach((element) =>
        {
            // element.properties = scene.convertTiledObjectProperties(element.properties);
            const candle = scene.candles.get(element.x as number, element.y as number) as Phaser.GameObjects.PointLight;
            candle.attenuation = 0.125;
            candle.radius = 24;
            candle.intensity = 0.05;

            const color = Phaser.Display.Color.ColorToRGBA(0xd9a066);

            candle.color.setTo(color.r, color.g, color.b, color.a);
            candle.setActive(true).setVisible(true).setDepth(DEPTH.GROUND_LAYER + 1).setName('candle'); // 
            
            // scene.add.pointlight(element.x as number, element.y as number, 0xd9a066, 48, 0.1, 0.125).setDepth(DEPTH.GROUND_LAYER).setName('torch');
        });

        scene.add.tween({
            targets: scene.children.list.filter(e => e.name === 'candle'),
            duration: 150,
            // intensity: { from: 0.0799, to: 0.081111 },
            // radius: { from: 23.5, to: 24.5 },
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

            // const layerName = layer.name.split('/')[1];

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

        // // add invisible collide layer used on elevators rooms only (until now)
        // if (LayerService.checkIfLayerExists(scene, 'collideInvisible'))
        // {
        //     scene.collideInvisibleLayer = scene.map.createLayer('collideInvisible', scene.tileset, 0, 0) || null;
        //     // scene.collideInvisibleLayer.setDepth(DEPTH.INVISIBLE_COLLIDER_LAYER);
        // }

        // // add front mask for morphing sonar
        // if (scene.player.inventory.morphingSonar)
        // {
        //     scene.frontLayer.mask = new Phaser.Display.Masks.BitmapMask(scene, scene.mask);
        //     scene.frontLayer.mask.invertAlpha = true;

        //     if (scene.secretLayer && scene.map.properties.environment !== 'water')
        //     {
        //         // @ts-ignore
        //         scene.secretLayer.mask = new Phaser.Display.Masks.BitmapMask(scene, scene.mask);
        //         // @ts-ignore
        //         scene.secretLayer.mask.invertAlpha = true;
        //     }
        // }
    }

    /**
     * Reveals the secret path
     * @param scene 
     */
    public static showSecretPath (scene)
    {
        const secretLayer = scene.map.layers.filter(layer => layer.name.startsWith('foreground/secret'))[0].tilemapLayer;

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

    public static removeLayers (scene)
    {
        scene.map.layers.forEach(layer =>
        {
            if (layer.name !== 'collider')
            {
                scene.map.removeLayer(layer.name);
            }

        });
    }

    public static getGroundLayers (scene)
    {
        return scene.children.list.filter(layer => layer.name.startsWith('ground'));
    }

    public static getForegroundLayers (scene)
    {
        return scene.children.list.filter(layer => layer.name.startsWith('foreground'));
    }

    public static getBackgroundLayers (scene)
    {
        return scene.children.list.filter(layer => layer.name.startsWith('background'));
    }

    public static removeForegroundTileAt (scene, tile)
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

    public static removeGroundTileAt (scene, tile)
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

    public static addImageFromTile (scene, layer, tile)
    {
        const currentTile = layer.getTileAt(tile.x, tile.y);

        if (currentTile)
        {
            const data = currentTile.tileset.getTileTextureCoordinates(currentTile.index);
            const { columns } = currentTile.tileset;
            const frame = data.x / 8 * data.y / 8 * columns + 1;
            scene.add.image(tile.pixelX, tile.pixelY, currentTile.tileset.name, frame).setDepth(3000);
        }
    }
}