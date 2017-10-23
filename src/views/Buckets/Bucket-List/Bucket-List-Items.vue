<template lang="html">
  <section class="bucket-list-items">
    <div v-if="!buckets">
      Create a Bucket to Get Started
    </div>
    <table v-else class="table table-hover">
      <thead>
        <tr>
          <th class="hidden-xs">Bucket</th>
          <th class="bucket-plan">Name</th>
          <th class="bucket-storage">Storage</th>
          <th class="bucket-transfer">Transfer</th>
          <th class="bucket-status">Status</th>
        </tr>
      </thead>
      <tbody v-for="bucket in buckets" :key="bucket.id">
        <tr class="clickable-row"  @click="navigateToBucket(bucket.id)">
          <td class="bucket-icon hidden-xs">
            <img src="../../../../static/img/icon-bucket.svg" alt="">
          </td>
          <td class="bucket-label">
            <a>{{ bucket.name }}</a>
          </td>
          <td class="bucket-storage">{{ bucket.storage }} GB</td>
          <td class="bucket-transfer">{{ bucket.transfer }} GB</td>
          <td class="bucket-status">{{ bucket.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'bucket-list-items',

  props: [ 'buckets' ],

  methods: {
    navigateToBucket (bucketId) {
      this.$router.push({
        name: 'Bucket Files', params: { bucketId: bucketId }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .table {
    margin-bottom: 0;
  }

  tbody a {
  	cursor: pointer;
  }

  tr {
    -webkit-transition: all 0.15s ease-in-out;
    -moz-transition: all 0.15s ease-in-out;
    -ms-transition: all 0.15s ease-in-out;
    transition: all 0.15s ease-in-out;
  }

  th, td {
    padding: 1.8em !important;
  }

  .table>thead>tr>th {
    border-bottom: 1px solid #eee;
  }

  .table>thead>tr>th,
  .table>tbody>tr>th,
  .table>tfoot>tr>th,
  .table>thead>tr>td,
  .table>tbody>tr>td,
  .table>tfoot>tr>td {
      border-top: 1px solid #eee;
  }

  .bucket-icon {
    padding: 22px 0 0 26px !important;
    margin: 0;
    width: 70px;
  }

  .bucket-icon img {
    width: 42px;
    padding: 0;
    margin: 0;
  }

  .clickable-row {
    cursor: pointer;
  }
</style>
