export default class Turn {
  constructor(teamSouth, teamNorth) {
    this.tSouth = teamSouth;
    this.tNorth = teamNorth;
    this.southQueue = [];
    this.northQueue = [];
    this.player = null;
    this.underControl = {};
    this.turnNumber = 1;
    this.initRound();
  }

  initRound() {
    this.southQueue = this.sortQueue(this.tSouth);
    this.northQueue = this.sortQueue(this.tNorth);
    this.player = this.getFirstPlayer();
  }

  sortQueue(team) {
    let queue = [];
    team.forEach((unit) => {
      if (!unit.isDead) {
        queue.push(unit);
      }
    });
    return queue.sort((a, b) => b.stats.dexterity - a.stats.dexterity);
  }

  startRound() {
    if (
      this.southQueue[-1].stats.dexterity >= this.northQueue[-1].stats.dexterity
    ) {
      this.player = 'south';
      this.underControl = this.southQueue[-1];
    } else {
      this.player = 'north';
      this.underControl = this.northQueue[-1];
    }
  }

  end() {
    // remove unit from queue
    this.player === 'south' ? this.southQueue.pop() : this.northQueue.pop();
    this.next();
  }

  next() {
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
    this.startRound();
  }

  startTurn() {
    this.underControl =
      this.player === 'south' ? this.southQueue[-1] : this.northQueue[-1];
  }
}
