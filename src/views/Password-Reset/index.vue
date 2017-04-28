<template>
  <section class="container password-reset">
    <Nav-Authentication></Nav-Authentication>
    <div class="container auth">
      <div class="row justify-content-center">
        <div class="col col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12
        text-center">
          <div class="content">
            <h1 class="title text-center form-group">
              Forgot your password?
            </h1>

            <form>

              <p class="form-group">
                Enter your email address and a new password below, and we'll send you instructions on how to complete your password reset.
              </p>

              <div class="form-group">
                <input
                  type="email"
                  class="form-control email"
                  name="email"
                  placeholder="Email Address"
                  v-model="email"
                />
              </div>

              <div class="form-group">
                <input
                  type="password"
                  class="form-control password"
                  name="password"
                  placeholder="Password"
                  v-model="password"
                />
              </div>

              <div class="form-group">
                <button
                  type="submit"
                  @click.prevent="submitPasswordReset"
                  class="btn btn-block btn-green submit"
                >
                  Reset My Password
                </button>
              </div>

              <div v-if="error">
                <span class="text-danger">{{ error }}</span>
              </div>

            </form>

            <p>
              Go back to
              <router-link :to="{ name: 'Login' }">Login</router-link>
            </p>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavAuthentication from '@/components/Nav-Authentication.vue';

export default {
  name: 'password-reset',

  components: { NavAuthentication },

  data () {
    return {
      email: '',
      password: '',
      error: ''
    };
  },

  methods: {
    submitPasswordReset () {

    }
  }
};
</script>

<style lang="sass">
</style>
