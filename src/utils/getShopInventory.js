import weapons from '../assets/weapons.json';

export default function getShopInventory(type) {
  switch (type.toLowerCase()) {
    case 'weapons':
      return weapons;
    case 'swords':
      return weapons.swords;
    case 'axes':
      return weapons.axes;
    case 'daggers':
      return weapons.daggers;
    case 'bows':
      return weapons.axes;
    case 'crossbows':
      return weapons.crossbows;
    default:
      break;
  }
}
