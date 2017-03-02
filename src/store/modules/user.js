import {
  SET_USER,
  SET_PRIVATE_KEY
} from '@/store/mutation-types';
import axios from 'axios';
import { BILLING_URL } from '@/../config';

const state = {
  email: '',
  privateKey: ''
};

const mutations = {
  [SET_USER] (state, email) {
    state.email = email;
  },

  [SET_PRIVATE_KEY] (state, privateKey) {
    state.privateKey = privateKey;
  }
};

const actions = {
  loginUser ({ commit, state }, user) {
    console.log('hello', user);
    axios.post(BILLING_URL);
  }
};

export default {
  state,
  mutations,
  actions
};

