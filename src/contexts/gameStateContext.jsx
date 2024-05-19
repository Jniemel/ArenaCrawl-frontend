import { createContext, useState } from 'react';

export const GameStateContext = createContext();

// eslint-disable-next-line react/prop-types
const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState();

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
