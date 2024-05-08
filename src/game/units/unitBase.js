import Phaser from 'phaser';

export default class UnitBase extends Phaser.GameObjects.Sprite {
  constructor(character, team, scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.team = team;
    this.name = character.name;
    this.id = character._id;
    this.class = character.class;
    this.stats = character.stats;
    this.health = this.stats.constitution;
    this.died = false;

    // enable physics
    scene.physics.world.enable(this);
    scene.add.existing(this);

    // turn indicator
    this.indicator = scene.add.graphics();
    this.indicator.lineStyle(2, 0xffd700, 1);
    this.indicator.strokeRect(x - this.width / 2, y - this.height / 2, 32, 32);
    this.indicator.setVisible(false);
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  isDead() {
    return this.died;
  }

  setDead() {
    this.isDead = true;
  }

  setInd(bool) {
    this.indicator.setVisible(bool);
  }

  // one tile: 32x32 px
  move(dir) {
    let x = 0;
    let y = 0;
    switch (dir) {
      case 'ne':
        y = -32;
        x = +32;
        break;
      case 'n':
        y = -32;
        break;
      case 'nw':
        y = -32;
        x = -32;
        break;
      case 'e':
        x = -32;
        break;
      case 'w':
        x = +32;
        break;
      case 'se':
        y = +32;
        x = -32;
        break;
      case 's':
        y = +32;
        break;
      case 'sw':
        y = +32;
        x = +32;
        break;
      default:
        break;
    }
    this.x += x;
    this.y += y;
  }
}
