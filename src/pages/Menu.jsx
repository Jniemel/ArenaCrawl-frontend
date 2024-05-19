import PropTypes from 'prop-types';

Menu.propTypes = {
  user: PropTypes.string,
  setLoadGame: PropTypes.func,
};

export default function Menu({ user, setLoadGame }) {
  return (
    <div className='menu'>
      <h1>{`Welcome, ${user}`}</h1>
      <button
        onClick={() => {
          setLoadGame(true);
        }}
      >
        Load game
      </button>
      <button>New game</button>
    </div>
  );
}
