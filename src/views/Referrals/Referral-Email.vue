<template lang="html">
  <div class="referral-email col col-md-6">
    <h2>Refer by email</h2>
    <div class="content">
      <form @submit="submitReferralEmails">
        <p class="referral-email__text">
          Enter your friends' emails (separated by commas) and we'll invite
          them for you.
        </p>
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              v-model="emails"
              @change="updateEmailList"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <button type="submit" class="btn btn-block btn-green">
              Invite friends
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'referral-email',

  data () {
    return {
      emails: []
    };
  },

  methods: {
    updateEmailList () {

    },

    submitReferralEmails () {

    }
  }
};
</script>

<style lang="scss">
  .referral-email__text {
    min-height: 50px;
  }

  .referral-email > .content {
    min-height: 240px;
  }
</style>
