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

            <div v-show="successes" class="successes col">
              <p>
                <span>Successfully sent:</span>
                <span class="float-right x" @click="closeSuccesses">X</span>
              </p>
              <span class="text-muted">{{ successes }}</span>
            </div>

            <div v-show="failures.length > 0" class="failures">
              <p>
                <span class="has-error">Failed to send:</span>
                <span class="float-right x has-error" @click="closeFailure">
                  X
                </span>
              </p>
              <span v-for="failure in failures" class="text-muted">
                {{ failure.email }}: {{ failure.message }} </br>
              </span>
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
      failures: [],
      successes: ''
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
      this.submitting = false;
      if (this.emails.length > 0 && !this.error) {
        this.submitting = true;
        this.sendEmails(this.emails).then((res) => {
          this.failures = res.data.failures;
          this.successes = res.data.successes.map((s) => s.email).join(', ');
        });
      }
    },

    closeFailure () {
      this.failures = [];
    },

    closeSuccesses () {
      this.successes = '';
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
    border-radius: 3px;
    border: 1px solid red;
    padding: 1.25rem;
  }

  .referral-email .failures span.x:hover, .referral-email .successes span.x:hover {
    cursor: pointer;
    font-weight: bold;
  }

  .referral-email .successes {
    margin-top: 20px;
    border-radius: 3px;
    border: 1px solid #88C425;
    padding: 1.25rem;
  }

  .referral-email .successes > p {
    color: green;
  }
</style>
