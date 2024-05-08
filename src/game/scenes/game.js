import Phaser from 'phaser';
import UnitBase from '../units/unitBase';
import MoveBtn from '../ui/moveBtn';
import Turn from '../logic/turn';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init(data) {
    this.initialState = data.battleData;
  }

  preload() {}

  create() {
    // console.log(this.southTeam);
    // console.log(this.northTeam);
    // create map
    const map = this.make.tilemap({ key: 'arena-1' });
    const tileset = map.addTilesetImage('arena', 'tiles');
    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });

    // create ui
    // movement buttons
    const dirs = ['ne', 'n', 'nw', 'w', 'wait', 'e', 'sw', 's', 'se'];
    let btnsStartX = 438;
    let btnsStartY = 671;
    let count = 1;
    dirs.forEach((dir) => {
      if (count % 4 === 0) {
        btnsStartX = 438;
        btnsStartY += 58;
        count = 1;
      }
      const btn = new MoveBtn(this, btnsStartX, btnsStartY, dir);
      this.add.existing(btn);
      btnsStartX -= 79;
      count += 1;
    });

    // teams
    this.southTeam = createTeam(this.initialState.south, this);
    this.northTeam = createTeam(this.initialState.north, this);
    placeTeam(this.southTeam, 'south', 576, this);
    placeTeam(this.northTeam, 'north', 32, this);

    // turn manager
    this.turn = new Turn(this.events);
    this.turn.initRound(this.southTeam, this.northTeam);

    console.log(this.turn.southQueue, this.turn.northQueue);

    // event listeners
    this.events.on('move', handleMovement, this);
    this.events.on('newRound', handleNewRound, this);

    function handleMovement(dir) {
      const current = this.turn.getCurrentUnit();
      if (current.team === 'south') {
        this.southTeam.find((unit) => {
          if (unit.id === current.unitId) {
            unit.move(dir);
          }
        });
      } else {
        this.northTeam.find((unit) => {
          if (unit.id === current.unitId) {
            unit.move(dir);
          }
        });
      }
      this.turn.next();
    }

    function handleNewRound() {
      this.turn.initRound(this.southTeam, this.northTeam);
    }
  }
}

function createTeam(champs, scene) {
  let arr = [];
  champs.forEach((champ) => {
    const texture = champ.class.charAt(0).toLowerCase() + champ.class.slice(1);
    arr.push(new UnitBase(champ, scene, 0, 0, texture).setOrigin(0, 0));
  });
  return arr;
}

function placeTeam(champs, team, yPos) {
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
    champ.x = x;
    champ.y = y;
    x += 32;
    count += 1;
  });
}
