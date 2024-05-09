import UnitBase from './unitBase';

export default class playerUnit extends UnitBase {
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
        alpha: { from: 0.4, to: 1 },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        duration: 600,
      });
    } else {
      this.fadeTween.pause();
      this.alpha = 1;
    }
  }
}
