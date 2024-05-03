import PropTypes from 'prop-types';
import { useState } from 'react';
import '../stylesheets/home.css';

TeamWindow.propTypes = {
  playerTeam: PropTypes.object,
};

export default function TeamWindow({ playerTeam }) {
  const team = playerTeam.champs;
  const [champ, setChamp] = useState(team[0]);
  const [selected, setSelected] = useState(team[0]._id);

  /*
  function displayDetails(champDetails) {
    setChamp(champDetails)
  }
  */

  const champList = team.map((member) => (
    <div className='champ-icon-div' key={member._id}>
      <div className={selected === member._id && 'champ-selected'}>
        <img
          src={`./assets/img/characters/${member.class.toLowerCase()}.png`}
          alt='class-img'
          onClick={() => {
            setSelected(member._id);
            setChamp(member);
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
          <div className='team-stat'>Stat2:</div>
          <div className='team-stat'>Stat3:</div>
          <div className='team-stat'>Stat4:</div>
        </div>
      </div>
      <div className='team-preview'>{champList}</div>
      <div className='champ-details'>
        <button
          onClick={() => {
            console.log(playerTeam.champs);
          }}
        >
          consolelog
        </button>
      </div>
    </section>
  );
}
