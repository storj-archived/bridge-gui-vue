<template>
  <section class="bucket-files container">
    <div v-if="loading" class="row">
      <div class="col">
        <Sj-Loading class="loading"></Sj-Loading>
      </div>
    </div>

    <div v-else>
      <div class="row">
        <div class="header col col-sm-12">
          <h1 class="title float-left">
            Files in <span class="text-uppercase">{{ bucket.id }}</span>
          </h1>
          <!-- NB: Waiting for updateBucketById method in storj.js -->
          <!-- <router-link :to="{
            name: 'Bucket Settings',
            params: { bucketId: $route.params.bucketId }
          }">
            <button class="btn btn-blue float-right">Edit Bucket</button>
          </router-link> -->

          <b-button
            class="delete float-right"
            variant="outline-danger"
            v-b-modal="'deleteBucketModal'"
          >
            Delete Bucket
          </b-button>
        </div>

        <div v-show="error" class="col has-error"> {{ error }} </div>
      </div>

      <Bucket-Details :bucket="bucket"></Bucket-Details>
      <Bucket-File-List :files="files"></Bucket-File-List>
      <Sj-Go-Back-Btn name="Buckets"></Sj-Go-Back-Btn>
    </div>

    <b-modal id="deleteBucketModal" title="Confirm Delete Bucket">
      <div>
        <p>
          Are you sure you want to delete this bucket? This cannot be undone.
        </p>

        <p>Type in the bucket name <b>"{{ bucket.name }}"</b> to confirm deletion:
        </p>

        <b-form-input v-model="confirmBucketName"></b-form-input>
      </div>

      <footer slot="modal-footer">
        <button
          class="btn btn-danger"
          @click.prevent="handleClick"
          :disabled="confirmBucketName !== bucket.name"
        >
          <span v-show="!submitting">Yes, Delete Bucket</span>
          <span v-show="submitting">Submitting . . .</span>
        </button>
      </footer>
    </b-modal>

  </section>
</template>

<script>
import SjGoBackBtn from '@/components/Sj-Go-Back-Btn';
import SjLoading from '@/components/Sj-Loading';
import BucketFileList from './Bucket-File-List';
import BucketDetails from './Bucket-Details';
import { mapState, mapActions } from 'vuex';
import Promise from 'bluebird';

export default {
  name: 'bucket-files',

  components: { SjGoBackBtn, SjLoading, BucketFileList, BucketDetails },

  created () {
    const bucketId = this.$route.params.bucketId;
    const self = this;
    return Promise.join(
      this.getBucket(bucketId),
      this.getFileList(bucketId),
      function (bucket, files) {
        self.loading = false;
        return;
      });
  },

  data () {
    return {
      loading: true,
      error: '',
      confirmBucketName: '',
      submitting: false
    };
  },

  methods: {
    ...mapActions([ 'getBucket', 'getFileList', 'deleteBucket' ]),

    handleClick () {
      this.error = '';
      this.submitting = true;
      this.deleteBucket(this.bucket.id)
        .then(() => {
          this.submitting = false;
          this.$router.push({ name: 'Buckets' });
        })
        .catch((err) => {
          this.submitting = false;
          this.$root.$emit('hide::modal', 'deleteBucketModal');
          this.error = err;
        });
    }
  },

  computed: {
    ...mapState({
      bucket: state => state.buckets.current.meta,
      files: state => state.buckets.current.files
    })
  }
};
</script>

<style lang="scss">
  .bucket-files .loading {
    padding-top: 10rem;
  }

  .bucket-files .delete {
    margin-top: 1.5rem;
  }

  .bucket-files .has-error {
    margin-bottom: 1.5rem;
  }
</style>
