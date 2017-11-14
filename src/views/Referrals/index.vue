<template lang="html">
  <section class="referrals">
    <div v-if="loading" class="row">
      <Sj-Loading></Sj-Loading>
    </div>

    <div v-else class="container justify-content-center">

      <Referral-Info></Referral-Info>

      <div class="row">
        <Referral-Email></Referral-Email>
        <Referral-Link :referralLink="referralLink"></Referral-Link>
      </div>

    </div>
  </section>
</template>

<script>
import SjLoading from '@/components/Sj-Loading';
import ReferralInfo from './Referral-Info';
import ReferralEmail from './Referral-Email';
import ReferralLink from './Referral-Link';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'referrals',

  components: { ReferralInfo, ReferralEmail, ReferralLink, SjLoading },

  created () {
    if (!this.referralLink) {
      this.getMarketing().then(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },

  data () {
    return {
      loading: true
    };
  },

  computed: {
    ...mapState({
      referralLink: state => state.marketing.referralLink
    })
  },

  methods: {
    ...mapActions([ 'getMarketing' ]) // this.getMarketing()
  }
};
</script>

<style lang="scss">
</style>
