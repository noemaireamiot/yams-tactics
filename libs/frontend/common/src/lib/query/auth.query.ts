import { useAuth } from '../auth';
import { axios } from '../axios';

export function useAuthHeader(
  headers: Parameters<typeof axios.request>[0]['headers'] = {}
) {
  const { getToken } = useAuth();
  return {
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getToken().getAccessToken(),
      'Content-Type': 'application/json',
    },
  };
}
