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
  usage: 0,
  storage: 2020,
  bandwidth: 123123
};

const mutations = {

};

const actions = {

};

export default {
  state,
  mutations,
  actions
};
