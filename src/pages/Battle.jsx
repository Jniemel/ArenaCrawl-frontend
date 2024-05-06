import { useEffect, useState } from 'react';
import GameWindow from '../components/GameWindow';

export default function Battle() {
  const [isLoading, setLoading] = useState(true);
  const [fail, setFail] = useState(false);
  const [battleData, setBattleData] = useState();

  useEffect(() => {
    async function launchGame() {
      const res = await fetch('http://localhost:3000/api/battle/start', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.status === 200) {
        setFail(true);
        return;
      }
      const data = res.json();
      setBattleData(data);
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
