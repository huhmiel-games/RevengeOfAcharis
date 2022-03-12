import Angel from '../enemies/Angel';
import Archer from '../enemies/Archer';
import BringerOfDeath from '../enemies/BringerOfDeath';
import DemonAxe from '../enemies/DemonAxe';
import DragonHead from '../enemies/DragonHead';
import EvilWizard from '../enemies/EvilWizard';
import EvilWizardBoss from '../enemies/EvilWizardBoss';
import FireSkull from '../enemies/FireSkull';
import Flames from '../enemies/Flames';
import Ghost from '../enemies/Ghost';
import HellHound from '../enemies/HellHound';
import Horse from '../enemies/Horse';
import Imp from '../enemies/Imp';
import Knight2 from '../enemies/Knight2';
import Minotaur from '../enemies/Minotaur';
import Samurai from '../enemies/Samurai';
import Saw from '../enemies/Saw';
import Skeleton from '../enemies/Skeleton';
import SkeletonFlail from '../enemies/SkeletonFlail';
import SkeletonSeeker from '../enemies/SkeletonSeeker';
import SkeletonSword from '../enemies/SkeletonSword';
import Thing from '../enemies/Thing';
import VikingAxe from '../enemies/VikingAxe';
import WaterQueen from '../enemies/WaterQueen';
import Wizard from '../enemies/Wizard';
import Worm from '../enemies/Worm';
import Npc from '../npc/Npc';
import GameScene from '../scenes/GameScene';
import SaveLoadService from '../services/SaveLoadService';

export default function addEnemies (scene: GameScene)
{

    const layerArray = scene.checkObjectsLayerIndex('objects');

    layerArray?.objects.forEach((element) =>
    {
        element.properties = scene.convertTiledObjectProperties(element.properties);

        switch (element.name)
        {
            case 'worm':
                if (!element.y) return;

                const worm = new Worm(scene, element.x as unknown as number, element.y - 16 as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                    isBossMusic: element.properties.isBossMusic ? true : false
                });

                scene.enemyGroup.push(worm);
                break;

            case 'imp':
                if (!element.y) return;

                const imp = new Imp(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(imp);
                break;

            case 'viking':
                if (!element.y) return;

                const viking = new VikingAxe(scene, element.x as unknown as number - 58, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(viking);
                break;

            case 'angel':
                if (!element.y) return;

                const angel = new Angel(scene, element.x as unknown as number - 58, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(angel);
                break;

            case 'archer':
                if (!element.y) return;

                const archer = new Archer(scene, element.x as unknown as number - 25, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(archer);
                break;

            case 'samurai':
                if (!element.y) return;

                const samurai = new Samurai(scene, element.x as unknown as number - 64, element.y as unknown as number - 64, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(samurai);
                break;

            case 'saw':
                if (!element.y) return;

                const saw = new Saw(scene, element.x as unknown as number + 8, element.y - 12 as unknown as number, {
                    key: 'atlas',
                    name: 'saw',
                    life: 0,
                    damage: 15,
                    amplitude: element.properties.amplitude,
                    duration: element.properties.duration ? element.properties.duration : 2000
                });

                scene.enemyGroup.push(saw);
                break;

            case 'dragon-head':
                if (!element.y) return;

                const dragonHead = new DragonHead(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                    flipX: element.properties.flipX
                });

                scene.enemyGroup.push(dragonHead);
                break;

            case 'evil-wizard':
                if (!element.y) return;

                const evilWizard = new EvilWizard(scene, element.x as unknown as number - 64, element.y as unknown as number - 64, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(evilWizard);
                break;

            case 'knight2':
                if (!element.y) return;

                const knight2 = new Knight2(scene, element.x as unknown as number - 64, element.y as unknown as number - 64, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(knight2);
                break;

            case 'horse':
                if (!element.y) return;

                const horse = new Horse(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: 'horse-galloping_0',
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(horse);
                break;

            case 'skeleton-flail':
                if (!element.y) return;

                const skeletonFlail = new SkeletonFlail(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(skeletonFlail);
                break;

            case 'skeleton-sword':
                if (!element.y) return;

                const skeletonSword = new SkeletonSword(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(skeletonSword);
                break;

            case 'hellhound':
                if (!element.y) return;

                const hellhound = new HellHound(scene, element.x as unknown as number, element.y - 16 as unknown as number - 16, {
                    key: 'hellHound',
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(hellhound);
                break;

            case 'fireskull':
                if (!element.y) return;

                const fireskull = new FireSkull(scene, element.x as unknown as number, element.y - 16 as unknown as number - 16, {
                    key: 'fire-skull',
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(fireskull);
                break;

            case 'thing':
                if (!element.y) return;

                const thing = new Thing(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });
                scene.enemyGroup.push(thing);
                break;

            case 'skeleton':
                if (!element.y) return;

                const skeleton = new Skeleton(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });
                skeleton.setPosition(element.x, element.y - 16);
                scene.enemyGroup.push(skeleton);
                break;

            case 'ghost':
                if (!element.y) return;

                const ghost = new Ghost(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });
                scene.enemyGroup.push(ghost);
                break;

            case 'wizard':
                if (!element.y) return;

                const wiz = new Wizard(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                    delay: element.properties.delay || 0,
                });
                scene.enemyGroup.push(wiz);
                break;

            case 'flames':
                if (!element.y) return;

                const flame = new Flames(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: 'flames',
                    name: 'flame',
                });

                scene.enemyGroup.push(flame);
                break;

            case 'oldman':
                if (!element.y) return;
                const keys = SaveLoadService.getConfigKeys();
                const oldman = new Npc(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    msg: [
                        'Hey Acharis !!',
                        'You are back.',
                        'I will try to help you.',
                        `Press ${keys[7].toLowerCase()}, to watch your inventory`,
                        `And ${keys[4].toLowerCase()} to select a weapon`,
                        'Good luck !!'
                    ]
                });

                scene.npcGroup.push(oldman);
                break;

            case 'woman':
                if (!element.y) return;
                const keysJump = SaveLoadService.getConfigKeys()[5];
                const woman = new Npc(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    msg: [
                        'Be careful Acharis',
                        'Our town has been attacked by monsters',
                        'it\'s a nightmare...',
                        'I fear for my children every day.',
                        'Watch out for enemies with weapons',
                        'Try to dodge their attacks',
                        `Press ${keysJump.toLowerCase()} to jump`
                    ]
                });

                scene.npcGroup.push(woman);
                break;

            case 'bearded':
                if (!element.y) return;
                const bearded = new Npc(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    msg: element.properties.msg
                });

                scene.npcGroup.push(bearded);
                break;

            case 'hatman':
                if (!element.y) return;
                const keysOptions = SaveLoadService.getConfigKeys();
                const hatman = new Npc(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    msg: ['Hello', `Keep down ${keysOptions[6].toLowerCase()} to bend your bow.`, 'Once done', 'release it to throw an arrow']
                });

                scene.npcGroup.push(hatman);
                break;

            case 'skeleton-seeker':
                const skelSeek = new SkeletonSeeker(scene, element.x as unknown as number, element.y as unknown as number - 23, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(skelSeek);
                break;

            case 'wizardBoss':
                const wizardBoss = new EvilWizardBoss(scene, element.x as unknown as number, element.y as unknown as number, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(wizardBoss);
                break;

            case 'bringerOfDeath':
                if (scene.callBringerOfDeath())
                {
                    const bringer = new BringerOfDeath(scene, element.x as unknown as number, element.y as unknown as number, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    scene.enemyGroup.push(bringer);
                }

                break;

            case 'demon-axe':
                if (!element.y) return;

                const demonAxe = new DemonAxe(scene, element.x as unknown as number, element.y - 16 as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                    isBossMusic: element.properties.isBossMusic ? true : false
                });

                scene.enemyGroup.push(demonAxe);
                break;

            case 'waterQueen':
                if (!element.y) return;

                if (scene.callWaterQueen())
                {
                    const waterQueen = new WaterQueen(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                        key: element.properties.key,
                        name: element.name,
                        life: element.properties.life,
                        damage: element.properties.damage,
                    });

                    scene.enemyGroup.push(waterQueen);
                    break;
                }

            case 'minotaur':
                if (!element.y) return;

                const minotaur = new Minotaur(scene, element.x as unknown as number, element.y as unknown as number - 16, {
                    key: element.properties.key,
                    name: element.name,
                    life: element.properties.life,
                    damage: element.properties.damage,
                });

                scene.enemyGroup.push(minotaur);
                break;

            default:
                break;
        }
    });

}