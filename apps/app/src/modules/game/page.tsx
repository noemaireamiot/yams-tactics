import { useCallback, useEffect, useState } from 'react';
import { Dice } from '../../components/Dice/dice';
import styles from './page.scss';
import { GameHUD } from './gameHud/gameHud';
import {
  DiceTypeEnum,
  GameModel,
  PlayerModel,
  ScoreTypeEnum,
} from '@yams-tactics/domain';

const fakeGame: GameModel = {
  id: '1',
  players: [],
  currentRound: 'shop.5',
  startedAt: new Date(),
};

const fakeCurrentPlayer: PlayerModel = {
  id: '1',
  user: {
    id: '1',
    name: 'CanardWcCitron',
  },
  actions: [],

  seed: '12987645',
  gold: 36,
  scoreboard: {
    id: '3',
    scores: [
      {
        id: '1',
        type: ScoreTypeEnum.total_1,
        value: null,
        done: false,
      },
    ],
  },

  dices: [
    {
      id: '1',
      faces: [
        {
          id: '1',
          value: 1,
        },
      ],
      type: DiceTypeEnum.white,
      currentFace: null,
    },
  ],
  tokens: [],
  passives: [],
};

export function GamePage() {
  const [message, setMessage] = useState('loading');
  const [dicesValue, setDicesValue] = useState<number[]>();
  const [isRotating, setIsRotating] = useState(true);

  const launchDice = () => {
    setDicesValue([
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 5) + 1,
    ]);
    setIsRotating(false);
  };

  const resetDice = () => {
    setDicesValue(undefined);
    setIsRotating(true);
  };

  // const createRoom = useCallback(() => {
  //   fetch('http://localhost:3000/api/room', { method: 'POST' })
  //     .then((res) => res.json())
  //     .then(({ message }) => {
  //       setMessage(message);
  //     });
  // }, []);

  // useEffect(() => {
  //   const source = new EventSource('/sse');
  //   if (source)
  //     source.addEventListener('message', (message) => {
  //       setMessage(message.data);
  //       return message;
  //     });
  // }, []);

  return (
    <GameHUD game={fakeGame} currentPlayer={fakeCurrentPlayer}>
      <div>
        <button onClick={launchDice}>Launch dice</button>
        <button onClick={resetDice}>Reset dice</button>
        <div className={styles.game}>
          <div className={styles.dices}>
            <Dice value={dicesValue?.[0]} rotating={isRotating} />
            <Dice value={dicesValue?.[1]} rotating={isRotating} />
            <Dice value={dicesValue?.[2]} rotating={isRotating} />
            <Dice value={dicesValue?.[3]} rotating={isRotating} />
            <Dice value={dicesValue?.[4]} rotating={isRotating} />
          </div>
        </div>
      </div>
      {message}
      <button onClick={() => createRoom()}>createRoom</button>
    </GameHUD>
  );
}
