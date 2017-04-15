<template lang="html">
  <section class="referrals container">
    <div class="row justify-content-center">

      <Referral-Info></Referral-Info>

      <div class="row">
        <Referral-Email></Referral-Email>
        <Referral-Link :referralLink="referralLink"></Referral-Link>
      </div>

    </div>
  </section>
</template>

<script>
import ReferralInfo from './Referral-Info';
import ReferralEmail from './Referral-Email';
import ReferralLink from './Referral-Link';
import { mapState } from 'vuex';

export default {
  name: 'referrals',

  components: { ReferralInfo, ReferralEmail, ReferralLink },

  data () {
    return {
    };
  },

  computed: {
    ...mapState({
      referralLink: state => state.marketing.referralLink
    })
  }
};
</script>

<style lang="scss">
</style>
