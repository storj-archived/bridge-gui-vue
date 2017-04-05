/* eslint no-undef: ["error", { "typeof": false }] */

import * as types from '@/store/mutation-types';
// import config from '../../../config';
import errors from 'storj-service-error-types';
import Promise from 'bluebird';

const state = {
  privateKey: window && window.localStorage
    ? window.localStorage.getItem('privateKey')
    : '',
  publicKey: ''
};

const mutations = {
  /**
   * Saves private key to store and also sets it on Local Storage
   */
  [types.SET_PRIVATE_KEY] (state, privateKey) {
    console.log('SET_PRIVATE_KEY');
    state.privateKey = privateKey;

    if (window && window.localStorage) {
      window.localStorage.setItem('privateKey', privateKey);
    }
  },

  [types.SET_PUBLIC_KEY] (state, publicKey) {
    console.log('SET_PUBLIC_KEY');
    state.publicKey = publicKey;
  },

  [types.CLEAR_PRIVATE_KEY] (state) {
    console.log('CLEAR_PRIVATE_KEY');
    state.privateKey = '';

    if (window && window.localStorage) {
      window.localStorage.removeItem('privateKey');
    }
  }
};

const actions = {
  generateKeypair ({ commit, state, rootState }, privateKey) {
    return new Promise((resolve, reject) => {
      console.log('ACTION: generateKeyPair', rootState.storj.instance);

      const storj = rootState.storj.instance;

      if (!storj) {
        return reject(new errors.BadRequestError('No Storj instance'));
      }

      const keypair = storj.generateKeyPair(privateKey);

      commit(types.SET_PRIVATE_KEY, keypair.getPrivateKey());
      commit(types.SET_PUBLIC_KEY, keypair.getPublicKey());

      return resolve(keypair);
    });
  },

  /**
   * Registers public key with Storj network
  */
  registerKey ({ commit, state, rootState }) {
    return new Promise((resolve, reject) => {
      console.log('registeringKey');
      const storj = rootState.storj.instance;

      if (!storj) {
        return reject(new errors.BadRequestError('No Storj instance'));
      }

      storj.registerKey(state.publicKey, function (err) {
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
  unregisterKey ({ commit, dispatch, rootState }) {
    return new Promise((resolve, reject) => {
      console.log('unregisterKey');
      const storj = rootState.storj.instance;
      const privateKey = window.localStorage.getItem('privateKey');

      if (!privateKey) {
        return resolve('No private key');
      }

      if (!storj) {
        return reject(new errors.BadRequestError('No Storj instance'));
      }

      // Regenerate public key from stored private key
      const keypair = storj.generateKeyPair(privateKey);

      storj.removeKey(keypair.getPublicKey(), function (err) {
        if (err) {
          return reject(new errors.InternalError(err));
        }
        console.log('Removing private key');
        commit(types.CLEAR_PRIVATE_KEY);
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
