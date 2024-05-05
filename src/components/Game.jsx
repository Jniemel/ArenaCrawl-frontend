// import PropTypes from 'prop-types';
import Phaser from 'phaser';
import { useEffect, useState } from 'react';

/*
Game.propTypes = {
  setBattle: PropTypes.func,
};
*/

class Example extends Phaser.Scene {
  preload() {
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });
    const logo = this.physics.add.image(400, 100, 'logo');
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    particles.startFollow(logo);
    this.game.events.emit('gameReady', true);
  }
}

export default function Game() {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    let config = {
      type: Phaser.AUTO,
      parent: 'game-container',
      height: 500,
      width: 800,
      scene: Example,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
        },
      },
      scale: {
        parent: 'game-container',
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
    };
    let game = new Phaser.Game(config);
    // Triggered when game is fully visible.
    game.events.on('gameReady', setReady);
    // If you don't do this, you get duplicates of the canvas piling up
    // everytime this component renders.
    return () => {
      setReady(false);
      game.destroy(true);
    };
    // You must have an empty array here otherwise the game restarts every time
    // the component renders.
  }, []);
  // Return the host element where Phaser3 will append the canvas.
  return (
    <div id='game-container' className={isReady ? 'visible' : 'invisible'} />
  );
}
