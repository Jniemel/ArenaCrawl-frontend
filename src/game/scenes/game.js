import Phaser from 'phaser';
import MoveBtn from '../ui/moveBtn';
import playerUnit from '../units/playerUnit';
import npcUnit from '../units/npcUnit';
import Turn from '../logic/turn';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
    this.unitPool = [];
  }

  init(data) {
    // this.initialState = data.battleData;
    this.units = data.units;
  }

  preload() {}

  create() {
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

    // create game objects for units and store into unit pool
    this.units.forEach((unit) => {
      if (unit.player === 'player') {
        this.unitPool.push(
          new playerUnit(
            unit.character,
            unit.team,
            this,
            unit.x,
            unit.y,
            unit.texture,
          ),
        );
      } else {
        this.unitPool.push(
          new npcUnit(
            unit.character,
            unit.team,
            this,
            unit.x,
            unit.y,
            unit.texture,
          ),
        );
      }
    });

    /*
    // teams
    this.southTeam = createTeam(
      this.initialState.south,
      'south',
      this,
      'player',
    );
    this.northTeam = createTeam(this.initialState.north, 'north', this);
    placeTeam(this.southTeam, 'south', 592, this);
    placeTeam(this.northTeam, 'north', 48, this);

    // fill unit pool
    // this.unitPool = this.physics.add.group();
    this.unitPool = this.southTeam.concat(this.northTeam);
    
    // collision detection
    
    this.physics.add.collider(
      this.unitPool,
      this.unitPool,
      handleCollision,
      null,
      this,
    );
    */

    // turn manager
    this.turn = new Turn(this.events);
    this.turn.initRound(this.unitPool);
    let first = this.turn.getCurrentUnit().unitId;
    this.unitPool.find((unit) => {
      if (unit.id === first && unit) {
        unit.setInd(true);
      }
    });

    // event listeners
    this.events.on('setIndicator', handleIndicator, this);
    this.events.on('move', handleMovement, this);
    this.events.on('newRound', handleNewRound, this);

    function handleIndicator(data) {
      this.unitPool.forEach((unit) => {
        if (unit.id === data.unitId) {
          unit.setInd(data.set);
        }
      });
    }

    function handleMovement(dir) {
      const current = this.turn.getCurrentUnit();
      let newPos;
      // get the new position and unit instance
      const unit = this.unitPool.find((unit) => {
        if (unit.id === current.unitId) {
          newPos = unit.getNewPos(dir);
          return unit;
        }
      });
      // check if new position occupied and return occupying unit (if any)
      const occupied = this.unitPool.find(
        (unit) => JSON.stringify(unit.getPos()) === JSON.stringify(newPos),
      );
      // if not occupied -> move
      // if occupied by ally -> swap
      // if occupied by enemy -> attack
      if (!occupied) {
        unit.setPos(newPos.x, newPos.y);
      } else if (occupied.team === unit.team) {
        const swapPos = unit.getPos();
        occupied.setPos(swapPos.x, swapPos.y);
        unit.setPos(newPos.x, newPos.y);
      } else if (occupied.team !== unit.team) {
        return;
      }
      this.turn.next();
    }

    /*
    let collided = false;
    function handleCollision(unit, target) {
      if (!collided) {
        console.log(unit, target);
        collided = true;
      }
    }
    */

    function handleNewRound() {
      this.turn.initRound(this.unitPool);
      first = this.turn.getCurrentUnit().unitId;
      this.unitPool.find((unit) => {
        if (unit.id === first) {
          unit.setInd(true);
        }
      });
    }
  }
}

/*
function createTeam(champs, team, scene, player = 'npc') {
  let arr = [];
  champs.forEach((champ) => {
    const texture = champ.class.charAt(0).toLowerCase() + champ.class.slice(1);
    if (player === 'player') {
      arr.push(new playerUnit(champ, team, scene, 0, 0, texture));
    } else {
      arr.push(new npcUnit(champ, team, scene, 0, 0, texture));
    }
  });
  return arr;
}

function placeTeam(champs, team, yPos) {
  let y = yPos;
  let x = 208;
  let count = 1;
  champs.forEach((champ) => {
    if (count === 4 && team === 'south') {
      y -= 32;
      x = 208;
    } else if (count === 4 && team === 'north') {
      y += 32;
      x = 208;
    }
    champ.x = x;
    champ.y = y;
    x += 32;
    count += 1;
  });
}
*/
