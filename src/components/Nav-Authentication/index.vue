<template>
  <section class="container auth">
    <div class="row">
      <div class="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
        <div class="row text-center">
          <a href="/">
            <img src="static/img/logo-blue.svg" alt="Storj" class="logo" />
          </a>
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
  .auth .logo {
    margin: 3em auto;
    width: 200px;
  }

  .auth .content {
    padding: 2em 3em;
  }

  .auth .forgot-password {
    display: block;
    margin-top: 8px;
  }

  .auth .password .title {
    margin-bottom: 0.6em;
  }

  .auth .password .content p {
    margin-bottom: 2.5em;
  }

  .auth .checkbox label {
    padding-left: 24px;
  }
</style>
