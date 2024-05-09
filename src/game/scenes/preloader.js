import Phaser from 'phaser';
import InitUnit from '../units/initUnit';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
    this.units = [];
  }

  preload() {
    // load tiles and tilemaps
    this.load.image('tiles', './assets/game/tiles/tiles.png');
    this.load.tilemapTiledJSON('arena-1', './assets/game/maps/div4.json');
    // load class images
    this.load.image('swordsman', './assets/game/characters/swordsman.png');
    this.load.image('rogue', './assets/game/characters/rogue.png');
    this.load.image('bandit', './assets/game/characters/bandit.png');
    // load buttons images
    this.load.image('n-btn', './assets/game/ui/n-btn.png');
    this.load.image('nw-btn', './assets/game/ui/nw-btn.png');
    this.load.image('ne-btn', './assets/game/ui/ne-btn.png');
    this.load.image('e-btn', './assets/game/ui/e-btn.png');
    this.load.image('w-btn', './assets/game/ui/w-btn.png');
    this.load.image('s-btn', './assets/game/ui/s-btn.png');
    this.load.image('sw-btn', './assets/game/ui/sw-btn.png');
    this.load.image('se-btn', './assets/game/ui/se-btn.png');
    this.load.image('wait-btn', './assets/game/ui/wait-btn.png');
  }

  create(data) {
    if (data.battleData.status === 'init') {
      this.scene.start('initBattle', data);
    } else {
      console.log(data.battleData);
      // prepare saved data
      data.battleData.unitStates.forEach((unit) => {
        const texture =
          unit.character.class.charAt(0).toLowerCase() +
          unit.character.class.slice(1);
        this.units.push(
          new InitUnit(
            unit.character,
            unit.team,
            unit.x,
            unit.y,
            unit.player,
            texture,
          ),
        );
      });
      this.scene.start('game', { units: this.units });
    }
  }
}
