<template>
  <section id="main">
    <!--
      Main View.
      Anything here _not_ in <router-view> will always show up
    -->
    <router-view
      class="views"
      keep-alive
      transition
      transition-mode="out-in"
    >
    </router-view>
  </section>
</template>

<script>
export default {
  name: 'app',

  components: {
  },

  mounted () {
  }
};
</script>

<style lang="scss" src="@/theme/styles.scss"></style>

<style lang="scss">
#main {
  font-family: 'Avenir Next LT Pro Regular';
  background-color: #f9f9f9;
}
</style>
