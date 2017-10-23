<template lang="html">
  <section class="add-card-form container">
    <div class="row">
      <div class="col">
        <h2 class="title float-left">Add Credit Card</h2>

        <span class="float-right">
          <Sj-Crypto-Payment-Btn></Sj-Crypto-Payment-Btn>
        </span>
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
                  <b-form-fieldset label="Card Number">
                    <b-form-input
                      class="form-control"
                      placeholder="Credit card number"
                      name="cc-number"
                      type="text"
                      v-model="fields.ccNumber.value"
                      @blur="isValidCCNumber"
                    ></b-form-input>
                    <small v-show="fields.ccNumber.error" class="has-error">
                      {{ fields.ccNumber.error }}
                    </small>
                  </b-form-fieldset>
                </div>
                <div class="col">
                  <b-form-fieldset label="CVC">
                    <b-form-input
                      class="form-control"
                      placeholder="CVC"
                      name="cc-cvc"
                      type="text"
                      v-model="fields.cvc.value"
                      @blur="isValidCVC"
                    ></b-form-input>
                    <small v-show="fields.cvc.error" class="has-error">
                      {{ fields.cvc.error }}
                    </small>
                  </b-form-fieldset>
                </div>
              </div>
              <div class="row">
                <div class="col">
                <b-form-fieldset label="Expiration Date (MM/YY)">
                  <b-form-input
                    class="form-control"
                    placeholder="MM/YY"
                    name="cc-exp"
                    type="text"
                    v-model="fields.ccExp.value"
                    @blur="isValidCCExp"
                  ></b-form-input>
                  <small v-show="fields.ccExp.error" class="has-error">
                    {{ fields.ccExp.error }}
                  </small>
                </b-form-fieldset>
              </div>
              <div class="col">
                <b-form-fieldset label="Zip / Postal Code">
                  <b-form-input
                    class="form-control"
                    placeholder="Billing zip code"
                    type="text"
                    name="zip-code"
                    v-model="fields.zip.value"
                    @keyup="validateForm"
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
import {
  validateCCNumber,
  validateCCForm,
  validateCVC,
  validateCCExp
} from '@/utils/validation';
import { mapActions } from 'vuex';

export default {
  name: 'add-card-form',

  components: { SjCryptoPaymentBtn },

  data () {
    return {
      fields: {
        ccNumber: { value: '', error: '' },
        cvc: { value: '', error: '' },
        ccExp: { value: '', error: '' },
        ccName: { value: '', error: '' },
        zip: { value: '' }
      },
      processor: {
        name: 'stripe',
        default: true
      }, // NB: Allows for different processors later
      submitting: false,
      submitError: '',
      okToSubmit: false
    };
  },

  methods: {
    ...mapActions([ 'addPaymentMethod' ]),

    isValidCCNumber () {
      this.fields.ccNumber = validateCCNumber(this.fields.ccNumber);
      this.validateForm();
    },

    isValidCVC () {
      this.fields.cvc = validateCVC(this.fields.cvc);
      this.validateForm();
    },

    isValidCCExp () {
      this.fields.ccExp = validateCCExp(this.fields.ccExp);
      this.validateForm();
    },

    validateForm () {
      this.okToSubmit = validateCCForm(this.fields);
    },

    handleSubmit () {
      this.submitting = true;
      return this.addPaymentMethod({ fields: this.fields, processor: this.processor })
        .catch((err) => {
          this.okToSubmit = true;
          this.submitting = false;
          this.submitError = err.message;
        });
    }
  }
};
</script>

<style lang="scss">
</style>
