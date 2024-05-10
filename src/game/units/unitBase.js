import Phaser from 'phaser';

export default class UnitBase extends Phaser.GameObjects.Sprite {
  constructor(character, team, hp, scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.character = character;
    this.team = team;
    this.hp = hp;
    this.dead = this.hp <= 0 ? true : false;
    this.scene = scene;

    // enable physics
    scene.physics.world.enable(this);
    scene.add.existing(this);
  }

  die() {
    this.dead = true;
  }

  isDead() {
    return this.dead;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  // one tile: 32x32 px
  getNewPos(dir) {
    let x = 0;
    let y = 0;
    switch (dir) {
      case 'ne':
        y = -32;
        x = +32;
        break;
      case 'n':
        y = -32;
        break;
      case 'nw':
        y = -32;
        x = -32;
        break;
      case 'e':
        x = -32;
        break;
      case 'w':
        x = +32;
        break;
      case 'se':
        y = +32;
        x = -32;
        break;
      case 's':
        y = +32;
        break;
      case 'sw':
        y = +32;
        x = +32;
        break;
      default:
        break;
    }
    return { x: this.x + x, y: this.y + y };
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  melee(target) {
    // dmg = (wpnDmg + wepSkill + strModif) - armor
    // strModif = (str - 15) / 2
    // #todo wepSkill, +1 for every 5 levels of weapon skill
    const dmg = Math.ceil(
      rollDice(8) + (this.character.stats.strenght - 15) / 2,
    ); /* + wepSkill */
    const targetAC = target.calcAC();
    if (dmg > targetAC) {
      target.receiveHit('physical', dmg - targetAC);
    } else {
      target.dodgeHit();
    }
  }

  calcAC() {
    // AC = armor rating + dexModif ((dex - 15 )/ 2)
    return Math.ceil(3 + (this.character.stats.dexterity - 15) / 2); /* + AR */
  }

  receiveHit(source, amount) {
    this.showDamageText(amount);
    if (source === 'physical') {
      this.displayPhysicalHit();
    }
    this.hp -= amount;
    if (this.hp <= 0) {
      this.die();
    }
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
}

function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// this.setTint(0xff0000);
