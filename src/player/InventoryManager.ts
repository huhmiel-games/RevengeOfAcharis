import { COLORS } from '../constant/colors';
import { WIDTH, FONTS, FONTS_SIZES } from '../constant/config';
import GameScene from '../scenes/GameScene';
import { TInventory } from '../types/types';
import Bow from './Bow';
import Player from './Player';
import Shield from './Shield';
import Sword from './Sword';

export default class InventoryManager
{
    public inventory: TInventory;

    public scene: GameScene;

    public player: Player;

    constructor (scene: GameScene, player: Player)
    {
        this.scene = scene;
        this.player = player;
    }

    public initInventory (data: TInventory)
    {
        this.inventory = data;
    }

    public setDefaultInventory (): void
    {
        this.inventory = {
            xp: 0,
            level: 1,
            maxLife: 33,
            life: 33,
            def: 0,
            savedPositionX: 80,
            savedPositionY: 135,
            map: 'map2',
            jumpBoots: false,
            jumpBootsValue: 0,
            selectableWeapon: ['sword'],
            swords: [0],
            selectedSword: 0,
            bows: [],
            selectedBow: null,
            shields: [],
            selectedShield: null,
            shieldDef: 0,
            fireRate: 420,
            powerUp: [],
        };
    }

    public getInventory (): TInventory
    {
        return this.inventory;
    }

    public showInventory ()
    {
        if (this.player.isPause || this.scene.isCheckSaving || this.scene.isSaving)
        {
            return;
        }

        this.player.isPause = true;

        const origin = {
            x: this.scene.backUi.getTopLeft().x + 32,
            y: this.scene.backUi.getTopLeft().y + 30,
            center: this.scene.backUi.getCenter(),
            right: this.scene.backUi.getTopRight().x,
            bottom: this.scene.backUi.getBottomRight().y
        };

        this.scene.setPause();
        this.scene.backUi.setVisible(true);

        const GRID = this.scene.add.image(origin.x - 17, origin.y - 17, 'inventory-grid').setDepth(1999).setScrollFactor(0, 0).setOrigin(0, 0);

        let items: (Sword | Bow | Shield)[] = [];
        items = [...items,
            this.player.swordManager.getSwords(),
            this.player.shieldManager.getShields(),
            this.player.bowManager.getBows()
        ].flat();

        const selectableItemsToDisplay: Phaser.GameObjects.Image[] = [];
        const fixedItemsToDisplay: Phaser.GameObjects.Image[] = [];

        items.forEach(item =>
        {
            const img = this.scene.add.image(-100, -100, 'stuff', item.key)
                .setDepth(2000)
                .setScrollFactor(0, 0)
                .setDataEnabled()
                .setData('id', item.id);

            selectableItemsToDisplay.push(img);
        });

        for (let i = 20; i < 24; i++)
        {
            if (this.inventory.powerUp.includes(i))
            {
                const img = this.scene.add.image(-100, -100, 'stuff', i).setDepth(2000).setScrollFactor(0, 0);
                fixedItemsToDisplay.push(img);
            }
            
        }

        Phaser.Actions.GridAlign(selectableItemsToDisplay, {
            width: 5,
            height: 3,
            cellWidth: 32,
            cellHeight: 32,
            x: origin.x,
            y: origin.y
        });

        const selector = this.scene.add.image(origin.x, origin.y, 'framing32')
            .setDepth(2010)
            .setScrollFactor(0, 0);

        const currentSwordId = this.player.swordManager.getCurrentSword().id;

        const selectedItem = selectableItemsToDisplay.filter(e => e.data.get('id') === currentSwordId)[0];

        selector.setPosition(selectedItem.x, selectedItem.y);

        Phaser.Actions.GridAlign(fixedItemsToDisplay, {
            width: 5,
            height: 1,
            cellWidth: 32,
            cellHeight: 32,
            x: origin.x,
            y: origin.y + 160
        });

        const LVL = this.scene.add.bitmapText(WIDTH / 8 * 4, origin.center.y - 86, FONTS.ULTIMA_BOLD, `LEVEL: ${this.inventory.level}`, FONTS_SIZES.ULTIMA_BOLD)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setLetterSpacing(2).setTintFill(COLORS.STEEL_GRAY);

        const nextLevelXp = Math.floor(0.8 * Math.pow(this.inventory.level, 2) + 1.8 * Math.pow(this.inventory.level, 3) + 3.3 * Math.pow(this.inventory.level, 2) + 0.6 * Math.pow(this.inventory.level - 1, 2) + 184.8 * this.inventory.level - 0.6);

        const XP = this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 68, FONTS.ULTIMA, `XP: ${Math.round(this.inventory.xp)}/${nextLevelXp}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.STEEL_GRAY);

        const HP = this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 50, FONTS.ULTIMA, `HP: ${this.inventory.life}/${this.inventory.maxLife}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.DARK_GREEN);

        const s = Math.ceil(Math.sqrt(Math.pow(this.inventory.level, 3)) / 10);

        const STR = this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 34, FONTS.ULTIMA, `STR: ${s}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.RED);

        const DEF = this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 18, FONTS.ULTIMA, `DEF: ${this.inventory.def}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.DARK_GREEN);

        const swordAttack = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 16, FONTS.ULTIMA, `Sword ATK: ${this.player.swordManager.getCurrentSword().damage}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.RED);

        const swordRate = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 32, FONTS.ULTIMA, `Sword RATE: ${Math.round(this.player.swordManager.getCurrentSword().rate)}`, FONTS_SIZES.ULTIMA)
            .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.EAST_BLUE);

        let bowAttack, bowRate, shieldDef;

        if (this.inventory.bows.length)
        {
            bowAttack = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 48, FONTS.ULTIMA, `Bow ATK: 5`, FONTS_SIZES.ULTIMA)
                .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.RED);

            bowRate = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 64, FONTS.ULTIMA, `Bow RATE: 300`, FONTS_SIZES.ULTIMA)
                .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.EAST_BLUE);
        }

        if (this.inventory.shields.length)
        {
            shieldDef = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 80, FONTS.ULTIMA, `Shield DEF: ${this.player.shieldManager.getCurrentShield()?.defense || 0}`, FONTS_SIZES.ULTIMA)
                .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.DARK_GREEN);
        }
        else
        {
            shieldDef = this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 80, FONTS.ULTIMA, `Shield DEF: no shield`, FONTS_SIZES.ULTIMA)
                .setOrigin(0, 0.5).setDepth(2000).setScrollFactor(0, 0).setTintFill(COLORS.DARK_GREEN);
        }

        const dialog = this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (event.key === this.player.keys.select.originalEvent.key && this.player.isPause)
            {
                this.scene.unPause();

                selectableItemsToDisplay.forEach(img => img.setVisible(false));

                fixedItemsToDisplay.forEach(img => img.setVisible(false));

                selector.destroy();
                LVL.destroy();
                XP.destroy();
                STR.destroy();
                HP.destroy();
                DEF.destroy();
                swordRate.destroy();
                swordAttack.destroy();
                bowAttack?.destroy();
                bowRate?.destroy();
                shieldDef?.destroy();
                GRID.destroy();
                this.scene.backUi.setVisible(false);

                this.scene.time.addEvent({
                    delay: 150,
                    callback: () =>
                    {
                        this.player.isPause = false;
                        dialog.removeAllListeners();
                    }
                });
            }

            if (event.keyCode === this.player.keys.left.keyCode && this.player.isPause && selector.x > origin.x)
            {
                selector.x -= 32;
            }

            if (event.keyCode === this.player.keys.right.keyCode && this.player.isPause && selector.x < origin.x + 4 * 32)
            {
                selector.x += 32;
            }

            if (event.keyCode === this.player.keys.up.keyCode && this.player.isPause && selector.y > origin.y)
            {
                selector.y -= 32;
            }

            if (event.keyCode === this.player.keys.down.keyCode && this.player.isPause && selector.y < origin.y + 3 * 30)
            {
                selector.y += 32;
            }

            // change the weapon
            if (event.keyCode === this.player.keys.fire.keyCode && this.player.isPause)
            {
                const choosedItem = selectableItemsToDisplay.filter(e => e.x === selector.x && e.y === selector.y)[0];

                if (choosedItem)
                {
                    const id = choosedItem.data.get('id');

                    if (id < 10)
                    {
                        this.player.swordManager.selectSword(id);

                        this.inventory.selectedSword = id;

                        swordAttack.setText(`Sword ATK: ${this.player.swordManager.getCurrentSword().damage.toString()}`);

                        swordRate.setText(`Sword RATE: ${(Math.round(this.player.swordManager.getCurrentSword().rate)).toString()}`);

                        return;
                    }

                    if (id < 15)
                    {
                        this.player.bowManager.selectBow(id);

                        this.inventory.selectedBow = id;

                        bowAttack.setText(`Bow ATK: ${this.player.bowManager.getCurrentBow().damage}`);

                        bowRate.setText(`Bow RATE: ${this.player.bowManager.getCurrentBow().rate}`);

                        return;
                    }

                    if (id < 20)
                    {
                        this.player.shieldManager.selectShield(id);

                        this.inventory.selectedShield = id;

                        shieldDef.setText(`Shield DEF: ${this.player.shieldManager.getCurrentShield().defense}`);
                    }
                }
            }
        });
    }
}
