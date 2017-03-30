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
                  <div class="form-group">
                    <label for="name">Bucket Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="bucket-name"
                      placeholder="Bucket Name"
                      v-model="bucketName"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col col-xs-6">
                <Sj-Go-Back-Btn go-to="Dashboard"></Sj-Go-Back-Btn>
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
