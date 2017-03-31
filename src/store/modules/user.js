import * as types from '@/store/mutation-types';
// import axios from 'axios';
// import Promise from 'bluebird';

const state = {
  email: ''
};

const mutations = {
  [types.SET_USER] (state, email) {
    state.email = email;
  }
};

const actions = {
  createUser ({ commit, state, rootState }, user) {
    console.log('ACTION: creatingUser', user);
    // TO DO: add endpoint to billing server to create user.then() -->
    // axios.post(BILLING_URL + '/api/user/create')
    commit(types.SET_USER, user.email);
  }
};

export default {
  state,
  mutations,
  actions
};
