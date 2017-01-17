<template>
  <div id="app">
    <div> HAI </div>
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in"
    >
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  mounted () {
    this.$vuetify.init();
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
