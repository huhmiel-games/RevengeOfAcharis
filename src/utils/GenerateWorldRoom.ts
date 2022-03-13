import GameScene from '../scenes/GameScene';

export default class GenerateWorldRoom
{
    public static generate (scene: GameScene)
    {
        // get the tiled world file
        const tiledWorld = scene.cache.json.get('mapWorld');

        // copy the tiled world file
        const tiledWorldWithDoors = { ...tiledWorld };

        // error handling
        let error = false;

        // add the doors
        tiledWorldWithDoors.maps.forEach(room =>
        {
            if (room.fileName === 'map0.json')
            {
                room.fileName = 'map0';

                // this rooms is never used ingame, and just indicates the x,y origin of the tiled world.
                // Must be placed in the top left world and created first in Tiled
                // so we always deal with positive numbers
                return;
            }

            room.doors = [];
            room.doorBlock = [];
            room.healthcare = [];
            room.save = [];
            room.powerUp = [];

            // get the name of the room
            const roomName = room.fileName.substring(0, room.fileName.length - 5);

            // change the room name
            room.fileName = roomName;

            // make the tilemap of this room
            const roomTilemap = scene.make.tilemap({ key: roomName, tileWidth: 8, tileHeight: 8 });

            // get the collider layer
            const collideLayer = roomTilemap.layers.find(layer => layer.name === 'collider') as Phaser.Tilemaps.LayerData;

            if (!collideLayer)
            {
                roomTilemap.destroy();

                error = true;

                return;
            }

            // search the door tiles
            collideLayer.data.forEach(e =>
            {
                e.forEach(tile =>
                {
                    if (tile.properties.doorBlock)
                    {
                        room.doors.push({ x: room.x + tile.pixelX, y: room.y + tile.pixelY });
                    }

                    if (tile.properties.healthCareBlock)
                    {
                        room.healthcare.push({ x: room.x + tile.pixelX, y: room.y + tile.pixelY });
                    }

                    if (tile.properties.saveBlock)
                    {
                        room.save.push({ x: room.x + tile.pixelX, y: room.y + tile.pixelY });
                    }

                    if (tile.properties.powerUpBlock)
                    {
                        room.powerUp.push({ x: room.x + tile.pixelX, y: room.y + tile.pixelY });
                    }
                });
            });

            roomTilemap.destroy();
        });

        if (error)
        {
            return;
        }

        const str = JSON.stringify(tiledWorldWithDoors);

        const world = scene.cache.json.get('world');

        const worldString = JSON.stringify(world);

        if (str !== worldString)
        {
            const blob = new Blob([str], { type: 'text/html' });
            window.open(URL.createObjectURL(blob));
        }
    }
}
