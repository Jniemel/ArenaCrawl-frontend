import Phaser from 'phaser';
import UnitBase from './unitBase';

export default class npcUnit extends UnitBase {
  constructor(character, team, hp, scene, x, y, texture, frame) {
    super(character, team, hp, scene, x, y, texture, frame);

    if (
      this.scene.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer
    ) {
      this.preFX.addGlow(0xff0000, 1, 0);
    } else {
      this.indicator = scene.add.graphics();
      this.indicator.lineStyle(1, 0xff0000, 1);
      this.indicator.x = this.x;
      this.indicator.y = this.y;
      this.indicator.strokeRect(-this.width / 2, -this.height / 2, 32, 32);
    }
  }

  setInd(bool) {
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

  /*
  setInd(bool) {
    if (bool) {
      this.scene.tweens.chain({
        targets: this,
        tweens: [
          {
            scaleX: 1.3,
            scaleY: 1.3,
            alpha: { from: 1, to: 0.4 },
            duration: 200,
          },
          {
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 0,
          },
        ],
      });
    }
  }
	*/

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
