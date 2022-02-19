import axios, { AxiosInstance } from 'axios';

export const URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

export const HEADER_TOTAL_COUNT = 'x-total-count';

export const enum HttpCode {
  NotFound = 404,
  OK = 200,
  BadRequest = 400,
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL,
    timeout: 5000,
  });

  return api;
};

export const api = createAPI();
