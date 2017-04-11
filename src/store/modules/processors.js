/* global Stripe */
/* eslint no-undef: ["error", { "typeof": false }] */

const state = {
  stripe: null
};

const mutations = {

};

const actions = {
  createStripeToken (opts) {
    return new Promise((resolve, reject) => {

      const { ccNumber, ccExp, cvv } = opts;
      const [ exp_month, exp_year ] = ccExp.value.split('/');

      Stripe.card.createToken({
        number: ccNumber.value,
        cvv: cvv.value,
        exp_month,
        exp_year
      }, (status, response) => {
        if (response.error) {
          return reject(new errors.InternalError(
            `Processing error: ${response.error.message}`
          ));
        }

        const token = response.id;

        return token;
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
