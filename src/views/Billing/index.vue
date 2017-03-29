<template>
  <section class="billing">
    <div class="container billing-title">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="title pull-left">Billing</h1>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <Balance-Panel></Balance-Panel>
        <Usage-Panel></Usage-Panel>
      </div>
    </div>

    <Payment-Panel></Payment-Panel>

    <Transaction-List></Transaction-List>
  </section>
</template>

<script>
import BalancePanel from './components/balance-panel';
import PaymentPanel from './components/payment-panel';
import UsagePanel from './components/usage-panel';
import TransactionList from './components/transaction-list';

export default {
  name: 'billing',

  components: {
    BalancePanel,
    PaymentPanel,
    UsagePanel
  }
};
</script>

<style lang="sass">
</style>
