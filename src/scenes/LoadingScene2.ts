// IMPORT SECTION //
import atlasJSON from './src/assets/atlas/atlas.json';
import atlas from './src/assets/atlas/atlas.png';


class Test
{
    private atlas = (a: any, b: any, c: any) => { console.log('test'); };

    private anims: { create: (arg0: { key: string; frames: { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[] | { key: string; frame: string; }[]; frameRate: number; repeat: number; }) => void; };
    private load (): this
    {
        return this;
    }

    
    private preload ()
    {
        // PRELOAD SECTION //
        // this.load.atlas('atlas', atlas, atlasJSON);

    }
    
    private create ()
    {
        // ANIMS SECTION //

        this.anims.create({
            key: 'adventurer-air-attack-3-end',
            frames: [
                { key: 'atlas', frame: 'adventurer-air-attack-3-end-00' },
                { key: 'atlas', frame: 'adventurer-air-attack-3-end-01' },
                { key: 'atlas', frame: 'adventurer-air-attack-3-end-02' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-air-attack1',
            frames: [
                { key: 'atlas', frame: 'adventurer-air-attack1-00' },
                { key: 'atlas', frame: 'adventurer-air-attack1-01' },
                { key: 'atlas', frame: 'adventurer-air-attack1-02' },
                { key: 'atlas', frame: 'adventurer-air-attack1-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-air-attack2',
            frames: [
                { key: 'atlas', frame: 'adventurer-air-attack2-00' },
                { key: 'atlas', frame: 'adventurer-air-attack2-01' },
                { key: 'atlas', frame: 'adventurer-air-attack2-02' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-air-attack3-loop',
            frames: [
                { key: 'atlas', frame: 'adventurer-air-attack3-loop-00' },
                { key: 'atlas', frame: 'adventurer-air-attack3-loop-01' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-air-attack3-rdy',
            frames: [
                { key: 'atlas', frame: 'adventurer-air-attack3-rdy-00' },
            ],
            frameRate: 2,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-attack1',
            frames: [
                { key: 'atlas', frame: 'adventurer-attack1-00' },
                { key: 'atlas', frame: 'adventurer-attack1-01' },
                { key: 'atlas', frame: 'adventurer-attack1-02' },
                { key: 'atlas', frame: 'adventurer-attack1-03' },
                { key: 'atlas', frame: 'adventurer-attack1-04' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-attack2',
            frames: [
                { key: 'atlas', frame: 'adventurer-attack2-00' },
                { key: 'atlas', frame: 'adventurer-attack2-01' },
                { key: 'atlas', frame: 'adventurer-attack2-02' },
                { key: 'atlas', frame: 'adventurer-attack2-03' },
                { key: 'atlas', frame: 'adventurer-attack2-04' },
                { key: 'atlas', frame: 'adventurer-attack2-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-attack3',
            frames: [
                { key: 'atlas', frame: 'adventurer-attack3-00' },
                { key: 'atlas', frame: 'adventurer-attack3-01' },
                { key: 'atlas', frame: 'adventurer-attack3-02' },
                { key: 'atlas', frame: 'adventurer-attack3-03' },
                { key: 'atlas', frame: 'adventurer-attack3-04' },
                { key: 'atlas', frame: 'adventurer-attack3-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-bow',
            frames: [
                { key: 'atlas', frame: 'adventurer-bow-00' },
                { key: 'atlas', frame: 'adventurer-bow-01' },
                { key: 'atlas', frame: 'adventurer-bow-02' },
                { key: 'atlas', frame: 'adventurer-bow-03' },
                { key: 'atlas', frame: 'adventurer-bow-04' },
                { key: 'atlas', frame: 'adventurer-bow-05' },
                { key: 'atlas', frame: 'adventurer-bow-06' },
                { key: 'atlas', frame: 'adventurer-bow-07' },
                { key: 'atlas', frame: 'adventurer-bow-08' },
            ],
            frameRate: 18,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-bow-jump',
            frames: [
                { key: 'atlas', frame: 'adventurer-bow-jump-00' },
                { key: 'atlas', frame: 'adventurer-bow-jump-01' },
                { key: 'atlas', frame: 'adventurer-bow-jump-02' },
                { key: 'atlas', frame: 'adventurer-bow-jump-03' },
                { key: 'atlas', frame: 'adventurer-bow-jump-04' },
                { key: 'atlas', frame: 'adventurer-bow-jump-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-cast',
            frames: [
                { key: 'atlas', frame: 'adventurer-cast-00' },
                { key: 'atlas', frame: 'adventurer-cast-01' },
                { key: 'atlas', frame: 'adventurer-cast-02' },
                { key: 'atlas', frame: 'adventurer-cast-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-cast-loop',
            frames: [
                { key: 'atlas', frame: 'adventurer-cast-loop-00' },
                { key: 'atlas', frame: 'adventurer-cast-loop-01' },
                { key: 'atlas', frame: 'adventurer-cast-loop-02' },
                { key: 'atlas', frame: 'adventurer-cast-loop-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-crnr-clmb',
            frames: [
                { key: 'atlas', frame: 'adventurer-crnr-clmb-00' },
                { key: 'atlas', frame: 'adventurer-crnr-clmb-01' },
                { key: 'atlas', frame: 'adventurer-crnr-clmb-02' },
                { key: 'atlas', frame: 'adventurer-crnr-clmb-03' },
                { key: 'atlas', frame: 'adventurer-crnr-clmb-04' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-crnr-grb',
            frames: [
                { key: 'atlas', frame: 'adventurer-crnr-grb-00' },
                { key: 'atlas', frame: 'adventurer-crnr-grb-01' },
                { key: 'atlas', frame: 'adventurer-crnr-grb-02' },
                { key: 'atlas', frame: 'adventurer-crnr-grb-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-crnr-jmp',
            frames: [
                { key: 'atlas', frame: 'adventurer-crnr-jmp-00' },
                { key: 'atlas', frame: 'adventurer-crnr-jmp-01' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-crouch',
            frames: [
                { key: 'atlas', frame: 'adventurer-crouch-00' },
                { key: 'atlas', frame: 'adventurer-crouch-01' },
                { key: 'atlas', frame: 'adventurer-crouch-02' },
                { key: 'atlas', frame: 'adventurer-crouch-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-crouch-walk',
            frames: [
                { key: 'atlas', frame: 'adventurer-crouch-walk-00' },
                { key: 'atlas', frame: 'adventurer-crouch-walk-01' },
                { key: 'atlas', frame: 'adventurer-crouch-walk-02' },
                { key: 'atlas', frame: 'adventurer-crouch-walk-03' },
                { key: 'atlas', frame: 'adventurer-crouch-walk-04' },
                { key: 'atlas', frame: 'adventurer-crouch-walk-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-die',
            frames: [
                { key: 'atlas', frame: 'adventurer-die-00' },
                { key: 'atlas', frame: 'adventurer-die-01' },
                { key: 'atlas', frame: 'adventurer-die-02' },
                { key: 'atlas', frame: 'adventurer-die-03' },
                { key: 'atlas', frame: 'adventurer-die-04' },
                { key: 'atlas', frame: 'adventurer-die-05' },
                { key: 'atlas', frame: 'adventurer-die-06' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-drop-kick',
            frames: [
                { key: 'atlas', frame: 'adventurer-drop-kick-00' },
                { key: 'atlas', frame: 'adventurer-drop-kick-01' },
                { key: 'atlas', frame: 'adventurer-drop-kick-02' },
                { key: 'atlas', frame: 'adventurer-drop-kick-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-fall',
            frames: [
                { key: 'atlas', frame: 'adventurer-fall-00' },
                { key: 'atlas', frame: 'adventurer-fall-01' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-get-up',
            frames: [
                { key: 'atlas', frame: 'adventurer-get-up-00' },
                { key: 'atlas', frame: 'adventurer-get-up-01' },
                { key: 'atlas', frame: 'adventurer-get-up-02' },
                { key: 'atlas', frame: 'adventurer-get-up-03' },
                { key: 'atlas', frame: 'adventurer-get-up-04' },
                { key: 'atlas', frame: 'adventurer-get-up-05' },
                { key: 'atlas', frame: 'adventurer-get-up-06' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-hurt',
            frames: [
                { key: 'atlas', frame: 'adventurer-hurt-00' },
                { key: 'atlas', frame: 'adventurer-hurt-01' },
                { key: 'atlas', frame: 'adventurer-hurt-02' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-idle',
            frames: [
                { key: 'atlas', frame: 'adventurer-idle-00' },
                { key: 'atlas', frame: 'adventurer-idle-01' },
                { key: 'atlas', frame: 'adventurer-idle-02' },
                { key: 'atlas', frame: 'adventurer-idle-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-idle-2',
            frames: [
                { key: 'atlas', frame: 'adventurer-idle-2-00' },
                { key: 'atlas', frame: 'adventurer-idle-2-01' },
                { key: 'atlas', frame: 'adventurer-idle-2-02' },
                { key: 'atlas', frame: 'adventurer-idle-2-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-items',
            frames: [
                { key: 'atlas', frame: 'adventurer-items-00' },
                { key: 'atlas', frame: 'adventurer-items-01' },
                { key: 'atlas', frame: 'adventurer-items-02' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-jump',
            frames: [
                { key: 'atlas', frame: 'adventurer-jump-00' },
                { key: 'atlas', frame: 'adventurer-jump-01' },
                { key: 'atlas', frame: 'adventurer-jump-02' },
                { key: 'atlas', frame: 'adventurer-jump-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-kick',
            frames: [
                { key: 'atlas', frame: 'adventurer-kick-00' },
                { key: 'atlas', frame: 'adventurer-kick-01' },
                { key: 'atlas', frame: 'adventurer-kick-02' },
                { key: 'atlas', frame: 'adventurer-kick-03' },
                { key: 'atlas', frame: 'adventurer-kick-04' },
                { key: 'atlas', frame: 'adventurer-kick-05' },
                { key: 'atlas', frame: 'adventurer-kick-06' },
                { key: 'atlas', frame: 'adventurer-kick-07' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-knock-dwn',
            frames: [
                { key: 'atlas', frame: 'adventurer-knock-dwn-00' },
                { key: 'atlas', frame: 'adventurer-knock-dwn-01' },
                { key: 'atlas', frame: 'adventurer-knock-dwn-02' },
                { key: 'atlas', frame: 'adventurer-knock-dwn-03' },
                { key: 'atlas', frame: 'adventurer-knock-dwn-04' },
                { key: 'atlas', frame: 'adventurer-knock-dwn-05' },
                { key: 'atlas', frame: 'adventurer-knock-dwn-06' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-ladder-climb',
            frames: [
                { key: 'atlas', frame: 'adventurer-ladder-climb-00' },
                { key: 'atlas', frame: 'adventurer-ladder-climb-01' },
                { key: 'atlas', frame: 'adventurer-ladder-climb-02' },
                { key: 'atlas', frame: 'adventurer-ladder-climb-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-punch',
            frames: [
                { key: 'atlas', frame: 'adventurer-punch-00' },
                { key: 'atlas', frame: 'adventurer-punch-01' },
                { key: 'atlas', frame: 'adventurer-punch-02' },
                { key: 'atlas', frame: 'adventurer-punch-03' },
                { key: 'atlas', frame: 'adventurer-punch-04' },
                { key: 'atlas', frame: 'adventurer-punch-05' },
                { key: 'atlas', frame: 'adventurer-punch-06' },
                { key: 'atlas', frame: 'adventurer-punch-07' },
                { key: 'atlas', frame: 'adventurer-punch-08' },
                { key: 'atlas', frame: 'adventurer-punch-09' },
                { key: 'atlas', frame: 'adventurer-punch-10' },
                { key: 'atlas', frame: 'adventurer-punch-11' },
                { key: 'atlas', frame: 'adventurer-punch-12' },
            ],
            frameRate: 26,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-run',
            frames: [
                { key: 'atlas', frame: 'adventurer-run-00' },
                { key: 'atlas', frame: 'adventurer-run-01' },
                { key: 'atlas', frame: 'adventurer-run-02' },
                { key: 'atlas', frame: 'adventurer-run-03' },
                { key: 'atlas', frame: 'adventurer-run-04' },
                { key: 'atlas', frame: 'adventurer-run-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-run-punch',
            frames: [
                { key: 'atlas', frame: 'adventurer-run-punch-00' },
                { key: 'atlas', frame: 'adventurer-run-punch-01' },
                { key: 'atlas', frame: 'adventurer-run-punch-02' },
                { key: 'atlas', frame: 'adventurer-run-punch-03' },
                { key: 'atlas', frame: 'adventurer-run-punch-04' },
                { key: 'atlas', frame: 'adventurer-run-punch-05' },
                { key: 'atlas', frame: 'adventurer-run-punch-06' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-run2',
            frames: [
                { key: 'atlas', frame: 'adventurer-run2-00' },
                { key: 'atlas', frame: 'adventurer-run2-01' },
                { key: 'atlas', frame: 'adventurer-run2-02' },
                { key: 'atlas', frame: 'adventurer-run2-03' },
                { key: 'atlas', frame: 'adventurer-run2-04' },
                { key: 'atlas', frame: 'adventurer-run2-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-slide',
            frames: [
                { key: 'atlas', frame: 'adventurer-slide-00' },
                { key: 'atlas', frame: 'adventurer-slide-01' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-smrslt',
            frames: [
                { key: 'atlas', frame: 'adventurer-smrslt-00' },
                { key: 'atlas', frame: 'adventurer-smrslt-01' },
                { key: 'atlas', frame: 'adventurer-smrslt-02' },
                { key: 'atlas', frame: 'adventurer-smrslt-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-stand',
            frames: [
                { key: 'atlas', frame: 'adventurer-stand-00' },
                { key: 'atlas', frame: 'adventurer-stand-01' },
                { key: 'atlas', frame: 'adventurer-stand-02' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-swrd-drw',
            frames: [
                { key: 'atlas', frame: 'adventurer-swrd-drw-00' },
                { key: 'atlas', frame: 'adventurer-swrd-drw-01' },
                { key: 'atlas', frame: 'adventurer-swrd-drw-02' },
                { key: 'atlas', frame: 'adventurer-swrd-drw-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-swrd-shte',
            frames: [
                { key: 'atlas', frame: 'adventurer-swrd-shte-00' },
                { key: 'atlas', frame: 'adventurer-swrd-shte-01' },
                { key: 'atlas', frame: 'adventurer-swrd-shte-02' },
                { key: 'atlas', frame: 'adventurer-swrd-shte-03' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-walk',
            frames: [
                { key: 'atlas', frame: 'adventurer-walk-00' },
                { key: 'atlas', frame: 'adventurer-walk-01' },
                { key: 'atlas', frame: 'adventurer-walk-02' },
                { key: 'atlas', frame: 'adventurer-walk-03' },
                { key: 'atlas', frame: 'adventurer-walk-04' },
                { key: 'atlas', frame: 'adventurer-walk-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-wall-run',
            frames: [
                { key: 'atlas', frame: 'adventurer-wall-run-00' },
                { key: 'atlas', frame: 'adventurer-wall-run-01' },
                { key: 'atlas', frame: 'adventurer-wall-run-02' },
                { key: 'atlas', frame: 'adventurer-wall-run-03' },
                { key: 'atlas', frame: 'adventurer-wall-run-04' },
                { key: 'atlas', frame: 'adventurer-wall-run-05' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'adventurer-wall-slide',
            frames: [
                { key: 'atlas', frame: 'adventurer-wall-slide-00' },
                { key: 'atlas', frame: 'adventurer-wall-slide-01' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'angel',
            frames: [
                { key: 'atlas', frame: 'angel_0' },
                { key: 'atlas', frame: 'angel_1' },
                { key: 'atlas', frame: 'angel_2' },
                { key: 'atlas', frame: 'angel_3' },
                { key: 'atlas', frame: 'angel_4' },
                { key: 'atlas', frame: 'angel_5' },
                { key: 'atlas', frame: 'angel_6' },
                { key: 'atlas', frame: 'angel_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-attack',
            frames: [
                { key: 'atlas', frame: 'archer-attack_0' },
                { key: 'atlas', frame: 'archer-attack_1' },
                { key: 'atlas', frame: 'archer-attack_2' },
                { key: 'atlas', frame: 'archer-attack_3' },
                { key: 'atlas', frame: 'archer-attack_4' },
                { key: 'atlas', frame: 'archer-attack_5' },
                { key: 'atlas', frame: 'archer-attack_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-death',
            frames: [
                { key: 'atlas', frame: 'archer-death_0' },
                { key: 'atlas', frame: 'archer-death_1' },
                { key: 'atlas', frame: 'archer-death_2' },
                { key: 'atlas', frame: 'archer-death_3' },
                { key: 'atlas', frame: 'archer-death_4' },
                { key: 'atlas', frame: 'archer-death_5' },
                { key: 'atlas', frame: 'archer-death_6' },
                { key: 'atlas', frame: 'archer-death_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-doublejump',
            frames: [
                { key: 'atlas', frame: 'archer-doublejump_0' },
                { key: 'atlas', frame: 'archer-doublejump_1' },
                { key: 'atlas', frame: 'archer-doublejump_2' },
                { key: 'atlas', frame: 'archer-doublejump_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-fall',
            frames: [
                { key: 'atlas', frame: 'archer-fall_0' },
            ],
            frameRate: 2,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-idle',
            frames: [
                { key: 'atlas', frame: 'archer-idle_0' },
                { key: 'atlas', frame: 'archer-idle_1' },
                { key: 'atlas', frame: 'archer-idle_2' },
                { key: 'atlas', frame: 'archer-idle_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-jump',
            frames: [
                { key: 'atlas', frame: 'archer-jump_0' },
            ],
            frameRate: 2,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-roll',
            frames: [
                { key: 'atlas', frame: 'archer-roll_0' },
                { key: 'atlas', frame: 'archer-roll_1' },
                { key: 'atlas', frame: 'archer-roll_2' },
                { key: 'atlas', frame: 'archer-roll_3' },
                { key: 'atlas', frame: 'archer-roll_4' },
                { key: 'atlas', frame: 'archer-roll_5' },
                { key: 'atlas', frame: 'archer-roll_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-run',
            frames: [
                { key: 'atlas', frame: 'archer-run_0' },
                { key: 'atlas', frame: 'archer-run_1' },
                { key: 'atlas', frame: 'archer-run_2' },
                { key: 'atlas', frame: 'archer-run_3' },
                { key: 'atlas', frame: 'archer-run_4' },
                { key: 'atlas', frame: 'archer-run_5' },
                { key: 'atlas', frame: 'archer-run_6' },
                { key: 'atlas', frame: 'archer-run_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'archer-wall-slide',
            frames: [
                { key: 'atlas', frame: 'archer-wall-slide_0' },
                { key: 'atlas', frame: 'archer-wall-slide_1' },
                { key: 'atlas', frame: 'archer-wall-slide_2' },
                { key: 'atlas', frame: 'archer-wall-slide_3' },
                { key: 'atlas', frame: 'archer-wall-slide_4' },
                { key: 'atlas', frame: 'archer-wall-slide_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'crow-eat',
            frames: [
                { key: 'atlas', frame: 'crow-eat0' },
                { key: 'atlas', frame: 'crow-eat1' },
                { key: 'atlas', frame: 'crow-eat2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'crow-fly-off',
            frames: [
                { key: 'atlas', frame: 'crow-fly-off0' },
                { key: 'atlas', frame: 'crow-fly-off1' },
                { key: 'atlas', frame: 'crow-fly-off2' },
                { key: 'atlas', frame: 'crow-fly-off3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'crow-fly',
            frames: [
                { key: 'atlas', frame: 'crow-fly0' },
                { key: 'atlas', frame: 'crow-fly1' },
                { key: 'atlas', frame: 'crow-fly2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'crow-idle',
            frames: [
                { key: 'atlas', frame: 'crow-idle0' },
                { key: 'atlas', frame: 'crow-idle1' },
                { key: 'atlas', frame: 'crow-idle2' },
                { key: 'atlas', frame: 'crow-idle3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'crow-look-behind',
            frames: [
                { key: 'atlas', frame: 'crow-look-behind_0' },
            ],
            frameRate: 2,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-breath-fire',
            frames: [
                { key: 'atlas', frame: 'demon-breath-fire_0' },
                { key: 'atlas', frame: 'demon-breath-fire_1' },
                { key: 'atlas', frame: 'demon-breath-fire_2' },
                { key: 'atlas', frame: 'demon-breath-fire_3' },
                { key: 'atlas', frame: 'demon-breath-fire_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-breath-ice',
            frames: [
                { key: 'atlas', frame: 'demon-breath-ice_0' },
                { key: 'atlas', frame: 'demon-breath-ice_1' },
                { key: 'atlas', frame: 'demon-breath-ice_2' },
                { key: 'atlas', frame: 'demon-breath-ice_3' },
                { key: 'atlas', frame: 'demon-breath-ice_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-idle',
            frames: [
                { key: 'atlas', frame: 'demon-idle_0' },
                { key: 'atlas', frame: 'demon-idle_1' },
                { key: 'atlas', frame: 'demon-idle_2' },
                { key: 'atlas', frame: 'demon-idle_3' },
                { key: 'atlas', frame: 'demon-idle_4' },
                { key: 'atlas', frame: 'demon-idle_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-start-breath',
            frames: [
                { key: 'atlas', frame: 'demon-start-breath_0' },
                { key: 'atlas', frame: 'demon-start-breath_1' },
                { key: 'atlas', frame: 'demon-start-breath_2' },
                { key: 'atlas', frame: 'demon-start-breath_3' },
                { key: 'atlas', frame: 'demon-start-breath_4' },
                { key: 'atlas', frame: 'demon-start-breath_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dragon-breath',
            frames: [
                { key: 'atlas', frame: 'dragon-breath0' },
                { key: 'atlas', frame: 'dragon-breath1' },
                { key: 'atlas', frame: 'dragon-breath2' },
                { key: 'atlas', frame: 'dragon-breath3' },
                { key: 'atlas', frame: 'dragon-breath4' },
                { key: 'atlas', frame: 'dragon-breath5' },
                { key: 'atlas', frame: 'dragon-breath6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dragon-head',
            frames: [
                { key: 'atlas', frame: 'dragon-head_0' },
                { key: 'atlas', frame: 'dragon-head_1' },
                { key: 'atlas', frame: 'dragon-head_2' },
                { key: 'atlas', frame: 'dragon-head_3' },
                { key: 'atlas', frame: 'dragon-head_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dragon-idle',
            frames: [
                { key: 'atlas', frame: 'dragon-idle0' },
                { key: 'atlas', frame: 'dragon-idle1' },
                { key: 'atlas', frame: 'dragon-idle2' },
                { key: 'atlas', frame: 'dragon-idle3' },
                { key: 'atlas', frame: 'dragon-idle4' },
                { key: 'atlas', frame: 'dragon-idle5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dragon-tail',
            frames: [
                { key: 'atlas', frame: 'dragon-tail0' },
                { key: 'atlas', frame: 'dragon-tail1' },
                { key: 'atlas', frame: 'dragon-tail2' },
                { key: 'atlas', frame: 'dragon-tail3' },
                { key: 'atlas', frame: 'dragon-tail4' },
                { key: 'atlas', frame: 'dragon-tail5' },
                { key: 'atlas', frame: 'dragon-tail6' },
                { key: 'atlas', frame: 'dragon-tail7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard-attack',
            frames: [
                { key: 'atlas', frame: 'evil-wizard-attack_0' },
                { key: 'atlas', frame: 'evil-wizard-attack_1' },
                { key: 'atlas', frame: 'evil-wizard-attack_2' },
                { key: 'atlas', frame: 'evil-wizard-attack_3' },
                { key: 'atlas', frame: 'evil-wizard-attack_4' },
                { key: 'atlas', frame: 'evil-wizard-attack_5' },
                { key: 'atlas', frame: 'evil-wizard-attack_6' },
                { key: 'atlas', frame: 'evil-wizard-attack_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard-death',
            frames: [
                { key: 'atlas', frame: 'evil-wizard-death_0' },
                { key: 'atlas', frame: 'evil-wizard-death_1' },
                { key: 'atlas', frame: 'evil-wizard-death_2' },
                { key: 'atlas', frame: 'evil-wizard-death_3' },
                { key: 'atlas', frame: 'evil-wizard-death_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard-hurt',
            frames: [
                { key: 'atlas', frame: 'evil-wizard-hurt_0' },
                { key: 'atlas', frame: 'evil-wizard-hurt_1' },
                { key: 'atlas', frame: 'evil-wizard-hurt_2' },
                { key: 'atlas', frame: 'evil-wizard-hurt_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard-idle',
            frames: [
                { key: 'atlas', frame: 'evil-wizard-idle_0' },
                { key: 'atlas', frame: 'evil-wizard-idle_1' },
                { key: 'atlas', frame: 'evil-wizard-idle_2' },
                { key: 'atlas', frame: 'evil-wizard-idle_3' },
                { key: 'atlas', frame: 'evil-wizard-idle_4' },
                { key: 'atlas', frame: 'evil-wizard-idle_5' },
                { key: 'atlas', frame: 'evil-wizard-idle_6' },
                { key: 'atlas', frame: 'evil-wizard-idle_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard-move',
            frames: [
                { key: 'atlas', frame: 'evil-wizard-move_0' },
                { key: 'atlas', frame: 'evil-wizard-move_1' },
                { key: 'atlas', frame: 'evil-wizard-move_2' },
                { key: 'atlas', frame: 'evil-wizard-move_3' },
                { key: 'atlas', frame: 'evil-wizard-move_4' },
                { key: 'atlas', frame: 'evil-wizard-move_5' },
                { key: 'atlas', frame: 'evil-wizard-move_6' },
                { key: 'atlas', frame: 'evil-wizard-move_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard2-attack1',
            frames: [
                { key: 'atlas', frame: 'evil-wizard2-attack1_0' },
                { key: 'atlas', frame: 'evil-wizard2-attack1_1' },
                { key: 'atlas', frame: 'evil-wizard2-attack1_2' },
                { key: 'atlas', frame: 'evil-wizard2-attack1_3' },
                { key: 'atlas', frame: 'evil-wizard2-attack1_4' },
                { key: 'atlas', frame: 'evil-wizard2-attack1_5' },
                { key: 'atlas', frame: 'evil-wizard2-attack1_6' },
                { key: 'atlas', frame: 'evil-wizard2-attack1_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard2-attack2',
            frames: [
                { key: 'atlas', frame: 'evil-wizard2-attack2_0' },
                { key: 'atlas', frame: 'evil-wizard2-attack2_1' },
                { key: 'atlas', frame: 'evil-wizard2-attack2_2' },
                { key: 'atlas', frame: 'evil-wizard2-attack2_3' },
                { key: 'atlas', frame: 'evil-wizard2-attack2_4' },
                { key: 'atlas', frame: 'evil-wizard2-attack2_5' },
                { key: 'atlas', frame: 'evil-wizard2-attack2_6' },
                { key: 'atlas', frame: 'evil-wizard2-attack2_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard2-death',
            frames: [
                { key: 'atlas', frame: 'evil-wizard2-death_0' },
                { key: 'atlas', frame: 'evil-wizard2-death_1' },
                { key: 'atlas', frame: 'evil-wizard2-death_2' },
                { key: 'atlas', frame: 'evil-wizard2-death_3' },
                { key: 'atlas', frame: 'evil-wizard2-death_4' },
                { key: 'atlas', frame: 'evil-wizard2-death_5' },
                { key: 'atlas', frame: 'evil-wizard2-death_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard2-fall',
            frames: [
                { key: 'atlas', frame: 'evil-wizard2-fall_0' },
                { key: 'atlas', frame: 'evil-wizard2-fall_1' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard2-hurt',
            frames: [
                { key: 'atlas', frame: 'evil-wizard2-hurt_0' },
                { key: 'atlas', frame: 'evil-wizard2-hurt_1' },
                { key: 'atlas', frame: 'evil-wizard2-hurt_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard2-idle',
            frames: [
                { key: 'atlas', frame: 'evil-wizard2-idle_0' },
                { key: 'atlas', frame: 'evil-wizard2-idle_1' },
                { key: 'atlas', frame: 'evil-wizard2-idle_2' },
                { key: 'atlas', frame: 'evil-wizard2-idle_3' },
                { key: 'atlas', frame: 'evil-wizard2-idle_4' },
                { key: 'atlas', frame: 'evil-wizard2-idle_5' },
                { key: 'atlas', frame: 'evil-wizard2-idle_6' },
                { key: 'atlas', frame: 'evil-wizard2-idle_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard2-jump',
            frames: [
                { key: 'atlas', frame: 'evil-wizard2-jump_0' },
                { key: 'atlas', frame: 'evil-wizard2-jump_1' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'evil-wizard2-run',
            frames: [
                { key: 'atlas', frame: 'evil-wizard2-run_0' },
                { key: 'atlas', frame: 'evil-wizard2-run_1' },
                { key: 'atlas', frame: 'evil-wizard2-run_2' },
                { key: 'atlas', frame: 'evil-wizard2-run_3' },
                { key: 'atlas', frame: 'evil-wizard2-run_4' },
                { key: 'atlas', frame: 'evil-wizard2-run_5' },
                { key: 'atlas', frame: 'evil-wizard2-run_6' },
                { key: 'atlas', frame: 'evil-wizard2-run_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'fire-element',
            frames: [
                { key: 'atlas', frame: 'fire-element_0' },
                { key: 'atlas', frame: 'fire-element_1' },
                { key: 'atlas', frame: 'fire-element_2' },
                { key: 'atlas', frame: 'fire-element_3' },
                { key: 'atlas', frame: 'fire-element_4' },
                { key: 'atlas', frame: 'fire-element_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'fire-skull',
            frames: [
                { key: 'atlas', frame: 'fire-skull_0' },
                { key: 'atlas', frame: 'fire-skull_1' },
                { key: 'atlas', frame: 'fire-skull_2' },
                { key: 'atlas', frame: 'fire-skull_3' },
                { key: 'atlas', frame: 'fire-skull_4' },
                { key: 'atlas', frame: 'fire-skull_5' },
                { key: 'atlas', frame: 'fire-skull_6' },
                { key: 'atlas', frame: 'fire-skull_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'fireBall',
            frames: [
                { key: 'atlas', frame: 'fireBall_0' },
                { key: 'atlas', frame: 'fireBall_1' },
                { key: 'atlas', frame: 'fireBall_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'flying-dragon',
            frames: [
                { key: 'atlas', frame: 'flying-dragon_0' },
                { key: 'atlas', frame: 'flying-dragon_1' },
                { key: 'atlas', frame: 'flying-dragon_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-beast-breath-stroke',
            frames: [
                { key: 'atlas', frame: 'hell-beast-breath-stroke0' },
                { key: 'atlas', frame: 'hell-beast-breath-stroke1' },
                { key: 'atlas', frame: 'hell-beast-breath-stroke2' },
                { key: 'atlas', frame: 'hell-beast-breath-stroke3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-beast-breath',
            frames: [
                { key: 'atlas', frame: 'hell-beast-breath0' },
                { key: 'atlas', frame: 'hell-beast-breath1' },
                { key: 'atlas', frame: 'hell-beast-breath2' },
                { key: 'atlas', frame: 'hell-beast-breath3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-beast-burn',
            frames: [
                { key: 'atlas', frame: 'hell-beast-burn0' },
                { key: 'atlas', frame: 'hell-beast-burn1' },
                { key: 'atlas', frame: 'hell-beast-burn2' },
                { key: 'atlas', frame: 'hell-beast-burn3' },
                { key: 'atlas', frame: 'hell-beast-burn4' },
                { key: 'atlas', frame: 'hell-beast-burn5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-beast-idle-stroke',
            frames: [
                { key: 'atlas', frame: 'hell-beast-idle-stroke0' },
                { key: 'atlas', frame: 'hell-beast-idle-stroke1' },
                { key: 'atlas', frame: 'hell-beast-idle-stroke2' },
                { key: 'atlas', frame: 'hell-beast-idle-stroke3' },
                { key: 'atlas', frame: 'hell-beast-idle-stroke4' },
                { key: 'atlas', frame: 'hell-beast-idle-stroke5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-beast-idle',
            frames: [
                { key: 'atlas', frame: 'hell-beast-idle0' },
                { key: 'atlas', frame: 'hell-beast-idle1' },
                { key: 'atlas', frame: 'hell-beast-idle2' },
                { key: 'atlas', frame: 'hell-beast-idle3' },
                { key: 'atlas', frame: 'hell-beast-idle4' },
                { key: 'atlas', frame: 'hell-beast-idle5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-hound-idle',
            frames: [
                { key: 'atlas', frame: 'hell-hound-idle_0' },
                { key: 'atlas', frame: 'hell-hound-idle_1' },
                { key: 'atlas', frame: 'hell-hound-idle_2' },
                { key: 'atlas', frame: 'hell-hound-idle_3' },
                { key: 'atlas', frame: 'hell-hound-idle_4' },
                { key: 'atlas', frame: 'hell-hound-idle_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-hound-jump',
            frames: [
                { key: 'atlas', frame: 'hell-hound-jump0' },
                { key: 'atlas', frame: 'hell-hound-jump1' },
                { key: 'atlas', frame: 'hell-hound-jump2' },
                { key: 'atlas', frame: 'hell-hound-jump3' },
                { key: 'atlas', frame: 'hell-hound-jump4' },
                { key: 'atlas', frame: 'hell-hound-jump5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-hound-run',
            frames: [
                { key: 'atlas', frame: 'hell-hound-run_0' },
                { key: 'atlas', frame: 'hell-hound-run_1' },
                { key: 'atlas', frame: 'hell-hound-run_2' },
                { key: 'atlas', frame: 'hell-hound-run_3' },
                { key: 'atlas', frame: 'hell-hound-run_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hell-hound-walk',
            frames: [
                { key: 'atlas', frame: 'hell-hound-walk_0' },
                { key: 'atlas', frame: 'hell-hound-walk_1' },
                { key: 'atlas', frame: 'hell-hound-walk_2' },
                { key: 'atlas', frame: 'hell-hound-walk_3' },
                { key: 'atlas', frame: 'hell-hound-walk_4' },
                { key: 'atlas', frame: 'hell-hound-walk_5' },
                { key: 'atlas', frame: 'hell-hound-walk_6' },
                { key: 'atlas', frame: 'hell-hound-walk_7' },
                { key: 'atlas', frame: 'hell-hound-walk_8' },
                { key: 'atlas', frame: 'hell-hound-walk_9' },
                { key: 'atlas', frame: 'hell-hound-walk_10' },
                { key: 'atlas', frame: 'hell-hound-walk_11' },
            ],
            frameRate: 24,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'horse-galloping',
            frames: [
                { key: 'atlas', frame: 'horse-galloping_0' },
                { key: 'atlas', frame: 'horse-galloping_1' },
                { key: 'atlas', frame: 'horse-galloping_2' },
                { key: 'atlas', frame: 'horse-galloping_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'horse-idle',
            frames: [
                { key: 'atlas', frame: 'horse-idle_0' },
                { key: 'atlas', frame: 'horse-idle_1' },
                { key: 'atlas', frame: 'horse-idle_2' },
                { key: 'atlas', frame: 'horse-idle_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'horseman',
            frames: [
                { key: 'atlas', frame: 'horseman_0' },
                { key: 'atlas', frame: 'horseman_1' },
                { key: 'atlas', frame: 'horseman_2' },
                { key: 'atlas', frame: 'horseman_3' },
                { key: 'atlas', frame: 'horseman_4' },
                { key: 'atlas', frame: 'horseman_5' },
                { key: 'atlas', frame: 'horseman_6' },
                { key: 'atlas', frame: 'horseman_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight-attack',
            frames: [
                { key: 'atlas', frame: 'knight-attack_0' },
                { key: 'atlas', frame: 'knight-attack_1' },
                { key: 'atlas', frame: 'knight-attack_2' },
                { key: 'atlas', frame: 'knight-attack_3' },
                { key: 'atlas', frame: 'knight-attack_4' },
                { key: 'atlas', frame: 'knight-attack_5' },
                { key: 'atlas', frame: 'knight-attack_6' },
                { key: 'atlas', frame: 'knight-attack_7' },
                { key: 'atlas', frame: 'knight-attack_8' },
                { key: 'atlas', frame: 'knight-attack_9' },
                { key: 'atlas', frame: 'knight-attack_10' },
                { key: 'atlas', frame: 'knight-attack_11' },
                { key: 'atlas', frame: 'knight-attack_12' },
                { key: 'atlas', frame: 'knight-attack_13' },
                { key: 'atlas', frame: 'knight-attack_14' },
                { key: 'atlas', frame: 'knight-attack_15' },
                { key: 'atlas', frame: 'knight-attack_16' },
                { key: 'atlas', frame: 'knight-attack_17' },
                { key: 'atlas', frame: 'knight-attack_18' },
                { key: 'atlas', frame: 'knight-attack_19' },
            ],
            frameRate: 40,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight-death',
            frames: [
                { key: 'atlas', frame: 'knight-death_0' },
                { key: 'atlas', frame: 'knight-death_1' },
                { key: 'atlas', frame: 'knight-death_2' },
                { key: 'atlas', frame: 'knight-death_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight-health',
            frames: [
                { key: 'atlas', frame: 'knight-health_0' },
                { key: 'atlas', frame: 'knight-health_1' },
                { key: 'atlas', frame: 'knight-health_2' },
                { key: 'atlas', frame: 'knight-health_3' },
                { key: 'atlas', frame: 'knight-health_4' },
                { key: 'atlas', frame: 'knight-health_5' },
                { key: 'atlas', frame: 'knight-health_6' },
                { key: 'atlas', frame: 'knight-health_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight-hurt',
            frames: [
                { key: 'atlas', frame: 'knight-hurt_0' },
                { key: 'atlas', frame: 'knight-hurt_1' },
                { key: 'atlas', frame: 'knight-hurt_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight-idle',
            frames: [
                { key: 'atlas', frame: 'knight-idle_0' },
                { key: 'atlas', frame: 'knight-idle_1' },
                { key: 'atlas', frame: 'knight-idle_2' },
                { key: 'atlas', frame: 'knight-idle_3' },
                { key: 'atlas', frame: 'knight-idle_4' },
                { key: 'atlas', frame: 'knight-idle_5' },
                { key: 'atlas', frame: 'knight-idle_6' },
                { key: 'atlas', frame: 'knight-idle_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight-roll',
            frames: [
                { key: 'atlas', frame: 'knight-roll_0' },
                { key: 'atlas', frame: 'knight-roll_1' },
                { key: 'atlas', frame: 'knight-roll_2' },
                { key: 'atlas', frame: 'knight-roll_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight-run',
            frames: [
                { key: 'atlas', frame: 'knight-run_0' },
                { key: 'atlas', frame: 'knight-run_1' },
                { key: 'atlas', frame: 'knight-run_2' },
                { key: 'atlas', frame: 'knight-run_3' },
                { key: 'atlas', frame: 'knight-run_4' },
                { key: 'atlas', frame: 'knight-run_5' },
                { key: 'atlas', frame: 'knight-run_6' },
                { key: 'atlas', frame: 'knight-run_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-attack',
            frames: [
                { key: 'atlas', frame: 'knight2-attack_0' },
                { key: 'atlas', frame: 'knight2-attack_1' },
                { key: 'atlas', frame: 'knight2-attack_2' },
                { key: 'atlas', frame: 'knight2-attack_3' },
                { key: 'atlas', frame: 'knight2-attack_4' },
                { key: 'atlas', frame: 'knight2-attack_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-dash',
            frames: [
                { key: 'atlas', frame: 'knight2-dash_0' },
                { key: 'atlas', frame: 'knight2-dash_1' },
                { key: 'atlas', frame: 'knight2-dash_2' },
                { key: 'atlas', frame: 'knight2-dash_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-death',
            frames: [
                { key: 'atlas', frame: 'knight2-death_0' },
                { key: 'atlas', frame: 'knight2-death_1' },
                { key: 'atlas', frame: 'knight2-death_2' },
                { key: 'atlas', frame: 'knight2-death_3' },
                { key: 'atlas', frame: 'knight2-death_4' },
                { key: 'atlas', frame: 'knight2-death_5' },
                { key: 'atlas', frame: 'knight2-death_6' },
                { key: 'atlas', frame: 'knight2-death_7' },
                { key: 'atlas', frame: 'knight2-death_8' },
            ],
            frameRate: 18,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-fall',
            frames: [
                { key: 'atlas', frame: 'knight2-fall_0' },
                { key: 'atlas', frame: 'knight2-fall_1' },
                { key: 'atlas', frame: 'knight2-fall_2' },
                { key: 'atlas', frame: 'knight2-fall_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-hurt',
            frames: [
                { key: 'atlas', frame: 'knight2-hurt_0' },
                { key: 'atlas', frame: 'knight2-hurt_1' },
                { key: 'atlas', frame: 'knight2-hurt_2' },
                { key: 'atlas', frame: 'knight2-hurt_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-idle',
            frames: [
                { key: 'atlas', frame: 'knight2-idle_0' },
                { key: 'atlas', frame: 'knight2-idle_1' },
                { key: 'atlas', frame: 'knight2-idle_2' },
                { key: 'atlas', frame: 'knight2-idle_3' },
                { key: 'atlas', frame: 'knight2-idle_4' },
                { key: 'atlas', frame: 'knight2-idle_5' },
                { key: 'atlas', frame: 'knight2-idle_6' },
                { key: 'atlas', frame: 'knight2-idle_7' },
                { key: 'atlas', frame: 'knight2-idle_8' },
                { key: 'atlas', frame: 'knight2-idle_9' },
                { key: 'atlas', frame: 'knight2-idle_10' },
            ],
            frameRate: 22,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-jump',
            frames: [
                { key: 'atlas', frame: 'knight2-jump_0' },
                { key: 'atlas', frame: 'knight2-jump_1' },
                { key: 'atlas', frame: 'knight2-jump_2' },
                { key: 'atlas', frame: 'knight2-jump_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'knight2-run',
            frames: [
                { key: 'atlas', frame: 'knight2-run_0' },
                { key: 'atlas', frame: 'knight2-run_1' },
                { key: 'atlas', frame: 'knight2-run_2' },
                { key: 'atlas', frame: 'knight2-run_3' },
                { key: 'atlas', frame: 'knight2-run_4' },
                { key: 'atlas', frame: 'knight2-run_5' },
                { key: 'atlas', frame: 'knight2-run_6' },
                { key: 'atlas', frame: 'knight2-run_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'minotaur-attack',
            frames: [
                { key: 'atlas', frame: 'minotaur-attack_0' },
                { key: 'atlas', frame: 'minotaur-attack_1' },
                { key: 'atlas', frame: 'minotaur-attack_2' },
                { key: 'atlas', frame: 'minotaur-attack_3' },
                { key: 'atlas', frame: 'minotaur-attack_4' },
                { key: 'atlas', frame: 'minotaur-attack_5' },
                { key: 'atlas', frame: 'minotaur-attack_6' },
                { key: 'atlas', frame: 'minotaur-attack_7' },
                { key: 'atlas', frame: 'minotaur-attack_8' },
                { key: 'atlas', frame: 'minotaur-attack_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'minotaur-death',
            frames: [
                { key: 'atlas', frame: 'minotaur-death_0' },
                { key: 'atlas', frame: 'minotaur-death_1' },
                { key: 'atlas', frame: 'minotaur-death_2' },
                { key: 'atlas', frame: 'minotaur-death_3' },
                { key: 'atlas', frame: 'minotaur-death_4' },
                { key: 'atlas', frame: 'minotaur-death_5' },
                { key: 'atlas', frame: 'minotaur-death_6' },
                { key: 'atlas', frame: 'minotaur-death_7' },
                { key: 'atlas', frame: 'minotaur-death_8' },
                { key: 'atlas', frame: 'minotaur-death_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'minotaur-gesture',
            frames: [
                { key: 'atlas', frame: 'minotaur-gesture_0' },
                { key: 'atlas', frame: 'minotaur-gesture_1' },
                { key: 'atlas', frame: 'minotaur-gesture_2' },
                { key: 'atlas', frame: 'minotaur-gesture_3' },
                { key: 'atlas', frame: 'minotaur-gesture_4' },
                { key: 'atlas', frame: 'minotaur-gesture_5' },
                { key: 'atlas', frame: 'minotaur-gesture_6' },
                { key: 'atlas', frame: 'minotaur-gesture_7' },
                { key: 'atlas', frame: 'minotaur-gesture_8' },
                { key: 'atlas', frame: 'minotaur-gesture_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'minotaur-idle',
            frames: [
                { key: 'atlas', frame: 'minotaur-idle_0' },
                { key: 'atlas', frame: 'minotaur-idle_1' },
                { key: 'atlas', frame: 'minotaur-idle_2' },
                { key: 'atlas', frame: 'minotaur-idle_3' },
                { key: 'atlas', frame: 'minotaur-idle_4' },
                { key: 'atlas', frame: 'minotaur-idle_5' },
                { key: 'atlas', frame: 'minotaur-idle_6' },
                { key: 'atlas', frame: 'minotaur-idle_7' },
                { key: 'atlas', frame: 'minotaur-idle_8' },
                { key: 'atlas', frame: 'minotaur-idle_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'minotaur-walk',
            frames: [
                { key: 'atlas', frame: 'minotaur-walk_0' },
                { key: 'atlas', frame: 'minotaur-walk_1' },
                { key: 'atlas', frame: 'minotaur-walk_2' },
                { key: 'atlas', frame: 'minotaur-walk_3' },
                { key: 'atlas', frame: 'minotaur-walk_4' },
                { key: 'atlas', frame: 'minotaur-walk_5' },
                { key: 'atlas', frame: 'minotaur-walk_6' },
                { key: 'atlas', frame: 'minotaur-walk_7' },
                { key: 'atlas', frame: 'minotaur-walk_8' },
                { key: 'atlas', frame: 'minotaur-walk_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'night-borne-attack',
            frames: [
                { key: 'atlas', frame: 'night-borne-attack_0' },
                { key: 'atlas', frame: 'night-borne-attack_1' },
                { key: 'atlas', frame: 'night-borne-attack_2' },
                { key: 'atlas', frame: 'night-borne-attack_3' },
                { key: 'atlas', frame: 'night-borne-attack_4' },
                { key: 'atlas', frame: 'night-borne-attack_5' },
                { key: 'atlas', frame: 'night-borne-attack_6' },
                { key: 'atlas', frame: 'night-borne-attack_7' },
                { key: 'atlas', frame: 'night-borne-attack_8' },
                { key: 'atlas', frame: 'night-borne-attack_9' },
                { key: 'atlas', frame: 'night-borne-attack_10' },
                { key: 'atlas', frame: 'night-borne-attack_11' },
            ],
            frameRate: 24,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'night-borne-death',
            frames: [
                { key: 'atlas', frame: 'night-borne-death_0' },
                { key: 'atlas', frame: 'night-borne-death_1' },
                { key: 'atlas', frame: 'night-borne-death_2' },
                { key: 'atlas', frame: 'night-borne-death_3' },
                { key: 'atlas', frame: 'night-borne-death_4' },
                { key: 'atlas', frame: 'night-borne-death_5' },
                { key: 'atlas', frame: 'night-borne-death_6' },
                { key: 'atlas', frame: 'night-borne-death_7' },
                { key: 'atlas', frame: 'night-borne-death_8' },
                { key: 'atlas', frame: 'night-borne-death_9' },
                { key: 'atlas', frame: 'night-borne-death_10' },
                { key: 'atlas', frame: 'night-borne-death_11' },
                { key: 'atlas', frame: 'night-borne-death_12' },
                { key: 'atlas', frame: 'night-borne-death_13' },
                { key: 'atlas', frame: 'night-borne-death_14' },
                { key: 'atlas', frame: 'night-borne-death_15' },
                { key: 'atlas', frame: 'night-borne-death_16' },
                { key: 'atlas', frame: 'night-borne-death_17' },
                { key: 'atlas', frame: 'night-borne-death_18' },
                { key: 'atlas', frame: 'night-borne-death_19' },
                { key: 'atlas', frame: 'night-borne-death_20' },
                { key: 'atlas', frame: 'night-borne-death_21' },
                { key: 'atlas', frame: 'night-borne-death_22' },
            ],
            frameRate: 46,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'night-borne-hurt',
            frames: [
                { key: 'atlas', frame: 'night-borne-hurt_0' },
                { key: 'atlas', frame: 'night-borne-hurt_1' },
                { key: 'atlas', frame: 'night-borne-hurt_2' },
                { key: 'atlas', frame: 'night-borne-hurt_3' },
                { key: 'atlas', frame: 'night-borne-hurt_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'night-borne-idle',
            frames: [
                { key: 'atlas', frame: 'night-borne-idle_0' },
                { key: 'atlas', frame: 'night-borne-idle_1' },
                { key: 'atlas', frame: 'night-borne-idle_2' },
                { key: 'atlas', frame: 'night-borne-idle_3' },
                { key: 'atlas', frame: 'night-borne-idle_4' },
                { key: 'atlas', frame: 'night-borne-idle_5' },
                { key: 'atlas', frame: 'night-borne-idle_6' },
                { key: 'atlas', frame: 'night-borne-idle_7' },
                { key: 'atlas', frame: 'night-borne-idle_8' },
            ],
            frameRate: 18,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'night-borne-run',
            frames: [
                { key: 'atlas', frame: 'night-borne-run_0' },
                { key: 'atlas', frame: 'night-borne-run_1' },
                { key: 'atlas', frame: 'night-borne-run_2' },
                { key: 'atlas', frame: 'night-borne-run_3' },
                { key: 'atlas', frame: 'night-borne-run_4' },
                { key: 'atlas', frame: 'night-borne-run_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-attack1',
            frames: [
                { key: 'atlas', frame: 'samurai-attack1_0' },
                { key: 'atlas', frame: 'samurai-attack1_1' },
                { key: 'atlas', frame: 'samurai-attack1_2' },
                { key: 'atlas', frame: 'samurai-attack1_3' },
                { key: 'atlas', frame: 'samurai-attack1_4' },
                { key: 'atlas', frame: 'samurai-attack1_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-attack2',
            frames: [
                { key: 'atlas', frame: 'samurai-attack2_0' },
                { key: 'atlas', frame: 'samurai-attack2_1' },
                { key: 'atlas', frame: 'samurai-attack2_2' },
                { key: 'atlas', frame: 'samurai-attack2_3' },
                { key: 'atlas', frame: 'samurai-attack2_4' },
                { key: 'atlas', frame: 'samurai-attack2_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-death',
            frames: [
                { key: 'atlas', frame: 'samurai-death_0' },
                { key: 'atlas', frame: 'samurai-death_1' },
                { key: 'atlas', frame: 'samurai-death_2' },
                { key: 'atlas', frame: 'samurai-death_3' },
                { key: 'atlas', frame: 'samurai-death_4' },
                { key: 'atlas', frame: 'samurai-death_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-fall',
            frames: [
                { key: 'atlas', frame: 'samurai-fall_0' },
                { key: 'atlas', frame: 'samurai-fall_1' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-hurt2',
            frames: [
                { key: 'atlas', frame: 'samurai-hurt2_0' },
                { key: 'atlas', frame: 'samurai-hurt2_1' },
                { key: 'atlas', frame: 'samurai-hurt2_2' },
                { key: 'atlas', frame: 'samurai-hurt2_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-hurt',
            frames: [
                { key: 'atlas', frame: 'samurai-hurt_0' },
                { key: 'atlas', frame: 'samurai-hurt_1' },
                { key: 'atlas', frame: 'samurai-hurt_2' },
                { key: 'atlas', frame: 'samurai-hurt_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-idle',
            frames: [
                { key: 'atlas', frame: 'samurai-idle_0' },
                { key: 'atlas', frame: 'samurai-idle_1' },
                { key: 'atlas', frame: 'samurai-idle_2' },
                { key: 'atlas', frame: 'samurai-idle_3' },
                { key: 'atlas', frame: 'samurai-idle_4' },
                { key: 'atlas', frame: 'samurai-idle_5' },
                { key: 'atlas', frame: 'samurai-idle_6' },
                { key: 'atlas', frame: 'samurai-idle_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-jump',
            frames: [
                { key: 'atlas', frame: 'samurai-jump_0' },
                { key: 'atlas', frame: 'samurai-jump_1' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'samurai-run',
            frames: [
                { key: 'atlas', frame: 'samurai-run_0' },
                { key: 'atlas', frame: 'samurai-run_1' },
                { key: 'atlas', frame: 'samurai-run_2' },
                { key: 'atlas', frame: 'samurai-run_3' },
                { key: 'atlas', frame: 'samurai-run_4' },
                { key: 'atlas', frame: 'samurai-run_5' },
                { key: 'atlas', frame: 'samurai-run_6' },
                { key: 'atlas', frame: 'samurai-run_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'saw',
            frames: [
                { key: 'atlas', frame: 'saw_0' },
                { key: 'atlas', frame: 'saw_1' },
                { key: 'atlas', frame: 'saw_2' },
                { key: 'atlas', frame: 'saw_3' },
                { key: 'atlas', frame: 'saw_4' },
                { key: 'atlas', frame: 'saw_5' },
                { key: 'atlas', frame: 'saw_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'shadow-attack',
            frames: [
                { key: 'atlas', frame: 'shadow-attack_0' },
                { key: 'atlas', frame: 'shadow-attack_1' },
                { key: 'atlas', frame: 'shadow-attack_2' },
                { key: 'atlas', frame: 'shadow-attack_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'shadow-rise',
            frames: [
                { key: 'atlas', frame: 'shadow-rise_0' },
                { key: 'atlas', frame: 'shadow-rise_1' },
                { key: 'atlas', frame: 'shadow-rise_2' },
                { key: 'atlas', frame: 'shadow-rise_3' },
                { key: 'atlas', frame: 'shadow-rise_4' },
                { key: 'atlas', frame: 'shadow-rise_5' },
                { key: 'atlas', frame: 'shadow-rise_6' },
                { key: 'atlas', frame: 'shadow-rise_7' },
                { key: 'atlas', frame: 'shadow-rise_8' },
                { key: 'atlas', frame: 'shadow-rise_9' },
                { key: 'atlas', frame: 'shadow-rise_10' },
                { key: 'atlas', frame: 'shadow-rise_11' },
                { key: 'atlas', frame: 'shadow-rise_12' },
                { key: 'atlas', frame: 'shadow-rise_13' },
            ],
            frameRate: 28,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-flail-attack',
            frames: [
                { key: 'atlas', frame: 'skeleton-flail-attack_0' },
                { key: 'atlas', frame: 'skeleton-flail-attack_1' },
                { key: 'atlas', frame: 'skeleton-flail-attack_2' },
                { key: 'atlas', frame: 'skeleton-flail-attack_3' },
                { key: 'atlas', frame: 'skeleton-flail-attack_4' },
                { key: 'atlas', frame: 'skeleton-flail-attack_5' },
                { key: 'atlas', frame: 'skeleton-flail-attack_6' },
                { key: 'atlas', frame: 'skeleton-flail-attack_7' },
                { key: 'atlas', frame: 'skeleton-flail-attack_8' },
                { key: 'atlas', frame: 'skeleton-flail-attack_9' },
                { key: 'atlas', frame: 'skeleton-flail-attack_10' },
                { key: 'atlas', frame: 'skeleton-flail-attack_11' },
                { key: 'atlas', frame: 'skeleton-flail-attack_12' },
            ],
            frameRate: 26,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-flail-death',
            frames: [
                { key: 'atlas', frame: 'skeleton-flail-death_0' },
                { key: 'atlas', frame: 'skeleton-flail-death_1' },
                { key: 'atlas', frame: 'skeleton-flail-death_2' },
                { key: 'atlas', frame: 'skeleton-flail-death_3' },
                { key: 'atlas', frame: 'skeleton-flail-death_4' },
                { key: 'atlas', frame: 'skeleton-flail-death_5' },
                { key: 'atlas', frame: 'skeleton-flail-death_6' },
                { key: 'atlas', frame: 'skeleton-flail-death_7' },
                { key: 'atlas', frame: 'skeleton-flail-death_8' },
                { key: 'atlas', frame: 'skeleton-flail-death_9' },
                { key: 'atlas', frame: 'skeleton-flail-death_10' },
                { key: 'atlas', frame: 'skeleton-flail-death_11' },
                { key: 'atlas', frame: 'skeleton-flail-death_12' },
            ],
            frameRate: 26,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-flail-hurt',
            frames: [
                { key: 'atlas', frame: 'skeleton-flail-hurt_0' },
                { key: 'atlas', frame: 'skeleton-flail-hurt_1' },
                { key: 'atlas', frame: 'skeleton-flail-hurt_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-flail-idle',
            frames: [
                { key: 'atlas', frame: 'skeleton-flail-idle_0' },
                { key: 'atlas', frame: 'skeleton-flail-idle_1' },
                { key: 'atlas', frame: 'skeleton-flail-idle_2' },
                { key: 'atlas', frame: 'skeleton-flail-idle_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-flail-walk',
            frames: [
                { key: 'atlas', frame: 'skeleton-flail-walk_0' },
                { key: 'atlas', frame: 'skeleton-flail-walk_1' },
                { key: 'atlas', frame: 'skeleton-flail-walk_2' },
                { key: 'atlas', frame: 'skeleton-flail-walk_3' },
                { key: 'atlas', frame: 'skeleton-flail-walk_4' },
                { key: 'atlas', frame: 'skeleton-flail-walk_5' },
                { key: 'atlas', frame: 'skeleton-flail-walk_6' },
                { key: 'atlas', frame: 'skeleton-flail-walk_7' },
                { key: 'atlas', frame: 'skeleton-flail-walk_8' },
                { key: 'atlas', frame: 'skeleton-flail-walk_9' },
                { key: 'atlas', frame: 'skeleton-flail-walk_10' },
                { key: 'atlas', frame: 'skeleton-flail-walk_11' },
            ],
            frameRate: 24,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-skeeker-attack',
            frames: [
                { key: 'atlas', frame: 'skeleton-skeeker-attack_0' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_1' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_2' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_3' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_4' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_5' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_6' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_7' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_8' },
                { key: 'atlas', frame: 'skeleton-skeeker-attack_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-skeeker-death',
            frames: [
                { key: 'atlas', frame: 'skeleton-skeeker-death_0' },
                { key: 'atlas', frame: 'skeleton-skeeker-death_1' },
                { key: 'atlas', frame: 'skeleton-skeeker-death_2' },
                { key: 'atlas', frame: 'skeleton-skeeker-death_3' },
                { key: 'atlas', frame: 'skeleton-skeeker-death_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-skeeker-hurt',
            frames: [
                { key: 'atlas', frame: 'skeleton-skeeker-hurt_0' },
                { key: 'atlas', frame: 'skeleton-skeeker-hurt_1' },
                { key: 'atlas', frame: 'skeleton-skeeker-hurt_2' },
                { key: 'atlas', frame: 'skeleton-skeeker-hurt_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-skeeker-idle',
            frames: [
                { key: 'atlas', frame: 'skeleton-skeeker-idle_0' },
                { key: 'atlas', frame: 'skeleton-skeeker-idle_1' },
                { key: 'atlas', frame: 'skeleton-skeeker-idle_2' },
                { key: 'atlas', frame: 'skeleton-skeeker-idle_3' },
                { key: 'atlas', frame: 'skeleton-skeeker-idle_4' },
                { key: 'atlas', frame: 'skeleton-skeeker-idle_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-skeeker-spawn',
            frames: [
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_0' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_1' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_2' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_3' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_4' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_5' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_6' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_7' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_8' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_9' },
                { key: 'atlas', frame: 'skeleton-skeeker-spawn_10' },
            ],
            frameRate: 22,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-skeeker-walk',
            frames: [
                { key: 'atlas', frame: 'skeleton-skeeker-walk_0' },
                { key: 'atlas', frame: 'skeleton-skeeker-walk_1' },
                { key: 'atlas', frame: 'skeleton-skeeker-walk_2' },
                { key: 'atlas', frame: 'skeleton-skeeker-walk_3' },
                { key: 'atlas', frame: 'skeleton-skeeker-walk_4' },
                { key: 'atlas', frame: 'skeleton-skeeker-walk_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skull',
            frames: [
                { key: 'atlas', frame: 'skull_0' },
                { key: 'atlas', frame: 'skull_1' },
                { key: 'atlas', frame: 'skull_2' },
                { key: 'atlas', frame: 'skull_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-attack1',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-attack1_0' },
                { key: 'atlas', frame: 'tiny-wizard-attack1_1' },
                { key: 'atlas', frame: 'tiny-wizard-attack1_2' },
                { key: 'atlas', frame: 'tiny-wizard-attack1_3' },
                { key: 'atlas', frame: 'tiny-wizard-attack1_4' },
                { key: 'atlas', frame: 'tiny-wizard-attack1_5' },
                { key: 'atlas', frame: 'tiny-wizard-attack1_6' },
                { key: 'atlas', frame: 'tiny-wizard-attack1_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-attack2',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-attack2_0' },
                { key: 'atlas', frame: 'tiny-wizard-attack2_1' },
                { key: 'atlas', frame: 'tiny-wizard-attack2_2' },
                { key: 'atlas', frame: 'tiny-wizard-attack2_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-attack3',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-attack3_0' },
                { key: 'atlas', frame: 'tiny-wizard-attack3_1' },
                { key: 'atlas', frame: 'tiny-wizard-attack3_2' },
                { key: 'atlas', frame: 'tiny-wizard-attack3_3' },
                { key: 'atlas', frame: 'tiny-wizard-attack3_4' },
                { key: 'atlas', frame: 'tiny-wizard-attack3_5' },
                { key: 'atlas', frame: 'tiny-wizard-attack3_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-cast',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-cast_0' },
                { key: 'atlas', frame: 'tiny-wizard-cast_1' },
                { key: 'atlas', frame: 'tiny-wizard-cast_2' },
                { key: 'atlas', frame: 'tiny-wizard-cast_3' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-death',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-death_0' },
                { key: 'atlas', frame: 'tiny-wizard-death_1' },
                { key: 'atlas', frame: 'tiny-wizard-death_2' },
                { key: 'atlas', frame: 'tiny-wizard-death_3' },
                { key: 'atlas', frame: 'tiny-wizard-death_4' },
                { key: 'atlas', frame: 'tiny-wizard-death_5' },
                { key: 'atlas', frame: 'tiny-wizard-death_6' },
                { key: 'atlas', frame: 'tiny-wizard-death_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-emote',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-emote_0' },
                { key: 'atlas', frame: 'tiny-wizard-emote_1' },
                { key: 'atlas', frame: 'tiny-wizard-emote_2' },
                { key: 'atlas', frame: 'tiny-wizard-emote_3' },
                { key: 'atlas', frame: 'tiny-wizard-emote_4' },
                { key: 'atlas', frame: 'tiny-wizard-emote_5' },
                { key: 'atlas', frame: 'tiny-wizard-emote_6' },
                { key: 'atlas', frame: 'tiny-wizard-emote_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-idle',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-idle_0' },
                { key: 'atlas', frame: 'tiny-wizard-idle_1' },
                { key: 'atlas', frame: 'tiny-wizard-idle_2' },
                { key: 'atlas', frame: 'tiny-wizard-idle_3' },
                { key: 'atlas', frame: 'tiny-wizard-idle_4' },
                { key: 'atlas', frame: 'tiny-wizard-idle_5' },
                { key: 'atlas', frame: 'tiny-wizard-idle_6' },
                { key: 'atlas', frame: 'tiny-wizard-idle_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-jump',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-jump_0' },
                { key: 'atlas', frame: 'tiny-wizard-jump_1' },
                { key: 'atlas', frame: 'tiny-wizard-jump_2' },
                { key: 'atlas', frame: 'tiny-wizard-jump_3' },
                { key: 'atlas', frame: 'tiny-wizard-jump_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'tiny-wizard-walk',
            frames: [
                { key: 'atlas', frame: 'tiny-wizard-walk_0' },
                { key: 'atlas', frame: 'tiny-wizard-walk_1' },
                { key: 'atlas', frame: 'tiny-wizard-walk_2' },
                { key: 'atlas', frame: 'tiny-wizard-walk_3' },
                { key: 'atlas', frame: 'tiny-wizard-walk_4' },
                { key: 'atlas', frame: 'tiny-wizard-walk_5' },
                { key: 'atlas', frame: 'tiny-wizard-walk_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-attack',
            frames: [
                { key: 'atlas', frame: 'viking-attack_0' },
                { key: 'atlas', frame: 'viking-attack_1' },
                { key: 'atlas', frame: 'viking-attack_2' },
                { key: 'atlas', frame: 'viking-attack_3' },
                { key: 'atlas', frame: 'viking-attack_4' },
                { key: 'atlas', frame: 'viking-attack_5' },
                { key: 'atlas', frame: 'viking-attack_6' },
                { key: 'atlas', frame: 'viking-attack_7' },
                { key: 'atlas', frame: 'viking-attack_8' },
            ],
            frameRate: 18,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-death',
            frames: [
                { key: 'atlas', frame: 'viking-death_0' },
                { key: 'atlas', frame: 'viking-death_1' },
                { key: 'atlas', frame: 'viking-death_2' },
                { key: 'atlas', frame: 'viking-death_3' },
                { key: 'atlas', frame: 'viking-death_4' },
                { key: 'atlas', frame: 'viking-death_5' },
                { key: 'atlas', frame: 'viking-death_6' },
                { key: 'atlas', frame: 'viking-death_7' },
                { key: 'atlas', frame: 'viking-death_8' },
            ],
            frameRate: 18,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-idle',
            frames: [
                { key: 'atlas', frame: 'viking-idle_0' },
                { key: 'atlas', frame: 'viking-idle_1' },
                { key: 'atlas', frame: 'viking-idle_2' },
                { key: 'atlas', frame: 'viking-idle_3' },
                { key: 'atlas', frame: 'viking-idle_4' },
                { key: 'atlas', frame: 'viking-idle_5' },
                { key: 'atlas', frame: 'viking-idle_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-jump',
            frames: [
                { key: 'atlas', frame: 'viking-jump_0' },
                { key: 'atlas', frame: 'viking-jump_1' },
                { key: 'atlas', frame: 'viking-jump_2' },
                { key: 'atlas', frame: 'viking-jump_3' },
                { key: 'atlas', frame: 'viking-jump_4' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-run',
            frames: [
                { key: 'atlas', frame: 'viking-run_0' },
                { key: 'atlas', frame: 'viking-run_1' },
                { key: 'atlas', frame: 'viking-run_2' },
                { key: 'atlas', frame: 'viking-run_3' },
                { key: 'atlas', frame: 'viking-run_4' },
                { key: 'atlas', frame: 'viking-run_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'water-element',
            frames: [
                { key: 'atlas', frame: 'water-element_0' },
                { key: 'atlas', frame: 'water-element_1' },
                { key: 'atlas', frame: 'water-element_2' },
                { key: 'atlas', frame: 'water-element_3' },
                { key: 'atlas', frame: 'water-element_4' },
                { key: 'atlas', frame: 'water-element_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenAttack1',
            frames: [
                { key: 'atlas', frame: 'waterQueenAttack1_0' },
                { key: 'atlas', frame: 'waterQueenAttack1_1' },
                { key: 'atlas', frame: 'waterQueenAttack1_2' },
                { key: 'atlas', frame: 'waterQueenAttack1_3' },
                { key: 'atlas', frame: 'waterQueenAttack1_4' },
                { key: 'atlas', frame: 'waterQueenAttack1_5' },
                { key: 'atlas', frame: 'waterQueenAttack1_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenAttack2',
            frames: [
                { key: 'atlas', frame: 'waterQueenAttack2_0' },
                { key: 'atlas', frame: 'waterQueenAttack2_1' },
                { key: 'atlas', frame: 'waterQueenAttack2_2' },
                { key: 'atlas', frame: 'waterQueenAttack2_3' },
                { key: 'atlas', frame: 'waterQueenAttack2_4' },
                { key: 'atlas', frame: 'waterQueenAttack2_5' },
                { key: 'atlas', frame: 'waterQueenAttack2_6' },
                { key: 'atlas', frame: 'waterQueenAttack2_7' },
                { key: 'atlas', frame: 'waterQueenAttack2_8' },
                { key: 'atlas', frame: 'waterQueenAttack2_9' },
                { key: 'atlas', frame: 'waterQueenAttack2_10' },
                { key: 'atlas', frame: 'waterQueenAttack2_11' },
                { key: 'atlas', frame: 'waterQueenAttack2_12' },
                { key: 'atlas', frame: 'waterQueenAttack2_13' },
                { key: 'atlas', frame: 'waterQueenAttack2_14' },
                { key: 'atlas', frame: 'waterQueenAttack2_15' },
                { key: 'atlas', frame: 'waterQueenAttack2_16' },
                { key: 'atlas', frame: 'waterQueenAttack2_17' },
                { key: 'atlas', frame: 'waterQueenAttack2_18' },
                { key: 'atlas', frame: 'waterQueenAttack2_19' },
                { key: 'atlas', frame: 'waterQueenAttack2_20' },
            ],
            frameRate: 42,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenAttack3',
            frames: [
                { key: 'atlas', frame: 'waterQueenAttack3_0' },
                { key: 'atlas', frame: 'waterQueenAttack3_1' },
                { key: 'atlas', frame: 'waterQueenAttack3_2' },
                { key: 'atlas', frame: 'waterQueenAttack3_3' },
                { key: 'atlas', frame: 'waterQueenAttack3_4' },
                { key: 'atlas', frame: 'waterQueenAttack3_5' },
                { key: 'atlas', frame: 'waterQueenAttack3_6' },
                { key: 'atlas', frame: 'waterQueenAttack3_7' },
                { key: 'atlas', frame: 'waterQueenAttack3_8' },
                { key: 'atlas', frame: 'waterQueenAttack3_9' },
                { key: 'atlas', frame: 'waterQueenAttack3_10' },
                { key: 'atlas', frame: 'waterQueenAttack3_11' },
                { key: 'atlas', frame: 'waterQueenAttack3_12' },
                { key: 'atlas', frame: 'waterQueenAttack3_13' },
                { key: 'atlas', frame: 'waterQueenAttack3_14' },
                { key: 'atlas', frame: 'waterQueenAttack3_15' },
                { key: 'atlas', frame: 'waterQueenAttack3_16' },
                { key: 'atlas', frame: 'waterQueenAttack3_17' },
                { key: 'atlas', frame: 'waterQueenAttack3_18' },
                { key: 'atlas', frame: 'waterQueenAttack3_19' },
                { key: 'atlas', frame: 'waterQueenAttack3_20' },
                { key: 'atlas', frame: 'waterQueenAttack3_21' },
                { key: 'atlas', frame: 'waterQueenAttack3_22' },
                { key: 'atlas', frame: 'waterQueenAttack3_23' },
                { key: 'atlas', frame: 'waterQueenAttack3_24' },
                { key: 'atlas', frame: 'waterQueenAttack3_25' },
                { key: 'atlas', frame: 'waterQueenAttack3_26' },
            ],
            frameRate: 54,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenAttack4',
            frames: [
                { key: 'atlas', frame: 'waterQueenAttack4_0' },
                { key: 'atlas', frame: 'waterQueenAttack4_1' },
                { key: 'atlas', frame: 'waterQueenAttack4_2' },
                { key: 'atlas', frame: 'waterQueenAttack4_3' },
                { key: 'atlas', frame: 'waterQueenAttack4_4' },
                { key: 'atlas', frame: 'waterQueenAttack4_5' },
                { key: 'atlas', frame: 'waterQueenAttack4_6' },
                { key: 'atlas', frame: 'waterQueenAttack4_7' },
                { key: 'atlas', frame: 'waterQueenAttack4_8' },
                { key: 'atlas', frame: 'waterQueenAttack4_9' },
                { key: 'atlas', frame: 'waterQueenAttack4_10' },
                { key: 'atlas', frame: 'waterQueenAttack4_11' },
                { key: 'atlas', frame: 'waterQueenAttack4_12' },
                { key: 'atlas', frame: 'waterQueenAttack4_13' },
                { key: 'atlas', frame: 'waterQueenAttack4_14' },
                { key: 'atlas', frame: 'waterQueenAttack4_15' },
                { key: 'atlas', frame: 'waterQueenAttack4_16' },
                { key: 'atlas', frame: 'waterQueenAttack4_17' },
                { key: 'atlas', frame: 'waterQueenAttack4_18' },
                { key: 'atlas', frame: 'waterQueenAttack4_19' },
                { key: 'atlas', frame: 'waterQueenAttack4_20' },
                { key: 'atlas', frame: 'waterQueenAttack4_21' },
                { key: 'atlas', frame: 'waterQueenAttack4_22' },
                { key: 'atlas', frame: 'waterQueenAttack4_23' },
                { key: 'atlas', frame: 'waterQueenAttack4_24' },
                { key: 'atlas', frame: 'waterQueenAttack4_25' },
                { key: 'atlas', frame: 'waterQueenAttack4_26' },
                { key: 'atlas', frame: 'waterQueenAttack4_27' },
                { key: 'atlas', frame: 'waterQueenAttack4_28' },
                { key: 'atlas', frame: 'waterQueenAttack4_29' },
                { key: 'atlas', frame: 'waterQueenAttack4_30' },
                { key: 'atlas', frame: 'waterQueenAttack4_31' },
            ],
            frameRate: 64,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenDeath',
            frames: [
                { key: 'atlas', frame: 'waterQueenDeath_0' },
                { key: 'atlas', frame: 'waterQueenDeath_1' },
                { key: 'atlas', frame: 'waterQueenDeath_2' },
                { key: 'atlas', frame: 'waterQueenDeath_3' },
                { key: 'atlas', frame: 'waterQueenDeath_4' },
                { key: 'atlas', frame: 'waterQueenDeath_5' },
                { key: 'atlas', frame: 'waterQueenDeath_6' },
                { key: 'atlas', frame: 'waterQueenDeath_7' },
                { key: 'atlas', frame: 'waterQueenDeath_8' },
                { key: 'atlas', frame: 'waterQueenDeath_9' },
                { key: 'atlas', frame: 'waterQueenDeath_10' },
                { key: 'atlas', frame: 'waterQueenDeath_11' },
                { key: 'atlas', frame: 'waterQueenDeath_12' },
                { key: 'atlas', frame: 'waterQueenDeath_13' },
                { key: 'atlas', frame: 'waterQueenDeath_14' },
                { key: 'atlas', frame: 'waterQueenDeath_15' },
            ],
            frameRate: 32,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenDefend',
            frames: [
                { key: 'atlas', frame: 'waterQueenDefend_0' },
                { key: 'atlas', frame: 'waterQueenDefend_1' },
                { key: 'atlas', frame: 'waterQueenDefend_2' },
                { key: 'atlas', frame: 'waterQueenDefend_3' },
                { key: 'atlas', frame: 'waterQueenDefend_4' },
                { key: 'atlas', frame: 'waterQueenDefend_5' },
                { key: 'atlas', frame: 'waterQueenDefend_6' },
                { key: 'atlas', frame: 'waterQueenDefend_7' },
                { key: 'atlas', frame: 'waterQueenDefend_8' },
                { key: 'atlas', frame: 'waterQueenDefend_9' },
                { key: 'atlas', frame: 'waterQueenDefend_10' },
                { key: 'atlas', frame: 'waterQueenDefend_11' },
            ],
            frameRate: 24,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenFall',
            frames: [
                { key: 'atlas', frame: 'waterQueenFall_0' },
                { key: 'atlas', frame: 'waterQueenFall_1' },
                { key: 'atlas', frame: 'waterQueenFall_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenHeal',
            frames: [
                { key: 'atlas', frame: 'waterQueenHeal_0' },
                { key: 'atlas', frame: 'waterQueenHeal_1' },
                { key: 'atlas', frame: 'waterQueenHeal_2' },
                { key: 'atlas', frame: 'waterQueenHeal_3' },
                { key: 'atlas', frame: 'waterQueenHeal_4' },
                { key: 'atlas', frame: 'waterQueenHeal_5' },
                { key: 'atlas', frame: 'waterQueenHeal_6' },
                { key: 'atlas', frame: 'waterQueenHeal_7' },
                { key: 'atlas', frame: 'waterQueenHeal_8' },
                { key: 'atlas', frame: 'waterQueenHeal_9' },
                { key: 'atlas', frame: 'waterQueenHeal_10' },
                { key: 'atlas', frame: 'waterQueenHeal_11' },
            ],
            frameRate: 24,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenHurt',
            frames: [
                { key: 'atlas', frame: 'waterQueenHurt_0' },
                { key: 'atlas', frame: 'waterQueenHurt_1' },
                { key: 'atlas', frame: 'waterQueenHurt_2' },
                { key: 'atlas', frame: 'waterQueenHurt_3' },
                { key: 'atlas', frame: 'waterQueenHurt_4' },
                { key: 'atlas', frame: 'waterQueenHurt_5' },
                { key: 'atlas', frame: 'waterQueenHurt_6' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenIdle',
            frames: [
                { key: 'atlas', frame: 'waterQueenIdle_0' },
                { key: 'atlas', frame: 'waterQueenIdle_1' },
                { key: 'atlas', frame: 'waterQueenIdle_2' },
                { key: 'atlas', frame: 'waterQueenIdle_3' },
                { key: 'atlas', frame: 'waterQueenIdle_4' },
                { key: 'atlas', frame: 'waterQueenIdle_5' },
                { key: 'atlas', frame: 'waterQueenIdle_6' },
                { key: 'atlas', frame: 'waterQueenIdle_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenJump',
            frames: [
                { key: 'atlas', frame: 'waterQueenJump_0' },
                { key: 'atlas', frame: 'waterQueenJump_1' },
                { key: 'atlas', frame: 'waterQueenJump_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenSurf',
            frames: [
                { key: 'atlas', frame: 'waterQueenSurf_0' },
                { key: 'atlas', frame: 'waterQueenSurf_1' },
                { key: 'atlas', frame: 'waterQueenSurf_2' },
                { key: 'atlas', frame: 'waterQueenSurf_3' },
                { key: 'atlas', frame: 'waterQueenSurf_4' },
                { key: 'atlas', frame: 'waterQueenSurf_5' },
                { key: 'atlas', frame: 'waterQueenSurf_6' },
                { key: 'atlas', frame: 'waterQueenSurf_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenTumble',
            frames: [
                { key: 'atlas', frame: 'waterQueenTumble_0' },
                { key: 'atlas', frame: 'waterQueenTumble_1' },
                { key: 'atlas', frame: 'waterQueenTumble_2' },
                { key: 'atlas', frame: 'waterQueenTumble_3' },
                { key: 'atlas', frame: 'waterQueenTumble_4' },
                { key: 'atlas', frame: 'waterQueenTumble_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'waterQueenWalk',
            frames: [
                { key: 'atlas', frame: 'waterQueenWalk_0' },
                { key: 'atlas', frame: 'waterQueenWalk_1' },
                { key: 'atlas', frame: 'waterQueenWalk_2' },
                { key: 'atlas', frame: 'waterQueenWalk_3' },
                { key: 'atlas', frame: 'waterQueenWalk_4' },
                { key: 'atlas', frame: 'waterQueenWalk_5' },
                { key: 'atlas', frame: 'waterQueenWalk_6' },
                { key: 'atlas', frame: 'waterQueenWalk_7' },
                { key: 'atlas', frame: 'waterQueenWalk_8' },
                { key: 'atlas', frame: 'waterQueenWalk_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'wizard-fire',
            frames: [
                { key: 'atlas', frame: 'wizard-fire_0' },
                { key: 'atlas', frame: 'wizard-fire_1' },
                { key: 'atlas', frame: 'wizard-fire_2' },
                { key: 'atlas', frame: 'wizard-fire_3' },
                { key: 'atlas', frame: 'wizard-fire_4' },
                { key: 'atlas', frame: 'wizard-fire_5' },
                { key: 'atlas', frame: 'wizard-fire_6' },
                { key: 'atlas', frame: 'wizard-fire_7' },
                { key: 'atlas', frame: 'wizard-fire_8' },
                { key: 'atlas', frame: 'wizard-fire_9' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'worm-attack',
            frames: [
                { key: 'atlas', frame: 'worm-attack_0' },
                { key: 'atlas', frame: 'worm-attack_1' },
                { key: 'atlas', frame: 'worm-attack_2' },
                { key: 'atlas', frame: 'worm-attack_3' },
                { key: 'atlas', frame: 'worm-attack_4' },
                { key: 'atlas', frame: 'worm-attack_5' },
                { key: 'atlas', frame: 'worm-attack_6' },
                { key: 'atlas', frame: 'worm-attack_7' },
                { key: 'atlas', frame: 'worm-attack_8' },
                { key: 'atlas', frame: 'worm-attack_9' },
                { key: 'atlas', frame: 'worm-attack_10' },
                { key: 'atlas', frame: 'worm-attack_11' },
                { key: 'atlas', frame: 'worm-attack_12' },
                { key: 'atlas', frame: 'worm-attack_13' },
                { key: 'atlas', frame: 'worm-attack_14' },
                { key: 'atlas', frame: 'worm-attack_15' },
            ],
            frameRate: 32,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'worm-death',
            frames: [
                { key: 'atlas', frame: 'worm-death_0' },
                { key: 'atlas', frame: 'worm-death_1' },
                { key: 'atlas', frame: 'worm-death_2' },
                { key: 'atlas', frame: 'worm-death_3' },
                { key: 'atlas', frame: 'worm-death_4' },
                { key: 'atlas', frame: 'worm-death_5' },
                { key: 'atlas', frame: 'worm-death_6' },
                { key: 'atlas', frame: 'worm-death_7' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'worm-fireball-end',
            frames: [
                { key: 'atlas', frame: 'worm-fireball-end_0' },
                { key: 'atlas', frame: 'worm-fireball-end_1' },
                { key: 'atlas', frame: 'worm-fireball-end_2' },
                { key: 'atlas', frame: 'worm-fireball-end_3' },
                { key: 'atlas', frame: 'worm-fireball-end_4' },
                { key: 'atlas', frame: 'worm-fireball-end_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'worm-fireball-move',
            frames: [
                { key: 'atlas', frame: 'worm-fireball-move_0' },
                { key: 'atlas', frame: 'worm-fireball-move_1' },
                { key: 'atlas', frame: 'worm-fireball-move_2' },
                { key: 'atlas', frame: 'worm-fireball-move_3' },
                { key: 'atlas', frame: 'worm-fireball-move_4' },
                { key: 'atlas', frame: 'worm-fireball-move_5' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'worm-hurt',
            frames: [
                { key: 'atlas', frame: 'worm-hurt_0' },
                { key: 'atlas', frame: 'worm-hurt_1' },
                { key: 'atlas', frame: 'worm-hurt_2' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'worm-idle',
            frames: [
                { key: 'atlas', frame: 'worm-idle_0' },
                { key: 'atlas', frame: 'worm-idle_1' },
                { key: 'atlas', frame: 'worm-idle_2' },
                { key: 'atlas', frame: 'worm-idle_3' },
                { key: 'atlas', frame: 'worm-idle_4' },
                { key: 'atlas', frame: 'worm-idle_5' },
                { key: 'atlas', frame: 'worm-idle_6' },
                { key: 'atlas', frame: 'worm-idle_7' },
                { key: 'atlas', frame: 'worm-idle_8' },
            ],
            frameRate: 18,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'worm-walk',
            frames: [
                { key: 'atlas', frame: 'worm-walk_0' },
                { key: 'atlas', frame: 'worm-walk_1' },
                { key: 'atlas', frame: 'worm-walk_2' },
                { key: 'atlas', frame: 'worm-walk_3' },
                { key: 'atlas', frame: 'worm-walk_4' },
                { key: 'atlas', frame: 'worm-walk_5' },
                { key: 'atlas', frame: 'worm-walk_6' },
                { key: 'atlas', frame: 'worm-walk_7' },
                { key: 'atlas', frame: 'worm-walk_8' },
            ],
            frameRate: 18,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'bearded-idle',
            frames: [
                { key: 'atlas', frame: 'bearded-idle-1' },
                { key: 'atlas', frame: 'bearded-idle-2' },
                { key: 'atlas', frame: 'bearded-idle-3' },
                { key: 'atlas', frame: 'bearded-idle-4' },
                { key: 'atlas', frame: 'bearded-idle-5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'bearded-walk',
            frames: [
                { key: 'atlas', frame: 'bearded-walk-1' },
                { key: 'atlas', frame: 'bearded-walk-2' },
                { key: 'atlas', frame: 'bearded-walk-3' },
                { key: 'atlas', frame: 'bearded-walk-4' },
                { key: 'atlas', frame: 'bearded-walk-5' },
                { key: 'atlas', frame: 'bearded-walk-6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Attack',
            frames: [
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_1' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_2' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_3' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_4' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_5' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_6' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_7' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_8' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_9' },
                { key: 'atlas', frame: 'Bringer-of-Death_Attack_10' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Cast',
            frames: [
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_1' },
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_2' },
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_3' },
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_4' },
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_5' },
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_6' },
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_7' },
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_8' },
                { key: 'atlas', frame: 'Bringer-of-Death_Cast_9' },
            ],
            frameRate: 18,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Death',
            frames: [
                { key: 'atlas', frame: 'Bringer-of-Death_Death_1' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_2' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_3' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_4' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_5' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_6' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_7' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_8' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_9' },
                { key: 'atlas', frame: 'Bringer-of-Death_Death_10' },
            ],
            frameRate: 20,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Hurt',
            frames: [
                { key: 'atlas', frame: 'Bringer-of-Death_Hurt_1' },
                { key: 'atlas', frame: 'Bringer-of-Death_Hurt_2' },
                { key: 'atlas', frame: 'Bringer-of-Death_Hurt_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Idle',
            frames: [
                { key: 'atlas', frame: 'Bringer-of-Death_Idle_1' },
                { key: 'atlas', frame: 'Bringer-of-Death_Idle_2' },
                { key: 'atlas', frame: 'Bringer-of-Death_Idle_3' },
                { key: 'atlas', frame: 'Bringer-of-Death_Idle_4' },
                { key: 'atlas', frame: 'Bringer-of-Death_Idle_5' },
                { key: 'atlas', frame: 'Bringer-of-Death_Idle_6' },
                { key: 'atlas', frame: 'Bringer-of-Death_Idle_7' },
                { key: 'atlas', frame: 'Bringer-of-Death_Idle_8' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Spell',
            frames: [
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_1' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_2' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_3' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_4' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_5' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_6' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_7' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_8' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_9' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_10' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_11' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_12' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_13' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_14' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_15' },
                { key: 'atlas', frame: 'Bringer-of-Death_Spell_16' },
            ],
            frameRate: 32,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'Bringer-of-Death_Walk',
            frames: [
                { key: 'atlas', frame: 'Bringer-of-Death_Walk_1' },
                { key: 'atlas', frame: 'Bringer-of-Death_Walk_2' },
                { key: 'atlas', frame: 'Bringer-of-Death_Walk_3' },
                { key: 'atlas', frame: 'Bringer-of-Death_Walk_4' },
                { key: 'atlas', frame: 'Bringer-of-Death_Walk_5' },
                { key: 'atlas', frame: 'Bringer-of-Death_Walk_6' },
                { key: 'atlas', frame: 'Bringer-of-Death_Walk_7' },
                { key: 'atlas', frame: 'Bringer-of-Death_Walk_8' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'burning-ghoul',
            frames: [
                { key: 'atlas', frame: 'burning-ghoul1' },
                { key: 'atlas', frame: 'burning-ghoul2' },
                { key: 'atlas', frame: 'burning-ghoul3' },
                { key: 'atlas', frame: 'burning-ghoul4' },
                { key: 'atlas', frame: 'burning-ghoul5' },
                { key: 'atlas', frame: 'burning-ghoul6' },
                { key: 'atlas', frame: 'burning-ghoul7' },
                { key: 'atlas', frame: 'burning-ghoul8' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-attack1',
            frames: [
                { key: 'atlas', frame: 'dark-knight-attack1_1' },
                { key: 'atlas', frame: 'dark-knight-attack1_2' },
                { key: 'atlas', frame: 'dark-knight-attack1_3' },
                { key: 'atlas', frame: 'dark-knight-attack1_4' },
                { key: 'atlas', frame: 'dark-knight-attack1_5' },
                { key: 'atlas', frame: 'dark-knight-attack1_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-attack4',
            frames: [
                { key: 'atlas', frame: 'dark-knight-attack4_1' },
                { key: 'atlas', frame: 'dark-knight-attack4_2' },
                { key: 'atlas', frame: 'dark-knight-attack4_3' },
                { key: 'atlas', frame: 'dark-knight-attack4_4' },
                { key: 'atlas', frame: 'dark-knight-attack4_5' },
                { key: 'atlas', frame: 'dark-knight-attack4_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-fall_back',
            frames: [
                { key: 'atlas', frame: 'dark-knight-fall_back_1' },
                { key: 'atlas', frame: 'dark-knight-fall_back_2' },
                { key: 'atlas', frame: 'dark-knight-fall_back_3' },
                { key: 'atlas', frame: 'dark-knight-fall_back_4' },
                { key: 'atlas', frame: 'dark-knight-fall_back_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-hit',
            frames: [
                { key: 'atlas', frame: 'dark-knight-hit_1' },
                { key: 'atlas', frame: 'dark-knight-hit_2' },
                { key: 'atlas', frame: 'dark-knight-hit_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-jump',
            frames: [
                { key: 'atlas', frame: 'dark-knight-jump_1' },
                { key: 'atlas', frame: 'dark-knight-jump_2' },
                { key: 'atlas', frame: 'dark-knight-jump_3' },
                { key: 'atlas', frame: 'dark-knight-jump_4' },
                { key: 'atlas', frame: 'dark-knight-jump_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-ready',
            frames: [
                { key: 'atlas', frame: 'dark-knight-ready_1' },
                { key: 'atlas', frame: 'dark-knight-ready_2' },
                { key: 'atlas', frame: 'dark-knight-ready_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-run',
            frames: [
                { key: 'atlas', frame: 'dark-knight-run_1' },
                { key: 'atlas', frame: 'dark-knight-run_2' },
                { key: 'atlas', frame: 'dark-knight-run_3' },
                { key: 'atlas', frame: 'dark-knight-run_4' },
                { key: 'atlas', frame: 'dark-knight-run_5' },
                { key: 'atlas', frame: 'dark-knight-run_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-stand_up',
            frames: [
                { key: 'atlas', frame: 'dark-knight-stand_up_1' },
                { key: 'atlas', frame: 'dark-knight-stand_up_2' },
                { key: 'atlas', frame: 'dark-knight-stand_up_3' },
                { key: 'atlas', frame: 'dark-knight-stand_up_4' },
                { key: 'atlas', frame: 'dark-knight-stand_up_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'dark-knight-walk',
            frames: [
                { key: 'atlas', frame: 'dark-knight-walk_1' },
                { key: 'atlas', frame: 'dark-knight-walk_2' },
                { key: 'atlas', frame: 'dark-knight-walk_3' },
                { key: 'atlas', frame: 'dark-knight-walk_4' },
                { key: 'atlas', frame: 'dark-knight-walk_5' },
                { key: 'atlas', frame: 'dark-knight-walk_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-attack1',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-attack1_1' },
                { key: 'atlas', frame: 'demon-axe-red-attack1_2' },
                { key: 'atlas', frame: 'demon-axe-red-attack1_3' },
                { key: 'atlas', frame: 'demon-axe-red-attack1_4' },
                { key: 'atlas', frame: 'demon-axe-red-attack1_5' },
                { key: 'atlas', frame: 'demon-axe-red-attack1_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-attack2',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-attack2_1' },
                { key: 'atlas', frame: 'demon-axe-red-attack2_2' },
                { key: 'atlas', frame: 'demon-axe-red-attack2_3' },
                { key: 'atlas', frame: 'demon-axe-red-attack2_4' },
                { key: 'atlas', frame: 'demon-axe-red-attack2_5' },
                { key: 'atlas', frame: 'demon-axe-red-attack2_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-dead',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-dead_1' },
                { key: 'atlas', frame: 'demon-axe-red-dead_2' },
                { key: 'atlas', frame: 'demon-axe-red-dead_3' },
                { key: 'atlas', frame: 'demon-axe-red-dead_4' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-fall_back',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-fall_back_1' },
                { key: 'atlas', frame: 'demon-axe-red-fall_back_2' },
                { key: 'atlas', frame: 'demon-axe-red-fall_back_3' },
                { key: 'atlas', frame: 'demon-axe-red-fall_back_4' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-hit',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-hit_1' },
                { key: 'atlas', frame: 'demon-axe-red-hit_2' },
                { key: 'atlas', frame: 'demon-axe-red-hit_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-jump',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-jump_1' },
                { key: 'atlas', frame: 'demon-axe-red-jump_2' },
                { key: 'atlas', frame: 'demon-axe-red-jump_3' },
                { key: 'atlas', frame: 'demon-axe-red-jump_4' },
                { key: 'atlas', frame: 'demon-axe-red-jump_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-ready',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-ready_1' },
                { key: 'atlas', frame: 'demon-axe-red-ready_2' },
                { key: 'atlas', frame: 'demon-axe-red-ready_3' },
                { key: 'atlas', frame: 'demon-axe-red-ready_4' },
                { key: 'atlas', frame: 'demon-axe-red-ready_5' },
                { key: 'atlas', frame: 'demon-axe-red-ready_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-run',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-run_1' },
                { key: 'atlas', frame: 'demon-axe-red-run_2' },
                { key: 'atlas', frame: 'demon-axe-red-run_3' },
                { key: 'atlas', frame: 'demon-axe-red-run_4' },
                { key: 'atlas', frame: 'demon-axe-red-run_5' },
                { key: 'atlas', frame: 'demon-axe-red-run_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-stand_up',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-stand_up_1' },
                { key: 'atlas', frame: 'demon-axe-red-stand_up_2' },
                { key: 'atlas', frame: 'demon-axe-red-stand_up_3' },
                { key: 'atlas', frame: 'demon-axe-red-stand_up_4' },
                { key: 'atlas', frame: 'demon-axe-red-stand_up_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'demon-axe-red-walk',
            frames: [
                { key: 'atlas', frame: 'demon-axe-red-walk_1' },
                { key: 'atlas', frame: 'demon-axe-red-walk_2' },
                { key: 'atlas', frame: 'demon-axe-red-walk_3' },
                { key: 'atlas', frame: 'demon-axe-red-walk_4' },
                { key: 'atlas', frame: 'demon-axe-red-walk_5' },
                { key: 'atlas', frame: 'demon-axe-red-walk_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'enemy-death',
            frames: [
                { key: 'atlas', frame: 'enemy-death-1' },
                { key: 'atlas', frame: 'enemy-death-2' },
                { key: 'atlas', frame: 'enemy-death-3' },
                { key: 'atlas', frame: 'enemy-death-4' },
                { key: 'atlas', frame: 'enemy-death-5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'ghost',
            frames: [
                { key: 'atlas', frame: 'ghost-1' },
                { key: 'atlas', frame: 'ghost-2' },
                { key: 'atlas', frame: 'ghost-3' },
                { key: 'atlas', frame: 'ghost-4' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'ghost-halo',
            frames: [
                { key: 'atlas', frame: 'ghost-halo-1' },
                { key: 'atlas', frame: 'ghost-halo-2' },
                { key: 'atlas', frame: 'ghost-halo-3' },
                { key: 'atlas', frame: 'ghost-halo-4' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hat-man-idle',
            frames: [
                { key: 'atlas', frame: 'hat-man-idle-1' },
                { key: 'atlas', frame: 'hat-man-idle-2' },
                { key: 'atlas', frame: 'hat-man-idle-3' },
                { key: 'atlas', frame: 'hat-man-idle-4' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'hat-man-walk',
            frames: [
                { key: 'atlas', frame: 'hat-man-walk-1' },
                { key: 'atlas', frame: 'hat-man-walk-2' },
                { key: 'atlas', frame: 'hat-man-walk-3' },
                { key: 'atlas', frame: 'hat-man-walk-4' },
                { key: 'atlas', frame: 'hat-man-walk-5' },
                { key: 'atlas', frame: 'hat-man-walk-6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-attack1',
            frames: [
                { key: 'atlas', frame: 'imp-red-attack1_1' },
                { key: 'atlas', frame: 'imp-red-attack1_2' },
                { key: 'atlas', frame: 'imp-red-attack1_3' },
                { key: 'atlas', frame: 'imp-red-attack1_4' },
                { key: 'atlas', frame: 'imp-red-attack1_5' },
                { key: 'atlas', frame: 'imp-red-attack1_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-attack2',
            frames: [
                { key: 'atlas', frame: 'imp-red-attack2_1' },
                { key: 'atlas', frame: 'imp-red-attack2_2' },
                { key: 'atlas', frame: 'imp-red-attack2_3' },
                { key: 'atlas', frame: 'imp-red-attack2_4' },
                { key: 'atlas', frame: 'imp-red-attack2_5' },
                { key: 'atlas', frame: 'imp-red-attack2_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-fall_back',
            frames: [
                { key: 'atlas', frame: 'imp-red-fall_back_1' },
                { key: 'atlas', frame: 'imp-red-fall_back_2' },
                { key: 'atlas', frame: 'imp-red-fall_back_3' },
                { key: 'atlas', frame: 'imp-red-fall_back_4' },
                { key: 'atlas', frame: 'imp-red-fall_back_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-hit',
            frames: [
                { key: 'atlas', frame: 'imp-red-hit_1' },
                { key: 'atlas', frame: 'imp-red-hit_2' },
                { key: 'atlas', frame: 'imp-red-hit_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-jump',
            frames: [
                { key: 'atlas', frame: 'imp-red-jump_1' },
                { key: 'atlas', frame: 'imp-red-jump_2' },
                { key: 'atlas', frame: 'imp-red-jump_3' },
                { key: 'atlas', frame: 'imp-red-jump_4' },
                { key: 'atlas', frame: 'imp-red-jump_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-ready',
            frames: [
                { key: 'atlas', frame: 'imp-red-ready_1' },
                { key: 'atlas', frame: 'imp-red-ready_2' },
                { key: 'atlas', frame: 'imp-red-ready_3' },
                { key: 'atlas', frame: 'imp-red-ready_4' },
                { key: 'atlas', frame: 'imp-red-ready_5' },
                { key: 'atlas', frame: 'imp-red-ready_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-run',
            frames: [
                { key: 'atlas', frame: 'imp-red-run_1' },
                { key: 'atlas', frame: 'imp-red-run_2' },
                { key: 'atlas', frame: 'imp-red-run_3' },
                { key: 'atlas', frame: 'imp-red-run_4' },
                { key: 'atlas', frame: 'imp-red-run_5' },
                { key: 'atlas', frame: 'imp-red-run_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-stand_up',
            frames: [
                { key: 'atlas', frame: 'imp-red-stand_up_1' },
                { key: 'atlas', frame: 'imp-red-stand_up_2' },
                { key: 'atlas', frame: 'imp-red-stand_up_3' },
                { key: 'atlas', frame: 'imp-red-stand_up_4' },
                { key: 'atlas', frame: 'imp-red-stand_up_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'imp-red-walk',
            frames: [
                { key: 'atlas', frame: 'imp-red-walk_1' },
                { key: 'atlas', frame: 'imp-red-walk_2' },
                { key: 'atlas', frame: 'imp-red-walk_3' },
                { key: 'atlas', frame: 'imp-red-walk_4' },
                { key: 'atlas', frame: 'imp-red-walk_5' },
                { key: 'atlas', frame: 'imp-red-walk_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'oldman-idle',
            frames: [
                { key: 'atlas', frame: 'oldman-idle-1' },
                { key: 'atlas', frame: 'oldman-idle-2' },
                { key: 'atlas', frame: 'oldman-idle-3' },
                { key: 'atlas', frame: 'oldman-idle-4' },
                { key: 'atlas', frame: 'oldman-idle-5' },
                { key: 'atlas', frame: 'oldman-idle-6' },
                { key: 'atlas', frame: 'oldman-idle-7' },
                { key: 'atlas', frame: 'oldman-idle-8' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'oldman-walk',
            frames: [
                { key: 'atlas', frame: 'oldman-walk-1' },
                { key: 'atlas', frame: 'oldman-walk-2' },
                { key: 'atlas', frame: 'oldman-walk-3' },
                { key: 'atlas', frame: 'oldman-walk-4' },
                { key: 'atlas', frame: 'oldman-walk-5' },
                { key: 'atlas', frame: 'oldman-walk-6' },
                { key: 'atlas', frame: 'oldman-walk-7' },
                { key: 'atlas', frame: 'oldman-walk-8' },
                { key: 'atlas', frame: 'oldman-walk-9' },
                { key: 'atlas', frame: 'oldman-walk-10' },
                { key: 'atlas', frame: 'oldman-walk-11' },
                { key: 'atlas', frame: 'oldman-walk-12' },
            ],
            frameRate: 24,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton',
            frames: [
                { key: 'atlas', frame: 'skeleton-1' },
                { key: 'atlas', frame: 'skeleton-2' },
                { key: 'atlas', frame: 'skeleton-3' },
                { key: 'atlas', frame: 'skeleton-4' },
                { key: 'atlas', frame: 'skeleton-5' },
                { key: 'atlas', frame: 'skeleton-6' },
                { key: 'atlas', frame: 'skeleton-7' },
                { key: 'atlas', frame: 'skeleton-8' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-clothed',
            frames: [
                { key: 'atlas', frame: 'skeleton-clothed-1' },
                { key: 'atlas', frame: 'skeleton-clothed-2' },
                { key: 'atlas', frame: 'skeleton-clothed-3' },
                { key: 'atlas', frame: 'skeleton-clothed-4' },
                { key: 'atlas', frame: 'skeleton-clothed-5' },
                { key: 'atlas', frame: 'skeleton-clothed-6' },
                { key: 'atlas', frame: 'skeleton-clothed-7' },
                { key: 'atlas', frame: 'skeleton-clothed-8' },
            ],
            frameRate: 16,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-rise',
            frames: [
                { key: 'atlas', frame: 'skeleton-rise-1' },
                { key: 'atlas', frame: 'skeleton-rise-2' },
                { key: 'atlas', frame: 'skeleton-rise-3' },
                { key: 'atlas', frame: 'skeleton-rise-4' },
                { key: 'atlas', frame: 'skeleton-rise-5' },
                { key: 'atlas', frame: 'skeleton-rise-6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-rise-clothed',
            frames: [
                { key: 'atlas', frame: 'skeleton-rise-clothed-1' },
                { key: 'atlas', frame: 'skeleton-rise-clothed-2' },
                { key: 'atlas', frame: 'skeleton-rise-clothed-3' },
                { key: 'atlas', frame: 'skeleton-rise-clothed-4' },
                { key: 'atlas', frame: 'skeleton-rise-clothed-5' },
                { key: 'atlas', frame: 'skeleton-rise-clothed-6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-attack1',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-attack1_1' },
                { key: 'atlas', frame: 'skeleton-sword-attack1_2' },
                { key: 'atlas', frame: 'skeleton-sword-attack1_3' },
                { key: 'atlas', frame: 'skeleton-sword-attack1_4' },
                { key: 'atlas', frame: 'skeleton-sword-attack1_5' },
                { key: 'atlas', frame: 'skeleton-sword-attack1_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-attack2',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-attack2_1' },
                { key: 'atlas', frame: 'skeleton-sword-attack2_2' },
                { key: 'atlas', frame: 'skeleton-sword-attack2_3' },
                { key: 'atlas', frame: 'skeleton-sword-attack2_4' },
                { key: 'atlas', frame: 'skeleton-sword-attack2_5' },
                { key: 'atlas', frame: 'skeleton-sword-attack2_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-corpse',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-corpse_1' },
                { key: 'atlas', frame: 'skeleton-sword-corpse_2' },
            ],
            frameRate: 4,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-dead_far',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-dead_far_1' },
                { key: 'atlas', frame: 'skeleton-sword-dead_far_2' },
                { key: 'atlas', frame: 'skeleton-sword-dead_far_3' },
                { key: 'atlas', frame: 'skeleton-sword-dead_far_4' },
                { key: 'atlas', frame: 'skeleton-sword-dead_far_5' },
                { key: 'atlas', frame: 'skeleton-sword-dead_far_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-dead_near',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-dead_near_1' },
                { key: 'atlas', frame: 'skeleton-sword-dead_near_2' },
                { key: 'atlas', frame: 'skeleton-sword-dead_near_3' },
                { key: 'atlas', frame: 'skeleton-sword-dead_near_4' },
                { key: 'atlas', frame: 'skeleton-sword-dead_near_5' },
                { key: 'atlas', frame: 'skeleton-sword-dead_near_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-hit',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-hit_1' },
                { key: 'atlas', frame: 'skeleton-sword-hit_2' },
                { key: 'atlas', frame: 'skeleton-sword-hit_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-jump',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-jump_1' },
                { key: 'atlas', frame: 'skeleton-sword-jump_2' },
                { key: 'atlas', frame: 'skeleton-sword-jump_3' },
                { key: 'atlas', frame: 'skeleton-sword-jump_4' },
                { key: 'atlas', frame: 'skeleton-sword-jump_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-ready',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-ready_1' },
                { key: 'atlas', frame: 'skeleton-sword-ready_2' },
                { key: 'atlas', frame: 'skeleton-sword-ready_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-reborn',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-reborn_1' },
                { key: 'atlas', frame: 'skeleton-sword-reborn_2' },
                { key: 'atlas', frame: 'skeleton-sword-reborn_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-run',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-run_1' },
                { key: 'atlas', frame: 'skeleton-sword-run_2' },
                { key: 'atlas', frame: 'skeleton-sword-run_3' },
                { key: 'atlas', frame: 'skeleton-sword-run_4' },
                { key: 'atlas', frame: 'skeleton-sword-run_5' },
                { key: 'atlas', frame: 'skeleton-sword-run_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'skeleton-sword-walk',
            frames: [
                { key: 'atlas', frame: 'skeleton-sword-walk_1' },
                { key: 'atlas', frame: 'skeleton-sword-walk_2' },
                { key: 'atlas', frame: 'skeleton-sword-walk_3' },
                { key: 'atlas', frame: 'skeleton-sword-walk_4' },
                { key: 'atlas', frame: 'skeleton-sword-walk_5' },
                { key: 'atlas', frame: 'skeleton-sword-walk_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'thing',
            frames: [
                { key: 'atlas', frame: 'thing1' },
                { key: 'atlas', frame: 'thing2' },
                { key: 'atlas', frame: 'thing3' },
                { key: 'atlas', frame: 'thing4' },
            ],
            frameRate: 8,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-axe-attack2',
            frames: [
                { key: 'atlas', frame: 'viking-axe-attack2_1' },
                { key: 'atlas', frame: 'viking-axe-attack2_2' },
                { key: 'atlas', frame: 'viking-axe-attack2_3' },
                { key: 'atlas', frame: 'viking-axe-attack2_4' },
                { key: 'atlas', frame: 'viking-axe-attack2_5' },
                { key: 'atlas', frame: 'viking-axe-attack2_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-axe-hit',
            frames: [
                { key: 'atlas', frame: 'viking-axe-hit_1' },
                { key: 'atlas', frame: 'viking-axe-hit_2' },
                { key: 'atlas', frame: 'viking-axe-hit_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-axe-jump',
            frames: [
                { key: 'atlas', frame: 'viking-axe-jump_1' },
                { key: 'atlas', frame: 'viking-axe-jump_2' },
                { key: 'atlas', frame: 'viking-axe-jump_3' },
                { key: 'atlas', frame: 'viking-axe-jump_4' },
                { key: 'atlas', frame: 'viking-axe-jump_5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-axe-ready',
            frames: [
                { key: 'atlas', frame: 'viking-axe-ready_1' },
                { key: 'atlas', frame: 'viking-axe-ready_2' },
                { key: 'atlas', frame: 'viking-axe-ready_3' },
            ],
            frameRate: 6,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-axe-run',
            frames: [
                { key: 'atlas', frame: 'viking-axe-run_1' },
                { key: 'atlas', frame: 'viking-axe-run_2' },
                { key: 'atlas', frame: 'viking-axe-run_3' },
                { key: 'atlas', frame: 'viking-axe-run_4' },
                { key: 'atlas', frame: 'viking-axe-run_5' },
                { key: 'atlas', frame: 'viking-axe-run_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'viking-axe-walk',
            frames: [
                { key: 'atlas', frame: 'viking-axe-walk_1' },
                { key: 'atlas', frame: 'viking-axe-walk_2' },
                { key: 'atlas', frame: 'viking-axe-walk_3' },
                { key: 'atlas', frame: 'viking-axe-walk_4' },
                { key: 'atlas', frame: 'viking-axe-walk_5' },
                { key: 'atlas', frame: 'viking-axe-walk_6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'wizard-idle',
            frames: [
                { key: 'atlas', frame: 'wizard-idle-1' },
                { key: 'atlas', frame: 'wizard-idle-2' },
                { key: 'atlas', frame: 'wizard-idle-3' },
                { key: 'atlas', frame: 'wizard-idle-4' },
                { key: 'atlas', frame: 'wizard-idle-5' },
            ],
            frameRate: 10,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'woman-idle',
            frames: [
                { key: 'atlas', frame: 'woman-idle-1' },
                { key: 'atlas', frame: 'woman-idle-2' },
                { key: 'atlas', frame: 'woman-idle-3' },
                { key: 'atlas', frame: 'woman-idle-4' },
                { key: 'atlas', frame: 'woman-idle-5' },
                { key: 'atlas', frame: 'woman-idle-6' },
                { key: 'atlas', frame: 'woman-idle-7' },
            ],
            frameRate: 14,
            repeat: 0,
        });
                
        this.anims.create({
            key: 'woman-walk',
            frames: [
                { key: 'atlas', frame: 'woman-walk-1' },
                { key: 'atlas', frame: 'woman-walk-2' },
                { key: 'atlas', frame: 'woman-walk-3' },
                { key: 'atlas', frame: 'woman-walk-4' },
                { key: 'atlas', frame: 'woman-walk-5' },
                { key: 'atlas', frame: 'woman-walk-6' },
            ],
            frameRate: 12,
            repeat: 0,
        });
                

        
                

    }

}
