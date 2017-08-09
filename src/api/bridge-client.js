import axios from 'axios';
import config from '../../config';
import Client from './client';

console.log('process.env.BRIDGE_URL ', process.env.BRIDGE_URL);

const bridgeClient = new Client({
  baseURL: config.app.BRIDGE_URL,
  bridgeURL: config.app.BRIDGE_URL,
  httpClient: axios
});

export default bridgeClient;
