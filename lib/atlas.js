'use strict';
const path = require('path');
const regex = require('./regex.js');
const files = require('./files.js');
const chalk = require('chalk');
const inquirer = require('./inquirer');

let config = {
    sceneUrl: './src/scenes/LoadingScene2.ts', // You must adapt this line to your project
    addImport: true, // false to ignore imports lines
    imageType: 'png', // just in case someone use another type of images
    frameRateCoeff: 2, // animation frameRate = numbers of frames * frameRateCoeff
}

module.exports = {
    addImport: async (atlasUrl, sceneUrl) => {
        const srcIndex = atlasUrl.split('/').findIndex(e => e === 'src');
        const relativeUrl = atlasUrl.split('/').slice(srcIndex).join('/');
        const dirName = path.dirname(relativeUrl);

        const loadingSceneFile = files.getFile(sceneUrl);
        const ext = path.extname(atlasUrl);
        const fileName = path.basename(atlasUrl, ext);

        const regexFileName =  new RegExp(`import ${fileName}`,'g');
        if (loadingSceneFile.search(regexFileName) != -1) {
            throw new Error('This file is already imported');
        }

        [regex.importSection, regex.preloadSection, regex.animsSection].forEach(e => {
            if(loadingSceneFile.search(e) === -1) {
                throw new Error(`${e.toString().replace(regex.noWord, '')}is missing in ${path.basename(sceneUrl)}`);
            }
        })
        if (loadingSceneFile.search(regex.importSection) === -1) {
            throw new Error('This file is already imported');
        }

        const newLoadingScene = loadingSceneFile.replace(regex.importSection, `// IMPORT SECTION //
import ${fileName}JSON from './${dirName}/${fileName}.json';
import ${fileName} from './${dirName}/${fileName}.${config.imageType}';`);

        return newLoadingScene;
    },
    addPreLoader: (loadingSceneWithImport, atlasUrl) => {
        const srcIndex = atlasUrl.split('/').findIndex(e => e === 'src');
        const ext = path.extname(atlasUrl);
        const fileName = path.basename(atlasUrl, ext);

        const newLoadingScene = loadingSceneWithImport.replace(regex.preloadSection, `// PRELOAD SECTION //
        this.load.atlas('${fileName}', ${fileName}, ${fileName}JSON);`);

        return newLoadingScene;
    },
    addAnims: (loadingSceneWithPreload, atlasUrl) => {
        const atlasFile = files.getFile(atlasUrl);
        const atlasJsonObj = JSON.parse(atlasFile);
        const ext = path.extname(atlasUrl);
        const fileName = path.basename(atlasUrl, ext);

        const frames = [...atlasJsonObj.textures[0].frames]

        // Sort global anims
        let framesArray = atlasJsonObj.textures[0].frames.sort((a, b) =>
        {
            let fa = a.filename.toLowerCase();
            let fb = b.filename.toLowerCase();

            if (fa < fb) {
                return -1;
            }

            if (fa > fb) {
                return 1;
            }

            return 0;
        });

        // Sort frames anims
        framesArray.sort((a, b) =>
        {
            return a.filename.match(/\d+$/) - b.filename.match(/\d+$/);
        });


        let currentFrame = '';
        let result = ``;
        let alreadyFilled = [];

        // Generate anims
        framesArray.forEach(frame => {
            const frameName = frame.filename
            const frameNameTrimmed = frameName.replace(regex.lastNumbers, "");

            if(alreadyFilled.includes(frameNameTrimmed)) {
                return;
            }

            if(frameNameTrimmed !== currentFrame) {
                currentFrame = frameNameTrimmed;
                result += `
        this.anims.create({
            key: '${frameNameTrimmed.replace(regex.lastSymbols, "")}',
            frames: [`
            }
            if(frameNameTrimmed === currentFrame) {
                const currentAnim = framesArray.filter(e => e.filename.replace(regex.lastNumbers, "") === frameNameTrimmed);
                currentAnim.forEach(anim => {
                    result += `
                { key: '${fileName}', frame: '${anim.filename}' },`;
                });

                result += `
            ],
            frameRate: ${currentAnim.length * config.frameRateCoeff},
            repeat: 0,
        });
                `
                alreadyFilled.push(frameNameTrimmed)
            }
        });

        const newLoadingSceneWithAnims = loadingSceneWithPreload.replace(regex.animsSection, `// ANIMS SECTION //
${result}`);

        return newLoadingSceneWithAnims;
    }
}
