<template>
  <section class="settings">
    <router-view
      class="settings-views"
      keep-alive
      transition
      transition-mode="out-in"
    >
    </router-view>

    <div v-if="loading" class="container">
      <div class="row">
        <Sj-Loading class="loading"></Sj-Loading>
      </div>
    </div>

    <div v-else class="container">
      <div class="row">
        <h1 class="container title float-left">Settings</h1>
      </div>

      <div class="row">
        <div class="content">
          <div class="col">
            <router-link :to="{ name: 'Password-Reset' }">
              <button class="btn btn-green btn-action">
                Reset Password
              </button>
            </router-link>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
export default {
  name: 'settings'
};
</script>

<style lang="scss" scoped>

</style>
