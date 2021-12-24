import { GAMENAME } from '../constant/config';
import Player from '../player/Player';
import GameScene from '../scenes/GameScene';

/**
 * Save or Load from localStorage
 */
export default class SaveLoadService
{

    /**
     * Set a new game data on localstorage
     */
    public static saveNewGameData (data: any): void
    {
        try
        {
            if (!localStorage.getItem(`${GAMENAME}_playerDeathCount`))
            {
                localStorage.setItem(`${GAMENAME}_playerDeathCount`, JSON.stringify(0));
            }

            if (!localStorage.getItem(`${GAMENAME}_enemiesDeathCount`))
            {
                localStorage.setItem(`${GAMENAME}_enemiesDeathCount`, JSON.stringify(0));
            }

            if (!localStorage.getItem(`${GAMENAME}_bossDeath`))
            {
                localStorage.setItem(`${GAMENAME}_bossDeath`, JSON.stringify([]));
            }

            if (!localStorage.getItem(`${GAMENAME}_data`))
            {
                localStorage.setItem(`${GAMENAME}_data`, JSON.stringify(data));
            }

            if (!localStorage.getItem(`${GAMENAME}_time`))
            {
                localStorage.setItem(`${GAMENAME}_time`, JSON.stringify(0));
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }

    /**
     * Save the game data on localstorage
     */
    public static saveGameData (scene: GameScene): void
    {
        scene.player.inventoryManager.getInventory().savedPositionX = scene.player.x;
        scene.player.inventoryManager.getInventory().savedPositionY = scene.player.y;
        scene.player.inventoryManager.getInventory().map = scene.playerRoomName;

        const s = JSON.stringify(scene.player.inventoryManager.getInventory());

        localStorage.setItem(`${GAMENAME}_data`, s);

        localStorage.setItem(`${GAMENAME}_bossDeath`, JSON.stringify([]));
    }

    /**
     * Load the game data from localStorage
     */
    public static loadGameData ()
    {
        try
        {
            const storedGame: string | null = localStorage.getItem(`${GAMENAME}_data`);

            if (storedGame !== null)
            {
                return storedGame;
            }

            return null;

        }
        catch (error)
        {
            console.log(error);
        }
    }

    /**
     * Delete the saved game
     */
    public static deleteGameData (): void
    {
        localStorage.removeItem(`${GAMENAME}_data`);
        localStorage.removeItem(`${GAMENAME}_time`);
        localStorage.removeItem(`${GAMENAME}_playerDeathCount`);
        localStorage.removeItem(`${GAMENAME}_enemiesDeathCount`);
        localStorage.removeItem(`${GAMENAME}_bossDeath`);
    }

    /**
     * Return the saved game time to string
     */
    public static getSavedGameTimeToString ()
    {
        const storedTime = SaveLoadService.getSavedGameTime() / 1000;
        
        if (storedTime !== null)
        {
            const hours = Math.floor(storedTime / 3600);
            const minutes = Math.floor(storedTime / 60) % 60;
            const seconds = Math.floor(storedTime % 60);

            return [hours, minutes, seconds]
                .map(v => v < 10 ? '0' + v : v)
                .join(':');
        }
    }

    /**
     * Return the saved game time in seconds
     */
    public static getSavedGameTime ()
    {
        const s: string | null = localStorage.getItem(`${GAMENAME}_time`);

        if (s !== null)
        {
            return Number(s);
        }

        return 0;
    }

    /**
     * Save the total time on game
     * @param scene
     */
    public static setSavedGameTime (scene: GameScene): void
    {
        const timestampNow = new Date().getTime();

        const currentSessionTime: number = timestampNow - scene.firstTimestamp;

        const pastSessionTime: number = SaveLoadService.getSavedGameTime();

        localStorage.setItem(`${GAMENAME}_time`, JSON.stringify(pastSessionTime + currentSessionTime));

        SaveLoadService.resetSceneFirstTimeStamp(scene);
    }

    /**
     * Reset the scene timestamp
     * @param scene
     */
    public static resetSceneFirstTimeStamp (scene: GameScene): void
    {
        scene.firstTimestamp = new Date().getTime(); // new Date().valueOf() / 1000;
    }

    public static setDeadBoss (scene: GameScene, bossId: number): void
    {
        if (!localStorage.getItem(`${GAMENAME}_bossDeath`))
        {
            localStorage.setItem(`${GAMENAME}_bossDeath`, JSON.stringify([]));
        }

        const deadBosses = this.getDeadBoss(scene);

        if (deadBosses)
        {
            deadBosses.push(bossId);
            localStorage.setItem(`${GAMENAME}_bossDeath`, JSON.stringify(deadBosses));
        }
    }

    public static resetDeadBoss (): void
    {
        localStorage.removeItem(`${GAMENAME}_bossDeath`);
    }

    public static getDeadBoss (scene: GameScene): number[]
    {

        const deadBosses: string | null = localStorage.getItem(`${GAMENAME}_bossDeath`);

        if (deadBosses !== null)
        {
            return JSON.parse(deadBosses);
        }

        return [];
    }

    public static setPlayerDeathCount ()
    {
        let playerDeathCount = this.getPlayerDeathCount();

        playerDeathCount += 1;

        localStorage.setItem(`${GAMENAME}_playerDeathCount`, JSON.stringify(playerDeathCount));
    }

    public static getPlayerDeathCount (): number
    {

        const playerDeathCount: string | null = localStorage.getItem(`${GAMENAME}_playerDeathCount`);

        if (playerDeathCount !== null)
        {
            return JSON.parse(playerDeathCount);
        }

        return 0;
    }

    public static async setEnemiesDeathCount ()
    {
        let enemiesDeathCount = await this.getEnemiesDeathCount();

        enemiesDeathCount += 1;

        localStorage.setItem(`${GAMENAME}_enemiesDeathCount`, JSON.stringify(enemiesDeathCount));
    }

    public static async getEnemiesDeathCount (): Promise<number>
    {

        const enemiesDeathCount: string | null = localStorage.getItem(`${GAMENAME}_enemiesDeathCount`);

        if (enemiesDeathCount !== null)
        {
            return JSON.parse(enemiesDeathCount);
        }

        return 0;
    }
}