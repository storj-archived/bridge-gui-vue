import {
  SET_CREDITS,
  SET_DEBITS,
  SET_DEFAULT_PAYMENT_METHOD,
  CLEAR_DEFAULT_PAYMENT_METHOD,
  MARK_RETRIEVED
} from '../mutation-types';
import errors from 'storj-service-error-types';
import { createStripeToken } from '@/vendors/stripe';
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
  }
};

const actions = {
  getCredits ({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      return billingClient.request('GET', '/credits', params)
        .then((res) => resolve(commit(SET_CREDITS, res.data)))
        .catch((err) => reject(err));
    });
  },

  getDebits ({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
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

  addPaymentMethod ({ commit, dispatch }, fields, processor) {
    return new Promise((resolve, reject) => {
      createStripeToken(fields)
        .then(() => {
          console.log('okdoaisdjfklas;flsdkfjsd');
        });
      // if (processor === 'stripe') {
      //   dispatch('createStripeToken')
        // .then((token) => {
        //   storjAxios.addPaymentMethod(JSON.stringify(token)), 'stripe')
        //     .then((result) => {
        //       commit(SET_DEFAULT_PAYMENT_METHOD, result.defaultPaymentMethod);
        //     })
        //     .catch((err) => reject(err));
        // }
      setTimeout(function () {
        // commit(SET_DEFAULT_PAYMENT_METHOD, obj);
        console.log('heeelllooo');
        reject(new errors.BadRequestError('No soup for you'));
      }, 2000);
    });
  }
};

export default {
  state,
  mutations,
  actions
};
