import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: 'arena-1' });
    const tileset = map.addTilesetImage('arena', 'tiles');

    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);

    wallsLayer.setCollisionByProperty({ collides: true });
  }
}
