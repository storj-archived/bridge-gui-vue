<template>
  <section class="bucket-list">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="title pull-left">Buckets</h1>
          <button class="btn btn-green btn-action pull-right">
            Create Button
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="table-responsive content">
            <div v-if="loading">
              Loading . . .
            </div>
            <Bucket-List-Items v-else :buckets="buckets">
            </Bucket-List-Items>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import BucketListItems from './Bucket-List-Items';

export default {
  name: 'bucket-list',

  components: {
    BucketListItems
  },

  data () {
    return {
      loading: false,
      // TODO: buckets should come from store
      buckets: [{
        id: 1,
        name: 'hai',
        storage: 0,
        transfer: 0,
        status: 'Active'
      }, {
        id: 2,
        name: 'bucket two',
        storage: 0,
        transfer: 0,
        status: 'Active'
      }]
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
	margin-top: 0.5em;
    margin-bottom: 0.75em;
}

.btn-action {
  margin-top: 8px;
  padding: 12px 36px 10px;
}

@media (max-width: 480px) {
	.btn-action {
		padding-left: 10px;
		padding-right: 10px;
	}
}

body.page {
  background: #f9f9f9;
  padding-bottom: 3em;
}

.content {
  border: 1px solid #eee;
    background: #fff;
    border-radius: 5px;
    padding: 2em;
    margin-bottom: 2em;
}

.table-responsive.content {
  padding: 0;
}
</style>
