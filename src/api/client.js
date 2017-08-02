import { lStorage } from '@/utils';
import uuid from 'uuid/v4';
import Storj from '../../vendors/storj.es6';
import qs from 'qs';
import Promise from 'bluebird';

/**
 * @params {String} opts.baseURL - baseURL for API i.e. https://api.storj.io
 * @params {String} opts.bridgeURL - bridgeURL for Storj Bridge. May or may not be
 *  the same as baseURL. i.e. https://api.storj.io
 * @params {Object} opts.httpClient - your choice of client to make http calls
 *  (i.e. axios, ajax)
 *
 * Reference: https://github.com/Storj/bridge/blob/master/doc/auth.md
 */

class Client {
  constructor ({ baseURL, bridgeURL, httpClient }) {
    this._baseURL = baseURL;
    this._bridgeURL = bridgeURL;
    this._httpClient = httpClient;
  }

  /**
   * Authenticates requests sent to Storj clients.
   * @params {String} method - HTTP method ('GET', 'POST', 'PUT')
   * @params {String} path - Path for HTTP request
   * @params {Object} params - data for requests
   * @params {Object} credentials - basic auth credentials
   * Example usage:
   *  client.request('GET', '/credits/test')
   *
   */
  request (method, path, params = {}, credentials = {}) {
    return new Promise((resolve, reject) => {
      console.log('this._bridgeURL', this._bridgeURL);
      console.log('this._baseURL', this._baseURL);
      const privateKey = credentials.privateKey || lStorage.retrieve('privateKey');
      const isGetOrDel = ['GET', 'DELETE'].indexOf(method) !== -1 || false;

      // Nonce for signing up
      const nonce = uuid();
      params.__nonce = nonce;

      const baseOpts = {
        baseURL: this._baseURL,
        method: method.toLowerCase(),
        protocol: 'https'
      };

      if (isGetOrDel) {
        baseOpts.qs = params;
      } else {
        baseOpts.data = params;
      }

      const authOpts = privateKey
        ? this._ecdsa(method, path, params, privateKey, isGetOrDel)
        : this._basicAuth(method, path, params, credentials, isGetOrDel);

      const opts = Object.assign(baseOpts, authOpts);

      return this._httpClient(opts)
        .then((result) => resolve(result))
        .catch((err) => {
          console.log('testing error: ', err);
          console.log('baseOpts', baseOpts);
          reject(err);
        });
    });
  }

  _ecdsa (method, path, params, privateKey, isGetOrDel) {
    const storj = new Storj({
      bridge: this._bridgeURL,
      key: privateKey,
      protocol: 'https'
    });

    const keypair = storj.generateKeyPair(privateKey);
    const publicKey = keypair.getPublicKey();

    // Stringify according to type of request
    const payload = isGetOrDel ? qs.stringify(params) : JSON.stringify(params);

    // Create contract string in format of <METHOD>\n<PATH>\n<PARAMS>
    const contract = [method, path, payload].join('\n');

    // Sign contract with keypair
    const signedContract = keypair.sign(contract, { compact: false });

    const query = isGetOrDel ? `?${payload}` : ``;
    console.log('path ', path);
    const opts = {
      url: path + query,
      headers: {
        'x-pubkey': publicKey,
        'x-signature': signedContract
      }
    };

    console.log('ecdsa opts: ', opts);
    return opts;
  }

  _basicAuth (method, path, params, credentials, isGetOrDel) {
    const query = isGetOrDel ? `?${qs.stringify(params)}` : ``;

    console.log('path ', path);

    const opts = {
      url: path + query,
      auth: {
        user: credentials.email,
        pass: credentials.password
      }
    };
    console.log('auth_opts: ', opts);
    return opts;
  }
}

export default Client;
