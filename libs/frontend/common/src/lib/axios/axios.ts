import Axios from 'axios';

export const axios = Axios.create({
  baseURL: `${process.env.API_URL}:${process.env.API_PORT}/api`,
});
