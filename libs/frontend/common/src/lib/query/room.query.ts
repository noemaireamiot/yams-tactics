import { useQuery, useMutation } from 'react-query';
import { RoomModel, GameModel } from '@yams-tactics/domain';
import { axios } from '../axios';

const ENDPOINT = '/room'

export const useRooms = () => {
  return useQuery<{}, unknown, RoomModel[]>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data } = await axios.get(ENDPOINT);

      return data
    },
  });
};

export const useRoom = (id: string) => {
    return useQuery<{id: string}, unknown, RoomModel>({
      queryKey: ['game', {id}],
      queryFn: async ({} ) => {
        const { data } = await axios.get(`${ENDPOINT}/${id}`);
  
        return data
      },
    });
  };

export const useStartGame = () => {
return useMutation<GameModel, unknown, {id: string}>({
    mutationKey: ['startGame'],
    mutationFn: async ({id} ) => {
    const { data } = await axios.get(`${ENDPOINT}/${id}/start`);

    return data
    },
});
};