import { GameModel } from '@yams-tactics/domain';
import { useEffect, useState } from 'react';

const ENDPOINT = '/game';

export const useGame = (id: string) => {
  const [game, setGame] = useState<GameModel | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sse = new EventSource(`/api${ENDPOINT}/${id}`, {
      withCredentials: true,
    });
    sse.addEventListener('message', ({ data }) => {
      setLoading(false);
      setGame(JSON.parse(data));
    });

    sse.addEventListener('error', (ev) => {
      setLoading(false);
      setError(new Error(JSON.stringify(ev)));
      sse.close();
    });

    return () => {
      sse.close();
    };
  }, [id]);

  return { data: game, isLoading: loading, error };
};
