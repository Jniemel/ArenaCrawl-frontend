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
    this.errorState = false;
    this.wait = false;
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
            unit.player,
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
            unit.player,
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
    this.events.on('triggerNpcAction', handleNpcAction, this);
    this.events.on('move', handleMovement, this);
    this.events.on('unitDied', handleDeath, this);

    /// DEBUGGING ///
    /*
    const closest = this.add.graphics();
    closest.lineStyle(2, 0xff0000, 1).strokeRect(0, 0, 32, 32).setVisible(true);
    this.events.on('markClosest', markClosest, this);
    function markClosest(unit) {
      closest.x = unit.x - 16;
      closest.y = unit.y - 16;
    }
    
    const chosenMove = this.add.graphics();
    chosenMove
      .lineStyle(2, 0x00008b, 1)
      .strokeRect(0, 0, 32, 32)
      .setVisible(true);
    this.events.on('markMove', markMove, this);
    function markMove(chosen) {
      chosenMove.x = chosen.x - 16;
      chosenMove.y = chosen.y - 16;
    }
    */
    ///////////////////

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
    }

    // handle unit turn indicators
    function handleIndicator(data) {
      this.unitPool.find((unit) => {
        if (unit.character._id === data.unitId) {
          unit.setInd(data.set);
          // trigger npc action
          if (data.set && unit.player === 'npc') {
            this.events.emit('triggerNpcAction', unit);
          }
        }
      });
    }

    async function handleEndTurn(unit) {
      this.wait = true;
      unit.setDone();
      let res;
      // save battle
      if (!this.errorState) {
        const unitStates = [];
        this.unitPool.forEach((u) => {
          unitStates.push(u.getUnitState());
        });
        res = await saveBattle(unitStates);
        if (res === 200) {
          const delay = 500;
          setTimeout(() => {
            this.turn.next();
            this.wait = false;
            return;
          }, delay);
        } else {
          alert(`ErrorState activated, saving off. Response: ${res}`);
          this.errorState = true;
          return;
        }
      } else {
        alert('ErrorState active, try refreshing page.');
        this.wait = false;
      }
    }

    function handleNpcAction(npc) {
      const actions = npcPossibleActions(npc, this);
      const chosen = npc.chooseAction(actions);

      // DEBUGGING
      // this.events.emit('markMove', chosen);

      switch (chosen.action) {
        case 'melee':
          npc.melee(
            this.unitPool.find((u) => u.character._id === chosen.targetId),
          );
          break;
        // #TODO add ranged and spell actions
        case 'ranged':
        case 'spell':
          break;
        case 'move':
          npc.setPos(chosen.x, chosen.y);
          break;
        default:
          break;
      }
      this.events.emit('endTurn', npc);
    }

    function npcPossibleActions(unit, self) {
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
      // possible movement/melee actions
      dirs.forEach((dir) => {
        const pos = { x: unit.x + dir.x, y: unit.y + dir.y };
        // check if pos occupied
        const occupied = self.unitPool.find(
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
            actions.push({
              hp: occupied.hp,
              targetId: occupied.character._id,
              action: 'melee',
            });
          }
        }
      });
      // #todo add ranged / spell actions
      /*
      // possible ranged actions
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

    // handle unit movement/attack
    function handleMovement(dir) {
      // get unit game object
      const current = this.turn.getCurrentUnit();
      const unit = this.unitPool.find(
        (u) => u.character._id === current.unitId,
      );
      if (unit.player !== 'player' || this.wait) {
        return;
      }
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

    function handleDeath(unitId) {
      this.turn.removeUnitFromQue(unitId);
    }
  }
}
