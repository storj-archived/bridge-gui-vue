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
 */

class Client {
  constructor ({ baseURL, bridgeURL, httpClient }) {
    this._bridgeURL = bridgeURL;
    this._httpClient = httpClient;
    this._baseOpts = {
      baseURL: baseURL
    };
  }

  isGetOrDelete(method) {
    return ['GET', 'DELETE'].indexOf(method) !== -1 || false;
  }

  request (method, path, params = {}, credentials) {
    return new Promise((resolve, reject) => {
      const privateKey = credentials.privateKey
        || lStorage.retrieve('privateKey');

      // Nonce for signing up
      const nonce = uuid();

      params.__nonce = nonce;
      this._baseOpts.method = method.toLowerCase();

      if (this.isGetOrDelete) {
        this._baseOpts.qs = params;
      } else {
        this._baseOpts.data = params;
      }

      if (privateKey) {
        this._ecdsa(method, path, params, privateKey)
      } else {
        this._basicAuth(method, path, params, credentials);
      }

      return this._httpClient(this._baseOpts)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  _ecdsa (method, path, params, privateKey) {
    const storj = new Storj({
      bridge: this._bridgeURL,
      key: privateKey
    });

    const keypair = storj.generateKeyPair(privateKey);
    const publicKey = keypair.getPublicKey();

    // Stringify according to type of request
    const payload = this.isGetOrDelete
      ? qs.stringify(params)
      : JSON.stringify(params);

    // Create contract string in format of <METHOD>\n<PATH>\n<PARAMS>
    const contract = [method, path, payload].join('\n');

    // Sign contract with keypair
    const signedContract = keypair.sign(contract, { compact: false });

    const query = this.isGetOrDelete ? `?${payload}` : ``;

    this._baseOpts.url = path + query;
    this._baseOpts.headers = {
      'x-pubkey': publicKey,
      'x-signature': signedContract
    };

    return;
  }

  _basicAuth (method, path, params, credentials) {
    const query = this.isGetOrDelete ? `?${qs.stringify(params)}` : ``;

    this._baseOpts.url = path + query;
    this._baseOpts.auth = {
      user: credentials.email,
      pass: credentials.password
    };

    return;
  }
}
