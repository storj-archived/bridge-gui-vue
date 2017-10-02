<template lang="html">
  <div class="crypto-payment-btn">
    <p>
      Add credit with
      <b-button 
        class="btn btn-payment"
      >
        <img class="btn-payment-icon-bitcoin"
          :src="storjIcon"
          alt="storj"
        />
        STORJ
      </b-button> 
      <b-button
        href="https://bitpay.com/cart/add?itemId=JoY55YbAiBvdiV8EZVTmAw"
        target="_blank"
        class="btn btn-payment">
          <img class="btn-payment-icon-bitcoin"
            :src="bitcoinIcon"
            alt="bitcoin"
          />
       BTC 
      </b-button>
    </p>
  </div>
</template>

<script>
import bitcoinIcon from './../../static/img/icon-bitcoin.svg';
import storjIcon from './../../static/img/logo-blue.svg';

export default {
  name: 'sj-crypto-payment-btn',

  data () {
    return {
      bitcoinIcon,
      storjIcon
    };
  }
};
</script>

<style lang="scss">
.crypto-payment-btn {
  margin-top: 1.75rem;
}

.crypto-payment-btn .btn-payment {
  color: #0e0e0e;
  background: #fff;
  padding: 0.6em 0.6em;
  letter-spacing: 0;
  border-color: rgba(0, 0, 0, 0.10);
}

.crypto-payment-btn .btn-payment:hover {
  border-color: transparent;
  background: #eee;
}

.btn-payment-icon-bitcoin {
  width: 22px;
  height: 22px;
  margin-right: 0.3em;
}
</style>
