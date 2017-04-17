<template lang="html">
  <div class="referral-email col col-md-6">
    <h2>Refer by email</h2>
    <div class="content">
      <form>
        <p class="referral-email__text">
          Enter your friends' emails (separated by commas) and we'll invite
          them for you.
        </p>
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              v-model="input"
              @keyup="verifyEmails"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <button
              type="submit"
              class="btn btn-block btn-green"
              @click.prevent="handleSubmit"
            >
              Invite friends
            </button>

            <span v-show="error" class="has-error"> {{ error }} </span>

            <div v-show="successes" class="successes">
              <p>Successfully sent: {{ successes }}</p>
              <div> X </div>
            </div>

            <div v-show="failures.length > 0" class="has-error failures">
              <p>Failed to send:</p>
              <p v-for="failure in failures">
                {{ failure.email }}: {{ failure.message }}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { debounce } from 'lodash';
import { isValidEmail } from '@/utils/validation';

export default {
  name: 'referral-email',

  data () {
    return {
      input: '',
      error: '',
      submitting: false,
      failures: [{ email: 'a@a.com', message: 'User already invited' }, { email: 'b@b.com', message: 'Testing' }],
      successes: 'a@a.com, b@b.com'
    };
  },

  computed: {
    emails () {
      if (this.input) {
        return this.input.split(',').map((email) => email.trim());
      }
      return [];
    }
  },

  methods: {
    ...mapActions([ 'sendEmails' ]),

    verifyEmails: debounce(function () {
      if (!this.emails.length) {
        return;
      }
      this.emails.forEach((email) => {
        const isValid = isValidEmail(email.trim());
        this.error = isValid ? '' : 'Invalid email list';
      });
    }, 650),

    handleSubmit () {
      console.log('handleSubmit', this.emails);
      this.submitting = false;
      if (this.emails.length > 0 && !this.error) {
        this.submitting = true;
        this.sendEmails(this.emails).then((res) => {
          console.log('result', res);
          this.failures = res.data.failures;
          this.successes = res.data.successes.map((s) => s.email).join(', ');
        });
      }
    }
  }
};
</script>

<style lang="scss">
  .referral-email__text {
    min-height: 50px;
  }

  .referral-email > .content {
    min-height: 260px;
  }

  .referral-email > .content button {
    margin-top: 20px;
  }

  .referral-email .failures {
    margin-top: 20px;
  }

  .referral-email .successes {
    margin-top: 20px;
    color: green;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    padding: 1rem;
  }
</style>
