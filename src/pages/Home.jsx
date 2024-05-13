import PropTypes from 'prop-types';
import { useState } from 'react';
// components
import HomeHeader from '../components/HomeHeader';
import TeamWindow from '../components/TeamWindow';
import Navigation from '../components/Navigation';
import BottomSection from '../components/bottomSection.jsx';
import BattleResult from '../components/BattleResult.jsx';
import GameWindow from '../components/GameWindow.jsx';
// stylesheets
import '../stylesheets/home.css';
import '../stylesheets/bottomSection.css';

Home.propTypes = {
  gameState: PropTypes.object,
};

export default function Home({ gameState }) {
  const [nav, setNav] = useState({ window: 'recruitment', sub: null });
  const [viewResults, setViewResults] = useState();

  return gameState.battle.status === 'inactive' ||
    gameState.battle.status === 'finished' ? (
    !viewResults ? (
      <>
        <HomeHeader user={gameState.owner} />
        <TeamWindow
          playerTeam={gameState.playerTeam}
          viewResults={viewResults}
          setViewResults={setViewResults}
        />
        <Navigation nav={nav} setNav={setNav} />
        <BottomSection nav={nav} setNav={setNav} gameState={gameState} />
      </>
    ) : (
      <BattleResult gameState={gameState} setViewResults={setViewResults} />
    )
  ) : (
    <GameWindow battleData={gameState.battle} setViewResults={setViewResults} />
  );
}
