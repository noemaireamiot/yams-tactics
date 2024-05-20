import { axios } from '../../../config/axios';

const ENDPOINT = '/room';

export async function getOneRoom(id: string) {
  const { data } = await axios.get<RegisterResponse>(`${ENDPOINT}/${id}`);
  return data;
}
