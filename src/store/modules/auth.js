/* global Storj */
/* eslint no-undef: ["error", { "typeof": false }] */

import Promise from 'bluebird';
import * as types from '../mutation-types';
import config from '../../../config';
import errors from 'storj-service-error-types';

const state = {
  authenticated: false
};

const mutations = {
  [types.SET_AUTHENTICATION] (state, authenticated) {
    state.authenticated = authenticated;
  }
};

const actions = {
  authenticateAll ({ commit }, email) {
    if (email) {
      commit(types.SET_USER, email);
    }
    commit(types.SET_AUTHENTICATION, true);
  },

  unauthenticateAll ({ commit, rootState }) {
    commit(types.SET_AUTHENTICATION, false);
    commit(types.CLEAR_USER);
  },

  login ({ commit, dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      dispatch('basicAuth', credentials).then((storj) => {
        return dispatch('unregisterKey', storj)
          .then(() => dispatch('generateKeypair', storj))
          .then((keypair) => dispatch('registerKey', {
            publicKey: keypair.getPublicKey(),
            storj: storj
          }))
          .then(() => resolve())
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
    });
  },

  logout ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      console.log('logging out');
      dispatch('keypairAuth').then((storj) => {
        dispatch('unregisterKey', storj)
        .then(() => {
          commit(types.CLEAR_USER);
          resolve();
        })
        .catch(() => {
          commit(types.CLEAR_USER);
          reject();
        });
      });
    });
  },

  /**
  * Verifies Storj is authenticated until an isAuthenticated method is
  * implemented on storj.js
  */
  isStorjAuthenticated ({ commit, dispatch }, storj) {
    console.log('checking storj authentication');
    return new Promise((resolve, reject) => {
      if (!storj) {
        return reject(new errors.BadRequestError('No Storj instance'));
      }

      storj.getKeyList(function (err) {
        if (err) {
          console.log('getKeyList error');
          return reject(err);
        }
        console.log('got key list');
        return resolve(true);
      });
    });
  },

  basicAuth ({ commit, dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      console.log('ACTION: basicAuth', credentials);

      const options = {
        bridge: config.app.BRIDGE_URL,
        basicAuth: credentials
      };

      const storj = new Storj(options);

      storj.on('ready', function () {
        dispatch('isStorjAuthenticated', storj)
          .then(() => {
            dispatch('authenticateAll', credentials.email);
            resolve(storj);
          })
          .catch((err) => {
            dispatch('unauthenticateAll');
            reject(err);
          });
      });
    });
  },

  keypairAuth ({ commit, dispatch, rootState }) {
    return new Promise((resolve, reject) => {
      const privateKey = rootState.keypair.privateKey;
      console.log('ACTION: keypairAuth', privateKey);

      if (!privateKey) {
        return reject('No private key');
      }

      const options = {
        bridge: config.app.BRIDGE_URL,
        key: privateKey
      };

      const storj = new Storj(options);

      storj.on('ready', function () {
        console.log('ready');
        return resolve(storj);
      });

      storj.on('error', function (err) {
        console.log('errror', err);
        return reject(err);
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
