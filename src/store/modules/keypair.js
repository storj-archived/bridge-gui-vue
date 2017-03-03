import * as types from '@/store/mutation-types';

const state = {
  privateKey: ''
};

const mutations = {
  /**
   * Saves private key to store and also sets it on Local Storage
   */
  [types.SET_PRIVATE_KEY] (state, privateKey) {
    state.privateKey = privateKey;

    if (window && window.localStorage) {
      window.localStorage.setItem('privateKey', privateKey);
    }
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
};

