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

          <form>
            <div class="row">
              <div class="col col-sm-12">
                <div class="content">
                  <b-form-fieldset
                    class="form-group"
                    label="Bucket Name"
                    :label-size="1"
                    :state="this.bucketName.length ? 'success' : ''"
                  >
                    <b-form-input
                      type="text"
                      class="form-control"
                      name="bucket-name"
                      v-model="bucketName"
                      placeholder="Enter a name for your bucket"
                    ></b-form-input>
                  </b-form-fieldset>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col col-xs-6">
                <Sj-Go-Back-Btn name="Buckets"></Sj-Go-Back-Btn>
              </div>

              <div class="col col-xs-6">
                <button
                  @click="createBucket"
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

export default {
  name: 'create-bucket',

  components: { SjGoBackBtn },

  data () {
    return {
      bucketName: ''
    };
  },

  methods: {
    createBucket () {
      console.log('create Bucket');
    }
  }
};
</script>

<style lang="scss" scoped>
  .btn-create-bucket {
    margin-bottom: 2em;
  }
</style>
