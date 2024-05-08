export default class Turn {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    // this.southQueue = [];
    // this.northQueue = [];
    this.queue = [];
    this.player = null;
    this.currentUnitId = null;
    this.turnNumber = 1;
  }

  // initRound(teamSouth, teamNorth) {
  /*
    this.southQueue = this.sortQueue(teamSouth);
    this.northQueue = this.sortQueue(teamNorth);
    */
  initRound(unitPool) {
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
        this.queue.push(nQue[i]);
        this.queue.push(sQue[i]);
      } else {
        this.queue.push(sQue[i]);
        this.queue.push(nQue[i]);
      }
    }
    // set the starting unit
    this.currentUnitId = this.queue[this.queue.length - 1].unitId;
    console.log(this.currentUnitId);
    // this.startRound();
  }

  // sort turn order of the teams units based on dexterity
  sortQueue(team) {
    let queue = [];
    team.forEach((unit) => {
      // skip unit if dead
      if (!unit.isDead()) {
        queue.push({
          unitId: unit.id,
          dex: unit.stats.dexterity,
          player: unit.team,
        });
      }
    });
    return queue.sort((a, b) => a.dex - b.dex);
  }

  /*
  startRound() {
    if (       
      this.southQueue[this.southQueue.length - 1].dex >=
      this.northQueue[this.northQueue.length - 1].dex
    ) {
      this.player = 'south';
      this.currentUnitId = this.southQueue[this.southQueue.length - 1].unitId;
    } else {
      this.player = 'north';
      this.currentUnitId = this.northQueue[this.northQueue.length - 1].unitId;
    }
  }
  */

  next() {
    this.queue.pop();
    if (!this.queue.length) {
      this.eventEmitter.emit('newRound');
      return;
    }
    this.startTurn();
    /*
    this.player === 'south' ? this.southQueue.pop() : this.northQueue.pop();
    const sDone = !this.southQueue.length ? true : false;
    const nDone = !this.northQueue.length ? true : false;   
    // round done
    if (sDone && nDone) {
      this.eventEmitter.emit('newRound');
      return;
    }    
    if (this.player === 'south' && !nDone) {
      this.player = 'north';
    } else if (this.player === 'north' && !sDone) {
      this.player = 'south';
    }
    this.startTurn();
    */
  }

  startTurn() {
    // save previous units id
    const prevId = this.currentUnitId;
    this.player = this.queue[this.queue.length - 1].player;
    this.currentUnitId = this.queue[this.queue.length - 1].unitId;
    // set current units turn indicator visible and previous units indicator invisible
    this.eventEmitter.emit('setIndicator', prevId, this.currentUnitId);

    /*
    this.currentUnitId =
      this.player === 'south'
        ? this.southQueue[this.southQueue.length - 1].unitId
        : this.northQueue[this.northQueue.length - 1].unitId;
    */
  }

  getCurrentUnit() {
    return { player: this.player, unitId: this.currentUnitId };
  }
}
