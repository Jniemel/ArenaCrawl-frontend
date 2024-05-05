import Phaser from 'phaser';

// scenes
import Preloader from './scenes/preloader.js';
import Game from './scenes/game.js';

export const config = {
  parent: 'game-container',
  type: Phaser.AUTO,
  height: 640,
  width: 480,
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  scene: [Preloader, Game],
};
