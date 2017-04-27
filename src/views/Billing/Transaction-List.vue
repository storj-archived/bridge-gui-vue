<template lang="html">
  <section class="transaction-list container">
    <div class="row">
      <div class="col">
        <h2 class="title">Billing History</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="table-response content">

          <div v-if="!transactions.length" class="text-center no-history">
            No billing history
          </div>

          <table v-else class="table table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in transactions"
                :key="transaction.id"
                class="clickable-row"
              >
                <td>{{ transaction.created | dateFormat('long') }}</td>
                <td>
                  <b>{{ transaction.type | capitalize }}</b>
                  {{ transaction.description | capitalize }}
                </td>
                <td :class="{ 'text-success': transaction.amount <= 0 }">
                  {{ transaction.amount | prettifyAmount | addDollarSign }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { roundToGBAmount, promoCodes, formatAmount } from '@/utils';
import moment from 'moment';

export default {
  name: 'transaction-list',

  created () {
    if (this.debits.length > 0 || this.credits.length > 0) {
      return this.calculateTransactions();
    }
    return true;
  },

  computed: {
    ...mapState({
      credits: state => state.billing.credits,
      debits: state => state.billing.debits
    })
  },

  data () {
    return {
      transactions: []
    };
  },

  methods: {
    calculateTransactions () {
      let temp = [];

      const convertedCredits = this.credits
        .filter((c) => !c.promo_amount)
        .map((credit) => {
          const transaction = {...credit};
          transaction.amount = -credit.paid_amount;
          transaction.type = `${credit.type} payment`;
          transaction.description = `- Thank you! 🐶`;
          transaction.timestamp = moment.utc(credit.created).valueOf();
          return transaction;
        });

      const convertedDebits = this.debits.map((debit) => {
        const transaction = {...debit};
        let amountUsed;

        if (debit.type === 'storage') {
          amountUsed = `: ${roundToGBAmount(debit.storage)} GBh`;
        } else if (debit.type === 'bandwidth') {
          amountUsed = `: ${roundToGBAmount(debit.bandwidth, 'bytes')} GB`;
        }

        transaction.amount = debit.amount;
        transaction.type = debit.type;
        transaction.description = debit.type === 'adjustment'
          ? `: ${formatAmount(debit.amount)}`
          : amountUsed;
        transaction.timestamp = Date.parse(debit.created);
        return transaction;
      });

      const convertedPromoCredits = this.credits
        .filter((c) => c.promo_amount)
        .map((credit) => {
          const transaction = {...credit};
          transaction.amount = -credit.promo_amount;
          transaction.type = `${promoCodes(credit.promo_code)} Credit`;
          transaction.description = '';
          transaction.timestamp = moment.utc(credit.created).valueOf();
          return transaction;
        });

      temp = [
        ...convertedCredits,
        ...convertedDebits,
        ...convertedPromoCredits
      ];

      this.transactions = temp.sort((t1, t2) => (t2.timestamp - t1.timestamp));
    }
  }
};
</script>

<style lang="scss">
  .transaction-list table thead th {
    border-top: none;
    border-bottom: none;
  }

  .transaction-list .table td, .transaction-list .table th {
    padding: 1.75rem;
    padding-left: 4rem;
  }

  .transaction-list .content {
    padding: 0;
    margin-bottom: 0;
  }

  .transaction-list .no-history {
    padding: 3rem 0;
  }
</style>
