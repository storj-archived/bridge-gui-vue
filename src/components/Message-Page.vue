<template lang="html">
  <section class="container auth">
    <div class="content form-horizontal">
      <h1 class="title text-center form-group">{{ title }}</h1>
      <div class="row">
        <p class="col text-center" v-html="message"></p>
      </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'message-page',

  props: {
    title: String,
    message: String
  }
};
</script>

<style lang="scss">
</style>
