<template>
  <section class="container signup-form">
    <Nav-Authentication></Nav-Authentication>
    <div v-if="!signupSuccess" class="container auth">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
          <div class="row">
            <div class="col-sm-12">
              <div class="content">

                <h1 class="title text-center form-group">Sign Up</h1>

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
                      name="initial-password"
                      placeholder="Password"
                      v-model="initialPassword"
                    />
                  </div>

                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="confirm-password"
                      placeholder="Confirm Password"
                      v-model="confirmPassword"
                    />
                  </div>

                  <div v-if="!passwordsMatch" class="text-danger">

                  </div>

                  <div class="form-group">
                    <button
                      type="submit"
                      @click.prevent="handleSubmit"
                      class="btn btn-block btn-green"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div class="form-group checkbox">
                    <label>
                      <p>
                        <input
                          type="checkbox"
                          class="text-right"
                          name="eula"
                          v-model="eula"
                        />
                        I agree to the
                          <a href="#noop" @click.prevent="openEula">
                            Terms of Service
                          </a>
                      </p>
                    </label>
                  </div>

                  <div v-if="error">
                    <span class="text-danger">{{ error }}</span>
                  </div>

                  <div v-if="eulaError">
                    <span class="text-danger">{{ eulaError }}</span>
                  </div>

                </form>
              </div>

              <p>
                Already have an account?
                <router-link :to="{ name: 'Login' }">Log In</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Signup-Success v-else></Signup-Success>
  </section>
</template>

<script>
import NavAuthentication from '@/components/Nav-Authentication.vue';
import SignupSuccess from './Signup-Success';
import axios from 'axios';

export default {
  name: 'signup',

  components: { NavAuthentication, SignupSuccess },

  data () {
    return {
      email: '',
      initialPassword: '',
      confirmPassword: '',
      eula: false,
      error: '',
      eulaError: '',
      signupSuccess: false
    };
  },

  methods: {
    passwordsMatch () {
      return true;
    },

    handleSubmit () {
      console.log('submitting');
      axios.post('http://localhost:3000/graphql/api/users/create', {
        email: 'test@test.com',
        password: 'test'
      })
      .then((result) => console.log('result', result))
      .catch((err) => console.log('err', err));
    },

    openEula () {

    }
  }
};
</script>

<style lang="scss">
</style>
