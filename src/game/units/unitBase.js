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
    this.scene = scene;

    // enable physics
    scene.physics.world.enable(this);
    scene.add.existing(this);

    /*
    // turn indicator
    this.indicator = scene.add.graphics();
    this.indicator.lineStyle(1, 0xffff00, 1);
    this.indicator.x = this.x;
    this.indicator.y = this.y;
    this.indicator.strokeRect(this.x, this.y, 32, 32);
    this.indicator.setVisible(false);
    */
  }

  isDead() {
    return this.died;
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
}
