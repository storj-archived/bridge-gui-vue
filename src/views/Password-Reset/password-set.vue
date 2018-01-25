<template lang="html">
  <section class="container login">
    <Nav-Authentication></Nav-Authentication>
    <div class="container auth">
      <div class="row justify-content-center">

        <h2 v-if="attemptLogin" class="loading"> Loading . . . </h2>

        <div v-else
          class="col col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12
          text-center"
        >
          <div class="content">
            <!-- header -->
            <h1 class="title text-center form-group">
              Login
            </h1>

            <form>

              <div class="form-group">
                <div v-show="errors.password" class="input-error">
                  {{ errors.password }}
                </div>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  v-model="password"
                />
              </div>

              <div class="form-group">
                <div v-show="errors.password" class="input-error">
                  {{ errors.password }}
                </div>
                <input
                  type="password"
                  class="form-control"
                  name="passwordConfirm"
                  placeholder="Password Confirm"
                  v-model="passwordConfirm"
                />
              </div>

              <div class="form-group">
                <button
                  :disabled="submitting"
                  type="submit"
                  class="btn btn-block btn-green"
                  @click.prevent="handleSubmit"
                >
                  <span v-show="!submitting">Login</span>
                  <span v-show="submitting">Submitting . . .</span>
                </button>
              </div>
            </form>

            <div v-show="errors.login" class="login-error input-error">
              {{ errors.login }}
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'password-set',
    data () {
      return {
       password: '',
       passwordConfirm: ''
      }
    },
    methods: {
      handleSubmit () {
        this.$store.dispatch('confirmPasswordReset', this.passwordConfirm)
      }
    }
  }
</script>
<style></style>

