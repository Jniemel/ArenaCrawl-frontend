export default class Turn {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.queue = [];
    this.player = null;
    this.currentUnitId = null;
    this.turnNumber = 1;
  }

  initRound(unitPool) {
    // make sure not all units have played turn
    let turnLeft = false;
    unitPool.find((unit) => {
      if (!unit.isDone()) {
        turnLeft = true;
      }
    });
    // if all turns played, reset
    if (!turnLeft) {
      unitPool.forEach((unit) => {
        unit.setDone();
      });
    }
    // split teams from unit pool
    let teamSouth = [];
    let teamNorth = [];
    unitPool.forEach((unit) => {
      if (unit.team === 'south') {
        teamSouth.push(unit);
      } else {
        teamNorth.push(unit);
      }
    });
    // sort the turn order of the teams units
    const sQue = this.sortQueue(teamSouth);
    const nQue = this.sortQueue(teamNorth);
    // check if queues are empty
    if (!sQue.length) {
      this.queue = nQue;
      this.currentUnitId = this.queue[this.queue.length - 1].unitId;
      return;
    } else if (!nQue.length) {
      this.queue = sQue;
      this.currentUnitId = this.queue[this.queue.length - 1].unitId;
      return;
    }
    // set starting player (who has the fastest unit)
    this.player =
      sQue[sQue.length - 1].dex >= nQue[nQue.length - 1].dex
        ? 'south'
        : 'north';
    let len;
    // join the two turn queues into one
    if (sQue.length >= nQue.length) {
      len = sQue.length;
    } else {
      len = nQue.length;
    }
    for (let i = 0; i < len; i++) {
      if (this.player === 'south') {
        if (nQue[i]) {
          this.queue.push(nQue[i]);
        }
        if (sQue[i]) {
          this.queue.push(sQue[i]);
        }
      } else {
        if (sQue[i]) {
          this.queue.push(sQue[i]);
        }
        if (nQue[i]) {
          this.queue.push(nQue[i]);
        }
      }
    }
    // set the starting unit
    this.currentUnitId = this.queue[this.queue.length - 1].unitId;
  }

  // sort turn order of the teams units based on dexterity
  sortQueue(team) {
    let queue = [];
    team.forEach((unit) => {
      // skip unit if dead or has played turn
      if (!unit.isDead() && !unit.isDone()) {
        queue.push({
          unitId: unit.character._id,
          dex: unit.character.stats.dexterity,
          player: unit.team,
        });
      }
    });
    return queue.sort((a, b) => a.dex - b.dex);
  }

  next() {
    this.queue.pop();
    this.eventEmitter.emit('setIndicator', {
      set: false,
      unitId: this.currentUnitId,
    });
    if (!this.queue.length) {
      this.eventEmitter.emit('newRound');
      return;
    }
    this.startTurn();
  }

  startTurn() {
    this.player = this.queue[this.queue.length - 1].player;
    this.currentUnitId = this.queue[this.queue.length - 1].unitId;
    // set current units turn indicator visible and previous units indicator invisible
    this.eventEmitter.emit('setIndicator', {
      set: true,
      unitId: this.currentUnitId,
    });
  }

  getCurrentUnit() {
    return { player: this.player, unitId: this.currentUnitId };
  }
}
