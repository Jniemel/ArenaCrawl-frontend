import Phaser from 'phaser';

export default class UnitBase extends Phaser.GameObjects.Sprite {
  constructor(character, team, hp, scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.character = character;
    this.team = team;
    this.hp = hp;
    this.dead = this.hp <= 0 ? true : false;
    this.scene = scene;

    // enable physics
    scene.physics.world.enable(this);
    scene.add.existing(this);
  }

  isDead() {
    return this.dead;
  }

  setDead() {
    this.isDead = true;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  // one tile: 32x32 px
  getNewPos(dir) {
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
    return { x: this.x + x, y: this.y + y };
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  getUnitState() {
    return {
      character: this.character,
      team: this.team,
      hp: this.hp,
      x: this.x,
      y: this.y,
    };
  }
}
