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
                      v-model="fields.ccNumber"
                    ></b-form-input>
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
                      v-model="fields.cvv"
                    ></b-form-input>
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
                    v-model="fields.ccExp"
                  ></b-form-input>
                </b-form-fieldset>
              </div>
              <div class="col">
                <b-form-fieldset>
                  <b-form-input
                    class="form-control"
                    placeholder="Please enter a name for this credit card"
                    type="text"
                    name="cc-name"
                    v-model="fields.ccName"
                  ></b-form-input>
                </b-form-fieldset>
              </div>
            </div>

            <div class="spacer20"></div>

            <div class="row">
              <div class="col">
                <button
                  class="btn btn-block btn-green"
                  type="submit"
                  name="submit"
                  @click="submitCreditCard"
                >
                  Save Credit Card
                </button>
              </div>
            </div>

            <div class="spcaer10"></div>

          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SjCryptoPaymentBtn from '@/components/Sj-Crypto-Payment-Btn';

export default {
  name: 'add-card-form',

  components: { SjCryptoPaymentBtn },

  data () {
    return {
      fields: {
        ccNumber: null
      }
    };
  }
};
</script>

<style lang="scss">
</style>
