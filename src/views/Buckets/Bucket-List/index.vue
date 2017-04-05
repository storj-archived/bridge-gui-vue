<template>
  <section class="bucket-list container">
    <div class="row">
      <div class="col col-xs-12">
        <h1 class="title float-left">Buckets</h1>
        <router-link :to="{ name: 'Create Bucket' }">
          <button class="btn btn-green btn-action float-right">
              Create Bucket
          </button>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div v-if="loading">
        Loading . . .
      </div>
      <div v-else class="col col-xs-12">
        <div class="table-responsive content">
          <Bucket-List-Items :buckets="buckets">
          </Bucket-List-Items>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BucketListItems from './Bucket-List-Items';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'bucket-list',

  components: {
    BucketListItems
  },

  data () {
    return {
      loading: true
      // TODO: buckets should come from store

    };
  },

  computed: mapState({
    buckets: state => state.buckets.all
  }),

  methods: {
    ...mapActions([ 'getBuckets' ])
  },

  created () {
    this.getBuckets().then(() => {
      this.loading = false;
    });
  }

};
</script>

<style lang="scss" scoped>
</style>
