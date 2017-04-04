/* global Storj */
/* eslint no-undef: ["error", { "typeof": false }] */
/**
 * Promisified storj methods for convenience
 */

// import Storj from 'storj.js';
import errors from 'storj-service-error-types';
// import config from '../../config';
import Promise from 'bluebird';

/**
 * Verifies Storj is authenticated until an isAuthenticated method is
 * implemented on storj.js
 */
export const isStorjAuthenticated = (storj) => {
  console.log('checking storj authentication');
  return new Promise((resolve, reject) => {
    storj.getKeyList(function (err) {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

/**
 * Authenticates with basic auth
 * @param {String} user - user --> email address
 * @param {String} password
 * @return {Promise|Object} - returns Storj object
 */
export const authenticateWithBasicAuth = (credentials) => {
  return new Promise((resolve, reject) => {
    const options = {
      // bridge: config.app.BRIDGE_URL,
      basicAuth: {
        user: credentials.email,
        password: credentials.password
      }
    };

    const storj = new Storj(options);
    // Verifies authentication worked
    if (storj.username) {
      return resolve(storj);
    }
    return reject(new errors.BadRequest('Invalid username or password'));
  });
};

/**
 * Registers public key with Storj network
*/
export const registerKey = (storj, keypair) => {
  return new Promise((resolve, reject) => {
    storj.registerKey(keypair.getPublicKey(), function (err) {
      if (err) {
        console.error(err.message);
        return reject(new errors.InternalError(err));
      }
      return resolve(storj);
    });
  });
};

/**
 * Authenticates with keypair auth. Requires generation of keypair prior
 * @param {object} keypair - object containing private and public keys
 * @return {Promise|Object} storj - returns authenticated storj instance
 */
export const authenticateWithKeyPairAuth = (keypair) => {
  return new Promise((resolve, reject) => {
    const options = {
      key: keypair.getPrivateKey()
    };

    const storj = new Storj(options);

    // TODO: Check to make sure authentication worked
    if (storj.key) {
      return resolve(storj);
    }
    return reject(new errors.InternalError('Error authenticating with key'));
  });
};
