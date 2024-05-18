import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { buyItem } from '../utils/equipmentManagement';

ShopTable.propTypes = {
  nav: PropTypes.object,
  items: PropTypes.object,
  selectedChamp: PropTypes.object,
  playerMoney: PropTypes.number,
};

export default function ShopTable({ nav, items, selectedChamp, playerMoney }) {
  const [selectedItem, setSelectedItem] = useState();
  let key;
  switch (nav.window) {
    case 'weapons':
      key = 'dies';
      break;
    case 'armory':
      key = 'AC';
      break;
    default:
      break;
  }

  async function handleBuyRequest() {
    let slot;
    if (nav.window === 'weapons') {
      slot = 'mWeapon';
      if (
        nav.sub === 'bows' ||
        nav.sub === 'crossbows' ||
        nav.sub === 'thrown'
      ) {
        slot = 'rWeapon';
      }
    } else if (nav.window === 'armory') {
      slot = 'chest';
    } /* else if (nav.window === 'spells' ) { slot = spells} */

    if (
      playerMoney + selectedChamp.equipment[slot].sellPrice <
      selectedItem.price
    ) {
      alert(
        `Insufficient funds.
        Price: ${selectedItem.price}
        You have: ${playerMoney}
        Current item refund: ${selectedChamp.equipment[slot].sellPrice}
        You are missing: ${selectedItem.price - (playerMoney + selectedChamp.equipment[slot].sellPrice)}`,
      );
      return;
    }

    const res = await buyItem({
      shop: nav.window,
      type: nav.sub,
      item: selectedItem,
      targetId: selectedChamp._id,
    });
    const json = await res.json();
    if (res.status === 200) {
      console.log(json);
    }
  }

  const displayData = items.map((item) => {
    return (
      <tr
        key={uuidv4()}
        className={
          selectedItem === item ? 'item-list-selected' : 'item-list-row'
        }
        onClick={() => {
          setSelectedItem(item);
        }}
      >
        <td className='buy-cell'>
          <div
            style={{ display: selectedItem === item ? 'block' : 'none' }}
            onClick={handleBuyRequest}
          >
            buy
          </div>
        </td>
        <td>
          <div>{item.name}</div>
          <div></div>
        </td>
        <td>{item.price}</td>
        <td>
          {item[key] > 1 && item[key]}
          {key === 'dies' && `d${item.sides}`}
        </td>
      </tr>
    );
  });

  return (
    <div className='table-container'>
      <table className='shop-table'>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Price</th>
          <th>{key === 'dies' ? 'damage' : key}</th>
        </tr>
        <tbody>{displayData}</tbody>
      </table>
    </div>
  );
}
