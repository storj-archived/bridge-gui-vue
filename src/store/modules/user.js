import {
  SET_USER,
  CLEAR_USER
} from '@/store/mutation-types';
import axios from 'axios';
import Promise from 'bluebird';
import config from '../../../config';
import { lStorage } from '@/utils';

const state = {
  email: lStorage.retrieve('email')
};

const mutations = {
  [SET_USER] (state, email) {
    state.email = email;

    // save user to localStorage
    lStorage.save('email', email);
  },

  [CLEAR_USER] (state) {
    state.email = '';

    lStorage.remove('email');
  }
};

const actions = {
  /**
   * Creates a new Storj user
   */
  createUser ({ commit, state }, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.app.BRIDGE_URL + '/users', credentials)
        .then((result) => {
          commit(SET_USER, credentials.email);

          axios
            .post(config.app.BILLING_URL + '/credits/signups', {
              email: credentials.email,
              referralLink: credentials.referralLink
            })
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  }
};

export default {
  state,
  mutations,
  actions
};
