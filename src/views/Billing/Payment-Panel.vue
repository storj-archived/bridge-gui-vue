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
              <button
                type="submit"
                name="button"
                @click="removeCard"
                class="btn btn-action btn-red"
              >
                Remove Card
              </button>
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

  components: { SjCryptoPaymentBtn }
};
</script>

<style lang="scss">
</style>
