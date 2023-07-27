import { TILE_SIZE } from '../constant/config';
import GameScene from '../scenes/GameScene';
import { TDoor } from '../types/types';

/**
 * @description
 * @author © Philippe Pereira 2022
 * @export
 * @class DoorService
 */
export default class DoorService
{
    public static searchNextRoom (scene: GameScene, tile: Phaser.Tilemaps.Tile)
    {
        // import of the planet.json file
        const world = scene.cache.json.get('world');

        // get the current room
        const currentRoom = world.maps.find(room => room.fileName === scene.playerRoomName);

        // create an empty nextRoom object
        const nextRoom: TDoor = {
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
        currentRoom.doors.forEach((door: { x: number; y: number; }, i: number) =>
        {
            const localdoorX = door.x - currentRoom.x;
            const localdoorY = door.y - currentRoom.y;

            if (tile.pixelX === localdoorX && tile.pixelY === localdoorY)
            {
                currentDoor = door;

                const doorName = `${currentRoom.fileName}_door${i}`;
            }
        });

        // search the next map
        world.maps.forEach((room: { fileName: string; doors: any[]; x: number; y: number; }) =>
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
}
