<template>
  <section class="bucket-settings">
    <div class="container">
      <div class="row">
        <div class="col">

          <div class="row">
            <div class="col">
              <h1 class="title float-left">Bucket Settings</h1>
              <button
                class="btn btn-action btn-red float-right"
                @click="destroy"
              >
                Delete Bucket
              </button>
            </div>
          </div>

          <form>
            <div class="row">
              <div class="col">
                <div class="content">
                  <div class="form-group">
                    <label for="name">Bucket Name</label>
                    <b-form-input
                      name="name"
                      class="form-control"
                      v-model="bucketName"
                      type="text"
                      placeholder="Bucket Name"
                    >
                    </b-form-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="content">
                  <div class="form-group">
                    <h4 class="float-left">Public Keys</h4>

                    Publick Key List
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div class="row">
            <div class="col">
              <Sj-Go-Back-Btn
                name="Bucket Files"
                :params="{ bucketId: $route.params.bucketId }"
              ></Sj-Go-Back-Btn>
            </div>

            <div class="col">
              <button class="btn btn-green btn-block btn-create-bucket">
                Update Bucket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SjGoBackBtn from '@/components/Sj-Go-Back-Btn';

export default {
  name: 'bucket-settings',

  components: { SjGoBackBtn },

  data () {
    return {
      bucketName: ''
    };
  },

  methods: {
    destroy () {

    }
  }
};
</script>

<style lang="scss">
</style>
