import axios, { AxiosInstance } from 'axios';
import { env } from '@/config/env';


export const api: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
