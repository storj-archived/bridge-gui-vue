import {
  SET_CREDITS,
  SET_DEBITS,
  SET_DEFAULT_PAYMENT_METHOD,
  SET_BILLING_DATE,
  SET_DEFAULT_PP_ID,
  CLEAR_DEFAULT_PAYMENT_METHOD,
  MARK_RETRIEVED,
  CLEAR_BILLING
} from '../mutation-types';
// import errors from 'storj-service-error-types';
import { createStripeToken } from '@/vendors/stripe';
import { lStorage } from '@/utils';
import billingClient from '@/api/billing-client';

// TODO: break out processors and payments into submodule of billing
const state = {
  retrieved: false,
  credits: [],
  debits: [],
  defaultPaymentMethod: {},
  defaultPPId: '',
  billingDate: null
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

  [SET_BILLING_DATE] (state, date) {
    state.billingDate = date;
  },

  [SET_DEFAULT_PP_ID] (state, id) {
    state.defaultPPId = id;
  },

  [MARK_RETRIEVED] (state) {
    state.retrieved = true;
  },

  [CLEAR_BILLING] (state) {
    state.retrieved = false;
    state.credits = [];
    state.debits = [];
    state.defaultPaymentMethod = {};
    state.billingDate = null;
    state.defaultPPId = '';
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

  _setPaymentInfo ({ commit }, res) {
    if (res && res.data && res.data.pp) {
      // console.log('res.data', res.data);
      commit(SET_DEFAULT_PAYMENT_METHOD, res.data.pp.defaultPaymentMethod);
      commit(SET_BILLING_DATE, res.data.pp.billingDate);
      commit(SET_DEFAULT_PP_ID, res.data.pp.id);
    } else {
      commit(SET_DEFAULT_PAYMENT_METHOD, {});
      commit(SET_BILLING_DATE, null);
      commit(SET_DEFAULT_PP_ID, '');
    }
  },

  removePaymentMethod ({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      billingClient.request('POST', '/pp/method/remove', {
        methodId: state.defaultPaymentMethod.id,
        ppId: state.defaultPPId
      })
      .then((res) => resolve(dispatch('_setPaymentInfo')))
      .catch((err) => reject(err));
    });
  },

  addPaymentMethod ({ commit, dispatch }, opts) {
    return new Promise((resolve, reject) => {
      console.log('hai', opts.processor.name);
      // TODO: Add switch/case for different processor additions
      if (opts.processor.name !== 'stripe') {
        return true;
      } else if (opts.processor.name === 'stripe') {
        createStripeToken(opts.fields).then((token) => {
          billingClient.request('POST', '/pp/method/add', {
            data: token,
            processor: opts.processor
          })
          .then((res) => resolve(dispatch('_setPaymentInfo', res)))
          .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
      }
    });
  },

  getDefaultPP ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      billingClient.request('GET', '/pp/default')
        .then((res) => resolve(dispatch('_setPaymentInfo', res)))
        .catch((err) => reject(err));
    });
  }
};

export default {
  state,
  mutations,
  actions
};
