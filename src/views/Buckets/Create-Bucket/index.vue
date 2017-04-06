<template>
  <section class="create-bucket">
    <div class="container">
      <div class="row">
        <div class="col col-xs-12">

          <div class="row">
            <div class="col col-sm-12">
              <h1 class="title float-left">Create Bucket</h1>
            </div>
          </div>

          <form
            @keydown.enter.prevent="handleSubmit"
            @submit.prevent="handleSubmit"
          >
            <div class="row">
              <div class="col col-sm-12">
                <div class="content">
                  <b-form-fieldset
                    class="form-group"
                    label="Bucket Name"
                    :label-size="1"
                    :state="state"
                  >
                    <b-form-input
                      type="text"
                      class="form-control"
                      name="bucket-name"
                      v-model="bucketName"
                      placeholder="Enter a name for your bucket"
                    ></b-form-input>
                  </b-form-fieldset>

                  <div v-if="error" class="has-error text-center">
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col col-xs-6">
                <Sj-Go-Back-Btn name="Buckets"></Sj-Go-Back-Btn>
              </div>

              <div class="col col-xs-6">
                <button
                  type="submit"
                  :disabled="disabled"
                  class="btn btn-block btn-green btn-create-bucket"
                >
                  Save Bucket
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SjGoBackBtn from '@/components/Sj-Go-Back-Btn';
import { mapActions } from 'vuex';

export default {
  name: 'create-bucket',

  components: { SjGoBackBtn },

  data () {
    return {
      bucketName: '',
      disabled: true,
      error: ''
    };
  },

  computed: {
    state () {
      const validBucketName = new RegExp(/^\S*$/).test(this.bucketName);

      if (this.error) {
        return 'warning';
      }

      if (!validBucketName) {
        this.disabled = true;
        return 'warning';
      }

      if (this.bucketName.length) {
        this.disabled = false;
        return 'success';
      }

      if (!this.bucketName.length) {
        this.disabled = true;
      }

      return '';
    }
  },

  methods: {
    ...mapActions([ 'createBucket' ]),

    handleSubmit () {
      this.disabled = false;
      this.createBucket(this.bucketName)
        .then((bucketId) => this.$router.push({
          name: 'Bucket Files',
          params: { bucketId }
        }))
        .catch((err) => {
          this.error = err.message;
          setTimeout(() => {
            this.error = '';
          }, 2500);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
  .btn-create-bucket {
    margin-bottom: 2em;
  }
</style>
