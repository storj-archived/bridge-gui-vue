<template>
  <section class="container nav-non-auth">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
        <div class="row justify-content-center">
          <router-link :to="{ path: '/' }">
            <img src="static/img/logo-blue.svg" alt="Storj" class="logo" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'nav-authentication'
};
</script>

<style>
  .nav-non-auth .logo {
    margin: 3em auto;
    width: 200px;
  }
</style>
