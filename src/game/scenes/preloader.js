import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', './assets/game/tiles/tiles.png');
    this.load.tilemapTiledJSON('arena-1', './assets/game/maps/div4.json');
  }

  create(data) {
    this.scene.start('game', data);
  }
}
