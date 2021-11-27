import Door from '../props/Door';

import { TILE_SIZE } from '../constant/config';



export default class DoorService
{
    /**
     * Search the doors in the current room map
     */
    public static searchDoorsInRoomMap (scene)
    {

        scene.colliderLayer.layer.data.forEach(tileArray =>
        {
            tileArray.forEach(tile =>
            {
                switch (true)
                {
                    case (tile.properties.blueDoorBlock):
                        this.addDoor(scene, tile, 'blueDoor', 'gun');
                        break;

                    case (tile.properties.greenDoorBlock):
                        this.addDoor(scene, tile, 'greenDoor', 'missileLauncher');
                        break;

                    default:
                        break;
                }
            });
        });
    }

    /**
     * Add the doors to the current room
     */
    public static addDoor (scene, tile, key, openWith)
    {
        const door = new Door(scene, tile.pixelX + 4, tile.pixelY + 4, {
            key,
            openWith,
            hidden: tile.properties.hidden,
            rotation: tile.rotation
        });

        scene.doorGroup.push(door);
    }

    public static searchNextRoom (scene, tile)
    {
        // import of the planet.json file
        const world = scene.cache.json.get('world');

        // get the current room
        const currentRoom = world.maps.filter(room => room.fileName === scene.playerPosition)[0];

        // create an empty nextRoom object
        const nextRoom = {
            name: '',
            side: '',
            door: {
                x: 0,
                y: 0,
            }
        };

        // create an empty current door
        let currentDoor = { x: 0, y: 0 };

        // detect the current door
        currentRoom.doors.forEach((door, i) =>
        {
            const localdoorX = door.x - currentRoom.x;
            const localdoorY = door.y - currentRoom.y;

            if (tile.pixelX === localdoorX && tile.pixelY === localdoorY)
            {
                currentDoor = door;

                const doorName = `${currentRoom.fileName}_door${i}`;

                // if (!scene.player.inventory.openedDoors.includes(doorName))
                // {
                //     scene.player.inventory.openedDoors.push(doorName);
                // }
            }
        });

        // search the next map
        world.maps.forEach((room) =>
        {
            if (room.fileName === 'map0' || room.fileName === currentRoom.fileName)
            {
                return;
            }

            room.doors.forEach(door =>
            {
                // check lateral doors
                if (Math.abs(door.x > currentDoor.x ? door.x - currentDoor.x : currentDoor.x - door.x) === TILE_SIZE
                    && door.y === currentDoor.y
                )
                {
                    // calculate the local door position
                    nextRoom.door.x = door.x - room.x;
                    nextRoom.door.y = door.y - room.y;
                    nextRoom.name = room.fileName;
                    nextRoom.side = tile.pixelX + TILE_SIZE === tile.tilemapLayer.width ? 'right' : 'left';
                }

                // check vertical doors
                if (Math.abs(door.y > currentDoor.y ? door.y - currentDoor.y : currentDoor.y - door.y) === TILE_SIZE
                    && door.x === currentDoor.x
                )
                {
                    // calculate the local door position
                    nextRoom.door.x = door.x - room.x;
                    nextRoom.door.y = door.y - room.y;
                    nextRoom.name = room.fileName;
                    nextRoom.side = tile.pixelY + TILE_SIZE === tile.tilemapLayer.height ? 'bottom' : 'top';
                }
            });
        });


        if (nextRoom.name)
        {
            scene.changeRoom(scene.player, nextRoom);
        }
        else
        {
            console.warn('no room found...');
            scene.isChangingRoom = false;
        }
    }

    public static lockDoors (scene)
    {
        scene.doorGroup.forEach((door) =>
        {
            door.lockDoor();
        });
    }

    public static unlockDoors (scene)
    {
        scene.doorGroup.forEach((door) =>
        {
            door.unlockDoor();
        });
    }
}