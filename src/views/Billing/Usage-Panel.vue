<template lang="html">
  <section class="usage-panel col col-xs-12 col-sm-6">
    <h2 class="title">Usage This Month</h2>
    <div class="content">
      <div class="row">
        <div class="col col-xs-6">
          <div>
            <h4>Storage</h4>
            <span class="mb0 blue">{{ storage || '0.00' }}</span>
            <div class="text-muted unit-text">
              <div> / 25GB </div>
              <div>free</div>
            </div>
          </div>
        </div>

        <div class="col col-xs-6">
          <div>
            <h4>Bandwidth</h4>
            <span class="mb0 blue">{{ bandwidth || '0.00' }}</span>
            <div class="text-muted unit-text">
              <div> / 25GB </div>
              <div>free</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'usage-panel',

  computed: mapState({
    storage: state => state.billing.storage,
    bandwidth: state => state.billing.bandwidth
  })
};
</script>

<style lang="scss">
.unit-text {
  font-size: 15px;
  padding-left: 10px;
  display: inline-block;
}

.usage-panel > .content {
  min-height: 180px;
  max-height: 180px;
}

</style>
