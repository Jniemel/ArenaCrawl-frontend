export default class InitUnit {
  constructor(character, player, team, texture, x, y, hp, mp, played) {
    this.character = character;
    this.player = player;
    this.team = team;
    this.texture = texture;
    this.x = x;
    this.y = y;
    this.hp = hp ? hp : character.maxHp;
    this.mp = mp ? mp : character.maxMp;
    this.played = played ? true : false;
  }
}
