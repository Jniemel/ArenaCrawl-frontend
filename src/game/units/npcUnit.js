import UnitBase from './unitBase';

export default class npcUnit extends UnitBase {
  constructor(character, team, scene, x, y, texture, frame) {
    super(character, team, scene, x, y, texture, frame);

    // turn indicator
    this.indicator = scene.add.graphics();
    this.indicator.lineStyle(1, 0xffff00, 1);
    this.indicator.x = this.x;
    this.indicator.y = this.y;
    this.indicator.strokeRect(this.x, this.y, 32, 32);
    this.indicator.setVisible(false);
  }

  setInd(bool) {
    this.indicator.x = this.x;
    this.indicator.y = this.y;
    this.indicator.setVisible(bool);
    if (bool && this.fadeTween) {
      this.fadeTween.restart();
    } else if (bool && !this.fadeTween) {
      this.fadeTween = this.scene.tweens.add({
        targets: this,
        scaleX: 1.2,
        scaleY: 1.2,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: 0,
        duration: 600,
      });
    }
  }
}
