import PropTypes from 'prop-types';
import ChampDetails from './ChampDetails';
import { useContext } from 'react';
import { GameStateContext } from '../contexts/gameStateContext';

TeamWindow.propTypes = {
  setViewResults: PropTypes.func,
};

export default function TeamWindow({ setViewResults }) {
  const { gameState, selectedChamp, setSelectedChamp } =
    useContext(GameStateContext);

  const champList = gameState.playerTeam.champs.map((member) => (
    <div className='champ-icon-div' key={member._id}>
      <div className={selectedChamp._id === member._id && 'champ-selected'}>
        <img
          src={`./assets/game/characters/${member.class.toLowerCase()}.png`}
          alt='class-img'
          onClick={() => {
            setSelectedChamp(member);
          }}
        />
      </div>
    </div>
  ));

  return (
    <section className='team-window'>
      <div className='team-info'>
        <div className='team-name'>{gameState.playerTeam.name}</div>
        <div className='stat-grid'>
          <div className='team-stat'>Money: {gameState.playerTeam.money}</div>
          <div className='team-stat'></div>
          <div className='team-stat'>Division: </div>
          <div className='team-stat'></div>
          <div className='team-stat'></div>
          <div className='team-stat'></div>
          <div className='team-stat'></div>
          <div className='view-battle-results'>
            <button
              onClick={() => {
                setViewResults(true);
              }}
            >
              Latest result
            </button>
          </div>
        </div>
      </div>
      <div className='team-preview'>{champList}</div>
      <div className='champ-details'>
        <ChampDetails
          champ={gameState.playerTeam.champs.find(
            (c) => c._id === selectedChamp._id,
          )}
          recruitment={false}
        />
      </div>
    </section>
  );
}
