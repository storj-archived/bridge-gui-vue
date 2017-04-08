<template>
  <section class="billing container">
    <div>
      <div class="container">
        <div class="row">
          <div class="col">
            <Sj-Loading class="loading"></Sj-Loading>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="title float-left">Billing</h1>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <Balance-Panel></Balance-Panel>
          <Usage-Panel></Usage-Panel>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <AddCardForm v-if="hasPaymentInfo"></AddCardForm>
          <Payment-Panel v-else></Payment-Panel>
        </div>
      </div>

      <Transaction-List :transactions="transactions"></Transaction-List>
    </div>
  </section>
</template>

<script>
import BalancePanel from '@/views/Billing/Balance-Panel';
import PaymentPanel from '@/views/Billing/Payment-Panel';
import UsagePanel from '@/views/Billing/Usage-Panel';
import TransactionList from '@/views/Billing/Transaction-List';
import AddCardForm from '@/views/Billing/Add-Card-Form';
import SjLoading from '@/components/Sj-Loading';

export default {
  name: 'billing',

  components: {
    BalancePanel,
    PaymentPanel,
    UsagePanel,
    TransactionList,
    AddCardForm,
    SjLoading
  },

  created () {

  },

  data () {
    return {
      loading: true,
      hasPaymentInfo: false,
      // dummy data for testing rendering,
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

<style lang="scss" scoped>
.mb0 {
  font-size: 40px;
}

.blue {
  letter-spacing: -2px;
}

.loading {
  margin-bottom: 3rem;
}
</style>
