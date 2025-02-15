import PropTypes from 'prop-types';
import Phaser from 'phaser';
import { useEffect } from 'react';
import { config } from '../game/config.js';
import '../stylesheets/game.css';

GameWindow.propTypes = {
  battleData: PropTypes.object,
  setViewResults: PropTypes.func,
};

export default function GameWindow({ battleData, setViewResults }) {
  useEffect(() => {
    async function launchGame() {
      const game = new Phaser.Game(config);
      game.scene.start('preloader', { battleData });
      return () => {
        game.destroy(true);
      };
    }
    setViewResults(true);
    launchGame();
  }, [battleData, setViewResults]);

  return (
    <div className='game-window'>
      <div className='game-window-header'></div>
      <div id='game-container' />
    </div>
  );
}
