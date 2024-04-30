import PropTypes from 'prop-types';
import '../stylesheets/home.css';

Navigation.propTypes = {
  setIndex: PropTypes.func,
};

export default function Navigation({ setIndex }) {
  return (
    <nav>
      <div className='to-battle'>
        <button>To battle!</button>
      </div>
      <div>
        <button
          onClick={() => {
            setIndex('wep');
          }}
        >
          Weapons
        </button>
        <button
          onClick={() => {
            setIndex('arm');
          }}
        >
          Armory
        </button>
        <button
          onClick={() => {
            setIndex('mag');
          }}
        >
          Magic shop
        </button>
        <button
          onClick={() => {
            setIndex('trn');
          }}
        >
          Training
        </button>
        <button
          onClick={() => {
            setIndex('rec');
          }}
        >
          Recruitment
        </button>
        <button
          onClick={() => {
            setIndex('div');
          }}
        >
          Divisions
        </button>
        <button
          onClick={() => {
            setIndex('sch');
          }}
        >
          Schedule
        </button>
      </div>
    </nav>
  );
}
