import Phaser from 'phaser';

// scenes
import Preloader from './scenes/preloader.js';
import Game from './scenes/game.js';
import initBattle from './scenes/initBattle.js';

export const config = {
  parent: 'game-container',
  type: Phaser.AUTO,
  height: 820,
  width: 480,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  render: {
    pixelArt: true,
  },
  scene: [Preloader, initBattle, Game],
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
};
