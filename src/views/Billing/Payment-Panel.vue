<template lang="html">
  <section class="payment-panel container">
    <div class="row">
      <div class="col">
        <h2 class="float-left title">Default Payment Method</h2>
        <Sj-Token-Payment-Btn class="float-right"></Sj-Token-Payment-Btn>
        <Sj-Crypto-Payment-Btn class="float-right"></Sj-Crypto-Payment-Btn>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="content">
          <div class="row">
            <div class="col">
              <p class="text-muted">Merchant</p>
              <h2>{{ merchant }}</h2>
            </div>
            <div class="col">
              <p class="text-muted">Card Number</p>
              <h2>**** **** **** {{ lastFour }}</h2>
            </div>
            <div class="col">
              <b-button
                :disabled="submitting"
                type="submit"
                @click.prevent="handleClick"
                class="float-right remove-card-btn"
              >
                <span v-show="!submitting">Remove Card</span>
                <span v-show="submitting">Removing . . .</span>
              </b-button>
            </div>
          </div>
          <div class="row">
            <div class="spacer20"></div>
            <div class="col text-muted">
              Note: Your billing date is the {{ billingDate | dateSuffix }}
            </div>
          </div>
          <div v-show="error" class="row">
            <div class="spacer20"></div>
            <div class="col has-error">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SjCryptoPaymentBtn from '@/components/Sj-Crypto-Payment-Btn';
import SjTokenPaymentBtn from '@/components/Sj-Token-Payment-Btn';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'payment-panel',

  components: { SjCryptoPaymentBtn, SjTokenPaymentBtn },

  data () {
    return {
      submitting: false,
      error: ''
    };
  },

  computed: mapState({
    merchant: ({ billing }) => billing.defaultPaymentMethod.merchant,
    lastFour: ({ billing }) => billing.defaultPaymentMethod.lastFour,
    billingDate: ({ billing }) => billing.billingDate
  }),

  methods: {
    ...mapActions([ 'removePaymentMethod' ]),

    handleClick () {
      this.error = '';
      this.submitting = true;

      return this.removePaymentMethod()
        .then(() => {
          this.submitting = false;
        })
        .catch((err) => {
          this.error = err.message;
          this.submitting = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
  .remove-card-btn {
    margin-top: 8px;
    padding: 12px 35px 10px;
    color: #fa6e50;
    border-color: #fa6e50;
    border-radius: 3px;
    border-width: 2px;
  }

  .remove-card-btn:hover {
    color: #fff;
    background: #fa6e50;
    border-color: #fa6e50;
  }
</style>
