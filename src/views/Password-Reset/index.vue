<template>
  <section class="container password-reset">
    <Nav-Authentication></Nav-Authentication>
    <div class="container auth">
      <div class="row justify-content-center">
        <div class="col col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12
        text-center">
          <Reset-Success v-if="success"></Reset-Success>

          <div v-else class="content">
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
                  @click.prevent="handleSubmit"
                  class="btn btn-block btn-green submit"
                >
                  Reset My Password
                </button>
              </div>

              <div v-show="error" class="text-danger">
                <div class="spacer20"></div>
                {{ error }}
                <div class="spacer20"></div>
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
import NavAuthentication from '@/components/Nav-Authentication';
import ResetSuccess from './Reset-Success';
import { mapActions } from 'vuex';
import { sha256 } from '@/utils';

export default {
  name: 'password-reset',

  components: { NavAuthentication, ResetSuccess },

  data () {
    return {
      email: '',
      password: '',
      error: '',
      success: false
    };
  },

  methods: {
    ...mapActions([ 'resetPassword' ]),

    handleSubmit () {
      this.resetPassword({ email: this.email, password: sha256(this.password) })
        .then(() => {
          this.success = true;
        })
        .catch((err) => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style lang="scss">
</style>
