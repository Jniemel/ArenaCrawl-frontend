import weapons from '../assets/weapons.json';
import armory from '../assets/armory.json';
import spells from '../assets/spells.json';

export default function getShopInventory(shop, itemType = null) {
  let json;
  switch (shop) {
    case 'wep':
      json = weapons;
      break;
    case 'arm':
      json = armory;
      break;
    case 'mag':
      json = spells;
      break;
    default:
      break;
  }
  if (!itemType) {
    return json;
  }
  return json[itemType];
}
