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
        Create an account and we’ll send you an activation email when the network is ready for your data. 
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
