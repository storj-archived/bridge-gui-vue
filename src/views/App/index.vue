<template>
  <section id="main">
    <!-- Main View. Anything here _not_ in <router-view> will always show up -->
    <div> HAI </div>
    <router-view
      class="view"
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

<style lang="scss" src="./../../theme/bootstrap.overrides.scss"></style>
<style lang="scss" src="./../../theme/theme.scss"></style>
<style lang="scss" src="./../../theme/shame.scss"></style>
<style lang="scss">
#main {
  height: 100%;
  width: 100%;
}

.view {
  height: 50%;
  width: 50%s
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
