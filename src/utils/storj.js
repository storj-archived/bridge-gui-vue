/**
 * Promisified storj methods for convenience
 */

import Storj from 'storj.js';
import error from 'storj-service-error-types';
import Promise from 'bluebird';

/**
 * Authenticates with basic auth
 * @param {String} user - user --> email address
 * @param {String} password
 * @return {Promise|Object} - returns Storj object
 */
export const authenticateWithBasicAuth = (credentials) => {
  return new Promise((resolve, reject) => {
    const options = {
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
        return reject(new error.InternalError(err));
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
    }

    const storj = new Storj(options);

    // TODO: Check to make sure authentication worked
    if (storj.key) {
      return resolve(storj);
    }
    return reject(new errors.InternalError('Error authenticating with key'));
  });
};

