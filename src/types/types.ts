export type TPlayerState = {
    isDead: boolean;
    blockedDownTimestamp: number;
    speed: number;
    lastFired: number;
    swordAttackAnim?: number;
    selectedWeapon?: string;
    selectedSword?: number;
};

export type TKeys = {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    fire: Phaser.Input.Keyboard.Key;
    bow: Phaser.Input.Keyboard.Key;
    jump: Phaser.Input.Keyboard.Key;
    select: Phaser.Input.Keyboard.Key;
    pause: Phaser.Input.Keyboard.Key;
};

export type TInventory = {
    xp: number
    level: number
    maxLife: number
    life: number
    def: number
    savedPositionX: number
    savedPositionY: number
    map: string,
    jumpBoots: boolean
    jumpBootsValue: number
    selectableWeapon: string[]
    swords: number[]
    selectedSword: number
    bows: number[]
    selectedBow: number | null
    shields: number[]
    selectedShield: number | null
    shieldDef: number
    fireRate: number
    powerUp: number[]
    fireElement: boolean
    waterElement: boolean
};

export type TSwordConfig = {
    id: number;
    name: string;
    desc: string;
    damage: number;
    rate: number;
    key: number;
};

export type TBowConfig = {
    id: number;
    name: string;
    desc: string;
    damage: number;
    rate: number;
    speed: number;
    key: number;
};

export type TShieldConfig = {
    id: number;
    name: string;
    desc: string;
    defense: number;
    key: number;
};

export type TEquipmentConfig = {
    id: number;
    name: string;
    desc: string;
    defense: number;
    key: number;
};

export type THitboxData = {
    [key: string]: {
        hitboxes: [
            {
                frame: string,
                type: 'rectangle' | 'circle',
                x: number,
                y: number,
                width: number,
                height: number
            }
        ]
    };
};

export type TCoord = {
    x: number;
    y: number;
};

export type TDoor = {
    name: string;
    side: string;
    door: {
        x: number;
        y: number;
    }
};