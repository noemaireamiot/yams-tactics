import { axios } from '../../../config/axios';

const ENDPOINT = '/game';

export async function startGame(id: string) {
  const { data } = await axios.post(`${ENDPOINT}/${id}/start`);
  return data;
}

export async function getOneGame(id: string) {
  const { data } = await axios.get(`${ENDPOINT}/${id}`);
  return data;
}
