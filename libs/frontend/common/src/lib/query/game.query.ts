import { useQuery } from 'react-query';
import { GameModel } from '@yams-tactics/domain';
import { axios } from '../axios';

const ENDPOINT = '/game';

export const useGame = (id: string) => {
  return useQuery<{id: string}, unknown, GameModel>({
    queryKey: ['game', {id}],
    queryFn: async ({} ) => {
      const { data } = await axios.get(`${ENDPOINT}/${id}`);

      return data
    },
  });
};