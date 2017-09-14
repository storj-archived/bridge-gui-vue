<template lang="html">
  <span class="token-payment-btn">
    <b-button
      href="https://bitpay.com/cart/add?itemId=JoY55YbAiBvdiV8EZVTmAw"
      target="_blank"
      class="btn btn-payment">
        <img class="btn-payment-icon-storj-token"
          :src="storjTokenIcon"
          alt="storjToken"
        />
      <font color="#0275d8">STORJ</font>
    </b-button>
  </span>
</template>

<script>
import storjTokenIcon from './../../static/img/storj.png';

export default {
  name: 'sj-token-payment-btn',

  data () {
    return {
      storjTokenIcon
    };
  }
};
</script>

<style lang="scss">

.token-payment-btn {
  margin-top: 1.75rem;
}

.token-payment-btn .btn-payment {
  background: #fff;
  padding: 0.4em 0.4em;
  letter-spacing: 0;
  border-color: rgba(0, 0, 0, 0.10);
}

.token-payment-btn .btn-payment:hover {
  border-color: transparent;
}

.btn-payment-icon-storj-token {
  width: 22px;
  height: 22px;
  margin-right: 0.3em;
}
</style>
