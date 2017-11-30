<template lang="html">
  <div class="referral-link col col-xs-12 col-md-6">
    <h2>Share your link</h2>
    <div class="content">
      <p class="referral-link__text">
        Copy your personal referral link and share it with your friends.
      </p>
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control"
            :value="referralLink"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button
            v-clipboard="getUrl"
            class="btn btn-primary btn-block"
            @success="handleSuccess"
          >
            Copy Link
          </button>
          <span v-show="copied" class="float-right copied">Copied!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'referral-link',

  props: {
    referralLink: {
      type: String
    }
  },

  data () {
    return {
      type: 'referralLink',
      copied: false
    };
  },

  methods: {
    getUrl () {
      const url = encodeURI(`app.storj.io/signup?referralLink=${this.props.referralLink}`);
      console.log('URL: ', url);
      return url;
    },

    handleSuccess () {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
  .referral-link__text {
    min-height: 50px;
  }

  .referral-link > .content {
    min-height: 260px;
  }

  .referral-link > .content button {
    margin-top: 20px;
  }

  .copied {
    color: red;
  }
</style>
