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


                <NewReferralUserBanner v-if="showReferralBanner">
                </NewReferralUserBanner>

                <NewUserBanner v-else></NewUserBanner>

                <form>
                  <b-form-input
                    v-model="email"
                    type="email"
                    placeholder="Email Address"
                    class="form-group"
                  ></b-form-input>

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

                  <!-- <div v-if="!passwordsMatch" class="text-danger">

                  </div> -->

                  <div class="form-group">
                    <button
                      :disabled="!fieldsComplete"
                      type="submit"
                      @click.prevent="handleSubmit"
                      class="btn btn-block btn-green"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div class="form-group checkbox eula-checkbox">
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
import NavAuthentication from '@/components/Nav-Authentication';
import NewReferralUserBanner from './New-Referral-User-Banner';
import NewUserBanner from './New-User-Banner';
import SignupSuccess from './Signup-Success';
import { mapActions } from 'vuex';
import { sha256 } from '@/utils';

export default {
  name: 'signup',

  components: {
    NavAuthentication,
    NewReferralUserBanner,
    NewUserBanner,
    SignupSuccess
  },

  created () {
    if (this.$route.query.referralLink) {
      this.showReferralBanner = true;
    } else {
      this.showReferralBanner = false;
    }
  },

  data () {
    return {
      showReferralBanner: false,
      email: '',
      initialPassword: '',
      confirmPassword: '',
      eula: false,
      error: '',
      eulaError: '',
      signupSuccess: false
    };
  },

  computed: {
    fieldsComplete: function () {
      if (!this.email) {
        return false;
      }

      if (!this.initialPassword || !this.confirmPassword) {
        return false;
      }

      if (this.initialPassword !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return false;
      }

      if (this.email && this.initialPassword === this.confirmPassword) {
        this.error = '';
        return true;
      }
    }
  },

  methods: {
    ...mapActions([ 'createUser' ]),

    handleSubmit () {
      if (!this.eula) {
        this.eulaError = 'Please accept the Terms of Service to proceed';
        return;
      }

      this.eulaError = '';

      this.createUser({
        email: this.email,
        password: sha256(this.initialPassword),
        referralLink: this.$route.query.referralLink
      }).then((result) => {
        this.signupSuccess = true;
      }).catch((err) => {
        console.log('err', err);
        const message = err.message.response
          ? err.message.response.data.error
          : err.message;
        this.error = message;
      });
    },

    openEula () {

    }
  }
};
</script>

<style lang="scss">
  .eula-checkbox {
    margin-bottom: 0;
  }
</style>
