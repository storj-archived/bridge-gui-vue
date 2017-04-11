import {
  SET_CREDITS,
  SET_DEBITS,
  SET_DEFAULT_PAYMENT_METHOD,
  CLEAR_DEFAULT_PAYMENT_METHOD
} from '../mutation-types';
import errors from 'storj-service-error-types';

const state = {
  credits: [{
    id: 1,
    paid_amount: 1000,
    invoiced_amount: 1000,
    created: new Date(),
    user: 'a@a.com',
    paid: true,
    payment_processor: 'stripe',
    type: 'automatic'
  }, {
    id: 2,
    paid_amount: 0,
    invoiced_amount: 1000,
    created: new Date(),
    user: 'a@a.com',
    paid: false,
    payment_processor: 'stripe',
    type: 'automatic'
  },
  {
    id: 3,
    paid_amount: 2000,
    invoiced_amount: 2000,
    created: new Date(),
    user: 'a@a.com',
    paid: true,
    payment_processor: 'stripe',
    type: 'automatic'
  }, {
    id: 4,
    promo_code: 'referral-recipient',
    promo_amount: 1000,
    promo_expires: new Date(),
    created: new Date(),
    type: 'automatic'
  }],
  debits: [{
    id: 1,
    amount: 1000,
    user: 'a@a.com',
    created: new Date(),
    type: 'storage',
    bandwidth: 0,
    storage: 1920321
  }, {
    id: 2,
    amount: 2000,
    user: 'a@a.com',
    created: new Date(),
    type: 'storage',
    bandwidth: 0,
    storage: 10321
  }, {
    id: 3,
    amount: 1000,
    user: 'a@a.com',
    created: new Date(),
    type: 'bandwidth',
    bandwidth: 123123
  }],
  // debits: [],
  // credits: [],
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
  }
};

const actions = {
  removeCard ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        commit(CLEAR_DEFAULT_PAYMENT_METHOD);
        console.log('hai hai hai');
      }, 2000);
    });
  },

  addPaymentMethod ({ commit, dispatch }, fields) {
    return new Promise((resolve, reject) => {
      // const obj = {
      //   id: 123,
      //   merchant: 'Visa',
      //   lastFour: '1234'
      // };

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
