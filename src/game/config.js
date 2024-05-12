import Phaser from 'phaser';

// scenes
import Preloader from './scenes/preloader.js';
import Game from './scenes/game.js';
import initBattle from './scenes/initBattle.js';
import battleResult from './scenes/battleResult.js';

export const config = {
  parent: 'game-container',
  type: Phaser.AUTO,
  height: 660,
  width: 416,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  render: {
    pixelArt: true,
  },
  scene: [Preloader, initBattle, Game, battleResult],
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
};
