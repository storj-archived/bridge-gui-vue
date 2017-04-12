/* global Storj */
/* eslint no-undef: ["error", { "typeof": false }] */

import axios from 'axios';
import config from '../../config';
import { fromLocalStorage } from '@/utils';
import uuid from 'uuid/v4';
import querystring from 'querystring';

const billingRequest = axios.create({
  baseURL: config.app.BILLING_URL,
  headers: {
    'x-pubkey': fromLocalStorage('publicKey')
  }
})

/**
 * Authenticates requests sent to Billing. Only keypair authentication
 * is currently allowed
 * @params {Object} options
 * @params {String} options.method - HTTP method ('GET', 'POST', 'PUT')
 * @params {String} options.path - Path for HTTP request
 * @params {Object} options.payload - JSON ('POST' or 'PUT' requests) or params
 *  object ('GET' requests)
 */
class BillingClient {
  constructor () {
  }

  // billingClient.request('GET', '/credits/dateRange', { startDate: '', endDate: '' })
  request({ method, path, payload }) {
    return new Promise((resolve, reject) => {
      const privateKey = fromLocalStorage('privateKey');
      const publicKey = fromLocalStorage('publicKey');

      if ()
      const storj = new Storj({
        bridge: config.app.BRIDGE_URL,
        key: privateKey
      });
      const nonce = uuid();
      const contract = [method, path, payload].join('\n');
    });
  }
}
