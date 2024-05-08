import Phaser from 'phaser';

export default class MoveBtn extends Phaser.GameObjects.Container {
  constructor(scene, x, y, dir) {
    super(scene, x, y);
    this.dir = dir;
    this.btnImg = scene.add.image(0, 0, `${dir}-btn`);
    this.add(this.btnImg);
    this.setSize(80, 60);
    this.setInteractive().on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      () => {
        this.scene.events.emit('move', dir);
      },
    );
  }
}
