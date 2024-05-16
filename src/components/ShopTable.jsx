import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

ShopTable.propTypes = {
  nav: PropTypes.object,
  items: PropTypes.object,
};

export default function ShopTable({ nav, items }) {
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

  const displayData = items.map((entry) => {
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
