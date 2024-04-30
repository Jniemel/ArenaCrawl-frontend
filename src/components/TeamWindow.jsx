import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import '../stylesheets/home.css';

TeamWindow.propTypes = {
  teamName: PropTypes.string,
  playerTeam: PropTypes.array,
};

export default function TeamWindow({ teamName, playerTeam }) {
  const champs = playerTeam.map((champ) => (
    <div className='champ-icon-div' key={champ}>
      <div>{champ}</div>
    </div>
  ));

  return (
    <section className='team-window'>
      <div className='team-info'>
        <div className='team-name'>{teamName}</div>
        <div className='stat-grid'>
          <div className='team-stat'>Stat1:</div>
          <div className='team-stat'>Stat2:</div>
          <div className='team-stat'>Stat3:</div>
          <div className='team-stat'>Stat4:</div>
        </div>
      </div>
      <div className='team-preview'>{champs}</div>
      <div className='champ-details'></div>
    </section>
  );
}
