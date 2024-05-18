import PropTypes from 'prop-types';
import ChampDetails from './ChampDetails';

TeamWindow.propTypes = {
  playerTeam: PropTypes.object,
  setViewResults: PropTypes.func,
  selectedChamp: PropTypes.object,
  setSelectedChamp: PropTypes.func,
};

export default function TeamWindow({
  playerTeam,
  setViewResults,
  selectedChamp,
  setSelectedChamp,
}) {
  const team = playerTeam.champs;
  const champList = team.map((member) => (
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
        <div className='team-name'>{playerTeam.name}</div>
        <div className='stat-grid'>
          <div className='team-stat'>Money: {playerTeam.money}</div>
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
        <ChampDetails champ={selectedChamp} recruitment={false} />
      </div>
    </section>
  );
}
