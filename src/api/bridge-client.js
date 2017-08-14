import axios from 'axios';
import config from '../../config';
import Client from './client';

console.log('bridgeURL: ', config.app.BRIDGE_URL);

console.log('config: ', config);
console.log('process.env: ', process.env);
console.log('bridgeURL process.env.BRIDGE_URL: ', process.env.BRIDGE_URL);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

const bridgeClient = new Client({
  baseURL: config.app.BRIDGE_URL,
  bridgeURL: config.app.BRIDGE_URL,
  httpClient: axios
});

export default bridgeClient;
