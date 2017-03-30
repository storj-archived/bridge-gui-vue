<template lang="html">
  <router-link :to="{ name: goTo }">
    <button class="btn btn-block btn-transparent">
      <span class="go-back">Go Back</span>
    </button>
  </router-link>
</template>

<script>
export default {
  name: 'sj-go-back-btn',

  props: {
    goTo: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
// TODO: Make the stupid Go Back have text-decoration none

</style>
