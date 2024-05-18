import PropTypes from 'prop-types';
import ShopTable from './ShopTable';

Shop.propTypes = {
  nav: PropTypes.object,
  setNav: PropTypes.func,
  loading: PropTypes.bool,
  inventory: PropTypes.object,
  playerMoney: PropTypes.number,
  selectedChamp: PropTypes.object,
};

export default function Shop({
  nav,
  setNav,
  loading,
  inventory,
  playerMoney,
  selectedChamp,
}) {
  let btns;
  if (!loading) {
    const types = Object.keys(inventory[nav.window]);
    btns = types.map((type) => {
      return (
        <button
          key={type}
          className={nav.sub === type && 'selected-sub-window'}
          onClick={() => {
            setNav({ ...nav, sub: type });
          }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      );
    });
  }

  return !loading ? (
    <section className='bottom-section'>
      <div className={nav.window + '-window'}>
        <div className='shop-nav'>{btns}</div>
        <ShopTable
          nav={nav}
          items={inventory[nav.window][nav.sub]}
          selectedChamp={selectedChamp}
          playerMoney={playerMoney}
        />
      </div>
    </section>
  ) : (
    <section className='bottom-section'>
      <div className={nav.window + '-window'}>
        <h1 style={{ textAlign: 'center', paddingTop: '2em' }}>
          Shop loading...
        </h1>
      </div>
    </section>
  );
}
