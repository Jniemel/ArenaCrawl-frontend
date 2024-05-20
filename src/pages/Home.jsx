import { useState, useEffect, useContext } from 'react';
import storageAvailable from '../utils/localStorage.js';
import { GameStateContext } from '../contexts/gameStateContext.jsx';

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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [nav, setNav] = useState({ window: 'recruitment', sub: null });
  const [viewResults, setViewResults] = useState();
  const [shopLoading, setShopLoading] = useState();
  const [shopInventory, setShopInventory] = useState();
  const { gameState, setGameState, setSelectedChamp } =
    useContext(GameStateContext);

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch('http://localhost:3000/api/home', {
        method: 'GET',
        credentials: 'include',
      });
      let json = null;
      if (res.ok) {
        json = await res.json();
      }
      setGameState(json);
      setSelectedChamp(json.playerTeam.champs[0]);
      setLoading(false);
    };
    dataFetch();
  }, [setGameState, setSelectedChamp]);

  useEffect(() => {
    const shopDataFetch = async () => {
      let saveLocally = false;
      if (storageAvailable('localStorage')) {
        if (localStorage.getItem('shopInventory')) {
          setShopInventory(JSON.parse(localStorage.getItem('shopInventory')));
          setShopLoading(false);
          return;
        } else {
          saveLocally = true;
        }
      }
      const res = await fetch('http://localhost:3000/api/equipment/inventory', {
        method: 'GET',
        credentials: 'include',
      });

      let json = null;
      if (res.ok) {
        json = await res.json();
        if (saveLocally) {
          localStorage.setItem('shopInventory', JSON.stringify(json));
        }
      }
      setShopInventory(json);
      setShopLoading(false);
    };
    shopDataFetch();
  }, []);

  return loading ? (
    <h1>Loading....</h1>
  ) : gameState.battle.status === 'inactive' ||
    gameState.battle.status === 'finished' ? (
    !viewResults ? (
      <>
        <HomeHeader user={gameState.owner} />
        <TeamWindow
          playerTeam={gameState.playerTeam}
          setViewResults={setViewResults}
        />
        <Navigation nav={nav} setNav={setNav} />
        <BottomSection
          nav={nav}
          setNav={setNav}
          shopLoading={shopLoading}
          shopInventory={shopInventory}
        />
      </>
    ) : (
      <BattleResult gameState={gameState} setViewResults={setViewResults} />
    )
  ) : (
    <GameWindow battleData={gameState.battle} setViewResults={setViewResults} />
  );
}
