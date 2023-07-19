import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    Authorization:
      'Bearer Mw.uncWJvxGFKHmT2LVszn5IHLnHWLNhNBQjGV0l-XsAnBFV-dymyLEhOCXQc_2',
  },
});
