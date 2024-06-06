import { GameModel } from '@yams-tactics/domain';
import { useAuthHeader } from './auth.query';
import { axios } from '../axios';
import { useQuery } from 'react-query';

const ENDPOINT = '/game';

export const useGame = (id: string) => {
  const authHeader = useAuthHeader();
  return useQuery<{ id: string }, unknown, GameModel>({
    queryKey: ['game', { id }],
    // @TODO - Replace with SSE ?
    // refetchInterval: 5000,
    queryFn: async () => {
      const { data } = await axios.get(`${ENDPOINT}/${id}`, { ...authHeader });

      return data;
    },
  });
};
