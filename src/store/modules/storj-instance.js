/* eslint no-undef: ["error", { "typeof": false }] */
import * as types from '@/store/mutation-types';

const state = {
  instance: null
};

const mutations = {
  [types.SET_STORJ_INSTANCE] (state, storj) {
    console.log('SET_STORJ_INSTANCE', storj);
    state.instance = storj;
  },

  [types.CLEAR_STORJ_INSTANCE] (state) {
    state.instance = null;
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
};
