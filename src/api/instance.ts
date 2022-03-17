import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://www.cbr-xml-daily.ru/',
});
