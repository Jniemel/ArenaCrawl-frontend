import PropTypes from 'prop-types';
import '../stylesheets/home.css';

Navigation.propTypes = {
  setNav: PropTypes.func,
};

export default function Navigation({ setNav }) {
  return (
    <nav>
      <div className='to-battle'>
        <button>To battle!</button>
      </div>
      <div>
        <button
          onClick={() => {
            setNav('wep');
          }}
        >
          Weapons
        </button>
        <button
          onClick={() => {
            setNav('arm');
          }}
        >
          Armory
        </button>
        <button
          onClick={() => {
            setNav('mag');
          }}
        >
          Magic shop
        </button>
        <button
          onClick={() => {
            setNav('trn');
          }}
        >
          Training
        </button>
        <button
          onClick={() => {
            setNav('rec');
          }}
        >
          Recruitment
        </button>
        <button
          onClick={() => {
            setNav('div');
          }}
        >
          Divisions
        </button>
        <button
          onClick={() => {
            setNav('sch');
          }}
        >
          Schedule
        </button>
      </div>
    </nav>
  );
}
