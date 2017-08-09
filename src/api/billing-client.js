import axios from 'axios';
import config from '../../config';
import Client from './client';

console.log('process.env.BILLING_URL ', process.env.BILLING_URL);
console.log('config', config);

const billingClient = new Client({
  baseURL: config.app.BILLING_URL,
  bridgeURL: config.app.BRIDGE_URL,
  httpClient: axios
});

export default billingClient;
