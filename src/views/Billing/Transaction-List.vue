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
          <table class="table table-hover">
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
                <td>{{ transaction.created }}</td>
                <td>{{ transaction.description }}</td>
                <td>{{ transaction.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'transaction-list',

  props: [ 'transactions' ]
};
</script>

<style lang="scss">
</style>
