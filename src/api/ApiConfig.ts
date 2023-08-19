import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    Authorization:
      'Bearer Mw.jkWW6vJ1ggG7aYk4vuKP1rNZ7MB1VwLfNXg1nPQKUSexJVFOd6paj1fYsZkY',
  },
});
