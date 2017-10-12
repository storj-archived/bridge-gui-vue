<template lang="html">
  <span class="crypto-payment-btn">
    <b-button
      href="https://bitpay.com/cart/add?itemId=JoY55YbAiBvdiV8EZVTmAw"
      target="_blank"
      class="btn btn-payment">
        <img class="btn-payment-icon-bitcoin"
          :src="bitcoinIcon"
          alt="bitcoin"
        />
      <font class="btn-payment-text">bitcoin</font>
    </b-button>
  </span>
</template>

<script>
import bitcoinIcon from './../../static/img/icon-bitcoin.svg';

export default {
  name: 'sj-crypto-payment-btn',

  data () {
    return {
      bitcoinIcon
    };
  }
};
</script>

<style lang="scss">
.crypto-payment-btn {
  margin-top: 1.75rem;
}

.crypto-payment-btn .btn-payment {
  background: #fff;
  padding: 0.4em 0.4em;
  letter-spacing: 0;
  border-color: rgba(0, 0, 0, 0.10);
}

.crypto-payment-btn .btn-payment:hover {
  border-color: transparent;
}

.btn-payment-icon-bitcoin {
  width: 22px;
  height: 22px;
  margin-right: 0.3em;
}

.btn-payment-text {
  color: #0275d8;
}
</style>
