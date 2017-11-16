<template>
  <section class="billing">
    <div v-if="loading" class="container">
      <div class="row">
        <Sj-Loading class="loading"></Sj-Loading>
      </div>
    </div>

    <div v-else class="container">
      <div class="row">
        <h1 class="container title float-left">Billing</h1>
      </div>

      <div class="row">
        <Balance-Panel></Balance-Panel>
        <Usage-Panel></Usage-Panel>
      </div>

      <div class="row">
        <Payment-Panel v-if="hasPaymentMethod"></Payment-Panel>
        <Add-Card-Form v-else></Add-Card-Form>
      </div>
      
      <div class="row">
        <Transaction-List></Transaction-List>
      </div>
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
import { mapState, mapActions } from 'vuex';
import Promise from 'bluebird';
import { isEmpty } from 'lodash';

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
    this.loadBillingData();
  },

  data () {
    return {
      loading: true
    };
  },

  computed: mapState({
    hasPaymentMethod: state => !isEmpty(state.billing.defaultPaymentMethod),
    retrieved: state => state.billing.retrieved,
    period: state => state.billing.nextBillingPeriod,
    wallets: state => state.billing.wallets
  }),

  methods: {
    ...mapActions([ 'getCredits', 'getDebits', 'getDefaultPP', 'getWallets' ]),

    loadBillingData () {
      const self = this;
      if (!this.retrieved) {
        return self.getDefaultPP().then(() => {
          Promise.join(
            self.getCredits(),
            self.getDebits(),
            self.getWallets(),
            function () {
              self.loading = false;
              self.$store.commit('MARK_RETRIEVED');
            }
          );
        });
      }

      self.loading = false;
    }
  }
};
</script>

<style lang="scss">
.unit-numbers {
  font-size: 40px;
  letter-spacing: -2px;
}

.unit-text {
  font-size: 15px;
  padding-left: 10px;
  letter-spacing: 0;
  display: inline-block;
}

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
