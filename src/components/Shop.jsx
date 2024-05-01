import PropTypes from 'prop-types';
import ShopTable from './ShopTable';
import getShopInventory from '../utils/getShopInventory';

Shop.propTypes = {
  nav: PropTypes.object,
  setNav: PropTypes.func,
};

export default function Shop({ nav, setNav }) {
  const types = Object.keys(getShopInventory(nav.window));
  const btns = types.map((type) => {
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

  return (
    <section className='bottom-section'>
      <div className='shop-window'>
        <div className='shop-nav'>{btns}</div>
        <ShopTable nav={nav} />
      </div>
    </section>
  );
}
