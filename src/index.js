import Phaser from 'phaser';
import { WIDTH, HEIGHT } from './constant/config';
import Huhmiel from './scenes/Huhmiel';
import bootGame from './scenes/BootGame';
import LoadSavedGame from './scenes/Load';
import playLvl1 from './scenes/GameScene';
import gameOver from './scenes/GameOver';
import DashBoard from './scenes/dashBoard';
import Options from './scenes/Options';
import Intro from './scenes/Intro';
import endGame from './scenes/EndGame';
import LoadingScreen from './scenes/loadingScreen'

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  pixelArt: true,
  maxLights: 16,
  scale: {
    parent: 'gamecanvas',
    mode: Phaser.Scale.FIT,
    autoRound: true,
    autoCenter: Phaser.DOM.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      tileBias: 20,
      gravity: { y: 1 }, // default 100
      debug: true,
      debugShowBody: true,
      debugShowStaticBody: true,
    },
  },
  scene: [Huhmiel, bootGame, LoadingScreen, Intro, Options, LoadSavedGame, playLvl1, DashBoard, endGame, gameOver],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
