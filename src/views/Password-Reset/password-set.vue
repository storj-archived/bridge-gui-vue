<template lang="html">
  <section class="container login">
    <Nav-Authentication></Nav-Authentication>
    <div class="container auth">
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
                  <span v-show="!submitting">Confirm Password Reset</span>
                  <span v-show="submitting">Submitting . . .</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { sha256 } from '@/utils';
import router from '@/router';
import NavAuthentication from '@/components/Nav-Authentication.vue';

export default {
  name: 'password-set',
  components: { NavAuthentication },
  data () {
    return {
      errors: {
        password: ''
      },
      password: '',
      passwordConfirm: '',
      submitting: false
    };
  },
  methods: {
    handleSubmit () {
      this.submitting = true;
      // NB: add some password validation
      const token = this.$route.params.token;
      this.$store.dispatch('confirmPasswordReset', {
        token: token,
        password: sha256(this.passwordConfirm)
      })
      .then(() => {
        this.submitting = false;
        console.log('password reset successful');
        router.push({ name: 'login' });
      });
    }
  }
};
</script>
<style></style>

