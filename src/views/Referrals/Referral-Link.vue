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
          <button class="btn btn-primary btn-block">
            Copy Link
          </button>
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
</style>
