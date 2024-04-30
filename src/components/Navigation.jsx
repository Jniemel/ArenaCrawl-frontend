import PropTypes from 'prop-types';
import '../stylesheets/home.css';

Navigation.propTypes = {
  nav: PropTypes.string,
  setNav: PropTypes.func,
};

export default function Navigation({ nav, setNav }) {
  return (
    <nav>
      <div className='to-battle'>
        <button
          onClick={() => {
            console.log('En garde!');
          }}
        >
          <span>To battle!</span>
        </button>
      </div>
      <div>
        <button
          className={nav === 'wep' && 'selected'}
          onClick={() => {
            setNav('wep');
          }}
        >
          Weapons
        </button>
        <button
          className={nav === 'arm' && 'selected'}
          onClick={() => {
            setNav('arm');
          }}
        >
          Armory
        </button>
        <button
          className={nav === 'mag' && 'selected'}
          onClick={() => {
            setNav('mag');
          }}
        >
          Magic shop
        </button>
        <button
          className={nav === 'trn' && 'selected'}
          onClick={() => {
            setNav('trn');
          }}
        >
          Training
        </button>
        <button
          className={nav === 'rec' && 'selected'}
          onClick={() => {
            setNav('rec');
          }}
        >
          Recruitment
        </button>
        <button
          className={nav === 'div' && 'selected'}
          onClick={() => {
            setNav('div');
          }}
        >
          Divisions
        </button>
        <button
          className={nav === 'sch' && 'selected'}
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
