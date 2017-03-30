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
export default {
  name: 'balance-panel',

  props: [ 'balance' ]
};
</script>

<style lang="scss">

.balance-panel > .content {
  min-height: 180px;
  max-height: 180px;
}
</style>
