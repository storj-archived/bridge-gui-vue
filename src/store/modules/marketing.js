import {
  SET_MARKETING,
  CLEAR_MARKETING
} from '../mutation-types';
import Promise from 'bluebird';
import billingClient from '@/api/billing-client';
import { lStorage } from '@/utils';

const state = {
  id: '',
  user: '',
  referralLink: ''
};

const mutations = {
  [SET_MARKETING] (state, marketing) {
    state.id = marketing._id;
    state.user = marketing.user;
    state.referralLink = marketing.referralLink;
  },

  [CLEAR_MARKETING] (state) {
    state.id = '';
    state.user = '';
    state.referralLink = '';
  }
};

const actions = {
  getMarketing ({ commit }) {
    return new Promise((resolve, reject) => {
      const user = lStorage.get('email');
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
      billingClient
        .request('POST', '/referrals/sendReferralEmail', {
          marketing: state,
          emails
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
};

export default {
  state,
  mutations,
  actions
};
