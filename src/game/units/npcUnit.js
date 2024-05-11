import Phaser from 'phaser';
import UnitBase from './unitBase';

export default class npcUnit extends UnitBase {
  constructor(
    character,
    player,
    team,
    hp,
    mp,
    played,
    scene,
    x,
    y,
    texture,
    frame,
  ) {
    super(character, player, team, hp, mp, played, scene, x, y, texture, frame);

    if (
      this.scene.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer
    ) {
      this.fx = this.preFX.addGlow(0xff0000, 1, 0);
      this.renderer = 'webGL';
    } else {
      this.renderer = 'canvas';
      this.indicator = scene.add.graphics();
      this.indicator
        .lineStyle(1, 0xff0000, 1)
        .strokeRect(-this.width / 2, -this.height / 2, 32, 32)
        .setDepth(0);
      this.indicator.x = this.x;
      this.indicator.y = this.y;
    }
  }

  // turn indicator
  setInd(bool) {
    if (this.renderer === 'canvas') {
      this.indicator.x = this.x;
      this.indicator.y = this.y;
    }
    if (bool) {
      this.scaleTween = this.scene.tweens.add({
        targets: this,
        scaleX: 1.3,
        scaleY: 1.3,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: 0,
        duration: 300,
      });
    }
  }

  chooseAction(actions) {
    const moveActions = [];
    const meleeActions = [];
    const rangedActions = [];
    const spellActions = [];
    actions.forEach((a) => {
      switch (a.action) {
        case 'move':
          moveActions.push(a);
          break;
        case 'melee':
          meleeActions.push(a);
          break;
        case 'ranged':
          rangedActions.push(a);
          break;
        case 'spell':
          spellActions.push(a);
          break;
        default:
          break;
      }
    });
    // if enemy in melee -> no spells or ranged
    if (meleeActions.length) {
      return meleeActions.reduce((prev, cur) =>
        prev.hp < cur.hp ? prev : cur,
      );
    } else if (spellActions.length || rangedActions.length) {
      // #TODO choose spell or ranged action
      return;
    } else {
      let closestEnemy = null;
      let closestdistance = 9999;
      // get closest enemy
      this.scene.unitPool.forEach((u) => {
        if (u.team !== this.team && !u.isDead()) {
          const distance = calcDistance(this.x, this.y, u.x, u.y);
          if (distance < closestdistance) {
            closestEnemy = u;
            closestdistance = distance;
          }
        }
      });

      // DEBUGGING, MARK FOUND CLOSEST ENEMY
      this.scene.events.emit('markClosest', closestEnemy);

      // choose move action
      return chooseMoveAction(moveActions, closestEnemy);
    }
  }

  // get unit state for saving battle
  getUnitState() {
    return {
      character: this.character,
      player: 'npc',
      team: this.team,
      hp: this.hp,
      mp: this.mp,
      x: this.x,
      y: this.y,
      played: this.played,
    };
  }
}

function calcDistance(unitX, unitY, enemyX, enemyY) {
  return Math.sqrt(Math.pow(enemyX - unitX, 2) + Math.pow(enemyY - unitY, 2));
}

function chooseMoveAction(moveActions, closestEnemy) {
  let optimalMove = null;
  let bestResult = null;
  moveActions.forEach((move) => {
    const distanceAfterMove = calcDistance(
      move.x,
      move.y,
      closestEnemy.x,
      closestEnemy.y,
    );
    if (!bestResult || distanceAfterMove < bestResult) {
      bestResult = distanceAfterMove;
      optimalMove = move;
    }
  });
  return optimalMove;
}
