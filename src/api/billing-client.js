import axios from 'axios';
import config from '../../config';
import Client from './client';

console.log('config.app.BRIDGE_URL', config.app.BRIDGE_URL);
console.log('config.app.BILLING_URL', config.app.BILLING_URL);

const billingClient = new Client({
  baseURL: config.app.BILLING_URL,
  bridgeURL: config.app.BRIDGE_URL,
  httpClient: axios
});

export default billingClient;
