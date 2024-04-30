import { useState } from 'react';
import ShopTable from './ShopTable';
import getShopInventory from '../utils/getShopInventory';

export default function WeaponShop() {
  const [itemType, setItemType] = useState('swords');
  const weapons = Object.keys(getShopInventory('weapons'));

  const btns = weapons.map((weapon) => {
    return (
      <button
        key={weapon}
        onClick={() => {
          setItemType(weapon);
        }}
      >
        {weapon}
      </button>
    );
  });

  return (
    <section className='bottom-section'>
      <div className='shop-window'>
        <div className='shop-nav'>{btns}</div>
        <ShopTable itemType={itemType} />
      </div>
    </section>
  );
}
