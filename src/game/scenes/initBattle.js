import Phaser from 'phaser';
import InitUnit from '../units/initUnit';

export default class initBattle extends Phaser.Scene {
  constructor() {
    super('initBattle');
    this.units = [];
  }

  init(data) {
    this.initialState = data.battleData;
  }

  preload() {}

  create() {
    // initialize units
    this.southTeam = createTeam(this.initialState.south, 'south', 'player');
    this.northTeam = createTeam(this.initialState.north, 'north');
    // set x- and y-values for units
    placeTeam(this.southTeam, 'south', 432);
    placeTeam(this.northTeam, 'north', 48);
    // merge into one unit pool
    this.units = this.southTeam.concat(this.northTeam);
    // launch game and pass unit pool into it
    this.scene.start('game', { units: this.units });
  }
}

function createTeam(champs, team, player = 'npc') {
  let arr = [];
  champs.forEach((champ) => {
    const texture = champ.class.charAt(0).toLowerCase() + champ.class.slice(1);
    arr.push(new InitUnit(champ, player, team, texture, 0, 0));
  });
  return arr;
}

function placeTeam(champs, team, yPos) {
  let y = yPos;
  let x = 176;
  let count = 1;
  champs.forEach((champ) => {
    if (count === 4 && team === 'south') {
      y -= 32;
      x = 176;
    } else if (count === 4 && team === 'north') {
      y += 32;
      x = 176;
    }
    champ.x = x;
    champ.y = y;
    x += 32;
    count += 1;
  });
}
