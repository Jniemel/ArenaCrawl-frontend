import { createContext, useState } from 'react';

export const GameStateContext = createContext();

// eslint-disable-next-line react/prop-types
const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState();
  const [selectedChamp, setSelectedChamp] = useState();

  return (
    <GameStateContext.Provider
      value={{ gameState, setGameState, selectedChamp, setSelectedChamp }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
