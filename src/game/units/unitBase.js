import Phaser from 'phaser';

export default class UnitBase extends Phaser.GameObjects.Sprite {
  constructor(character, scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.name = character.name;
    this.id = character._id;
    this.class = character.class;
    this.stats = character.stats;
    this.health = this.stats.constitution;
    this.died = false;

    scene.physics.world.enable(this);
    scene.add.existing(this);
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

  // y: south + , north -
  // x: west +, east -
  move(dir) {
    let x = 0;
    let y = 0;
    switch (dir) {
      case 'ne':
        y = -32;
        x = -32;
        break;
      case 'n':
        y = -32;
        break;
      case 'nw':
        y = -32;
        x = +32;
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
