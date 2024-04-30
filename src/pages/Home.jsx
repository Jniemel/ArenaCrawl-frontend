import PropTypes from 'prop-types';
import { useState } from 'react';
// components
import HomeHeader from '../components/HomeHeader';
import TeamWindow from '../components/TeamWindow';
import Navigation from '../components/Navigation';
import WeaponShop from '../components/WeaponShop';
import Armory from '../components/Armory';
import MagicShop from '../components/MagicShop';
import TrainingGrounds from '../components/TrainingGrounds';
import Recruitment from '../components/Recruitment';
import Schedule from '../components/Schedule';
import Divisions from '../components/Divisions';
// stylesheets
import '../stylesheets/home.css';
import '../stylesheets/bottomSection.css';

Home.propTypes = {
  gameState: PropTypes.object,
};

export default function Home({ gameState }) {
  const [nav, setNav] = useState();
  const playerTeam = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  return (
    <>
      <HomeHeader user={gameState.owner} />
      <TeamWindow
        teamName={gameState.owner + "'s team"}
        playerTeam={playerTeam}
      />
      <Navigation setNav={setNav} />
      {nav === 'wep' && <WeaponShop />}
      {nav === 'arm' && <Armory />}
      {nav === 'mag' && <MagicShop />}
      {nav === 'trn' && <TrainingGrounds />}
      {nav === 'rec' && <Recruitment />}
      {nav === 'div' && <Divisions />}
      {nav === 'sch' && <Schedule />}
    </>
  );
}
