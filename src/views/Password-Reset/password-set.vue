<template lang="html">
  <section class="container login">
    <b-img center src="../../../static/img/logo-blue.svg" class="logo"/>
    <div v-if="!reset.success" class="container auth">
      <div class="row justify-content-center">

        <h2 v-if="submitting" class="loading"> Loading . . . </h2>

        <div v-else
          class="col col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12
          text-center"
        >
          <div class="content">
            <!-- header -->
            <h1 class="title text-center form-group">
              Set New Password
            </h1>

            <form>

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
                <input
                  type="password"
                  class="form-control"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  v-model="passwordConfirm"
                />
              </div>

              <div v-show="errors.password" class="input-error">
                {{ errors.password }}
              </div>

              <div class="form-group">
                <button
                  :disabled="!valid"
                  type="submit"
                  class="btn btn-block btn-green"
                  @click.prevent="handleSubmit"
                >
                  <span v-show="!submitting">Confirm Password Reset</span>
                  <span v-show="submitting">Submitting . . .</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
    <Message-Page v-else :title="reset.title" :message="reset.message">
    </Message-Page>
  </section>
</template>
<script>
import { sha256 } from '@/utils';
import MessagePage from '@/components/Message-Page';

export default {
  name: 'password-set',
  components: { MessagePage },
  data () {
    return {
      reset: {
        success: false,
        title: 'Password Reset Successful',
        message: `
          Your password was successfully reset. 
          Login with your new password now and update your 
          password in any password managers you use.
          You'll now be redirected back to the login page.
        `
      },
      errors: {
        password: ''
      },
      password: '',
      passwordConfirm: '',
      submitting: false
    };
  },
  computed: {
    valid: function () {
      if (!this.password) {
        return false;
      }

      if (this.password.length < 8) {
        this.errors.password = 'Password must be 8 or more characters long.';
        return false;
      }

      if (this.passwordConfirm !== this.password) {
        this.errors.password = 'Passwords must match.';
        return false;
      }

      this.errors.password = '';
      return true;
    }
  },
  methods: {
    handleSubmit () {
      this.submitting = true;
      const token = this.$route.params.token;
      this.$store.dispatch('confirmPasswordReset', {
        token: token,
        password: sha256(this.passwordConfirm)
      })
      .then(() => {
        this.reset.success = true;
        this.submitting = false;
        setTimeout(() => {
          this.$router.push('/login');
        }, 10000);
      });
    }
  }
};
</script>
<style>
.logo {
  margin: 3em auto;
  width: 200px;
}
</style>

