import Phaser from 'phaser';
import U from './utils/usefull';

import Huhmiel from './scenes/Huhmiel';
import bootGame from './scenes/BootGame';
import LoadSavedGame from './scenes/Load';
import playLvl1 from './scenes/PlayLvl1';
import gameOver from './scenes/GameOver';
import DashBoard from './scenes/dashBoard';
import Options from './scenes/Options';
import Intro from './scenes/Intro';
import endGame from './scenes/EndGame';
import LoadingScreen from './scenes/loadingScreen'

const config = {
  type: Phaser.WEBGL,
  width: U.WIDTH,
  height: U.HEIGHT,
  pixelArt: true,
  scale: {
    parent: 'gamecanvas',
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    autoRound: true,
    autoCenter: Phaser.DOM.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      tileBias: 20,
      gravity: { y: 0 }, // default 100
      debug: false,
      debugShowBody: true,
      debugShowStaticBody: true,
    },
  },
  scene: [Huhmiel, bootGame, LoadingScreen, Intro, Options, LoadSavedGame, playLvl1, DashBoard, endGame, gameOver],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
