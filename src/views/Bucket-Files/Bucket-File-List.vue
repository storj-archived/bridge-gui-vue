<template lang="html">
  <div class="row">
    <div class="col col-sm-12">
      <div class="content table-responsive files-container">
        <div class="form-group">
          <table class="table table-hover table-files">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in files" :key="file.id">
                <td>
                  <!-- file icon mimetype stuff -->
                  <span @click="handleClick">{{ file.filename }}</span>
                </td>
                <td>
                  <span>{{ file.size }}B</span>
                </td>
                <td>
                  <span>{{ file.mimetype }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bucket-file-list',

  props: [ 'files', 'handleClick' ]
};
</script>

<style lang="css">
</style>
