import UnitBase from './unitBase';

export default class npcUnit extends UnitBase {
  constructor(character, team, hp, scene, x, y, texture, frame) {
    super(character, team, hp, scene, x, y, texture, frame);
  }

  setInd(bool) {
    if (bool) {
      this.scene.tweens.chain({
        targets: this,
        tweens: [
          {
            scaleX: 1.3,
            scaleY: 1.3,
            alpha: { from: 1, to: 0 },
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
