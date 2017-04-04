import * as types from '@/store/mutation-types';
// import axios from 'axios';
// import Promise from 'bluebird';

const state = {
  email: ''
};

const mutations = {
  [types.SET_USER] (state, email) {
    console.log('commiting SET_USER', email);
    state.email = email;

    // save user to localStorage
    window.localStorage.setItem('email', email);
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
};
