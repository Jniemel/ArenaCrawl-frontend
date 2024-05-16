import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

ShopTable.propTypes = {
  nav: PropTypes.object,
  items: PropTypes.object,
};

export default function ShopTable({ nav, items }) {
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

  const displayData = items.map((item) => {
    return (
      <tr
        key={uuidv4()}
        className={
          selectedItem === item ? 'table-row-selected' : 'item-list-row'
        }
        onClick={() => {
          setSelectedItem(item);
        }}
      >
        <td>
          <button
            className='buy-item-btn'
            style={{
              display: selectedItem === item ? 'inline-block' : 'none',
            }}
          >
            Buy
          </button>
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
