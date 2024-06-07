import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { gameReducer } from './game.reducer';
import { GameContextState } from './types';
import { useGameLoop, useReconciliate, useRollDices } from '../hooks';

const GameContext = createContext<GameContextState>({
  isLoading: true,
  onRollDices: async () => {},
});

export const GameContextProvider = ({
  children,
  gameId,
}: PropsWithChildren<{ gameId: string }>) => {
  const [state, dispatch] = useReducer(gameReducer, {
    isLoading: true,
    onRollDices: async () => {},
  });

  useReconciliate(gameId, dispatch);
  useGameLoop(state, dispatch);

  const onRollDices = useRollDices(state, dispatch);

  return (
    <GameContext.Provider value={{ ...state, onRollDices }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
