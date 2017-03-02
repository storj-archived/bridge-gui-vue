<template lang="html">
  <section class="login">
    <Nav-Authentication></Nav-Authentication>
    <div class="container auth">
      <div class="row">
        <div class="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12
          text-center">
          <div class="row">
            <div class="col-sm-12">
              <div class="content">
                <!-- header -->
                <h1 class="title text-center form-group">
                  Login
                </h1>

                <form>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Email Address"
                      v-model="email"
                    />
                  </div>

                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      v-model="password"
                    />
                  </div>

                  <div class="form-group">
                    <button
                      type="submit"
                      class="btn btn-block btn-green"
                      @click.prevent="handleSubmit"
                    >
                      Login
                    </button>
                  </div>
                </form>

                <div class="row">
                  <div class="col-sm-6 text-right pull-right">
                    <router-link :to="{ name: 'Password-Reset' }">
                      Forgot Password?
                    </router-link>
                  </div>
                </div>
              </div>

              <p>
                Don't have an account?
                <router-link :to="{ name: 'Signup' }">
                  Sign Up
                </router-link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import NavAuthentication from '@/components/Nav-Authentication';

export default {
  name: 'login',

  components: { NavAuthentication },

  data () {
    return {
      email: '',
      password: ''
    };
  },

  beforeCreate () {
    const privateKey = window.localStorage.getItem('privateKey');
    console.log('privateKey', privateKey);
  },

  methods: {
    handleSubmit () {
      console.log('submitting');
      const options = {
        user: this.email,
        password: this.password
      };
      this.$store.dispatch('loginUser', options);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
