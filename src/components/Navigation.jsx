import PropTypes from 'prop-types';
import { startBattle } from '../utils/gameManagement';
import { useNavigate } from 'react-router-dom';

Navigation.propTypes = {
  nav: PropTypes.object,
  setNav: PropTypes.func,
  battle: PropTypes.boolean,
};

export default function Navigation({ nav, setNav }) {
  const navigate = useNavigate();
  const navBtns = [
    { name: 'weapon', defaultSub: 'swords' },
    { name: 'armory', defaultSub: 'armors' },
    { name: 'magic', defaultSub: 'offensive' },
    { name: 'training', defaultSub: null },
    { name: 'recruitment', defaultSub: null },
    { name: 'divisions', defaultSub: null },
    { name: 'schedule', defaultSub: null },
  ];

  const btns = navBtns.map((btn) => {
    return (
      <button
        key={btn.name}
        className={nav.window === btn.name && 'selected-window'}
        onClick={() => {
          const update = { window: btn.name, sub: btn.defaultSub };
          setNav(update);
        }}
      >
        {btn.name.charAt(0).toUpperCase() + btn.name.slice(1)}
      </button>
    );
  });

  async function ToBattleClick() {
    const res = await startBattle();
    if (res.error) {
      alert(`Something went wrong. Error: ${res.error}`);
    }
    navigate(0);
  }

  return (
    <nav>
      <div className='to-battle'>
        <button onClick={ToBattleClick}>
          <span>To battle!</span>
        </button>
      </div>
      <div>{btns}</div>
    </nav>
  );
}
