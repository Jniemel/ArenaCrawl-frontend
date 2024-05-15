import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

ChampDetails.propTypes = {
  champ: PropTypes.object,
  diplayEquipment: PropTypes.bool,
};

export default function ChampDetails({ champ, diplayEquipment }) {
  const stats = Object.entries(champ.stats);
  const statList = stats.map((stat) => {
    return (
      <div key={uuidv4()}>
        <h4>
          {stat[0].slice(0, 3)}
          <br />
          {stat[1]}
        </h4>
      </div>
    );
  });

  return (
    <div className='details'>
      <div className='det-name-class'>
        <div>
          <h3 style={{ color: 'darkblue' }}>{champ.name},</h3>
        </div>
        <div>
          <h3 style={{ color: champ.cssColor }}>{champ.class}</h3>
        </div>
      </div>
      <div className='det-stats'>{statList}</div>

      <div
        className='det-equipment'
        style={{ display: diplayEquipment ? 'flex' : 'none' }}
      >
        <div className='equipment-slot'>
          <div>{`Hands: `}</div>
          <div>{`${champ.equipment.mWeapon.name} (${champ.equipment.mWeapon.dies > 1 ? champ.equipment.mWeapon.dies + 'd' : 'd'}${champ.equipment.mWeapon.dieSides})`}</div>
        </div>
        <div className='equipment-slot'>
          <div>{`Ranged: `}</div>
          <div>{`${champ.equipment.rWeapon.name} (${champ.equipment.rWeapon.dies > 1 ? champ.equipment.rWeapon.dies + 'd' : 'd'}${champ.equipment.rWeapon.dieSides})`}</div>
        </div>
        <div className='equipment-slot'>
          <div>{`Chest: `}</div>
          <div>{`${champ.equipment.chest.name} (AC${champ.equipment.chest.AC})`}</div>
        </div>
      </div>
    </div>
  );
}
