<template lang="html">
  <span class="token-payment-btn">
    <form class="token-payment-form" action="https://www.coinpayments.net/index.php" method="post">
    	<input type="hidden" name="cmd" value="_pay">
    	<input type="hidden" name="reset" value="1">
    	<input type="hidden" name="merchant" value="d8b86a9501771dee3e5068f652121536">
    	<input type="hidden" name="item_name" value="storj credit">
    	<input type="hidden" name="currency" value="USD">
    	<input type="hidden" name="amountf" value="5.00000000">
    	<input type="hidden" name="quantity" value="1">
    	<input type="hidden" name="allow_quantity" value="1">
    	<input type="hidden" name="want_shipping" value="0">
    	<input type="hidden" name="success_url" value="http://localhost:3001/dashboard/billing#">

      <b-button target="_blank" class="btn btn-payment">
        <img class="btn-payment-icon-storj-token" :src="storjTokenIcon" alt="STORJ token"/>
        <font class="btn-payment-text">STORJ</font>
      </b-button>
    </form>
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

.token-payment-form {
  display: inline;
  margin: 0;
}

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

.btn-payment-text {
  color: #0275d8;
}

</style>
