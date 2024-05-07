export default class Turn {
  constructor() {
    this.southQueue = [];
    this.northQueue = [];
    this.player = null;
    this.currentUnitId = null;
    this.turnNumber = 1;
  }

  initRound(teamSouth, teamNorth) {
    this.southQueue = this.sortQueue(teamSouth);
    this.northQueue = this.sortQueue(teamNorth);
    this.startRound();
  }

  sortQueue(team) {
    let queue = [];
    team.forEach((unit) => {
      if (!unit.isDead()) {
        queue.push({ unitId: unit.id, dex: unit.stats.dexterity });
      }
    });
    return queue.sort((a, b) => a.dex - b.dex);
  }

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

  next() {
    this.player === 'south' ? this.southQueue.pop() : this.northQueue.pop();
    const sDone = !this.southQueue.length ? true : false;
    const nDone = !this.northQueue.length ? true : false;
    // round done
    if (sDone && nDone) {
      this.initRound();
      return;
    }
    if (this.player === 'south' && !nDone) {
      this.player = 'north';
    } else if (this.player === 'north' && !sDone) {
      this.player = 'south';
    }
    this.startTurn();
  }

  startTurn() {
    console.log('hello');
    this.currentUnitId =
      this.player === 'south'
        ? this.southQueue[this.southQueue.length - 1].unitId
        : this.northQueue[this.northQueue.length - 1].unitId;
  }

  getCurrentUnit() {
    return { team: this.player, unitId: this.currentUnitId };
  }
}
