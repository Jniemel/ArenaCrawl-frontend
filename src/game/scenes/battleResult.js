import Phaser from 'phaser';

export default class battleResult extends Phaser.Scene {
  constructor() {
    super('battleResult');
  }

  preload() {}

  create() {
    const bg = this.add.rectangle(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      0xd3d3d3,
    );
    bg.setOrigin(0);

    const borderWidth = 5;
    const bOffset = borderWidth / 2;

    // Top border
    let topBorder = this.add.rectangle(
      0,
      0,
      this.cameras.main.width,
      borderWidth,
      0xffd700,
    );
    topBorder.setOrigin(0);

    // Bottom border
    let bottomBorder = this.add.rectangle(
      0,
      this.cameras.main.height - borderWidth,
      this.cameras.main.width,
      borderWidth,
      0xffd700,
    );
    bottomBorder.setOrigin(0);

    // Left border
    let leftBorder = this.add.rectangle(
      0,
      0,
      borderWidth,
      this.cameras.main.height,
      0xffd700,
    );
    leftBorder.setOrigin(0);

    // Right border
    let rightBorder = this.add.rectangle(
      this.cameras.main.width - borderWidth,
      0,
      borderWidth,
      this.cameras.main.height,
      0xffd700,
    );
    rightBorder.setOrigin(0);
  }
}
