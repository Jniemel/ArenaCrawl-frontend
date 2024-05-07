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

  // south + , north -
  // west -, east +
}
