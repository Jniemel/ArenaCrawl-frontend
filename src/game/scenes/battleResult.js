import Phaser from 'phaser';

export default class battleResult extends Phaser.Scene {
  constructor() {
    super('battleResult');
  }

  init(data) {
    this.results = data.battleData;
  }

  preload() {}

  create() {
    // background
    const bg = this.add.rectangle(0, 0, 416, 660, 0xfaf0e6);
    bg.setOrigin(0);

    // borders
    const bWidth = 4;
    const bTop = this.add.rectangle(0, 0, 416, bWidth, 0xb8860b);
    bTop.setOrigin(0);

    const bBot = this.add.rectangle(0, 660 - bWidth, 416, bWidth, 0xb8860b);
    bBot.setOrigin(0);

    const bLeft = this.add.rectangle(0, 0, bWidth, 660, 0xb8860b);
    bLeft.setOrigin(0);

    let bRight = this.add.rectangle(416 - bWidth, 0, bWidth, 660, 0xb8860b);
    bRight.setOrigin(0);

    console.log(this.results);
    if (!this.results) {
      const text = this.add.text(75, 100, 'Unable to load the results', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#000000',
        align: 'center',
      });
      text.setOrigin(0);
    }

    // done button
    const doneBtn = this.add
      .sprite(350, 590, 'done-btn')
      .setInteractive()
      .setOrigin(0);
    doneBtn.on('pointerdown', function () {}, this);
  }
}
