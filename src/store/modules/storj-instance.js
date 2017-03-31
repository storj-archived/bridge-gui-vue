import * as types from '@/store/mutation-types';

const state = {
  instance: null
};

const mutations = {
  [types.SET_STORJ_INSTANCE] (state, storj) {
    state.instance = storj;
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
};
