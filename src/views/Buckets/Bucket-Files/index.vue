<template>
  <section class="bucket-files container">
    <div v-if="loading" class="row">
      <div class="col">
        <Sj-Loading class="loading"></Sj-Loading>
      </div>
    </div>

    <div v-else class="row">
      <div class="col col-xs-12">

        <div class="row">
          <div class="col col-sm-12">
            <h1 class="title float-left">
              Files in {{ bucket.name }}
            </h1>
            <!-- NB: Waiting for updateBucketById method in storj.js -->
            <!-- <router-link :to="{
              name: 'Bucket Settings',
              params: { bucketId: $route.params.bucketId }
            }">
              <button class="btn btn-blue float-right">Edit Bucket</button>
            </router-link> -->
          </div>
        </div>

        <Bucket-File-List :files="files"></Bucket-File-List>
        <Sj-Go-Back-Btn name="Buckets"></Sj-Go-Back-Btn>
      </div>
    </div>
  </section>
</template>

<script>
import SjGoBackBtn from '@/components/Sj-Go-Back-Btn';
import SjLoading from '@/components/Sj-Loading';
import BucketFileList from './Bucket-File-List';
import { mapState, mapActions } from 'vuex';
import Promise from 'bluebird';

export default {
  name: 'bucket-files',

  components: { SjGoBackBtn, SjLoading, BucketFileList },

  created () {
    const bucketId = this.$route.params.bucketId;
    console.log('bucketId', bucketId);
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
      loading: true
    };
  },

  methods: {
    ...mapActions([ 'getBucket', 'getFileList' ])
  },

  computed: mapState({
    bucket: state => state.buckets.current.meta,
    files: state => state.buckets.current.files
  })
};
</script>

<style lang="scss" scoped>
  .loading {
    padding-top: 10rem;
  }
</style>
