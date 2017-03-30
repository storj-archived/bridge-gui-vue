<template>
  <section class="bucket-files">
    <div class="container">
      <div class="row">
        <div class="col col-xs-12">

          <div class="row">
            <div class="col col-sm-12">
              <h1 class="title float-left">Files</h1>
              <router-link :to="{
                name: 'Bucket Settings',
                params: { bucketId }
              }">
                <button class="btn btn-blue float-right">Edit Bucket</button>
              </router-link>
            </div>
          </div>

          <Bucket-File-List :files="files"></Bucket-File-List>
          <Sj-Go-Back-Btn go-to="Buckets"></Sj-Go-Back-Btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SjGoBackBtn from '@/components/Sj-Go-Back-Btn';
import BucketFileList from './Bucket-File-List';

export default {
  name: 'bucket-files',

  components: { SjGoBackBtn, BucketFileList },

  data () {
    return {
      // this be dummy data to test rendering
      files: [{
        id: 11,
        filename: 'file-filename',
        mimetype: 'jpg',
        size: 11
      }, {
        id: 12,
        filename: 'name-file',
        mimetype: 'doc',
        size: 123
      }]
    };
  }
};
</script>

<style lang="scss">
</style>
