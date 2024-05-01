import PropTypes from 'prop-types';
import getShopInventory from '../utils/getShopInventory';

ShopTable.propTypes = {
  /* shopType: PropTypes.string,
  itemType: PropTypes.string, */
  nav: PropTypes.object,
};

export default function ShopTable({ /* shopType, itemType */ nav }) {
  /* const tableData = getShopInventory(shopType, itemType);

  if (itemType && !tableData) {
    return null;
  } */

  const tableData = getShopInventory(nav.window, nav.sub);

  const displayData = tableData.map((entry) => {
    return (
      <tr key={entry.name}>
        <td>{entry.name}</td>
        <td>{entry.price}</td>
        <td>{entry.stat}</td>
      </tr>
    );
  });

  return (
    <div className='table-container'>
      <table className='shop-table'>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stat</th>
        </tr>
        <tbody>{displayData}</tbody>
      </table>
    </div>
  );
}
