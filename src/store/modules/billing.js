import {
  SET_CREDITS,
  SET_DEBITS,
  SET_DEFAULT_PAYMENT_METHOD,
  CLEAR_DEFAULT_PAYMENT_METHOD,
  MARK_RETRIEVED,
  CLEAR_BILLING
} from '../mutation-types';
// import errors from 'storj-service-error-types';
import { createStripeToken } from '@/vendors/stripe';
import { lStorage } from '@/utils';
import billingClient from '@/api/billing-client';

const state = {
  retrieved: false,
  credits: [],
  debits: [],
  defaultPaymentMethod: {}
};

const mutations = {
  [SET_CREDITS] (state, credits) {
    state.credits = credits;
  },

  [SET_DEBITS] (state, debits) {
    state.debits = debits;
  },

  [SET_DEFAULT_PAYMENT_METHOD] (state, method) {
    state.defaultPaymentMethod = method;
  },

  [CLEAR_DEFAULT_PAYMENT_METHOD] (state) {
    state.defaultPaymentMethod = {};
  },

  [MARK_RETRIEVED] (state) {
    state.retrieved = true;
  },

  [CLEAR_BILLING] (state) {
    state.retrieved = false;
    state.credits = [];
    state.debits = [];
    state.defaultPaymentMethod = {};
  }
};

const actions = {
  getCredits ({ commit, dispatch }, params = {}) {
    return new Promise((resolve, reject) => {
      params.user = lStorage.retrieve('email');
      return billingClient.request('GET', '/credits', params)
        .then((res) => resolve(commit(SET_CREDITS, res.data)))
        .catch((err) => reject(err));
    });
  },

  getDebits ({ commit, dispatch }, params = {}) {
    return new Promise((resolve, reject) => {
      params.user = lStorage.retrieve('email');
      return billingClient.request('GET', '/debits', params)
        .then((res) => resolve(commit(SET_DEBITS, res.data)))
        .catch((err) => reject(err));
    });
  },

  removeCard ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        commit(CLEAR_DEFAULT_PAYMENT_METHOD);
        console.log('hai hai hai');
      }, 2000);
    });
  },

  addPaymentMethod ({ commit, dispatch }, opts) {
    return new Promise((resolve, reject) => {
      console.log('hai', opts.processor);
      if (opts.processor !== 'stripe') {
        billingClient.request('GET', '/pp/getDefault');
      } else if (opts.processor === 'stripe') {
        createStripeToken(opts.fields).then((token) => {
          billingClient.request('POST', '/pp/addPaymentMethod', {
            token,
            processor: 'stripe'
          }).then((res) => {
            console.log('res', res);
            commit(SET_DEFAULT_PAYMENT_METHOD, res.data.defaultPaymentMethod);
            return resolve();
          }).catch((err) => {
            console.log('addPaymentMethod err', err);
            return reject(err);
          });
        });
      }
    });
  },

  getDefaultPaymentProcessor ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      billingClient.request('GET', '/pp/defaultPaymentProcessor')
        .then((res) => {
          console.log('defaultPaymentProcessor res', res);
          commit(SET_DEFAULT_PAYMENT_METHOD, res.data.defaultPaymentMethod);
          return resolve();
        })
        .catch((err) => {
          console.log('getDefaultPaymentProcessor err', err);
          return reject(err);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
