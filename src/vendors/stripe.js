/* global Stripe */
/* eslint no-undef: ["error", { "typeof": false }] */

import errors from 'storj-service-error-types';
import Promise from 'bluebird';

Stripe.setPublishableKey(process.env.STRIPE_PUBLISHABLE_KEY);
console.log('stripe publishable key: ', process.env.STRIPE_PUBLISHABLE_KEY);

export const createStripeToken = function (opts) {
  return new Promise((resolve, reject) => {
    const { ccNumber, ccExp, cvc, zip } = opts;

    Stripe.card.createToken({
      number: ccNumber.value,
      cvc: cvc.value,
      exp: ccExp.value,
      address_zip: zip.value
    }, (status, response) => {
      if (response.error) {
        console.error('CREATE STRIPE TOKEN ERR', response.error);
        return reject(new errors.InternalError(
          `Processing error: ${response.error.message}`
        ));
      }

      const token = response.id;
      return resolve(token);
    });
  });
};
