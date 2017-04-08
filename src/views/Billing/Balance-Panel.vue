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

export default {
  name: 'balance-panel',

  computed: mapState({
    balance: state => state.billing.balance
  })
};
</script>

<style lang="scss">

.balance-panel > .content {
  min-height: 180px;
  max-height: 180px;
}
</style>
