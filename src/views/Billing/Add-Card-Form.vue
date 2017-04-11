<template lang="html">
  <section class="add-card-form container">
    <div class="row">
      <div class="col">
        <h2 class="title float-left">Add Credit Card</h2>
        <Sj-Crypto-Payment-Btn class="float-right"></Sj-Crypto-Payment-Btn>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="content">
          <form>
            <input type="hidden" name="utf8" value="✓">
            <input type="hidden" name="authenticity_token" value="">

              <legend>Credit Card Details</legend>
              <div class="row">
                <div class="col">
                  <b-form-fieldset>
                    <b-form-input
                      class="form-control"
                      placeholder="Credit card number"
                      name="cc-number"
                      type="text"
                      v-model="fields.ccNumber.value"
                      @keyup="validateCCNumber"
                    ></b-form-input>
                    <small v-show="fields.ccNumber.error" class="has-error">
                      {{ fields.ccNumber.error }}
                    </small>
                  </b-form-fieldset>
                </div>
                <div class="col">
                  <b-form-fieldset>
                    <b-form-input
                      class="form-control"
                      placeholder="CVV"
                      name="cc-cvc"
                      type="text"
                      autoComplete="cc-csc"
                      v-model="fields.cvv.value"
                      @keyup="validateCVV"
                    ></b-form-input>
                    <small v-show="fields.cvv.error" class="has-error">
                      {{ fields.cvv.error }}
                    </small>
                  </b-form-fieldset>
                </div>
              </div>
              <div class="row">
                <div class="col">
                <b-form-fieldset>
                  <b-form-input
                    class="form-control"
                    placeholder="Expires MM / YYYY"
                    name="cc-exp"
                    type="text"
                    v-model="fields.ccExp.value"
                    @keyup="validateCCExp"
                  ></b-form-input>
                  <small v-show="fields.ccExp.error" class="has-error">
                    {{ fields.ccExp.error }}
                  </small>
                </b-form-fieldset>
              </div>
              <div class="col">
                <b-form-fieldset>
                  <b-form-input
                    class="form-control"
                    placeholder="Please enter a name for this credit card"
                    type="text"
                    name="cc-name"
                    v-model="fields.ccName.value"
                  ></b-form-input>
                </b-form-fieldset>
              </div>
            </div>

            <div class="spacer20"></div>

            <div class="row">
              <div class="col">
                <button
                  :disabled="!okToSubmit || submitting"
                  class="btn btn-block btn-green"
                  type="submit"
                  @click.prevent="handleSubmit"
                >
                  <span v-show="!submitting">Save Credit Card</span>
                  <span v-show="submitting">Submitting . . .</span>
                </button>
                <div v-show="submitError" class="has-error help-block">
                  {{ submitError }}
                </div>
              </div>
            </div>

            <div class="spacer10"></div>

          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SjCryptoPaymentBtn from '@/components/Sj-Crypto-Payment-Btn';
import { mapActions } from 'vuex';
import { debounce } from 'lodash';
const debounceTime = 800;

export default {
  name: 'add-card-form',

  components: { SjCryptoPaymentBtn },

  data () {
    return {
      fields: {
        ccNumber: {
          value: '',
          error: ''
        },
        cvv: {
          value: '',
          error: ''
        },
        ccExp: {
          value: '',
          error: ''
        },
        ccName: {
          value: '',
          error: ''
        }
      },
      submitting: false,
      submitError: '',
      okToSubmit: false
    };
  },

  methods: {
    ...mapActions([ 'addPaymentMethod' ]),

    validateCCNumber: debounce(function () {
      const { ccNumber } = this.fields;
      ccNumber.error = '';

      // Validation regexes
      const visa = /^4[0-9]{12}(?:[0-9]{3})?$/.test(ccNumber.value);
      const mastercard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(ccNumber.value);
      const amex = /^3[47][0-9]{13}$/.test(ccNumber.value);
      const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(ccNumber.value);
      const jcb = /^(?:2131|1800|35\d{3})\d{11}$/.test(ccNumber.value);
      const dinersclub = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(ccNumber.value);

      if (!ccNumber.value) {
        ccNumber.error = 'No credit card number provided';
      }

      if (!visa && !mastercard && !amex && !discover && !jcb && !dinersclub) {
        ccNumber.error = 'Enter a valid credit card number';
      }

      this.validateForm();
    }, debounceTime),

    validateCVV: debounce(function () {
      const { cvv } = this.fields;
      const cvvIsValid = /^([0-9]{3,4})$/.test(cvv.value);
      cvv.error = '';

      if (!cvv.value) {
        cvv.error = 'No CVV number provided';
      }

      if (!cvvIsValid) {
        cvv.error = 'Please enter a valid CVV';
      }

      this.validateForm();
    }, debounceTime),

    validateCCExp: debounce(function () {
      const { ccExp } = this.fields;
      const ccExpIsValidYear = /^((0[1-9])|(1[0-2]))\/((2017)|(20[1-4][0-9]))$/.test(ccExp.value);
      ccExp.error = '';

      if (!ccExp.value) {
        ccExp.error = 'Enter an expiration date';
      }

      if (!ccExpIsValidYear) {
        ccExp.error = 'Please enter a valid expiration date (MM/YYYY)';
      }

      this.validateForm();
    }, debounceTime),

    validateForm () {
      const { ccNumber, cvv, ccExp } = this.fields;
      this.submitError = '';

      if (cvv.error || ccExp.error || ccNumber.error || !cvv.value || !ccExp.value || !ccNumber.value) {
        this.okToSubmit = false;
      } else {
        this.okToSubmit = true;
      }
    },

    handleSubmit () {
      const { ccNumber, cvv, ccExp } = this.fields;

      if (!ccNumber.value && !cvv.value && !ccExp.value) {
        this.submitError = 'Please fill out all Credit Card Details';
        setTimeout(() => {
          this.submitError = '';
        }, 2000);
        return;
      }

      if (!this.okToSubmit) {
        return console.log('not ok');
      }
    }
  }
};
</script>

<style lang="scss">
</style>
