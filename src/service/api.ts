import axios, { AxiosInstance } from 'axios';

export const URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL,
    timeout: 5000,
  });

  return api;
};
