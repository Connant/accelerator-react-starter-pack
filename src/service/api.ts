import axios from 'axios';

export const URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

export const api = axios.create({
  baseURL: URL,
});
