export default class Turn {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.queue = [];
    this.player = null;
    this.currentUnitId = null;
    this.turnNumber = 1;
  }

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

  next() {
    this.queue.pop();
    if (!this.queue.length) {
      this.eventEmitter.emit('newRound');
      return;
    }
    this.startTurn();
  }

  startTurn() {
    // save previous units id
    const prevId = this.currentUnitId;
    this.player = this.queue[this.queue.length - 1].player;
    this.currentUnitId = this.queue[this.queue.length - 1].unitId;
    // set current units turn indicator visible and previous units indicator invisible
    this.eventEmitter.emit('setIndicator', prevId, this.currentUnitId);
  }

  getCurrentUnit() {
    return { player: this.player, unitId: this.currentUnitId };
  }
}
