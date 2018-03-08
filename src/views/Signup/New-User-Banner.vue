<template lang="html">
  <div
    class="alert alert-info text-center"
    role="alert"
    data-alert-cookie="alert_new_user"
  >
    <span>
      <p v-if="referralPartner">
        You've been referred by
        <strong>{{ referralPartner | capitalize }}!</strong>
      </p>
      <p>
        Due to extreme demand, we are limiting new account activation as we build the next generation of our network. Creating an account will enroll you to be considered for testing on our existing network as well as access to the new network. You will receive an email shortly with further details.
      </p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'new-user-banner',

  props: {
    referralPartner: {
      type: String,
      default: ''
    }
  }
};
</script>
