import PropTypes from 'prop-types';
import getShopInventory from '../utils/getShopInventory';

ShopTable.propTypes = {
  shopType: PropTypes.string,
  itemType: PropTypes.string,
};

export default function ShopTable({ shopType, itemType }) {
  const tableData = getShopInventory(shopType, itemType);

  if (itemType && !tableData) {
    return null;
  }

  const displayData = tableData.map((e) => {
    return (
      <tr key={e.name}>
        <td>{e.name}</td>
        <td>{e.price}</td>
        <td>{e.stat}</td>
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
