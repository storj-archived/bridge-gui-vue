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
                  <b-form-fieldset label="Card Number">
                    <b-form-input
                      class="form-control"
                      placeholder="Credit card number"
                      name="cc-number"
                      type="text"
                      v-model="fields.ccNumber.value"
                      @keyup="isValidCCNumber"
                    ></b-form-input>
                    <small v-show="fields.ccNumber.error" class="has-error">
                      {{ fields.ccNumber.error }}
                    </small>
                  </b-form-fieldset>
                </div>
                <div class="col">
                  <b-form-fieldset label="CVV">
                    <b-form-input
                      class="form-control"
                      placeholder="CVV"
                      name="cc-cvc"
                      type="text"
                      autoComplete="cc-csc"
                      v-model="fields.cvv.value"
                      @keyup="isValidCVV"
                    ></b-form-input>
                    <small v-show="fields.cvv.error" class="has-error">
                      {{ fields.cvv.error }}
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
                    @keyup="isValidCCExp"
                  ></b-form-input>
                  <small v-show="fields.ccExp.error" class="has-error">
                    {{ fields.ccExp.error }}
                  </small>
                </b-form-fieldset>
              </div>
              <div class="col">
                <b-form-fieldset label="Billing Zip Code">
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
  validateCVV,
  validateCCExp
} from '@/utils/validation';
import { mapActions } from 'vuex';
import { debounce } from 'lodash';
const debounceTime = 800;

export default {
  name: 'add-card-form',

  components: { SjCryptoPaymentBtn },

  data () {
    return {
      fields: {
        ccNumber: { value: '', error: '' },
        cvv: { value: '', error: '' },
        ccExp: { value: '', error: '' },
        ccName: { value: '', error: '' },
        zip: { value: '' }
      },
      submitting: false,
      submitError: '',
      okToSubmit: false
    };
  },

  methods: {
    ...mapActions([ 'addPaymentMethod' ]),

    isValidCCNumber: debounce(function () {
      this.fields.ccNumber = validateCCNumber(this.fields.ccNumber);
      this.validateForm();
    }, debounceTime),

    isValidCVV: debounce(function () {
      this.fields.cvv = validateCVV(this.fields.cvv);
      this.validateForm();
    }, debounceTime),

    isValidCCExp: debounce(function () {
      this.fields.ccExp = validateCCExp(this.fields.ccExp);
      this.validateForm();
    }, debounceTime),

    validateForm () {
      this.okToSubmit = validateCCForm(this.fields);
    },

    handleSubmit () {
      this.submitting = true;
      this.addPaymentMethod(this.fields, 'stripe')
        .catch((err) => {
          this.submitting = false;
          this.okToSubmit = false;
          this.submitError = err.message;
        });
    }
  }
};
</script>

<style lang="scss">
</style>
