import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import getShopInventory from '../utils/getShopInventory';

ShopTable.propTypes = {
  nav: PropTypes.object,
};

export default function ShopTable({ nav }) {
  const tableData = getShopInventory(nav.window, nav.sub);
  let key;
  switch (nav.window) {
    case 'weapon':
      key = 'dies';
      break;
    case 'armory':
      key = 'AC';
      break;
    default:
      break;
  }

  const displayData = tableData.map((entry) => {
    return (
      <tr key={uuidv4()}>
        <td>{entry.name}</td>
        <td>{entry.price}</td>
        <td>
          {entry[key] > 1 && entry[key]}
          {key === 'dies' && `d${entry.sides}`}
        </td>
      </tr>
    );
  });

  return (
    <div className='table-container'>
      <table className='shop-table'>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>{key === 'dies' ? 'damage' : key}</th>
        </tr>
        <tbody>{displayData}</tbody>
      </table>
    </div>
  );
}
