import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import GameWindow from '../components/GameWindow';

Battle.propTypes = {
  battleState: PropTypes.object,
};

export default function Battle({ battleState }) {
  const [isLoading, setLoading] = useState(true);
  const [fail, setFail] = useState(false);
  const [battleData, setBattleData] = useState(battleState);

  useEffect(() => {
    async function launchGame() {
      if (battleState.status === 'inactive') {
        const res = await fetch('http://localhost:3000/api/battle/start', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.status === 200) {
          setFail(true);
          return;
        }
        const data = await res.json();
        setBattleData(data);
      }
      setLoading(false);
    }
    launchGame();
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : fail ? (
    <h1>Load failed</h1>
  ) : (
    <GameWindow battleData={battleData} />
  );
}
