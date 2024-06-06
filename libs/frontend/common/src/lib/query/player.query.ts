import { useMutation } from 'react-query';
import { Action } from '@yams-tactics/domain';
import { axios } from '../axios';
import { useAuthHeader } from './auth.query';

const ENDPOINT = '/player';

export const usePlayerActions = () => {
  const authHeader = useAuthHeader();
  return useMutation<void, unknown, Action>({
    mutationKey: ['player_actions'],
    mutationFn: async (action) => {
      const { data } = await axios.post(
        `${ENDPOINT}/actions`,
        { action },
        {
          ...authHeader,
        }
      );

      return data;
    },
  });
};
