import Phaser from 'phaser';
import UnitBase from '../units/unitBase';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init(data) {
    this.state = data.battleData;
    this.southTeam = createTeam(this.state.south);
    this.northTeam = createTeam(this.state.north);
  }

  preload() {}

  create() {
    // console.log(this.southTeam);
    // console.log(this.northTeam);
    // create map
    const map = this.make.tilemap({ key: 'arena-1' });
    const tileset = map.addTilesetImage('arena', 'tiles');
    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });

    // place teams
    placeTeam(this.southTeam, 'south', 576, this);
    placeTeam(this.northTeam, 'north', 32, this);
  }
}

function createTeam(champs) {
  let arr = [];
  champs.forEach((champ) => {
    arr.push(new UnitBase(champ));
  });
  return arr;
}

function placeTeam(champs, team, yPos, self) {
  let y = yPos;
  let x = 192;
  let count = 1;
  champs.forEach((champ) => {
    if (count === 4 && team === 'south') {
      y -= 32;
      x = 192;
    } else if (count === 4 && team === 'north') {
      y += 32;
      x = 192;
    }
    const cName = champ.class.charAt(0).toLowerCase() + champ.class.slice(1);
    champ.x = x;
    champ.y = y;
    self.physics.add.sprite(x, y, cName).setOrigin(0, 0);
    x += 32;
    count += 1;
  });
  console.log(self.southTeam);
}
