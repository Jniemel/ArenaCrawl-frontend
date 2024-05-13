export default class InitUnit {
  constructor(
    character,
    player,
    team,
    texture,
    x,
    y,
    hp = null,
    mp = null,
    played,
  ) {
    this.character = character;
    this.player = player;
    this.team = team;
    this.texture = texture;
    this.x = x;
    this.y = y;
    // compare against null, since value can be a negative number
    if (hp === null) {
      this.hp = character.maxHp;
    } else {
      this.hp = hp;
    }
    if (mp === null) {
      this.mp = character.maxMp;
    } else {
      this.mp = mp;
    }
    this.played = played ? true : false;
  }
}
