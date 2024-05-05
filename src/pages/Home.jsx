import PropTypes from 'prop-types';
import { useState } from 'react';
// components
import HomeHeader from '../components/HomeHeader';
import TeamWindow from '../components/TeamWindow';
import Navigation from '../components/Navigation';
import Game from '../components/Game.jsx';
// stylesheets
import '../stylesheets/home.css';
import '../stylesheets/bottomSection.css';
import BottomSection from '../components/bottomSection.jsx';

Home.propTypes = {
  gameState: PropTypes.object,
};

export default function Home({ gameState }) {
  const [nav, setNav] = useState({ window: 'recruitment', sub: null });
  const [battle, setBattle] = useState(false);

  if (battle) {
    return (
      <>
        <button
          onClick={() => {
            setBattle(false);
          }}
        >
          Exit battle
        </button>
        <Game />
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
