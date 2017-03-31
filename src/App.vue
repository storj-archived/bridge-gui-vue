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
  height: 100%;
  width: 100%;
  background-color: #f9f9f9;
}

.modal-scroll-body {
  & > .modal-dialog {
    height: 100%;
    overflow-y: hidden;
    margin: -40px auto;
    top: 40px;
    padding: 40px 0;

    & > .modal-content {
      height: 100%;
      overflow: hidden;

      & > .modal-body {
        height: 100%;
        overflow-y: scroll;
        padding-bottom: 180px;
        margin-bottom: -180px;
        z-index: 1;
        position: relative;
      }

      & > .modal-footer {
        background: white;
        z-index: 2;
        position: relative;
      }
    }
  }
}
</style>
