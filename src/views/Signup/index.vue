<template>
  <section class="container signup-form">
    <Nav-Authentication></Nav-Authentication>
    <div v-if="!signup.success" class="container auth">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
          <div class="content">
            <h1 class="title text-center form-group">Join the waitlist</h1>

            <NewReferralUserBanner v-if="showReferralBanner">
            </NewReferralUserBanner>
            
            <NewUserBanner v-else :referralPartner="referralPartner">
            </NewUserBanner>
            <!-- <div
              class="alert alert-info text-center"
              role="alert"
              data-alert-cookie="alert_new_user"
            >
                        
            </div>
            --> 

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

              <div v-if="error" class="form-group">
                <input
                  type="password"
                  class="form-control is-invalid"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                />
              </div>

              <div v-else="error" class="form-group">
                <input
                  type="password"
                  class="form-control"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                />
              </div>

              <div class="form-group">
                <button
                  :disabled="!fieldsComplete"
                  type="submit"
                  @click.prevent="handleSubmit"
                  class="btn btn-block btn-green"
                >
                  Create Account 
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
                      <a href="" @click.prevent="openEula">
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

    <Message-Page v-else :title="signup.title" :message="signup.message">
    </Message-Page>

    <b-modal id="eulaModal" size="lg" :hide-header="true">
      <Terms-Of-Service></Terms-Of-Service>
      <footer slot="modal-footer">
        <b-button @click.prevent="closeEula">Close</b-button>
      </footer>
    </b-modal>

  </section>
</template>

<script>
import NavAuthentication from '@/components/Nav-Authentication';
import TermsOfService from '@/components/Terms-of-Service';
import MessagePage from '@/components/Message-Page';
import NewReferralUserBanner from './New-Referral-User-Banner';
import NewUserBanner from './New-User-Banner';
import { mapActions } from 'vuex';
import { sha256 } from '@/utils';

export default {
  name: 'signup',

  components: {
    NavAuthentication,
    TermsOfService,
    NewReferralUserBanner,
    NewUserBanner,
    MessagePage
  },

  created () {
    this.referralPartner = this.$route.query.referralPartner;

    if (this.$route.query.referralLink) {
      this.showReferralBanner = true;
    } else {
      this.showReferralBanner = false;
    }
  },

  data () {
    return {
      showReferralBanner: false,
      referralPartner: '',
      email: '',
      initialPassword: '',
      confirmPassword: '',
      eula: false,
      error: '',
      eulaError: '',
      signup: {
        success: false,
        title: 'Success! Account created.',
        message: `Watch for an email with your activation link once we are ready to add new users to the network. Learn more about our new architecture on our <a href="https://blog.storj.io/post/169896892413/getting-from-petabytes-to-exabytes-the-road-ahead">blog.<a/> Once your registration is finalized, you will receive one year of free service — up to 25GB of storage and bandwidth every month. While you wait, follow us on Twitter at <a href="https://twitter.com/storjproject"
        target="_blank">@storjproject</a> or join <a href="https://storj.io/community.html">our community chat</a> for the latest updates from the Storj Labs team. `
      }
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
      this.error = '';

      const referralLink = this.$route.query.referralLink;
      const referralPartner = this.$route.query.referralPartner;

      const payload = {
        email: this.email,
        password: sha256(this.initialPassword),
        redirect: 'https://app.storj.io/'
      };

      if (referralLink) {
        payload.referralLink = referralLink;
      }

      if (referralPartner) {
        payload.opts = { referralPartner: referralPartner.toLowerCase() };
      }

      this.createUser(payload)
      .then((result) => {
        this.signup.success = true;
      }).catch((err) => {
        let message;
        if (typeof err.message === 'string') {
          message = err.message;
        } else {
          message = err.message.response
            ? err.message.response.data.error
            : err.message.message;
        }
        this.error = message;
      });
    },

    openEula () {
      this.$root.$emit('bv::show::modal', 'eulaModal');
    },

    closeEula () {
      this.$root.$emit('bv::hide::modal', 'eulaModal');
    }
  }
};
</script>

<style lang="scss">
  .eula-checkbox > label > p > input {
    margin-top: 1rem;
    margin-right: 5px;
  }
</style>
