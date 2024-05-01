import weapons from '../assets/weapons.json';
import armory from '../assets/armory.json';
import spells from '../assets/spells.json';

export default function getShopInventory(shop, itemType = null) {
  let json;
  switch (shop) {
    case 'weapon':
      json = weapons;
      break;
    case 'armory':
      json = armory;
      break;
    case 'magic':
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
