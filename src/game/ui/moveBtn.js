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
        switch (dir) {
          case 'n':
            this.scene.events.emit('moveNorth');
            break;
          /*		
          case 'n':
            this.scene.events.emit('moveNorth');
            break;
          default:
            break;
				*/
        }
        console.log(`direction : ${dir}`);
      },
    );
  }
}
