import * as types from '@/store/mutation-types';
import Promise from 'bluebird';

const state = {
  email: '',
  privateKey: ''
};

const mutations = {
  [types.SET_USER] (state, email) {
    state.email = email;
  },

  [types.SET_PRIVATE_KEY] (state, privateKey) {
    state.privateKey = privateKey;
  }
};

const actions = {
  loginUser ({ commit, state }, user) {
    return new Promise((resolve, reject) => {
      console.log('ACTION: loginUser', user);
      // TO DO: storj.js code to log user in and create new Storj object to use
      // and then save in store.then() -->
      commit(types.SET_USER, user.email);

      return resolve('data from here');
    });
  },

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

