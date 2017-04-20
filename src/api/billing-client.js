/* global Storj */
/* eslint no-undef: ["error", { "typeof": false }] */

import axios from 'axios';
import config from '../../config';
import { lStorage } from '@/utils';
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
  request (method, path, params = {}, credentials) {
    const implementedMethods = ['GET', 'PUT', 'POST'];

    return new Promise((resolve, reject) => {
      const privateKey = lStorage.retrieve('privateKey');

      if (implementedMethods.indexOf(method) === -1) {
        return reject(new errors.NotImplementedError('Method not implemented'));
      }

      const isGet = ['GET'].indexOf(method) !== -1 || false;

      // Nonce for signing
      const nonce = uuid();
      params.__nonce = nonce;

      const baseOpts = {
        baseURL: config.app.BILLING_URL,
        method: method.toLowerCase()
      };

      if (isGet) {
        baseOpts.qs = params;
      } else {
        baseOpts.data = params;
      }

      const authOpts = privateKey
        ? this._ecdsa(method, path, params, privateKey)
        : this._basicAuth(method, path, params, credentials);

      const opts = Object.assign(baseOpts, authOpts);

      // Make request to Billing
      return axios(opts)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  _ecdsa (method, path, params, privateKey) {
    const isGet = ['GET'].indexOf(method) !== -1 || false;
    // Create Storj instance to get access to generate keys and sign message
    const storj = new Storj({
      bridge: config.app.BRIDGE_URL,
      key: privateKey
    });

    const keypair = storj.generateKeyPair(privateKey);
    const publicKey = keypair.getPublicKey();

    // Stringify according to type of request
    const payload = isGet ? qs.stringify(params) : JSON.stringify(params);

    // Create contract string in format of <METHOD>\n<PATH>\n<PARAMS>
    const contract = [method, path, payload].join('\n');

    // Sign contract with keypair
    const signedContract = keypair.sign(contract, { compact: false });

    const query = isGet ? `?${payload}` : ``;

    const opts = {
      url: path + query,
      headers: {
        'x-pubkey': publicKey,
        'x-signature': signedContract
      }
    };

    return opts;
  }

  _basicAuth (method, path, params, credentials) {
    const isGet = ['GET'].indexOf(method) !== -1 || false;

    const query = isGet ? `?${qs.stringify(params)}` : ``;

    const opts = {
      url: path + query,
      auth: {
        user: credentials.email,
        pass: credentials.password
      }
    };

    return opts;
  }
}

const billingClient = new BillingClient();

export default billingClient;
