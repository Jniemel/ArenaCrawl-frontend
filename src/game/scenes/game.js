import Phaser from 'phaser';
import MoveBtn from '../ui/moveBtn';
import playerUnit from '../units/playerUnit';
import npcUnit from '../units/npcUnit';
import Turn from '../logic/turn';
import { saveBattle } from '../../utils/gameManagement';

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
    let btnsStartX = 374;
    let btnsStartY = 512;
    let count = 1;
    dirs.forEach((dir) => {
      if (count % 4 === 0) {
        btnsStartX = 374;
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
            unit.hp,
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
            unit.hp,
            this,
            unit.x,
            unit.y,
            unit.texture,
          ),
        );
      }
    });

    // turn manager
    this.turn = new Turn(this.events);
    this.turn.initRound(this.unitPool);
    let first = this.turn.getCurrentUnit().unitId;
    this.unitPool.find((unit) => {
      if (unit.character._id === first && unit) {
        unit.setInd(true);
      }
    });

    // event listeners
    this.events.on('setIndicator', handleIndicator, this);
    this.events.on('newRound', handleNewRound, this);
    this.events.on('move', handleMovement, this);

    // handle unit turn indicators
    function handleIndicator(data) {
      this.unitPool.forEach((unit) => {
        if (unit.character._id === data.unitId) {
          unit.setInd(data.set);
        }
      });
    }

    // handle unit movement/attack
    async function handleMovement(dir) {
      const current = this.turn.getCurrentUnit();
      let newPos;
      // get unit instance and calculate new position
      const unit = this.unitPool.find((unit) => {
        if (unit.character._id === current.unitId) {
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
        unit.melee(occupied);
      }
      // save battle
      const unitStates = [];
      this.unitPool.forEach((unit) => {
        unitStates.push(unit.getUnitState());
      });
      await saveBattle(unitStates);
      this.turn.next();
    }

    function handleNewRound() {
      this.turn.initRound(this.unitPool);
      first = this.turn.getCurrentUnit().unitId;
      this.unitPool.find((unit) => {
        if (unit.character._id === first) {
          unit.setInd(true);
        }
      });
    }
  }
}
