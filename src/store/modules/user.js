import * as types from '@/store/mutation-types';
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
  createUser ({ commit, state }, user) {
    console.log('ACTION: creatingUser', user);
    // TO DO: storj.js code to create user.then() -->
    commit(types.SET_USER, user.email);
  }
};

export default {
  state,
  mutations,
  actions
};

