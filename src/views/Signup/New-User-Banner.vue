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
        As we build the network, we’d love to learn from you.  Create an account and help us test the new network.
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
