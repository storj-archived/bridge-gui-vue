<template lang="html">
  <section class="payment-panel container">
    <div class="row">
      <div class="col">
        <h2 class="float-left title">Default Payment Method</h2>
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
                type="submit"
                @click="removeCard"
                class="float-right remove-card-btn"
              >
                Remove Card
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SjCryptoPaymentBtn from '@/components/Sj-Crypto-Payment-Btn';

export default {
  name: 'payment-panel',

  components: { SjCryptoPaymentBtn },

  data () {
    return {
      merchant: '',
      lastFour: '0000'
    };
  },

  methods: {
    removeCard () {

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
