import PropTypes from 'prop-types';
import Phaser from 'phaser';
import { useEffect, useState } from 'react';
import Game from '../game/game.js';
import '../stylesheets/game.css';

GameWindow.propTypes = {
  setBattle: PropTypes.func,
};

export default function GameWindow({ setBattle }) {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    const config = {
      parent: 'game-container',
      type: Phaser.AUTO,
      height: 640,
      width: 480,
      scale: {
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
      scene: [Game],
    };
    const game = new Phaser.Game(config);
    game.events.on('gameReady', setReady);
    return () => {
      setReady(false);
      game.destroy(true);
    };
  }, []);

  return (
    <div className='game-window'>
      <div className='game-window-header'>
        <button
          onClick={() => {
            setBattle(false);
          }}
        >
          Exit battle
        </button>
      </div>
      <div id='game-container' className={isReady ? 'visible' : 'invisible'} />
    </div>
  );
}
