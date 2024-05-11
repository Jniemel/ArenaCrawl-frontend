import Phaser from 'phaser';
import UnitBase from './unitBase';

export default class playerUnit extends UnitBase {
  constructor(character, team, hp, mp, played, scene, x, y, texture, frame) {
    super(character, team, hp, mp, played, scene, x, y, texture, frame);

    if (
      this.scene.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer
    ) {
      this.fx = this.preFX.addGlow(0x1e90ff, 1, 0);
      this.fx.active = false;
      this.renderer = 'webGL';
    } else {
      this.renderer = 'canvas';
      this.indicator = scene.add.graphics();
      this.indicator
        .lineStyle(1, 0x0000cd, 1)
        .strokeRect(-this.width / 2, -this.height / 2, 32, 32)
        .setDepth(0)
        .setVisible(false);
      this.indicator.x = this.x;
      this.indicator.y = this.y;
    }

    /*
    // yellow rectangle around character
    // turn indicator
    this.indicator = scene.add.graphics();
    this.indicator.lineStyle(1, 0xffff00, 1);
    this.indicator.x = this.x;
    this.indicator.y = this.y;
    this.indicator.strokeRect(-this.width / 2, -this.height / 2, 32, 32);
    this.indicator.setVisible(false);
    */
  }

  // turn indicator
  setInd(bool) {
    if (bool && this.renderer === 'canvas') {
      this.indicator.x = this.x;
      this.indicator.y = this.y;
      this.indicator.setVisible(bool);
    } else if (bool && this.renderer === 'webGL') {
      this.fx.active = bool;
    } else if (!bool) {
      if (this.renderer === 'canvas') {
        this.indicator.setVisible(bool);
      } else {
        this.fx.active = bool;
      }
    }
    if (bool && this.fadeTween) {
      this.fadeTween.restart();
    } else if (bool && !this.fadeTween) {
      this.fadeTween = this.scene.tweens.add({
        targets: this,
        alpha: { from: 0.4, to: 1 },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        duration: 500,
      });
    } else {
      this.fadeTween.pause();
      this.alpha = 1;
    }
  }
  // visual effect if trying to run into a wall
  collision() {
    this.scene.tweens.chain({
      targets: this,
      tweens: [
        {
          angle: 8,
          duration: 25,
          ease: 'linear',
        },
        {
          angle: -8,
          duration: 25,
          ease: 'linear',
        },
        {
          angle: 0,
          duration: 10,
        },
      ],
      loop: 2,
    });
  }
  // get unit state for saving battle
  getUnitState() {
    return {
      character: this.character,
      player: 'player',
      team: this.team,
      hp: this.hp,
      mp: this.mp,
      x: this.x,
      y: this.y,
      played: this.played,
    };
  }
}
