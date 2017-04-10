<template lang="html">
  <section class="balance-panel col col-sm-6">
    <h2 class="title">Your Balance</h2>
    <div class="content">
      <div class="row">
        <div class="col">
          <p class="text-muted">Current Balance</p>
          <h2 class="mb0 blue">
            <b>${{ balance || '0.00' }}</b>
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getSum } from '@/utils';

export default {
  name: 'balance-panel',

  computed: mapState({
    credits: state => state.billing.credits,
    debits: state => state.billing.debits
  }),

  data () {
    return {
      balance: 0
    };
  },

  created () {
    return this.calculateBalance();
  },

  methods: {
    calculateBalance () {
      console.log('calculateBalance', this.credits, this.debits);
      const debitSum = this.getSum(this.debits, 'amount');
      const promoCreditSum = this.getSum(this.credits, 'promo_amountl');
      const paidCreditSum = this.getSum(this.credits, 'paid_amount');
      const creditSum = paidCreditSum + promoCreditSum;
      const balance = debitSum - creditSum;
      return balance;
    }
  }
};
</script>

<style lang="scss">

.balance-panel > .content {
  min-height: 180px;
  max-height: 180px;
}
</style>
