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
            unit.mp,
            unit.played,
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
            unit.mp,
            unit.played,
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
    const first = this.turn.getCurrentUnit().unitId;
    this.events.emit('setIndicator', {
      set: true,
      unitId: first,
    });
    /*
    this.unitPool.find((unit) => {
      if (unit.character._id === first && unit) {
        unit.setInd(true);
      }
    });
    */

    // event listeners
    this.events.on('newRound', handleNewRound, this);
    this.events.on('setIndicator', handleIndicator, this);
    this.events.on('endTurn', handleEndTurn, this);
    this.events.on('move', handleMovement, this);
    this.events.on('unitDied', handleDeath, this);

    // handle unit turn indicators
    function handleIndicator(data) {
      this.unitPool.forEach((unit) => {
        if (unit.character._id === data.unitId) {
          unit.setInd(data.set);
        }
      });
    }

    function handleDeath(unitId) {
      this.turn.removeUnitFromQue(unitId);
    }

    // handle unit movement/attack
    async function handleMovement(dir) {
      // get unit game object
      const current = this.turn.getCurrentUnit();
      const unit = this.unitPool.find(
        (u) => u.character._id === current.unitId,
      );
      if (dir === 'wait') {
        this.events.emit('endTurn', unit);
        return;
      }
      const newPos = unit.getNewPos(dir);
      // check if new position occupied and return occupying unit (if any)
      const occupied = this.unitPool.find(
        (u) => JSON.stringify(u.getPos()) === JSON.stringify(newPos),
      );
      // if not occupied -> check if wall/obstacle -> if ok, move
      // if occupied by ally -> swap
      // if occupied by enemy -> attack
      if (!occupied) {
        if (!checkObstacles(unit, newPos)) {
          unit.setPos(newPos.x, newPos.y);
        } else {
          return;
        }
      } else if (occupied.team === unit.team) {
        const swapPos = unit.getPos();
        occupied.setPos(swapPos.x, swapPos.y);
        unit.setPos(newPos.x, newPos.y);
      } else if (occupied.team !== unit.team) {
        unit.melee(occupied);
      }
      this.events.emit('endTurn', unit);
    }

    function checkObstacles(unit, pos, player = true) {
      const tile = wallsLayer.getTileAtWorldXY(pos.x, pos.y);
      if (tile && tile.properties.collides) {
        if (player) {
          unit.collision();
        }
        return true;
      }
      return false;
    }

    // npc check possible actions
    function npcPossibleActions(unit) {
      const dirs = [
        { dir: 'n', x: 0, y: -32 }, // north
        { dir: 'nw', x: -32, y: -32 }, // north-west
        { dir: 'ne', x: 32, y: -32 }, // north-east
        { dir: 'w', x: 32, y: 0 }, // west
        { dir: 'e', x: -32, y: 0 }, // east
        { dir: 's', x: 0, y: 32 }, // south
        { dir: 'sw', x: 32, y: 32 }, // south-west
        { dir: 'se', x: -32, y: 32 }, // south-east
      ];
      // possible actions
      const actions = [];
      // let ranged = true;
      // possible movement/melee actions
      dirs.forEach((dir) => {
        const pos = { x: this.x + dir.x, y: this.y + dir.y };
        // check if pos occupied
        const occupied = this.unitPool.find(
          (u) => JSON.stringify(u.getPos()) === JSON.stringify(pos),
        );
        // if not occupied and not obstacle, add 'move' as possible action
        if (!occupied) {
          if (!checkObstacles(unit, pos, false)) {
            actions.push({ x: pos.x, y: pos.y, action: 'move' });
          }
        } else {
          if (occupied.team === unit.team) {
            actions.push({ x: pos.x, y: pos.y, action: 'swap' });
          } else if (occupied.team !== unit.team) {
            actions.push({ x: pos.x, y: pos.y, action: 'melee' });
            // if enemy units adjacent, deny ranged attacks / spells
            // ranged = false;
          }
        }
      });
      // #todo add ranged / spell actions
      /*
      if (ranged) {
        if (unit.character.equipment.ranged !== 'empty') {
          actions.push({ x: 0, y: 0, action: 'ranged' });
        }
        if (unit.character.spells.lenght) {
          actions.push({ x: 0, y: 0, action: 'spell' });
        }
      }
      */
      return actions;
    }

    async function handleEndTurn(unit) {
      unit.setDone();
      // save battle
      const unitStates = [];
      this.unitPool.forEach((u) => {
        unitStates.push(u.getUnitState());
      });
      await saveBattle(unitStates);
      this.turn.next();
    }

    function handleNewRound() {
      this.unitPool.forEach((u) => {
        u.setDone();
      });
      this.turn.initRound(this.unitPool);
      const first = this.turn.getCurrentUnit().unitId;
      this.events.emit('setIndicator', {
        set: true,
        unitId: first,
      });
      /*
      first = this.turn.getCurrentUnit().unitId;
      this.unitPool.find((u) => {
        if (u.character._id === first) {
          u.setInd(true);
        }
      });
      */
    }
  }
}
