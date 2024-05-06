export default class UnitBase {
  constructor(character) {
    this.name = character.name;
    this.id = character._id;
    this.class = character.class;
    this.stats = character.stats;
    this.health = this.stats.constitution;
    this.isDead = false;
    this.posX = 0;
    this.posY = 0;
  }

  getPosX() {
    return this.x;
  }

  getPosY() {
    return this.y;
  }

  getPos() {
    return [this.x, this.y];
  }

  // south + , north -
  // west -, east +
  move(dir) {
    switch (dir) {
      case 'n':
        this.posY -= 32;
        break;
      case 's':
        this.posY += 32;
        break;
      case 'w':
        this.posX -= 32;
        break;
      case 'e':
        this.posX += 32;
        break;
      case 'nw':
        this.posY -= 32;
        this.posX -= 32;
        break;
      case 'ne':
        this.posY -= 32;
        this.posX += 32;
        break;
      case 'sw':
        this.posY += 32;
        this.posX -= 32;
        break;
      case 'se':
        this.posY += 32;
        this.posX += 32;
        break;
      case 'wait':
        break;
    }
  }
}
