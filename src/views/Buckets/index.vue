<template>
  <section class="buckets">
    <router-view
      class="buckets-views"
      keep-alive
      transition
      transition-mode="out-in"
    >
    <!-- CREATE BUCKET, BUCKET-SETTINGS, BUCKET-FILES -->
    </router-view>
  </section>
</template>

<script>
export default {
  name: 'buckets',

  data () {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
