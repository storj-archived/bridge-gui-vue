import {
  SET_USER,
  CLEAR_USER
} from '@/store/mutation-types';
import axios from 'axios';
import Promise from 'bluebird';
import config from '../../../config';
import errors from 'storj-service-error-types';
import { lStorage } from '@/utils';

const state = {
  email: lStorage.retrieve('email')
};

const mutations = {
  [SET_USER] (state, email) {
    console.log('commiting SET_USER', email);
    state.email = email;

    // save user to localStorage
    lStorage.save('email', email);
  },

  [CLEAR_USER] (state) {
    console.log('commiting CLEAR_USER');
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
        .catch((err) => reject(new errors.InternalError(err)));
    });
  }
};

export default {
  state,
  mutations,
  actions
};
