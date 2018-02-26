<template lang="html">
  <div
    class="alert alert-info text-center"
    role="alert"
    data-alert-cookie="alert_new_user"
  >
    <span>
      <p><strong>
      Thanks for joining the waitlist!</strong></p>
      <p v-if="referralPartner">
        You've been referred by
        <strong>{{ referralPartner | capitalize }}!</strong>
      </p>
      <p>
      Watch for an email from the Storj Labs team notifying you when we begin activating new accounts. 
      Learn more about the pause on our <a href="https://blog.storj.io/post/169896892413/getting-from-petabytes-to-exabytes-the-road-ahead" target="_blank">blog.</a>
      Once your registration is finalized, you will receive one year of free service — up to 25GB of storage and bandwidth every month. 
      While you wait, follow us on Twitter at <a href="https://twitter.com/storjproject" target="_blank">@storjproject</a> or join <a href="https://storj.io/community.html" target="_blank">our community chat</a> for the latest updates from the Storj Labs team.       </p>
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
