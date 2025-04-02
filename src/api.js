// src/api.js
import axios from 'axios';

const API_BASE_URL = 'https://api-teams-production.up.railway.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
