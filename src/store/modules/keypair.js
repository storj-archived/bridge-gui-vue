/* eslint no-undef: ["error", { "typeof": false }] */

import {
  SET_PRIVATE_KEY,
  CLEAR_PRIVATE_KEY
} from '@/store/mutation-types';
// import config from '../../../config';
import errors from 'storj-service-error-types';
import Promise from 'bluebird';

const state = {
  privateKey: window && window.localStorage
    ? window.localStorage.getItem('privateKey')
    : ''
};

const mutations = {
  /**
   * Saves private key to store and also sets it on Local Storage
   */
  [SET_PRIVATE_KEY] (state, privateKey) {
    console.log('SET_PRIVATE_KEY');
    state.privateKey = privateKey;

    if (window && window.localStorage) {
      window.localStorage.setItem('privateKey', privateKey);
    }
  },

  [CLEAR_PRIVATE_KEY] (state) {
    console.log('CLEAR_PRIVATE_KEY');
    state.privateKey = '';

    if (window && window.localStorage) {
      window.localStorage.removeItem('privateKey');
    }
  }
};

const actions = {
  generateKeypair ({ commit, state, rootState }, storj) {
    return new Promise((resolve, reject) => {
      console.log('ACTION: generateKeyPair');

      if (!storj) {
        return reject(new errors.BadRequestError('No Storj instance'));
      }

      const keypair = storj.generateKeyPair();

      commit(SET_PRIVATE_KEY, keypair.getPrivateKey());

      return resolve(keypair);
    });
  },

  /**
   * Registers public key with Storj network
  */
  registerKey ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      console.log('registeringKey');

      if (!data.storj) {
        return reject(new errors.BadRequestError('No Storj instance'));
      }

      data.storj.registerKey(data.publicKey, function (err) {
        if (err) {
          return reject(new errors.InternalError(err));
        }
        console.log('key registered');
        return resolve();
      });
    });
  },

  /**
   * Unregister public key with Storj network and clear private key from
   * Vuex state
   */
  unregisterKey ({ commit, dispatch }, storj) {
    return new Promise((resolve, reject) => {
      console.log('unregisterKey');
      const privateKey = window.localStorage.getItem('privateKey');

      if (!privateKey) {
        return resolve();
      }
      // Regenerate public key from stored private key
      const keypair = storj.generateKeyPair(privateKey);

      storj.removeKey(keypair.getPublicKey(), function (err) {
        if (err) {
          return reject(new errors.InternalError(err.message));
        }
        console.log('Removing private key');
        commit(CLEAR_PRIVATE_KEY);
        return resolve('Private key removed');
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
