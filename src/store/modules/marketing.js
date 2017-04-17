import {
  SET_REFERRAL_LINK
} from '../mutation-types';
import Promise from 'bluebird';
import billingClient from '@/api/billing-client';
import { fromLocalStorage } from '@/utils';

const state = {
  id: '',
  referralLink: ''
};

const mutations = {
  [SET_REFERRAL_LINK] (state, referralLink) {
    state.referralLink = referralLink;
  }
};

const actions = {
  getMarketing ({ commit }) {
    return new Promise((resolve, reject) => {
      const user = fromLocalStorage('email');
      billingClient.request('GET', '/marketing', { user })
        .then((res) => {
          commit(SET_REFERRAL_LINK, res.data.referralLink);
          return resolve();
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
