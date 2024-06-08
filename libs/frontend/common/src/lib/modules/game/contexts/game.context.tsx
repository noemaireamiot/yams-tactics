import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { gameReducer } from './game.reducer';
import { GameContextState } from './types';
import {
  useGameLoop,
  useReconciliate,
  useRollDices,
  useSubmitScore,
} from '../hooks';

const GameContext = createContext<GameContextState>({
  isLoading: true,
  onRollDices: async () => {},
  onSubmitScore: async () => {},
});

export const GameContextProvider = ({
  children,
  gameId,
}: PropsWithChildren<{ gameId: string }>) => {
  const [state, dispatch] = useReducer(gameReducer, {
    isLoading: true,
    onRollDices: async () => {},
    onSubmitScore: async () => {},
  });

  useReconciliate(gameId, dispatch);
  useGameLoop(state, dispatch);

  const onRollDices = useRollDices(state, dispatch);
  const onSubmitScore = useSubmitScore(state, dispatch);

  return (
    <GameContext.Provider value={{ ...state, onRollDices, onSubmitScore }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
