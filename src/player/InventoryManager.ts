import { COLORS } from '../constant/colors';
import { WIDTH, FONTS, FONTS_SIZES } from '../constant/config';
import DEPTH from '../constant/depth';
import GameScene from '../scenes/GameScene';
import { TInventory } from '../types/types';
import Bow from './Bow';
import Player from './Player';
import Shield from './Shield';
import Sword from './Sword';

export default class InventoryManager
{
    public scene: GameScene;
    public inventory: TInventory;
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

    public setDefaultInventory (): TInventory
    {
        this.inventory = {
            xp: 0,
            level: 1,
            maxLife: 33,
            life: 33,
            def: 0,
            savedPositionX: 16,
            savedPositionY: 225,
            map: 'map2',
            jumpBoots: false,
            jumpBootsValue: 0,
            selectableWeapon: ['sword'],
            swords: [0],
            selectedSword: 0,
            bows: [10],
            selectedBow: 10,
            shields: [15],
            selectedShield: 15,
            shieldDef: 4,
            fireRate: 420,
            powerUp: [],
            fireElement: false,
            waterElement: false
        };

        return this.inventory;
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

        this.scene.setPause(true, true, false);
        this.scene.backUi.setVisible(true);

        const GRID = this.scene.children.getByName('grid') as Phaser.GameObjects.Image || this.scene.add.image(origin.x - 17, origin.y - 17, 'inventory-grid')
            .setDepth(DEPTH.UI_BACK)
            .setName('grid')
            .setScrollFactor(0, 0)
            .setOrigin(0, 0);
        GRID.setActive(true)
            .setVisible(true);

        let items: (Sword | Bow | Shield)[] = [];
        items = [...items,
        this.player.swordManager.getSwords(),
        this.player.shieldManager.getShields(),
        this.player.bowManager.getBows()].flat();

        const selectableItemsToDisplay: Phaser.GameObjects.Image[] = [];
        const fixedItemsToDisplay: Phaser.GameObjects.Image[] = [];

        items.forEach(item =>
        {
            const img = this.scene.children.getByName('stuff' + item.id) as Phaser.GameObjects.Image || this.scene.add.image(-100, -100, 'stuff', item.key)
                .setDepth(DEPTH.UI_TEXT)
                .setScrollFactor(0, 0)
                .setName('stuff' + item.id)
                .setDataEnabled()
                .setData('id', item.id);
            img.setActive(true).setVisible(true);

            selectableItemsToDisplay.push(img);
        });

        for (let i = 20; i < 24; i++)
        {
            if (this.inventory.powerUp.includes(i))
            {
                const img = this.scene.children.getByName('stuff' + i) as Phaser.GameObjects.Image || this.scene.add.image(-100, -100, 'stuff', i)
                    .setDepth(DEPTH.UI_TEXT)
                    .setName('stuff' + i)
                    .setScrollFactor(0, 0);
                img.setActive(true).setVisible(true);
                fixedItemsToDisplay.push(img);
            }
        }

        Phaser.Actions.GridAlign(selectableItemsToDisplay, {
            width: 5,
            height: 4,
            cellWidth: 32,
            cellHeight: 32,
            x: origin.x,
            y: origin.y
        });

        const selector = this.scene.children.getByName('framing32') as Phaser.GameObjects.Image || this.scene.add.image(origin.x, origin.y, 'framing32')
            .setDepth(DEPTH.UI_TEXT + 10)
            .setName('framing32')
            .setScrollFactor(0, 0);
        selector.setActive(true).setVisible(true);

        const currentSwordId = this.player.swordManager.getCurrentSword().id;

        const selectedItem = selectableItemsToDisplay.find(e => e.data.get('id') === currentSwordId) as Phaser.GameObjects.Image;

        selector.setPosition(selectedItem.x, selectedItem.y);

        Phaser.Actions.GridAlign(fixedItemsToDisplay, {
            width: 4,
            height: 1,
            cellWidth: 32,
            cellHeight: 32,
            x: origin.x + 15,
            y: origin.y + 160
        });

        const LVL = this.scene.children.getByName('LVL') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 8 * 4, origin.center.y - 86, FONTS.ULTIMA_BOLD, `LEVEL: ${this.inventory.level}`, FONTS_SIZES.ULTIMA_BOLD)
            .setOrigin(0, 0.5)
            .setDepth(DEPTH.UI_TEXT)
            .setName('LVL')
            .setScrollFactor(0, 0)
            .setLetterSpacing(2)
            .setTintFill(COLORS.STEEL_GRAY);
        LVL.setActive(true).setVisible(true);

        const nextLevelXp = Math.floor(0.8 * Math.pow(this.inventory.level, 2) + 1.8 * Math.pow(this.inventory.level, 3) + 3.3 * Math.pow(this.inventory.level, 2) + 0.6 * Math.pow(this.inventory.level - 1, 2) + 184.8 * this.inventory.level - 0.6);

        const XP = this.scene.children.getByName('XP') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 68, FONTS.GALAXY, `xp: ${Math.round(this.inventory.xp)}/${nextLevelXp}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('XP')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.STEEL_GRAY);
        XP.setActive(true).setVisible(true);

        const HP = this.scene.children.getByName('HP') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 58, FONTS.GALAXY, `hp: ${this.inventory.life}/${this.inventory.maxLife}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('HP')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.DARK_GREEN);
        HP.setActive(true).setVisible(true);

        const strength = Math.ceil(Math.sqrt(Math.pow(this.inventory.level, 3)) / 10);

        const STR = this.scene.children.getByName('STR') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 48, FONTS.GALAXY, `str: ${strength}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('STR')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.RED);
        STR.setActive(true).setVisible(true);

        const DEF = this.scene.children.getByName('DEF') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 5 * 3, origin.center.y - 48, FONTS.GALAXY, `def: ${this.inventory.def}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('DEF')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.DARK_GREEN);
        DEF.setActive(true).setVisible(true);

        const swordAttack = this.scene.children.getByName('swordAttack') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 38, FONTS.GALAXY, `sword atk: ${this.player.swordManager.getCurrentSword().damage}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('swordAttack')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.RED);
        swordAttack.setActive(true).setVisible(true);

        const swordRate = this.scene.children.getByName('swordRate') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 28, FONTS.GALAXY, `sword rate: ${Math.round(this.player.swordManager.getCurrentSword().rate)}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('swordRate')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.EAST_BLUE);
        swordRate.setActive(true).setVisible(true);

        const bowAttack = this.scene.children.getByName('bowAttack') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 8, FONTS.GALAXY, `bow atk: ${Math.round(this.player.bowManager.getCurrentBow().damage)}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('bowAttack')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.RED);
        bowAttack.setActive(true).setVisible(true);

        const bowRate = this.scene.children.getByName('bowRate') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, origin.center.y + 2, FONTS.GALAXY, `bow rate: ${Math.round(this.player.bowManager.getCurrentBow().rate)}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('bowRate')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.EAST_BLUE);
        bowRate.setActive(true).setVisible(true);

        const shieldDef = this.scene.children.getByName('shieldDef') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(WIDTH / 2, origin.center.y - 18, FONTS.GALAXY, `shield def: ${this.player.shieldManager.getCurrentShield().defense}`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('shieldDef')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.DARK_GREEN);
        shieldDef.setActive(true).setVisible(true);

        const currentSword = this.player.swordManager.getCurrentSword();

        const itemName = this.scene.children.getByName('itemName') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(origin.center.x + (origin.right - origin.x) / 4, origin.center.y + 16, FONTS.ULTIMA_BOLD, `${currentSword.name.toUpperCase()} \n ${currentSword.desc} \n ATK: ${currentSword.damage}   RATE: ${currentSword.rate}`, FONTS_SIZES.ULTIMA_BOLD, 1)
            .setOrigin(0.5, 0)
            .setName('itemName')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.EAST_BLUE)
            .setMaxWidth(WIDTH / 3);
        itemName.setActive(true).setVisible(true);

        const helperText = this.scene.children.getByName('helperText') as Phaser.GameObjects.BitmapText || this.scene.add.bitmapText(origin.x - 17, origin.center.y + 52, FONTS.GALAXY, `press ${this.scene.player.getPlayerKey('fire')} to equip`, FONTS_SIZES.GALAXY)
            .setOrigin(0, 0.5)
            .setName('helperText')
            .setDepth(DEPTH.UI_TEXT)
            .setScrollFactor(0, 0)
            .setTintFill(COLORS.STEEL_GRAY);
            helperText.setActive(true).setVisible(true);

        const dialog = this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) =>
        {
            if (event.key === this.player.keys.select.originalEvent?.key && this.player.isPause)
            {
                this.scene.unPause();

                selectableItemsToDisplay.forEach(img => img.setActive(false).setVisible(false));

                fixedItemsToDisplay.forEach(img => img.setVisible(false));

                [selector, LVL, XP, STR, HP, DEF, swordRate, swordAttack, bowAttack, bowRate, shieldDef, itemName, helperText, GRID]
                    .forEach(elm => elm.setActive(false).setVisible(false));

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

            // show weapon details
            const onItem = selectableItemsToDisplay.find(e => e.x === selector.x && e.y === selector.y) as Phaser.GameObjects.Image;

            if (onItem && itemName.active)
            {
                const id = onItem.data.get('id');

                switch (true)
                {
                    case (id < 10):
                        const sword: Sword = this.player.swordManager.getSwords().find(elm => elm.id === id) as Sword;

                        itemName?.setText(`${sword.name.toUpperCase()} \n ${sword.desc} \n ATK: ${sword.damage}   RATE: ${sword.rate}`);
                        break;

                    case (id < 15):
                        const bow: Bow = this.player.bowManager.getBows().find(elm => elm.id === id) as Bow;

                        itemName?.setText(`${bow.name.toUpperCase()} \n ${bow.desc} \n ATK: ${bow.damage}   RATE: ${bow.rate}`);
                        break;

                    case (id < 20):
                        const shield: Shield = this.player.shieldManager.getShields().find(elm => elm.id === id) as Shield;

                        itemName?.setText(`${shield.name.toUpperCase()} \n ${shield.desc} \n DEF: ${shield.defense}`);
                        break;

                    default:
                        itemName?.setText('');
                        break;
                }
            }
            else if (itemName.active)
            {
                itemName?.setText('');
            }

            // change the weapon
            if (event.keyCode === this.player.keys.fire.keyCode && this.player.isPause)
            {
                const choosedItem = selectableItemsToDisplay.find(e => e.x === selector.x && e.y === selector.y);

                if (choosedItem)
                {
                    const id = choosedItem.data.get('id');

                    this.scene.playSfx('melo', { rate: 2 });

                    if (id < 10)
                    {
                        this.player.swordManager.selectSword(id);

                        this.inventory.selectedSword = id;

                        swordAttack?.setText(`sword atk: ${this.player.swordManager.getCurrentSword().damage}`);

                        swordRate?.setText(`sword rate: ${(Math.round(this.player.swordManager.getCurrentSword().rate))}`);

                        return;
                    }

                    if (id < 15)
                    {
                        this.player.bowManager.selectBow(id);

                        this.inventory.selectedBow = id;

                        bowAttack?.setText(`bow atk: ${this.player.bowManager.getCurrentBow().damage}`);

                        bowRate?.setText(`bow rate: ${this.player.bowManager.getCurrentBow().rate}`);

                        return;
                    }

                    if (id < 20)
                    {
                        this.player.shieldManager.selectShield(id);

                        this.inventory.selectedShield = id;

                        shieldDef?.setText(`shield def: ${this.player.shieldManager.getCurrentShield().defense}`);
                    }
                }
            }
        });
    }
}
