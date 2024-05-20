import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { GameStateContext } from '../contexts/gameStateContext';
import { buyItem } from '../utils/equipmentManagement';

ShopTable.propTypes = {
  nav: PropTypes.object,
  items: PropTypes.object,
};

export default function ShopTable({ nav, items }) {
  const [selectedItem, setSelectedItem] = useState();
  const { gameState, setGameState, selectedChamp } =
    useContext(GameStateContext);

  // change last column header-text according to shop window
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
    // check which slot the new equipment uses
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
    } /* else if (nav.window === 'spells' ) { slot = spells } */

    // check player has enough funds
    if (
      gameState.playerTeam.money + selectedChamp.equipment[slot].sellPrice <
      selectedItem.price
    ) {
      alert(
        `Insufficient funds.
        Price: ${selectedItem.price}
        You have: ${gameState.playerTeam.money}
        Current item refund: ${selectedChamp.equipment[slot].sellPrice}
        You are missing: ${selectedItem.price - (gameState.playerTeam.money + selectedChamp.equipment[slot].sellPrice)}`,
      );
      return;
    }
    const res = await buyItem({
      shop: nav.window,
      type: nav.sub,
      slot,
      item: selectedItem,
      targetId: selectedChamp._id,
    });
    const json = await res.json();
    if (res.status === 200) {
      if (!json.reject) {
        setGameState(json.newState);
      } else {
        alert(json.msg);
      }
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
