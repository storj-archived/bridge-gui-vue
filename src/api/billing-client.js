/* global Storj */
/* eslint no-undef: ["error", { "typeof": false }] */

import axios from 'axios';
import config from '../../config';
import { fromLocalStorage } from '@/utils';
import uuid from 'uuid/v4';
import qs from 'qs';
import Promise from 'bluebird';
import errors from 'storj-service-error-types';

/**
 * Authenticates requests sent to Billing. Only keypair authentication
 * is currently allowed
 * @params {String} method - HTTP method ('GET', 'POST', 'PUT')
 * @params {String} path - Path for HTTP request
 * @params {Object} params - data for requests
 *
 * Example usage:
 *  billingClient.request('GET', '/credits/test')
 *
 * Reference: https://github.com/Storj/bridge/blob/master/doc/auth.md
 */
class BillingClient {
  request (method, path, params = {}) {
    const implementedMethods = ['GET', 'PUT', 'POST'];

    return new Promise((resolve, reject) => {
      const privateKey = fromLocalStorage('privateKey');

      if (!privateKey) {
        return reject(new errors.BadRequestError('Private key required'));
      }

      if (implementedMethods.indexOf(method) === -1) {
        return reject(new errors.NotImplementedError('Method not implemented'));
      }

      const isGet = ['GET'].indexOf(method) !== -1 || false;
      // Create Storj instance to get access to generate keys and sign message
      const storj = new Storj({
        bridge: config.app.BRIDGE_URL,
        key: privateKey
      });

      const keypair = storj.generateKeyPair(privateKey);
      const publicKey = keypair.getPublicKey();

      // Nonce for signing
      const nonce = uuid();
      params.__nonce = nonce;

      // Stringify according to type of request
      const payload = isGet ? qs.stringify(params) : JSON.stringify(params);

      // Create contract string in format of <METHOD>\n<PATH>\n<PARAMS>
      const contract = [method, path, payload].join('\n');

      // Sign contract with keypair
      const signedContract = keypair.sign(contract, { compact: false });

      const query = isGet ? `?${payload}` : ``;

      const opts = {
        method: method.toLowerCase(),
        url: config.app.BILLING_URL + path + query,
        headers: {
          'x-pubkey': publicKey,
          'x-signature': signedContract
        }
      };

      if (!isGet) {
        opts.data = params;
      }

      // Make request to Billing
      console.log(opts);
      return axios(opts)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

const billingClient = new BillingClient();

export default billingClient;
