<template lang="html">
  <section class="usage-panel col col-sm-12 col-md-6">
    <h2 class="title">Usage This Month</h2>
    <div class="content">
      <div class="row">
        <div class="col col-xs-6">
          <div className="mb0">
            <p>Storage</p>
            <h4 class="mb0 blue unit-numbers">
              <b>{{ storage }}</b>
              <div class="text-muted unit-text">
                <div> / 25GB </div>
                <div>free</div>
              </div>
            </h4>
          </div>
        </div>

        <div class="col col-xs-6">
          <div>
            <p>Bandwidth</p>
            <h4 class="mb0 blue unit-numbers">
              <b>{{ bandwidth }}</b>
              <div class="text-muted unit-text">
                <div> / 25GB </div>
                <div>free</div>
              </div>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getSum, roundToGBAmount, getAverage } from '@/utils';

export default {
  name: 'usage-panel',

  computed: {
    ...mapState({
      debits: state => state.billing.debits
    }),

    storage () {
      if (this.debits.length <= 0) {
        return '0.00';
      }

      const storage = getSum(this.debits, 'storage');
      const avgStorage = getAverage(storage, this.debits.length);
      const roundStorage = roundToGBAmount(avgStorage);

      return roundStorage;
    },

    bandwidth () {
      if (this.debits.length <= 0) {
        return '0.00';
      }

      const bandwidth = getSum(this.debits, 'bandwidth');
      const avgBandwidth = getAverage(bandwidth, this.debits.length);
      const roundBandwidth = roundToGBAmount(avgBandwidth);

      return roundBandwidth;
    }
  }
};
</script>

<style lang="scss">
</style>
