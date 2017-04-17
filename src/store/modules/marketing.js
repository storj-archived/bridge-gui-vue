import {
  SET_MARKETING
} from '../mutation-types';
import Promise from 'bluebird';
import billingClient from '@/api/billing-client';
import { fromLocalStorage } from '@/utils';

const state = {
  id: '',
  user: '',
  referralLink: ''
};

const mutations = {
  [SET_MARKETING] (state, marketing) {
    state.id = marketing.id;
    state.user = marketing.user;
    state.referralLink = marketing.referralLink;
  }
};

const actions = {
  getMarketing ({ commit }) {
    return new Promise((resolve, reject) => {
      const user = fromLocalStorage('email');
      billingClient.request('GET', '/marketing', { user })
        .then((res) => {
          commit(SET_MARKETING, res.data);
          return resolve();
        })
        .catch((err) => reject(err));
    });
  },

  sendEmails ({ commit, dispatch, state }, emails, marketing) {
    return new Promise((resolve, reject) => {
      billingClient.request('POST', '/referrals/sendReferralEmail', {
        marketing,
        emails
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
