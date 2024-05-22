import { useMutation } from 'react-query';
import { UserModel } from '@yams-tactics/domain';
import { axios } from '../axios';

const ENDPOINT = '/user';

export const useLogin = () => {
  return useMutation<UserModel & { token: string }, unknown, { name: string }>({
    mutationKey: ['login'],
    mutationFn: async ({ name }) => {
      const { data } = await axios.post(`${ENDPOINT}/login`, {
        name        
      });

      return data
    },
  });
};

export const useRegister = () => {
  return useMutation<UserModel & { token: string }, unknown, { name: string }>({
    mutationKey: 'register',
    mutationFn: async ({ name }) => {
      const { data } = await axios.post(`${ENDPOINT}/register`, {
        name
      });

      return data
    },
  });
};
