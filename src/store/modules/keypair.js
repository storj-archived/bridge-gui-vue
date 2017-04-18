/* eslint no-undef: ["error", { "typeof": false }] */

import {
  SET_PRIVATE_KEY,
  SET_PUBLIC_KEY,
  CLEAR_KEYS
} from '@/store/mutation-types';
import errors from 'storj-service-error-types';
import Promise from 'bluebird';
import { lStorage } from '@/utils';

const state = {
  privateKey: lStorage.set('privateKey'),
  publicKey: lStorage.set('publicKey')
};

const mutations = {
  /**
   * Saves private key to store and also sets it on Local Storage
   */
  [SET_PRIVATE_KEY] (state, privateKey) {
    console.log('SET_PRIVATE_KEY');
    state.privateKey = privateKey;

    lStorage.set('privateKey', privateKey);
  },

  [SET_PUBLIC_KEY] (state, publicKey) {
    state.publicKey = publicKey;

    lStorage.set('publicKey', publicKey);
  },

  [CLEAR_KEYS] (state) {
    console.log('CLEAR_KEYS');
    state.privateKey = '';
    state.publicKey = '';

    if (window && window.localStorage) {
      window.localStorage.removeItem('privateKey');
      window.localStorage.removeItem('publicKey');
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
      commit(SET_PUBLIC_KEY, keypair.getPublicKey());

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
      const publicKey = window.localStorage.getItem('publicKey');

      if (!privateKey || !publicKey) {
        return resolve();
      }

      storj.removeKey(publicKey, function (err) {
        if (err) {
          return reject(new errors.InternalError(err.message));
        }
        console.log('Removing private key');
        commit(CLEAR_KEYS);
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
