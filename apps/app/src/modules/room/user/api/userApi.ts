import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from '../../../../types/index';
import { axios } from '../../../../config/axios';

const ENDPOINT = '/user';

export async function register(params: RegisterInput) {
  const { data } = await axios.post<RegisterResponse>(`${ENDPOINT}/register`, {
    params,
  });
  return data;
}

export async function login(params: LoginInput) {
  const { data } = await axios.post<LoginResponse>(`${ENDPOINT}/login`, {
    params,
  });
  return data;
}

export async function getMe() {
  const { data } = await axios.get<LoginResponse>(`${ENDPOINT}/login`);
  return data;
}
