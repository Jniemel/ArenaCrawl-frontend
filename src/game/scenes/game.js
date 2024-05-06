import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init(data) {
    this.state = data.battleData;
  }

  preload() {}

  create() {
    console.log(this.state);
    // create map
    const map = this.make.tilemap({ key: 'arena-1' });
    const tileset = map.addTilesetImage('arena', 'tiles');
    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });

    // place teams
    placeTeam(this.state.south, 'south', 576, this);
    placeTeam(this.state.north, 'north', 32, this);
  }
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
    self.physics.add.sprite(x, y, cName).setOrigin(0, 0);
    console.log(cName);
    x += 32;
    count += 1;
  });
}
