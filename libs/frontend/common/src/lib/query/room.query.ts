import { useQuery, useMutation } from 'react-query';
import { RoomModel, GameModel } from '@yams-tactics/domain';
import { axios } from '../axios';
import { useAuthHeader } from './auth.query';

const ENDPOINT = '/room';

export const useRooms = () => {
  const authHeader = useAuthHeader();
  return useQuery<unknown, unknown, Record<string, RoomModel>>({
    queryKey: ['rooms'],
    // @TODO - Replace with SSE ?
    refetchInterval: 1000,
    queryFn: async () => {
      const { data } = await axios.get(ENDPOINT, {
        ...authHeader,
      });

      return data;
    },
  });
};

export const useCreateRoom = () => {
  const authHeader = useAuthHeader();
  return useMutation<RoomModel, unknown>({
    mutationKey: ['createOneRoom'],
    mutationFn: async (variables?: unknown) => {
      const { data } = await axios.post(
        ENDPOINT,
        {},
        {
          ...authHeader,
        }
      );

      return data;
    },
  });
};

export const useRoom = (id: string) => {
  const authHeader = useAuthHeader();
  return useQuery<{ id: string }, unknown, RoomModel>({
    queryKey: ['room', { id }],
    // @TODO - Replace with SSE ?
    refetchInterval: 1000,
    queryFn: async () => {
      const { data } = await axios.get(`${ENDPOINT}/${id}`, { ...authHeader });

      return data;
    },
  });
};

export const useJoinRoom = () => {
  const authHeader = useAuthHeader();
  return useMutation<GameModel, unknown, { id: string }>({
    mutationKey: ['joinRoom'],

    mutationFn: async ({ id }) => {
      const { data } = await axios.post(
        `${ENDPOINT}/${id}/join`,
        {},
        { ...authHeader }
      );

      return data;
    },
  });
};

export const useStartGame = () => {
  const authHeader = useAuthHeader();
  return useMutation<RoomModel, unknown, { id: string }>({
    mutationKey: ['startGame'],
    mutationFn: async ({ id }) => {
      const { data } = await axios.post(
        `${ENDPOINT}/${id}/start`,
        {},
        { ...authHeader }
      );

      return data;
    },
  });
};
