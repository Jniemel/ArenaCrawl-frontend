import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    // load tiles and tilemaps
    this.load.image('tiles', './assets/game/tiles/tiles.png');
    this.load.tilemapTiledJSON('arena-1', './assets/game/maps/div4.json');
    // load class images
    this.load.image('swordsman', './assets/game/characters/swordsman.png');
    this.load.image('rogue', './assets/game/characters/rogue.png');
    this.load.image('bandit', './assets/game/characters/bandit.png');
  }

  create(data) {
    this.scene.start('game', data);
  }
}
