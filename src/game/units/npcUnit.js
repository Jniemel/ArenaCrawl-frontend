import Phaser from 'phaser';
import UnitBase from './unitBase';

export default class npcUnit extends UnitBase {
  constructor(character, team, hp, scene, x, y, texture, frame) {
    super(character, team, hp, scene, x, y, texture, frame);
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

  getUnitState() {
    return {
      character: this.character,
      player: 'npc',
      team: this.team,
      hp: this.hp,
      x: this.x,
      y: this.y,
    };
  }
}
