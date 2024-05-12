import Phaser from 'phaser';

export default class UnitBase extends Phaser.GameObjects.Sprite {
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
    super(scene, x, y, texture, frame);
    this.character = character;
    this.player = player;
    this.team = team;
    this.hp = hp;
    this.mp = mp;
    this.played = played;
    this.dead = this.hp <= 0 ? true : false;
    this.scene = scene;

    // enable physics
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.body.setCollideWorldBounds(true);

    // create health/mana bars
    if (!this.dead) {
      this.createUnitBars();
      this.setDepth(1);
    } else {
      this.setDead();
    }
  }

  createUnitBars() {
    // health bar bg
    this.healthBarBg = this.scene.add.graphics();
    this.healthBarBg
      .fillStyle(0xff0000, 1)
      .fillRect(this.x + 2 - this.width / 2, this.y + 14, this.width - 4, 2)
      .setDepth(2);

    // health bar fg
    this.healthBarFg = this.scene.add.graphics();
    this.healthBarFg.setDepth(2);

    this.updateHealthBar();

    // Mana bar bg
    this.manaBarBg = this.scene.add.graphics();
    this.manaBarBg
      .fillStyle(0x000000, 1)
      .fillRect(this.x + 2 - this.width / 2, this.y + 16, this.width - 4, 2)
      .setDepth(2);

    // mana bar fg
    this.manaBarFg = this.scene.add.graphics();
    this.manaBarFg.setDepth(2);
    this.updateManaBar();
  }

  updateHealthBar() {
    this.healthBarFg
      .clear()
      .fillStyle(0x32cd32, 1)
      .fillRect(
        this.x + 2 - this.width / 2,
        this.y + 14,
        ((this.width - 4) * this.hp) / this.character.maxHp,
        2,
      );
  }

  updateManaBar() {
    this.manaBarFg
      .clear()
      .fillStyle(0x0000cd, 1)
      .fillRect(
        this.x + 2 - this.width / 2,
        this.y + 16,
        // #todo change to maxMp in future
        ((this.width - 4) * this.mp) / this.mp,
        2,
      );
  }

  updateBarPositions(remove = false) {
    // Setting this.bar.x = this.x and this.bar.y = this.y DOES NOT WORK
    // Destroying and remaking bars works "for now"
    this.healthBarBg.destroy(this.scene);
    this.healthBarFg.destroy(this.scene);
    this.manaBarBg.destroy(this.scene);
    this.manaBarFg.destroy(this.scene);
    if (!remove) {
      this.createUnitBars();
    }
  }

  setDead() {
    this.dead = true;
    this.scene.events.emit('unitDied', this.character._id);
    this.setDepth(0);
    this.scene.tweens.add({
      targets: this,
      angle: 90,
      duration: 500,
    });
    if (this.healthBarBg) {
      this.updateBarPositions(true);
    }
  }

  isDead() {
    return this.dead;
  }

  setDone() {
    this.played = this.played ? false : true;
  }

  isDone() {
    return this.played;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  // one tile: 32x32 px
  getNewPos(dir) {
    if (dir === 'wait') {
      return;
    }
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
    const offset = dirs.find((d) => d.dir === dir);
    return { x: this.x + offset.x, y: this.y + offset.y };
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
    this.updateBarPositions();
  }

  melee(target) {
    // dmg = (wpnDmg + wepSkill + strModif) - armor
    // strModif = (str - 10) / 2
    // #todo wepSkill, +1 for every 5 levels of weapon skill
    const dmg = Math.ceil(
      rollDice(8) + (this.character.stats.strenght - 10) / 2,
    ); /* + wepSkill */
    const targetAC = target.calcAC();
    if (dmg > targetAC) {
      target.receiveHit('physical', dmg - targetAC);
    } else {
      target.dodgeHit();
    }
  }

  calcAC() {
    // AC = armor rating + dexModif ((dex - 10 )/ 2)
    return Math.ceil(3 + (this.character.stats.dexterity - 10) / 2); /* + AR */
  }

  receiveHit(source, amount) {
    this.showDamageText(amount);
    if (source === 'physical') {
      this.displayPhysicalHit();
    }
    this.hp -= amount;
    if (this.hp <= 0) {
      this.y += 5;
      this.setDead();
    }
    this.updateHealthBar();
  }

  dodgeHit() {
    this.showDamageText();
    this.scene.tweens.add({
      targets: this,
      x: this.x - 8,
      y: this.y + 4,
      ease: 'Linear',
      yoyo: true,
      duration: 200,
    });
  }

  displayPhysicalHit() {
    this.scene.tweens.add({
      targets: this,
      tint: 0xff0000,
      yoyo: true,
      duration: 300,
    });
  }

  showDamageText(amount) {
    let damageText = this.scene.add.text(
      this.x,
      this.y,
      `-${amount ? amount : 'Miss'}`,
      {
        font: '20px Arial',
        fontWeight: '700',
        color: 'blue',
      },
    );
    damageText.setOrigin(0.5, 0.5);
    this.scene.tweens.add({
      targets: damageText,
      y: this.y - 50,
      alpha: 0,
      duration: 3000,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        damageText.destroy();
      },
    });
  }

  // AI
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
      // calc distance to all enemies to find closest
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
      // this.scene.events.emit('markClosest', closestEnemy);

      // pick the move action which brings unit closest to enemy
      return chooseMoveAction(moveActions, closestEnemy);
    }
  }
}

function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// calculate euclidean distance
function calcDistance(unitX, unitY, enemyX, enemyY) {
  return Math.sqrt(Math.pow(enemyX - unitX, 2) + Math.pow(enemyY - unitY, 2));
}

// calculate which available move action makes the euclidean distance the smallest
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
