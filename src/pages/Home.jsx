import PropTypes from 'prop-types';
import { useState } from 'react';
// components
import HomeHeader from '../components/HomeHeader';
import TeamWindow from '../components/TeamWindow';
import Navigation from '../components/Navigation';
import GameWindow from '../components/GameWindow.jsx';
import BottomSection from '../components/bottomSection.jsx';
// stylesheets
import '../stylesheets/home.css';
import '../stylesheets/bottomSection.css';

Home.propTypes = {
  gameState: PropTypes.object,
};

export default function Home({ gameState }) {
  const [nav, setNav] = useState({ window: 'recruitment', sub: null });
  const [battle, setBattle] = useState(false);

  if (battle) {
    return (
      <>
        <GameWindow setBattle={setBattle} />
      </>
    );
  }
  return (
    <>
      <HomeHeader user={gameState.owner} />
      <TeamWindow playerTeam={gameState.playerTeam} />
      <Navigation
        nav={nav}
        setNav={setNav}
        battle={battle}
        setBattle={setBattle}
      />
      <BottomSection nav={nav} setNav={setNav} gameState={gameState} />
    </>
  );
}
