import PropTypes from 'prop-types';
import { useState } from 'react';
import ShopTable from './ShopTable';
import getShopInventory from '../utils/getShopInventory';

Shop.propTypes = {
  nav: PropTypes.string,
};

export default function Shop({ nav }) {
  const [itemType, setItemType] = useState();
  const itemTypes = Object.keys(getShopInventory(nav));

  const btns = itemTypes.map((type) => {
    return (
      <button
        key={type}
        onClick={() => {
          setItemType(type);
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
        <ShopTable
          shopType={nav}
          itemType={itemType ? itemType : itemTypes[0]}
        />
      </div>
    </section>
  );
}
