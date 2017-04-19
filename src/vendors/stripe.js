/* global Stripe */
/* eslint no-undef: ["error", { "typeof": false }] */

import errors from 'storj-service-error-types';
import env from '../../.env.js';

const STRIPE_PUBLISHABLE_KEY = process.env.NODE_ENV === 'development' ? env.STRIPE_PUBLISHABLE_KEY : process.env.STRIPE_PUBLISHABLE_KEY;

Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);

export const createStripeToken = function (opts) {
  return new Promise((resolve, reject) => {
    const { ccNumber, ccExp, cvc } = opts;

    Stripe.card.createToken({
      number: ccNumber.value,
      cvc: cvc.value,
      exp: ccExp.value
    }, (status, response) => {
      if (response.error) {
        console.log('err', response.error);
        return reject(new errors.InternalError(
          `Processing error: ${response.error.message}`
        ));
      }

      console.log('response', response);
      const token = response.id;

      return resolve(token);
    });
  });
};
