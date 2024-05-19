import PropTypes from 'prop-types';
import Shop from '../components/Shop';
import TrainingGrounds from '../components/TrainingGrounds';
import Recruitment from '../components/Recruitment';
import Schedule from '../components/Schedule';
import Divisions from '../components/Divisions';

BottomSection.propTypes = {
  nav: PropTypes.object,
  setNav: PropTypes.func,
  shopLoading: PropTypes.bool,
  shopInventory: PropTypes.object,
  selectedChamp: PropTypes.object,
};

export default function BottomSection({
  nav,
  setNav,
  shopLoading,
  shopInventory,
  selectedChamp,
}) {
  let shop = null;
  if (
    nav.window === 'weapons' ||
    nav.window === 'armory' ||
    nav.window === 'spells'
  ) {
    shop = true;
  }

  return (
    <>
      {shop && (
        <Shop
          nav={nav}
          setNav={setNav}
          loading={shopLoading}
          inventory={shopInventory}
          selectedChamp={selectedChamp}
        />
      )}
      {nav.window === 'training' && <TrainingGrounds />}
      {nav.window === 'recruitment' && <Recruitment />}
      {nav.window === 'divisions' && <Divisions />}
      {nav.window === 'schedule' && <Schedule />}
    </>
  );
}
