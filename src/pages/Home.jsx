import PropTypes from 'prop-types';
import { useState } from 'react';
// components
import HomeHeader from '../components/HomeHeader';
import TeamWindow from '../components/TeamWindow';
import Navigation from '../components/Navigation';
import Shop from '../components/Shop';
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
  const [nav, setNav] = useState({ window: 'recruitment', sub: null });
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

  let shop = null;
  if (
    nav.window === 'weapon' ||
    nav.window === 'armory' ||
    nav.window === 'magic'
  ) {
    shop = true;
  }

  return (
    <>
      <HomeHeader user={gameState.owner} />
      <TeamWindow
        teamName={gameState.owner + "'s team"}
        playerTeam={playerTeam}
      />
      <Navigation nav={nav} setNav={setNav} />
      {shop && <Shop nav={nav} setNav={setNav} />}
      {nav.window === 'training' && <TrainingGrounds />}
      {nav.window === 'recruitment' && <Recruitment />}
      {nav.window === 'divisions' && <Divisions />}
      {nav.window === 'schedule' && <Schedule />}
    </>
  );
}
