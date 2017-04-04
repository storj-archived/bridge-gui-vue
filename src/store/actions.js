/* global Storj */
/* eslint no-undef: ["error", { "typeof": false }] */

import * as types from './mutation-types';
// import config from '../../config';
import errors from 'storj-service-error-types';
import Promise from 'bluebird';
import { isStorjAuthenticated } from '@/utils/storj';
// import axios from 'axios';

/**
 * Creates a new Storj user
 * Requires using server to send request--storj.js has no createUser method
 */
export const createUser = ({ commit, state }, credentials) => {
  return new Promise((resolve, reject) => {
    console.log('ACTION: signupUser', credentials);

    commit(types.SET_USER, credentials.email);

    resolve(credentials.email);

    // this works, but need to resolve issue with ssl bridge connection
    // axios.post('/api/user/create/', credentials)
    // .then((result) => {
    //   commit(types.SET_USER, credentials.email);
    //   resolve(result);
    // })
    // .catch((err) => reject(err));
  });
};

/**
 * Logs user in
 */
export const authenticateUserBasic = ({ commit, state }, credentials) => {
  return new Promise((resolve, reject) => {
    console.log('ACTION: loginUser', credentials);

    const options = {
      basicAuth: credentials
    };

    var storj = new Storj(options);

    storj.on('ready', function () {
      isStorjAuthenticated(storj)
        .then(() => {
          commit(types.SET_STORJ_INSTANCE, storj);
          commit(types.SET_USER, options.basicAuth.email);
          authenticateWithKeyPair({ commit, state })
          // generateKeyPair({ commit, state })
          //   .then(() => resolve())
          //   .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });
};

/**
 * Requires logged in user
 */
export const generateKeyPair = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    console.log('ACTION: generateKeyPair');
    const storj = state.storj.instance;
    console.log('storj', storj);
    const keypair = storj.generateKeyPair();
    const privateKey = keypair.getPrivateKey();
    const publicKey = keypair.getPublicKey();

    console.log('privateKey', privateKey, 'publicKey', publicKey);

    storj.registerKey(publicKey, function (err) {
      if (err) {
        console.log(err);
        return reject(new errors.InternalError('Error registering key', err));
      }
      commit(types.SET_PRIVATE_KEY, privateKey);
      return resolve(true);
    });
  });
};

/**
 * Logs user in with keypair authentication
 */
export const authenticateUserKeyPair = ({ commit, state }, keypair) => {
  return new Promise((resolve, reject) => {

  });
};
