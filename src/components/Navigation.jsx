import PropTypes from 'prop-types';

Navigation.propTypes = {
  nav: PropTypes.object,
  setNav: PropTypes.func,
  battle: PropTypes.boolean,
  setBattle: PropTypes.func,
};

export default function Navigation({ nav, setNav, battle, setBattle }) {
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

  return (
    <nav>
      <div className='to-battle'>
        <button
          onClick={() => {
            setBattle(true);
          }}
        >
          <span>To battle!</span>
        </button>
      </div>
      <div>{btns}</div>
    </nav>
  );
}
