<template>
  <section class="billing container">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="title float-left">Billing</h1>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <Balance-Panel :balance="balance"></Balance-Panel>
        <Usage-Panel :bandwidth="bandwidth" :storage="storage"></Usage-Panel>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <AddCardForm v-if="hasPaymentInfo"></AddCardForm>
        <Payment-Panel v-else></Payment-Panel>
      </div>
    </div>

    <Transaction-List :transactions="transactions"></Transaction-List>
  </section>
</template>

<script>
import BalancePanel from '@/views/Billing/Balance-Panel';
import PaymentPanel from '@/views/Billing/Payment-Panel';
import UsagePanel from '@/views/Billing/Usage-Panel';
import TransactionList from '@/views/Billing/Transaction-List';
import AddCardForm from '@/views/Billing/Add-Card-Form';

export default {
  name: 'billing',

  components: {
    BalancePanel,
    PaymentPanel,
    UsagePanel,
    TransactionList,
    AddCardForm
  },

  data () {
    return {
      hasPaymentInfo: false,
      // dummy data for testing rendering,
      balance: '112312312.99',
      bandwidth: '12312',
      storage: '12312',
      transactions: [{
        id: 1,
        created: new Date(),
        description: 'so much transactions',
        amount: 100000
      }, {
        id: 2,
        created: new Date(),
        description: 'fwhehjehsjdjfdkl',
        amount: 12312312
      }]
    };
  }
};
</script>

<style lang="scss">
.mb0 {
  font-size: 40px;
}

.blue {
  letter-spacing: -2px;
}
</style>
