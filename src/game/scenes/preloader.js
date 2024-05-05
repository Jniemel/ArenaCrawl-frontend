import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', './assets/game/tiles/tiles.png');
  }

  create() {
    this.scene.start('game');
  }
}
