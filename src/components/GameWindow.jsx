import PropTypes from 'prop-types';
import Phaser from 'phaser';
import { useEffect, useState } from 'react';
import { config } from '../game/config.js';
import '../stylesheets/game.css';

GameWindow.propTypes = {
  setBattle: PropTypes.func,
};

export default function GameWindow({ setBattle }) {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
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
          TESTBTN_STOP_BATTLE
        </button>
      </div>
      <div id='game-container' className={isReady ? 'visible' : 'invisible'} />
    </div>
  );
}
