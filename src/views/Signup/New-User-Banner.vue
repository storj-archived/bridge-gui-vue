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
        We are rearchitecting our network to scale from petabytes to exabytes. Because we are committed to supporting our current users, we are throttling user sign ups until we are ready for more traffic. 
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
