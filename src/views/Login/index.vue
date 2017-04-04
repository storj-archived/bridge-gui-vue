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
          <div class="row">
            <div class="col col-sm-12">
              <div class="content">
                <!-- header -->
                <h1 class="title text-center form-group">
                  Login
                </h1>

                <form>
                  <div class="form-group">
                    <div v-show="errors.email" class="input-error">
                      {{ errors.email }}
                    </div>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Email Address"
                      v-model="email"
                      @keyup="validateEmail"
                    />
                  </div>

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

                <div class="row">
                  <div class="col text-right float-right">
                    <router-link :to="{ name: 'Password-Reset' }">
                      Forgot Password?
                    </router-link>
                  </div>
                </div>

                <div v-show="errors.login" class="login-error input-error">
                  {{ errors.login }}
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
/**
 * Login should:
  - on load, check for private key, validate, and then log user in and redirect
  - take in email address and password
     - validate email is valid email address && is not empty
     - validate password is not empty
  - on submission
    - submit email and password to storj.basicAuth
    - create private key and store it
    - re-authenticate with key auth
    - direct to /dashboard
 */
import NavAuthentication from '@/components/Nav-Authentication.vue';
import { mapActions } from 'vuex';
// import StorjClient from '';
import * as validate from '@/utils/validation';
import _ from 'lodash';

export default {
  name: 'login',

  components: { NavAuthentication },

  data () {
    return {
      submitting: false,
      email: '',
      password: '',
      attemptLogin: true,
      errors: {
        email: '',
        password: '',
        login: ''
      }
    };
  },

  methods: {
    ...mapActions([ 'authenticateUserBasic', 'createKeypair', 'verifyPrivateKey' ]),

    handleSubmit () {
      if (!this.validateInputs()) return;

      this.submitting = true;

      const options = {
        email: this.email,
        password: this.password
      };

      this.authenticateUserBasic(options)
        .then(() => {
          console.log('login');
          this.submitting = false;
          this.$router.push('/dashboard');
        })
        .catch((err) => this.handleError(err));
        // .then(() => this.createKeypair())
    },

    clearError () {
      setTimeout(() => {
        this.errors.email = '';
        this.errors.password = '';
      }, 2000);
    },

    handleError (err) {
      console.log('err');
      this.submitting = false;
      this.errors.login = err.message;
    },

    validateEmail: _.debounce(function () {
      const emailErrors = validate.email(this.email) || validate.required(this.email);
      this.errors.email = emailErrors;

      this.clearError();
    }, 400),

    validateInputs () {
      console.log('validating');

      this.errors.email = validate.email(this.email) || validate.required(this.email);
      this.errors.password = validate.required(this.password);

      if (this.errors.email || this.errors.password) {
        this.clearError();
        return false;
      }

      return true;
    }
  },

  created () {
    const privateKey = window.localStorage.getItem('privateKey');
    console.log('privateKey', privateKey);
    if (privateKey) {
      // this.verifyPrivateKey(privateKey)
      //   .then(() => this.keypairAuth(privateKey))
      //   .then(() => this.$router.push('/dashboard'))
      //   .catch((err) => this.handleError(err));
      this.attemptLogin = false;
    } else {
      console.log('no private key');
      this.attemptLogin = false;
    }
  }
};
</script>

<style lang="scss" scoped>
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

.input-error {
  color: darkred;
  margin: 10px;
}
</style>
