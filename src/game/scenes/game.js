import Phaser from 'phaser';
import MoveBtn from '../ui/moveBtn';
import playerUnit from '../units/playerUnit';
import npcUnit from '../units/npcUnit';
import Turn from '../logic/turn';
import { finishBattle, saveBattle } from '../../utils/gameManagement';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
    this.unitPool = [];
    this.errorState = false;
    this.wait = false;
    this.auto = false;
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
    // auto play button
    let waitAuto = false;
    const autoBtn = this.add.sprite(84, 565, 'auto-btn').setInteractive();
    autoBtn.on(
      'pointerdown',
      function () {
        if (!waitAuto) {
          this.auto = this.auto ? false : true;
          if (this.auto) {
            autoBtn.setTexture('auto-btn-down');
            if (this.turn.getCurrentUnit().player === 'player') {
              const current = this.turn.getCurrentUnit();
              const unit = this.unitPool.find(
                (u) => u.character._id === current.unitId,
              );
              this.events.emit('triggerNpcAction', unit);
            }
          } else {
            autoBtn.setTexture('auto-btn');
          }
          waitAuto = true;
          this.time.delayedCall(1000, () => {
            waitAuto = false;
          });
        }
      },
      this,
    );

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

    // check if game finished
    function isBattleWon(unitPool) {
      let sLeft = false;
      let nLeft = false;
      for (let i = 0; i < unitPool.length; i++) {
        if (!unitPool[i].isDead() && unitPool[i].team === 'south') {
          sLeft = true;
        } else if (!unitPool[i].isDead() && unitPool[i].team === 'north') {
          nLeft = true;
        }
        if (sLeft && nLeft) {
          return false;
        }
      }
      if (sLeft && !nLeft) {
        return 'south';
      }
      return 'north';
    }

    // event listeners
    this.events.on('newRound', handleNewRound, this);
    this.events.on('setIndicator', handleIndicator, this);
    this.events.on('endTurn', handleEndTurn, this);
    this.events.on('triggerNpcAction', handleNpcAction, this);
    this.events.on('move', handleMovement, this);
    this.events.on('battleOver', handleBattleOver, this);

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
      this.turn.startTurn();
    }

    // handle unit turn indicators
    function handleIndicator(data) {
      this.unitPool.find((unit) => {
        if (unit.character._id === data.unitId) {
          // check if unit died before its turn
          if (unit.isDead()) {
            this.turn.skipDeadUnit();
            return;
          }
          unit.setInd(data.set);
          // trigger npc action
          if (data.set && (unit.player === 'npc' || this.auto)) {
            this.events.emit('triggerNpcAction', unit);
          }
        }
      });
    }

    async function handleEndTurn(data) {
      data.unit.setDone();
      this.wait = true;
      if (!this.errorState) {
        // if unit killed, check if battle over
        if (data.logMsg.action === 'kill') {
          const result = isBattleWon(this.unitPool);
          if (result) {
            const delay = 3000;
            setTimeout(() => {
              this.events.emit('battleOver', {
                result: result,
                logMsg: data.logMsg,
              });
              return;
            }, delay);
          }
        }
        // save unit states
        const unitStates = [];
        this.unitPool.forEach((u) => {
          unitStates.push(u.getUnitState());
        });
        const res = await saveBattle(unitStates, data.logMsg);
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
      let log = null;
      let target = null;

      // DEBUGGING
      // this.events.emit('markMove', chosen);

      switch (chosen.action) {
        case 'melee':
          target = this.unitPool.find(
            (u) => u.character._id === chosen.targetId,
          );
          log = npc.melee(target);
          if (target.isDead()) {
            log.action = 'kill';
          }
          break;
        // #TODO add ranged and spell actions
        case 'ranged':
        case 'spell':
          break;
        case 'move':
          log = npc.setPos(chosen.x, chosen.y);
          break;
        default:
          log = chosen;
          break;
      }
      this.events.emit('endTurn', { unit: npc, logMsg: log });
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
        { dir: 'wait', x: 0, y: 0 }, // south-east
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
      let log = null;
      if (!occupied) {
        if (!checkObstacles(unit, newPos)) {
          log = unit.setPos(newPos.x, newPos.y);
        } else {
          return;
        }
      } else if (occupied.team === unit.team) {
        const swapPos = unit.getPos();
        const swapLogTarget = occupied.setPos(swapPos.x, swapPos.y);
        const swapLogUnit = unit.setPos(newPos.x, newPos.y);
        // combine the two log messages
        log = {
          action: 'swap',
          unitId: swapLogUnit.unitId,
          unitName: swapLogUnit.name,
          unitX: swapLogUnit.x,
          unitY: swapLogUnit.y,
          targetId: swapLogTarget.unitId,
          targetName: swapLogTarget.name,
          targetX: swapLogTarget.x,
          targetY: swapLogTarget.y,
        };
      } else if (occupied.team !== unit.team) {
        log = unit.melee(occupied);
        if (occupied.isDead()) {
          log.action = 'kill';
        }
      }
      this.events.emit('endTurn', { unit: unit, logMsg: log });
    }

    async function handleBattleOver(data) {
      // save final unit states
      const unitStates = [];
      this.unitPool.forEach((u) => {
        unitStates.push(u.getUnitState());
      });
      const res = await finishBattle(unitStates, data.result, data.logMsg);
      if (res === 200) {
        window.location.reload();
        return;
      }
      alert(`Saving failed. Response: ${res}`);
    }

    // check if battle is over when loading the game up
    // in case a finished battle is loaded
    const result = isBattleWon(this.unitPool);
    if (result) {
      this.events.emit('battleOver', { result: result, logMsg: null });
    } else {
      this.turn.initRound(this.unitPool);
      this.turn.startTurn();
    }
  }
}
