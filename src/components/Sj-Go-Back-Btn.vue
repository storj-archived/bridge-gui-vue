<template lang="html">
  <b-button class="btn btn-block btn-transparent" @click="goBack">
    <span class="go-back">Go Back</span>
  </b-button>

</template>

<script>
export default {
  name: 'sj-go-back-btn',

  props: [ 'name', 'params' ],

  methods: {
    goBack () {
      this.$router.push({
        name: this.name,
        params: this.params
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// TODO: Make the stupid Go Back have text-decoration none

</style>
