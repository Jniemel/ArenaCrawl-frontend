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
    this.load.tilemapTiledJSON('arena-1', './assets/game/maps/arena1.json');
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
    this.load.image('auto-btn', './assets/game/ui/auto-btn.png');
    this.load.image('auto-btn-down', './assets/game/ui/auto-btn-pressed.png');
    this.load.image('done-btn', './assets/game/ui/done-btn.png');
    this.load.image('done-btn-down', './assets/game/ui/done-btn-down.png');
  }

  create(data) {
    if (data.battleData.status === 'finished') {
      this.scene.start('battleResult', data);
    } else if (data.battleData.status === 'init') {
      this.scene.start('initBattle', data);
    } else {
      // prepare saved data
      data.battleData.unitStates.forEach((unit) => {
        const texture =
          unit.character.class.charAt(0).toLowerCase() +
          unit.character.class.slice(1);
        this.units.push(
          new InitUnit(
            unit.character,
            unit.player,
            unit.team,
            texture,
            unit.x,
            unit.y,
            unit.hp,
            unit.mp,
            unit.played,
          ),
        );
      });
      this.scene.start('game', { units: this.units });
    }
  }
}
