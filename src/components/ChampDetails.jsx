import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import '../stylesheets/home.css';

ChampDetails.propTypes = {
  champ: PropTypes.object,
};

export default function ChampDetails({ champ }) {
  const stats = Object.entries(champ.stats);
  const statList = stats.map((stat) => {
    return (
      <div key={uuidv4()}>
        <h4>
          {stat[0].slice(0, 3)}
          <br />
          {stat[1]}
        </h4>
      </div>
    );
  });

  return (
    <div className='details'>
      <div className='det-name-class'>
        <div>
          <h3 style={{ color: 'darkblue' }}>{champ.name},</h3>
        </div>
        <div>
          <h3 style={{ color: champ.cssColor }}>{champ.class}</h3>
        </div>
      </div>
      <div className='det-stats'>{statList}</div>
    </div>
  );
}
