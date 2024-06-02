import { useMutation } from 'react-query';
import { ActionTypeEnum } from '@yams-tactics/domain';
import { axios } from '../axios';
import { useAuthHeader } from './auth.query';

const ENDPOINT = '/player';

export const usePlayerActions = () => {
  const authHeader = useAuthHeader();
  return useMutation<void, unknown, { type: ActionTypeEnum }>({
    mutationKey: ['player_actions'],
    mutationFn: async ({ type }) => {
      const { data } = await axios.post(
        `${ENDPOINT}/actions`,
        { type },
        {
          ...authHeader,
        }
      );

      return data;
    },
  });
};
